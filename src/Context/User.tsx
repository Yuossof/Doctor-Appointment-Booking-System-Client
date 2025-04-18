'use client';
import React, { createContext, useContext, useEffect, useState } from "react";
import Cookie from 'cookie-universal';

type UData = {
    id: number,
    first_name: string,
    last_name: string,
    email: string,
    phone?: string,
    gender: string,
    image_url?: string,
    address?: string,
    city?: string,
    email_verified_at?: string | null,
    role?: string,
    clinic_address?: string
}

type UContext = {
    user: UData | null,
    setUser: React.Dispatch<React.SetStateAction<UData | null>>
};

const UserContext = createContext<UContext | null>(null);

export default function UserProvider({ children }: { children: React.ReactNode }) {
    const cookie = Cookie();
    const [user, setUser] = useState<UData | null>(null);
    const userCookie = cookie.get('data')?.user || null;
    
    useEffect(() => {
        if(userCookie){
            setUser({
                id: userCookie.id,
                phone: userCookie.phone,
                address: userCookie.address,
                city: userCookie.city,
                email: userCookie.email,
                first_name: userCookie.first_name,
                last_name: userCookie.last_name,
                image_url: userCookie.image_url,
                gender: userCookie.gender,
                role: userCookie?.role,
                email_verified_at: userCookie?.email_verified_at
            })
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export const useUser = (): UContext | null => {
    return useContext(UserContext);
}