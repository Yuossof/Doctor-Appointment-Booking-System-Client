import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const WelcomePlaylist = () => {
    return (
        <section className='flex px-5 flex-col gap-4 items-center'>
            <div className='flex flex-col gap-4 text-center items-center'>
                <h1
                    className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-4xl text-dark-blue lg:max-w-[60%]'>
                    We’re welcoming new patients and can’t wait to meet you.
                </h1>
                <p
                    className='text-muted-foreground lg:max-w-[65%]'>
                    We use only the best quality materials on the market in order to provide the best products to our patients.
                </p>
            </div>
            <div className='relative w-[100%] lg:w-[85%] h-[250px] sm:h-[300px] md:h-[452px] lg:h-[540px] mt-6'>
                <Image src="/images/Group 1000001015.png" alt='playlist' layout='fill' objectFit='cover' className='rounded-lg' />
            </div>
            <Button className='mt-4 bg-mid-blue h-11 w-40'>Watch Playlist</Button>
        </section>
    )
}

export default WelcomePlaylist