"use client"
import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react'
import AskQuestion from '../home-page/ask-question/AskQuestion'
import { motion } from 'framer-motion'
import { childeDiv, childNav, parentDiv } from '../ParentAndChildAnimation'

const Footer = () => {

    return (
        <div className="translate-y-[35px] container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px] overflow-hidden">
            <div className="my-32 w-full"></div>
            <AskQuestion />
            <div className="my-36 w-full"></div>

            <div className='w-full flex flex-col gap-4 pb-6 lg:px-0 px-3'>
                <div className='flex items-center md:justify-between md:flex-row flex-col md:gap-0 gap-4'>
                    <motion.h2
                        initial={{ x: -50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 1, type: 'spring', stiffness: 100, damping: 4, mass: 0.5 }}
                        className='font-semibold text-dark-blue text-xl'>LOGO</motion.h2>
                    <motion.div
                        variants={parentDiv}
                        initial='hidden'
                        whileInView='visible'
                        className='flex items-center gap-4'>
                        <motion.div variants={childNav}>
                            <Link className='text-gray-800 text-sm hover:underline' href="/">Home</Link>
                        </motion.div>
                        <motion.div variants={childNav}>
                            <Link className='text-gray-800 text-sm hover:underline' href="/">Services</Link>
                        </motion.div>
                        <motion.div variants={childNav}>
                            <Link className='text-gray-800 text-sm hover:underline' href="/">Blog</Link>
                        </motion.div>
                        <motion.div variants={childNav}>
                            <Link className='text-gray-800 text-sm hover:underline' href="/">About</Link>
                        </motion.div>
                        <motion.div variants={childNav}>
                            <Link className='text-gray-800 text-sm hover:underline' href="/">Contact</Link>
                        </motion.div>
                    </motion.div>
                </div>

                {/* line start*/}
                <div className='h-[2px] w-full bg-slate-300'></div>
                {/* line  end*/}

                <div className='flex items-center md:justify-between md:flex-row flex-col md:gap-0 gap-5'>
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5, type: 'spring', stiffness: 100, damping: 4, mass: 0.5 }}
                        className='text-sm text-gray-600'>All rights reserved @domain.com</motion.p>
                    <motion.div
                        variants={parentDiv}
                        initial='hidden'
                        whileInView='visible'
                        className='flex items-center gap-4'>
                        <motion.a variants={childeDiv} href="" className=''>
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center '>
                                <Facebook className='text-white' size={18} />
                            </span>
                        </motion.a>
                        <motion.a variants={childeDiv} href="">
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center'>
                                <Instagram className='text-white' size={18} />
                            </span>
                        </motion.a>
                        <motion.a variants={childeDiv} href="">
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center'>
                                <Youtube className='text-white' size={18} />
                            </span>
                        </motion.a>
                        <motion.a variants={childeDiv} href="">
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center'>
                                <Linkedin className='text-white' size={18} />
                            </span>
                        </motion.a>
                        <motion.a variants={childeDiv} href="">
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center'>
                                <Twitter className='text-white' size={18} />
                            </span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </div>

    )
}

export default Footer