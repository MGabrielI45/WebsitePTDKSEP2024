'use client'

import React, { useState } from 'react';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import foto_1 from './assets/foto-1.jpg';
import foto_2 from './assets/foto-2.jpg';
import foto_3 from './assets/foto-3.jpg';
import foto_4 from './assets/foto-4.jpg';
import foto_5 from './assets/foto-5.jpg';

const DokumentasiItem = ({ props }) => {
  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  return (
    <div className='w-full'>
      <div
        className='cursor-pointer p-1 m-3 rounded-lg relative'
        onClick={toggleImage}
      >
        <div className='bg-white p-4 rounded-lg flex items-center shadow-md border border-gray-300'>
          <div className='w-full'>
            <div className='flex items-center justify-between'>
              <div className='text-left'>
                <h2 className='text-[#3B81A6] font-semibold text-[16px]'>{props.tanggal}</h2>
                <h2 className='text-red-100 font-semibold text-[24px] mt-2'>{props.judul}</h2>
              </div>
              <div>
                {showImage ? (
                  <FaChevronDown className='text-[#3B81A6] text-2xl' />
                ) : (
                  <FaChevronRight className='text-[#3B81A6] text-2xl' />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {showImage && (
        <div className='bg-white rounded-lg overflow-hidden shadow-lg'>
          <Image
            src={foto_1} // You can use props to dynamically select the photo based on your requirement
            alt='Foto'
            className='w-full h-auto'
          />
        </div>
      )}
    </div>
  );
};

export default DokumentasiItem;