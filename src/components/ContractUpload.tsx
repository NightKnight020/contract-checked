'use client';

import { useCallback, useState } from 'react';
import { Upload, File, X, Sparkles, FileText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface ContractUploadProps {
  onFileSelect: (file: File | null) => void;
  selectedFile: File | null;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function ContractUpload({ onFileSelect, selectedFile, onAnalyze, isAnalyzing }: ContractUploadProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    setError(null);

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
    setError(null);
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
      setError('Please upload a PDF, Word document (.doc or .docx), or text file.');
      return false;
    }

    if (file.size > maxSize) {
      setError('File size must be less than 10MB.');
      return false;
    }

    return true;
  };

  const removeFile = useCallback(() => {
    onFileSelect(null);
    setError(null);
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
        <Card className={`relative border-2 border-dashed transition-all duration-300 ${
          isDragOver
            ? 'border-primary bg-primary/5 shadow-lg scale-[1.02]'
            : 'border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50'
        }`}>
          <CardContent className="flex flex-col items-center justify-center p-12 text-center">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt"
              onChange={handleFileInput}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />

            <div className="relative mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
                <Upload className="w-10 h-10 text-primary-foreground" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-2xl font-semibold mb-2">Upload Your Contract</h3>
                <p className="text-muted-foreground text-lg">
                  Drag and drop your contract file here, or{' '}
                  <span className="text-primary hover:text-primary/80 font-medium cursor-pointer underline underline-offset-2">
                    browse your files
                  </span>
                </p>
              </div>

              <div className="flex justify-center gap-3">
                <Badge variant="secondary" className="px-3 py-1">
                  <FileText className="w-3 h-3 mr-1" />
                  PDF
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <FileText className="w-3 h-3 mr-1" />
                  Word
                </Badge>
                <Badge variant="secondary" className="px-3 py-1">
                  <FileText className="w-3 h-3 mr-1" />
                  Text
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground">
                Maximum file size: 10MB
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        /* Selected File Display */
        <Card className="bg-gradient-to-r from-muted/50 to-primary/5 border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-gradient-to-br from-primary to-primary/80 rounded-xl flex items-center justify-center shadow-lg">
                  <File className="w-7 h-7 text-primary-foreground" />
                </div>
                <div>
                  <p className="font-semibold text-lg">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span>{formatFileSize(selectedFile.size)}</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Ready for analysis</span>
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Analyze Button */}
      <div className="flex justify-center">
        <Button
          onClick={onAnalyze}
          disabled={!selectedFile || isAnalyzing}
          size="lg"
          className="px-12 py-6 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {isAnalyzing ? (
            <div className="flex items-center space-x-3">
              <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
              <span>Analyzing Your Contract...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Sparkles className="w-5 h-5" />
              <span>Analyze Contract</span>
            </div>
          )}
        </Button>
      </div>

      {!selectedFile && (
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            By uploading, you agree to our{' '}
            <Button variant="link" className="p-0 h-auto font-normal">
              Terms of Service
            </Button>{' '}
            and{' '}
            <Button variant="link" className="p-0 h-auto font-normal">
              Privacy Policy
            </Button>
          </p>
        </div>
      )}
    </div>
  );
}
