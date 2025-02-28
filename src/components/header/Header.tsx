"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { AvatarCmp } from '../Avatar'
import { DropdownMenuCheckboxes } from './DropdownMenu'
import { Button } from '../ui/button'
import { useUser } from '../../Context/User'

const Header = () => {
    const [showHeader, setShowHeader] = useState(false)
    const pathname = usePathname();
    const isDashboard = (
        pathname.startsWith("/doctor-dashboard") ||
        pathname.startsWith("/admin")
    )

    const userContext = useUser();

    const links = [
        { title: "Home", to: "/" },
        { title: "Services", to: "/services" },
        { title: "Doctors", to: "/doctors" },
        { title: "About", to: "/about-us" },
        { title: "Contact", to: "/contact" },
    ]

    if (isDashboard) return null;

    return (
        <>
            {/* LG */}
            <div className="my-[35px] container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
                <div className="bg-light-blue hidden items-center sm:hidden lg:flex md:flex justify-between h-[80px] rounded-md px-7">
                    <h1 className="font-semibold text-[35px] text-dark-blue">LOGO</h1>
                    <div>
                        <ul className='flex items-center gap-[38px]'>
                            {links.map((lnk, i) => (
                                <li key={i} className={`${pathname === lnk.to ? "text-dark-blue font-semibold" : "text-gray-700"}`}>
                                    <Link href={lnk.to}>{lnk.title}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className='flex items-center gap-5'>
                        <DropdownMenuCheckboxes AvatarCmp={AvatarCmp} />
                        {userContext?.user && (
                            <div className='flex items-center gap-2'>
                                <Button asChild className='bg-mid-blue py-6 px-6'>
                                    <Link href="/register">Register</Link>
                                </Button>
                                <Button asChild variant={"outline"} className='py-6 px-6 hover:bg-slate-50'>
                                    <Link href="/login">Login</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </div>

                {/* SM  */}
                <div className='lg:hidden md:hidden px-5 bg-white'>
                    <div className='w-full flex items-center justify-between'>
                        <h1 className="font-semibold text-[35px] text-dark-blue">LOGO</h1>
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
                                            {links.map((lnk, i) => (
                                                <li key={i} className={`${pathname === lnk.to ? "text-mid-blue font-semibold" : "text-gray-700"}`}>
                                                    <Link href={lnk.to}>{lnk.title}</Link>
                                                </li>
                                            ))}
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

