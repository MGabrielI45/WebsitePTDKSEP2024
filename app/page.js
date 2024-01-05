import Image from 'next/image'
import Hero from './components/Hero'
import Reminder from './components/Reminder'

export default function Home() {
  return (
    <section className=''>
      <Hero />
      <Reminder />
    </section>
  )
}
