'use client';

import { createContext, useContext, useState } from "react";

interface ISearchContext {
    searchName: string,
    setSearchName: React.Dispatch<React.SetStateAction<string>>
}

const searchContext = createContext<ISearchContext | null>(null);

export default function SearchForName({ children }: { children: React.ReactNode }) {
    const [searchName, setSearchName] = useState<string>('');
  return <searchContext.Provider value={{ searchName, setSearchName }}>{children}</searchContext.Provider>
}

export const useSearchName = () : ISearchContext | null => {
    return useContext(searchContext);
}