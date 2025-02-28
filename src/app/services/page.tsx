import ServicesHeroSection from '@/components/services-page/services-hero-section/ServicesHeroSection'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Services'
}

const Services = () => {
    return (
        <div>
            <div className='container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>
                <div className="my-28 w-full"></div>
                <ServicesHeroSection />
            </div>
        </div>
    )
}

export default Services