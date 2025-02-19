'use client';
import { IUser } from '@/types/UserInformation';
import React, { createContext, useContext, useState } from 'react'

type TContext = {
    doctor: IUser,
    setDoctor: React.Dispatch<React.SetStateAction<IUser>>
}

const DoctorContext = createContext<TContext | null>(null);

export default function Doctors({ children }: { children: React.ReactNode }) {
    const [doctor, setDoctor] = useState<IUser>({} as IUser);
    return <DoctorContext.Provider value={{ doctor, setDoctor }}>{children}</DoctorContext.Provider>
}

export const useDoctor = (): TContext => {
    const context = useContext(DoctorContext);
    if (!context) {
        throw new Error("useDoctor must be used within a Doctors provider");
    }
    return context;
}