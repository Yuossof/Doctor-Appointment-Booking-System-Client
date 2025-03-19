'use client';
import React, { createContext, useContext, useState } from "react";

type TMethodContext = {
    paymentMethod: string;
    setPaymentMethod: React.Dispatch<React.SetStateAction<string>>;
};

const MethodContext = createContext<TMethodContext | null>(null);

export default function PaymentMethod({ children }: { children: React.ReactNode }) {
    const [paymentMethod, setPaymentMethod] = useState<string>('cache');

    return (
        <MethodContext.Provider value={{ paymentMethod, setPaymentMethod }}>
            {children}
        </MethodContext.Provider>
    );
}

export const usePaymentMethod = (): TMethodContext | null => {
    return useContext(MethodContext);
}