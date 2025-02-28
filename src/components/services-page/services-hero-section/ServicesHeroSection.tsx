'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { childeDiv, parentDiv } from '@/components/ParentAndChildAnimation';

const ServicesHeroSection = () => {
    return (
        <section>
            <div className='flex flex-col gap-3 items-center md:px-0 px-6'>
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
                    className='font-semibold text-3xl sm:text-3xl md:text-4xl text-center lg:text-5xl lg:mt-0 mt-4 text-dark-blue lg:max-w-[80%]'>Services</motion.h1>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                    className='text-muted-foreground lg:max-w-[80%] text-center'>
                    We use only the best quality materials on the market in order to provide the best <br />
                    products to our patients
                    So don’t worry about anything and book yourself.
                </motion.p>
            </div>
            <motion.div 
            variants={parentDiv}
            initial='hidden'
            whileInView='visible'
            className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-16 md:px-0 px-4'>
                {[1, 2, 3, 4, 5, 6].map((_itm, i) => (
                    <motion.div key={i} variants={childeDiv}
                        className='bg-slate-50 rounded-lg flex flex-col  items-center
                         p-4 border-slate-200 border-[1px] shadow-md hover:scale-105 transition'
                    >
                        <div className='bg-mid-blue rounded-full h-[70px] w-[70px] flex justify-center items-center '>
                            <Image src="/icons/implant-1.png" alt='teeth' width={48} height={48} />
                        </div>
                        <div className='flex flex-col gap-3 items-center text-center mt-3'>
                            <h2 className='text-dark-blue font-semibold text-2xl'>Dental Implants</h2>
                            <p className='text-muted-foreground max-w-[80%]'>
                                Root canal treatment (endodontics) is a dental procedure used to treat infection at the center of a tooth
                            </p>
                            <Link href={"/"} className='flex items-center mt-3 underline text-dark-blue gap-2 transition-all hover:gap-4'>
                                <span>Learn More</span>
                                <ArrowRightCircle size={20} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default ServicesHeroSection