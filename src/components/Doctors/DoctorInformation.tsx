import { IUser } from '@/types/UserInformation'
import React from 'react'
import { FaStar } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { PiCityLight } from "react-icons/pi";
import { GiTakeMyMoney } from "react-icons/gi";
import { CiPhone } from "react-icons/ci";
import { IoAnalyticsSharp } from "react-icons/io5";
import SwiperAppoinments from './SwiperAppoinments';
import Link from 'next/link';


interface DoctorInformationProps {
    doctors: IUser[]
}

export default function DoctorInformation({ doctors }: DoctorInformationProps) {

    return (
        <>

            {/* Information */}
            <div className="flex flex-col gap-8 translate-y-[25px]">
                {doctors && doctors.length > 0 && (
                    doctors.map(doctor => (
                        <div key={doctor.id} className="flex justify-between bg-[#f6f6f6] rounded-md p-2 cursor-pointer">

                            <Link href={`doctors/${doctor.id}`} className="flex flex-1 items-center gap-8">

                                <img alt='Doctor Image' src={doctor.image_url}
                                    className='object-cover w-[100px] h-[100px] rounded-full' />
                                <div className="text-mid-blue flex flex-col gap-2">
                                    <div>
                                        <span className='text-[13px]'>Doctor </span>
                                        <h1 className='inline font-semibold'>
                                            {doctor.first_name.charAt(0).toUpperCase() + doctor.first_name.slice(1)}
                                            {' '}
                                            {doctor.last_name.charAt(0).toUpperCase() + doctor.first_name.slice(1)}
                                        </h1>
                                    </div>
                                    {doctor.specialization_name && (
                                        <p className='text-body-text'>{doctor.specialization_name}</p>
                                    )}
                                    <div className="flex gap-2">
                                        {Array.from({ length: 5 }, (_, index) => (
                                            <FaStar
                                                key={index}
                                                className={index < Math.floor(doctor.avg_rating ?? 0) ? "text-yellow-300" : "text-[#9e9b9b70]"}
                                            />
                                        ))}
                                    </div>
                                    <p className='text-body-text'>Overall Rating From {doctor.reservation_count} Visitors</p>

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
                            <SwiperAppoinments doctor={doctor}/>
                        </div>
                    ))
                )}
            </div>
        </>
    )
}
