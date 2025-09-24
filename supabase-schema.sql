-- Create contract_analyses table
CREATE TABLE IF NOT EXISTS contract_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type TEXT NOT NULL,
    summary TEXT NOT NULL,
    key_clauses JSONB NOT NULL,
    recommendations JSONB NOT NULL,
    overall_risk TEXT NOT NULL CHECK (overall_risk IN ('high', 'medium', 'low')),
    user_id UUID, -- Optional: for future user authentication
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contract_analyses_created_at ON contract_analyses(created_at DESC);

-- Create index on user_id for future user-specific queries
CREATE INDEX IF NOT EXISTS idx_contract_analyses_user_id ON contract_analyses(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE contract_analyses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous inserts (for now)
-- In production, you might want to restrict this or add user authentication
CREATE POLICY "Allow anonymous analysis inserts" ON contract_analyses
    FOR INSERT
    WITH CHECK (true);

-- Allow reading analyses (for future features)
CREATE POLICY "Allow anonymous analysis reads" ON contract_analyses
    FOR SELECT
    USING (true);

-- Optional: Create a view for analytics
CREATE OR REPLACE VIEW contract_analysis_stats AS
SELECT
    COUNT(*) as total_analyses,
    AVG(CASE
        WHEN overall_risk = 'low' THEN 1
        WHEN overall_risk = 'medium' THEN 2
        WHEN overall_risk = 'high' THEN 3
    END) as avg_risk_score,
    COUNT(CASE WHEN overall_risk = 'high' THEN 1 END) as high_risk_count,
    COUNT(CASE WHEN overall_risk = 'medium' THEN 1 END) as medium_risk_count,
    COUNT(CASE WHEN overall_risk = 'low' THEN 1 END) as low_risk_count
FROM contract_analyses;
