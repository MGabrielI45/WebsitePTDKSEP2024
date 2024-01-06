'use client'

import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

/*export const metadata = {
  title: 'PTD KSEP 2024',
  description: 'Website untuk PTD KSEP 2024.',
} */

export default function RootLayout({ children }) {
  
  const pathname = usePathname();
  const noFooter = ['/LoginPage','/LoginPage/ForgetPassword','/LoginPage/NewAccount']
  const haveFooter = noFooter.includes(pathname)
  return (
    <html lang="en">
      <body>
        {(!haveFooter) ? <Navbar /> : null}
        <main>
          {children}
        </main>
        {(!haveFooter) ? <Footer /> : null}
      </body>
    </html>
  )
}
