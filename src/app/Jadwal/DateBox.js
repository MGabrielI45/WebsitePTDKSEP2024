// pages/DateBox.js

import React from 'react';

const DateBox = ({ day }) => {
  return (
    <div className="bg-white h-20 w-30 flex flex-col items-start justify-start border border-gray-300 p-2">
      <span className="text-lg font-semibold">{day}</span>
    </div>
  );
};

export default DateBox;
