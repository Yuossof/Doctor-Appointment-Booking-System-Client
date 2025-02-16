'use client';
import React, { createContext, useContext, useState } from 'react'

type TContext = {
    pageNumber: number,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
}

const PageNumContext = createContext<TContext | undefined>(undefined);

export default function DoctorsPagesNumber({ children }: { children: React.ReactNode }) {
    const [pageNumber, setPageNumber] = useState<number>(1);
  return <PageNumContext.Provider value={{ pageNumber, setPageNumber }}>{children}</PageNumContext.Provider>
}

export const usePageNumber = () : TContext | undefined => {
    return useContext(PageNumContext);
}