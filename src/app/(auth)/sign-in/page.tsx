"use client";

import React, {useState} from "react";
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from "next/image";
import Link from "next/link";

import { ToastContainer } from "react-toastify";
import { FormData} from '@/types/login'
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { errorNotification, successNotification} from "../toast";

const LoginPage = () => {
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

  const [formData, setFormData] = useState<FormData>({email: "", password: ""})
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    e.preventDefault();
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("sdf")
   
    const signInData = await signIn('credentials', {
      email: formData.email,
      password: formData.password,
      redirect: false, 
    });
    
    if (!signInData?.ok) {
      console.log("wakwak", signInData)
      errorNotification(signInData.error === "CredentialsSignin" ? "User doesn't exist or wrong password!" : "Oops! Something went wrong!")
    } else {
      router.refresh();
      router.push('/');
    }
  }

  const handleGoogleSignin = async (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();

    console.log("sdf")
   
    const signInData = await signIn('google', {
      redirect: false, 
    });
    
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
        <div>
          <form
            
            className="flex flex-col items-center p-8 rounded-md"
            action=""
            onSubmit={handleSubmit}
          >
            <div className="mb-4">
              <Image alt="logo" src="/logo.png" height={50} width={50} />
            </div>
            <div className="mb-4 text-xl font-bold">LOGIN</div>
            <div className="flex flex-col items-center mb-4">
              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <span className="absolute left-4">
                    <Image
                      alt="username"
                      src="/username.png"
                      height={15}
                      width={15}
                    />
                  </span>
                  <input
                    type="email"
                    placeholder="Email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <span className="absolute left-4">
                    <Image alt="pass" src="/pass.png" height={13} width={13} />
                  </span>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    minLength={8}
                    placeholder="Password"
                    className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>
            </div>

            <Link href="/forget-password">
              <div className="text-sm text-blue-500 hover:underline cursor-pointer">
                Forgot Password?
              </div>
            </Link>

            <Link href="/sign-up">
              <div className="text-sm text-blue-500 hover:underline cursor-pointer mt-2">
                Create a New Account!
              </div>
            </Link>

            <button
              type="submit"
              
              className="mt-4 bg-gradient-to-r from-[#D32026] to-[#FA6065] hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full cursor-pointer"
            >
              Login Now
            </button>
            <button type="button" onClick={handleGoogleSignin}>
              <div className="flex flex-row items-center relative mt-4 bg-[#303030] hover:bg-grey text-white font-bold py-2 px-10 rounded-xl cursor-pointer">
                <span className="absolute left-4">
                  <Image alt="google" src="/gugel.png" height={15} width={15} />
                </span>
                <span className="focus:outline-none">Or Login with Google</span>
              </div>
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default LoginPage;
