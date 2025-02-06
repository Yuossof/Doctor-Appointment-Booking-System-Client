import WelcomePlaylist from '@/components/home/welcome-with-playlist/WelcomePlaylist'
import RequestAppointmentSection from '@/components/services/request-appointment-section/RequestAppointmentSection'
import ServicesHeroSection from '@/components/services/services-hero-section/ServicesHeroSection'
import React from 'react'

const page = () => {
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

export default page