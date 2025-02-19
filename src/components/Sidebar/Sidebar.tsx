'use client'
import React, { useEffect, useState } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import { CiFilter } from "react-icons/ci";
import { PiGraduationCapLight, PiGenderIntersex } from "react-icons/pi";
import GetToken from '../../lib/services/auth/GetToken';
import axios from 'axios';
import { IoMdAlarm } from "react-icons/io";
import { GiTakeMyMoney } from "react-icons/gi";
import { IoAnalyticsSharp } from "react-icons/io5";
import { useAge } from '@/Context/DoctorsFilter/DoctorsAge';
import { useGender } from '@/Context/DoctorsFilter/DoctorGender';
import { useAvilability } from '@/Context/DoctorsFilter/DoctorAvialbilty';
import { useSpecialization } from '@/Context/DoctorsFilter/DoctorSpecialization';
import { useSalary } from '@/Context/DoctorsFilter/DoctorSalary';

const informations = [
  { image: <PiGraduationCapLight />, title: 'Specialitie', type: 'specialization' },
  { image: <PiGenderIntersex />, title: 'Gender', type: 'gender' },
  { image: <IoMdAlarm />, title: 'Availability', type: 'avilable' },
  { image: <GiTakeMyMoney />, title: 'Salary', type: 'salary' },
  { image: <IoAnalyticsSharp />, title: 'Age', type: 'age' },
];

const gender = [
  { title: 'Any', value: 'all' },
  { title: 'Male', value: 'M' },
  { title: 'Female', value: 'F' }
];

const avilability = [
  { title: 'Any Date', value: 'all' },
  { title: 'Today', value: 'today' },
  { title: 'Tomorro', value: 'tomorrow' }
];

const age = [
  { num: 'Any', value: 0 },
  { num: 'Less Than 30', value: 29 },
  { num: 'Form 30 To 50', value: 50 },
  { num: 'Greater Than 50', value: 51 },
];

const salary = [
  { title: 'Any', value: 0 },
  { title: 'Less Than 50', value: 49 },
  { title: 'From 50 to 100', value: 100 },
  { title: 'From 100 to 200', value: 200 },
  { title: 'From 200 to 300', value: 300 },
  { title: 'Greater Than 300', value: 301 },
];

interface SpecializationData {
  id: number;
  name_en: string;
  name_ar: string;
  is_deleted: string;
}

export default function Sidebar() {
  const [count, setCount] = useState<number | null>(0);
  const [specialization, setSpecialization] = useState<SpecializationData[]>([]);

  const [ageChecked, setAgeChecked] = useState<number | ''>('');
  const [avilabilityChecked, setAvilabilityChecked] = useState('');
  const [genderChecked, setGenderChecked] = useState('');
  const [specializationChecked, setSpecializationChecked] = useState<number | ''>('');
  const [salaryChecked, setSalaryChecked] = useState<number | ''>('');

  const SpecializationContext = useSpecialization();
  const AvilabilityContext = useAvilability();
  const GenderContext = useGender();
  const SalaryContext = useSalary();
  const AgeContext = useAge();

  const handleClickShow = (i: number) => {
    setCount(count === i ? null : i);
  };

  const handleChangeAge = (value: number) => {
    if(ageChecked === value){
      setAgeChecked('');
      AgeContext?.setAge(0);
    }else {
      setAgeChecked(value);
      AgeContext?.setAge(value);
    }
  }

  const handleChangeGender = (value: string) => {
    if(genderChecked === value){
      setGenderChecked('');
      GenderContext?.setGender('')
    }else {
      setGenderChecked(value);
      GenderContext?.setGender(value);
    }
  }

  const handleChangeAvilability = (value: string) => {
    if (avilabilityChecked === value) {
      setAvilabilityChecked(''); 
      AvilabilityContext?.setAvilability('');
    } else {
      setAvilabilityChecked(value); 
      AvilabilityContext?.setAvilability(value);
    }
  }

  const handleChangeSpecialization = (value: number) => {
    if (specializationChecked === value) {
      setSpecializationChecked(''); 
      SpecializationContext?.setSpecialization('');
    } else {
      setSpecializationChecked(value); 
      SpecializationContext?.setSpecialization(value);
    }
  }

  const handleChangeSalary = (value: number) => {
    if (salaryChecked === value) {
      setSalaryChecked(''); 
      SalaryContext?.setSalary('');
    } else {
      setSalaryChecked(value); 
      SalaryContext?.setSalary(value);
    }
  }

  useEffect(() => {
    const getFiltersData = async () => {
      try {
        const token = await GetToken();
        const res = await axios.get('http://localhost:8000/api/specialization', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setSpecialization(res.data.data.specialization);
      } catch (error) {
        console.log(error);
      }
    };

    getFiltersData();
  }, []);

  return (
    <div className='sticky left-0 top-0 translate-y-[10px] w-[220px] h-fit rounded-md shadow-lg bg-white'>

      {/* Header */}
      <div className='flex items-center gap-2 bg-mid-blue p-3 text-white'>
        <CiFilter />
        <span>Filters</span>
      </div>

      {/* Dropdown Items */}
      {informations.map((inf, i) => (
        <div key={i} className='p-4 cursor-pointer text-mid-blue border-b'>
          {/* Title */}
          <div onClick={() => handleClickShow(i)} className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {inf.image}
              <span>{inf.title}</span>
            </div>
            {count === i ? <MdKeyboardArrowUp /> : <MdKeyboardArrowDown />}
          </div>

          {/* Dropdown Content */}
          <div className={`overflow-hidden transition-all duration-500 ease-in-out mt-2
           ${count === i ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}>

            {/* Specialization */}
            {inf.type === 'specialization' && specialization.length > 0 && (
              specialization.map(special => (
                <label key={special.id} htmlFor={`special-${special.id}`} 
                       className='flex  items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input checked={ specializationChecked === special.id } onChange={() => handleChangeSpecialization(special.id)} type='checkbox' id={`special-${special.id}`} />
                  {special.name_en}
                </label>
              ))
            )}

            {/* Gender */}
            {inf.type === 'gender' && gender.length > 0 && (
              gender.map((g, index) => (
                <label key={index} htmlFor={`gender-${index}`} 
                       className='flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input checked={genderChecked === g.value} onChange={() => handleChangeGender(g.value)} type='checkbox' id={`gender-${index}`} />
                  {g.title}
                </label>
              ))
            )}

            {/* Avilability */}
            {inf.type === 'avilable' && avilability.length > 0 && (
              avilability.map((avilable, index) => (
                <label key={index} htmlFor={`avilability-${index}`} 
                       className='flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input checked={avilabilityChecked === avilable.value} onChange={() => handleChangeAvilability(avilable.value)} type='checkbox' id={`avilability-${index}`} />
                  {avilable.title}
                </label>
              ))
            )}

            {/* Salary */}
            {inf.type === 'salary' && salary.length > 0 && (
              salary.map((salary, index) => (
                <label key={index} htmlFor={`salary-${index}`} 
                       className='flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input checked={ salaryChecked === salary.value } onChange={() => handleChangeSalary(salary.value)} type='checkbox' id={`salary-${index}`} />
                  {salary.title}
                </label>
              ))
            )}

            {/* Age */}
            {inf.type === 'age' && age.length > 0 && (
              age.map((age, index) => (
                <label key={index} htmlFor={`age-${index}`} 
                       className='flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input checked={ageChecked === age.value} onChange={() => handleChangeAge(age.value)} type='checkbox' id={`age-${index}`} />
                  {age.num}
                </label>
              ))
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
