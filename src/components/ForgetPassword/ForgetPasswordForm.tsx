'use client';

import { useEffect, useActionState } from "react";
import ForgetPasswordAction from "../../lib/services/auth/ForgetPasswordAction";
import Image from "next/image";
import PasswordImage from '@/../public/images/lock 1.png';
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useUser } from "../../Context/User";
import { useToastMessage } from "../../Context/ToastMessage";
import { parentDiv } from "../ParentAndChildAnimation";
import { IForgetPassword } from "@/types/ForgetPassword";
import { initialState } from "@/types/InitalState";

const childeDiv = {
    hidden: {
        opacity: 0,
        y: 20
    },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.2,
            duration: 0.5,
            ease: "easeInOut"
        }
    })
};


interface TypeEmail {
    email: string
}

export default function ForgetPasswordForm({ email }: TypeEmail) {
    const [state, action, pending] = useActionState<IForgetPassword, FormData>(ForgetPasswordAction, initialState);
    const contextToastMessage = useToastMessage();
    const router = useRouter();
    const userContext = useUser();

    useEffect(() => {
        if (state?.user) {
            console.log(state?.user);
            userContext?.setUser({
                id: state?.user?.id,
                role: state?.user?.role,
                gender: state?.user?.gender,
                clinic_address: state?.user?.clinic_address,
                phone: state?.user?.phone,
                address: state?.user?.address,
                city: state?.user?.city,
                email: state?.user?.email,
                first_name: state?.user?.first_name,
                last_name: state?.user?.last_name,
                image_url: state?.user?.image_url,
                email_verified_at: state?.user?.email_verified_at
            })
            if (state?.user?.email_verified_at) {
                router.push('/');
                contextToastMessage?.setToastMessage('Updated Successfully');
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <>
            <motion.h1
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className='text-dark-blue text-[35px] sm:text-[50px] font-semibold'>Forget Password</motion.h1>

            <motion.form
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                action={action} className="w-full sm:w-[550px] md:w-[700px] lg:w-[800px] mt-6 flex flex-col gap-3 px-2 sm:px-0 sm:gap-6">

                <motion.div
                    variants={childeDiv}
                    custom={1}
                    initial='hidden'
                    whileInView='visible'
                    className='relative w-full'>
                    <input type="hidden" name="email" value={email} />
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={PasswordImage} alt="User Image" width={20} height={20} />
                        <input className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="password" placeholder="Type Your Password" name="password" />
                    </div>
                    {state?.errors?.password && <span className="text-red-600">{state.errors.password[0]}</span>}
                </motion.div>

                <motion.div
                    variants={childeDiv}
                    custom={2}
                    initial='hidden'
                    whileInView='visible'
                    className='relative w-full'>
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={PasswordImage} alt="User Image" width={20} height={20} />
                        <input className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="password" placeholder="Type Your Password Confirmation" name="password_confirmation" />
                    </div>
                    {state?.errors?.password_confirmation && <span className="text-red-600">{state.errors.password_confirmation[0]}</span>}
                </motion.div>

                <motion.button
                    variants={childeDiv}
                    custom={3}
                    initial='hidden'
                    whileInView='visible'
                    type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
                    {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Continue'}
                </motion.button>
                <motion.span
                    variants={childeDiv}
                    custom={4}
                    initial='hidden'
                    whileInView='visible'
                    className="text-dark-blue text-center">Have account? <Link href={'/login'} className="underline">Log In</Link></motion.span>
            </motion.form>
        </>
    )
}
