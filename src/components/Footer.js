'use client'

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {FaTiktok, FaInstagram, FaYoutube, FaLinkedin} from 'react-icons/fa6'

const Footer = () => {
  
    return (
        <div className='flex-col justify-center items-center text-center bg-blue-100 p-5 text-white font-medium'>
            <div className='flex justify-center items-center'>
                <Image 
                    src='/ksep.png'
                    width={60}
                    height={60}
                />
                <h1>Kelompok Studi Ekonomi dan Pasar Modal</h1>
            </div>
            <div className='my-5'>
                <p className='text-xs font-normal mb-3'>Our Social Media</p>
                <ul className='flex justify-center items-center'>
                    <li className='mx-6'><Link href="https://www.tiktok.com/@ksep_itb" target='_blank'><FaTiktok className='size-8' /></Link></li>
                    <li className='mx-6'><Link href="https://www.instagram.com/ksepitb/" target='_blank'><FaInstagram className='size-8'/></Link></li>
                    <li className='mx-6'><Link href="https://www.youtube.com/@kelompokstudiekonomidanpas9212" target='_blank'><FaYoutube className='size-8'/></Link></li>
                    <li className='mx-6'><Link href="https://www.linkedin.com/company/ksepitb/" target='_blank'><FaLinkedin className='size-8'/></Link></li>
                </ul>
            </div>
            <p className='text-sm mt-7'>&copy; 2023 Kelompok Studi Ekonomi dan Pasar Modal ITB. All Rights Reserved.</p>
        </div>
    );

};
  
  export default Footer;