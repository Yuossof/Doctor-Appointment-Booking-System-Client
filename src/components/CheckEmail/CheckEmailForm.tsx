'use client';
import { useActionState, useEffect, useState } from "react";
import CheckEmailAction from "../../lib/services/auth/CheckEmailAction";
import EnvelopeImage from '@/../public/images/envelope 1.png';
import Image from "next/image";
import { motion } from "framer-motion";

export default function CheckEmailForm() {
    const [state, action, pending] = useActionState(CheckEmailAction, undefined);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (state?.message) {
            setMessage(state?.message);
        }
    }, [state])

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    }, [message])

    return (
        <>
            <motion.h1
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className='text-dark-blue text-[35px] sm:text-[50px] font-semibold'>Check Email</motion.h1>

            <form action={action} className="w-full sm:w-[550px] md:w-[700px] lg:w-[800px] mt-6 flex flex-col gap-3 px-2 sm:px-0 sm:gap-6">
                {message &&
                    <div className="bg-green-300 text-white w-full rounded-md text-[12px] sm:text-[14px] p-2 text-center">
                        <span>{message}</span>
                    </div>
                }
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 80 }}
                    className='relative w-full'>
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={EnvelopeImage} alt="User Image" width={20} height={20} />
                        <input defaultValue={state?.data?.email} className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="email" placeholder="Type Your Email" name="email" />
                    </div>
                    {state?.errors?.email && <span className="text-red-600">{state.errors.email[0]}</span>}
                </motion.div>
                <motion.button
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 80 }}
                    type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
                    {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Continue'}
                </motion.button>
            </form>
        </>
    )
}
