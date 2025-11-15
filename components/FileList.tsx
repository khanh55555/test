
import React from 'react';
import { FileIcon, TrashIcon } from './Icons';

interface FileListProps {
    files: File[];
    onRemoveFile: (index: number) => void;
}

const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const FileList: React.FC<FileListProps> = ({ files, onRemoveFile }) => {
    return (
        <div className="mt-4 space-y-3 max-h-60 overflow-y-auto pr-2">
            <h3 className="font-semibold text-slate-600 text-md border-b pb-2 mb-2">Các tệp đã chọn</h3>
            {files.map((file, index) => (
                <div
                    key={index}
                    className="flex items-center justify-between bg-slate-50 p-3 rounded-lg border border-slate-200"
                >
                    <div className="flex items-center min-w-0">
                        <FileIcon className="w-6 h-6 text-sky-500 flex-shrink-0" />
                        <div className="ml-3 min-w-0">
                            <p className="text-sm font-medium text-slate-700 truncate">{file.name}</p>
                            <p className="text-xs text-slate-500">{formatFileSize(file.size)}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => onRemoveFile(index)}
                        className="p-1.5 rounded-full hover:bg-red-100 text-slate-500 hover:text-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                        aria-label={`Remove ${file.name}`}
                    >
                        <TrashIcon className="w-5 h-5" />
                    </button>
                </div>
            ))}
        </div>
    );
};
