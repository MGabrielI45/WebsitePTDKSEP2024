import React from "react";
import Image from "next/image";

export const Hero = () => {
  return (
    <div className="w-full h-[calc(100vh-60px)]">
      <div className="absolute w-full h-full top-0 left-0 overflow-hidden">
        <img
          className="absolute top-1/2 -translate-y-1/2 -right-[6vw] w-[55vw]"
          alt="Image"
          src="image.jpg"
        />
        <img className="absolute top-[30px] left-0" alt="Element" src="6.svg" />
        <img className="absolute bottom-0 left-0" alt="Element" src="5.svg" />
        <img
          className="absolute bottom-0 left-[33vw]"
          alt="Element"
          src="4.svg"
        />
        <img
          className="absolute bottom-0 left-[45vw]"
          alt="Element"
          src="3.svg"
        />
        <img className="absolute bottom-0 right-0" alt="Element" src="2.svg" />
        <img
          className="absolute top-[60px] right-0"
          alt="Element"
          src="1.svg"
        />
        <div className="absolute top-1/2 -translate-y-1/2 left-[60px]">
          <h2 className="font-bold text-[#d32026] text-7xl">Welcome to,</h2>
          <h1 className="font-extrabold text-black text-9xl leading-[normal]">
            PTD KSEP <br />
            ITB 2024
          </h1>
          <p className="w-[600px] font-medium text-[#8d8d8d] text-lg">
            An orientation program of KSEP ITB, campus-based student-led
            organisation found in 22 November 1997 that aimed to be the leading
            platform to develop economics &amp; stock market knowledge in ITB.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
