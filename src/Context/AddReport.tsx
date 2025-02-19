'use client';
import React, { createContext, useContext, useState } from 'react'

type TContext = {
    showBox: boolean,
    setShowBox: React.Dispatch<React.SetStateAction<boolean>>
}

const AddReportContext = createContext<TContext | undefined>(undefined);

export default function AddReport({ children }: { children: React.ReactNode }) {
    const [showBox, setShowBox] = useState<boolean>(false);
  return <AddReportContext.Provider value={{ showBox , setShowBox }}>{children}</AddReportContext.Provider>
}

export const useAddReport = () : TContext | undefined => {
    return useContext(AddReportContext);
}