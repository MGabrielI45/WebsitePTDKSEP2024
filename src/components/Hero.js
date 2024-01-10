import React from "react";

export const Hero = () => {
  return (
    <div className="w-full h-[790px]">
      <div className="absolute w-full h-[1006px] top-0 left-0">
        <div className="relative w-full h-[832px] top-[26px] left-0">
          <div className="absolute w-full h-[832px] top-0 left-0">
            <img className="absolute w-[624px] h-[601px] top-[140px] right-0" alt="Image" src="image.png" />
            <img className="absolute w-[323px] h-[149px] bottom-0 left-0" alt="Element" src="5.png" />
            <img className="absolute w-[395px] h-[151px] top-[681px] left-[373px]" alt="Element" src="4.png" />
            <img className="absolute w-[384px] h-[119px] top-[713px] left-[618px]" alt="Element" src="3.png" />
            <img
              className="absolute w-[197px] h-[129px] top-[703px] right-0 mix-blend-multiply"
              alt="Element"
              src="2.png"
            />
            <img className="absolute w-[429px] h-[387px] top-0 right-0" alt="Element" src="1.png" />
            <div className="w-[451px] mt-40 ml-20 [font-family:'Montserrat-Bold',Helvetica] font-bold text-[#d32026] text-[64px] tracking-[0] leading-[normal]">
              Welcome to,
            </div>
            <div className="w-[683px] ml-20 [font-family:'Montserrat-Bold',Helvetica] font-bold text-black text-[128px] tracking-[0] leading-[normal]">
              PTD KSEP
            </div>
            <div className="w-[599px] ml-20 [font-family:'Montserrat-Bold',Helvetica] font-bold text-black text-[128px] tracking-[0] leading-[normal] whitespace-nowrap">
              ITB 2024
            </div>
            <p className="w-[560px] ml-20 mt-20 [font-family:'Montserrat-Medium',Helvetica] font-medium text-[#8d8d8d] text-[18px] tracking-[0] leading-[normal]">
              An orientation program of KSEP ITB, campus-based student-led organisation found in 22 November 1997 that
              aimed to be the leading platform to develop economics &amp; stock market knowledge in ITB.
            </p>
          </div>
          <div className="absolute w-[493px] h-[276px] top-0 left-0">
            <img className="absolute w-[204px] h-[223px] top-0 left-0" alt="Element" src="6.png" />
      
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
