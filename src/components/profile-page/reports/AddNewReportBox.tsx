"use client"
import React from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import MultiImageUploader from '@/components/MultiImageUploader'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'
import { useAddReport } from '@/Context/AddReport'

const AddNewReportBox = () => {
    const { showBox, setShowBox } = useAddReport() as { showBox: boolean, setShowBox: React.Dispatch<React.SetStateAction<boolean>> }

    return (
        <>
            {showBox && (
                <div

                    onClick={() => setShowBox(false)}
                    className='fixed top-0 bottom-0 right-0 left-0 bg-opacity-80 bg-black z-50 flex justify-center'>
                    <div className='w-full flex justify-center items-start'>
                        <motion.div
                            onClick={(eo) => eo.stopPropagation()}
                            initial={{ y: '-100vh', opacity: 0}}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className='bg-slate-100 w-2/5 rounded-md px-4 py-7 mt-48 relative'
                        >
                            <X onClick={() => setShowBox(false)} className='absolute top-2 right-2 cursor-pointer' size={18} />
                            <div className='w-full flex flex-col gap-3 mt-4'>
                                <Input type='text' placeholder='Report Name' />
                                <Textarea placeholder='Report Description' />
                            </div>
                            <div
                                className='w-full
                            min-h-28 bg-gray-200 
                            mt-4 rounded-md flex 
                            justify-center items-center
                            border-dashed border-2 border-blue-300'
                            >
                                <MultiImageUploader />
                            </div>

                        </motion.div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddNewReportBox