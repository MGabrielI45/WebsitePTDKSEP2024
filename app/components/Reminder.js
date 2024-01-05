import React from 'react';
import Image from 'next/image';
import ReminderCard from './ReminderCard';

const Reminder = () => {
  const listReminder = [
    {
      'tanggal':'Jumat, 11 Oktober 2024',
      'judul':'Tugas Individu: personal finance',
      'deskripsi':'tugas essay 5 lembar mengenai analisis fundamental'
    },
    {
      'tanggal':'Sabtu 12, Oktober 2024',
      'judul':'PTD DAY 3: Introduction to Macroeconomics',
      'deskripsi':'tugas essay 5 lembar mengenai analisis fundamental'
    },
    {
      'tanggal':'Selasa, 15 Oktober 2024',
      'judul':'Tugas Angkatan: Organogram KSEP 2023',
      'deskripsi':'tugas essay 5 lembar mengenai analisis fundamental'
    },
    {
      'tanggal':'17 Oktober 2024',
      'judul':'Panggilan Malam',
      'deskripsi':'tugas essay 5 lembar mengenai analisis fundamental'
    }
  ];

  // Calculate the height based on the number of items in the list
  const calculatedHeight = listReminder.length * 175; // Adjust the multiplier as needed

  return (
    <div className='relative w-full bg-red-100' style={{ height: calculatedHeight }}>
      <div className='absolute inset-0 z-0'>
        <Image src='/backg.svg' alt='Background' layout='fill' objectFit='cover' />
      </div>
      <div className='relative z-10'>
        {/* Content of your Reminder component */}
        <div className='w-full h-full p-5'>
          <div className='text-center text-white text-[78px] font-semibold'>
            <h1>Reminders</h1>
          </div>
          <div>
            {listReminder.map((item, index) => (
              <ReminderCard key={index} judul={item.judul} tanggal={item.tanggal}/>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reminder;
