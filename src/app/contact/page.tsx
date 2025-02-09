import ContactForm from '@/components/Contact/ContactForm'
import React from 'react'

export default function Contact() {
    return (
        <div className='flex flex-col md:mt-16 items-center justify-center'>
            <h1 className='text-dark-blue text-[35px] sm:text-[50px] font-semibold'>Contact Us</h1>
            <ContactForm />
        </div>
    )
}
