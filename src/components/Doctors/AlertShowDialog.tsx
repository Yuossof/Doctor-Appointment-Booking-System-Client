'use client';

import { Dispatch, SetStateAction } from "react";
import GetToken from "@/lib/services/auth/GetToken";
import axios from "axios";
import { useMessage } from "@/Context/AlertMessage";
import { useRouter } from "next/navigation";
import { GetUser } from "@/lib/services/auth/GetUser";
import { IUser } from "@/types/UserInformation";
import { motion, AnimatePresence } from "framer-motion";

interface DialogData {
    doctorId: number | undefined
    dayID: number,
    appointementId: number,
    setShowDialog: Dispatch<SetStateAction<boolean>>,
}

export default function AlertShowDialog({ doctorId, dayID, appointementId, setShowDialog }: DialogData) {
    const messageContext = useMessage();
    const router = useRouter()
    const handleShowDialog = () => setShowDialog(false);

    const handleReservation = async () => {
        const user: IUser = await GetUser();
        if (user && user.email_verified_at) {
            const token = await GetToken();
            try {
                const res = await axios.post('http://localhost:8000/api/reservations/store', {
                    appointment_id: appointementId,
                    doctor_id: doctorId,
                    day_id: dayID
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setShowDialog(prev => !prev);
                messageContext?.setMessage(res.data.message);
            } catch (error) {
                messageContext?.setMessage('You must select from today onwards and not a previous day.');
            }
        } else {
            router.replace('/login');
        }
    }
    return (
        <AnimatePresence>
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80, damping: 6 }}
                className="absolute flex flex-col gap-2 left-0 top-[20px] p-3 w-[100%] rounded-md shadow-lg bg-white z-20">
                <h1 className="text-mid-blue">Are you absolutely sure?</h1>
                <p className="text-body-text text-[12px]">This action cannot be undone. This will confirm that you have booked this appointment with your doctor.</p>
                <div className="ml-auto flex gap-2 items-center mt-2 text-[13px]">
                    <button onClick={handleShowDialog} className="bg-[#f9f9f9] rounded-md p-2 text-black shadow-md">Cancel</button>
                    <button onClick={handleReservation} className="bg-mid-blue rounded-md p-2 text-white">Countinue</button>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
