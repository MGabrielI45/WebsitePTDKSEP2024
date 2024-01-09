// app/components/AssignmentDetails.js

import React from "react";
import Link from "next/link";
import excelpng from "@public/excel.png";
import Image from "next/image";

import { IoIosArrowBack } from "react-icons/io";
import { GoDownload } from "react-icons/go";

const AssignmentDetails = ({ tugasInfo }) => {
  return (
    <div className="container mx-auto py-6 ml-10 w-11/12">
      <div className="flex items-center mb-6">
        <Link href="/">
          <div className="mr-4 text-gray-500 text-[24px]">
            <IoIosArrowBack className="inline-block" />
          </div>
        </Link>
        <h1 className="text-[24px] font-bold text-blue-200">
          {tugasInfo.event.title}
        </h1>
      </div>
      <hr className="border-t-2 border-gray-300 w-full mb-4" />
      {/* assignment box */}
      <div className="relative border-2 border-gray-300 p-4 w-full h-[60vh]">
        {/*<p className='text-lg font-semibold mb-2'>{assignment.tanggal}</p>*/}
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
        <h2 className="text-lg font-semibold mb-2">DESKRIPSI TUGAS</h2>
        <p className="text-gray-600">{tugasInfo.event.description}</p>
        <div className="flex mt-[30vh]">
          {/* file box 1 */}
          <div className="w-1/2 mr-2 h-20 border-2 border-gray-300 flex items-center">
            <GoDownload className="mr-10 ml-5 w-8 h-8" />{" "}
            {/* Assuming FaDownload is the imported download icon */}
            <Image
              src={excelpng}
              alt="Excel File"
              className="w-10 h-10 mr-2"
            />{" "}
            {/* Assuming excelpng is the imported image */}
            <p className="text-lg">TextPlaceholder.xlsx</p>
          </div>
          {/* file box 1 */}
          <div className="w-1/2 mr-2 h-20 border-2 border-gray-300 flex items-center">
            <GoDownload className="mr-10 ml-5 w-8 h-8" />{" "}
            {/* Assuming FaDownload is the imported download icon */}
            <Image
              src={excelpng}
              alt="Excel File"
              className="w-10 h-10 mr-2"
            />{" "}
            {/* Assuming excelpng is the imported image */}
            <p className="text-lg">TextPlaceholder.xlsx</p>
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
          + Add File
        </button>
      </div>
      {/* Other assignment details */}
    </div>
  );
};

export default AssignmentDetails;
