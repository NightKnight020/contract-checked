-- Contract history table
CREATE TABLE IF NOT EXISTS public.contract_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  contract_type TEXT,
  file_name TEXT,
  overall_risk TEXT CHECK (overall_risk IN ('low', 'medium', 'high')),
  analysis_mode TEXT CHECK (analysis_mode IN ('single', 'compare')) DEFAULT 'single',
  analysis_result JSONB NOT NULL,
  plain_english_summary TEXT
);

-- Row Level Security
ALTER TABLE public.contract_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can only see their own history"
  ON public.contract_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own history"
  ON public.contract_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own history"
  ON public.contract_history FOR DELETE
  USING (auth.uid() = user_id);

-- Index for fast user lookups
CREATE INDEX IF NOT EXISTS contract_history_user_id_idx ON public.contract_history(user_id);
CREATE INDEX IF NOT EXISTS contract_history_created_at_idx ON public.contract_history(created_at DESC);
