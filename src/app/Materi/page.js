// pages/page.js

import React from 'react';
import MateriItem from './MateriItem';
import { listMateri } from '../constants';

const Page = () => {

  return (
    <div className="text-center py-8">
      <h1 className="text-[64px] font-bold text-red-100">Materi</h1>
      <h2 className="text-[48px] font-semibold text-blue-100 mb-5">PTD KSEP 2024</h2>
      <div className="mx-auto max-w-screen-lg">
        <input
          type="text"
          placeholder="Search..."
          className="w-full py-2 px-4 rounded-full bg-gray-200 focus:outline-none focus:bg-white border border-gray-300"
        />
      </div>
      <div className="mt-6 mx-auto max-w-screen-lg">
        {listMateri.map((item, index) => (
          <MateriItem key={index} judul={item.judul} />
        ))}
      </div>
    </div>
  );
};

export default Page;
