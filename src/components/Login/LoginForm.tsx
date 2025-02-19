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

export default function LoginForm() {
    const [state, action, pending] = useActionState(LoginAction, undefined);
    const [message, setMessage] = useState('');
    const [checkbox, setCheckbox] = useState(false);
    const router = useRouter();
    const cookie = Cookie();
    const userContext = useUser();

    const handleCheckBox = () => setCheckbox(prev => !prev);

    useEffect(() => {
        if (state?.errors?.error == 'Email Or Password Is Not Valid') {
            setMessage(state.errors.error);
        } 
        if (state?.userData) {
            if(state?.userData.user.email_verified_at == null){
                cookie.set('data', JSON.stringify(state.userData));
                cookie.set('message', state.message);
                router.push('/verify');
            }
        }
        if(state?.user){
            userContext?.setUser({
                phone: state?.user?.phone,
                address: state?.user?.address,
                city: state?.user?.city,
                email: state?.user?.email,
                first_name: state?.user?.first_name,
                last_name: state?.user?.last_name,
                image_url: state?.user?.image_url,
                email_verified_at: state?.user?.email_verified_at
            })
            router.push('/');
        }
    }, [state])

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
            <div className='relative w-full'>
                <div className="flex items-center gap-2 mb-1">
                    <Image className="absolute left-[15px]" src={EnvelopeImage} alt="User Image" width={20} height={20} />
                    <input defaultValue={state?.data?.email} className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="email" placeholder="Type Your Email" name="email" />
                </div>
                {state?.errors?.email && <span className="text-red-600">{state.errors.email[0]}</span>}
            </div>

            <div className='relative w-full'>
                <div className="flex items-center gap-2 mb-1">
                    <Image className="absolute left-[15px]" src={PasswordImage} alt="User Image" width={20} height={20} />
                    <input className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="password" placeholder="Type Your Password" name="password" />
                </div>
                {state?.errors?.password && <span className="text-red-600">{state.errors.password[0]}</span>}
            </div>

            <div className="flex justify-between items-center">
                <div className="flex gap-3">
                    <input id="checkbox" type="hidden" checked={checkbox} onChange={handleCheckBox} name="checkbox" />
                    <span className="w-[20px] h-[20px] border border-form rounded-md relative">
                        <GrFormCheckmark className={`${checkbox ? 'scale-100' : 'scale-0'} transition-transform duration-300 ease-in-out absolute left-0 top-0 w-full h-full text-dark-blue`} />
                    </span>
                    <label onClick={handleCheckBox} htmlFor="checkbox" className="text-dark-blue cursor-pointer">Remember Me</label>
                </div>
                <Link href={'/check-email'} className="underline text-dark-blue">Forget Password?</Link>
            </div>

            <button type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
                {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Log In'}
            </button>

            <span className="text-dark-blue text-center">Not member yet? <Link href={'/register'} className="underline">Create An Account</Link></span>
        </form>
    )
}
