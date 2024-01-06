// app/components/AssignmentDetails.js

import React from 'react';
import Link from 'next/link';
import { IoIosArrowBack } from 'react-icons/io';

const AssignmentDetails = ({ assignment }) => {
  return (
    <div className='container mx-auto py-8 ml-10'>
      <div className='flex items-center mb-6'>
        <Link href='/'>
          <div className='mr-4 text-gray-500 text-[50px]'>
            <IoIosArrowBack className='inline-block' />
          </div>
        </Link>
        <h1 className='text-4xl font-bold'>{assignment.judul}</h1>
      </div>
      <hr className='border-t-2 border-gray-300 w-[1200px] mb-4' />
      <div className='relative border-2 border-gray-300 p-4 w-[1200px]'>
        {/*<p className='text-lg font-semibold mb-2'>{assignment.tanggal}</p>*/}
        <div className='absolute top-0 right-0 text-red-500 px-7'>
          <p className='text-lg font-semibold'>{assignment.tanggal}</p>
        </div>
        <h2 className='text-lg font-semibold mb-2'>DESKRIPSI TUGAS</h2>
        <p className='text-gray-600'>{assignment.deskripsi}</p>
      </div>
      {/* Other assignment details */}
    </div>
  );
};

export default AssignmentDetails;
