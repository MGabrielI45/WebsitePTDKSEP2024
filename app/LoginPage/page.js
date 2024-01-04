import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const LoginPage = () => {
  const divStyle = {
    backgroundImage: 'url("/LoginBackground.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={divStyle}>
      <div className="flex flex-col items-center bg-white p-8 rounded-md">
        <div className="mb-4">
          <Image src="/logo.png" height={30} width={30} />
        </div>
        <div className="mb-4 text-lg font-bold">LOGIN</div>
        <div className="flex flex-col items-center mb-4">
          <input
            type="text"
            placeholder="Username"
            className="bg-gray-300 px-4 py-2 rounded-md mb-4 w-72"
          />
          <input
            type="password"
            placeholder="Password"
            className="bg-gray-300 px-4 py-2 rounded-md mb-4 w-72"
          />
          <Link href="/">
            <div className="bg-[#D32026] hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              LOG IN
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
