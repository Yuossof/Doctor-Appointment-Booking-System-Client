import React from 'react'
import { DropdownMenuCheckboxes } from './DropdownMenu'
import Link from 'next/link'

const Header = () => {
    return (
        <header className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4'>
                <Link href={'/'} className='text-4xl text-blue-700 font-semibold'>LOGO</Link>
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