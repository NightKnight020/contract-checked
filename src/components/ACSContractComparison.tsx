'use client';

import { useCallback, useState } from 'react';
import { DocumentIcon, XMarkIcon, SparklesIcon, BuildingOfficeIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

interface ACSContractComparisonProps {
  onFileSelect: (operatorContract: File | null, bookingForm: File | null) => void;
  operatorContract: File | null;
  bookingForm: File | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function ACSContractComparison({
  onFileSelect,
  operatorContract,
  bookingForm,
  onAnalyze,
  isAnalyzing
}: ACSContractComparisonProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [activeDropZone, setActiveDropZone] = useState<'operator' | 'booking' | null>(null);

  const handleDragOver = useCallback((e: React.DragEvent, type: 'operator' | 'booking') => {
    e.preventDefault();
    setIsDragOver(true);
    setActiveDropZone(type);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    setActiveDropZone(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, type: 'operator' | 'booking') => {
    e.preventDefault();
    setIsDragOver(false);
    setActiveDropZone(null);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        if (type === 'operator') {
          onFileSelect(file, bookingForm);
        } else {
          onFileSelect(operatorContract, file);
        }
      }
    }
  }, [onFileSelect, operatorContract, bookingForm]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>, type: 'operator' | 'booking') => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        if (type === 'operator') {
          onFileSelect(file, bookingForm);
        } else {
          onFileSelect(operatorContract, file);
        }
      }
    }
  }, [onFileSelect, operatorContract, bookingForm]);

  const isValidFile = (file: File) => {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      alert('Please upload a PDF, Word document (.doc or .docx), or text file.');
      return false;
    }

    if (file.size > maxSize) {
      alert('File size must be less than 10MB.');
      return false;
    }

    return true;
  };

  const removeFile = useCallback((type: 'operator' | 'booking') => {
    if (type === 'operator') {
      onFileSelect(null, bookingForm);
    } else {
      onFileSelect(operatorContract, null);
    }
  }, [onFileSelect, operatorContract, bookingForm]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const renderFileUploadZone = (
    type: 'operator' | 'booking',
    file: File | null,
    title: string,
    description: string,
    icon: React.ReactNode
  ) => {
    const isActive = activeDropZone === type;
    const hasFile = file !== null;

    return (
      <div className="flex-1">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
          <p className="text-sm text-slate-600">{description}</p>
        </div>

        {!hasFile ? (
          <div
            className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 ${
              isActive && isDragOver
                ? 'border-blue-400 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-lg'
                : 'border-slate-300 hover:border-blue-300 hover:bg-slate-50/50'
            }`}
            onDragOver={(e) => handleDragOver(e, type)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, type)}
          >
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => handleFileInput(e, type)}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="space-y-4">
              <div className="relative mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                {icon}
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                  <SparklesIcon className="w-3 h-3 text-white" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-slate-900 mb-2">
                  Upload {title}
                </h4>
                <p className="text-slate-600 text-sm mb-4">
                  Drag and drop your file here, or{' '}
                  <span className="text-blue-600 hover:text-blue-700 font-medium cursor-pointer underline underline-offset-2">
                    browse your files
                  </span>
                </p>
              </div>

              <div className="flex justify-center space-x-4 text-xs text-slate-500">
                <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full">
                  <DocumentIcon className="w-3 h-3" />
                  <span>PDF</span>
                </div>
                <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full">
                  <DocumentIcon className="w-3 h-3" />
                  <span>Word</span>
                </div>
                <div className="flex items-center space-x-1 bg-slate-100 px-3 py-1 rounded-full">
                  <DocumentIcon className="w-3 h-3" />
                  <span>Text</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Selected File Display */
          <div className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-6 border border-slate-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                  {icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-900 text-base">{file.name}</p>
                  <p className="text-sm text-slate-600">{formatFileSize(file.size)} • Ready for comparison</p>
                </div>
              </div>
              <button
                onClick={() => removeFile(type)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                title="Remove file"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Two Column Upload Layout */}
      <div className="grid md:grid-cols-2 gap-8">
        {renderFileUploadZone(
          'operator',
          operatorContract,
          'Operator Contract',
          'Upload the contract from your air charter operator',
          <BuildingOfficeIcon className="w-8 h-8 text-white" />
        )}

        {renderFileUploadZone(
          'booking',
          bookingForm,
          'ACS Booking Form',
          'Upload your ACS booking form or customer agreement',
          <ClipboardDocumentListIcon className="w-8 h-8 text-white" />
        )}
      </div>

      {/* Analyze Button */}
      <div className="flex justify-center pt-4">
        <button
          onClick={onAnalyze}
          disabled={!operatorContract || !bookingForm || isAnalyzing}
          className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
            !operatorContract || !bookingForm || isAnalyzing
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Comparing Contracts...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <SparklesIcon className="w-5 h-5" />
              <span>Compare Contracts</span>
            </div>
          )}
        </button>
      </div>

      {(!operatorContract || !bookingForm) && (
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            Upload both contracts to enable comparison analysis
          </p>
        </div>
      )}

      {!operatorContract && !bookingForm && (
        <div className="text-center pt-4">
          <p className="text-slate-500 text-sm">
            By uploading, you agree to our{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 underline underline-offset-2">
              Privacy Policy
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
