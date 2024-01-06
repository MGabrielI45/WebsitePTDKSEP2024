// pages/MonthName.js

import React from 'react';

const MonthName = ({ month }) => {
  return (
    <div className="flex justify-between items-center">
      <button className="text-blue-500 text-xl">&#60;</button>
      <h1 className="text-2xl font-semibold">{month}</h1>
      <button className="text-blue-500 text-xl">&#62;</button>
    </div>
  );
};

export default MonthName;
