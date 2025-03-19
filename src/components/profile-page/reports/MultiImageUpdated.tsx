"use client"
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, X } from "lucide-react";
import { useDocsImage } from "@/Context/DocsImages";

interface Images {
    name: string,
    src: string
}

export default function MultiUpdate() {
    const inpRef = useRef<HTMLInputElement>(null)
    const [images, setImages] = useState<Images[]>([]);
    const docsImageContext = useDocsImage();
    
    useEffect(() => {
        if(docsImageContext?.successUpload){
            setImages([])
        }
    }, [docsImageContext?.successUpload])
    
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files || files.length === 0) return
        docsImageContext?.setImage(files);

        const imgs = Array.from(files);
        const newImages = imgs.map((file) => ({ src: URL.createObjectURL(file), name: file.name }));
        setImages((prevImages) => [...prevImages, ...newImages]);
    };

    const deleteImage = (src: string) => {
        const T = images.filter((img) => img.src !== src)
        setImages(T)
    }

    const clickOnInput = () => {
        inpRef.current?.click()
    }

    return (
        <div className="p-4 w-full flex flex-col items-center gap-6 h-full">
            <input
                ref={inpRef}
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageChange}
                className="mb-4 hidden"
            />
            <Button className="px-9 bg-mid-blue flex items-center gap-2" onClick={clickOnInput}>
                <span>
                    Upload Images
                </span>
                <Upload />
            </Button>
            <div className="grid grid-cols-3 gap-4 w-full max-h-60 overflow-auto">
                {images.map((image, index) => (
                    <div  key={image.src} className=" w-full h-32 border-[1px] border-blue-300 relative rounded-lg">
                        <div
                            onClick={()=>deleteImage(image.src)}
                            className="w-6 cursor-pointer
                           hover:bg-red-400 h-6 rounded-full
                            flex justify-center items-center
                          bg-red-500 text-white absolute
                            top-2 right-2 z-10">
                            <X size={15} />
                        </div>
                        <Image src={image.src} alt={`Uploaded ${index}`} layout="fill" objectFit="cover" className="rounded-lg" />
                    </div>
                ))}
            </div>
        </div>
    );
}
