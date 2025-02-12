import React from 'react'
import SearchFormDcotor from './SearchFormDcotor'
import { GetDoctors } from './GetDoctors';
import { IUser } from '@/types/UserInformation';
import DoctorInformation from './DoctorInformation';

export default async function MainContent() {
    const doctors: IUser[] = await GetDoctors();
  return (
    <main className='flex-1 p-2 rounded-lg'>
        <div className="flex items-center justify-between">
            <div className="flex gap-2 text-body-text">
                <h1 className='text-[18px] font-semibold'>All Specialities</h1>
                <span>{ doctors && doctors.length > 1 ? doctors.length : 1 } Doctors</span>
            </div>
            <SearchFormDcotor/>
        </div>
        <DoctorInformation doctors={doctors}/>
    </main>
  )
}
