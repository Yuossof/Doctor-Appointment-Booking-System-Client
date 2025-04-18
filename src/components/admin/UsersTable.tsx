"use client"
import { AvatarCmp } from '@/components/Avatar'
import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { Plus, Search } from 'lucide-react'
import { AddUserBox } from './AddUserBox'
import { useAddUserAndDoctor } from '@/Context/AddUserAndDoctor'
import UseUsers from '@/lib/services/Admin/GetUser'
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

export const UsersTable = () => {
    const { setShowBox } = useAddUserAndDoctor() as { showBox: boolean, setShowBox: React.Dispatch<React.SetStateAction<boolean>> }
    const [message, setMessage] = useState<string | null>(null);
    const users = UseUsers();
    const refreshContext = useRefresh();
    const [role, setRole] = useState<string>('');
    const [userId, setUserId] = useState<number | null>(null);
    const searchNameContext = useSearchName();

    const handleChangeRole = (value: string, user_id: number) => {
        setRole(value);
        setUserId(user_id);
    }

    useEffect(() => {
        const changeRole = async () => {
            const token = await GetToken();
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/make/${userId}`,
                    { role },
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                refreshContext?.setRefresh(prev => !prev);
                setMessage('Updated Role Successfully');
            } catch (error) {
                console.log(error);
                if (axios.isAxiosError(error)) {
                    setMessage(error?.response?.data?.message);
                }
            }
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        role && userId && changeRole();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role, userId]);

    const handleDelete = async (id: number) => {
        const token = await GetToken();
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            setMessage(res.data.message);
            refreshContext?.setRefresh(prev => !prev);
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setMessage(error?.response?.data?.message);
            }
        }
    }

    useEffect(() => {
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            message && setMessage(null);
        }, 2000);
    }, [message])

    return (
        <div>
            <AddUserBox />
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
                            <th className="px-4 py-3 text-left border-b border-gray-600">User</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">User Name</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Email</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Phone</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Age</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">City</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Address</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Role</th>
                            <th className="px-4 py-3 text-left border-b border-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody className="bg-gray-900 text-gray-200">
                        {users && users.length > 0 ?
                            users.map((user, i) => (
                                <tr
                                    key={user.id}
                                    className={`hover:bg-orange-900 hover:bg-opacity-5 transition duration-200 ${i % 2 !== 0 ? "bg-orange-900 bg-opacity-15" : ""}`}>
                                    <td className="px-4 py-3 border-b border-gray-700">
                                        <div className="flex items-center gap-2">
                                            <span className="text-gray-300">{i + 1}- </span>
                                            <AvatarCmp imgSrc={user?.image_url} w={8} h={8} />
                                        </div>
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-700">{user?.first_name + ' ' + user?.last_name}</td>
                                    <td className="px-4 py-3 border-b border-gray-700">{user?.email}</td>
                                    <td className="px-4 py-3 border-b border-gray-700">{user?.phone}</td>
                                    <td className="px-4 py-3 border-b border-gray-700">{user?.age}</td>
                                    <td className="px-4 py-3 border-b border-gray-700">{user?.city}</td>
                                    <td className="px-4 py-3 border-b border-gray-700">{user?.address}</td>
                                    <td>
                                        <Select onValueChange={(value) => handleChangeRole(value, user?.id)} defaultValue={user?.role || role}>
                                            <SelectTrigger className='bg-slate-800 border-slate-600 ring-0 focus:ring-1 focus:ring-offset-0  outline-none text-gray-300'>
                                                <SelectValue placeholder={user?.role} />
                                            </SelectTrigger>
                                            <SelectContent className='bg-slate-800 border-[1px] border-gray-600'>
                                                <SelectGroup>
                                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="user">User</SelectItem>
                                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="doctor">Doctor</SelectItem>
                                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="admin">Admin</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="px-4 py-3 border-b border-gray-700">
                                        <Button onClick={() => handleDelete(user?.id)} size="sm" variant="destructive">Delete</Button>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={9} className='text-white text-center p-2'>No Users Here</td>
                                </tr>
                            )}
                        {message && (
                            <motion.tr
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.3, ease: 'easeOut' }}
                                className="w-full text-red-400 rounded-md text-center">
                                <td className="p-3" colSpan={9}>{message}</td>
                            </motion.tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

