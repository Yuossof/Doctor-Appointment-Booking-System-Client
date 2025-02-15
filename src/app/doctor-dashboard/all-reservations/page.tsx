import ReservationsTable from '@/components/doctor-dashboard/reservations-table/ReservationsTable'
import React from 'react'

const page = () => {
  return (
    <div className='flex flex-col items-start'>
      <h1 className='text-2xl font-semibold text-slate-300 mb-7'>All Reservations</h1>
      <ReservationsTable />
    </div>
  )
}

export default page