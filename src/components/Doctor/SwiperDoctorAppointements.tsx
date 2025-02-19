'use client';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import './style.css';

import { Navigation } from 'swiper/modules';
import { useDoctor } from '../Context/Doctor';
import { useState } from 'react';
import AlertShowDialog from '../Doctors/AlertShowDialog';

export default function SwiperDoctorAppointments() {
    const { doctor } = useDoctor();
    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [appointemetId, setAppointmentID] = useState<number>(0);
    const [dayId, setDayId] = useState<number>(0);

    const handleShowDialog = (appointemet_id: number, day_id: number) => {
        setAppointmentID(appointemet_id);
        setDayId(day_id);
        setShowDialog(prev => !prev);
    };

    return (
        <div className='relative'>
            {showDialog && <AlertShowDialog doctorId={doctor.id} dayID={dayId} appointementId={appointemetId} setShowDialog={setShowDialog} />}
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                loop={true}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper w-[250px] max-w[250px] h-[200px] max-h-[450px] cursor-pointer"
            >
                {!showDialog && (doctor?.days ?? []).map((day) => (
                    <SwiperSlide
                        key={day.id}
                        className="w-[250px] max-w-[250px] "
                    >
                        <h1 className='bg-mid-blue text-white text-[13px] p-[5px] shadow-sm w-[150px]'>{day.day}</h1>
                        <ul className='text-[13px] p-2 flex flex-col gap-2 shadow-sm w-[150px]'>
                            {(day.appointments ?? []).length > 0 ? (
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
        </div>
    )
}
