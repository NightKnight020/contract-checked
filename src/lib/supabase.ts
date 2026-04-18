import { createBrowserClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Client-side Supabase client (for browser)
export const supabase = supabaseUrl && supabaseAnonKey
  ? createBrowserClient(supabaseUrl, supabaseAnonKey)
  : null;

// Database types
export interface ContractAnalysis {
  id: string;
  created_at: string;
  file_name: string;
  file_size: number;
  file_type: string;
  file_path?: string;
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
  updated_at?: string;
}

export interface ContractCategory {
  id: string;
  name: string;
  description: string | null;
  keywords: string[];
  created_at: string;
}

export interface ContractAnalysisCategory {
  id: string;
  analysis_id: string;
  category_id: string;
  confidence_score: number | null;
  created_at: string;
}

export interface ResourceRecommendation {
  id: string;
  category_id: string;
  resource_type: 'template' | 'expert' | 'guide' | 'service';
  title: string;
  description: string;
  url: string | null;
  priority: number;
  conditions: Record<string, unknown> | null;
  is_active: boolean;
  created_at: string;
}

export interface ExpertPartner {
  id: string;
  name: string;
  title: string;
  specialization: string;
  location_lat: number | null;
  location_lng: number | null;
  location_city: string | null;
  location_state: string | null;
  location_country: string;
  contact_email: string | null;
  contact_phone: string | null;
  website_url: string | null;
  rating: number | null;
  review_count: number;
  hourly_rate: number | null;
  availability_status: 'available' | 'busy' | 'unavailable';
  bio: string | null;
  certifications: string[] | null;
  languages: string[];
  is_verified: boolean;
  is_featured: boolean;
  created_at: string;
  updated_at: string | null;
}

export interface ExpertSpecialization {
  id: string;
  expert_id: string;
  category_id: string;
  expertise_level: 'beginner' | 'general' | 'expert';
  created_at: string;
}

export interface ContractLearningPattern {
  id: string;
  contract_text_sample: string;
  categories: string[];
  risk_patterns: Record<string, unknown> | null;
  common_clauses: Record<string, unknown> | null;
  user_feedback: Record<string, unknown> | null;
  analysis_confidence: number | null;
  created_at: string;
}

export interface HistoryEntry {
  id: string;
  user_id: string;
  created_at: string;
  contract_type: string | null;
  file_name: string | null;
  overall_risk: 'low' | 'medium' | 'high' | null;
  analysis_mode: 'single' | 'compare';
  analysis_result: Record<string, unknown>;
  plain_english_summary: string | null;
}

export async function saveAnalysisToHistory(
  userId: string,
  data: {
    contractType?: string;
    fileName?: string;
    overallRisk?: 'low' | 'medium' | 'high';
    analysisMode: 'single' | 'compare';
    analysisResult: Record<string, unknown>;
    plainEnglishSummary?: string;
  }
): Promise<{ id: string } | null> {
  if (!supabase) return null;
  const { data: row, error } = await supabase
    .from('contract_history')
    .insert({
      user_id: userId,
      contract_type: data.contractType ?? null,
      file_name: data.fileName ?? null,
      overall_risk: data.overallRisk ?? null,
      analysis_mode: data.analysisMode,
      analysis_result: data.analysisResult as Record<string, unknown>,
      plain_english_summary: data.plainEnglishSummary ?? null,
    })
    .select('id')
    .single();
  if (error) { console.error('saveAnalysis error:', error); return null; }
  return row;
}

export async function getUserHistory(userId: string): Promise<HistoryEntry[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from('contract_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(50);
  if (error) { console.error('getUserHistory error:', error); return []; }
  return (data ?? []) as HistoryEntry[];
}

export async function deleteHistoryEntry(id: string): Promise<boolean> {
  if (!supabase) return false;
  const { error } = await supabase.from('contract_history').delete().eq('id', id);
  return !error;
}

export interface Database {
  public: {
    Tables: {
      contract_analyses: {
        Row: ContractAnalysis;
        Insert: Omit<ContractAnalysis, 'id' | 'created_at'>;
        Update: Partial<Omit<ContractAnalysis, 'id' | 'created_at'>>;
      };
      contract_categories: {
        Row: ContractCategory;
        Insert: Omit<ContractCategory, 'id' | 'created_at'>;
        Update: Partial<Omit<ContractCategory, 'id' | 'created_at'>>;
      };
      contract_analysis_categories: {
        Row: ContractAnalysisCategory;
        Insert: Omit<ContractAnalysisCategory, 'id' | 'created_at'>;
        Update: Partial<Omit<ContractAnalysisCategory, 'id' | 'created_at'>>;
      };
      resource_recommendations: {
        Row: ResourceRecommendation;
        Insert: Omit<ResourceRecommendation, 'id' | 'created_at'>;
        Update: Partial<Omit<ResourceRecommendation, 'id' | 'created_at'>>;
      };
      expert_partners: {
        Row: ExpertPartner;
        Insert: Omit<ExpertPartner, 'id' | 'created_at'>;
        Update: Partial<Omit<ExpertPartner, 'id' | 'created_at'>>;
      };
      expert_specializations: {
        Row: ExpertSpecialization;
        Insert: Omit<ExpertSpecialization, 'id' | 'created_at'>;
        Update: Partial<Omit<ExpertSpecialization, 'id' | 'created_at'>>;
      };
      contract_learning_patterns: {
        Row: ContractLearningPattern;
        Insert: Omit<ContractLearningPattern, 'id' | 'created_at'>;
        Update: Partial<Omit<ContractLearningPattern, 'id' | 'created_at'>>;
      };
    };
  };
}
