import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

function ReminderCard({ judul, tanggal }) {
  return (
    <div className='flex justify-center'>
      <div className="cursor-pointer p-1 m-3 rounded-lg relative">
        <div className="bg-white p-4 w-[1092px] h-[100px] rounded-lg flex items-center justify-between">
          <div className="flex items-center justify-between w-full">
            <div className="text-left">
              <h2 className='text-[#3B81A6] font-semibold text-[20px]'>{tanggal}</h2>
              <h2 className='text-[#3B81A6] font-semibold text-[32px]'>{judul}</h2>
            </div>
            <FaChevronRight className="text-[#3B81A6] text-3xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReminderCard;
