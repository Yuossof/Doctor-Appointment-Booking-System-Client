'use client'
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useToastMessage } from "@/Context/ToastMessage";

export default function SuccessStripe() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const toastMessageContext = useToastMessage();
    const sessionId = searchParams.get('session_id');


    useEffect(() => {
        const verifyPayment = async () => {
            if (!sessionId) return;
            
            try {
                const res = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/api/stripe/stripe_success?session_id=${sessionId}`);
                console.log(res.data)
                if (res.data.status === "COMPLETED") {
                    toastMessageContext?.setToastMessage("Payment Successful! Your reservation is confirmed.");
                    router.replace('/my-appointments');
                    return;
                }
            } catch (error) {
                if (axios.isAxiosError(error))
                toastMessageContext?.setToastMessage(error?.response?.data?.message);
            }
        };

        verifyPayment();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionId]);

    return null;
}
