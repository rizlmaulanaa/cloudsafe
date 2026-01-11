import React, { useState, useCallback } from 'react';
import { UploadIcon } from './Icons';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
}

export const FileUpload: React.FC<FileUploadProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragging(true);
    } else if (e.type === 'dragleave') {
      setIsDragging(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onFileSelect(e.dataTransfer.files[0]);
    }
  }, [onFileSelect]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onFileSelect(e.target.files[0]);
    }
  };

  return (
    <div
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      className={`relative flex flex-col items-center justify-center w-full p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${isDragging ? 'border-cyan-500 dark:border-cyan-400 bg-cyan-50 dark:bg-slate-700/50' : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'}`}
    >
        <UploadIcon className="w-12 h-12 text-slate-400 dark:text-slate-500 mb-4" />
        <p className="mb-2 text-lg text-slate-600 dark:text-slate-400">
            <span className="font-semibold text-cyan-600 dark:text-cyan-400">Klik untuk mengunggah</span> atau seret dan lepas
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-500">Mendukung .txt, .pdf, .jpg, .png, dll.</p>
      <input
        type="file"
        id="file-upload"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleFileChange}
      />
    </div>
  );
};