'use client';
import React, { createContext, useContext, useState } from "react";


type TDImageContext = {
    showReportImage: boolean;
    imageNumber: number;
    image: string;
    setShowReportImage: React.Dispatch<React.SetStateAction<boolean>>;
    setImageNumber: React.Dispatch<React.SetStateAction<number>>;
    setImage: React.Dispatch<React.SetStateAction<string>>;
};

const ReportImageContext = createContext<TDImageContext | null>(null);

export default function ReportImageProvider({ children }: { children: React.ReactNode }) {
    const [showReportImage, setShowReportImage] = useState<boolean>(false);
    const [imageNumber, setImageNumber] = useState(0);
    const [image, setImage] = useState('');
    return (
        <ReportImageContext.Provider value={{ 
        imageNumber, setImageNumber, image,
        showReportImage, setShowReportImage , setImage
        }}>
            {children}
        </ReportImageContext.Provider>
    );
}

export const useShowReportImage = (): TDImageContext | null => {
    return useContext(ReportImageContext);
}