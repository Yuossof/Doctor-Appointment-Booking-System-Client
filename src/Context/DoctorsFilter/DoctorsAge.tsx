'use client';

import { createContext, useContext, useState } from "react";

interface IAgeContext {
    age: number | '',
    setAge: React.Dispatch<React.SetStateAction<number | ''>>
}

const ageContext = createContext<IAgeContext| null>(null);

export default function AgeProvider({ children }: { children: React.ReactNode }) {
    const [age, setAge] = useState<number | ''>('');
  return <ageContext.Provider value={{ age, setAge }}>{children}</ageContext.Provider>
}

export const useAge = () : IAgeContext  | null => {
    return useContext(ageContext);
}