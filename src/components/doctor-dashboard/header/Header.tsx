import { Bell, Menu } from 'lucide-react'
import React from 'react'
import { DropdownMenuCheckboxes } from './DropdownMenu'

const Header = () => {
    return (
        <header className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4'>
                <Menu size={35} className='text-slate-300' />
                <h1 className='text-4xl text-blue-700 font-semibold'>LOGO</h1>
            </div>
            <div className='flex items-center gap-4'>
                <div className='relative p-1 cursor-pointer hover:opacity-85'>
                    <span className='w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0'></span>
                    <Bell className='text-slate-400' size={25} />
                </div>
                <div>
                    <DropdownMenuCheckboxes />
                </div>
            </div>
        </header>
    )
}

export default Header