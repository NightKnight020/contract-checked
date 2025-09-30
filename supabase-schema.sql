-- Create contract_analyses table
CREATE TABLE IF NOT EXISTS contract_analyses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    file_name TEXT NOT NULL,
    file_size BIGINT NOT NULL,
    file_type TEXT NOT NULL,
    file_path TEXT, -- Path to stored file in Supabase storage
    summary TEXT NOT NULL,
    key_clauses JSONB NOT NULL,
    recommendations JSONB NOT NULL,
    overall_risk TEXT NOT NULL CHECK (overall_risk IN ('high', 'medium', 'low')),
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE, -- Required: link to authenticated user
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Create index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_contract_analyses_created_at ON contract_analyses(created_at DESC);

-- Create index on user_id for future user-specific queries
CREATE INDEX IF NOT EXISTS idx_contract_analyses_user_id ON contract_analyses(user_id);

-- Enable Row Level Security (RLS)
ALTER TABLE contract_analyses ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert their own analyses
CREATE POLICY "Users can insert their own analyses" ON contract_analyses
    FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Allow users to read their own analyses
CREATE POLICY "Users can read their own analyses" ON contract_analyses
    FOR SELECT
    USING (auth.uid() = user_id);

-- Allow users to update their own analyses
CREATE POLICY "Users can update their own analyses" ON contract_analyses
    FOR UPDATE
    USING (auth.uid() = user_id);

-- Contract categories for classification
CREATE TABLE IF NOT EXISTS contract_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    description TEXT,
    keywords TEXT[], -- Keywords that help identify this category
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Contract analysis categories (many-to-many relationship)
CREATE TABLE IF NOT EXISTS contract_analysis_categories (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    analysis_id UUID REFERENCES contract_analyses(id) ON DELETE CASCADE,
    category_id UUID REFERENCES contract_categories(id) ON DELETE CASCADE,
    confidence_score DECIMAL(3,2) CHECK (confidence_score >= 0 AND confidence_score <= 1),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(analysis_id, category_id)
);

-- Resource recommendations
CREATE TABLE IF NOT EXISTS resource_recommendations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    category_id UUID REFERENCES contract_categories(id) ON DELETE CASCADE,
    resource_type TEXT NOT NULL CHECK (resource_type IN ('template', 'expert', 'guide', 'service')),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    url TEXT, -- For templates/guides
    priority INTEGER DEFAULT 1, -- Higher number = higher priority
    conditions JSONB, -- Conditions when to show this recommendation (risk level, etc.)
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Expert partners/specialists
CREATE TABLE IF NOT EXISTS expert_partners (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    title TEXT NOT NULL,
    specialization TEXT NOT NULL,
    location_lat DECIMAL(10,8),
    location_lng DECIMAL(11,8),
    location_city TEXT,
    location_state TEXT,
    location_country TEXT DEFAULT 'US',
    contact_email TEXT,
    contact_phone TEXT,
    website_url TEXT,
    rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
    review_count INTEGER DEFAULT 0,
    hourly_rate DECIMAL(8,2),
    availability_status TEXT DEFAULT 'available' CHECK (availability_status IN ('available', 'busy', 'unavailable')),
    bio TEXT,
    certifications TEXT[],
    languages TEXT[] DEFAULT ARRAY['English'],
    is_verified BOOLEAN DEFAULT false,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW())
);

-- Expert specializations (many-to-many with contract categories)
CREATE TABLE IF NOT EXISTS expert_specializations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    expert_id UUID REFERENCES expert_partners(id) ON DELETE CASCADE,
    category_id UUID REFERENCES contract_categories(id) ON DELETE CASCADE,
    expertise_level TEXT DEFAULT 'general' CHECK (expertise_level IN ('beginner', 'general', 'expert')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    UNIQUE(expert_id, category_id)
);

-- Contract learning patterns (for AI self-improvement)
CREATE TABLE IF NOT EXISTS contract_learning_patterns (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    contract_text_sample TEXT NOT NULL, -- Anonymized sample for pattern recognition
    categories UUID[] NOT NULL, -- Array of category IDs
    risk_patterns JSONB, -- Patterns that indicate risk levels
    common_clauses JSONB, -- Frequently found clauses
    user_feedback JSONB, -- Any user feedback on recommendations
    analysis_confidence DECIMAL(3,2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_contract_analysis_categories_analysis_id ON contract_analysis_categories(analysis_id);
CREATE INDEX IF NOT EXISTS idx_contract_analysis_categories_category_id ON contract_analysis_categories(category_id);
CREATE INDEX IF NOT EXISTS idx_resource_recommendations_category_id ON resource_recommendations(category_id);
CREATE INDEX IF NOT EXISTS idx_resource_recommendations_type ON resource_recommendations(resource_type);
CREATE INDEX IF NOT EXISTS idx_expert_partners_location ON expert_partners(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_expert_partners_specialization ON expert_partners(specialization);
CREATE INDEX IF NOT EXISTS idx_expert_partners_rating ON expert_partners(rating DESC);
CREATE INDEX IF NOT EXISTS idx_expert_specializations_expert_id ON expert_specializations(expert_id);
CREATE INDEX IF NOT EXISTS idx_expert_specializations_category_id ON expert_specializations(category_id);

-- Insert default contract categories
INSERT INTO contract_categories (name, description, keywords) VALUES
('Real Estate', 'Residential and commercial property contracts including leases, purchases, and mortgages', ARRAY['lease', 'rental', 'property', 'mortgage', 'real estate', 'housing', 'tenant', 'landlord']),
('Employment', 'Employment agreements, contracts, and HR-related documents', ARRAY['employment', 'job', 'salary', 'employee', 'employer', 'compensation', 'benefits', 'termination']),
('Business Services', 'Service contracts for business operations and professional services', ARRAY['services', 'consulting', 'contractor', 'professional', 'business', 'agreement']),
('Legal', 'Legal documents including NDAs, partnerships, and corporate agreements', ARRAY['nda', 'confidentiality', 'partnership', 'corporate', 'legal', 'agreement']),
('Sales & Commerce', 'Sales contracts, purchase agreements, and commercial transactions', ARRAY['sales', 'purchase', 'goods', 'commerce', 'vendor', 'buyer', 'merchandise']),
('Media & Content', 'Media releases, content creation, and intellectual property agreements', ARRAY['media', 'content', 'photography', 'video', 'intellectual property', 'copyright']),
('Financial', 'Financial agreements including loans, investments, and banking documents', ARRAY['loan', 'investment', 'financial', 'banking', 'credit', 'finance', 'lending'])
ON CONFLICT (name) DO NOTHING;

-- Insert default resource recommendations
INSERT INTO resource_recommendations (category_id, resource_type, title, description, priority, conditions) VALUES
((SELECT id FROM contract_categories WHERE name = 'Real Estate'), 'template', 'Residential Rental Agreement Template', 'Professional rental agreement template with all essential clauses', 5, '{"risk_levels": ["high", "medium"]}'),
((SELECT id FROM contract_categories WHERE name = 'Real Estate'), 'expert', 'Real Estate Attorney Consultation', 'Connect with licensed real estate attorneys in your area', 4, '{"risk_levels": ["high"]}'),
((SELECT id FROM contract_categories WHERE name = 'Employment'), 'template', 'Employment Agreement Template', 'Comprehensive employment contract template', 5, '{"risk_levels": ["high", "medium"]}'),
((SELECT id FROM contract_categories WHERE name = 'Employment'), 'expert', 'Employment Law Specialist', 'Connect with employment law experts', 4, '{"risk_levels": ["high"]}'),
((SELECT id FROM contract_categories WHERE name = 'Legal'), 'template', 'Non-Disclosure Agreement Template', 'Standard NDA template for protecting confidential information', 5, '{"risk_levels": ["high", "medium"]}'),
((SELECT id FROM contract_categories WHERE name = 'Business Services'), 'template', 'General Services Contract Template', 'Versatile template for various business services', 4, '{"risk_levels": ["high", "medium"]}'),
((SELECT id FROM contract_categories WHERE name = 'Business Services'), 'expert', 'Business Law Consultant', 'Connect with business law specialists', 3, '{"risk_levels": ["high"]}');

-- Insert sample expert partners
INSERT INTO expert_partners (
  name, title, specialization, location_lat, location_lng, location_city, location_state,
  contact_email, website_url, rating, review_count, hourly_rate, bio, certifications,
  languages, is_verified, is_featured
) VALUES
-- Real Estate Attorneys
('Sarah Johnson', 'Real Estate Attorney', 'Real Estate Law', -118.2437, 34.0522, 'Los Angeles', 'CA',
  'sarah.johnson@lawfirm.com', 'https://johnsonlaw.com', 4.8, 127, 350,
  'Sarah Johnson is a licensed real estate attorney with over 10 years of experience in residential and commercial property transactions.',
  ARRAY['California Bar License', 'Real Estate Law Certification'], ARRAY['English', 'Spanish'], true, true),

('Michael Davis', 'Real Estate Attorney', 'Real Estate Law', -87.6298, 41.8781, 'Chicago', 'IL',
  'michael.davis@chicagolaw.com', 'https://chicagopropertylaw.com', 4.9, 89, 425,
  'Michael Davis specializes in real estate law, including lease agreements, property disputes, and commercial transactions.',
  ARRAY['Illinois Bar License', 'Real Estate Law Specialist'], ARRAY['English'], true, false),

('Emily Chen', 'Real Estate Attorney', 'Real Estate Law', -74.0060, 40.7128, 'New York', 'NY',
  'emily.chen@nylawpartners.com', 'https://nylawpartners.com', 4.7, 156, 500,
  'Emily Chen focuses on real estate transactions, landlord-tenant law, and property development agreements.',
  ARRAY['New York Bar License', 'Commercial Real Estate Certification'], ARRAY['English', 'Mandarin'], true, true),

-- Employment Law Specialists
('David Wilson', 'Employment Law Attorney', 'Employment Law', -122.4194, 37.7749, 'San Francisco', 'CA',
  'david.wilson@employmentlaw.com', 'https://sfemploymentlaw.com', 4.9, 98, 375,
  'David Wilson is an employment law expert specializing in contract negotiations, workplace policies, and dispute resolution.',
  ARRAY['California Bar License', 'Employment Law Certification'], ARRAY['English'], true, true),

('Lisa Rodriguez', 'Employment Law Consultant', 'Employment Law', -71.0589, 42.3601, 'Boston', 'MA',
  'lisa.rodriguez@bostonemployment.com', 'https://bostonemploymentlaw.com', 4.6, 73, 325,
  'Lisa Rodriguez helps businesses navigate employment contracts, compliance, and labor relations.',
  ARRAY['Massachusetts Bar License', 'HR Law Specialist'], ARRAY['English', 'Portuguese'], true, false),

-- Business Law Consultants
('Robert Taylor', 'Business Law Attorney', 'Business Law', -118.2437, 34.0522, 'Los Angeles', 'CA',
  'robert.taylor@businesslawla.com', 'https://businesslawla.com', 4.8, 142, 400,
  'Robert Taylor provides comprehensive business law services including contracts, partnerships, and corporate governance.',
  ARRAY['California Bar License', 'Business Law Certification'], ARRAY['English'], true, true),

('Jennifer Lee', 'Business Law Consultant', 'Business Law', -87.6298, 41.8781, 'Chicago', 'IL',
  'jennifer.lee@chicagobusinesslaw.com', 'https://chicagobusinesslaw.com', 4.7, 91, 375,
  'Jennifer Lee specializes in business formation, contract drafting, and commercial transactions.',
  ARRAY['Illinois Bar License', 'Corporate Law Specialist'], ARRAY['English', 'Korean'], true, false),

-- Legal Services
('Alexander Brown', 'Commercial Law Attorney', 'Commercial Law', -74.0060, 40.7128, 'New York', 'NY',
  'alexander.brown@nylegalservices.com', 'https://nylegalservices.com', 4.9, 203, 450,
  'Alexander Brown offers comprehensive legal services including NDA drafting, partnership agreements, and dispute resolution.',
  ARRAY['New York Bar License', 'Commercial Law Certification'], ARRAY['English', 'French'], true, true),

('Maria Garcia', 'Legal Consultant', 'Business & Startup Law', -122.4194, 37.7749, 'San Francisco', 'CA',
  'maria.garcia@sflegalservices.com', 'https://sflegalservices.com', 4.8, 118, 375,
  'Maria Garcia provides legal consulting for startups, small businesses, and entrepreneurs.',
  ARRAY['California Bar License', 'Startup Law Specialist'], ARRAY['English', 'Spanish'], true, false)
ON CONFLICT DO NOTHING;

-- Link experts to their specializations
INSERT INTO expert_specializations (expert_id, category_id, expertise_level) VALUES
-- Real Estate Experts
((SELECT id FROM expert_partners WHERE name = 'Sarah Johnson'), (SELECT id FROM contract_categories WHERE name = 'Real Estate'), 'expert'),
((SELECT id FROM expert_partners WHERE name = 'Michael Davis'), (SELECT id FROM contract_categories WHERE name = 'Real Estate'), 'expert'),
((SELECT id FROM expert_partners WHERE name = 'Emily Chen'), (SELECT id FROM contract_categories WHERE name = 'Real Estate'), 'expert'),

-- Employment Experts
((SELECT id FROM expert_partners WHERE name = 'David Wilson'), (SELECT id FROM contract_categories WHERE name = 'Employment'), 'expert'),
((SELECT id FROM expert_partners WHERE name = 'Lisa Rodriguez'), (SELECT id FROM contract_categories WHERE name = 'Employment'), 'general'),

-- Business Services Experts
((SELECT id FROM expert_partners WHERE name = 'Robert Taylor'), (SELECT id FROM contract_categories WHERE name = 'Business Services'), 'expert'),
((SELECT id FROM expert_partners WHERE name = 'Jennifer Lee'), (SELECT id FROM contract_categories WHERE name = 'Business Services'), 'general'),

-- Legal Experts (multiple categories)
((SELECT id FROM expert_partners WHERE name = 'Alexander Brown'), (SELECT id FROM contract_categories WHERE name = 'Legal'), 'expert'),
((SELECT id FROM expert_partners WHERE name = 'Alexander Brown'), (SELECT id FROM contract_categories WHERE name = 'Business Services'), 'general'),
((SELECT id FROM expert_partners WHERE name = 'Maria Garcia'), (SELECT id FROM contract_categories WHERE name = 'Legal'), 'general'),
((SELECT id FROM expert_partners WHERE name = 'Maria Garcia'), (SELECT id FROM contract_categories WHERE name = 'Business Services'), 'general')
ON CONFLICT DO NOTHING;

-- Create storage bucket for contract files
INSERT INTO storage.buckets (id, name, public)
VALUES ('contract-files', 'contract-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for contract files
CREATE POLICY "Allow authenticated users to upload contract files" ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'contract-files' AND auth.role() = 'authenticated');

CREATE POLICY "Allow users to view their own contract files" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'contract-files' AND auth.role() = 'authenticated');

-- For now, allow anonymous access (will be restricted later with user auth)
CREATE POLICY "Allow anonymous contract file uploads" ON storage.objects
    FOR INSERT
    WITH CHECK (bucket_id = 'contract-files');

CREATE POLICY "Allow anonymous contract file reads" ON storage.objects
    FOR SELECT
    USING (bucket_id = 'contract-files');

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
