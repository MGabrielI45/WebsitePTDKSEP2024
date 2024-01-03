'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
    };

  return (
    <div className='flex items-center justify-between fixed top-0 left-0 w-full border-[2px] px-10 shadow-md bg-white top-0 z-50'>
        <Image 
          src='/logo.png'
          width={60}
          height={60}
        />
        <ul className='flex gap-20 text-black justify-center w-full pr-10'>
          <li><Link href='/'>Home</Link></li>
          <li><Link href='/Jadwal'>Jadwal</Link></li>
          <li><Link href='/Materi'>Materi</Link></li>
          <li><Link href='/Diskusi'>Diskusi</Link></li>
          <li><Link href='/Dokumentasi'>Dokumentasi</Link></li>
        </ul>
        <div className='relative' onClick={toggleDropdown}>
          <Image
            src='/pfpPlaceholder.png'
            width={40}
            height={40}
            className='cursor-pointer'
          />
          {showDropdown && (
            <div className='absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md'>
              <div className='py-2'>
                <div className='border-b border-gray-200 hover:bg-gray-100 cursor-pointer py-1 px-4'>My Profile</div>
                <div className='hover:bg-gray-100 cursor-pointer py-1 px-4'>Log Out</div>
              </div>
            </div>
          )}
        </div>
    </div>
  );
};

export default Navbar;
