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
import { usePaymentMethod } from "@/Context/PaymentMethod";
import { loadStripe } from "@stripe/stripe-js";
import { useToastMessage } from "@/Context/ToastMessage";
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

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
    const toastMessageContext = useToastMessage();

    const [appointementPending, setAppointemetnPending] = useState(false);
    const [paymentPending, setpaymentPending] = useState(false);
    const router = useRouter()
    const handleShowDialog = () => setShowDialog(false);
    const [showPaymentMethod, setShowPaymentMethod] = useState(false);
    const [reservationId, setReservationId] = useState();
    const paymentMethod = usePaymentMethod();

    const handleReservation = async () => {
        const user: IUser = await GetUser();
        if (user && user.email_verified_at) {
            const token = await GetToken();
            try {
                setAppointemetnPending(true);
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations/store`, {
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
                setShowPaymentMethod(prev => !prev);
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setAppointemetnPending(false);
                    messageContext?.setMessage('You must select from today onwards and not a previous day.');
                } else {
                    console.error("Unknown error:", error);
                }
            }
        } else {
            router.replace('/login');
        }
    }

    const hadlePaymentValue = (value: string) => { paymentMethod?.setPaymentMethod(value) }

    const handlePaymentMethod = async () => {
        if (paymentMethod?.paymentMethod === 'paypal') {
            try {
                setpaymentPending(true);
                const res = await axios.get(`${process.env.NEXT_BASE_URL}/api/paypal/create/${reservationId}?payment_method=${paymentMethod?.paymentMethod}`)
                if (res.status === 200) {
                    setpaymentPending(false);
                    router.push(res.data.data.approval_url);
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setpaymentPending(false);
                } else {
                    console.error("Unknown error:", error);
                }
            }
        } else if (paymentMethod?.paymentMethod === 'stripe') {
            setpaymentPending(true);
            try {
                const stripe = await stripePromise;
                if (!stripe) {
                    console.error("Stripe failed to load.");
                    return;
                }
                const { data } = await axios.post(`${process.env.NEXT_BASE_URL}/api/stripe/create-checkout-session`, {
                    reservation_id: reservationId
                });
                await stripe.redirectToCheckout({ sessionId: data.sessionId });
            } catch (error) {

                if (axios.isAxiosError(error)) {
                    setpaymentPending(false);
                } else {
                    console.error("Unknown error:", error);
                }
            }
        } else {
            try {
                setpaymentPending(true);
                const res = await axios.get(`${process.env.NEXT_BASE_URL}/api/cache/create/${reservationId}`)
                if (res.status === 200) {
                    setpaymentPending(false);
                    toastMessageContext?.setToastMessage(res.data.data.message);
                    router.push('my-appointments');
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setpaymentPending(false);
                } else {
                    console.error("Unknown error:", error);
                }
            }
        }
    }

    return (
        <>
            {showPaymentMethod && (
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [1.1, 1], opacity: 1 }}
                    transition={{ duration: 0.6, ease: 'easeInOut' }}
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
                whileInView={{ scale: [1.1, 1], opacity: 1 }}
                transition={{ duration: 0.6, ease: 'easeInOut' }}
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
