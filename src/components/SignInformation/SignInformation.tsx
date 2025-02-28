'use client';
import React from 'react'
import GoogleLogo from '../../../public/images/Google (1).png';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

type InformationData = {
    title: string,
    desc: string,
    method: string
}

export default function SignInformation(props: InformationData) {
    return (
        <div className='text-center w-full sm:w-[550px] md:w-[700px] lg:w-[800px] px-2 sm:px-0'>
            <motion.h1
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className='text-dark-blue text-[35px] sm:text-[50px] font-semibold'>{props.title}</motion.h1>
            <motion.p
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className='text-body-text text-[13px]'>{props.desc}</motion.p>
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80, mass: 1 }}
                className="sm:flex sm:items-center sm:justify-center w-full">
                <Link
                    href=''
                    className='flex items-center justify-center gap-1 w-full  p-2 mt-6 border border-dark-blue rounded-lg'>
                    <Image src={GoogleLogo} alt='GoogleLogo' width={20} height={20} />
                    <span className='text-[13px] text-dark-blue'>{props.method} with Google</span>
                </Link>

            </motion.div>
            <div className="relative flex items-center justify-center mt-6 w-full ">
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="before:content-[''] before:hidden sm:before:block sm:before:w-[240px] md:before:w-[330px] lg:before:w-[380px] before:h-[1px] before:bg-dark-blue before:absolute before:left-0 before:top-1/2"></motion.div>
                <motion.span
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                    className="px-4 text-dark-blue hidden sm:inline-block">Or</motion.span>
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="after:content-['']  after:hidden sm:after:block sm:after:w-[240px] md:after:w-[330px] lg:after:w-[380px] after:h-[1px] after:bg-dark-blue after:absolute after:right-0 after:top-1/2"></motion.div>
            </div>
        </div>
    )
}
