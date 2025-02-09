'use client';
import { useActionState, useEffect, useState } from "react";
import Image from "next/image";
import userImage from '../../../public/images/user.png';
import EnvelopeImage from '../../../public/images/envelope 1.png';
import ContactAction from "./ContactAction";
import { ContactActionForm } from "@/types/ContactAction";
import Cookie from 'cookie-universal';

const initialState = {
  success: false,
  message: '',
  errors: {},
  data: {},
};

interface UInterface {
  first_name: string,
  last_name: string,
  email: string
}

export default function ContactForm() {
  const cookieStore = Cookie();
  const [user, setUser] = useState<UInterface | null>(null)
  const [message, setMessage] = useState('');
  const [state, action, pending] = useActionState<ContactActionForm, FormData>(ContactAction, initialState);

  useEffect(() => {
    const user = cookieStore.get('data')?.user;
    if (user) {
      setUser({
        first_name: user.first_name,
        email: user.email,
        last_name: user.last_name
      });
    }
  }, []);

  useEffect(() => {
    if (state?.success) {
      setMessage(state?.message);
    }
  }, [state])

  useEffect(() => {
    setTimeout(() => {
      setMessage('');
    }, 3000);
  }, [message])

  return (
    <form action={action} className="w-full sm:w-[550px] md:w-[700px] lg:w-[800px] sm:mt-6 flex flex-col gap-3 px-2 sm:px-0 sm:gap-6">
      {message &&
        <div className="bg-green-300 text-white w-full rounded-md text-[12px] sm:text-[14px] p-2 text-center">
          <span>{message}</span>
        </div>
      }
      <div className="flex flex-col sm:flex-row gap-3">
        <div className='relative w-full'>
          <div className="flex items-center gap-2 mb-1">
            <Image className="absolute left-[15px]" src={userImage} alt="User Image" width={20} height={20} />
            <input defaultValue={user?.first_name} disabled className="w-full bg-slate-300 cursor-not-allowed opacity-50 p-2 rounded-lg border-none focus:outline-none pl-[45px] text-body-text" type="text" placeholder="Type Your First Name" name="first_name" />
          </div>
        </div>

        <div className='relative w-full'>
          <div className="flex items-center gap-2 mb-1">
            <Image className="absolute left-[15px]" src={userImage} alt="User Image" width={20} height={20} />
            <input defaultValue={user?.last_name} disabled className="w-full bg-slate-300 cursor-not-allowed opacity-50 p-2 rounded-lg border-none focus:outline-none pl-[45px] text-body-text" type="text" placeholder="Type Your Last Name" name="last_name" />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className='relative w-full'>
          <div className="flex items-center gap-2 mb-1">
            <Image className="absolute left-[15px]" src={EnvelopeImage} alt="User Image" width={20} height={20} />
            <input defaultValue={user?.email} disabled className="w-full bg-slate-300 cursor-not-allowed opacity-50 p-2 rounded-lg border-none focus:outline-none pl-[45px] text-body-text" type="email" placeholder="Type Your Email" name="email" />
          </div>
        </div>
      </div>
      <label htmlFor="msg">
        <textarea placeholder="Type Your Message" className="w-full rounded-lg resize-none h-[160px] border border-form" name="message" id="msg"></textarea>
        {state?.errors?.message && <span className="text-red-600">{state.errors.message[0]}</span>}
      </label>


      <button className="bg-mid-blue rounded-lg py-2 text-white disabled:opacity-50 disabled:cursor-not-allowed" disabled={pending}>
        {pending ? <span className="flex items-center justify-center gap-2">Loading <span className="loader"></span></span> : 'Send Message'}
      </button>
    </form>
  )
}
