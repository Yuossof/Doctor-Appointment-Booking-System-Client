import Header from '@/components/doctor-dashboard/header/Header'
import Sidebar from '@/components/doctor-dashboard/sidebar/Sidebar'
import { LayoutGrid, User } from 'lucide-react'
import { MdFolderSpecial } from "react-icons/md";
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {

    const links = [
        { name: "Dashboard", path: "/admin", icon: <LayoutGrid size={18} /> },
        { name: "Users", path: "/admin/users", icon: <User size={18} /> },
        { name: "Doctors", path: "/admin/doctors", icon: <User size={18} /> },
        { name: "Specializations", path: "/admin/specializations", icon: <MdFolderSpecial size={18} /> },
    ]

    return (
        <div className='bg-slate-900 w-full'>
            <div className='container px-[15px] md:px-[30px] lg:px-[120px] xl:px-[180px]'>
                <div className='h-20 flex items-center w-full sticky top-0 bg-slate-900 bg-opacity-95 z-50'>
                    <Header />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[190px_1fr] gap-4 min-h-[calc(100vh-80px)]'>
                    <div className='md:block hidden mt-6'>
                        <Sidebar links={links} />
                    </div>
                    <main className='mt-6 overflow-hidden'>{children}</main>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout