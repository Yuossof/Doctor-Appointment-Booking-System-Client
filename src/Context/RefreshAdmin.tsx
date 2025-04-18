'use client';
import React, { createContext, useContext, useState } from 'react'

type TContext = {
    refresh: boolean,
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>
}

const RefreshContext = createContext<TContext | undefined>(undefined);

export default function Refresh({ children }: { children: React.ReactNode }) {
    const [refresh, setRefresh] = useState<boolean>(false);
  return <RefreshContext.Provider value={{ refresh , setRefresh }}>{children}</RefreshContext.Provider>
}

export const useRefresh = () : TContext | undefined => {
    return useContext(RefreshContext);
}