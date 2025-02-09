import WelcomePlaylist from '@/components/home-page/welcome-with-playlist/WelcomePlaylist'
import RequestAppointmentSection from '@/components/services-page/request-appointment-section/RequestAppointmentSection'
import ServicesHeroSection from '@/components/services-page/services-hero-section/ServicesHeroSection'
import React from 'react'

const Services = () => {
    return (
        <div>
            <div className='container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>
                <div className="my-28 w-full"></div>
                <ServicesHeroSection />
            </div>
            <div>
                <div className="my-32 w-full"></div>
                <RequestAppointmentSection />
            </div>
            <div className='container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>
                <div className="my-32 w-full"></div>
                <WelcomePlaylist />
            </div>
        </div>
    )
}

export default Services