-- Create stored_contracts table for full contract retention
CREATE TABLE IF NOT EXISTS stored_contracts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  
  -- Storage reference
  storage_path text NOT NULL UNIQUE,
  
  -- File metadata
  mime text NOT NULL,
  ext text,
  size_bytes int NOT NULL,
  sha256 text NOT NULL,
  
  -- Classification and tracking
  anon_session_id text,
  contract_type_guess text,
  analysis_status text NOT NULL DEFAULT 'pending' CHECK (analysis_status IN ('pending', 'completed', 'failed')),
  
  -- Link to telemetry
  analysis_event_id uuid REFERENCES analysis_events(id) ON DELETE SET NULL,
  
  -- Retention policy (default 365 days)
  retention_until timestamptz NOT NULL DEFAULT (now() + interval '365 days'),
  deleted_at timestamptz
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_stored_contracts_created_at ON stored_contracts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_stored_contracts_sha256 ON stored_contracts(sha256);
CREATE INDEX IF NOT EXISTS idx_stored_contracts_anon_session ON stored_contracts(anon_session_id);
CREATE INDEX IF NOT EXISTS idx_stored_contracts_retention ON stored_contracts(retention_until) WHERE deleted_at IS NULL;
CREATE INDEX IF NOT EXISTS idx_stored_contracts_analysis_event ON stored_contracts(analysis_event_id);

-- Row Level Security
ALTER TABLE stored_contracts ENABLE ROW LEVEL SECURITY;

-- Service role can do everything
CREATE POLICY "Service role full access on stored_contracts"
  ON stored_contracts
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- No public access to stored contracts
-- (Operators use service-role key via admin tools)

COMMENT ON TABLE stored_contracts IS 'Full contract file storage for retention, improvement, and operational purposes. Private bucket, service-role only.';
COMMENT ON COLUMN stored_contracts.storage_path IS 'Path in Supabase Storage bucket (contract-uploads)';
COMMENT ON COLUMN stored_contracts.sha256 IS 'SHA-256 hash for deduplication and integrity';
COMMENT ON COLUMN stored_contracts.retention_until IS 'Date after which contract may be deleted (default 365 days from upload)';
COMMENT ON COLUMN stored_contracts.deleted_at IS 'Soft deletion timestamp for user-requested deletions';
