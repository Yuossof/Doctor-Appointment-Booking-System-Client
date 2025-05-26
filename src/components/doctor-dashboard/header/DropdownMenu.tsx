'use client'
import {
    LogOut,
    User,
} from "lucide-react"

import { FaHome } from "react-icons/fa";
import Link from "next/link";
import Cookie from 'cookie-universal';
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion"
import { useToastMessage } from "@/Context/ToastMessage";
import { useUser } from "@/Context/User";
import GetToken from "@/lib/services/auth/GetToken";
import { AvatarCmp } from "@/components/Avatar";
import { useRegetImage } from "@/store/useRegetImage";

export function DropdownMenuCheckboxes() {
    const {reget} = useRegetImage()
    const cookieStore = Cookie();
    const messageContext = useToastMessage();
    const userContext = useUser();
    const router = useRouter()
    const [showBox, setShowBox] = useState<boolean>(false)

    const handleLogout = async () => {
        const token = await GetToken();
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/logout`, {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if (res.ok) {
            cookieStore.removeAll();
            messageContext?.setToastMessage('Logout Successfully');
            userContext?.setUser(null);
            router.push('/login');
        }
    }

    const clickOnItem = (isLogout: boolean) => {
        if (isLogout) handleLogout()
        setShowBox(false)
    }

    useEffect(() => {
        const closeDropdown = () => setShowBox(false);
        window.addEventListener("click", closeDropdown);
    
        return () => window.removeEventListener("click", closeDropdown);
    }, []);
    
    
    return (
        <>
            {(userContext?.user && userContext?.user.email_verified_at !== null) && (
                <div>
                    <div onClick={(eo)=> eo.stopPropagation()} className="relative">
                        <button onClick={(eo) => {
                            eo.stopPropagation()
                            setShowBox(!showBox)
                        }} className="outline-none">
                            <AvatarCmp imgSrc={reget || userContext?.user?.image_url} w={8} h={8} />
                        </button>
                        {showBox && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                className="bg-slate-800 absolute top-11 -right-4 p-3 rounded-md shadow-lg w-[250px] flex flex-col gap-2 z-30">
                                <Link
                                    onClick={() => clickOnItem(false)} href={"/"}
                                    className="flex items-center gap-3 text-gray-300 hover:bg-slate-700 px-3 py-2 rounded-md transition-all">
                                    <FaHome size={22} />
                                    <span className="text-md">Home</span>
                                </Link>
                                <Link
                                    onClick={() => clickOnItem(false)} href={userContext?.user?.role == 'doctor' ? "/doctor-dashboard/profile" : '/admin/profile'}
                                    className="flex items-center gap-3 text-gray-300 hover:bg-slate-700 px-3 py-2 rounded-md transition-all">
                                    <User size={22} />
                                    <span className="text-md">Profile</span>
                                </Link>
                                <div className="w-full h-[1px] bg-gray-600"></div>
                                <button
                                    onClick={() => clickOnItem(true)}
                                    className="flex items-center gap-3 text-red-500 px-3 py-2 rounded-md hover:bg-slate-700 transition-all">
                                    <LogOut size={22} />
                                    <span className="text-md">Logout</span>
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}
