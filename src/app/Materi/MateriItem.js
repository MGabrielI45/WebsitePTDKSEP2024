// pages/MateriItem.js

'use client'

import React, { useState } from 'react';
import { FaArrowDown, FaArrowRight } from 'react-icons/fa';
import Image from 'next/image';
import materiPlaceholder from '../../../public/materiPlaceholder.PNG';

const MateriItem = ({ judul }) => {
  const [showImage, setShowImage] = useState(false);

  const toggleImage = () => {
    setShowImage(!showImage);
  };

  return (
    <div className="mb-4">
      <div
        className="bg-blue-200 text-white rounded-lg p-4 flex items-center justify-between cursor-pointer h-[80px]"
        onClick={toggleImage}
      >
        <span className='text-[32px] font-semibold'>{judul}</span>
        <div className="ml-auto">
          {showImage ? <FaArrowDown /> : <FaArrowRight />}
        </div>
      </div>
      <div className={`transition-opacity duration-500 ${showImage ? 'block' : 'hidden'}`}>
        <Image
          src={materiPlaceholder}
          alt="Materi"
          width={400}
          height={200}
          className="mx-auto"
        />
      </div>
    </div>
  );
};

export default MateriItem;
