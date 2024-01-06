// pages/NewAccount.js

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';
import { IoMdMail,IoMdLock } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa6";

const NewAccount = () => {
  const divStyle = {
    backgroundImage: 'url("/LoginBackground.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <Head>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"/>
      </Head>

      <div className="min-h-screen flex items-center justify-center" style={divStyle}>
        <div className="flex flex-col items-center p-8 rounded-md">
          <div className="mb-4">
            <Image src="/logo.png" height={50} width={50} />
          </div>
          <div className="mb-4 text-xl font-bold">CREATE ACCOUNT</div>
          <form className="flex flex-col items-center mb-4">
            <div className="pb-4">
              <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                <IoMdMail className='absolute left-4 h-[15px] w-[15px]' />
                <input
                  type="text"
                  placeholder="Email"
                  className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="pb-4">
              <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
              <FaAddressCard className='absolute left-4 h-[15px] w-[15px]' />
                <input
                  type="text"
                  placeholder="Username"
                  className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="pb-4">
              <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
              <IoMdLock className='absolute left-4 h-[15px] w-[15px]' />
                <input
                  type="text"
                  placeholder="Password"
                  className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="pb-4">
              <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
              <IoMdLock className='absolute left-4 h-[15px] w-[15px]' />
                <input
                  type="text"
                  placeholder="Re-confirm Password"
                  className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              className="mt-4 bg-gradient-to-r from-[#D32026] to-[#FA6065] hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full cursor-pointer"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <Link href="/LoginPage">
            <div className="text-sm text-blue-500 hover:underline cursor-pointer mt-2">
              Already have an account? Login
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewAccount;
