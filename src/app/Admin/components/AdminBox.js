import React from 'react';

const AdminBox = ({ text, idx, idx_1}) => {
    if (idx_1 == 1) {
        idx += 3;
    }

    const backgroundColor = (idx % 2 === 0 ? 'bg-red-100' : 'bg-blue-100');

    return (
        <div className="w-1/3 p-4">
        <div className={`rounded-lg p-6 h-[150px] flex justify-center items-center ${backgroundColor}`}>
            <p className="font-bold text-white text-[48px]">{text}</p>
        </div>
        </div>
    );
};

export default AdminBox;