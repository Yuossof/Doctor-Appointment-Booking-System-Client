'use client'
import React, { useEffect, useState } from 'react'
import { AddAvailabilityForm } from './AddAvailabilityForm'
import { RecentAvailability } from './RecentAvailability'
import { GetAllAppointmens } from '@/lib/services/doctor-dashboard/getAllAppointments'
import { Day, WeaklyAppointments } from '@/types/Appointments'

export interface Data {
    weakly_appointments: WeaklyAppointments[]
    days: Day[]
}

const AvailablitityWrapper = () => {
    const [data, setData] = useState<Data | null>(null)
    const [reget, setReget] = useState(false)

    useEffect(() => {
        const getReservations = async () => {
            const res = await GetAllAppointmens()
            // setAppointmentData(res)
            setData(res)
            console.log(res)
        }
        getReservations()
    }, [reget])

    return (
        <div>
            {data && (
                <>
                    <div>
                        <h2 className="text-2xl font-semibold mb-4 text-slate-300">Add New Availability</h2>
                        <AddAvailabilityForm setReget={setReget} days={data?.days} reget={reget}/>
                    </div>
                    <div className="mt-12">
                        <h2 className="text-2xl font-semibold mb-4 text-slate-300">Recently Added Availability</h2>
                        <RecentAvailability weaklyAppointments={data?.weakly_appointments} />
                    </div>
                </>
            )}
        </div>
    )
}

export default AvailablitityWrapper