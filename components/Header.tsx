
import React from 'react';

export const Header: React.FC = () => {
    return (
        <header className="w-full max-w-2xl text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-sky-600">
                Cole.vn
            </h1>
            <p className="text-slate-600 mt-1">Trợ lý phân tích hồ sơ thông minh</p>
        </header>
    );
};
