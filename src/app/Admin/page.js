import React from 'react';
import AdminBox from './components/AdminBox'; // Import the AdminBox component
import { getSession } from 'next-auth/react';
import {db} from '@/libs/db'
import { redirect } from 'next/navigation'


const Page = async () => {
   
  const menuList = ['Jadwal', 'Tugas', 'Materi', 'Presensi', 'Diskusi', 'Dokumentasi'];

  const splitMenuList = (arr, size) => {
    return arr.reduce((acc, _, index) => {
      if (index % size === 0) {
        acc.push(arr.slice(index, index + size));
      }
      return acc;
    }, []);
  };

  const menuRows = splitMenuList(menuList, 3);

  return (
    <div className='p-10'>
      {/* Admin Header */}
      <div className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[64px] font-bold text-red-100">Halo Admin!</h1>
            <p className="text-[24px] font-bold text-blue-100">Apa kabarmu hari ini</p>
          </div>
          <button
            type="submit"
            className="bg-gradient-to-r from-[#D32026] to-[#FA6065] hover:bg-blue-700 
            text-white font-bold py-2 px-10 rounded-full cursor-pointer"
          >
            Log Out
          </button>
        </div>
      </div>

      {/* Admin Boxes */}
      <div className="flex flex-wrap">
        {menuRows.map((row, rowIndex) => (
          <div key={rowIndex} className="w-full flex justify-center">
            {row.map((item, index) => (
              <AdminBox key={index} text={item} idx={index} idx_1={rowIndex}/>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Page;

