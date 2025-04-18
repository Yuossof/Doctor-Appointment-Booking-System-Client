"use client"
import React, { useState, useEffect } from 'react'
import './doctor-dash.css'
import { motion } from "framer-motion"
import { getDashboardData } from '@/lib/services/doctor-dashboard/dashboard-data'
import Spinner from '../loading/Spinner'

const Topbar = () => {
    const weaks = [70, 50, 30, 90, 95, 25, 100]
    const [isLoading, setIsLoading] = useState(false)
    const [reviews, setReviews] = useState(0)
    const [weaklyEarnings, setWeaklyEarnings] = useState<number>(0)
    const [weaklyAppointment, setWeaklyAppointment] = useState(0)
    const [totalAppointmets, setTotalAppointments] = useState(0)
    const [todayUsers, setTodayUsers] = useState(0)
    const [firstReservations, setFirstReservations] = useState(0)
    const [todayReservations, setTodayReservations] = useState([])


    useEffect(() => {
        const getRv = async () => {
            setIsLoading(true)
            const res = await getDashboardData()
            setReviews(res.total_review)
            setWeaklyAppointment(res.weakly_appointments.length)
            setTotalAppointments(res.total_weakly_appointments)
            setFirstReservations(res.total_users_first_reservation)
            setTodayReservations(res.today_reservations)
            setTodayUsers(res.total_users_today)
            const sum = Object.values(res.weekly_earnings).reduce(
                (acc, day) => acc as number + (day as { total_price: number }).total_price || 0, 0)
            setWeaklyEarnings(sum as number)

            setIsLoading(false)
        }
        getRv()
    }, [])

    return (
        <div style={{ opacity: isLoading ? "0.4" : "1" }} className='grid lg:grid-cols-2 xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-4 w-full relative'>
            {isLoading && (
                <div className='absolute top-0 left-0 bottom-0 w-full flex justify-center items-center'>
                    <Spinner />
                </div>
            )}
            <div className='bg-slate-800 p-3 rounded-md flex flex-col 
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <div className='flex items-center justify-between'>
                    <h2 className='text-sm text-slate-400 mb-2'>Weakly Appointments</h2>
                    <span className='bg-orange-600 bg-opacity-25  px-2 py-1 rounded-sm text-sm text-slate-200'>
                        total: {totalAppointmets}
                    </span>
                </div>
                <div className='justify-between flex'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-4xl text-slate-300'>{weaklyAppointment}</span>
                        <span className='px-3 py-1 bg-sky-700 bg-opacity-40 rounded-md text-sm text-gray-200'>+11</span>
                    </div>
                    <div className=' flex items-end 2xl:gap-2 xl:gap-1 lg:gap-1 md:gap-1 gap-2'>
                        {weaks.map((weak, i) => (
                            <div
                                // onMouseOver={() => setAppointmentData(weak)}
                                // onMouseLeave={() => setAppointmentData(46)}
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
                 border-transparent transition-all  '
            >
                <h2 className='text-sm text-slate-400'>Total Reviews</h2>
                <span className='text-4xl text-slate-300'>{reviews}</span>
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
                        <span className='text-4xl text-slate-300'>{weaklyEarnings}</span>
                        <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span>
                    </div>
                    <div className='flex items-end 2xl:gap-2 xl:gap-1 lg:gap-1 md:gap-1 gap-2'>
                        {weaks.map((weak, i) => (
                            <div
                                // onMouseOver={() => setAppointmentData(weak)}
                                // onMouseLeave={() => setAppointmentData(46)}
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
            <div className='bg-slate-800 p-3 rounded-md flex flex-col items-start
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <h2 className='text-sm text-slate-400'>Today Users</h2>
                <span className='text-4xl text-slate-300'>{todayUsers}</span>
                {/* <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span> */}
            </div>
            <div className='bg-slate-800 p-3 rounded-md flex flex-col items-start
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <h2 className='text-sm text-slate-400'>First Users Reservations</h2>
                <span className='text-4xl text-slate-300'>{firstReservations}</span>
                {/* <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span> */}
            </div>
            <div className='bg-slate-800 p-3 rounded-md flex flex-col items-start
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <h2 className='text-sm text-slate-400'>Today Reservations</h2>
                <span className='text-4xl text-slate-300'>{todayReservations.length}</span>
                {/* <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span> */}
            </div>
        </div>
    )
}

export default Topbar



// Unhandled Runtime Error

// TypeError: WE.map is not a function

// Source
// src/components/doctor-dashboard/Topbar.tsx (19:16) @ map

//   17 |             setReviews(res.total_review)
//   18 |             const WE = res.weekly_earnings as WeaklyEarning[]
// > 19 |             WE.map((e) => setWeaklyEarnings(prev => prev + e.total_price))
//      |                ^
//   20 |
//   21 |         }
//   22 |         getRv()