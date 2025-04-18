"use client"
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion"
import { weakly_appointments } from '@/types/Admin/Dashboard'
import useDashboardData from '@/lib/services/Admin/DashboardData'

const Topbar = () => {
    const data = useDashboardData();
    const [AppointmentData, setAppointmentData] = useState<number | null>(null);
    const [appointmnetDay, setAppointmentDay] = useState<string | null>(null);
    const [earningsDay, setEarningsDay] = useState<{ day: string; total_price: number } | null>(null);


    const checkOnFirstWeakly = () => {
        if (data?.weakly_appointments && data.weakly_appointments.length > 0) {
            setAppointmentData(data.weakly_appointments[0].appointments_count);
            setAppointmentDay(data.weakly_appointments[0].day);
        }
        if (data?.weekly_earnings) {
            const firstEntry = Object.entries(data.weekly_earnings)[0]; 
            if (firstEntry) {
                const [firstDay, firstValue] = firstEntry; 
                setEarningsDay({ day: firstDay, total_price: firstValue.total_price });
            }
        }
    }

    const handleLeave = () => checkOnFirstWeakly();

    useEffect(() => {
        checkOnFirstWeakly();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data?.weakly_appointments, data?.weekly_earnings]);

    return (
        <div className='grid lg:grid-cols-2 xl:grid-cols-3  md:grid-cols-2 grid-cols-1 gap-4 w-full'>
            <div className='bg-slate-800 p-3 rounded-md flex flex-col 
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <div className='flex items-center justify-between'>
                    <h2 className='text-sm text-slate-400 mb-2'>Weakly Appointments</h2>
                    {/* <span className='bg-orange-600 bg-opacity-25  px-2 py-1 rounded-sm text-sm text-slate-200'>
                        total: {data?.users_count_of_reservations}
                    </span> */}
                </div>
                <div className='justify-between flex'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-4xl text-slate-300'>{AppointmentData}</span>
                        <span className='px-3 py-1 bg-sky-700 bg-opacity-40 rounded-md text-sm text-gray-200'>{appointmnetDay}</span>
                    </div>
                    <div className=' flex items-end 2xl:gap-2 xl:gap-1 lg:gap-1 md:gap-1 gap-2'>
                        {data && data.weakly_appointments.length > 0 &&
                            data.weakly_appointments.map((weak: weakly_appointments, i) => (
                                <div
                                    onMouseOver={() => {
                                        setAppointmentData(weak.appointments_count);
                                        setAppointmentDay(weak.day)
                                    }}
                                    onMouseLeave={handleLeave}
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


            <div className='bg-slate-800 p-3 rounded-md flex flex-col 
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  '
            >
                <div className='flex items-center justify-between'>
                    <h2 className='text-sm text-slate-400 mb-2'>Weakly Eearnings</h2>
                </div>
                <div className='justify-between flex'>
                    <div className='flex flex-col gap-2'>
                        <span className='text-4xl text-slate-300'>{earningsDay?.total_price}</span>
                        <span className='px-3 py-1 bg-sky-700 bg-opacity-40 rounded-md text-sm text-gray-200 flex max-w-fit'>{earningsDay?.day}</span>
                    </div>
                    <div className='flex items-end 2xl:gap-2 xl:gap-1 lg:gap-1 md:gap-1 gap-2'>
                        {data && data.weekly_earnings &&
                             
                            Object.entries(data.weekly_earnings).map(([day, value], i) => (
                                <div
                                    onMouseOver={() => setEarningsDay({ day, total_price: value.total_price })}
                                    onMouseLeave={handleLeave}
                                    className='px-[3px] hover:scale-105 transition-all'
                                    key={i}>

                                    <div className='h-16 rounded-lg w-[6px] lg:w-[8px] bg-gray-700 flex items-end overflow-hidden'>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${value.total_price / 1000}%` }}
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
                 border-transparent transition-all relative'
            >
                <span className='bg-orange-600 bg-opacity-25  px-2 py-1 rounded-sm text-sm text-slate-200 absolute top-3 right-3'>
                    doctors: {data?.doctors_count}
                </span>
                <div className='flex flex-col gap-3'>
                    <h2 className='text-sm text-slate-400'>Total Users</h2>
                    <span className='text-4xl text-slate-300 '>{data?.users_count}</span>
                </div>
                <span className='bg-sky-700 bg-opacity-40  px-2 py-1 rounded-sm text-sm text-slate-200 mt-2'>
                    Users Count Of Reservations: {data?.users_count_of_reservations}
                </span>
            </div>
            
        </div>
    )
}

export default Topbar