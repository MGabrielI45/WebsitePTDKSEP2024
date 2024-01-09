// pages/profile.js

"use client";

import React, { useState} from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";


const Profile = ({profile}) => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "unauthenticated") {
    router.push("/sign-in");
  }
  
  const {id, image, role, ...userProfile } = profile;


  const [formData, setFormData] = useState({ ...userProfile });

  const [img, setImg] = useState(profile.image);




  

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center">
        <div className="relative">
          <img
            src={!img ? "/pfpPlaceholder.png" : img}
            alt="Profile Picture"
            className="mx-auto mb-8 w-32 h-32 rounded-full"
          />
         
          
        </div>
      </div>
      <form >
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-4">
            <div className="text-gray-600 col-span-4">
              
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-12">
                  <label htmlFor="name">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    readOnly
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.name}
                
                    placeholder="Nama Lengkap"
                    required
                  />
                </div>

                

                <div className="md:col-span-6">
                  <label htmlFor="birthPlace">Tempat Lahir</label>
                  <input
                    type="text"
                    name="birthPlace"
                    id="birthPlace"
                    readOnly
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.birthPlace ? formData.birthPlace : ""}
                   
                    placeholder="Tempat Lahir"
                    required
                  />
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="birthDate">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="birthDate"
                    readOnly
                    id="birthDate"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.birthDate ? formData.birthDate : ""}
                   
                    required
                  />
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="faculty">Fakultas</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      name="faculty"
                      id="faculty"
                      readOnly
                      className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                      value={formData.faculty ? formData.faculty : ""}
                     
                      placeholder="Fakultas"
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="major">Jurusan</label>
                  <div className="h-10 bg-gray-50 flex border border-gray-200 rounded items-center mt-1">
                    <input
                      name="major"
                      id="major"
                      readOnly
                      placeholder="Jurusan"
                      className="px-4 appearance-none outline-none text-gray-800 w-full bg-transparent"
                      value={formData.major ? formData.major : ""}
                      
                      required
                    />
                  </div>
                </div>

                <div className="md:col-span-12">
                  <label htmlFor="absentNumber">No. Absen</label>
                  <input
                    type="number"
                    step="1"
                    readOnly
                    min="0"
                    name="absentNumber"
                    id="absentNumber"
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.absentNumber ? formData.absentNumber : ""}
                  
                    placeholder="No. Absen"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-12">
                  <label htmlFor="phoneNumber">No. Telepon Pribadi</label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    readOnly
                    pattern="[0-9]{11,12}"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.phoneNumber ? formData.phoneNumber : ""}
                  
                    placeholder="Contoh: 081234567890"
                    required
                  />
                </div>

                <div className="md:col-span-12">
                  <label htmlFor="emergencyNumber">No. Telepon Darurat</label>
                  <input
                    type="tel"
                    name="emergencyNumber"
                    id="emergencyNumber"
                    pattern="[0-9]{11,12}"
                    readOnly
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.emergencyNumber ? formData.emergencyNumber : ""}
                  
                    placeholder="Contoh: 081234567890"
                    required
                  />
                </div>

                <div className="md:col-span-12">
                  <label htmlFor="lineId">ID Line</label>
                  <input
                    type="text"
                    name="lineId"
                    readOnly
                    id="lineId"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.lineId ? formData.lineId : ""}
                
                    placeholder="ID Line"
                    required
                  />
                </div>

                <div className="md:col-span-12">
                  <label htmlFor="instagram">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    readOnly
                    id="instagram"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.instagram ? formData.instagram : ""}
                   
                    placeholder="Instagram"
                    required
                  />
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </form>
      
    
 
    </div>
  );
};

export default Profile;
