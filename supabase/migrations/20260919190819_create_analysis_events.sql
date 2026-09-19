-- Create analysis_events table for telemetry
CREATE TABLE IF NOT EXISTS analysis_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  
  -- Event metadata
  event_type text NOT NULL CHECK (event_type IN ('upload_started', 'analysis_started', 'analysis_succeeded', 'analysis_failed')),
  source text NOT NULL CHECK (source IN ('web', 'api')),
  
  -- File metadata (no PII, no full filenames, no contract content)
  file_mime text,
  file_ext text,
  size_bytes int,
  size_band text,
  page_count int,
  
  -- Contract classification (from existing classifier if available)
  contract_type_guess text,
  
  -- Performance & error tracking
  duration_ms int,
  error_code text,
  
  -- Anonymous session tracking (no PII, no email)
  anon_session_id text,
  path text
);

-- Create indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_analysis_events_created_at ON analysis_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analysis_events_event_type ON analysis_events(event_type);
CREATE INDEX IF NOT EXISTS idx_analysis_events_contract_type ON analysis_events(contract_type_guess);
CREATE INDEX IF NOT EXISTS idx_analysis_events_source ON analysis_events(source);

-- Row Level Security (RLS) policies
ALTER TABLE analysis_events ENABLE ROW LEVEL SECURITY;

-- Allow service-role to insert (API routes will use service-role key)
CREATE POLICY "Service role can insert events"
  ON analysis_events
  FOR INSERT
  TO service_role
  WITH CHECK (true);

-- No public read access to raw events (aggregate queries only, via admin API or SQL)
-- Admin/stats endpoints will use service-role key for aggregate queries

COMMENT ON TABLE analysis_events IS 'Telemetry for contract uploads and analysis. No PII, no contract content, no full filenames.';
COMMENT ON COLUMN analysis_events.event_type IS 'Lifecycle event: upload_started, analysis_started, analysis_succeeded, analysis_failed';
COMMENT ON COLUMN analysis_events.source IS 'Origin: web (user interface) or api (direct API call)';
COMMENT ON COLUMN analysis_events.file_mime IS 'MIME type (e.g. application/pdf)';
COMMENT ON COLUMN analysis_events.file_ext IS 'File extension only (e.g. .pdf) - no full filename';
COMMENT ON COLUMN analysis_events.size_band IS 'Size range: 0-100kb, 100kb-1mb, 1-5mb, 5mb+';
COMMENT ON COLUMN analysis_events.contract_type_guess IS 'Detected contract type (e.g. lease, freelance, NDA)';
COMMENT ON COLUMN analysis_events.anon_session_id IS 'Anonymous session UUID from cookie/localStorage - NOT user email or PII';
