'use client'

import React from 'react';
import { useState } from 'react';
import { useRouter } from "next/navigation";
import { useSession } from 'next-auth/react';
import { errorNotification, successNotification} from "../toast";
import { ToastContainer } from 'react-toastify';

const ForgotPassword = () => {
  
  const[data, setData] = useState({
    email: ""
  })

  const[isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = event => {
    const { name, value } = event.target;
    setData((prevProps) => ({
      ...prevProps,
      [name]: value
    }));
  };

  const router = useRouter()
  const session = useSession();

  if (session.data) {
    router.push("/");
  }

  const handleSubmit = async event => {
    
    event.preventDefault()
    setIsSubmitting(true)

    const res = await fetch('../../api/send', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (res.ok) {
      setData({
        email: ""
      })
      successNotification("Email sent successfully!")
      router.push('/sign-in')
    } else {
      errorNotification("Failed to send email")
    }

    console.log(res)
    console.log(data)
    setIsSubmitting(false)
    return res.json()
  }
  
  const divStyle = {
    backgroundImage: 'url(/LoginBackground.png)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };
  
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen"
      style={divStyle}
    >
      <div className="flex flex-col items-center justify-center min-h-screen">
        <img
          src="https://media.licdn.com/dms/image/C560BAQErjHdrb_8dOA/company-logo_200_200/0/1674320211645?e=2147483647&v=beta&t=kSBdMaMjCeJijyULQbydCN3puOnkhMFfkZG3Y98496w"
          width="80"
          alt="PTD KSEP"
          className="mt-4"
        />
        <h1 className="text-3xl font-bold mt-8">Forgot Password</h1>
        
        {/* Form */}
        <form id="forgot-password-form" onSubmit={handleSubmit} className="flex flex-col items-center justify-center">
          <div className="mt-8">
            <label htmlFor="email" className="block mb-2">
              Enter Your Email!
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={data.email}
              onChange={handleChange}
              className="
                rounded-md bg-[#EBEBEB] px-4 py-2 w-80 
                focus:outline-none focus:border-transparent focus:ring-0 
                autofill:shadow-[inset_0_0_0px_1000px_rgb(235,235,235)]
              "
            />
          </div>
          <button type="submit" className="mt-8" disabled={isSubmitting}>
            <div className="
              block rounded bg-blue-100 text-white font-bold py-2 px-4 
              hover:bg-blue-200
              focus:outline-none focus:border-transparent focus:ring-0
              disabled:pointer-events-none disabled:opacity-80
            ">
              {(isSubmitting) ? 'Sending Request' : 'Send Request'}
            </div>
          </button>
        </form>

      </div>
      <ToastContainer />
    </div>
  );
};

export default ForgotPassword;
