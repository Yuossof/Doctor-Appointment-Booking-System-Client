'use client';

import { createContext, useContext, useState } from "react";

interface ISpecializationContext {
    specialization: number | '',
    setSpecialization: React.Dispatch<React.SetStateAction<number | ''>>
}

const specializationContext = createContext<ISpecializationContext | null>(null);

export default function SpecializationProvider({ children }: { children: React.ReactNode }) {
    const [specialization, setSpecialization] = useState<number | ''>('');
  return <specializationContext.Provider value={{ specialization, setSpecialization }}>{children}</specializationContext.Provider>
}

export const useSpecialization = () : ISpecializationContext | null => {
    return useContext(specializationContext);
}