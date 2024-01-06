import React from 'react';
import Image from 'next/image';
import { FaArrowRight } from 'react-icons/fa';

const DiscussionItem = ({ op, title, date, profile }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden mb-4 w-full h-[120px] shadow-md border-[2px] flex items-center relative">
      <Image
        src='/pfpPlaceholder.png'
        alt="Profile"
        width={100}
        height={100}
        className="w-20 h-20 rounded-full mr-2 object-cover ml-[20px]"
      />
      <div className="flex-1 pr-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <span className="font-semibold text-[20px] text-blue-100">{op}</span>
            <span className="mx-2 text-[20px] text-blue-100">&#8226;</span>
            <span className="text-[20px] text-blue-100 font-semibold">{date}</span>
          </div>
          <FaArrowRight className="text-red-500 absolute right-4 mt-[60px]" size={24} />
        </div>
        <p className="text-[30px] text-red-100 font-semibold">{title}</p>
      </div>
    </div>
  );
};

export default DiscussionItem;
