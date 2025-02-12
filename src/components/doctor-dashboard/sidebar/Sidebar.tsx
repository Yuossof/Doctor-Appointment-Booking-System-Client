"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { LayoutGrid } from 'lucide-react'
import { CalendarDays } from 'lucide-react'
import { LogOut } from 'lucide-react'
import { User } from 'lucide-react'
import { Calendar } from 'lucide-react'

const Sidebar = () => {
    const pathname = usePathname()
    const links = [
        { name: "Dashboard", path: "/doctor-dashboard", icon: <LayoutGrid size={18} /> },
        { name: "Availability", path: "/doctor-dashboard/availability", icon: <CalendarDays size={18} /> },
        { name: "Reservations", path: "/doctor-dashboard/all-reservations", icon: <Calendar size={18} /> },
        { name: "Users", path: "/doctor-dashboard/users-table", icon: <User size={18} /> },
    ]

    return (
        <div className='h-auto fixed'>
            <div className='h-full '>
                <div className='flex flex-col gap-4'>
                    {links.map((lnk) => (
                        <Link
                            key={lnk.path}
                            className={`
                                text-md ${pathname === lnk.path ? "text-white" : "text-[#9da9bb]"}
                                flex items-center gap-3 }
                            `}
                            href={lnk.path}>
                            {lnk.icon}
                            <span>{lnk.name}</span>
                        </Link>
                    ))}
                    <button className='text-md text-[#9da9bb] flex items-center gap-3 hover:text-red-400'>
                        <LogOut size={18} />
                        <span>Logout</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Sidebar