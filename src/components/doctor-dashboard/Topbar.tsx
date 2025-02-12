"use client"
import React from 'react'
import './doctor-dash.css'
import { motion } from "framer-motion"
const Topbar = () => {
    const weaks = [70, 50, 30, 90, 95, 25, 100]

    return (
        <div className='grid lg:grid-cols-2 xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-4 w-full'>
            <div className='bg-slate-800 p-3 rounded-md flex flex-col 
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <div className='flex items-center justify-between'>
                    <h2 className='text-sm text-slate-400 mb-2'>Weakly Appointments</h2>
                    <span className='bg-orange-600 bg-opacity-25  px-2 py-1 rounded-sm text-sm text-slate-200'>
                        total: 230
                    </span>
                </div>
                <div className='justify-between flex'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-4xl text-slate-300'>46</span>
                        <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span>
                    </div>
                    <div className=' flex items-end 2xl:gap-4 xl:gap-3 lg:gap-3 md:gap-3 gap-4'>
                        {weaks.map((weak, i) => (
                            <div key={i} className='h-16 rounded-lg w-[6px] bg-gray-700 flex items-end overflow-hidden'>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${weak}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-blue-600 w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className='bg-slate-800 p-3 rounded-md flex flex-col items-start
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <h2 className='text-sm text-slate-400'>Total Reviews</h2>
                <span className='text-4xl text-slate-300'>126</span>
                {/* <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span> */}
            </div>

            <div className='bg-slate-800 p-3 rounded-md flex flex-col 
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <div className='flex items-center justify-between'>
                    <h2 className='text-sm text-slate-400 mb-2'>Weakly Appointments</h2>
                    <span className='bg-orange-600 bg-opacity-25  px-2 py-1 rounded-sm text-sm text-slate-200'>
                        total: 230
                    </span>
                </div>
                <div className='justify-between flex'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-4xl text-slate-300'>46</span>
                        <span className='px-3 py-1 bg-sky-700 bg-opacity-40 rounded-md text-sm text-gray-200'>+11</span>
                    </div>
                    <div className=' flex items-end 2xl:gap-4 xl:gap-3 lg:gap-3 md:gap-3 gap-4'>
                        {weaks.map((weak, i) => (
                            <div key={i} className='h-16 rounded-lg w-[6px] bg-gray-700 flex items-end overflow-hidden'>
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${weak}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                    className="bg-orange-400 w-full"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar