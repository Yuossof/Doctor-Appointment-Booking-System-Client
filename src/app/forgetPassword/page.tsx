import ForgetPasswordForm from '@/components/ForgetPassword/ForgetPasswordForm';
import { Metadata } from 'next';
import React from 'react'

interface ForgetPasswordProps {
    searchParams: Record<string, string | undefined>;
}

export const metadata: Metadata = {
    title: 'Forget Password',
    description: 'Forget Password'
}

export default async function ForgetPassword({ searchParams }: ForgetPasswordProps) {
    const email = searchParams?.email || '';
  return (
    <div className='flex flex-col items-center justify-center h-[calc(100vh-80px)]'>
        <h1 className='text-dark-blue text-[50px] font-semibold'>Forget Password</h1>
        <ForgetPasswordForm  email={email}/>
    </div>
  )
}
