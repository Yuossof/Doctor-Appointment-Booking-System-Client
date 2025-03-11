'use client';

import { Dispatch, SetStateAction, useState } from "react";
import GetToken from "@/lib/services/auth/GetToken";
import axios from "axios";
import { useMessage } from "@/Context/AlertMessage";
import { useRouter } from "next/navigation";
import { GetUser } from "@/lib/services/auth/GetUser";
import { IUser } from "@/types/UserInformation";
import { motion } from "framer-motion";
import './styles.css';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface DialogData {
    doctorId: number | undefined
    dayID: number,
    appointementId: number,
    setShowDialog: Dispatch<SetStateAction<boolean>>,
}

const methods = [
    { type: 'Cache', value: 'cache' },
    { type: 'Paypal', value: 'paypal' },
    { type: 'Stripe', value: 'stripe' },
]

export default function AlertShowDialog({ doctorId, dayID, appointementId, setShowDialog }: DialogData) {
    const messageContext = useMessage();
    const [appointementPending, setAppointemetnPending] = useState(false);
    const [paymentPending, setpaymentPending] = useState(false);
    const router = useRouter()
    const handleShowDialog = () => setShowDialog(false);
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const [reservationId, setReservationId] = useState();
    const [paymentMethod, setPaymentMethod] = useState('cache')

    const handleReservation = async () => {
        const user: IUser = await GetUser();
        if (user && user.email_verified_at) {
            const token = await GetToken();
            try {
                setAppointemetnPending(true);
                const res = await axios.post('http://localhost:8000/api/reservations/store', {
                    appointment_id: appointementId,
                    doctor_id: doctorId,
                    day_id: dayID
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setReservationId(res.data.data.reservation_id);
                setAppointemetnPending(false);

                // messageContext?.setMessage(res.data.message);
                setShowPaymentMethod(prev => !prev);
            } catch (error) {
                setAppointemetnPending(false);
                messageContext?.setMessage('You must select from today onwards and not a previous day.');
            }
        } else {
            router.replace('/login');
        }
    }

    const hadlePaymentValue = (value: string) => { setPaymentMethod(value) }

    const handlePaymentMethod = async () => {
        try {
            setpaymentPending(true);
            const token = await GetToken();
            const res = await axios.get(`http://localhost:8000/api/paypal/create/${reservationId}?payment_method=${paymentMethod}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            if (res.status === 200) {
                console.log(res.data)
                setpaymentPending(false);
                router.push(res.data.data.approval_url);
            }
        } catch (error) {
            setpaymentPending(false);
        }
    }
    return (
        <>
            {showPaymentMethod && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 80, damping: 6 }}
                    className="absolute flex flex-col gap-2 left-0 top-[20px] p-3 w-[100%] rounded-md shadow-lg bg-white z-[100]">
                    <h1 className="text-mid-blue">Choose Your Payment Method</h1>

                    <Select defaultValue={'cache'} onValueChange={hadlePaymentValue}>
                        <SelectTrigger>
                            <SelectValue placeholder="cache" />
                        </SelectTrigger>
                        <SelectContent>
                            {methods.map((method) => (
                                <SelectItem
                                    key={method.type}
                                    value={method.value}
                                >
                                    {method.type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <button onClick={handlePaymentMethod} disabled={paymentPending} className={`${paymentPending ? 'opacity-50' : 'opacity-100'} bg-mid-blue rounded-md p-2 text-white flex items-center justify-center`}>
                        {paymentPending ? <span className="flex items-center gap-1">Loading <span className="loader"></span></span> : 'Countinue'}
                    </button>
                </motion.div>
            )}
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                transition={{ duration: 0.6, type: 'spring', stiffness: 80, damping: 6 }}
                className={`${showPaymentMethod && 'hidden'} absolute flex flex-col gap-2 left-0 top-[20px] p-3 w-[100%] rounded-md shadow-lg bg-white z-[100]`}>
                <h1 className="text-mid-blue">Are you absolutely sure?</h1>
                <p className="text-body-text text-[12px]">This action cannot be undone. This will confirm that you have booked this appointment with your doctor.</p>
                <div className="ml-auto flex gap-2 items-center mt-2 text-[13px]">
                    <button onClick={handleShowDialog} className="bg-[#f9f9f9] rounded-md p-2 text-black shadow-md">Cancel</button>
                    <button onClick={handleReservation} disabled={appointementPending} className={`${appointementPending ? 'opacity-50' : 'opacity-100'} bg-mid-blue rounded-md p-2 text-white`}>
                        {appointementPending ? <span className="flex items-center gap-1">Loading <span className="loader"></span></span> : 'Countinue'}
                    </button>
                </div>
            </motion.div>
        </>
    )
}
