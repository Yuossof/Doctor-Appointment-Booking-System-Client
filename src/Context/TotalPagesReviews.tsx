'use client';
import React, { createContext, useContext, useState } from 'react'

type TContext = {
    totalPage: number,
    setTotalPage: React.Dispatch<React.SetStateAction<number>>
}

const totalContext = createContext<TContext | undefined>(undefined);

export default function TotalPagesReviews({ children }: { children: React.ReactNode }) {
    const [totalPage, setTotalPage] = useState<number>(0);
  return <totalContext.Provider value={{ totalPage, setTotalPage }}>{children}</totalContext.Provider>
}

export const useTotalPagesReviews = () : TContext => {
    const context = useContext(totalContext);
    if(!context){
        throw new Error ('No Total Pages Context Here');
    }
    return context;
}