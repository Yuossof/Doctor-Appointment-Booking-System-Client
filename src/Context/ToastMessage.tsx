'use client';
import React, { createContext, useContext, useState } from "react";

type TMessageContext = {
    toastMessage: string | null;
    setToastMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

const ToastMessageContext = createContext<TMessageContext | null>(null);

export default function ToastMessageProvider({ children }: { children: React.ReactNode }) {
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    return (
        <ToastMessageContext.Provider value={{ toastMessage, setToastMessage }}>
            {children}
        </ToastMessageContext.Provider>
    );
}

export const useToastMessage = (): TMessageContext | null => {
    return useContext(ToastMessageContext);
}