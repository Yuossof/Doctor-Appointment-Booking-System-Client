import Header from '@/components/doctor-dashboard/header/Header'
import Sidebar from '@/components/doctor-dashboard/sidebar/Sidebar'
import React from 'react'
import { User } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { LayoutGrid } from 'lucide-react'
import { CalendarDays } from 'lucide-react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    
    const links = [
        { name: "Dashboard", path: "/doctor-dashboard", icon: <LayoutGrid size={18} /> },
        { name: "Availability", path: "/doctor-dashboard/availability", icon: <CalendarDays size={18} /> },
        { name: "Reservations", path: "/doctor-dashboard/all-reservations", icon: <Calendar size={18} /> },
        { name: "Users", path: "/doctor-dashboard/users-table", icon: <User size={18} /> },
    ]

    
    

    return (
        <div className='bg-slate-900 w-full'>
            <div className='container px-[15px] md:px-[30px] lg:px-[120px] xl:px-[180px]'>
                <div className='h-20 flex items-center w-full sticky top-0 bg-slate-900 bg-opacity-95 z-50'>
                    <Header />
                </div>
                <div className='grid grid-cols-1 md:grid-cols-[250px_1fr] gap-4 min-h-[calc(100vh-80px)]'>
                    <div className='md:block hidden mt-6 '>
                        <Sidebar links={links} />
                    </div>
                    <main className='mt-6 overflow-hidden'>{children}</main>
                </div>
            </div>
        </div>
    )
}

export default DashboardLayout