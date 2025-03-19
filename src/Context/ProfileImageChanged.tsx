'use client';
import React, { createContext, useContext, useEffect, useState } from "react";

type TImageContext = {
    image: string | undefined;
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ImageContext = createContext<TImageContext | null>(null);

export default function ImageProfileChanged({ children }: { children: React.ReactNode }) {
    
    const [image, setImage] = useState<string | undefined>(undefined);
    
    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    );
}

export const useImageProfileChanged = (): TImageContext | null => {
    return useContext(ImageContext);
}