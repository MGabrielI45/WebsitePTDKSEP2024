import React from "react";
import Link from "next/link";
import excelpng from "@public/excel.png";
import Image from "next/image";
import { listKehadiran } from "@/app/constants";
import AttendanceCard from './AttendanceCard';

import { IoIosArrowBack } from "react-icons/io";
import { GoDownload } from "react-icons/go";

const DayDetails = ({ tugasInfo }) => {
  return (
    <div className="container mx-auto py-6 ml-10 w-11/12">
      <div className="flex items-center mb-6">
        <Link href="/">
          <div className="mr-4 text-gray-500 text-[24px]">
            <IoIosArrowBack className="inline-block" />
          </div>
        </Link>
        <h1 className="text-[24px] font-bold text-red-100">
          {tugasInfo.event.title}
        </h1>
      </div>
      <hr className="border-t-2 border-gray-300 w-full mb-4" />
      <div className="flex">
        {/* Updated assignment box */}
        <div className="relative border-2 border-gray-300 p-4 w-4/6 h-[61vh]">
            <div className="absolute top-0 right-0 text-red-500 px-7 p-4">
                <p className="text-lg font-semibold text-[16px]">
                    {new Date(tugasInfo.event.date).toLocaleString("id-ID", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    })}
                </p>
            </div>
                <h2 className="text-lg font-semibold mb-2">DESKRIPSI</h2>
                <p className="text-gray-600">{tugasInfo.event.description}</p>
            </div>
        {/* New stacked boxes */}
        <div className="flex flex-col w-2/6 space-y-4 ml-2">
            <AttendanceCard listKehadiran={listKehadiran} />
            <div className="border-2 w-full border-gray-300 h-[29.4vh]">
                {/* Content for the second stacked box */}
                <h2 className="p-2 font-semibold text-[18px]">Summary</h2>
                <p className="p-2">lorem ipsum dolor sit amet</p>
            </div>
        </div>
      </div>
      {/* add file button*/}
      <div className="flex justify-end">
        <button
          type="submit"
          className="mt-4 bg-gradient-to-r from-[#D32026] to-[#FA6065] hover:bg-blue-700 
        text-white font-bold py-2 px-10 rounded-full cursor-pointer"
        >
          Hadir
        </button>
      </div>
      {/* Other assignment details */}
    </div>
  );
};

export default DayDetails;
