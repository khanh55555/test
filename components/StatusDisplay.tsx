
import React from 'react';
import { CheckCircleIcon, ExclamationTriangleIcon } from './Icons';
import { type UploadStatus } from '../types';

interface StatusDisplayProps {
    status: UploadStatus;
    error: string | null;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({ status, error }) => {
    if (status === 'idle' || status === 'uploading') {
        return <div className="h-10 mb-4"></div>; // Placeholder for layout consistency
    }

    if (status === 'success') {
        return (
            <div className="flex items-center p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg" role="alert">
                <CheckCircleIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Thành công!</span>&nbsp;Hồ sơ của bạn đã được gửi đi.
            </div>
        );
    }

    if (status === 'error' && error) {
        return (
            <div className="flex items-center p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
                <ExclamationTriangleIcon className="w-5 h-5 mr-2" />
                <span className="font-medium">Lỗi!</span>&nbsp;{error}
            </div>
        );
    }

    return <div className="h-10 mb-4"></div>;
};
