import { AvatarCmp } from '@/components/Avatar'
import { Bell, Menu } from 'lucide-react'
import React from 'react'

const Header = () => {
    return (
        <header className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4'>
                <Menu size={35} className='text-slate-300'/>
                <h1 className='text-4xl text-blue-700 font-semibold'>LOGO</h1>
            </div>
            <div className='flex items-center gap-3'>
                <div className='relative p-1 cursor-pointer hover:opacity-85'>
                    <span className='w-2 h-2 rounded-full bg-red-500 absolute top-0 right-0'></span>
                    <Bell className='text-slate-400' size={25} />
                </div>  
                <AvatarCmp imgSrc='https://github.com/shadcn.png' w={8} h={8} />
            </div>
        </header>
    )
}

export default Header