import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const ADMIN_STATS_KEY = process.env.ADMIN_STATS_KEY;

function getAdminClient() {
  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }
  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  });
}

/**
 * Admin stats endpoint - requires ADMIN_STATS_KEY for authentication
 * 
 * Query params:
 * - metric: 'uploads' | 'success_rate' | 'by_type' | 'by_day' | 'errors'
 * - days: number of days to look back (default: 30)
 * - key: ADMIN_STATS_KEY for authentication
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    const metric = searchParams.get('metric') || 'uploads';
    const days = parseInt(searchParams.get('days') || '30', 10);

    // Check authentication
    if (!ADMIN_STATS_KEY || key !== ADMIN_STATS_KEY) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = getAdminClient();
    if (!client) {
      return NextResponse.json({ error: 'Stats service not configured' }, { status: 503 });
    }

    const since = new Date();
    since.setDate(since.getDate() - days);
    const sinceStr = since.toISOString();

    // Query based on metric type
    switch (metric) {
      case 'uploads': {
        // Total uploads in the period
        const { count, error } = await client
          .from('analysis_events')
          .select('*', { count: 'exact', head: true })
          .eq('event_type', 'upload_started')
          .gte('created_at', sinceStr);

        if (error) throw error;
        return NextResponse.json({ metric: 'uploads', days, count });
      }

      case 'success_rate': {
        // Success rate
        const [successResult, failResult] = await Promise.all([
          client
            .from('analysis_events')
            .select('*', { count: 'exact', head: true })
            .eq('event_type', 'analysis_succeeded')
            .gte('created_at', sinceStr),
          client
            .from('analysis_events')
            .select('*', { count: 'exact', head: true })
            .eq('event_type', 'analysis_failed')
            .gte('created_at', sinceStr),
        ]);

        const succeeded = successResult.count || 0;
        const failed = failResult.count || 0;
        const total = succeeded + failed;
        const successRate = total > 0 ? (succeeded / total) * 100 : 0;

        return NextResponse.json({
          metric: 'success_rate',
          days,
          succeeded,
          failed,
          total,
          successRate: successRate.toFixed(2) + '%',
        });
      }

      case 'by_type': {
        // Group by contract type
        const { data, error } = await client
          .from('analysis_events')
          .select('contract_type_guess')
          .eq('event_type', 'analysis_succeeded')
          .gte('created_at', sinceStr);

        if (error) throw error;

        // Manual aggregation since Supabase doesn't support GROUP BY in JS client
        const counts: Record<string, number> = {};
        (data || []).forEach((row: { contract_type_guess: string | null }) => {
          const type = row.contract_type_guess || 'unknown';
          counts[type] = (counts[type] || 0) + 1;
        });

        return NextResponse.json({
          metric: 'by_type',
          days,
          data: Object.entries(counts)
            .map(([type, count]) => ({ type, count }))
            .sort((a, b) => b.count - a.count),
        });
      }

      case 'by_day': {
        // Group by day
        const { data, error } = await client
          .from('analysis_events')
          .select('created_at, event_type')
          .in('event_type', ['upload_started', 'analysis_succeeded', 'analysis_failed'])
          .gte('created_at', sinceStr)
          .order('created_at', { ascending: true });

        if (error) throw error;

        // Group by date
        const byDay: Record<string, { uploads: number; succeeded: number; failed: number }> = {};
        (data || []).forEach((row: { created_at: string; event_type: string }) => {
          const date = row.created_at.split('T')[0];
          if (!byDay[date]) {
            byDay[date] = { uploads: 0, succeeded: 0, failed: 0 };
          }
          if (row.event_type === 'upload_started') byDay[date].uploads++;
          if (row.event_type === 'analysis_succeeded') byDay[date].succeeded++;
          if (row.event_type === 'analysis_failed') byDay[date].failed++;
        });

        return NextResponse.json({
          metric: 'by_day',
          days,
          data: Object.entries(byDay).map(([date, stats]) => ({ date, ...stats })),
        });
      }

      case 'errors': {
        // Group by error code
        const { data, error } = await client
          .from('analysis_events')
          .select('error_code')
          .eq('event_type', 'analysis_failed')
          .gte('created_at', sinceStr);

        if (error) throw error;

        const counts: Record<string, number> = {};
        (data || []).forEach((row: { error_code: string | null }) => {
          const code = row.error_code || 'unknown';
          counts[code] = (counts[code] || 0) + 1;
        });

        return NextResponse.json({
          metric: 'errors',
          days,
          data: Object.entries(counts)
            .map(([code, count]) => ({ error_code: code, count }))
            .sort((a, b) => b.count - a.count),
        });
      }

      default:
        return NextResponse.json({ error: 'Invalid metric type' }, { status: 400 });
    }
  } catch (error) {
    console.error('[Admin Stats] Error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch stats', details: error instanceof Error ? error.message : 'unknown' },
      { status: 500 }
    );
  }
}
