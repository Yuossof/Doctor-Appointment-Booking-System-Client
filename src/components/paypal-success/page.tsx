'use client'
import { useEffect } from "react";
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
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/paypal/success_paypal?token=${token}&PayerID=${PayerID}`);
                if (res.data.status === "COMPLETED") {
                    toastMessageContext?.setToastMessage("Payment Successful! Your reservation is confirmed.");
                    router.replace('/my-appointments');
                    return;
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    toastMessageContext?.setToastMessage(error?.response?.data?.message);
                } else {
                    console.error("Unknown error:", error);
                }
            }
        };

        verifyPayment();
    }, [token, PayerID, toastMessageContext, router]);

    return null;
}
