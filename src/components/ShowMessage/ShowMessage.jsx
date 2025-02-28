'use client'
import React, { useEffect, useState } from 'react';
import { useToastMessage } from '../../Context/ToastMessage';
import Cookie from 'cookie-universal';

export default function ShowMessage() {
    const context = useToastMessage();
    const cookieStore = Cookie();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (context?.toastMessage) {
            setShow(prev => !prev);
        }
        
        const timer = setTimeout(() => {
            setShow(false);
            cookieStore.remove('message');
        }, 3000);

        return () => clearTimeout(timer);
    }, [context?.toastMessage, cookieStore]);

    return (
        <>
            <div className={` ${show ? 'top-[140px]'  : 'top-[-100%]'} absolute left-1/2 transform -translate-x-1/2 text-white bg-mid-blue px-10 py-2 rounded-md transition-all duration-300 ease-in-out`}>
                {context?.toastMessage}
            </div>

        </>
    )
}
