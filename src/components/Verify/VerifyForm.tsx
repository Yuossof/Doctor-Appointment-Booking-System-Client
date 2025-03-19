'use client';
import React, { useActionState, useEffect, useState } from "react";
import VerifyAction from "../../lib/services/auth/VerifyAction";
import axios from 'axios';
import GetToken from "../../lib/services/auth/GetToken";
import { useUser } from "../../Context/User";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { UserData } from "@/types/RegsiterUser";

export default function VerifyForm({ user }: { user: UserData }) {
    const [state, action, pending] = useActionState(VerifyAction, undefined);
    const [disabled, setDisabled] = useState(true);
    const [message, setMessage] = useState('');
    const userContext = useUser();
    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target;
        // will false when this condition is true 
        setDisabled(value.length !== 5);
    }

    const handleResendCode = async () => {
        const token = await GetToken();
        console.log(token)
        try {
            const res = await axios.get('https://clinic.divstark.com/api/users/send-code', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.data;
            setMessage(data.message);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (state?.user) {
            userContext?.setUser({
                phone: state?.user?.user?.phone,
                address: state?.user?.user?.address,
                city: state?.user?.user?.city,
                email: state?.user?.user?.email,
                first_name: state?.user?.user?.first_name,
                last_name: state?.user?.user?.last_name,
                image_url: state?.user?.user?.image_url,
                email_verified_at: state?.user?.user?.email_verified_at,
                gender: state?.user?.user?.gender,
                role: state?.user?.user?.role,
                clinic_address: state?.user?.user?.clinic_address,
            });
            if(state?.user?.user?.role == 'doctor' && !state?.user?.user?.clinic_address){
                router.push('/doctor-dashboard/profile');
            }else if (state?.user?.user?.role == 'doctor' && state?.user?.user?.clinic_address){
                router.push('/doctor-dashboard');
            }else if (state?.user?.user?.role == 'user' && state?.user?.user?.city && state?.user?.user?.address){
                router.push('/')
            }else if (state?.user?.user?.role == 'user'){
                router.push('/profile');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.user])

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
                className='text-dark-blue text-[35px] sm:text-[50px] font-semibold'>Verify Code</motion.h1>
            <motion.p
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1, type: 'spring', stiffness: 80 }}
                className='text-body-text text-center text-[12px] sm:text-[14px] mt-2'>We Sent Code To This Email:
                <span className='text-dark-blue'> {user.email}</span>
            </motion.p>
            <form action={action} className="w-full sm:w-[550px] md:w-[700px] lg:w-[800px] mt-6 flex flex-col gap-3 px-2 sm:px-0 sm:gap-6">
                {message &&
                    <div className="bg-green-300 text-white w-full rounded-md p-2 text-center">
                        <span>{message}</span>
                    </div>
                }
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2, type: 'spring', stiffness: 80 }}
                >
                    <input className="w-full border border-form rounded-lg text-body-text focus:outline-none focus:ring-0 p-2" onChange={handleChange} defaultValue={state?.data?.code} name="code" type="text" placeholder="Type Your Code" />
                    {state?.errors?.code && <span className="text-red-600">{state.errors.code[0]}</span>}
                </motion.div>
                <motion.button
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.3, type: 'spring', stiffness: 80 }}
                    type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={disabled || pending}>
                    {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Continue'}
                </motion.button>
                <motion.span
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4, type: 'spring', stiffness: 80 }}
                >Didn’t receive the email? <strong className='cursor-pointer text-dark-blue' onClick={handleResendCode}>Click to resend</strong></motion.span>
            </form>
        </>
    )
}
