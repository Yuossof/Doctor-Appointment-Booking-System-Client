"use client"
import { AvatarCmp } from '@/components/Avatar'
import { GetReservations } from '@/lib/services/doctor-dashboard/GetReservations'
import React, { useEffect, useState } from 'react'
import { UserProps } from '../users-table/TableRow'


interface Day {
    date: string
    day: string
}

interface Reservations {
    id: number | string
    status: string | null
    review: number | null
    payment_method: any
    is_paid: string | null
    day: Day
    user: UserProps
}

const ReservationsTable = () => {
    const [reservations, setReservations] = useState<Reservations[]>([])
    
    useEffect(() => {
        const asyncFunc = async () => {
            const data = await GetReservations() as Reservations[]
            setReservations(data)
        }
        asyncFunc()
    }, [])

    if (reservations.length === 0) {
        return (
            <div className='w-full flex justify-center'>
                <span className='text-gray-400 text-lg'>No Reservations.</span>
            </div>
        )
    }

    return (
        <div className=" rounded-md overflow-x-auto border border-gray-700 w-full">
            <table className="w-full overflow-x-auto">
                <thead className="bg-gray-800 text-white">
                    <tr className="text-gray-300">
                        <th className="px-4 py-3 text-left border-b border-gray-600">User</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">First Name</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Phone</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Email</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Time</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Status</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Date</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 text-gray-200">
                    {reservations.map((reservation, i) => (
                        <tr
                            key={reservation.id}
                            className={`hover:bg-orange-900 hover:bg-opacity-5 transition duration-200 ${i % 2 !== 0 ? "bg-orange-900 bg-opacity-15" : ""}`}>
                            <td className="px-4 py-3 border-b border-gray-700">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-300">{i+1}- </span>
                                    <AvatarCmp imgSrc={reservation.user.image_url} w={8} h={8} />
                                </div>
                            </td>
                            <td className="px-4 py-3 border-b border-gray-700">{reservation.user.first_name}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{reservation.user.phone}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{reservation.user.email}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{"09:00"}</td>
                            <td className="px-4 py-3 border-b border-gray-700 text-gray-400">
                                {reservation.status}
                            </td>
                            <td className="px-4 py-3 border-b border-gray-700 text-gray-300">
                                {reservation.day.date}/{reservation.day.day}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReservationsTable
