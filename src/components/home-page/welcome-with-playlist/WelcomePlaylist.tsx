'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const WelcomePlaylist = () => {
    return (
        <section className='flex px-5 flex-col gap-4 items-center'>
            <div className='flex flex-col gap-4 text-center items-center'>
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                    className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-4xl text-dark-blue lg:max-w-[60%]'>
                    We’re welcoming new patients and can’t wait to meet you.
                </motion.h1>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                    className='text-muted-foreground lg:max-w-[65%]'>
                    We use only the best quality materials on the market in order to provide the best products to our patients.
                </motion.p>
            </div>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                className='relative w-[100%] lg:w-[85%] h-[250px] sm:h-[300px] md:h-[452px] lg:h-[540px] mt-6'>
                <Image src="/images/Group 1000001015.png" alt='playlist' layout='fill' objectFit='cover' className='rounded-lg' />
            </motion.div>
            <motion.button
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                className='mt-4 bg-mid-blue h-11 w-40 text-white p-2 rounded-md'>Watch Playlist</motion.button>
        </section>
    )
}

export default WelcomePlaylist