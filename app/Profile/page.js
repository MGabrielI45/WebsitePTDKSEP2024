// pages/profile.js

import React from 'react';

const Profile = () => {
  const profileData = {
    'Nama Lengkap': 'Adiel',
    'Tempat, Tanggal Lahir': 'Jakarta, 24 April 2005',
    'Fakultas / Jurusan': 'FMIPA / TPB',
    'No. Absen': '2',
    'Telepon Pribadi': '081221590756',
    'Telepon Darurat': '081221589619 (ibu)',
    'Id Line': 'adlrm',
    'Instagram': 'adielrum',
  };

  const keys = Object.keys(profileData);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center">
        <div className="relative">
          <img
            src="/pfpPlaceholder.png"
            alt="Profile Picture"
            className="mx-auto mb-8 w-32 h-32 rounded-full"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded absolute bottom-0 right-0 mb-2 mr-2 text-xs">
            +
          </button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {keys.map((key) => (
          <div key={key} className="bg-gray-200 shadow-md rounded-lg overflow-hidden">
            <div className="px-4 py-3">
              <p className="font-semibold mb-1 text-sm">{key}</p>
              <input
                type="text"
                className="block w-full px-3 py-2 rounded border border-gray-300"
                defaultValue={profileData[key]}
              />
            </div>
          </div>
        ))}
      </div>
      <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-8">
        Submit
      </button>
    </div>
  );
};

export default Profile;
 