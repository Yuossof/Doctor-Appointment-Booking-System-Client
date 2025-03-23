'use client';
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion';
import axios from 'axios';
import { FaStar } from 'react-icons/fa';
import Image from 'next/image';
import { FaComment } from "react-icons/fa";

interface IUser {
    id: number,
    first_name: string,
    last_name: string,
    image_url: string
}

interface IReview {
    id: number,
    comment: string,
    rate: number,
    user: IUser
}

const parentDiv = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.5,
            staggerChildren: 0.5
        }
    }
}

const childeDiv = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 1, type: 'spring', stiffness: 50, damping: 6
        }
    }
}

const HappyClients = () => {
    const [reviews, setReviews] = useState<IReview[] | []>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/get-doctors/reviews-client`);
                const data = res.data;
                setReviews(data.data.reviews);
            } catch (error) {
                console.log(error)
            }
        }
        fetchData();
    }, [])

    return (
        <div className='flex flex-col w-full items-center px-[15px]'>
            <motion.div
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className='flex justify-center flex-col text-center gap-4 items-center w-full'>
                <motion.h2
                    variants={childeDiv}
                    className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-4xl lg:mt-0 mt-4 text-dark-blue lg:max-w-[80%] '>Our Happy Clients</motion.h2>
                <motion.p
                    variants={childeDiv}
                    className='text-muted-foreground text-md text-center'>We use only the best quality materials on the market in order <br /> to provide the best products to our patients.</motion.p>
            </motion.div>
            <motion.div
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7 mt-11 w-auto lg:w-[80%]'>
                {reviews && reviews.length > 0 && reviews.map((review) => (
                    <motion.div 
                    variants={childeDiv}
                    key={review.id} className='flex flex-col items-start p-4 shadow-lg bg-slate-50 rounded-lg border-[1px] border-gray-300'>
                        <div className='flex gap-2'>
                            <div>
                                <Image className='rounded-full' src={review.user.image_url} height={50} width={50} priority alt='User Image' />
                            </div>
                            <div>
                                <h3 className='text-md text-dark-blue'>
                                    {review.user.first_name.charAt(0).toUpperCase() + review.user.first_name.slice(1)}
                                    {' '}
                                    {review.user.last_name.charAt(0).toUpperCase() + review.user.first_name.slice(1)}
                                </h3>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <FaStar
                                        key={index}
                                        className={`${index < review.rate ? "text-yellow-300" : "text-[#9e9b9b70]"} inline`}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className='text-left mt-3 flex gap-2 items-center ml-4'>
                            <FaComment className='text-mid-blue' />
                            <p className='text-sm text-muted-foreground'>
                                {review.comment}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    )
}

export default HappyClients