'use client';

import { useEffect } from "react";
import { useToastMessage } from "../../Context/ToastMessage";
import Cookie from 'cookie-universal'

type Message = {
    message: string | undefined
}

export default function UpdateMessage( { message }:  Message ) {
    const context = useToastMessage();
    const cookieStore = Cookie();

    useEffect(() => {
        const cookieMessage = cookieStore.get('message');
        if(cookieMessage && message && context){
            context.setToastMessage(message);
        }
    }, []);
    
    return null
}
