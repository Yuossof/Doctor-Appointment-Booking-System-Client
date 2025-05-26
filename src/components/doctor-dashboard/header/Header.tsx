import React from 'react'
import { DropdownMenuCheckboxes } from './DropdownMenu'

const Header = () => {
    return (
        <header className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4'>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img  src={"/images/logo.jpeg"} alt='logo' className='rounded-full w-[60px] h-[60px]' />
            </div>
            <div className='flex items-center gap-4'>
                <div>
                    <DropdownMenuCheckboxes />
                </div>
            </div>
        </header>
    )
}

export default Header