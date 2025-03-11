"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Sheet } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const ProfileButton = ({text, path}: {text: string, path: string}) => {
    const router = useRouter()
    const pathname = usePathname()
    
    return (
        <Button
            onClick={() => router.push(`${pathname}/${path}`)}
            variant="outline" className="w-44 z-10 text-gray-800">
            <Sheet />
            <span>{text}</span>
        </Button>
    )
}

export default ProfileButton