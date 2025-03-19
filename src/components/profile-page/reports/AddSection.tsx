"use client"
import { useAddReport } from '@/Context/AddReport'
import { Plus } from 'lucide-react'
import React from 'react'
import { motion } from 'framer-motion'

const AddSection = () => {
    const { setShowBox } = useAddReport() as { setShowBox: React.Dispatch<React.SetStateAction<boolean>> }

    return (
        <div className="w-full flex justify-between items-center mb-7">
            <motion.h1 
            initial={{ x: -20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="text-3xl font-semibold text-center  text-dark-blue">Medical Connections Hub</motion.h1>
            <motion.div            
            initial={{ x: 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
                onClick={() => setShowBox(true)}
                className="hover:bg-slate-100 rounded-full h-14 w-14 flex justify-center items-center cursor-pointer transition">
                <Plus size={30} className="text-gray-700" />
            </motion.div>
        </div>
    )
}

export default AddSection