'use client';

import { useDoctor } from "../../Context/Doctor";
import PaginationDoctorReview from "./PaginationDoctorReview";
import SidebarDoctor from "./SidebarDoctor";
import { FcAbout } from "react-icons/fc";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaRegComment } from "react-icons/fa";
import { motion } from "framer-motion";
import { childeDiv, childNav, parentDiv } from "../ParentAndChildAnimation";
import { IUser } from "@/types/UserInformation";

export default function MainContent({ user }: { user: IUser }) {
    const { doctor } = useDoctor();
    return (
        <>
            <div className="relative flex flex-col md:flex-row justify-between gap-8 md:gap-4">

                <motion.div
                    variants={parentDiv}
                    initial='hidden'
                    whileInView='visible'
                    className="flex flex-col flex-1 gap-8">

                    {/* Doctor Information */}
                    <motion.div
                        variants={childeDiv}
                        initial='hidden'
                        whileInView='visible'
                        className="flex bg-[#f9f9f9] items-center gap-8 p-5 rounded-md shadow-lg">
                        <motion.img
                            initial={{ scale: 0.5, opacity: 0 }}
                            whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                            transition={{ duration: 0.6, type: 'spring', stiffness: 40, damping: 8 }}
                            className="w-[100px] h-[100px] rounded-full" src={doctor?.image_url} alt="Doctor Image" />
                        <motion.div
                            variants={childeDiv}
                            initial='hidden'
                            whileInView='visible'
                            className="flex flex-col gap-2 p-2 flex-1">
                            <div className="flex justify-between items-center text-body-text">
                                <h1>Doctor <span> </span>
                                    {doctor?.first_name?.charAt(0).toUpperCase() + doctor?.first_name?.slice(1)}
                                    {' '}
                                    {doctor?.last_name?.charAt(0).toUpperCase() + doctor?.first_name?.slice(1)}
                                </h1>
                                <p><span className="text-mid-blue">{doctor?.reservation_count}</span> View</p>
                            </div>
                            <h1 className="text-body-text">{doctor?.desc}</h1>
                            <p>{doctor?.specialization_name}</p>
                            <span>Age: {doctor?.age}</span>
                            <span>City: {doctor?.city}</span>
                            <span>Address: {doctor?.address}</span>
                            <span>Experince Years: {doctor?.ex_years}</span>
                        </motion.div>
                    </motion.div>

                    {/* Doctor About */}
                    <motion.div
                        variants={childeDiv}
                        initial='hidden'
                        whileInView='visible'
                        className="bg-[#f9f9f9] p-5 rounded-md shadow-lg">
                        <div className="flex items-center gap-6 pl-8">
                            <FcAbout className="text-mid-blue" />
                            <h1 className="text-body-text">About The Doctor</h1>
                        </div>
                        <p className="text-body-text leading-6">{doctor?.desc}</p>
                    </motion.div>

                    {/* Patient Reviews */}
                    <motion.div
                        variants={childeDiv}
                        initial='hidden'
                        whileInView='visible'
                        className="bg-[#f9f9f9] p-5 rounded-md shadow-lg">
                        <div className="flex items-center gap-6 pl-8">
                            <FaStarHalfAlt className="text-mid-blue" />
                            <h1 className="text-body-text">Patients’ Reviews </h1>
                        </div>
                        <div className="flex items-center justify-center my-4">
                            {Array.from({ length: 5 }, (_, index) => (
                                <FaStar
                                    key={index}
                                    className={`${index < Math.round(doctor?.avg_rating ?? 0) ? "text-yellow-300" : "text-[#9e9b9b70]"} mr-2`}
                                />
                            ))}

                        </div>

                        <div className="flex flex-col items-center justify-center gap-2">
                            <p className="text-body-text">Overall Rating</p>
                            <p className="text-body-text">From <span className="text-mid-blue">{doctor?.reservation_count}</span> Visitors</p>
                        </div>

                    </motion.div>

                    {/* Users Reviews */}
                    <motion.div
                        variants={childeDiv}
                        initial='hidden'
                        whileInView='visible'
                        className={`${doctor?.reviews && doctor?.reviews.data.length > 0 && 'bg-[#f9f9f9] p-5 rounded-md shadow-lg flex flex-col gap-6'} `}>
                        {doctor?.reviews && doctor?.reviews.data.length > 0 && (
                            doctor.reviews.data.map(review => (
                                <motion.div
                                    initial={{ scale: 0.5, opacity: 0 }}
                                    animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                                    transition={{ duration: 0.6, type: 'spring', stiffness: 40, damping: 8 }}
                                    key={review.id} className="flex justify-between items-center">
                                    <div className="flex items-center gap-8">
                                        <img className="rounded-full w-[50px] h-[50px]" src={review.user.image_url} alt="User Image" />
                                        <div className="flex flex-col gap-1">
                                            <h1 className="text-mid-blue">
                                                {doctor?.first_name?.charAt(0).toUpperCase() + doctor?.first_name?.slice(1)}
                                                {' '}
                                                {doctor?.last_name?.charAt(0).toUpperCase() + doctor?.first_name?.slice(1)}
                                            </h1>
                                            <div className="flex items-center justify-center">
                                                {Array.from({ length: 5 }, (_, index) => (
                                                    <FaStar
                                                        key={index}
                                                        className={`${index < Math.round(review.rate ?? 0) ? "text-yellow-300" : "text-[#9e9b9b70]"} mr-2`}
                                                    />
                                                ))}
                                            </div>
                                            <p className="text-body-text text-[12px]">Overall Rating</p>
                                            <div className="mt-1 flex gap-2 items-center">
                                                <FaRegComment className="text-mid-blue" />
                                                <span className="text-body-text">{review.comment}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        {review.user.id && review.user.id === user.id ? (
                                            <>
                                                <button className="bg-red-600 text-white rounded-md px-4 py-2">Delete</button>
                                                <button className="bg-yellow-400 text-white rounded-md px-4 py-2">Edit</button>
                                            </>
                                        ) : (
                                            <div className="flex flex-col items-center justify-center gap-1">
                                                <span className="text-white bg-mid-blue rounded-md flex items-center justify-center w-[40px] h-[40px] text-center">{Math.round(review.rate ?? 0)}</span>
                                                <span className="text-body-text block">Doctor Rating</span>
                                            </div>
                                        )}

                                    </div>
                                </motion.div>
                            ))
                        )}
                    </motion.div>

                    <PaginationDoctorReview />

                </motion.div>

                {/* Book Mark */}
                <SidebarDoctor />
            </div>
        </>
    )
}
