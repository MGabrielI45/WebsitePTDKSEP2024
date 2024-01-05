// app/components/ReminderCard.js

import React from 'react';
import Link from 'next/link';
import { FaChevronRight } from 'react-icons/fa';

function ReminderCard( props ) {
    return (
    <div className='flex justify-center'>
      <Link href='/assignment/[id]' as={`/assignment/${props.judul.toLowerCase().replace(/ /g, '-')}`}>
        {/* Use proper routing for assignment detail page */}
        <div className='cursor-pointer p-1 m-3 rounded-lg relative'>
          <div className='bg-white p-4 w-[1092px] h-[100px] rounded-lg flex items-center justify-between'>
            <div className='flex items-center justify-between w-full'>
              <div className='text-left'>
                <h2 className='text-[#3B81A6] font-semibold text-[20px]'>{props.tanggal}</h2>
                <h2 className='text-[#3B81A6] font-semibold text-[32px]'>{props.judul}</h2>
              </div>
              <FaChevronRight className='text-[#3B81A6] text-3xl' />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ReminderCard;
