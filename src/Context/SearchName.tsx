'use client';
import React, { createContext, useContext, useState } from "react";

type TSearchContext = {
    searchName: string;
    setSearchName: React.Dispatch<React.SetStateAction<string>>;
};

const SearchContext = createContext<TSearchContext | null>(null);

export default function SearchName({ children }: { children: React.ReactNode }) {
    const [searchName, setSearchName] = useState<string>('');

    return (
        <SearchContext.Provider value={{ searchName, setSearchName }}>
            {children}
        </SearchContext.Provider>
    );
}

export const useSearchName = (): TSearchContext | null => {
    return useContext(SearchContext);
}