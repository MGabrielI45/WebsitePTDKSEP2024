'use client'

import  Provider from '@/components/provider'


import { Montserrat } from 'next/font/google'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

import './globals.css'

const montserrat = Montserrat({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-montserrat',
});

export default function RootLayout({ children }) {
  
  const pathname = usePathname();
  const noFooter = ['/LoginPage','/LoginPage/ForgetPassword','/LoginPage/NewAccount']
  const haveFooter = noFooter.includes(pathname)

  return (
    <html lang="en" className={montserrat.variable}>
      <body>
        <Provider>
        {(!haveFooter) ? <Navbar /> : null}
        <main>
          {children}
        </main>
        {(!haveFooter) ? <Footer /> : null}
        </Provider>
      </body>
    </html>
  )
}
