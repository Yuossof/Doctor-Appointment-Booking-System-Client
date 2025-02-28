'use client';
import Link from 'next/link'
import React from 'react'
import { motion } from 'framer-motion';

export default function BreadCamp() {
    return (
        <motion.div 
        initial={{ x: -50, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 50, damping: 5 }}
        className='flex gap-1 text-[12px] text-body-text'>
            <Link href={'/'} className='hover:text-mid-blue transition-all duration-300 hover:underline cursor-pointer'>Logo</Link>
            <span>/</span>
            <span className='hover:text-mid-blue transition-all duration-300 hover:underline '>All Docotrs In Egypt</span>
        </motion.div>
    )
}
