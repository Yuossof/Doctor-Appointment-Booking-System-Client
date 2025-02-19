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

const informations = [
  { image: <PiGraduationCapLight />, title: 'Specialitie', type: 'specialization' },
  { image: <PiGenderIntersex />, title: 'Gender', type: 'gender' },
  { image: <IoMdAlarm />, title: 'Availability', type: 'avilable' },
  { image: <GiTakeMyMoney />, title: 'Salary', type: 'salary' },
  { image: <IoAnalyticsSharp />, title: 'Age', type: 'age' },
];

const gender = [
  { title: 'Male', value: 'M' },
  { title: 'Female', value: 'F' }
];

const avilability = [
  { title: 'Any Day' },
  { title: 'Today' },
  { title: 'Tomorro' }
];

const age = [
  { num: 'Any' },
  { num: 'Less Than 30' },
  { num: 'Form 30 To 50'},
  { num: 'Greater Than 50'},
];

const salary = [
  { title: 'Any' },
  { title: 'Less Than 50' },
  { title: 'From 50 to 100' },
  { title: 'From 100 to 200' },
  { title: 'From 200 to 300' },
  { title: 'Greater Than 300' },
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

  const handleClickShow = (i: number) => {
    setCount(count === i ? null : i);
  };

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
                  <input type='checkbox' id={`special-${special.id}`} />
                  {special.name_en}
                </label>
              ))
            )}

            {/* Gender */}
            {inf.type === 'gender' && gender.length > 0 && (
              gender.map((g, index) => (
                <label key={index} htmlFor={`gender-${index}`} 
                       className='flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input type='checkbox' id={`gender-${index}`} />
                  {g.title}
                </label>
              ))
            )}

            {/* Avilability */}
            {inf.type === 'avilable' && avilability.length > 0 && (
              avilability.map((avilable, index) => (
                <label key={index} htmlFor={`avilability-${index}`} 
                       className='flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input type='checkbox' id={`avilability-${index}`} />
                  {avilable.title}
                </label>
              ))
            )}

            {/* Salary */}
            {inf.type === 'salary' && salary.length > 0 && (
              salary.map((salary, index) => (
                <label key={index} htmlFor={`salary-${index}`} 
                       className='flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input type='checkbox' id={`salary-${index}`} />
                  {salary.title}
                </label>
              ))
            )}

            {/* Age */}
            {inf.type === 'age' && age.length > 0 && (
              age.map((age, index) => (
                <label key={index} htmlFor={`age-${index}`} 
                       className='flex items-center gap-2 p-2 hover:bg-gray-100 transition-all duration-300 ease-out cursor-pointer'>
                  <input type='checkbox' id={`age-${index}`} />
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
