import ContactForm from '@/components/Contact/ContactForm'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
    title: 'Contact'
}

export default function Contact() {
    return (
        <div className='flex flex-col md:mt-16 items-center justify-center'>
            <ContactForm />
        </div>
    )
}
