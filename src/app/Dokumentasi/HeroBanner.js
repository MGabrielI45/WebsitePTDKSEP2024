import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import foto_1 from './assets/foto-1.jpg';
import foto_2 from './assets/foto-2.jpg';
import foto_3 from './assets/foto-3.jpg';
import foto_4 from './assets/foto-4.jpg';
import foto_5 from './assets/foto-5.jpg';

const HeroBanner = () => {
  const photos = [foto_1, foto_2, foto_3, foto_4, foto_5];
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
    }, 3000); // Change photo every 3 seconds (adjust as needed)

    return () => clearInterval(interval);
  }, [photos.length]);

  return (
    <div className="w-full h-[500px] overflow-hidden relative">
      {photos.map((photo, index) => (
        <div
          key={index}
          className={`w-full h-full absolute transition-opacity duration-500 ${
            currentPhotoIndex === index ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ display: currentPhotoIndex === index ? 'block' : 'none' }}
        >
          <Image src={photo} alt={`Photo ${index + 1}`} layout="fill" objectFit="cover" />
        </div>
      ))}
      <div className="absolute inset-0 flex items-center justify-center text-red-100 text-6xl font-bold pointer-events-none">
        DOKUMENTASI
      </div>
    </div>
  );
};

export default HeroBanner;
