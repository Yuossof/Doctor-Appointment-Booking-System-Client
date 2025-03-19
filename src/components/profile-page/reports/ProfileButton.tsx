"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Sheet } from 'lucide-react'

const ProfileButton = ({ text } : { text: string }) => {
    return (
        <Button
            variant="outline" className="w-44 z-10 text-gray-800">
            <Sheet />
            <span>{text}</span>
        </Button>
    )
}

export default ProfileButton