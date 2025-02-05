'use client';
import { useActionState, useEffect, useState } from "react";
import CheckEmailAction from "./CheckEmailAction";
import EnvelopeImage from '@/../public/images/envelope 1.png';
import Image from "next/image";

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
        <form action={action} className="w-[800px] mt-6 flex flex-col gap-6">
            {message &&
                <div className="bg-green-300 text-white w-full rounded-md p-2 text-center">
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
            <button type="submit" className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
                {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Continue'}
            </button>
        </form>
    )
}
