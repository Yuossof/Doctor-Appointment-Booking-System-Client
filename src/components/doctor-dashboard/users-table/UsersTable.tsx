"use client"
import { TableSlice } from './TableRow'
import { useEffect, useState } from 'react';
import { GetUsers } from '@/lib/services/doctor-dashboard/GetUsers';




const UsersTable = () => {
    const [users, setUsers] = useState([])

    useEffect(() => {
        const asyncFunc = async () => {
            const data = await GetUsers()
            setUsers(data)
            console.log(data)
        }
        asyncFunc()
    }, [])


    if (users.length === 0) {
        return (
            <div className='w-full flex justify-center'>
                <span className='text-gray-400 text-lg'>No Users</span>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto rounded-md border border-gray-700">
            <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                    <tr className="text-gray-300">
                        <th className="px-4 py-3 text-left border-b border-gray-600">User</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">UserName</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Age</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Gender</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Phone</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Email</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Address</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 text-gray-200">
                    {users.map((user, i) => (
                        <TableSlice key={i} user={user} i={i} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable

