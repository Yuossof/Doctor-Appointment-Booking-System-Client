'use client'
import useDashboardData from "@/lib/services/Admin/DashboardData"
import { AvatarCmp } from '../Avatar'
import { Button } from '../ui/button'
import GetToken from "@/lib/services/auth/GetToken";
import axios from "axios";
import { useRefresh } from "@/Context/RefreshAdmin";
import { useEffect, useState } from "react";
import { useUser } from "@/Context/User";
import { motion } from "framer-motion";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
} from '../ui/select'

export default function Admins() {
    const data = useDashboardData();
    const refreshContext = useRefresh();
    const [message, setMessage] = useState<string | null>(null);
    const [role, setRole] = useState<string>('');
    const [adminId, setAdminId] = useState<number | null>(null);
    const userContext = useUser();

    const handleRoleChange = (value: string, admin_id: number) => {
        setRole(value);
        setAdminId(admin_id)
    }

    useEffect(() => {
        const changeRole = async () => {
            const token = await GetToken();
            try {
                await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/make/${adminId}`,
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
        role && adminId && changeRole();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [role, adminId]);

    const handleDelete = async (id: number) => {
        const token = await GetToken();
        try {
            const res = await axios.delete(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setMessage(res.data.message);
            refreshContext?.setRefresh(prev => !prev);
        } catch (error) {
            console.log(error);
            if (axios.isAxiosError(error)) {
                setMessage(error?.response?.data?.message);
            }
        }
    }
    useEffect(() => {
        if (message) {
            setTimeout(() => {
                setMessage(null)
            }, 2000);
        }
    }, [message]);
    
    return (
        <>
            <tbody className="bg-gray-900 text-gray-200 w-full">
                {data && data?.admins && data?.admins?.length > 0 ? (
                    data?.admins?.map((admin, i) => (
                        <tr
                            key={admin.id}
                            className={`hover:bg-orange-900 hover:bg-opacity-5 transition duration-200 ${i % 2 !== 0 ? "bg-orange-900 bg-opacity-15" : ""}`}>
                            <td className="px-4 py-3 border-b border-gray-700">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-300">{i + 1}- </span>
                                    <AvatarCmp imgSrc={admin?.image_url} w={8} h={8} />
                                </div>
                            </td>
                            <td className="px-4 py-3 border-b border-gray-700">{admin?.first_name + ' ' + admin?.last_name}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{admin.email}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{admin.phone}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{admin.age}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{admin?.city}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{admin?.address}</td>
                            {admin?.id != userContext?.user?.id ? (
                                <td>
                                    <Select onValueChange={(value) => handleRoleChange(value, admin?.id)} defaultValue={admin?.role || role}>
                                        <SelectTrigger className='bg-slate-800 border-slate-600 ring-0 focus:ring-1 focus:ring-offset-0  outline-none text-gray-300'>
                                            <SelectValue placeholder={admin?.role} />
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
                            ) : (
                                <td></td>
                            )}
                            <td className="px-4 py-3 border-b border-gray-700">
                                {admin?.id != userContext?.user?.id && (
                                    <Button onClick={() => handleDelete(admin?.id)} size="sm" variant="destructive">Delete</Button>
                                )}
                            </td>
                        </tr>

                    ))
                ) : (
                    <tr>
                        <td colSpan={9} className="text-center p-2">
                            No admins Here
                        </td>
                    </tr>
                )}
                {message &&
                    <motion.tr
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="w-full text-red-400 rounded-md text-center">
                        <td className="p-3" colSpan={9}>{message}</td>
                    </motion.tr>
                }
            </tbody>
        </>
    )
}