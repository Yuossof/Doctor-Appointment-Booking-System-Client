import RecentAppointments from '@/components/doctor-dashboard/RecentAppointments'
import Topbar from '@/components/doctor-dashboard/Topbar'
import React from 'react'

const page = () => {
    return (
        <div>
            <Topbar />
            <RecentAppointments  />
        </div>
    )
}

export default page