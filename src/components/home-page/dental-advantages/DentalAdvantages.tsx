'use client';
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const parentDiv = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
            staggerChildren: 0.5
        }
    }
}

const childeDiv = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1, type: 'spring', stiffness: 100
        }
    }
}

const DentalAdvantages = () => {
    return (
        <section className='flex lg:justify-between md:justify-between lg:flex-row bg-slate-100 rounded-lg p-9 gap-5 flex-col items-center'>
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 1.5, type: 'spring', stiffness: 30, damping: 7, mass: 0.5 }}
                className='lg:w-2/4 w-full lg:justify-start justify-center lg:flex flex lg:pl-24 md:hidden'>
                <Image src="/images/Rectangle-631.png" alt='img' width={400} height={300} />
            </motion.div>
            <div className='flex-1 flex flex-col gap-9 lg:items-start items-center lg:pr-9 '>
                <div className='lg:text-left text-center flex flex-col gap-6'>
                    <motion.h2
                        initial={{ x: 50, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 50, damping: 5, mass: 0.5 }}
                        className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-5xl lg:mt-0 mt-4 text-dark-blue lg:max-w-[80%] '>
                        Why choose Smile for all your dental treatments?
                    </motion.h2>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 50, damping: 5, mass: 0.5 }}
                        className='text-muted-foreground text-md lg:max-w-[80%]'>
                        We use only the best quality materials on the market in order to provide the best products to our patients.
                    </motion.p>
                    <motion.div
                        variants={parentDiv}
                        initial='hidden'
                        whileInView='visible'
                        className='flex flex-col gap-3 mt-5'>
                        <motion.div
                            variants={childeDiv}
                            className='flex items-center gap-2'>
                            <Image src="/icons/Shield Done.png" alt='icon' width={21} height={21} />
                            <span>Top quality dental team</span>
                        </motion.div>
                        <motion.div
                            variants={childeDiv}
                            className='flex items-center gap-2'>
                            <Image src="/icons/Shield Done.png" alt='icon' width={21} height={21} />
                            <span>State of the art dental services</span>
                        </motion.div>
                        <motion.div
                            variants={childeDiv}
                            className='flex items-center gap-2'>
                            <Image src="/icons/Shield Done.png" alt='icon' width={21} height={21} />
                            <span>Discount on all dental treatment</span>
                        </motion.div>
                        <motion.div
                            variants={childeDiv}
                            className='flex items-center gap-2'>
                            <Image src="/icons/Shield Done.png" alt='icon' width={21} height={21} />
                            <span>Enrollment is quick and easy</span>
                        </motion.div>
                    </motion.div>
                </div>
                <motion.button
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1, type: 'spring', stiffness: 50, damping: 5, mass: 0.5 }}
                    className='bg-mid-blue h-14 text-white rounded-md p-2'>Book an appointment</motion.button>
            </div>
        </section>
    )
}

export default DentalAdvantages