'use client'
import React, { useEffect, useState } from 'react'
import SearchFormDcotor from './SearchFormDcotor'
import DoctorInformation from './DoctorInformation';
import { usePageNumber } from '../../Context/PageNumberDoctors';
import { IUser } from '@/types/UserInformation';
import { useSearchName } from '@/Context/DoctorsFilter/SearchForName';
import { useAge } from '@/Context/DoctorsFilter/DoctorsAge';
import { useGender } from '@/Context/DoctorsFilter/DoctorGender';
import { useAvilability } from '@/Context/DoctorsFilter/DoctorAvialbilty';
import { useSpecialization } from '@/Context/DoctorsFilter/DoctorSpecialization';
import { useSalary } from '@/Context/DoctorsFilter/DoctorSalary';

export default function MainContent() {
  const pageNumber = usePageNumber();
  const searchNameContext = useSearchName();
  const ageContext = useAge();
  const genderContext = useGender();
  const specializationContext = useSpecialization();
  const salaryContext = useSalary();
  const avilabilityContext = useAvilability();
  const [doctors, setDoctors] = useState<IUser[] | null>(null);
  const [totalPages, setTotalPages] = useState(1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/users/get-doctors?page=${pageNumber?.pageNumber}&&name=${searchNameContext?.searchName}&&age=${ageContext?.age}&&gender=${genderContext?.gender}&&availability=${avilabilityContext?.avilability}&&specialization_id=${specializationContext?.specialization}&&salary=${salaryContext?.salary}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          }
        });
        const data = await res.json();
        setDoctors(data?.data?.doctors?.data);
        setTotalPages(data?.data?.totalPages);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [pageNumber?.pageNumber, searchNameContext?.searchName, ageContext?.age, genderContext?.gender, avilabilityContext?.avilability, specializationContext?.specialization, salaryContext?.salary]);

  return (
    <main className='flex-1 p-2 rounded-lg'>
      <div className="flex items-center justify-between">
        <div className="flex gap-2 text-body-text">
          <h1 className='text-[18px] font-semibold'>All Specialities</h1>
          <span>{doctors && doctors.length > 1 ? doctors.length : 0} Doctors</span>
        </div>
        <SearchFormDcotor />
      </div>
      <DoctorInformation doctors={doctors} totalPages={totalPages} />
    </main>
  )
}
