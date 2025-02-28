"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { useAddUserAndDoctor } from '@/Context/AddUserAndDoctor'
import { Button } from '../ui/button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
} from '../ui/select'

export const AddUserBox = () => {
    const { showBox, setShowBox } = useAddUserAndDoctor() as { showBox: boolean, setShowBox: React.Dispatch<React.SetStateAction<boolean>> }

    return (
        <>
            {showBox && (
                <div
                    onClick={() => setShowBox(false)}
                    className='fixed top-0 bottom-0 right-0 left-0 bg-opacity-80 bg-black z-50 flex justify-center'>
                    <div className='w-full flex justify-center items-start'>
                        <motion.div
                            onClick={(eo) => eo.stopPropagation()}
                            initial={{ y: '-100vh', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className='bg-slate-800 shadow-lg w-2/5 rounded-md px-4 py-7 mt-48 relative'
                        >
                            <X onClick={() => setShowBox(false)} className='absolute top-2 right-2 cursor-pointer text-gray-300' size={18} />
                            <h2 className='text-gray-300 text-xl'>Add New User</h2>
                            <div className='w-full flex flex-col gap-5 mt-4'>
                                <Input
                                    type='text'
                                    placeholder='Name'
                                    className='bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300'
                                />
                                <Input
                                    type='text'
                                    placeholder='Email'
                                    className='bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300'
                                />
                                <Input
                                    type='text'
                                    placeholder='Password'
                                    className='bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300'
                                />
                                <div>
                                    <Select value="specialist">
                                        <SelectTrigger className='bg-slate-800 border-slate-600 ring-0 focus:ring-1 focus:ring-offset-0  outline-none text-gray-300'>
                                            <SelectValue>{"Role"}</SelectValue>
                                        </SelectTrigger>
                                        <SelectContent className='bg-slate-800 border-[1px] border-gray-600'>
                                            <SelectGroup>
                                                {/* <SelectLabel className='text-gray-400'>Gender</SelectLabel> */}
                                                <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="male">User</SelectItem>
                                                <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="male">Admin</SelectItem>
                                                <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="male">Super Admin</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <Button className='mt-5 w-full'>Add</Button>
                        </motion.div>
                    </div>
                </div>
            )}
        </>
    )
}

