'use client';

// Import Swiper styles
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cube';
import 'swiper/css/pagination';
import './styles.css';

import { EffectCube, Pagination } from 'swiper/modules';
import { IUser } from '@/types/UserInformation';
import { GiDivert } from 'react-icons/gi';

export default function SwiperAppoinments({ doctor }: { doctor: IUser }) {
    return (
        <div className="parent">
            {doctor.days && doctor.days?.length > 0 && (
                <Swiper
                    effect={'cube'}
                    grabCursor={true}
                    // loop={true}
                    cubeEffect={{
                        shadow: true,
                        slideShadows: true,
                        shadowOffset: 20,
                        shadowScale: 0.94,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    speed={100}
                    modules={[EffectCube, Pagination]}
                    className="mySwiper w-[150px] max-w-[150px]"
                >
                    {doctor?.days.map((day) => (
                        <SwiperSlide
                            key={day.id}
                            className="w-[150px] max-w-[150px] bg-white rounded-md shadow-sm text-center"
                        >
                            <h1 className='bg-mid-blue text-white p-[2px] text-[13px]'>{day.day}</h1>
                            <ul className='text-[13px] p-2 flex flex-col gap-2'>
                                {day.appointments && day.appointments.length > 0 ? (
                                    day.appointments.map(appointment => (
                                        <li key={appointment.id} className='text-mid-blue hover:bg-mid-blue rounded-md hover:text-white transition-all duration-300 ease'>{appointment.date}</li>
                                    ))
                                ) : (
                                    <li className='text-red-500'>No Dates Here</li>
                                )}
                            </ul>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
}
