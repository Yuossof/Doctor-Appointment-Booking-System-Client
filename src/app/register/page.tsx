import RegisterForm from '@/components/Register/RegisterForm'
import SignInformation from '@/components/SignInformation/SignInformation'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Register',
    description: 'Registration Form To Sign Up'
}

export default function page() {

return (
    <div className='flex flex-col mt-16 items-center justify-center'>
        <SignInformation method='Sign Up' title='Create An Account' 
        desc='Discover a better way of spandings with Uifry.' />
        <RegisterForm/>
    </div>
)
}
