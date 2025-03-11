'use client'
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Cookie from 'cookie-universal';
import Image from 'next/image';
import sucessImage from '@/../public/images/check.png';
import { motion } from 'framer-motion';
import { childeDiv, parentDiv } from '@/components/ParentAndChildAnimation';

export default function GoogleCallback() {

    const searchParams = useSearchParams();
    const cookieStore = Cookie();
    const router = useRouter();

    useEffect(() => {
        const data = searchParams.get('data');

        if (!data) return router.push('/login');

        cookieStore.set('data', data);

        setTimeout(() => {
            redirect('/');
        }, 500);

    }, []);

    return (
        <motion.div
            variants={parentDiv}
            initial='hidden'
            whileInView='visible'
            className='flex flex-col h-[calc(100vh-125px)] md:h-[calc(100vh-150px)] items-center justify-center gap-4 container'>
            <motion.div
                variants={childeDiv}
            >
                <Image src={sucessImage} height={120} width={120} priority alt='Login Successfully' />
            </motion.div>
            <motion.h1
                variants={childeDiv}
                className='text-[60px] font-semibold text-dark-blue'>Login Successfully</motion.h1>
        </motion.div>
    );
} 