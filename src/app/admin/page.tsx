import AdminsTable from '@/components/admin/AdminsTable'
import TodayAppointments from '@/components/admin/TodayAppointments'
import Topbar from '@/components/admin/Topbar'
import UsersMakedReservation from '@/components/admin/UsersMakedReservation'
import React from 'react'

const page = () => {
  return (
    <div>
      <Topbar />
      <TodayAppointments />
      <div className='flex gap-4 items-start mt-6'>
        <AdminsTable />
        <UsersMakedReservation />
      </div>
    </div>
  )
}

export default page