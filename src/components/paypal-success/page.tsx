'use client'
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useToastMessage } from "@/Context/ToastMessage";

export default function SuccessPaypal() {
    const router = useRouter();
    const toastMessageContext = useToastMessage();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const PayerID = searchParams.get('PayerID');

    useEffect(() => {
        const verifyPayment = async () => {
            if (!token || !PayerID) return;
        
            try {
                const res = await axios.get(`http://localhost:8000/api/paypal/success_paypal?token=${token}&PayerID=${PayerID}`);
                if (res.data.status === "COMPLETED") {
                    toastMessageContext?.setToastMessage("Payment Successful! Your reservation is confirmed.");
                    router.replace('/my-appointments');
                } 
            } catch (error) {
                toastMessageContext?.setToastMessage("Error verifying payment.");
            }
        };

        verifyPayment();
    }, [token, PayerID]);

    return null;   
}
