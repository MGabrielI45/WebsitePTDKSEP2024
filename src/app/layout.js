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

  return (
    <html lang="en">
      <body>
        {(pathname != '/LoginPage' && pathname != '/LoginPage/ForgetPassword') ? <Navbar /> : null}
        <main>
          {children}
        </main>
        {(pathname != '/LoginPage' && pathname != '/LoginPage/ForgetPassword') ? <Footer /> : null}
      </body>
    </html>
  )
}
