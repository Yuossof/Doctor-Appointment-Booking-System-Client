import { AvatarCmp } from '@/components/Avatar'
import React from 'react'

const users = [
    { id: 1, name: 'Mohammed', time: "8:20", status: 0 },
    { id: 2, name: 'Youssof', time: "5:20", status: 1 },
    { id: 3, name: 'Osama', time: "9:00", status: 2 },
    { id: 4, name: 'Ahmed', time: "2:20", status: 3 },
    { id: 5, name: 'Sayed', time: "3:30", status: 2 },
    { id: 6, name: 'Mosa', time: "5:20", status: 1 },
]

const ReservationsTable = () => {
    return (
        <div className=" rounded-md overflow-x-auto border border-gray-700 w-full">
            <table className="w-full overflow-x-auto">
                <thead className="bg-gray-800 text-white">
                    <tr className="text-gray-300">
                        <th className="px-4 py-3 text-left border-b border-gray-600">User</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">UserName</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Time</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Status</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Date</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 text-gray-200">
                    {users.map((user, i) => (
                        <tr
                            key={user.id}
                            className={`hover:bg-orange-900 hover:bg-opacity-5 transition duration-200 ${i % 2 !== 0 ? "bg-orange-900 bg-opacity-15" : ""}`}>
                            <td className="px-4 py-3 border-b border-gray-700">
                                <div className="flex items-center gap-2">
                                    <span className="text-gray-300">{user.id}- </span>
                                    <AvatarCmp w={8} h={8} />
                                </div>
                            </td>
                            <td className="px-4 py-3 border-b border-gray-700">{user.name}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{user.time}</td>
                            <td className="px-4 py-3 border-b border-gray-700 text-gray-400">
                                {user.status === 0 ? "start at 8:30" : user.status === 1 ? "ended at 9:30" : user.status === 3 ? "Pending..."  : "cancelled"}
                            </td>
                            <td className="px-4 py-3 border-b border-gray-700 text-gray-300">today</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default ReservationsTable
