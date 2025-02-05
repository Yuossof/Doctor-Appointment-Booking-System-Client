import React from 'react'
import CheckEmailForm from '@/components/CheckEmail/CheckEmailForm';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Check Email',
    description: 'Verification Your Email'
}

export default function CheckEmail() {
    return (
        <div className='flex flex-col items-center justify-center h-[calc(100vh-80px)]'>
            <h1 className='text-dark-blue text-[50px] font-semibold'>Check Email</h1>
            <CheckEmailForm />
        </div>
    )
}
