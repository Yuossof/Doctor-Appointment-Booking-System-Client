"use client"
import React from 'react'
import RecentAppointments from './RecentAppointments'
import Topbar from './Topbar'
import { useState, useEffect } from 'react'
import { getDashboardData } from '@/lib/services/doctor-dashboard/dashboard-data'
import { Appointments } from '@/types/Appointments'
import { IUser } from '@/types/UserInformation'
export interface TodayReservation {
    id: number
    appointment: Appointments
    user: IUser
    status: string
}

const DashBoardWrapper = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [reviews, setReviews] = useState(0)
    const [weaklyEarnings, setWeaklyEarnings] = useState<number>(0)
    const [weaklyAppointment, setWeaklyAppointment] = useState(0)
    const [totalAppointmets, setTotalAppointments] = useState(0)
    const [todayUsers, setTodayUsers] = useState(0)
    const [firstReservations, setFirstReservations] = useState(0)
    const [todayReservations, setTodayReservations] = useState<TodayReservation[]>([])

    useEffect(() => {
        const getRv = async () => {
            setIsLoading(true)
            const res = await getDashboardData()
            setReviews(res.total_review)
            setWeaklyAppointment(res.weakly_appointments.length)
            setTotalAppointments(res.total_weakly_appointments)
            setFirstReservations(res.total_users_first_reservation)
            setTodayReservations(res.today_reservations)
            setTodayUsers(res.total_users_today)
            const sum = Object.values(res.weekly_earnings).reduce(
                (acc, day) => acc as number + (day as { total_price: number }).total_price || 0, 0)
            setWeaklyEarnings(sum as number)

            setIsLoading(false)

            // await getFeeses()
        }
        getRv()
    }, [])
    return (
        <>
            <Topbar todayUsers={todayUsers} todayReservations={todayReservations} firstReservations={firstReservations} isLoading={isLoading} reviews={reviews} weaklyEarnings={weaklyEarnings} weaklyAppointment={weaklyAppointment} totalAppointmets={totalAppointmets} />
            <RecentAppointments todayReservations={todayReservations} />
        </>
    )
}

export default DashBoardWrapper