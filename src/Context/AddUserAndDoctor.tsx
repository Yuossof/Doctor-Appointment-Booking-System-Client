'use client';
import React, { createContext, useContext, useState } from 'react'

type TContext = {
    showBox: boolean,
    setShowBox: React.Dispatch<React.SetStateAction<boolean>>
}

const AddUserAndDoctorContext = createContext<TContext | undefined>(undefined);

export default function AddUserAndDoctor({ children }: { children: React.ReactNode }) {
    const [showBox, setShowBox] = useState<boolean>(false);
  return <AddUserAndDoctorContext.Provider value={{ showBox , setShowBox }}>{children}</AddUserAndDoctorContext.Provider>
}

export const useAddUserAndDoctor = () : TContext | undefined => {
    return useContext(AddUserAndDoctorContext);
}