'use client';

import { useCallback, useState } from 'react';
import { Upload, File, X, Sparkles, FileText, CheckCircle, Camera, Type, GitCompare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

type TabType = 'file' | 'photo' | 'text';

export interface UploadPayload {
  mode: 'single' | 'compare';
  tab: TabType;
  fileA?: File;
  fileB?: File;
  text?: string;
}

interface ContractUploadProps {
  onAnalyze: (payload: UploadPayload) => void;
  isAnalyzing: boolean;
}

const VALID_DOC_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
];

const VALID_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

function formatFileSize(bytes: number) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

interface DropZoneProps {
  label: string;
  accept: string;
  validTypes: string[];
  maxSize?: number;
  file: File | null;
  onFile: (f: File | null) => void;
  error: string | null;
  onError: (e: string | null) => void;
}

function DropZone({ label, accept, validTypes, maxSize = 10 * 1024 * 1024, file, onFile, error, onError }: DropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const validate = (f: File): boolean => {
    if (!validTypes.includes(f.type)) {
      onError(`Invalid file type. Accepted: ${accept}`);
      return false;
    }
    if (f.size > maxSize) {
      onError('File size must be less than 10MB.');
      return false;
    }
    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    onError(null);
    const f = e.dataTransfer.files[0];
    if (f && validate(f)) onFile(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFile, onError, validTypes, maxSize, accept]);

  const handleInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onError(null);
    const f = e.target.files?.[0];
    if (f && validate(f)) onFile(f);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onFile, onError, validTypes, maxSize, accept]);

  if (file) {
    return (
      <div className="flex items-center justify-between p-4 rounded-xl bg-blue-50 border border-blue-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <File className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="font-medium text-sm text-slate-800">{file.name}</p>
            <p className="text-xs text-slate-500 flex items-center gap-1">
              {formatFileSize(file.size)}
              <CheckCircle className="w-3 h-3 text-emerald-500" />
              Ready
            </p>
          </div>
        </div>
        <button onClick={() => onFile(null)} className="p-1 rounded hover:bg-blue-100 text-slate-400 hover:text-slate-600 transition-colors">
          <X className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
      onDragLeave={(e) => { e.preventDefault(); setIsDragOver(false); }}
      onDrop={handleDrop}
      className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 ${
        isDragOver ? 'border-blue-500 bg-blue-50 scale-[1.01]' : 'border-slate-200 hover:border-blue-400 hover:bg-slate-50'
      }`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleInput}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <Upload className="w-8 h-8 mx-auto mb-2 text-slate-400" />
      <p className="text-sm text-slate-600 font-medium">{label}</p>
      <p className="text-xs text-slate-400 mt-1">or click to browse</p>
      {error && (
        <Alert variant="destructive" className="mt-3 text-left">
          <AlertDescription className="text-xs">{error}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}

export function ContractUpload({ onAnalyze, isAnalyzing }: ContractUploadProps) {
  const [activeTab, setActiveTab] = useState<TabType>('file');
  const [compareMode, setCompareMode] = useState(false);

  const [fileA, setFileA] = useState<File | null>(null);
  const [fileB, setFileB] = useState<File | null>(null);
  const [errorA, setErrorA] = useState<string | null>(null);
  const [errorB, setErrorB] = useState<string | null>(null);

  const [photoA, setPhotoA] = useState<File | null>(null);
  const [photoB, setPhotoB] = useState<File | null>(null);
  const [photoErrorA, setPhotoErrorA] = useState<string | null>(null);
  const [photoErrorB, setPhotoErrorB] = useState<string | null>(null);

  const [textValue, setTextValue] = useState('');
  const [textValueB, setTextValueB] = useState('');

  const canSubmit = () => {
    if (isAnalyzing) return false;
    if (activeTab === 'file') return compareMode ? !!(fileA && fileB) : !!fileA;
    if (activeTab === 'photo') return compareMode ? !!(photoA && photoB) : !!photoA;
    if (activeTab === 'text') return compareMode ? !!(textValue.trim() && textValueB.trim()) : !!textValue.trim();
    return false;
  };

  const handleSubmit = () => {
    const mode = compareMode ? 'compare' : 'single';
    if (activeTab === 'file') {
      onAnalyze({ mode, tab: 'file', fileA: fileA ?? undefined, fileB: fileB ?? undefined });
    } else if (activeTab === 'photo') {
      onAnalyze({ mode, tab: 'photo', fileA: photoA ?? undefined, fileB: photoB ?? undefined });
    } else {
      onAnalyze({ mode, tab: 'text', text: compareMode ? `CONTRACT A:\n${textValue}\n\n---\n\nCONTRACT B:\n${textValueB}` : textValue });
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'file', label: 'Upload File', icon: <FileText className="w-4 h-4" /> },
    { id: 'photo', label: 'Upload Photo', icon: <Camera className="w-4 h-4" /> },
    { id: 'text', label: 'Paste Text', icon: <Type className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-slate-100 rounded-xl">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
              activeTab === t.id
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.icon}
            <span className="hidden sm:inline">{t.label}</span>
          </button>
        ))}
      </div>

      {/* Compare Mode Toggle */}
      <div className="flex items-center justify-between py-2 px-4 bg-slate-50 rounded-xl border border-slate-200">
        <div className="flex items-center gap-2">
          <GitCompare className="w-4 h-4 text-slate-500" />
          <span className="text-sm font-medium text-slate-700">Compare Mode</span>
          <Badge variant="secondary" className="text-xs">Compare 2 contracts</Badge>
        </div>
        <button
          onClick={() => setCompareMode(!compareMode)}
          className={`relative w-11 h-6 rounded-full transition-colors duration-200 focus:outline-none ${
            compareMode ? 'bg-blue-600' : 'bg-slate-300'
          }`}
        >
          <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
            compareMode ? 'translate-x-5' : 'translate-x-0'
          }`} />
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'file' && (
        <div className={compareMode ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
          <div>
            {compareMode && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contract A</p>}
            <DropZone
              label="Drag & drop PDF, Word, or text file"
              accept=".pdf,.doc,.docx,.txt"
              validTypes={VALID_DOC_TYPES}
              file={fileA}
              onFile={setFileA}
              error={errorA}
              onError={setErrorA}
            />
          </div>
          {compareMode && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contract B</p>
              <DropZone
                label="Drag & drop PDF, Word, or text file"
                accept=".pdf,.doc,.docx,.txt"
                validTypes={VALID_DOC_TYPES}
                file={fileB}
                onFile={setFileB}
                error={errorB}
                onError={setErrorB}
              />
            </div>
          )}
        </div>
      )}

      {activeTab === 'photo' && (
        <div>
          <p className="text-sm text-slate-500 mb-3 text-center">
            Take a photo of a physical contract — our AI will read it using OCR.
          </p>
          <div className={compareMode ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
            <div>
              {compareMode && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contract A</p>}
              <DropZone
                label="Upload JPG, PNG, or WEBP image"
                accept=".jpg,.jpeg,.png,.webp"
                validTypes={VALID_IMAGE_TYPES}
                file={photoA}
                onFile={setPhotoA}
                error={photoErrorA}
                onError={setPhotoErrorA}
              />
            </div>
            {compareMode && (
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contract B</p>
                <DropZone
                  label="Upload JPG, PNG, or WEBP image"
                  accept=".jpg,.jpeg,.png,.webp"
                  validTypes={VALID_IMAGE_TYPES}
                  file={photoB}
                  onFile={setPhotoB}
                  error={photoErrorB}
                  onError={setPhotoErrorB}
                />
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'text' && (
        <div className={compareMode ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : ''}>
          <div>
            {compareMode && <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contract A</p>}
            <textarea
              value={textValue}
              onChange={(e) => setTextValue(e.target.value)}
              placeholder="Paste your contract text here..."
              rows={10}
              className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y bg-white"
            />
          </div>
          {compareMode && (
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Contract B</p>
              <textarea
                value={textValueB}
                onChange={(e) => setTextValueB(e.target.value)}
                placeholder="Paste second contract text here..."
                rows={10}
                className="w-full p-4 rounded-xl border border-slate-200 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y bg-white"
              />
            </div>
          )}
        </div>
      )}

      {/* Supported formats note */}
      {activeTab === 'file' && (
        <div className="flex justify-center gap-2 flex-wrap">
          {['PDF', 'DOCX', 'DOC', 'TXT'].map((f) => (
            <Badge key={f} variant="secondary" className="text-xs">{f}</Badge>
          ))}
          <span className="text-xs text-slate-400">· Max 10MB</span>
        </div>
      )}

      {/* Submit Button */}
      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!canSubmit()}
          size="lg"
          className="px-10 py-6 text-base font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 rounded-xl"
        >
          {isAnalyzing ? (
            <span className="flex items-center gap-3">
              <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              {compareMode ? 'Comparing Contracts...' : 'Analyzing Contract...'}
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              {compareMode ? 'Compare Contracts' : 'Analyze Contract'}
            </span>
          )}
        </Button>
      </div>

      <p className="text-center text-xs text-slate-400">
        No login required · Secure & private · Not legal advice
      </p>
    </div>
  );
}
