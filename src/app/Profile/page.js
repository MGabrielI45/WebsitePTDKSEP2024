// pages/profile.js

"use client";

import React, { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";
import axios from "axios";
import { profileData } from "../constants";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Profile = () => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "unauthenticated") {
    router.push("/sign-in");
  }
  


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
          <dialog id="modal" className="modal modal-bottom sm:modal-middle rounded-md">
            <div className="modal-box w-[500px] p-6">
              <h3 className="font-bold text-lg">Set Profile Picture</h3>
              <div className="flex flex-col items-center mt-4 mb-6">
                <Avatar
                  width={200}
                  height={200}
                  onCrop={onCrop}
                  onClose={onClose}
                  onBeforeFileLoad={onBeforeFileLoad}
                  src={src}
                  className="object-cover rounded-full"
                />
                <h2 className="mt-4 mb-2 font-semibold">Preview</h2>
                {preview && (
                  <img
                    className="mb-4 object-cover rounded"
                    height={200}
                    width={200}
                    src={preview}
                    alt="Preview"
                  />
                )}
              </div>
              <form method='dialog' className="flex justify-end space-x-4">
                <button className="btn bg-gray-300 hover:bg-gray-400 rounded-lg p-3" onClick={onClose}>
                  Close
                </button>
                <button className="btn bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg" onClick={handleImageSubmit}>
                  Submit
                </button>
              </form>
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
