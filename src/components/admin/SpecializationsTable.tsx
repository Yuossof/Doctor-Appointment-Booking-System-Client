"use client"
import React, { useEffect, useState } from 'react'
import { Plus, Search } from 'lucide-react'
import { useAddUserAndDoctor } from '@/Context/AddUserAndDoctor'
import GetToken from '@/lib/services/auth/GetToken'
import axios from 'axios'
import { useRefresh } from '@/Context/RefreshAdmin'
import { motion } from 'framer-motion'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
} from '../ui/select';
import { useSearchName } from '@/Context/SearchName'
import UseSpecializations from '@/lib/services/Admin/GetSpecializations'
import { AddSpecialization } from './AddSpecialization'

export const SpecializationsTable = () => {
    const { setShowBox } = useAddUserAndDoctor() as { showBox: boolean, setShowBox: React.Dispatch<React.SetStateAction<boolean>> }
    const [message, setMessage] = useState<string | null>(null);
    const refreshContext = useRefresh();    
    const specializations = UseSpecializations();
    const [status, setStatus] = useState<string>('');
    const [specialID, setSpecialId] = useState<number | null>(null);
    const searchNameContext = useSearchName();
    

    const handleChangeRole = (status: string, special_id: number) => {
        setStatus(status);
        setSpecialId(special_id);
    }

    useEffect(() => {
        const changeStatus = async () => {
            const token = await GetToken();
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/specializations/make/${specialID}`,
                    { status },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                refreshContext?.setRefresh(prev => !prev);
                setMessage('Updated Status Successfully');
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    setMessage(error?.response?.data?.message);
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        status && specialID && changeStatus();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status, specialID]);



    useEffect(() => {
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            message && setMessage(null);
        }, 2000);
    }, [message])

    return (
        <div>
            <AddSpecialization />
            <div className='w-full flex items-center justify-between' >
                <div className='flex items-center'>
                    <div className='border-[1px] border-r-0 border-gray-600 rounded-l-md py-2 px-3 text-gray-300'>
                        <Search/>
                    </div>
                    <input
                        type="text"
                        placeholder='search...'
                        onChange={(e) => searchNameContext?.setSearchName(e.target.value)}
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
            <div className="overflow-x-auto overflow-hidden rounded-md border border-gray-700 mt-6">
                <table className="min-w-full">
                    <thead className="bg-gray-800 text-white">
                        <tr className="text-gray-300">
                            <th className="px-4 py-3 text-left border-b border-gray-600">Id</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">User Name</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 text-gray-200">
                        {specializations && specializations.length > 0 ?
                            specializations.map((specila, i) => (
                                <tr
                                    key={specila.id}
                                    className={`hover:bg-orange-900 hover:bg-opacity-5 transition duration-200 ${i % 2 !== 0 ? "bg-orange-900 bg-opacity-15" : ""}`}>
                                    <td className="px-4 py-3 border-b border-gray-700">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-300">{i + 1} </span>
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-700">{specila?.name_en}</td>
                                    <td>
                                        <Select onValueChange={(value) => handleChangeRole(value, specila?.id)} defaultValue={specila?.is_deleted || status}>
                                            <SelectTrigger className='bg-slate-800 border-slate-600 ring-0 focus:ring-1 focus:ring-offset-0  outline-none text-gray-300'>
                                                <SelectValue placeholder="Status"/>
                                            </SelectTrigger>
                                            <SelectContent className='bg-slate-800 border-[1px] border-gray-600'>
                                                <SelectGroup>
                                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="1">Active</SelectItem>
                                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="0">Un Active</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={3} className='text-white text-center p-2'>No Specializations Here</td>
                                </tr>
                            )}
                        {message && (
                            <motion.tr
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="w-full text-red-400 rounded-md text-center">
                                <td className="p-3" colSpan={3}>{message}</td>
                            </motion.tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

