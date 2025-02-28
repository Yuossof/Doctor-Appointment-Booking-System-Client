"use client"
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'

interface LinksProps {
    name: string;
    path: string;
    icon: React.JSX.Element
}

const Sidebar = ({ links }: {links: LinksProps[]}) => {
    const pathname = usePathname()

    return (
        <div className='h-auto fixed'>
            <div className='h-full '>
                <div className='flex flex-col gap-4'>
                    {links.map((lnk: LinksProps) => (
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