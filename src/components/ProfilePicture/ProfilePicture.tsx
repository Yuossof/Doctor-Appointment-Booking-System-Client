'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Camera } from 'lucide-react'
import { motion } from "framer-motion"
import { useImageProfileChanged } from "@/Context/ProfileImageChanged"
import { useProfileImageRef } from "@/Context/RefImageProfile"
import { IUser } from "@/types/UserInformation"

export default function ProfilePicture({ user }: { user: IUser }) {

    const imageProfileChanged = useImageProfileChanged();
    const ref = useProfileImageRef();

    const handleClick = () => {
        if (ref?.current) {
            ref.current.click();
        }
    };

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end absolute -top-16 sm:-top-20 inset-x-4 sm:inset-x-8">
            <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: [1.1, 1], opacity: 1 }}
                transition={{ duration: 0.5,  type: 'spring', stiffness: 70, damping: 7 }}
            className="relative mb-4 sm:mb-0">
                <Avatar className="w-32 h-32 border-4 border-white">
                    <AvatarImage className="object-cover" src={imageProfileChanged?.image || user.image_url} alt='Profile Picture' />
                </Avatar>
                <Button
                    onClick={handleClick}
                    variant="secondary"
                    size="icon"
                    className="absolute bottom-0 right-0 rounded-full bg-white hover:bg-gray-100"
                >
                    <Camera className="h-4 w-4" />
                    <span className="sr-only">Change profile picture</span>
                </Button>
            </motion.div>
        </div>
    )
}
