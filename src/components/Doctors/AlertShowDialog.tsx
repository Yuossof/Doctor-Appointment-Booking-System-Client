'use client';

import { Dispatch, SetStateAction } from "react";
import GetToken from "../GetToken/GetToken";
import axios from "axios";
import { useMessage } from "../Context/AlertMessage";
import { useRouter } from "next/navigation";
import { GetUser } from "../GetUser/GetUser";
import { IUser } from "@/types/UserInformation";

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
                console.log(error);
            }
        } else {
            router.replace('/login');
        }
    }
    return (
        <div className="absolute flex flex-col gap-2 left-1/2 top-1/2 transform -translate-y-1/2 -translate-x-1/2 p-3 w-[100%] scale-100 transition-all duration-300 ease-in-out rounded-md shadow-lg bg-white z-20">
            <h1 className="text-mid-blue">Are you absolutely sure?</h1>
            <p className="text-body-text text-[12px]">This action cannot be undone. This will confirm that you have booked this appointment with your doctor.</p>
            <div className="ml-auto flex gap-2 items-center mt-2 text-[13px]">
                <button onClick={handleShowDialog} className="bg-[#f9f9f9] rounded-md p-2 text-black shadow-md">Cancel</button>
                <button onClick={handleReservation} className="bg-mid-blue rounded-md p-2 text-white">Countinue</button>
            </div>
        </div>
    )
}
