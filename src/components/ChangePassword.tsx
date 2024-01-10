"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification } from "@/app/(auth)/toast";
import { IoMdLock } from "react-icons/io";

const ChangePassword = ({ profile }) => {
  const session = useSession();
  const router = useRouter();
  if (!session) {
    router.push("/sign-in");
  }

  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
    repeatPassword: "",
  });

  // update data
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // credentials signup
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.newPassword !== formData.repeatPassword) {
      console.log("password not match");
      errorNotification("New Password not match!");
    } else {
      const response = await fetch("/api/user/change-password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: profile.email,
          password: formData.password,
          newPassword: formData.newPassword,
        }),
      });
      if (response.ok) {
        successNotification("Password changed successfully!");
        setFormData({
          password: "",
          newPassword: "",
          repeatPassword: "",
        });

        router.refresh();
   
      } else {
        let message = "Oops! Something went wrong!";
        if (response.status === 409) {
          message = "User with this email doesn't exist";
        }
        if (response.status === 410) {
          message = "Wrong password";
        }

        console.log(response);
        console.log(formData);
        errorNotification(message);
      }
    }
  };

  return (
    <>
      <button
        onClick={() =>
          document.getElementById("modal-change-password").showModal()
        }
        className=" mx-auto mt-3 bg-red-100 hover:bg-red-200 text-white font-bold py-2 px-10 rounded-full cursor-pointer"
      >
        Change Password
      </button>

      <dialog
        id="modal-change-password"
        className="modal modal-bottom sm:modal-middle rounded-md"
      >
        <div className="modal-box w-[500px] p-6">
          
          <div className="flex flex-col items-center mt-4 mb-6">
            <form
              onSubmit={handleSubmit}
              className="flex flex-col items-center mb-4"
            >
              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <IoMdLock className="absolute left-4 h-[15px] w-[15px]" />
                  <input
                    type="password"
                    minLength={8}
                    name="password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                    placeholder="Password"
                    className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <IoMdLock className="absolute left-4 h-[15px] w-[15px]" />
                  <input
                    type="password"
                    minLength={8}
                    name="newPassword"
                    value={formData.newPassword}
                    required
                    onChange={handleChange}
                    placeholder="New Password"
                    className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <IoMdLock className="absolute left-4 h-[15px] w-[15px]" />
                  <input
                    type="password"
                    minLength={8}
                    name="repeatPassword"
                    value={formData.repeatPassword}
                    onChange={handleChange}
                    required
                    placeholder="Re-confirm New Password"
                    className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <button
                className="mt-4 bg-gradient-to-r from-[#D32026] to-[#FA6065] hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full cursor-pointer"
                type="submit"
              >
                Change Password
              </button>
            </form>
          </div>
          <form method="dialog" className="flex justify-end space-x-4">
            <button className=" btn bg-blue-100 hover:bg-blue-200 text-white font-bold py-1 px-2 rounded absolute top-0 right-0 mt-2 mr-2 text-xs">
              X
            </button>
          </form>
        </div>
      </dialog>
      <ToastContainer />
    </>
  );
};

export default ChangePassword;
