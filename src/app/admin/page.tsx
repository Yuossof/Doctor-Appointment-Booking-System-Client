import TodayAppointments from '@/components/admin/TodayAppointments'
import Topbar from '@/components/admin/Topbar'
import UsersMakedReservation from '@/components/admin/UsersMakedReservation'
import React from 'react'

const page = () => {
  return (
    <div>
      <Topbar />
      <TodayAppointments />
      <div className='mt-6'>
        <UsersMakedReservation />
      </div>
    </div>
  )
}

export default page