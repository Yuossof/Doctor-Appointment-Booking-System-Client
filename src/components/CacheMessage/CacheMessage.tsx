'use client';
import { useToastMessage } from "@/Context/ToastMessage";
import { motion } from "framer-motion";
import {  useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaDeleteLeft } from "react-icons/fa6";

export default function CacheMessage() {
    const toastMessageContext = useToastMessage();
    const [showMessage, setShowMessage] = useState(true);
    // const searchParams = useSearchParams()
    const router = useRouter();

    const handleClick = (e: React.MouseEvent<SVGAElement>) => {
        e.stopPropagation();
        setShowMessage(prev => !prev);
    }

    useEffect(() => {
        const removeToastMessage = () => {
            setShowMessage(false);
        }

        window.addEventListener('click', removeToastMessage);

        return () => window.removeEventListener('click', removeToastMessage);
    }, [])

    return (
        <>
            {toastMessageContext?.toastMessage && showMessage && (
                <motion.div

                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [1.1, 1], opacity: 1 }}
                    transition={{ duration: 0.8, ease: 'easeInOut', type: 'spring', stiffness: 150 }}
                    className="flex items-center justify-center fixed left-0 top-0 w-full h-screen bg-[#fffffff7] z-[100]">
                    <motion.div
                        onClick={(e) => e.stopPropagation()}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: [1.1, 1], opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: 'easeInOut', type: 'spring', stiffness: 150 }}
                        className="relative bg-white rounde-md shadow-2xl p-6 text-center basis-[40%]">
                        <FaDeleteLeft onClick={handleClick} 
                        className="absolute right-0 top-0 text-mid-blue w-[25px] h-[25px] cursor-pointer hover:text-red-400 transition-all duration-300 ease-in"/>
                        <h1 className="text-2xl font-bold">{ toastMessageContext?.toastMessage }</h1>
                        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => router.push("/")}>
                            Go to Home
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </>
    )
}
