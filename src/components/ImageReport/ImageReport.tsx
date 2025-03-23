'use client';
import { useShowReportImage } from "@/Context/DoctorsFilter/ShowReportImage";
import GetToken from "@/lib/services/auth/GetToken";
import { Doc } from "@/types/Docs";
import axios from "axios";
import { X } from "lucide-react";
import Image from "next/image"
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

interface ID {
    image: {
        id: number,
        image_url: string
    },
    doc: Doc
}

export default function ImageReport({ image, doc }: ID) {

    const showImage = useShowReportImage();
    const router = useRouter();

    const handleDeleteImage = async (id: number) => {
        console.log(id)
        const token = await GetToken();
        try {
            await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user_documentations/deleteImage/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            router.push('/profile/reports');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <motion.div
            initial={{ scale: 0.5, opacity: 0, y: 20 }}  
            whileInView={{ scale: [1.2, 1], opacity: 1, y: 0 }}  
            transition={{ duration: 0.5, type: 'spring', stiffness: 80, damping: 10 }}
            className="w-full relative mt-4" >
            <X onClick={() => handleDeleteImage(image?.id)} className="absolute right-0 top-[-23px] rounded-md cursor-pointer bg-red-500 text-white" />
            <div className="w-[300px] h-[300px] md:w-[500px] md:h-[500px] lg:w-[500px] lg:h-[500px] aspect-square">
                <Image
                    onClick={(e) => {
                        showImage?.setShowReportImage(prev => !prev);
                        showImage?.setImageNumber(image?.id);
                        showImage?.setImage(image?.image_url);
                        e.stopPropagation();
                    }}
                    src={image?.image_url}
                    alt={`Medical report for ${doc?.user?.first_name + ' ' + doc?.user?.last_name}`}
                    fill
                    className="object-center rounded-lg shadow-md border-2 cursor-pointer"
                />
            </div>
        </motion.div>
    )
}
