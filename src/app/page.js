import React from 'react'
import Image from 'next/image'
import Hero from '@/components/Hero'
import Reminder from '@/components/Reminder'
import { getCurrentUser } from '@/libs/session'
import { redirect } from 'next/navigation'

export default async function Home() {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/sign-in')
  }
  
  return (
    <section className=''>
      <Hero />
      <Reminder />
    </section>
  )
}
