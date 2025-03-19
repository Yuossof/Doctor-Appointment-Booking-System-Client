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
import { motion } from 'framer-motion';

export default function MainContent() {
  const pageNumber = usePageNumber();
  const searchNameContext = useSearchName();
  const ageContext = useAge();
  const genderContext = useGender();
  const specializationContext = useSpecialization();
  const salaryContext = useSalary();
  const avilabilityContext = useAvilability();
  const [doctors, setDoctors] = useState<IUser[] | undefined>(undefined);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_BASE_URL}/api/users/get-doctors?page=${pageNumber?.pageNumber}&&name=${searchNameContext?.searchName}&&age=${ageContext?.age}&&gender=${genderContext?.gender}&&availability=${avilabilityContext?.avilability}&&specialization_id=${specializationContext?.specialization}&&salary=${salaryContext?.salary}`, {
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
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 items-center justify-between">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, type: 'spring', stiffness: 80, damping: 5 }}
          className="flex gap-1 md:gap-2 text-body-text">
          <h1 className='text-[18px] sm:text-[16px] md:text-[18px] font-semibold'>All Specialities</h1>
          <span>{doctors && doctors.length > 1 ? doctors.length : 0} Doctors</span>
        </motion.div>
        <SearchFormDcotor />
      </div>
      <DoctorInformation doctors={doctors} totalPages={totalPages} />
    </main>
  )
}
