'use client';

import { useCallback, useState } from 'react';
import { DocumentIcon, CloudArrowUpIcon, XMarkIcon } from '@heroicons/react/24/outline';

interface ContractUploadProps {
  onFileSelect: (file: File) => void;
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
    onFileSelect(null as any);
  }, [onFileSelect]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      {!selectedFile ? (
        <div
          className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
            isDragOver
              ? 'border-indigo-400 bg-indigo-50'
              : 'border-gray-300 hover:border-gray-400'
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

          <div className="space-y-4">
            <div className="mx-auto w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center">
              <CloudArrowUpIcon className="w-8 h-8 text-indigo-600" />
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Drop your contract here, or{' '}
                <span className="text-indigo-600 hover:text-indigo-500 cursor-pointer">
                  browse
                </span>
              </h3>
              <p className="text-gray-500">
                Support for PDF, Word (.doc, .docx), and text files up to 10MB
              </p>
            </div>

            <div className="flex justify-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <DocumentIcon className="w-4 h-4 mr-1" />
                PDF
              </div>
              <div className="flex items-center">
                <DocumentIcon className="w-4 h-4 mr-1" />
                Word
              </div>
              <div className="flex items-center">
                <DocumentIcon className="w-4 h-4 mr-1" />
                Text
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Selected File Display */
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                <DocumentIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <div>
                <p className="font-medium text-gray-900">{selectedFile.name}</p>
                <p className="text-sm text-gray-500">{formatFileSize(selectedFile.size)}</p>
              </div>
            </div>
            <button
              onClick={removeFile}
              className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
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
          className={`px-8 py-3 rounded-lg font-medium transition-all ${
            !selectedFile || isAnalyzing
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg hover:shadow-xl'
          }`}
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Analyzing Contract...</span>
            </div>
          ) : (
            'Analyze Contract'
          )}
        </button>
      </div>
    </div>
  );
}
