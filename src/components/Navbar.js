"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const Navbar = () => {
  const session = useSession();
  console.log(session);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className="flex items-center justify-between top-0 left-0 w-full border-[0px] px-10 shadow-md bg-white z-50 font-medium sticky">
      <Image src="/logo.png" width={60} height={60} />
      <ul className="flex gap-20 text-black justify-center w-full pr-10">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/Jadwal">Jadwal</Link>
        </li>
        <li>
          <Link href="/Materi">Materi</Link>
        </li>
        <li>
          <Link href="/Diskusi">Diskusi</Link>
        </li>
        <li>
          <Link href="/Dokumentasi">Dokumentasi</Link>
        </li>
      </ul>
      {session.status === "authenticated" ? (
        <div className="relative" onClick={toggleDropdown}>
          <img
            src={
              session.data.user.image
                ? session.data.user.image
                : "/pfpPlaceholder.png"
            }
            width={40}
            height={40}
            className="cursor-pointer rounded-full"
          />
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-md">
              <div className="py-2">
                <div className="border-b border-gray-200 hover:bg-gray-100 cursor-pointer py-1 px-4">
                  <Link href="/Profile">My Profile</Link>
                </div>
                <div className="hover:bg-gray-100 cursor-pointer py-1 px-4">
                  <button onClick={signOut}>Log Out</button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link href="/sign-in">Log in</Link>
      )}
    </div>
  );
};

export default Navbar;
