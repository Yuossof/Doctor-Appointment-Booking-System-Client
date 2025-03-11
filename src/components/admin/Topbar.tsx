"use client"
import React, { useState } from 'react'
import { motion } from "framer-motion"

const Topbar = () => {
    const [AppointmentData, setAppointmentData] = useState(46)
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
                        <span className='text-4xl text-slate-300'>{AppointmentData}</span>
                        <span className='px-3 py-1 bg-sky-700 bg-opacity-40 rounded-md text-sm text-gray-200'>+11</span>
                    </div>
                    <div className=' flex items-end 2xl:gap-2 xl:gap-1 lg:gap-1 md:gap-1 gap-2'>
                        {weaks.map((weak, i) => (
                            <div
                                onMouseOver={() => setAppointmentData(weak)}
                                onMouseLeave={() => setAppointmentData(46)}
                                className='px-[3px] hover:scale-105 transition-all'
                                key={i}>
                                <div
                                    className='h-16 rounded-lg w-[6px] lg:w-[8px] bg-gray-700 flex items-end overflow-hidden '>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${weak}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-blue-600 w-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='bg-slate-800 p-3 rounded-md flex flex-col items-start
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all relative'
            >
                <span className='bg-orange-600 bg-opacity-25  px-2 py-1 rounded-sm text-sm text-slate-200 absolute top-3 right-3'>
                    doctors: 15
                </span>
                <div className='flex flex-col gap-3'>
                    <h2 className='text-sm text-slate-400'>Total Users</h2>
                    <span className='text-4xl text-slate-300 '>126</span>
                </div>
                <span className='bg-sky-700 bg-opacity-40  px-2 py-1 rounded-sm text-sm text-slate-200 mt-2'>
                    +120
                </span>
                {/* <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span> */}
            </div>

            <div className='bg-slate-800 p-3 rounded-md flex flex-col 
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <div className='flex items-center justify-between'>
                    <h2 className='text-sm text-slate-400 mb-2'>Weakly Eearnings</h2>
                    <span className='bg-orange-600 bg-opacity-25  px-2 py-1 rounded-sm text-sm text-slate-200'>
                        total: 230
                    </span>
                </div>
                <div className='justify-between flex'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-4xl text-slate-300'>46</span>
                        <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span>
                    </div>
                    <div className='flex items-end 2xl:gap-2 xl:gap-1 lg:gap-1 md:gap-1 gap-2'>
                        {weaks.map((weak, i) => (
                            <div
                                onMouseOver={() => setAppointmentData(weak)}
                                onMouseLeave={() => setAppointmentData(46)}
                                className='px-[3px] hover:scale-105 transition-all'
                                key={i}>
                                <div
                                    className='h-16 rounded-lg w-[6px] lg:w-[8px] bg-gray-700 flex items-end overflow-hidden '>
                                    <motion.div
                                        initial={{ height: 0 }}
                                        animate={{ height: `${weak}%` }}
                                        transition={{ duration: 1, ease: "easeOut" }}
                                        className="bg-orange-600 w-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Topbar