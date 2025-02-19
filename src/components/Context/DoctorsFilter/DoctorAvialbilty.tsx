'use client';

import { createContext, useContext, useState } from "react";

interface IAvilablityContext {
    avilability: string,
    setAvilability: React.Dispatch<React.SetStateAction<string>>
}

const avilabilityContext = createContext<IAvilablityContext | null>(null);

export default function AvilabilityProvider({ children }: { children: React.ReactNode }) {
    const [avilability, setAvilability] = useState<string>('');
  return <avilabilityContext.Provider value={{ avilability, setAvilability }}>{children}</avilabilityContext.Provider>
}

export const useAvilability = () : IAvilablityContext | null => {
    return useContext(avilabilityContext);
}