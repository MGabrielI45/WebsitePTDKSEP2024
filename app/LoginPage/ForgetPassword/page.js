import React from 'react';
import Link from 'next/link';

const ForgotPassword = () => {
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
        <div className="mt-8">
          <label htmlFor="username" className="block mb-2">
            What is your username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Username"
            className="border border-gray-300 rounded-md px-4 py-2 w-80 focus:outline-none focus:border-blue-500"
          />
        </div>
        <button className="mt-8">
          <Link href="/LoginPage">
            <div className="block bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:bg-blue-700">
              Send Request
            </div>
          </Link>
        </button>
      </div>
    </div>
  );
};

export default ForgotPassword;
