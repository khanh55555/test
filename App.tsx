
import React, { useState, useCallback, useEffect } from 'react';
import { FileUploader } from './components/FileUploader';
import { FileList } from './components/FileList';
import { Header } from './components/Header';
import { StatusDisplay } from './components/StatusDisplay';
import { type UploadStatus } from './types';

const WEBHOOK_URL = 'https://kelamat.com/webhook/ccd7b22c-6db8-44e2-8e81-ccce01eb0c36';

const App: React.FC = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [status, setStatus] = useState<UploadStatus>('idle');
    const [error, setError] = useState<string | null>(null);

    const handleFilesSelected = useCallback((selectedFiles: File[]) => {
        setFiles(prevFiles => {
            const newFiles = selectedFiles.filter(
                (file) => !prevFiles.some(existingFile => existingFile.name === file.name && existingFile.size === file.size)
            );
            return [...prevFiles, ...newFiles];
        });
        setStatus('idle');
        setError(null);
    }, []);

    const handleRemoveFile = useCallback((fileIndex: number) => {
        setFiles(prevFiles => prevFiles.filter((_, index) => index !== fileIndex));
    }, []);

    const handleSubmit = async () => {
        if (files.length === 0) {
            setError("Vui lòng chọn ít nhất một tệp để gửi.");
            setStatus('error');
            return;
        }

        setStatus('uploading');
        setError(null);

        const formData = new FormData();
        files.forEach(file => {
            formData.append('files', file);
        });

        try {
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`Lỗi máy chủ: ${response.status} ${response.statusText}`);
            }

            setStatus('success');
            setFiles([]); // Clear files on success
        } catch (err) {
            setStatus('error');
            if (err instanceof Error) {
                setError(`Không thể gửi hồ sơ: ${err.message}`);
            } else {
                setError('Đã xảy ra lỗi không xác định.');
            }
        }
    };
    
    useEffect(() => {
        if (status === 'success' || status === 'error') {
            const timer = setTimeout(() => {
                setStatus('idle');
                setError(null);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [status]);


    return (
        <div className="bg-slate-100 min-h-screen font-sans text-slate-800 flex flex-col items-center p-4 sm:p-6">
            <Header />
            <main className="w-full max-w-2xl bg-white rounded-2xl shadow-xl flex flex-col mt-6 overflow-hidden">
                <div className="p-6 sm:p-8 flex-grow">
                    <h1 className="text-2xl font-bold text-slate-700 mb-2">Tải lên hồ sơ của bạn</h1>
                    <p className="text-slate-500 mb-6">Tải lên các tệp PDF để chúng tôi phân tích và xử lý.</p>
                    <FileUploader onFilesSelected={handleFilesSelected} />
                    {files.length > 0 && <FileList files={files} onRemoveFile={handleRemoveFile} />}
                </div>

                <div className="bg-slate-50 p-6 sm:p-8 border-t border-slate-200">
                    <StatusDisplay status={status} error={error} />
                    <button
                        onClick={handleSubmit}
                        disabled={files.length === 0 || status === 'uploading'}
                        className="w-full bg-sky-500 text-white font-bold py-3 px-4 rounded-lg hover:bg-sky-600 focus:outline-none focus:ring-4 focus:ring-sky-300 transition-all duration-300 disabled:bg-slate-300 disabled:cursor-not-allowed disabled:hover:bg-slate-300 flex items-center justify-center text-lg"
                    >
                        {status === 'uploading' ? (
                           <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Đang gửi...
                           </>
                        ) : 'Gửi hồ sơ'}
                    </button>
                </div>
            </main>
             <footer className="text-center mt-8 text-slate-500 text-sm">
                <p>&copy; {new Date().getFullYear()} Cole.vn. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default App;
