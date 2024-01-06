// pages/Calendar.js

import React from 'react';
import DateBox from './DateBox';

const Calendar = () => {
  return (
    <div className="container mx-auto px-20 py-8">
      <h1 className="text-4xl font-bold mb-4 text-red-100">Jadwal</h1>
      <h2 className='text-2xl text-blue-100 font-bold'>Kegiatan dan Tugas</h2>
      <div className="grid grid-cols-7 gap-2 mt-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="bg-gray-200 p-2 text-center font-semibold">
            {day}
          </div>
        ))}
        {Array.from({ length: 31 }, (_, index) => (
          <DateBox key={index} day={index + 1} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;