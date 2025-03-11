'use client';
import { IUser } from '@/types/UserInformation'
import React, { useState } from 'react'
import { FaStar } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { PiCityLight } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiPhone } from "react-icons/ci";
import SwiperAppoinments from './SwiperAppoinments';
import Link from 'next/link';
import DoctorsPagination from './DoctorsPagination';
import { motion } from 'framer-motion';
import { childeDiv, childNav, parentDiv } from '../ParentAndChildAnimation';

interface DoctorInformationProps {
    doctors: IUser[] | null,
    totalPages: number
}

export default function DoctorInformation({ doctors, totalPages }: DoctorInformationProps) {

    return (
        <>
            {/* Information */}
            <motion.div
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className="flex flex-col gap-6 translate-y-[25px]">
                {doctors && doctors.length > 0 ? (
                    doctors.map(doctor => (
                        <motion.div
                            variants={childeDiv}
                            initial='hidden'
                            whileInView='visible'
                            key={doctor.id} className="flex flex-col md:flex-row justify-between items-center lg:items-start bg-[#f6f6f6] rounded-md p-2 cursor-pointer">
                            <Link href={`doctors/${doctor.id}`} className="flex flex-col sm:flex-row flex-1 items-center gap-4 sm:gap-8">

                                <img src={doctor.image_url} alt='Doctor Image' className='object-cover w-[100px] h-[100px] rounded-full' />
                                <div className="text-mid-blue flex flex-col gap-2">
                                    <div>
                                        <span className='text-[13px]'>Doctor </span>
                                        <h1 className='inline font-semibold'>
                                            {doctor.first_name.charAt(0).toUpperCase() + doctor.first_name.slice(1)}
                                            {' '}
                                            {doctor.last_name.charAt(0).toUpperCase() + doctor.first_name.slice(1)}
                                        </h1>
                                    </div>
                                    {doctor?.specialization_name && (
                                        <p className='text-body-text'>{doctor.specialization_name}</p>
                                    )}
                                    <div className="flex gap-2">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <div key={index}>
                                                <FaStar
                                                    className={index < Math.round(doctor.avg_rating ?? 0) ? "text-yellow-300" : "text-[#9e9b9b70]"}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <p className='text-body-text'>
                                        Overall Rating From {doctor.reservation_count} Visitors
                                    </p>
                                    {/* Additional Information */}
                                    <div className="flex flex-col gap-2 mt-[10px]">
                                        <div className="flex justify-between items-center gap-2">
                                            {doctor.address && (
                                                <div className="flex gap-2 items-center">
                                                    <GoHome />
                                                    <span className='text-body-text text-[13px]'>Addres: {doctor.address}</span>
                                                </div>
                                            )}
                                            {doctor.city && (
                                                <div className="flex gap-2 items-center">
                                                    <PiCityLight />
                                                    <span className='text-body-text text-[13px]'>City: {doctor.city}</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex justify-between items-center gap-2">
                                            {doctor.feeses && doctor.feeses.length > 0 && (
                                                doctor.feeses.map(fee => (
                                                    <div key={fee.id} className="flex items-center gap-2">
                                                        <GiTakeMyMoney />
                                                        <span className={`text-body-text text-[13px]`}>{fee.count_review == 'one' ?
                                                            <span>First Price: <span className='text-red-600'>{fee.price}</span> EGP</span> :
                                                            <span>Second Price: <span className='text-green-400'>{fee.price}</span> EGP</span>}
                                                        </span>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                        {doctor.phone && (
                                            <div className="flex gap-2 items-center">
                                                <CiPhone />
                                                <span className='text-body-text text-[13px]'>{doctor.phone}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </Link>
                            {/* Swiper Appoinment */}
                            <SwiperAppoinments doctor={doctor} />
                        </motion.div>
                    ))
                ) : (
                    <div className='text-center w-full text-red-500 bg-[#f6f6f6] p-2 rounded-md'>No Doctors Here</div>
                )}
                <DoctorsPagination doctors={doctors} totalPages={totalPages} />
            </motion.div>
        </>
    )
}
