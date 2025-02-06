"use client"
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'
import { Menu } from 'lucide-react'
import { usePathname } from 'next/navigation'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const Header = () => {
    const links = [
        { title: "Home", to: "/" },
        { title: "Services", to: "/services" },
        { title: "Blogs", to: "/blogs" },
        { title: "About", to: "/about" },
        { title: "Contact", to: "/contact" },
    ]
    const pathname = usePathname()

    return (
        <>
            {/* LG */}
            <div className={`${pathname === "/" ? "bg-light-blue" : "bg-light-blue"} hidden items-center sm:hidden lg:flex md:flex justify-between h-[80px] rounded-md px-7`}>
                <h1 className="font-semibold text-[35px] text-dark-blue">LOGO</h1>
                <div>
                    <ul className='flex items-center gap-[38px] '>
                        {links.map((lnk, i) => (
                            <li
                                key={i}
                                className={`${pathname === lnk.to ? "text-dark-blue font-semibold" : "text-gray-700"}`}>
                                <Link href={lnk.to}>{lnk.title}</Link>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className='flex items-center gap-5'>
                    <Avatar className='w-11 h-11'>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <Button className='bg-mid-blue h-[48px]'>Book Now</Button>
                </div>
            </div>

            {/* SM */}
            <div className='lg:hidden md:hidden px-5'>
                <div className='w-full flex items-center justify-between'>
                    <h1 className="font-semibold text-[35px] text-dark-blue">LOGO</h1>
                    <div className='bg-mid-blue rounded-lg p-3'>
                        <Menu className='text-light-blue' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header