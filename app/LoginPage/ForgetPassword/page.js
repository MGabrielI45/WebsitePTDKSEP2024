'use client'

import React from 'react';
import { useState } from 'react';
import { useRouter } from "next/navigation";

const ForgotPassword = () => {
  
  const[data, setData] = useState({
    username: ""
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
  const handleSubmit = async event => {
    
    event.preventDefault()
    setIsSubmitting(true)

    const res = await fetch('../../api/send', {
      method: 'POST',
      body: JSON.stringify(data)
    })

    if (res.status === 200) {
      setData({
        username: ""
      })
      setIsSubmitting(false)
      router.push('/LoginPage')
    }

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
            <label htmlFor="username" className="block mb-2">
              What is your username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={data.username}
              onChange={handleChange}
              className="
                rounded-md px-4 py-2 w-80 text-white 
                focus:outline-none focus:border-transparent focus:ring-0 
                autofill:shadow-[inset_0_0_0px_1000px_rgb(32,32,32)]
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
    </div>
  );
};

export default ForgotPassword;
