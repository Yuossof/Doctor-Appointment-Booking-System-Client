'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './styles.css';

import { Navigation } from 'swiper/modules';;
import { IUser } from '@/types/UserInformation';
import { useState } from 'react';
import AlertShowDialog from './AlertShowDialog';


export default function SwiperAppoinments({ doctor }: { doctor: IUser }) {

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [appointemetId, setAppointmentID] = useState<number>(0);
    const [dayId, setDayId] = useState<number>(0);

    const handleShowDialog = (appointemet_id: number, day_id: number) => {
        setAppointmentID(appointemet_id);
        setDayId(day_id);
        setShowDialog(prev => !prev);
    };

    return (
        <>
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: 'spring', stiffness: 80, damping: 6 }}
                className='relative py-4 md:py-0'>
                {showDialog && <AlertShowDialog doctorId={doctor.id} dayID={dayId} appointementId={appointemetId} setShowDialog={setShowDialog} />}
                {doctor.days && doctor.days?.length > 0 && (
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={30}
                        loop={true}
                        navigation={true}
                        modules={[Navigation]}
                        className="mySwiper w-[250px] max-w[250px] md:h-[200px] max-h-[450px] cursor-pointer"
                    >
                        {!showDialog && (doctor?.days ?? []).map((day) => (
                            <SwiperSlide
                                key={day.id}
                                className="w-[250px] max-w-[250px]"
                            >
                                <h1 className='bg-mid-blue text-white text-[13px] p-[5px] shadow-sm w-[150px]'>{day.day}</h1>
                                <ul className='text-[13px] p-2 flex flex-col gap-2 shadow-sm w-[150px]'>
                                    {day.appointments && day.appointments.length > 0 ? (
                                        day.appointments.map(appointment => (
                                            <li onClick={() => handleShowDialog(appointment.id, day.id)} key={appointment.id} className='text-mid-blue hover:bg-mid-blue rounded-md hover:text-white transition-all duration-300 ease'>{appointment.start_time}</li>
                                        ))
                                    ) : (
                                        <li className='text-red-500'>No Dates Here</li>
                                    )}
                                </ul>
                                <h1 className='bg-red-600 text-[13px] text-white text-center w-[150px]'>Book</h1>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </motion.div>
        </>
    );
}
