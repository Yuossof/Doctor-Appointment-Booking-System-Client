'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import GetToken from "@/lib/services/auth/GetToken";
import { motion } from "framer-motion";

export default function SuccessPaypal() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [message, setMessage] = useState("Verifying payment...");
    const token = searchParams.get('token');
    const PayerID = searchParams.get('PayerID');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!token || !PayerID) {
                setMessage("Invalid payment details.");
                return;
            }

            try {
                const res = await axios.get(`http://localhost:8000/api/paypal/success_paypal?token=${token}&PayerID=${PayerID}`);
                if (res.data.status === "COMPLETED") {
                    setMessage("Payment Successful! Your reservation is confirmed.");
                } else {
                    setMessage("Payment verification failed.");
                }
            } catch (error) {
                setMessage("Error verifying payment.");
            }
        };

        verifyPayment();
    }, [token, PayerID]);

    return (
        <div className='flex flex-col items-center justify-center h-[calc(100vh-125px)] md:h-[calc(100vh-150px)]'>
            <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3, ease: 'easeIn' }}
                className="bg-white p-6 rounded-md shadow-lg text-center">
                <motion.h1
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: [0.8, 1.1, 1], opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeIn' }}
                    className="text-2xl font-bold">{message}</motion.h1>
                <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3, ease: 'easeIn' }}
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md" onClick={() => router.push("/")}>
                    Go to Home
                </motion.button>
            </motion.div>
        </div>
    );
}
