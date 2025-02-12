
import MainContent from '@/components/Doctors/MainContent'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Doctors'
}

export default async function Doctors() {

  return (
    <div className='container h-full px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>

        <div className='flex gap-1 text-[12px] text-body-text'>
            <Link href={'/'} className='hover:text-mid-blue transition-all duration-300 hover:underline cursor-pointer'>Logo</Link>
            <span>/</span>
            <span className='hover:text-mid-blue transition-all duration-300 hover:underline '>All Docotrs In Egypt</span>
        </div>

        <div className="flex gap-4 shadow-xl border border-[#f9f9f9] rounded-md p-5 pb-10 translate-y-[10px]">
            <Sidebar/>
            <MainContent />
        </div>

    </div>
  )
}
