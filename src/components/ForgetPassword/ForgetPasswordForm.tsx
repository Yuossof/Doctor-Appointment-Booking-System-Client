'use client';

import { useEffect ,useActionState } from "react";
import ForgetPasswordAction from "../../lib/services/auth/ForgetPasswordAction";
import Image from "next/image";
import PasswordImage from '@/../public/images/lock 1.png';
import Link from "next/link";

interface TypeEmail {
    email: string
}

import { useRouter } from "next/navigation";
import { useUser } from "../../Context/User";
import { useToastMessage } from "../../Context/ToastMessage";

export default function ForgetPasswordForm({ email }: TypeEmail) {
    const [state, action, pending] = useActionState(ForgetPasswordAction, undefined);
    const contextToastMessage = useToastMessage();
    const router = useRouter();
    const userContext = useUser();

    useEffect(() => {
        if(state?.user){
            console.log(state?.user.user)
            userContext?.setUser({
                phone: state?.user?.user?.phone,
                address: state?.user?.user?.address,
                city: state?.user?.user?.city,
                email: state?.user?.user?.email,
                first_name: state?.user?.user?.first_name,
                last_name: state?.user?.user?.last_name,
                image_url: state?.user?.user?.image_url,
                email_verified_at: state?.user?.user?.email_verified_at
            })
            if(state?.user.email_verified_at){
                router.push('/');
                contextToastMessage?.setToastMessage('Updated Successfully');
            }else{
                router.replace('/verify');
                contextToastMessage?.setToastMessage('Please Verify Your Email');
            }
        }    
    }, [state])

    return (
        <form action={action} className="w-full sm:w-[550px] md:w-[700px] lg:w-[800px] mt-6 flex flex-col gap-3 px-2 sm:px-0 sm:gap-6">
            <div className='relative w-full'>
                <input type="hidden" name="email" value={email} />
                <div className="flex items-center gap-2 mb-1">
                    <Image className="absolute left-[15px]" src={PasswordImage} alt="User Image" width={20} height={20} />
                    <input className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="password" placeholder="Type Your Password" name="password" />
                </div>
                {state?.errors?.password && <span className="text-red-600">{state.errors.password[0]}</span>}
            </div>

            <div className='relative w-full'>
                <div className="flex items-center gap-2 mb-1">
                    <Image className="absolute left-[15px]" src={PasswordImage} alt="User Image" width={20} height={20} />
                    <input className="w-full p-2 rounded-lg border border-form focus:outline-none pl-[45px] text-body-text" type="password" placeholder="Type Your Password Confirmation" name="password_confirmation" />
                </div>
                {state?.errors?.password_confirmation && <span className="text-red-600">{state.errors.password_confirmation[0]}</span>}
            </div>

            <button type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
                { pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Continue' }
            </button>
            <span className="text-dark-blue text-center">Have account? <Link href={'/login'} className="underline">Log In</Link></span>

        </form>
    )
}
