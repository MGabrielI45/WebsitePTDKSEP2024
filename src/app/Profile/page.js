// pages/profile.js

"use client";

import React, { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";
import axios from "axios";

const Profile = () => {
  const profileData = {
    "Nama Lengkap": "Adiel",
    "Tempat, Tanggal Lahir": "Jakarta, 24 April 2005",
    "Fakultas / Jurusan": "FMIPA / TPB",
    "No. Absen": "2",
    "Telepon Pribadi": "081221590756",
    "Telepon Darurat": "081221589619 (ibu)",
    "Id Line": "adlrm",
    Instagram: "adielrum",
  };

  const [src, setSrc] = useState(null);
  const [img, setImg] = useState(null);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem) => {
    if(elem.target.files[0].size > 1 * 1024 * 1024){
      alert("File is too big! Maximum size is 1MB");
      elem.target.value = "";
    };
  }

  const handleImageSubmit = async () => {
    try {
      const response = await axios.patch("/api/user", {
        email: "qdsq", // Temporary, tunggu fitur lain selesai
        profilePicture: preview,
      });
      if (response.status === 200) {
        setImg(preview);
        console.log(response);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const keys = Object.keys(profileData);

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center">
        <div className="relative">
          <img
            src={!img ? "/pfpPlaceholder.png" : img}
            alt="Profile Picture"
            className="mx-auto mb-8 w-32 h-32 rounded-full"
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded absolute bottom-0 right-0 mb-2 mr-2 text-xs"
            onClick={() => document.getElementById("modal").showModal()}
          >
            +
          </button>
          <dialog id="modal" className="modal modal-bottom sm:modal-middle">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Set Profile Picture</h3>

              <div>
                <Avatar
                  width={200}
                  height={200}
                  onCrop={onCrop}
                  onClose={onClose}
                  onBeforeFileLoad={onBeforeFileLoad}
                  src={src}
                />
                <h2>Preview</h2>
                {preview && (
                  <img height={200} width={200} src={preview} alt="Preview" />
                )}
              </div>

              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">Close</button>
                  <button className="btn" onClick={handleImageSubmit}>
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {keys.map((key) => (
          <div
            key={key}
            className="bg-gray-200 shadow-md rounded-lg overflow-hidden"
          >
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