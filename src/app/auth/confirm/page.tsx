'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

function AuthConfirmContent() {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleAuthConfirmation = async () => {
      if (!supabase) {
        setStatus('error');
        setMessage('Authentication service is not available. Please try again.');
        return;
      }

      try {
        // Handle different auth flows
        const token_hash = searchParams.get('token_hash');
        const type = searchParams.get('type');
        const error_description = searchParams.get('error_description');

        if (error_description) {
          setStatus('error');
          setMessage('There was an error confirming your account. Please try again.');
          return;
        }

        if (token_hash && type) {
          const { error } = await supabase.auth.verifyOtp({
            token_hash,
            type: type as 'signup' | 'recovery' | 'invite',
          });

          if (error) {
            setStatus('error');
            setMessage('Failed to verify your account. The link may have expired.');
          } else {
            setStatus('success');
            setMessage('Your account has been successfully verified! You can now use Contract Checked.');

            // Redirect to home after success
            setTimeout(() => {
              router.push('/');
            }, 3000);
          }
        } else {
          setStatus('error');
          setMessage('Invalid confirmation link. Please try signing up again.');
        }
      } catch (error) {
        console.error('Auth confirmation error:', error);
        setStatus('error');
        setMessage('An unexpected error occurred. Please try again.');
      }
    };

    handleAuthConfirmation();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/50 p-8 text-center">
        {/* Header */}
        <div className="mb-6">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            {status === 'loading' && (
              <ArrowPathIcon className="w-8 h-8 text-white animate-spin" />
            )}
            {status === 'success' && (
              <CheckCircleIcon className="w-8 h-8 text-white" />
            )}
            {status === 'error' && (
              <XCircleIcon className="w-8 h-8 text-white" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">
            {status === 'loading' && 'Confirming Your Account'}
            {status === 'success' && 'Account Verified!'}
            {status === 'error' && 'Verification Failed'}
          </h1>
        </div>

        {/* Message */}
        <div className="mb-6">
          <p className="text-slate-600 leading-relaxed">{message}</p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          {status === 'success' && (
            <p className="text-sm text-slate-500">
              Redirecting you to Contract Checked in a few seconds...
            </p>
          )}

          {status === 'error' && (
            <div className="space-y-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:from-indigo-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Return to Contract Checked
              </Link>
              <p className="text-xs text-slate-500">
                Need help? Contact our support team.
              </p>
            </div>
          )}

          {status === 'loading' && (
            <p className="text-sm text-slate-500">
              Please wait while we verify your account...
            </p>
          )}
        </div>

        {/* Branding */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">CC</span>
            </div>
            <span className="text-sm font-semibold text-slate-900">Contract Checked</span>
          </div>
          <p className="text-xs text-slate-500">
            AI-powered contract analysis made simple
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AuthConfirmPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-200/50 p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <ArrowPathIcon className="w-8 h-8 text-white animate-spin" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">Loading...</h1>
        </div>
      </div>
    }>
      <AuthConfirmContent />
    </Suspense>
  );
}
