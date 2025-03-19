
'use client'
import React from 'react'
import { buttonVariants } from '../../ui/button'
import Image from 'next/image'
import { Phone, Linkedin, ArrowRightCircle } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar'
import Link from 'next/link'
import { motion } from 'framer-motion'

const parentDiv = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.1,
            staggerChildren: 0.5
        }
    }
}

const childeDiv = {
    hidden: {
        opacity: 0,
        y: 100
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1, type: 'spring', stiffness: 50, damping: 6
        }
    }
}



const Hero = () => {
    return (
        <>
            <section className='w-full mt-[90px]  flex items-center flex-col px-4 lg:ml-0 overflow-hidden'>
                <div className='flex lg:flex-row items-center lg:gap-5 gap-0 w-full flex-col'>
                    <div className='lg:w-[60%] w-full text-center lg:text-left flex flex-col items-center  md:items-center lg:items-start '>
                        <motion.h1
                            initial={{ x: -50, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2, type: 'spring', stiffness: 50, damping: 5 }}
                            className='text-3xl md:text-4xl lg:text-5xl text-dark-blue font-semibold leading-relaxed mb-6'>
                            Get Ready For Your Best Ever
                            Dental Experience!
                        </motion.h1>
                        <motion.p
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3, type: 'spring', stiffness: 50, damping: 5 }}
                            className='mb-8 text-muted-foreground w-full max-w-[90%] text-sm md:text-base lg:text-lg leading-relaxed md:max-w-[70%] lg:max-w-[85%]'>
                            We use only the best quality materials on the market in order to provide the best products to our patients. So don’t worry about anything and book yourself.
                        </motion.p>
                        <div className="flex justify-center lg:justify-start items-center gap-6">
                            <motion.button
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.4, type: 'spring', stiffness: 50 }}
                                className='bg-mid-blue text-white h-11 lg:block hidden lg:h-16 px-5 text-sm md:text-base lg:text-lg rounded-lg'>
                                Book an appointment
                            </motion.button>
                            <motion.button
                                initial={{ x: -50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 50 }}
                                className='bg-mid-blue text-white lg:hidden block h-11 lg:h-16 px-5 text-sm md:text-base lg:text-lg rounded-lg'>
                                Get Started
                            </motion.button>
                            <motion.div
                                initial={{ x: 50, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 50, damping: 5 }}
                                className='flex h-11 lg:h-16 gap-1 mr-3 lg:mr-0'>
                                <div className={buttonVariants({
                                    variant: "outline",
                                    className: "lg:h-16 lg:w-16 h-11 w-11 border-2"
                                })}>
                                    <Phone />
                                </div>
                                <div className='flex flex-col gap-1 lg:ml-2 justify-start text-left'>
                                    <span className='text-mid-blue lg:text-lg text-xs'>Dental H24 emergancy</span>
                                    <span className='text-xs lg:text-lg'>01023968776</span>
                                </div>
                            </motion.div>
                        </div>
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 50, damping: 5 }}
                            className='flex mb-7 !text-left lg:mb-6 mt-9 relative flex-col justify-start gap-2 shadow-lg lg:mt-11 p-3 lg:w-[40%] w-full md:w-[60%] rounded-lg border-[1px] border-gray-100'>
                            <div className='absolute top-3 right-3 text-white bg-mid-blue rounded-md p-1'>
                                <Linkedin size={20} />
                            </div>
                            <div className='flex items-center gap-2'>
                                <Avatar className='w-11 h-11'>
                                    <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className='text-dark-blue text-md'>Dr.name</h2>
                                    <p className='text-muted-foreground text-sm'>hello i&apos;m dr.name</p>
                                </div>
                            </div>
                            <div>
                                <p className='text-muted-foreground'>Hey there my name is</p>
                            </div>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                        transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                        className='hidden lg:w-[40%] w-[60%] lg:mr-0 mt-10 lg:mt-0 mr-24 lg:flex justify-center relative -z-[100]'>
                        <Image
                            src="/images/Mask-group.png"
                            // layout="responsive"
                            width={700}
                            height={500}
                            priority
                            alt="Dental experience"
                            className=''
                            loading='eager'
                        />
                    </motion.div>
                </div>
                <motion.div
                    variants={parentDiv}
                    initial='hidden'
                    whileInView='visible'
                    className='w-full bg-slate-100 z-20 rounded-lg grid md:grid-cols-2 mt-6 lg:mt-0 grid-cols-1 lg:grid-cols-3 gap-6 p-6'>
                    <motion.div
                        variants={childeDiv}

                        className='bg-white rounded-lg flex flex-col gap-2 items-center p-4'>
                        <div className='bg-mid-blue rounded-full h-[70px] w-[70px] flex justify-center items-center mt-3'>
                            <Image src="/icons/teeth-1.png" alt='teeth' width={48} height={48} />
                        </div>
                        <div className='flex flex-col gap-3 items-center text-center'>
                            <h2 className='text-dark-blue font-semibold text-2xl'>Root Canal Treatment</h2>
                            <p className='text-muted-foreground max-w-[80%]'>
                                Root canal treatment (endodontics) is a dental procedure used to treat infection at the center of a tooth
                            </p>
                            <Link href={"/"} className='flex items-center mt-3  underline text-dark-blue gap-2 transition-all hover:gap-4'>
                                <span>Learn More</span>
                                <ArrowRightCircle size={20} />
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={childeDiv}

                        className='bg-white rounded-lg flex flex-col gap-2 items-center p-4'>
                        <div className='bg-mid-blue rounded-full h-[70px] w-[70px] flex justify-center items-center'>
                            <Image src="/icons/smile-1.png" alt='teeth' width={48} height={48} />
                        </div>
                        <div className='flex flex-col gap-3 items-center text-center mt-3'>
                            <h2 className='text-dark-blue font-semibold text-2xl'>Cosmetic Dentist</h2>
                            <p className='text-muted-foreground max-w-[80%]'>
                                Root canal treatment (endodontics) is a dental procedure used to treat infection at the center of a tooth
                            </p>
                            <Link href={"/"} className='flex items-center mt-3 underline text-dark-blue gap-2 transition-all hover:gap-4'>
                                <span>Learn More</span>
                                <ArrowRightCircle size={20} />
                            </Link>
                        </div>
                    </motion.div>
                    <motion.div
                        variants={childeDiv}

                        className='bg-white rounded-lg flex flex-col gap-2 items-center p-4'>
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
                </motion.div>
            </section>
        </>
    )
}

export default Hero
