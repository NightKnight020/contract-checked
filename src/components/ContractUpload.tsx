'use client';

import { useCallback, useState } from 'react';
import { DocumentIcon, CloudArrowUpIcon, XMarkIcon, SparklesIcon } from '@heroicons/react/24/outline';

interface ContractUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function ContractUpload({ onFileSelect, selectedFile, onAnalyze, isAnalyzing }: ContractUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

  const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        onFileSelect(file);
      }
    }
  }, [onFileSelect]);

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

  const removeFile = useCallback(() => {
    onFileSelect(null);
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-all duration-300 ${
            isDragOver
              ? 'border-indigo-400 bg-gradient-to-br from-indigo-50 to-purple-50 shadow-lg'
              : 'border-slate-300 hover:border-indigo-300 hover:bg-slate-50/50'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            onChange={handleFileInput}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />

          <div className="space-y-6">
            <div className="relative mx-auto w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <CloudArrowUpIcon className="w-10 h-10 text-white" />
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center">
                <SparklesIcon className="w-4 h-4 text-white" />
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-semibold text-slate-900 mb-3">
                Upload Your Contract
              </h3>
              <p className="text-slate-600 mb-6 text-lg">
                Drag and drop your contract file here, or{' '}
                <span className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer underline underline-offset-2">
                  browse your files
                </span>
              </p>
            </div>

            <div className="flex justify-center space-x-6 text-sm text-slate-500">
              <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full">
                <DocumentIcon className="w-4 h-4" />
                <span>PDF</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full">
                <DocumentIcon className="w-4 h-4" />
                <span>Word</span>
              </div>
              <div className="flex items-center space-x-2 bg-slate-100 px-4 py-2 rounded-full">
                <DocumentIcon className="w-4 h-4" />
                <span>Text</span>
              </div>
            </div>

            <p className="text-sm text-slate-500">
              Maximum file size: 10MB
            </p>
          </div>
        </div>
      ) : (
        /* Selected File Display */
        <div className="bg-gradient-to-r from-slate-50 to-indigo-50 rounded-2xl p-8 border border-slate-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <DocumentIcon className="w-7 h-7 text-white" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 text-lg">{selectedFile.name}</p>
                <p className="text-sm text-slate-600">{formatFileSize(selectedFile.size)} • Ready for analysis</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
              title="Remove file"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Analyze Button */}
      <div className="flex justify-center">
        <button
          onClick={onAnalyze}
          disabled={!selectedFile || isAnalyzing}
          className={`px-12 py-4 rounded-xl font-semibold text-lg transition-all duration-300 ${
            !selectedFile || isAnalyzing
              ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing Your Contract...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <SparklesIcon className="w-5 h-5" />
              <span>Analyze Contract</span>
            </div>
          )}
        </button>
      </div>

      {!selectedFile && (
        <div className="text-center">
          <p className="text-slate-500 text-sm">
            By uploading, you agree to our{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-indigo-600 hover:text-indigo-700 underline underline-offset-2">
              Privacy Policy
            </a>
          </p>
        </div>
      )}
    </div>
  );
}
