import React from 'react'
import { DropdownMenuCheckboxes } from './DropdownMenu'
import { motion } from "framer-motion"
import { parentDiv } from '@/components/ParentAndChildAnimation'

const Header = () => {
    return (
        <header className='flex justify-between items-center w-full'>
            <div className='flex items-center gap-4'>
                <motion.img whileInView={{ x: 0, opacity: 1 }} initial={{ x: -50, opacity: 0 }} transition={{ duration: 3, type: 'spring', stiffness: 50 }} variants={parentDiv} src={"/images/logo.jpeg"} alt='logo' className='rounded-full w-[60px] h-[60px]' />
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