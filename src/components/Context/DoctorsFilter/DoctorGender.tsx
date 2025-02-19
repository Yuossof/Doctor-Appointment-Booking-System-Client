'use client';

import { createContext, useContext, useState } from "react";

interface IGenderContext {
    gender: string,
    setGender: React.Dispatch<React.SetStateAction<string>>
}

const genderContext = createContext<IGenderContext | null>(null);

export default function GenderProvider({ children }: { children: React.ReactNode }) {
    const [gender, setGender] = useState<string>('');
  return <genderContext.Provider value={{ gender, setGender }}>{children}</genderContext.Provider>
}

export const useGender = () : IGenderContext | null => {
    return useContext(genderContext);
}