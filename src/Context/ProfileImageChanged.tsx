'use client';
import React, { createContext, useContext, useState, useEffect } from "react";

type TImageContext = {
    image: string;
    setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ImageContext = createContext<TImageContext | null>(null);

export default function ImageProfileChanged({ children }: { children: React.ReactNode }) {
    
    const [image, setImage] = useState<string>("");
    useEffect(()=> {
        console.log(image)
    }, [])
    return (
        <ImageContext.Provider value={{ image, setImage }}>
            {children}
        </ImageContext.Provider>
    );
}

export const useImageProfileChanged = (): TImageContext | null => {
    return useContext(ImageContext);
}