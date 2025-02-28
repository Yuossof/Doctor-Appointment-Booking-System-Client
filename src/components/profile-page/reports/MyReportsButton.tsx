"use client"
import React from 'react'
import { Button } from '@/components/ui/button'
import { Sheet } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

const MyReportsButton = () => {
    const router = useRouter()
    const pathname = usePathname()
    
    return (
        <Button
            onClick={() => router.push(`${pathname}/reports`)}
            variant="outline" className="w-44 z-10 text-gray-800">
            <Sheet />
            <span>My Reports</span>
        </Button>
    )
}

export default MyReportsButton