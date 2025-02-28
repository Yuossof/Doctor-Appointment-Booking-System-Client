"use client"
import { useAddReport } from '@/Context/AddReport'
import { Plus } from 'lucide-react'
import React from 'react'

const AddSection = () => {
    
    const { setShowBox } = useAddReport() as { setShowBox: React.Dispatch<React.SetStateAction<boolean>> }

    return (
        <div className="w-full flex justify-between items-center mb-7">
            <h1 className="text-3xl font-semibold text-center  text-gray-400">Medical Connections Hub</h1>
            <div
                onClick={() => setShowBox(true)}
                className="hover:bg-slate-600 rounded-full h-14 w-14 flex justify-center items-center cursor-pointer transition text-gray-300">
                <Plus size={30} className="text-gray-400" />
            </div>
        </div>
    )
}

export default AddSection