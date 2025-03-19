'use client';

import { useAddReport } from "@/Context/AddReport";
import GetToken from "@/lib/services/auth/GetToken";
import { Doc } from "@/types/Docs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function ActionReport({ doc }: { doc: Doc }) {
    const router = useRouter();
    const showBox = useAddReport();

    const handleDelete = async () => {
        const token = await GetToken();
        try {
            const res = await axios.delete(`http://localhost:8000/api/user_documentations/delete/${doc?.id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            router.push('/profile/reports');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {doc && (
                <div className="flex items-center justify-end gap-4 p-5 text-white">
                    <motion.button
                        initial={{ x: -20, opacity: 0 }}  
                        whileInView={{ x: 0, opacity: 1, }} 
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        onClick={handleDelete} className="px-6 py-2 bg-red-500 rounded-md">Delete</motion.button>
                    <motion.button
                        initial={{ x: 20, opacity: 0 }}  
                        whileInView={{ x: 0, opacity: 1, }} 
                        transition={{ duration: 0.5, ease: 'easeInOut' }}
                        onClick={() => {
                            showBox?.setShowBoxUpdate(true)
                            showBox?.setDoc(doc)
                        }} className="px-6 py-2 bg-yellow-400 rounded-md">Edit</motion.button>
                </div>
            )}
        </>
    )
}
