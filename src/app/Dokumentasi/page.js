'use client'

import React from 'react';
import { listDokumentasi } from '../constants';
import DokumentasiItem from './DokumentasiItem';
import HeroBanner from './HeroBanner'; // Import the HeroBanner component

const Page = () => {
  return (
    <div className="text-center py-">
      <HeroBanner /> {/* Render the HeroBanner component */}
      {/*<h1 className="text-[64px] font-bold text-red-100">Dokumentasi</h1>*/}
      {/* ... rest of your code ... */}
      <div className="mt-6 mx-auto w-full px-10">
        {listDokumentasi.map((item) => (
          <DokumentasiItem props={item} />
        ))}
      </div>
    </div>
  );
};

export default Page;
