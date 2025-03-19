'use client';
import { Doc } from '@/types/Docs';
import React, { createContext, useContext, useState } from 'react'

type TContext = {
    showBox: boolean,
    showBoxUpdate: boolean,
    doc: Doc | null,
    setShowBox: React.Dispatch<React.SetStateAction<boolean>>,
    setShowBoxUpdate: React.Dispatch<React.SetStateAction<boolean>>,
    setDoc: React.Dispatch<React.SetStateAction<Doc | null>>
}

const AddReportContext = createContext<TContext | undefined>(undefined);

export default function AddReport({ children }: { children: React.ReactNode }) {
    const [showBox, setShowBox] = useState<boolean>(false);
    const [showBoxUpdate, setShowBoxUpdate] = useState<boolean>(false);
    const [doc, setDoc] = useState<Doc | null>(null)

    return <AddReportContext.Provider value=
        {{
            showBox, setShowBox,
            showBoxUpdate, setShowBoxUpdate,
            doc, setDoc
        }}>{children}</AddReportContext.Provider>
}

export const useAddReport = (): TContext | undefined => {
    return useContext(AddReportContext);
}