/**
 * Telemetry and contract storage service
 * 
 * This service:
 * - Tracks analysis events (metadata, performance, errors)
 * - Stores full uploaded contracts for operation and improvement
 * - Uses anonymous session IDs (not user PII)
 * - Retains contracts per privacy policy (~12 months)
 */

import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

// Use service-role key for server-side telemetry
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

let supabaseAdmin: ReturnType<typeof createClient> | null = null;

function getAdminClient() {
  if (!supabaseAdmin && supabaseUrl && supabaseServiceKey) {
    supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    });
  }
  return supabaseAdmin;
}

export type EventType = 'upload_started' | 'analysis_started' | 'analysis_succeeded' | 'analysis_failed';
export type EventSource = 'web' | 'api';

export interface AnalysisEventData {
  eventType: EventType;
  source: EventSource;
  fileMime?: string | null;
  fileExt?: string | null;
  sizeBytes?: number | null;
  pageCount?: number | null;
  contractTypeGuess?: string | null;
  durationMs?: number | null;
  errorCode?: string | null;
  anonSessionId?: string | null;
  path?: string | null;
}

/**
 * Get size band for file size (privacy-friendly bucketing)
 */
function getSizeBand(sizeBytes: number): string {
  if (sizeBytes < 100 * 1024) return '0-100kb';
  if (sizeBytes < 1024 * 1024) return '100kb-1mb';
  if (sizeBytes < 5 * 1024 * 1024) return '1-5mb';
  return '5mb+';
}

/**
 * Extract file extension from filename or mime type
 * Returns extension only (e.g. ".pdf") without revealing full filename
 */
function extractExtension(fileName?: string, mimeType?: string): string | null {
  if (fileName) {
    const match = fileName.match(/\.([^.]+)$/);
    if (match) return match[0]; // includes the dot
  }
  
  // Fallback to mime type mapping
  if (mimeType) {
    const mimeToExt: Record<string, string> = {
      'application/pdf': '.pdf',
      'application/msword': '.doc',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
      'text/plain': '.txt',
      'image/jpeg': '.jpg',
      'image/png': '.png',
      'image/webp': '.webp',
    };
    return mimeToExt[mimeType] || null;
  }
  
  return null;
}

/**
 * Track an analysis event
 * Safe to call even if telemetry is not configured - will fail silently
 */
export async function trackAnalysisEvent(data: AnalysisEventData): Promise<void> {
  const client = getAdminClient();
  if (!client) {
    // Telemetry not configured - fail silently
    return;
  }

  try {
    const sizeBand = data.sizeBytes ? getSizeBand(data.sizeBytes) : null;
    const fileExt = data.fileExt || extractExtension(undefined, data.fileMime || undefined);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (client as any)
      .from('analysis_events')
      .insert({
        event_type: data.eventType,
        source: data.source,
        file_mime: data.fileMime ?? null,
        file_ext: fileExt,
        size_bytes: data.sizeBytes ?? null,
        size_band: sizeBand,
        page_count: data.pageCount ?? null,
        contract_type_guess: data.contractTypeGuess ?? null,
        duration_ms: data.durationMs ?? null,
        error_code: data.errorCode ?? null,
        anon_session_id: data.anonSessionId ?? null,
        path: data.path ?? null,
      });

    if (error) {
      console.warn('[Telemetry] Failed to track event:', error.message);
    }
  } catch (err) {
    // Don't let telemetry errors break the app
    console.warn('[Telemetry] Exception tracking event:', err instanceof Error ? err.message : 'unknown');
  }
}

/**
 * Track GA4 custom event (if gtag is configured)
 * Privacy-friendly: only aggregated metrics, no PII
 */
export function trackGA4Event(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (w.gtag) {
      try {
        w.gtag('event', eventName, params);
      } catch {
        // Fail silently
      }
    }
  }
}

/**
 * Store uploaded contract file in Supabase Storage
 * Returns storage path and stored_contracts row ID
 */
export async function storeContractFile(
  fileBuffer: Buffer,
  metadata: {
    mime: string;
    ext?: string;
    anonSessionId?: string;
    contractTypeGuess?: string;
    analysisEventId?: string;
  }
): Promise<{ storageId: string; storagePath: string } | null> {
  const client = getAdminClient();
  if (!client) {
    console.warn('[Storage] Supabase not configured');
    return null;
  }

  try {
    // Calculate SHA-256 hash for deduplication
    const hash = crypto.createHash('sha256').update(fileBuffer).digest('hex');
    
    // Check if we already have this exact file
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: existing } = await (client as any)
      .from('stored_contracts')
      .select('id, storage_path')
      .eq('sha256', hash)
      .is('deleted_at', null)
      .single();

    if (existing) {
      console.log('[Storage] File already exists (deduplicated):', hash);
      return { storageId: existing.id, storagePath: existing.storage_path };
    }

    // Generate unique storage path
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const randomId = crypto.randomBytes(8).toString('hex');
    const extension = metadata.ext || '.bin';
    const storagePath = `${timestamp}-${randomId}${extension}`;

    // Upload to Supabase Storage (contract-uploads bucket)
    const { error: uploadError } = await client.storage
      .from('contract-uploads')
      .upload(storagePath, fileBuffer, {
        contentType: metadata.mime,
        upsert: false,
      });

    if (uploadError) {
      console.error('[Storage] Upload failed:', uploadError.message);
      return null;
    }

    // Insert stored_contracts record
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { data: record, error: insertError } = await (client as any)
      .from('stored_contracts')
      .insert({
        storage_path: storagePath,
        mime: metadata.mime,
        ext: metadata.ext,
        size_bytes: fileBuffer.length,
        sha256: hash,
        anon_session_id: metadata.anonSessionId ?? null,
        contract_type_guess: metadata.contractTypeGuess ?? null,
        analysis_status: 'pending',
        analysis_event_id: metadata.analysisEventId ?? null,
      })
      .select('id')
      .single();

    if (insertError) {
      console.error('[Storage] DB insert failed:', insertError.message);
      // Try to clean up uploaded file
      await client.storage.from('contract-uploads').remove([storagePath]);
      return null;
    }

    return { storageId: record.id, storagePath };
  } catch (err) {
    console.error('[Storage] Exception storing contract:', err instanceof Error ? err.message : 'unknown');
    return null;
  }
}

/**
 * Update stored contract analysis status
 */
export async function updateContractAnalysisStatus(
  storageId: string,
  status: 'completed' | 'failed',
  contractTypeGuess?: string
): Promise<void> {
  const client = getAdminClient();
  if (!client) return;

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (client as any)
      .from('stored_contracts')
      .update({
        analysis_status: status,
        contract_type_guess: contractTypeGuess ?? null,
      })
      .eq('id', storageId);
  } catch (err) {
    console.warn('[Storage] Failed to update status:', err instanceof Error ? err.message : 'unknown');
  }
}
