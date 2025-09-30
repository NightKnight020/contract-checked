'use client';

import { useState, useEffect, useRef } from 'react';

interface HoverPreviewProps {
  templateId: string;
  isVisible: boolean;
  position: { x: number; y: number };
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

interface TemplatePreview {
  title: string;
  preview: string;
}

export function HoverPreview({ templateId, isVisible, position, onMouseEnter, onMouseLeave }: HoverPreviewProps) {
  const [preview, setPreview] = useState<TemplatePreview | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isVisible && templateId) {
      setLoading(true);
      setError(null);
      setPreview(null); // Reset preview when template changes

      fetch(`/api/templates/preview/${templateId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to load preview');
          }
          return response.json();
        })
        .then((data: TemplatePreview) => {
          setPreview(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error('Error loading preview:', err);
          setError('Failed to load preview');
          setLoading(false);
        });
    }
  }, [isVisible, templateId]);

  if (!isVisible) return null;

  const previewStyle: React.CSSProperties = {
    position: 'fixed',
    left: position.x,
    top: position.y,
    zIndex: 1000,
    maxWidth: '400px',
    maxHeight: '300px',
    backgroundColor: 'white',
    border: '1px solid #e5e7eb',
    borderRadius: '8px',
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
  };

  return (
    <div
      ref={previewRef}
      style={previewStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="animate-in fade-in duration-200"
    >
      {loading && (
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="text-sm text-slate-600 mt-2">Loading preview...</p>
        </div>
      )}

      {error && (
        <div className="p-4 text-center">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      {preview && (
        <div className="p-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-3 border-b border-slate-200 pb-2">
            {preview.title}
          </h3>
          <div
            className="text-sm text-slate-700 leading-relaxed overflow-y-auto max-h-48 prose prose-sm"
            dangerouslySetInnerHTML={{ __html: preview.preview }}
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#cbd5e1 #f8fafc',
            }}
          />
          <div className="mt-3 pt-3 border-t border-slate-200">
            <p className="text-xs text-slate-500 text-center">
              Hover to keep preview open • Scroll to read more
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
