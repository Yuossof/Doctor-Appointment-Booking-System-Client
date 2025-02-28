import AboutHeroSection from '@/components/about-page/AboutHeroSection'
import LatestTechnologySection from '@/components/about-page/LatestTechnologySection'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: 'About_Us'
}

const Page = () => {
  return (
    <div>
      <div className='container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>
        <AboutHeroSection />
        <div className="my-32 w-full"></div>
        <LatestTechnologySection />
      </div>
    </div>
  )
}

export default Page