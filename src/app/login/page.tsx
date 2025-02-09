import LoginForm from '@/components/Login/LoginForm'
import SignInformation from '@/components/SignInformation/SignInformation'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Login Form To Sign In'
}

export default function Login() {
  return (
    <div className='flex flex-col items-center justify-center'>
        <SignInformation method='Login' title='Welcome Back' 
        desc='Discover a better way of spandings with Uifry.' />
        <LoginForm/>
    </div>
  )
}
