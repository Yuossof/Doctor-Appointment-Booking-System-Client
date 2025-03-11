'use client';
import { IUser } from '@/types/UserInformation';
import React from 'react'
import { GiTakeMyMoney } from "react-icons/gi";
import { useDoctor } from '../../Context/Doctor';
import { BiClinic } from "react-icons/bi";
import SwiperDoctorAppointements from './SwiperDoctorAppointements';
import { motion } from 'framer-motion';

export default function SidebarDoctor() {
    const { doctor } = useDoctor();
    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
            transition={{ duration: 0.6, type: 'spring', stiffness: 80, mass: 1 }}
            className='sticky right-0 top-0 h-fit bg-[#f9f9f9] shadow-lg rounded-md basis-[30%]'>
            <h4 className='bg-mid-blue text-center text-white p-2 rounded-md'>Booking Information</h4>
            <div className="flex flex-col gap-2 items-center p-2 border-b border-form">
                <span className='text-body-text'>Book</span>
                <span className='text-mid-blue'>Examination</span>
            </div>
            <div className='flex flex-col items-center justify-between border-b border-form p-3 gap-2'>
                {doctor?.feeses && doctor?.feeses?.length > 0 && (

                    doctor.feeses.map(fee => (
                        <div key={fee.id} className="flex items-center gap-2">
                            <GiTakeMyMoney className='text-mid-blue' />
                            <span className={`text-body-text text-[13px]`}>{fee.count_review == 'one' ?
                                <span>First Price: <span className='text-red-600'>{fee.price}</span> EGP</span> :
                                <span>Second Price: <span className='text-green-400'>{fee.price}</span> EGP</span>}
                            </span>
                        </div>
                    ))
                )}
            </div>
            <div className="flex items-center gap-2 justify-center p-3 border-b border-form">
                <BiClinic className='text-mid-blue' />
                <span className='text-body-text'>Clinics Address: <span className='text-mid-blue'>{doctor?.clinic_address}</span></span>
            </div>
            <h2 className="flex items-center justify-center p-3 border-b border-form text-body-text">Choose your appointment</h2>
            <SwiperDoctorAppointements />
        </motion.div>
    )
}
