// AttendanceCard.js
import React from "react";

const AttendanceCard = ({ listKehadiran }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'Hadir':
        return 'bg-green-500';
      case 'Tidak Hadir':
        return 'bg-red-500';
      case 'Izin':
        return 'bg-orange-500';
      default:
        return 'bg-gray-300';
    }
  };

  const renderAttendanceList = () => {
    return listKehadiran.map((item, index) => (
      <div key={index} className="flex items-center mb-2">
        <div className={`w-4 h-4 rounded-full mr-2 ${getStatusColor(item.status)}`}></div>
        <p>{item.nama}</p>
      </div>
    ));
  };

  return (
    <div className="border-2 w-full border-gray-300 h-[29vh] overflow-y-auto">
      <h2 className="p-2 font-semibold text-[18px]">Absensi</h2>
      <div className="p-2">
        {renderAttendanceList()}
      </div>
    </div>
  );
};

export default AttendanceCard;
