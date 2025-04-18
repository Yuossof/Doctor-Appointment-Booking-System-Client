'use client'
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import Cookie from 'cookie-universal';
import Image from 'next/image';
import sucessImage from '@/../public/images/check.png';
import { motion } from 'framer-motion';
import { childeDiv, parentDiv } from '@/components/ParentAndChildAnimation';
import { useUser } from '@/Context/User';
import { IUser } from '@/types/UserInformation';

export default function GoogleCallback() {

    const searchParams = useSearchParams();
    const userContext = useUser();
    const cookieStore = Cookie();
    const router = useRouter();

    useEffect(() => {
        const data = searchParams.get('data');

        if (!data) return router.push('/login');

        cookieStore.set('data', data);
        const user: IUser = JSON.parse(data)?.user;
        userContext?.setUser(user);

        setTimeout(() => {
            if (user?.role === 'admin'){
                router.replace('/admin');
            } else if (user?.role === 'doctor' && !user?.clinic_address){
                router.replace('/doctor-dashboard/profile');
            } else if (user?.role === 'doctor' && user?.clinic_address){
                router.replace('/doctor-dashboard')
            }else if (user?.role === 'user' && !user?.phone){
                router.replace('/profile');
            } else if (user?.role === 'user' && user?.phone){
                router.replace('/');
            }
        }, 1000);

        // eslint-disable-next-line react-hooks/exhaustive-deps
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