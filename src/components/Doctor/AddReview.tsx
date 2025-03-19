'use client'
import React, { useActionState, useEffect, useState, startTransition } from 'react'
import ReviewAction from './ReviewAction'
import RFAction from '@/types/ReviewAction'
import { useUser } from '@/Context/User'
import { FaStar } from "react-icons/fa";
import axios from 'axios'
import GetToken from '@/lib/services/auth/GetToken'
import { motion } from 'framer-motion'
import { childNav, parentDiv } from '../ParentAndChildAnimation'
import { usePageNumber } from '@/Context/PageNumberReviews'

export default function AddReview({ id }: { id: string }) {
    const userContext = useUser();
    const updatePage = usePageNumber();

    const [state, action, pending] = useActionState<RFAction, FormData>(
        ReviewAction,
        {
            id,
            success: false,
            errors: {},
            data: { comment: '' },
            message: ''
        }
    )

    useEffect(() => {
        if (state) {
            updatePage?.setDeleteReview(false)
        }
        return () => updatePage?.setDeleteReview(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    const [haveReservations, setHaveReservations] = useState(false);

    useEffect(() => {
        const fetchSuccess = async () => {
            try {
                const token = await GetToken();
                const data = await axios.get(`${process.env.NEXT_BASE_URL}/api/users/get-doctors/reservation-status/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setHaveReservations(data.data.data.success);
            } catch (error) {
                console.log(error)
            }
        }
        fetchSuccess();
    }, [id])

    const [starCount, setStarCount] = useState<number>(0);
    const [comment, setComment] = useState<string>('');

    const handleCount = (index: number) => {
        setStarCount(index === starCount ? 0 : index);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        formData.append('rate', starCount.toString());
        formData.append('comment', comment.toString());
        startTransition(() => {
            action(formData);
        });
        setStarCount(0);
        setComment("");
        updatePage?.setDeleteReview(true)
    };

    return (
        <>
            {userContext?.user && haveReservations && (
                <>
                    <div className='mt-14'>
                        <motion.h1
                            initial={{ y: 20, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeIn" }}
                            className='text-[50px] font-semibold text-dark-blue mb-2'>Review</motion.h1>
                        <form onSubmit={handleSubmit} className='bg-[#f9f9f9] p-5 rounded-md shadow-lg'>
                            <div className='flex items-center justify-between'>
                                <div className='flex items-center gap-8 w-full'>
                                    <motion.img
                                        initial={{ x: -20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, ease: "easeIn", type: 'spring', stiffness: 150, damping: 6 }}
                                        className='rounded-full w-[80px] h-[80px]' src={userContext?.user?.image_url} alt='Your Image' />
                                    <div className='flex items-center gap-4 w-full'>
                                        <motion.div className="flex flex-col gap-2 basis-[49%]">
                                            <label htmlFor="name">Your Name</label>
                                            <input className='cursor-not-allowed rounded-md p-3 bg-white opacity-50 shadow-lg' disabled id='name' type="text"
                                                value={`${userContext?.user?.first_name} ${userContext?.user?.last_name}`} />
                                        </motion.div>
                                        <motion.div className="flex flex-col gap-2 basis-[49%]">
                                            <label htmlFor="email">Your Email</label>
                                            <input className='cursor-not-allowed rounded-md p-3 bg-white opacity-50 shadow-lg' disabled id='email' type="text"
                                                value={userContext?.user?.email} />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center justify-between'>
                                <span className='w-[80px]'></span>
                                <motion.textarea
                                    initial={{ y: 20, opacity: 0 }}
                                    whileInView={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.3, ease: "easeIn", type: 'spring', stiffness: 150, damping: 6 }}
                                    className='ml-9 mt-8 h-[100px] rounded-md p-2 bg-white opacity-50 shadow-xl focus:outline-none w-full'
                                    name="comment"
                                    placeholder='Write Your Message'
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                ></motion.textarea>
                            </div>
                            {state?.errors?.error?.comment && <motion.span
                                initial={{ y: 20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: "easeIn", type: 'spring', stiffness: 150, damping: 6 }}
                                className='text-red-600 block mt-1 ml-28'>{state?.errors?.error?.comment[0]}</motion.span>}
                            <div className='flex items-center'>
                                <span className='w-[80px]'></span>
                                <div className='flex items-center justify-between mt-8 flex-1 ml-9'>
                                    <div className='flex gap-2 items-center'>
                                        <motion.span className='text-dark-blue'>Your Ratings: </motion.span>
                                        <motion.div variants={parentDiv} initial='hidden' whileInView='visible' className='flex gap-2'>
                                            {Array.from({ length: 5 }, (_, index) => (
                                                <motion.div key={index} variants={childNav}>
                                                    <FaStar
                                                        onClick={() => handleCount(index + 1)}
                                                        className={`text-[20px] cursor-pointer 
                                               ${starCount >= index + 1 ? "text-yellow-300" : "text-gray-400"}`}
                                                    />
                                                </motion.div>
                                            ))}
                                        </motion.div>
                                    </div>
                                    <motion.button
                                        initial={{ x: 20, opacity: 0 }}
                                        whileInView={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, ease: "easeIn" }}
                                        disabled={pending}
                                        className='bg-mid-blue disabled:cursor-not-allowed disabled:opacity-50 text-white rounded-md px-4 py-2 hover:-translate-y-2 transition-all duration-300 ease-in-out'>
                                        { pending ? <span>Loading <span className='loader'></span></span> : 'Post Review' }
                                    </motion.button>
                                </div>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </>
    )
}
