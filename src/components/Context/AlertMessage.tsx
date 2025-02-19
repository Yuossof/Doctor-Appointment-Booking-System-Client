'use client';
import React, { createContext, use, useContext, useState } from "react";

type TMessageContext = {
    message: string | null;
    setMessage: React.Dispatch<React.SetStateAction<string | null>>;
};

const MessageContext = createContext<TMessageContext | null>(null);

export default function MessageProvider({ children }: { children: React.ReactNode }) {
    const [message, setMessage] = useState<string | null>(null);

    return (
        <MessageContext.Provider value={{ message, setMessage }}>
            {children}
        </MessageContext.Provider>
    );
}

export const useMessage = (): TMessageContext | null => {
    return useContext(MessageContext);
}