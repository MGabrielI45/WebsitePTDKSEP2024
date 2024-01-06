import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Head from 'next/head';

const LoginPage = () => {
  const divStyle = {
    backgroundImage: 'url("/LoginBackground.png")',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap" rel="stylesheet"/>
      </Head>

      <div className="min-h-screen flex items-center justify-center" style={divStyle}>
        <div className="flex flex-col items-center bg-white p-8 rounded-md">
          <div className="mb-4">
            <Image src="/logo.png" height={50} width={50} />
          </div>
          <div className="mb-4 text-xl font-bold">LOGIN</div>
            <div className="flex flex-col items-center mb-4">

              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <span className="absolute left-4">
                    <Image src="/username.png" height={15} width={15} />
                  </span>
                  <input
                    type="text"
                    placeholder="Username"
                    className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

              <div className="pb-4">
                <div className="relative flex flex-row items-center bg-[#EBEBEB] px-4 rounded-xl w-72">
                  <span className="absolute left-4">
                    <Image src="/pass.png" height={13} width={13} />
                  </span>
                  < input
                      type="password"
                      placeholder="Password"
                      className="pl-8 pr-4 py-2 rounded-md w-72 focus:outline-none bg-transparent"
                  />
                </div>
              </div>

            </div>
            
            <Link href="/LoginPage/ForgetPassword">
              <div className="text-sm text-blue-500 hover:underline cursor-pointer">
                Forgot Password?
              </div>
            </Link>

            <Link href="/LoginPage/NewAccount">
              <div className="text-sm text-blue-500 hover:underline cursor-pointer mt-2">
                Make a new account
              </div>
            </Link>

            <Link href="/">
              <div className="mt-4 bg-gradient-to-r from-[#D32026] to-[#FA6065] hover:bg-blue-700 text-white font-bold py-2 px-10 rounded-full cursor-pointer">
                Login Now
              </div>
            </Link>

            <Link href="/">
              <div className="flex flex-row items-center relative mt-4 bg-[#303030] hover:bg-grey text-white font-bold py-2 px-10 rounded-xl cursor-pointer">
                <span className="absolute left-4">
                  <Image src="/gugel.png" height={15} width={15}/>
                </span>
                <span className='focus:outline-none'>
                  Or Login with Google
                </span>
              </div>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
