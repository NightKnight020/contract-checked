/**
 * Telemetry service for tracking contract analysis events
 * 
 * Privacy-first design:
 * - No contract content or full text stored
 * - No PII (email, name, etc.)
 * - Only anonymous session IDs
 * - File extensions only (no full filenames)
 * - Aggregate metrics only
 */

import { createClient } from '@supabase/supabase-js';

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
