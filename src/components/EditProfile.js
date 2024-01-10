// pages/profile.js

"use client";

import React, { useState, useEffect } from "react";
import Avatar from "react-avatar-edit";
import axios from "axios";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/app/(auth)/toast";
import ChangePassword from "@/components/ChangePassword";

const EditProfile = ({ profile }) => {
  const router = useRouter();
  const session = useSession();

  if (session.status === "unauthenticated") {
    router.push("/sign-in");
  }

  const { id, image, role, accounts, ...userProfile } = profile;

  const [formData, setFormData] = useState({ ...userProfile });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.patch("/api/user", {
        data: formData,
      });
      if (response.status === 200) {
        successNotification("Profile updated!");
        router.refresh();
      }
    } catch (error) {
      errorNotification("Something went wrong!");
      console.error(error);
    }
  };

  const [src, setSrc] = useState(null);
  const [img, setImg] = useState(profile.image);
  const [preview, setPreview] = useState(null);

  const onClose = () => {
    setPreview(null);
  };

  const onCrop = (preview) => {
    setPreview(preview);
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 1 * 1024 * 1024) {
      alert("File is too big! Maximum size is 1 MB !");
      elem.target.value = "";
    }
  };

  const handleImageSubmit = async () => {
    try {
      const response = await axios.patch("/api/user", {
        data: {
          email: profile.email,
          image: preview,
        },
      });
      if (response.status === 200) {
        setImg(preview);
        successNotification("Profile picture updated!");
        router.refresh();
      }
    } catch (error) {
      errorNotification("Something went wrong!");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="flex justify-center items-center">
        <div className="relative">
          <img
            src={!img ? "/pfpPlaceholder.png" : img}
            alt="Profile Picture"
            className="mx-auto mb-8 w-32 h-32 rounded-full border-4 border-red-100"
          />
          {!profile.accounts.length && (
            <button
              className="bg-blue-100 hover:bg-blue-200 text-white font-bold py-1 px-2 rounded absolute bottom-3 right-2 mb-2 mr-2 text-xs"
              onClick={() => document.getElementById("modal").showModal()}
            >
              +
            </button>
          )}

          <dialog
            id="modal"
            className="modal modal-bottom sm:modal-middle rounded-md"
          >
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
              <form method="dialog" className="flex justify-end space-x-4">
                <button
                  className="btn bg-gray-300 hover:bg-gray-400 rounded-lg p-3"
                  onClick={onClose}
                >
                  Close
                </button>
                <button
                  className="btn bg-blue-100 hover:bg-blue-200 text-white p-3 rounded-lg"
                  onClick={handleImageSubmit}
                >
                  Submit
                </button>
              </form>
            </div>
          </dialog>
        </div>
      </div>
      <div className="flex justify-center items-center flex-col">
        {!profile.accounts.length ? (
          <ChangePassword profile={profile} />
        ) : (
          <button
            onClick={signOut}
            className=" mx-auto  bg-red-100 hover:bg-red-200 text-white font-bold py-2 px-10 rounded-full cursor-pointer"
          >
            Log Out
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6">
          <div className="grid gap-4 gap-y-2 text-sm grid-cols-4">
            <div className="text-gray-600 col-span-4"></div>

            <div className="lg:col-span-2">
              <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-12">
                  <label htmlFor="name">Nama Lengkap</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Nama Lengkap"
                    maxLength={30}
                    required
                  />
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="birthPlace">Tempat Lahir</label>
                  <input
                    type="text"
                    name="birthPlace"
                    id="birthPlace"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.birthPlace ? formData.birthPlace : ""}
                    onChange={handleChange}
                    placeholder="Tempat Lahir"
                    required
                  />
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="birthDate">Tanggal Lahir</label>
                  <input
                    type="date"
                    name="birthDate"
                    id="birthDate"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.birthDate ? formData.birthDate : ""}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="faculty">Fakultas</label>

                  <input
                    name="faculty"
                    type="text"
                    id="faculty"
                    className="px-4 w-full h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.faculty ? formData.faculty : ""}
                    onChange={handleChange}
                    placeholder="Fakultas"
                    maxLength={30}
                    required
                  />
                </div>

                <div className="md:col-span-6">
                  <label htmlFor="major">Jurusan</label>

                  <input
                    name="major"
                    id="major"
                    type="text"
                    placeholder="Jurusan"
                    className="px-4 w-full  h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.major ? formData.major : ""}
                    onChange={handleChange}
                    maxLength={30}
                    required
                  />
                </div>

                <div className="md:col-span-12">
                  <label htmlFor="absentNumber">No. Absen</label>
                  <input
                    type="number"
                    step="1"
                    min="0"
                    name="absentNumber"
                    id="absentNumber"
                    className="transition-all flex items-center h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.absentNumber ? formData.absentNumber : ""}
                    onChange={handleChange}
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
                    pattern="[0-9]{11,12}"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.phoneNumber ? formData.phoneNumber : ""}
                    onChange={handleChange}
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
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={
                      formData.emergencyNumber ? formData.emergencyNumber : ""
                    }
                    onChange={handleChange}
                    placeholder="Contoh: 081234567890"
                    required
                  />
                </div>

                <div className="md:col-span-12">
                  <label htmlFor="lineId">ID Line</label>
                  <input
                    type="text"
                    name="lineId"
                    id="lineId"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.lineId ? formData.lineId : ""}
                    onChange={handleChange}
                    placeholder="ID Line"
                    required
                  />
                </div>

                <div className="md:col-span-12">
                  <label htmlFor="instagram">Instagram</label>
                  <input
                    type="text"
                    name="instagram"
                    id="instagram"
                    className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                    value={formData.instagram ? formData.instagram : ""}
                    onChange={handleChange}
                    placeholder="Instagram"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="md:col-span-5 text-right">
              <div className="inline-flex items-end">
                <button
                  type="submit"
                  className="bg-blue-100 hover:bg-blue-200 text-white font-bold py-2 px-4 rounded mt-8"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default EditProfile;
