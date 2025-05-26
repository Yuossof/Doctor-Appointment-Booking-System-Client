"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { DropdownMenuCheckboxes } from './DropdownMenu'
import { Button } from '../ui/button'
import { useUser } from '../../Context/User'
import { motion } from 'framer-motion'
import { parentDiv } from '../ParentAndChildAnimation'
import GetToken from '@/lib/services/auth/GetToken'
import Cookie from "cookie-universal"
import { useToastMessage } from '@/Context/ToastMessage'
import { useRouter } from 'next/navigation'

const divVariants = {

    hidden: {
        y: 50,
    },
    visible: {
        y: 0,
        transition: {
            duration: 2,
            type: 'spring', stiffness: 150, damping: 8,
            staggerChildren: 0.3
        }
    }
}

const childVariants = {
    hidden: {
        opacity: 0,
        y: 50
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.9, type: 'spring'
        }
    }
}

const Header = () => {
    const router = useRouter()
    const [showHeader, setShowHeader] = useState(false)
    const pathname = usePathname();
    const cookieStore = Cookie();
    const messageContext = useToastMessage();

    const isDashboard = (
        pathname.startsWith("/doctor-dashboard") ||
        pathname.startsWith("/admin")
    )

    useEffect(()=> {
    
    },[])

    const userContext = useUser();

    const handleLogout = async () => {
        const token = await GetToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (res.ok) {
            cookieStore.removeAll();
            messageContext?.setToastMessage('Logout Successfully');
            userContext?.setUser(null);
            router.push('/login');
        }
    }

    const links = [
        { title: "Home", to: "/" },
        { title: "Services", to: "/services" },
        { title: "Doctors", to: "/doctors" },
        { title: "About", to: "/about-us" },
        { title: "Contact", to: "/contact" },
    ]

    const links_mobile = [
        { title: "Home", to: "/" },
        { title: "Services", to: "/services" },
        { title: "Doctors", to: "/doctors" },
        { title: "About", to: "/about-us" },
        { title: "Contact", to: "/contact" },
    ]


    if (isDashboard) return;

    return (
        <>
            {/* LG */}
            <div className="my-[35px] container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px] z-50">
                <div className="bg-light-blue hidden items-center sm:hidden lg:flex md:flex justify-between h-[80px] rounded-md px-7">
                    <motion.img whileInView={{ x: 0, opacity: 1 }} initial={{ x: -50, opacity: 0 }} transition={{ duration: 3, type: 'spring', stiffness: 50 }} variants={parentDiv} src={"/images/logo.jpeg"} alt='logo' className='rounded-full w-[60px] h-[60px]' />

                    <motion.ul
                        variants={divVariants} initial='hidden' animate='visible'
                        className='flex items-center gap-[38px]'>
                        {links.map((lnk, i) => (
                            <motion.li
                                variants={childVariants}

                                whileHover={{ color: '#011632', transition: { duration: 0.7 } }}
                                key={i} className={`${pathname === lnk.to ? "text-dark-blue font-semibold" : "text-gray-700"}`}>
                                <Link href={lnk.to}>{lnk.title}</Link>
                            </motion.li>
                        ))}
                    </motion.ul>
                    <motion.div
                        initial={{ x: 50, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, ease: 'easeOut' }}
                        className='flex items-center gap-5'>
                        <DropdownMenuCheckboxes />

                        {!userContext?.user?.email_verified_at && (
                            <div className='flex items-center gap-2'>
                                <Button asChild className='bg-mid-blue py-6 px-6'>
                                    <Link href="/register">Register</Link>
                                </Button>
                                <Button asChild variant={"outline"} className='py-6 px-6 hover:bg-slate-50'>
                                    <Link href="/login">Login</Link>
                                </Button>
                            </div>
                        )}

                    </motion.div>
                </div>

                {/* SM  */}
                <div className='lg:hidden md:hidden px-5 bg-white'>
                    <div className='w-full flex items-center justify-between'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={"/images/logo.jpeg"} className='rounded-full w-[60px] h-[60px]' alt='logo' />
                        <div onClick={() => setShowHeader(true)} className='bg-mid-blue rounded-lg p-3 hover:bg-primary cursor-pointer'>
                            <Menu className='text-light-blue' />
                        </div>
                    </div>

                    {showHeader && (
                        <div onClick={() => setShowHeader(false)} className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40'>
                            <div className='w-full flex justify-center items-center h-[55vh]'>
                                <div onClick={(eo) => eo.stopPropagation()} className='mt-14 relative bg-slate-50 rounded-md w-[85%] p-6'>
                                    <div onClick={() => setShowHeader(false)} className='absolute top-3 right-3 p-2 hover:opacity-85 cursor-pointer'>
                                        <X />
                                    </div>
                                    <div>
                                        <ul className='flex flex-col justify-center gap-7'>
                                            {links_mobile.map((lnk, i) => (

                                                <li
                                                    onClick={() => setShowHeader(false)}
                                                    key={i} className={`${pathname === lnk.to ? "text-mid-blue font-semibold" : "text-gray-700"} w-full`}>
                                                    <Link className='w-full' href={lnk.to}>{lnk.title}</Link>
                                                </li>
                                            ))}
                                            {!userContext?.user?.email ? (
                                                <>

                                                    <li
                                                        onClick={() => setShowHeader(false)}
                                                        className={`${pathname === "register" ? "text-mid-blue font-semibold" : "text-gray-700"} w-full`}>
                                                        <Link href={"/register"} className='w-full'>Register</Link>
                                                    </li>
                                                    <li
                                                        onClick={() => setShowHeader(false)}
                                                        className={`${pathname === "login" ? "text-mid-blue font-semibold" : "text-gray-700"} w-full`}>
                                                        <Link href={"/login"} className='w-full'>Login</Link>
                                                    </li>
                                                </>
                                            ) : (
                                                <button
                                                    onClick={() => {
                                                        setShowHeader(false)
                                                        handleLogout()
                                                    }}
                                                    className='text-white bg-red-500 py-2 rounded-md hover:bg-red-400 font-semibold'>
                                                    Logout
                                                </button>
                                            )}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default Header

