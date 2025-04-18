'use client';
import React from 'react'
import { AvatarCmp } from '../Avatar'
import { ArrowRight, Clock } from 'lucide-react'
import { CiMenuKebab } from 'react-icons/ci'
import useDashboardData from '@/lib/services/Admin/DashboardData';

const TodayAppointments = () => {
    const data = useDashboardData();

    return (
        <div className='w-full mt-6'>
            <div className='w-full bg-slate-800 rounded-md shadow-lg overflow-hidden'>
                <div className='bg-gray-700 w-full py-3 px-3'>
                    <h2 className='text-xl text-slate-400'>
                        Today Appointments 
                        <span className='text-gray-400'> {data?.today_reservations?.length || 0}</span>
                    </h2>
                </div>
                <div className='w-full p-3 flex flex-col gap-6 pt-6 overflow-x-auto px-2'>
                    {data && data?.today_reservations?.length > 0 ? (
                        data.today_reservations.map((today, i) => (
                            <div key={i} className='w-full flex flex-col gap-4'>
                                {today?.reservations?.map((reserve, j) => (
                                    <div key={j} className='w-full flex justify-between items-center'>
                                        {/* Left Side: User Info */}
                                        <div className='flex gap-3 items-center'>
                                            <AvatarCmp imgSrc={reserve?.user?.image_url} w={8} h={8} />
                                            <div className='flex items-center gap-3'>
                                                <h2 className='text-sm text-gray-300'>{reserve?.user?.first_name + ' ' + reserve?.user?.last_name}</h2>
                                                <ArrowRight className='text-orange-200' />
                                                <h2 className='text-sm text-gray-400'>{reserve?.doctor?.first_name + ' ' + reserve?.doctor?.last_name}</h2>
                                            </div>
                                        </div>

                                        {/* Right Side: Appointment Details */}
                                        <div className='flex items-center gap-4 pr-2'>
                                            <span className='text-muted-foreground'>{reserve?.status}</span>
                                            <div className='flex items-center bg-opacity-35 overflow-hidden rounded-md border-[1px] border-slate-700 pl-[2px]'>
                                                <span className='text-orange-300 bg-slate-900 p-1 rounded-md'>
                                                    <Clock />
                                                </span>
                                                <span className='text-lg text-orange-200 p-1 bg-slate-800 px-2'>
                                                    {reserve?.appointment?.start_time}
                                                </span>
                                                <span className='font-bold text-gray-400'>to</span>
                                                <span className='text-lg text-orange-200 p-1 bg-slate-800 px-2'>
                                                    {reserve?.appointment?.end_time}
                                                </span>
                                            </div>                                            
                                            <button className='lg:hidden block'>
                                                <CiMenuKebab className='text-white' size={25} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-400 text-center">No appointments today.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodayAppointments