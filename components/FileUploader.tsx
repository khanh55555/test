
import React, { useCallback, useState } from 'react';
import { UploadIcon } from './Icons';

interface FileUploaderProps {
    onFilesSelected: (files: File[]) => void;
}

export const FileUploader: React.FC<FileUploaderProps> = ({ onFilesSelected }) => {
    const [isDragging, setIsDragging] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            onFilesSelected(Array.from(event.target.files));
        }
    };

    const handleDragEnter = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    }, []);
    
    const handleDragOver = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    }, []);


    const handleDrop = useCallback((e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            // FIX: Explicitly type `file` as `File` to resolve TypeScript error.
            const pdfFiles = Array.from(e.dataTransfer.files).filter((file: File) => file.type === 'application/pdf');
            if(pdfFiles.length > 0){
                onFilesSelected(pdfFiles);
            }
            e.dataTransfer.clearData();
        }
    }, [onFilesSelected]);

    return (
        <div className="mb-6">
            <label
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`flex justify-center w-full h-48 px-4 transition-all duration-300 bg-white border-2 ${
                    isDragging ? 'border-sky-400 bg-sky-50' : 'border-slate-300'
                } border-dashed rounded-xl appearance-none cursor-pointer hover:border-sky-400 focus:outline-none`}
            >
                <span className="flex flex-col items-center justify-center text-center space-y-2">
                    <UploadIcon className={`w-12 h-12 ${isDragging ? 'text-sky-500' : 'text-slate-400'} transition-colors`} />
                    <span className="font-medium text-slate-600">
                        Kéo thả tệp vào đây hoặc{' '}
                        <span className="text-sky-500 underline">nhấn để chọn</span>
                    </span>
                    <span className="text-sm text-slate-500">Chỉ hỗ trợ tệp PDF</span>
                </span>
                <input
                    type="file"
                    name="file_upload"
                    className="hidden"
                    multiple
                    accept=".pdf"
                    onChange={handleFileChange}
                />
            </label>
        </div>
    );
};
