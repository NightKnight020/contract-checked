import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface ContractAnalysis {
  id: string;
  created_at: string;
  file_name: string;
  file_size: number;
  file_type: string;
  summary: string;
  key_clauses: Array<{
    title: string;
    description: string;
    risk: 'high' | 'medium' | 'low';
    type: 'advantage' | 'disadvantage' | 'neutral';
  }>;
  recommendations: string[];
  overall_risk: 'high' | 'medium' | 'low';
  user_id?: string;
}

export interface Database {
  public: {
    Tables: {
      contract_analyses: {
        Row: ContractAnalysis;
        Insert: Omit<ContractAnalysis, 'id' | 'created_at'>;
        Update: Partial<Omit<ContractAnalysis, 'id' | 'created_at'>>;
      };
    };
  };
}
