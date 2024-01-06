import React from 'react';
import { listDiskusi } from '../constants';
import DiscussionItem from './DiscussionItem'; // Import the DiscussionItem component

const DiscussionPage = () => {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <h1 className='text-[64px] text-red-100 font-bold text-center mb-8'>Diskusi</h1>
      <div className="grid grid-cols-1 gap-4 px-[30px]">
        {listDiskusi.map((item, index) => (
          <DiscussionItem
            key={index}
            op={item.op}
            title={item.title}
            date={item.date}
            profile={item.profile}
          />
        ))}
        <div className="bg-blue-100 rounded-lg overflow-hidden mb-4 w-full h-[120px] shadow-md border-[2px] flex items-center justify-center">
          <p className="text-[30px] text-white font-semibold">+ Start a Discussion!</p>
        </div>
      </div>
    </div>
  );
};


export default DiscussionPage;
