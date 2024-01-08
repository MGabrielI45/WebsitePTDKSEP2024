// pages/NewAccount.js

"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FormData } from "@/types/signup";
import { IoMdMail, IoMdLock } from "react-icons/io";
import { FaAddressCard } from "react-icons/fa6";
import { useSession, signIn, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification} from "../toast";

const NewAccount = () => {
  const router = useRouter();
  const session = useSession();

  if (session.data) {
    router.push("/");
  }

  const divStyle = {
    backgroundImage: 'url("/LoginBackground.png")',
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  };
  const [formData, setFormData] = useState<FormData>({
    email: "",
    name: "",
    password: "",
    repeatPassword: "",
  });

  // update data
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // credentials signup
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      console.log("password not match");
      errorNotification("Password not match!");
    } else {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      if (response.ok) {
        successNotification("Account created successfully!");
        router.push("/sign-in");
      } else {
        let message = "Oops! Something went wrong!"
        if(response.status === 409){message = "User with this email already exists"}
        if(response.status === 410){message = "User with this username already exists"}
        
        console.log(response)
        console.log(formData)
        errorNotification(message);
      }
    }
  };

  // google signup
  const handleGoogleSignUp = async () => {

    console.log("sdf")
   
    const signInData = await signIn('google', {
      redirect: false, 
    }, { signin_type: 'registration'});
    
    if (!signInData?.ok) {
      console.log("wakwak", signInData)
      errorNotification("Oops! Something went wrong!")
    } else {
      router.refresh();
      router.push('/');
    }
  }

  return (
    <div>

      <div
        className="min-h-screen flex items-center justify-center"
        style={divStyle}
      >
        <div className="flex flex-col items-center p-8 rounded-md">
          <div className="mb-4">
            <Image alt="logo" src="/logo.png" height={50} width={50} />
          </div>
          <div className="mb-4 text-xl font-bold">CREATE ACCOUNT</div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center mb-4"
          >
            <div className="pb-4">
              <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                <IoMdMail className="absolute left-4 h-[15px] w-[15px]" />
                <input
                  type="email"
                  placeholder="Email"
                  required
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="pb-4">
              <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                <FaAddressCard className="absolute left-4 h-[15px] w-[15px]" />
                <input
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formData.name}
                  required
                  onChange={handleChange}
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
                  name="repeatPassword"
                  value={formData.repeatPassword}
                  onChange={handleChange}
                  required
                  placeholder="Re-confirm Password"
                  className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                />
              </div>
            </div>

            <button
              className="mt-4 bg-gradient-to-r from-[#D32026] to-[#FA6065] hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full cursor-pointer"
              type="submit"
            >
              Create Account
            </button>
            <button type="button" onClick={handleGoogleSignUp}>
              <div className="flex flex-row items-center relative mt-4 bg-[#303030] hover:bg-grey text-white font-bold py-2 px-10 rounded-xl cursor-pointer">
                <span className="absolute left-4">
                  <Image alt="google" src="/gugel.png" height={15} width={15} />
                </span>
                <span className="focus:outline-none">Or Sign Up with Google</span>
              </div>
            </button>
          </form>

          <Link href="/sign-in">
            <div className="text-sm text-blue-500 hover:underline cursor-pointer mt-2">
              Already have an account? Login
            </div>
          </Link>
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default NewAccount;
