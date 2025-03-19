'use client';
import Image from "next/image";
import { useActionState, useEffect, useState } from "react";
import EnvelopeImage from '../../../public/images/envelope 1.png';
import PasswordImage from '../../../public/images/lock 1.png';
import LoginAction from "../../lib/services/auth/LoginAction";
import Link from "next/link";
import Cookie from 'cookie-universal';
import { GrFormCheckmark } from "react-icons/gr";
import { useRouter } from "next/navigation";
import { useUser } from "../../Context/User";
import { motion } from "framer-motion";

export default function LoginForm() {
    const [state, action, pending] = useActionState(LoginAction, undefined);
    const [message, setMessage] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const router = useRouter();
    const cookie = Cookie();
    const userContext = useUser();

    const handleCheckBox = () => setCheckbox(prev => !prev);

    useEffect(() => {
        if (state?.errors?.error) {
            setMessage(state.errors.error);
        } else if (state?.userData) {
            if (state?.userData.user.email_verified_at == null) {
                cookie.set('data', JSON.stringify(state.userData));
                cookie.set('message', 'You Must Verify Your Email');
                router.push('/verify');
            }
        }
       
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state])

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
    }, [message]);

    return (
        <form action={action} className="w-full sm:w-[550px] md:w-[700px] lg:w-[800px] sm:mt-6 flex flex-col gap-3 px-2 sm:px-0 sm:gap-6">
            {message &&
                <div className="bg-red-500 text-white w-full rounded-md p-2 text-center text-[12px] sm:text-[14px]">
                    <span>{message}</span>
                </div>
            }
            <motion.div
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className='relative w-full'>
                <div className="flex items-center gap-2 mb-1">
                    <Image className="absolute left-[15px]" src={EnvelopeImage} alt="User Image" width={20} height={20} />
                    <input defaultValue={state?.data?.email} className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="email" placeholder="Type Your Email" name="email" />
                </div>
                {state?.errors?.email && <span className="text-red-600">{state.errors.email[0]}</span>}
            </motion.div>

            <motion.div
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className='relative w-full'>
                <div className="flex items-center gap-2 mb-1">
                    <Image className="absolute left-[15px]" src={PasswordImage} alt="User Image" width={20} height={20} />
                    <input className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="password" placeholder="Type Your Password" name="password" />
                </div>
                {state?.errors?.password && <span className="text-red-600">{state.errors.password[0]}</span>}
            </motion.div>

            <div className="flex justify-between items-center">
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                    className="flex gap-3">
                    <input id="checkbox" type="hidden" checked={checkbox} onChange={handleCheckBox} name="checkbox" />
                    <span className="w-[20px] h-[20px] border border-form rounded-md relative">
                        <GrFormCheckmark className={`${checkbox ? 'scale-100' : 'scale-0'} transition-transform duration-300 ease-in-out absolute left-0 top-0 w-full h-full text-dark-blue`} />
                    </span>
                    <label onClick={handleCheckBox} htmlFor="checkbox" className="text-dark-blue cursor-pointer">Remember Me</label>
                </motion.div>
                <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                >
                    <Link href={'/check-email'} className="underline text-dark-blue">Forget Password?</Link>
                </motion.div>
            </div>

            <motion.button
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
                {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Log In'}
            </motion.button>

            <motion.span
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80 }}
                className="text-dark-blue text-center">Not member yet? <Link href={'/register'} className="underline">Create An Account</Link></motion.span>
        </form>
    )
}
