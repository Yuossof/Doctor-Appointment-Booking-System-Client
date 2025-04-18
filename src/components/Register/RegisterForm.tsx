'use client';
import { GrFormCheckmark } from "react-icons/gr";
import { useActionState, useEffect, useState } from "react";
import RegisterAction from "../../lib/services/auth/RegisterAction";
import Image from "next/image";
import userImage from '../../../public/images/user.png';
import EnvelopeImage from '../../../public/images/envelope 1.png';
import PasswordImage from '../../../public/images/lock 1.png';
import Link from "next/link";
import './style.css';
import { motion } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useRouter } from "next/navigation";
import { useUser } from "../../Context/User";
import { parentDiv } from "../ParentAndChildAnimation";
import { IRegister } from "@/types/Register";

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

const initialState = {
    errors: {},
    data: {},
}

export default function RegisterForm() {
    const [state, action, pending] = useActionState<IRegister, FormData>(RegisterAction, initialState);
    const [checkbox, setCheckbox] = useState(false);
    const handleCheckBox = () => setCheckbox(prev => !prev);
    const router = useRouter();
    const userContext = useUser();

    useEffect(() => {
        if (state?.user) {
            userContext?.setUser(state?.user)
            router.push('/verify');
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

    return (
        <form action={action} className="w-full sm:w-[550px] md:w-[700px] lg:w-[800px] sm:mt-6 flex flex-col gap-3 px-2 sm:px-0 sm:gap-6">

            <motion.div
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className="flex flex-col sm:flex-row gap-3">
                <motion.div
                    variants={childeDiv}
                    custom={1}
                    initial='hidden'
                    whileInView='visible'
                    className='relative w-full'>
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={userImage} alt="User Image" width={20} height={20} />
                        <input defaultValue={state?.data?.first_name?.toString()} className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="text" placeholder="Type Your First Name" name="first_name" />
                    </div>
                    {state?.errors?.first_name && <span className="text-red-500 text-sm pl-1">{state.errors.first_name[0]}</span>}
                </motion.div>

                <motion.div
                    variants={childeDiv}
                    custom={2}
                    initial='hidden'
                    whileInView='visible'
                    className='relative w-full'>
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={userImage} alt="User Image" width={20} height={20} />
                        <input defaultValue={state?.data?.last_name?.toString()} className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="text" placeholder="Type Your Last Name" name="last_name" />
                    </div>
                    {state?.errors?.last_name && <span className="text-red-500 text-sm pl-1">{state.errors.last_name[0]}</span>}
                </motion.div>
            </motion.div>

            <motion.div
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className="flex flex-col sm:flex-row gap-3">

                <motion.div
                    variants={childeDiv}
                    custom={3}
                    initial='hidden'
                    whileInView='visible'
                    className='relative w-full'>
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={EnvelopeImage} alt="User Image" width={20} height={20} />
                        <input defaultValue={state?.data?.email?.toString()} className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="email" placeholder="Type Your Email" name="email" />
                    </div>
                    {state?.errors?.email && <span className="text-red-500 text-sm pl-1">{state.errors.email[0]}</span>}
                </motion.div>

                <motion.div
                    variants={childeDiv}
                    custom={4}
                    initial='hidden'
                    whileInView='visible'
                    className='relative w-full'>
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={EnvelopeImage} alt="User Image" width={20} height={20} />
                        <input defaultValue={state?.data?.phone?.toString()} className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="text" placeholder="Type Your Phone" name="phone" />
                    </div>
                    {state?.errors?.phone && <span className="text-red-500 text-sm pl-1">{state.errors.phone[0]}</span>}
                </motion.div>

            </motion.div>

            <motion.div
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className="flex flex-col sm:flex-row gap-3">

                <motion.div
                    variants={childeDiv}
                    custom={5}
                    initial='hidden'
                    whileInView='visible'
                    className='relative w-full'>
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={PasswordImage} alt="User Image" width={20} height={20} />
                        <input className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="password" placeholder="Type Your Password" name="password" />
                    </div>
                    {state?.errors?.password && <span className="text-red-500 text-sm pl-1">{state.errors.password[0]}</span>}
                </motion.div>

                <motion.div
                    variants={childeDiv}
                    custom={6}
                    initial='hidden'
                    whileInView='visible'
                    className='relative w-full'>
                    <div className="flex items-center gap-2 mb-1">
                        <Image className="absolute left-[15px]" src={PasswordImage} alt="User Image" width={20} height={20} />
                        <input className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="password" placeholder="Type Your Password Confirmation" name="password_confirmation" />
                    </div>
                    {state?.errors?.password_confirmation && <span className="text-red-500 text-sm pl-1">{state.errors.password_confirmation[0]}</span>}
                </motion.div>

            </motion.div>

            <motion.div
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className="flex flex-col sm:flex-row gap-3 justify-between">

                <motion.div
                    variants={childeDiv}
                    custom={7}

                    initial='hidden'
                    whileInView='visible'
                    className="flex flex-col gap-1 w-full">
                    <input defaultValue={state?.data?.gender} type="date" name="birth_date" className="text-body-text h-full px-3 rounded-lg border border-form" />

                    {state?.errors?.birth_date && <span className="text-red-500 text-sm pl-1">{state.errors.birth_date[0]}</span>}
                </motion.div>

                <motion.div
                    variants={childeDiv}
                    custom={8}

                    initial='hidden'
                    whileInView='visible'
                    className="w-full">
                    <Select name="gender" defaultValue={state?.data?.gender?.toString() || ''}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select Gender" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="M">Male</SelectItem>
                            <SelectItem value="F">Female</SelectItem>
                        </SelectContent>
                    </Select>
                    {state?.errors?.gender && <span className="text-red-500 text-sm pl-1">{state.errors.gender[0]}</span>}
                </motion.div>

            </motion.div>

            <motion.div
                variants={childeDiv}
                custom={9}

                initial='hidden'
                whileInView='visible'
                className="flex items-center gap-3 ">
                <input id="checkbox" type="hidden" checked={checkbox} onChange={handleCheckBox} name="checkbox" />
                <span className="w-[20px] h-[20px] border border-form rounded-md relative">
                    <GrFormCheckmark className={`${checkbox ? 'scale-100' : 'scale-0'} transition-transform duration-300 ease-in-out absolute left-0 top-0 w-full h-full text-dark-blue`} />
                </span>
                <label onClick={handleCheckBox} htmlFor="checkbox" className="text-dark-blue cursor-pointer">I agree with Terms and Privacy</label>
            </motion.div>

            <motion.button
                variants={childeDiv}
                initial='hidden'
                whileInView='visible'
                type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
                {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Sign Up'}
            </motion.button>
            <motion.span
                variants={childeDiv}
                initial='hidden'
                whileInView='visible'
                className="text-dark-blue text-center">Have account? <Link href={'/login'} className="underline">Sign In</Link></motion.span>
        </form>
    )
}
