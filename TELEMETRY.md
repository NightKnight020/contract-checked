# Contract Analysis Telemetry & Storage

This document describes the telemetry system and contract storage for Contract Checked.

## Overview

The system includes:

### 1. **Full Contract Storage**
- Complete uploaded files stored in private Supabase Storage
- Retention period: ~12 months (configurable)
- Used for: service operation, improvement, quality assurance
- SHA-256 deduplication to save storage

### 2. **Telemetry & Analytics**
- Document uploads (started events)
- Analysis lifecycle (started, succeeded, failed)
- File metadata (type, size, extension)
- Contract type classification
- Performance metrics (duration)
- Error tracking

**Privacy Approach:**
- ✅ Contracts stored for operation and improvement
- ✅ Anonymous session IDs (not linked to user identity)
- ✅ No selling to advertisers or third parties
- ✅ Privacy-friendly size bands for analytics
- ✅ User deletion requests honored (see Privacy Policy)

## Database Schema

### Table: `analysis_events`

```sql
CREATE TABLE analysis_events (
  id uuid PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now(),
  
  event_type text NOT NULL,  -- 'upload_started' | 'analysis_started' | 'analysis_succeeded' | 'analysis_failed'
  source text NOT NULL,      -- 'web' | 'api'
  
  -- File metadata (no PII)
  file_mime text,
  file_ext text,
  size_bytes int,
  size_band text,           -- '0-100kb' | '100kb-1mb' | '1-5mb' | '5mb+'
  page_count int,
  
  -- Contract classification
  contract_type_guess text,
  
  -- Performance & errors
  duration_ms int,
  error_code text,
  
  -- Anonymous tracking
  anon_session_id text,
  path text
);
```

## Example SQL Queries

### 1. Total Uploads Per Day (Last 30 Days)

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(*) as uploads
FROM analysis_events
WHERE 
  event_type = 'upload_started'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

### 2. Analysis Success Rate

```sql
SELECT 
  SUM(CASE WHEN event_type = 'analysis_succeeded' THEN 1 ELSE 0 END) as succeeded,
  SUM(CASE WHEN event_type = 'analysis_failed' THEN 1 ELSE 0 END) as failed,
  COUNT(*) as total,
  ROUND(
    100.0 * SUM(CASE WHEN event_type = 'analysis_succeeded' THEN 1 ELSE 0 END) / 
    NULLIF(COUNT(*), 0),
    2
  ) as success_rate_pct
FROM analysis_events
WHERE 
  event_type IN ('analysis_succeeded', 'analysis_failed')
  AND created_at >= NOW() - INTERVAL '30 days';
```

### 3. Uploads by Contract Type

```sql
SELECT 
  COALESCE(contract_type_guess, 'unknown') as contract_type,
  COUNT(*) as count
FROM analysis_events
WHERE 
  event_type = 'analysis_succeeded'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY contract_type_guess
ORDER BY count DESC;
```

### 4. Uploads by File Type

```sql
SELECT 
  COALESCE(file_mime, 'unknown') as file_type,
  COALESCE(file_ext, 'unknown') as extension,
  COUNT(*) as count
FROM analysis_events
WHERE 
  event_type = 'upload_started'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY file_mime, file_ext
ORDER BY count DESC;
```

### 5. Uploads by Size Band

```sql
SELECT 
  COALESCE(size_band, 'unknown') as size_range,
  COUNT(*) as count
FROM analysis_events
WHERE 
  event_type = 'upload_started'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY size_band
ORDER BY 
  CASE size_band
    WHEN '0-100kb' THEN 1
    WHEN '100kb-1mb' THEN 2
    WHEN '1-5mb' THEN 3
    WHEN '5mb+' THEN 4
    ELSE 5
  END;
```

### 6. Average Analysis Duration by Contract Type

```sql
SELECT 
  COALESCE(contract_type_guess, 'unknown') as contract_type,
  COUNT(*) as count,
  ROUND(AVG(duration_ms)) as avg_duration_ms,
  ROUND(AVG(duration_ms) / 1000.0, 2) as avg_duration_sec
FROM analysis_events
WHERE 
  event_type = 'analysis_succeeded'
  AND duration_ms IS NOT NULL
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY contract_type_guess
ORDER BY count DESC;
```

### 7. Error Analysis

```sql
SELECT 
  COALESCE(error_code, 'unknown') as error_type,
  COUNT(*) as count,
  ROUND(100.0 * COUNT(*) / SUM(COUNT(*)) OVER (), 2) as percentage
FROM analysis_events
WHERE 
  event_type = 'analysis_failed'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY error_code
ORDER BY count DESC;
```

### 8. Active Users by Anonymous Session (Last 7 Days)

```sql
SELECT 
  COUNT(DISTINCT anon_session_id) as unique_sessions
FROM analysis_events
WHERE 
  anon_session_id IS NOT NULL
  AND created_at >= NOW() - INTERVAL '7 days';
```

### 9. Hourly Activity Pattern

```sql
SELECT 
  EXTRACT(HOUR FROM created_at) as hour_of_day,
  COUNT(*) as uploads
FROM analysis_events
WHERE 
  event_type = 'upload_started'
  AND created_at >= NOW() - INTERVAL '30 days'
GROUP BY EXTRACT(HOUR FROM created_at)
ORDER BY hour_of_day;
```

### 10. Daily Summary Dashboard

```sql
SELECT 
  DATE(created_at) as date,
  COUNT(CASE WHEN event_type = 'upload_started' THEN 1 END) as uploads,
  COUNT(CASE WHEN event_type = 'analysis_succeeded' THEN 1 END) as succeeded,
  COUNT(CASE WHEN event_type = 'analysis_failed' THEN 1 END) as failed,
  ROUND(
    100.0 * COUNT(CASE WHEN event_type = 'analysis_succeeded' THEN 1 END) / 
    NULLIF(COUNT(CASE WHEN event_type IN ('analysis_succeeded', 'analysis_failed') THEN 1 END), 0),
    2
  ) as success_rate_pct,
  COUNT(DISTINCT anon_session_id) as unique_sessions
FROM analysis_events
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;
```

## Admin API Endpoint

For programmatic access, use the admin stats API:

```bash
# Total uploads
curl "https://your-domain.com/api/admin/stats?metric=uploads&days=30&key=YOUR_ADMIN_KEY"

# Success rate
curl "https://your-domain.com/api/admin/stats?metric=success_rate&days=30&key=YOUR_ADMIN_KEY"

# By contract type
curl "https://your-domain.com/api/admin/stats?metric=by_type&days=30&key=YOUR_ADMIN_KEY"

# By day
curl "https://your-domain.com/api/admin/stats?metric=by_day&days=30&key=YOUR_ADMIN_KEY"

# Errors
curl "https://your-domain.com/api/admin/stats?metric=errors&days=30&key=YOUR_ADMIN_KEY"
```

## Environment Variables

Add to your `.env.local`:

```bash
# Required for telemetry
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Optional: Admin stats API key
ADMIN_STATS_KEY=your_secure_random_key_here
```

## Running the Migration

Using Supabase CLI:

```bash
# If you have Supabase CLI installed
supabase migration up

# Or apply directly via SQL editor in Supabase Dashboard
# Copy and paste the content of supabase/migrations/20260919190819_create_analysis_events.sql
```

## GA4 Integration (Optional)

If you have Google Analytics 4 configured (G-NLDX2FS7ZH), the system will automatically track custom events:

- Event: `analysis_succeeded`
- Parameters: 
  - `contract_type`: detected contract type
  - `mode`: 'single' or 'compare'

## Privacy Compliance

This telemetry system is designed to be privacy-friendly:

1. **No PII**: No email addresses, names, or user identifiers
2. **No Content**: Contract text is never stored
3. **Anonymized**: Only anonymous session IDs (client-generated UUIDs)
4. **Aggregate Only**: Optimized for aggregate queries, not individual tracking
5. **Size Bands**: File sizes are bucketed, not exact
6. **Extensions Only**: Only file extensions stored, not full filenames

## Querying in Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to "SQL Editor"
3. Paste any of the example queries above
4. Click "Run" to see results
5. You can save frequently-used queries as "Favorites"

## Future Enhancements

Potential additions (not in v1):

- [ ] Page count tracking (for PDFs)
- [ ] More granular error categorization
- [ ] User retention cohorts (by anonymous session)
- [ ] Conversion funnel analysis
- [ ] Real-time dashboard
- [ ] Automated email reports
