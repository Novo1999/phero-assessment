'use client'

// THIS TEMPLATE IS HERE FOR THE PAGE TRANSITION

import { animatePageIn } from '@/utils/animations'
import { useEffect } from 'react'

export default function Template({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    animatePageIn()
  }, [])
  return (
    <div>
      <div
        id='banner-1'
        className='min-h-screen flex justify-center text-2xl font-bold italic items-center bg-gradient-to-r from-sky-400 to-blue-500 z-10 fixed top-0 left-0 w-1/4'
      >
        WE
      </div>
      <div
        id='banner-2'
        className='min-h-screen flex justify-center text-2xl font-bold italic items-center bg-gradient-to-r from-sky-400 to-blue-500 z-10 fixed top-0 left-1/4 w-1/4'
      >
        ARE
      </div>
      <div
        id='banner-3'
        className='min-h-screen flex justify-center text-2xl font-bold italic items-center bg-gradient-to-r from-sky-400 to-blue-500 z-10 fixed top-0 left-2/4 w-1/4'
      >
        NOW
      </div>
      <div
        id='banner-4'
        className='min-h-screen flex justify-center text-2xl font-bold italic items-center bg-gradient-to-r from-sky-400 to-blue-500 z-10 fixed top-0 left-3/4 w-1/4'
      >
        LOADING
      </div>
      {children}
    </div>
  )
}
