"use client"
import { AvatarCmp } from '@/components/Avatar'
import { useAddUserAndDoctor } from '@/Context/AddUserAndDoctor'
import { Plus, Search } from 'lucide-react'
import React from 'react'
import { AddDoctorBox } from './AddDoctorBox'
import { Button } from '../ui/button'

const doctors = [
    {
        id: 1,
        name: 'Mohammed',
        email: "example@gmail.com",
        phone: "01023968776",
        specialist: "Dental",
        patients: 20
    },
    {
        id: 2, name: 'Sayed',
        email: "example@gmail.com",
        phone: "01023968776",
        specialist: "Dental",
        patients: 10
    },
    {
        id: 3, name: 'Ahmed',
        email: "example@gmail.com",
        phone: "01023968776",
        specialist: "Dental",
        patients: 40
    },
]

const DoctorsTable = () => {
    const { setShowBox } = useAddUserAndDoctor() as { showBox: boolean, setShowBox: React.Dispatch<React.SetStateAction<boolean>> }

    return (
        <div>
            <AddDoctorBox />
            <div className='w-full flex items-center justify-between' >
                <div className='flex items-center'>
                    <div className='border-[1px] border-r-0 border-gray-600 rounded-l-md py-2 px-3 text-gray-300'>
                        <Search />
                    </div>
                    <input
                        type="text"
                        placeholder='search...'
                        className='rounded-r-md border-[1px] border-gray-600 py-2 px-2 text-gray-300 outline-none bg-transparent'
                    />
                </div>
                <div>
                    <div
                        onClick={() => setShowBox(true)}
                        className='text-gray-300 w-14 h-14 rounded-full hover:bg-slate-700 flex items-center justify-center transition-all cursor-pointer'>
                        <Plus size={30} />
                    </div>
                </div>
            </div>
            <div className="overflow-x-auto rounded-md border border-gray-700 mt-6">
                <table className="min-w-full">
                    <thead className="bg-gray-800 text-white">
                        <tr className="text-gray-300">
                            <th className="px-4 py-3 text-left border-b border-gray-600">User</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Doctor Name</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Email</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Phone</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Specialist</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Number of patients</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 text-gray-200">
                        {doctors.map((doctor, i) => (
                            <tr
                                key={doctor.id}
                                className={`hover:bg-orange-900 hover:bg-opacity-5 transition duration-200 ${i % 2 !== 0 ? "bg-orange-900 bg-opacity-15" : ""}`}>
                                <td className="px-4 py-3 border-b border-gray-700">
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-300">{doctor.id}- </span>
                                        <AvatarCmp w={8} h={8} />
                                    </div>
                                </td>
                                <td className="px-4 py-3 border-b border-gray-700">{doctor.name}</td>
                                <td className="px-4 py-3 border-b border-gray-700">{doctor.email}</td>
                                <td className="px-4 py-3 border-b border-gray-700">{doctor.phone}</td>
                                <td className="px-4 py-3 border-b border-gray-700">{doctor.specialist}</td>
                                <td className="px-4 py-3 border-b border-gray-700">{doctor.patients}</td>
                                <td className="px-4 py-3 border-b border-gray-700">
                                    <Button size="sm" variant="destructive">Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DoctorsTable
