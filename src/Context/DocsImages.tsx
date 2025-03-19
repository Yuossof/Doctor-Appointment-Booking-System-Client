'use client';
import React, { createContext, useContext, useState } from "react";


type TDImageContext = {
    image: FileList | null;
    setImage: React.Dispatch<React.SetStateAction<FileList | null>>;
    successUpload: boolean;
    setSuccessUpload: React.Dispatch<React.SetStateAction<boolean>>;
};

const docsImageContext = createContext<TDImageContext | null>(null);

export default function DocsImageProvider({ children }: { children: React.ReactNode }) {
    const [image, setImage] = useState<FileList | null>(null);
    const [successUpload, setSuccessUpload] = useState<boolean>(false);

    return (
        <docsImageContext.Provider value={{ image, setImage, successUpload, setSuccessUpload }}>
            {children}
        </docsImageContext.Provider>
    );
}

export const useDocsImage = (): TDImageContext | null => {
    return useContext(docsImageContext);
}