'use client';
import React, { createContext, useContext, useState } from 'react'

type TContext = {
    pageNumber: number,
    deleteReview: boolean,
    setPageNumber: React.Dispatch<React.SetStateAction<number>>
    setDeleteReview: React.Dispatch<React.SetStateAction<boolean>>
}

const PageNumContext = createContext<TContext | undefined>(undefined);

export default function ReviewsPagesNumber({ children }: { children: React.ReactNode }) {
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [deleteReview, setDeleteReview] = useState(false);

  return <PageNumContext.Provider value={{ pageNumber, setPageNumber, deleteReview, setDeleteReview }}>{children}</PageNumContext.Provider>
}

export const usePageNumber = () : TContext | undefined => {
    return useContext(PageNumContext);
}