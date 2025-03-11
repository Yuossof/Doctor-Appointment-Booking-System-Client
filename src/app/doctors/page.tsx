
import BreadCamp from '@/components/Doctors/BreadCamp'
import MainContent from '@/components/Doctors/MainContent'
import ShowMessageDialog from '@/components/Doctors/ShowMessageDialog'
import Sidebar from '@/components/Sidebar/Sidebar'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

export const metadata: Metadata = {
  title: 'Doctors'
}

export default function Doctors() {

  return (
    <>
    <ShowMessageDialog />
      <div className='relative container h-full px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>
        <BreadCamp/>
        <div className="flex flex-col lg:flex-row gap-4 shadow-xl border border-[#f9f9f9] rounded-md p-5 pb-10 translate-y-[10px]">
          <Sidebar />
          <MainContent />
        </div>
      </div>
    </>
  )
}
