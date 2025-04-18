"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import { X } from 'lucide-react'
import { useAddUserAndDoctor } from '@/Context/AddUserAndDoctor'
import { useRefresh } from '@/Context/RefreshAdmin'
import { IMakeSpecialization, ISpecialization } from '@/types/Admin/AddSpecialization'
import AddActionSpecialization from '@/lib/services/Admin/AddActionSpecialization'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
} from '../ui/select'

const initialState = {
    errors: {},
    data: {} as ISpecialization,
    success: false,
    message: ''
}

export const AddSpecialization = () => {
    const [state, action, pending] = useActionState<IMakeSpecialization, FormData>(AddActionSpecialization, initialState);
    const { showBox, setShowBox } = useAddUserAndDoctor() as { showBox: boolean, setShowBox: React.Dispatch<React.SetStateAction<boolean>> }
    const [message, setMessage] = useState<string | null>(null);
    const refreshContext = useRefresh();

    useEffect(() => {
        if (state?.message && state?.success) {
            setMessage(state?.message);
            refreshContext?.setRefresh(prev => !prev);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.success, state?.message]);

    useEffect(() => {
        setTimeout(() => {
            if (message) {
                setMessage(null);
                setShowBox(false);
            }
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message]);

    return (
        <>
            {showBox && (
                <div
                    onClick={() => setShowBox(false)}
                    className='fixed top-0  left-0 w-full h-full bg-opacity-80 bg-black z-50 flex justify-center'>
                    <div className='absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2'>
                        <motion.div
                            onClick={(eo) => eo.stopPropagation()}
                            initial={{ y: '-100vh', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className='bg-slate-800 shadow-lg w-full rounded-md px-4 py-7 '
                        >
                            {message &&
                                <div className="bg-green-400 text-white w-full rounded-md p-1 my-2 text-center">
                                    <span>{message}</span>
                                </div>
                            }
                            <X onClick={() => setShowBox(false)} className='absolute top-2 right-2 cursor-pointer text-gray-300' size={18} />
                            <h2 className='text-gray-300 text-xl'>Add New Specialization</h2>
                            <form action={action}>
                                <div className='w-full flex flex-col gap-5 mt-4'>
                                    <div>
                                        <Input
                                            type='text'
                                            name='name_en'
                                            defaultValue={state?.data?.name_en}
                                            placeholder='Name'
                                            className='bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300'
                                        />
                                        {state?.errors?.name_en && <span className='text-red-500'>{state.errors.name_en[0]}</span>}
                                    </div>
                                    <div>
                                        <Select name='is_deleted' defaultValue={state?.data?.is_deleted}>
                                            <SelectTrigger className='bg-slate-800 border-slate-600 ring-0 focus:ring-1 focus:ring-offset-0  outline-none text-gray-300'>
                                                <SelectValue placeholder='Status' />
                                            </SelectTrigger>
                                            <SelectContent className='bg-slate-800 border-[1px] border-gray-600'>
                                                <SelectGroup>
                                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="1">Active</SelectItem>
                                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="0">Un Active</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                        {state?.errors?.is_deleted && <span className='text-red-500'>{state.errors.is_deleted[0]}</span>}
                                    </div>
                                </div>
                                <button disabled={pending} className={`${pending ? 'opacity-50' : 'opacity-100'} bg-mid-blue rounded-md w-1/4 py-2 flex items-center justify-center  mt-4 mx-auto text-white`}>
                                    {pending ? <span className="flex items-center gap-1">Loading <span className="loader"></span></span> : 'Add'}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            )}
        </>
    )
}

