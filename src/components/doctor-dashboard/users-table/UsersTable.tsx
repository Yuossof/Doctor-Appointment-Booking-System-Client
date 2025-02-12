import { AvatarCmp } from '@/components/Avatar'
import React from 'react'

const users = [
    { id: 1, name: 'Mohammed', age: 25 },
    { id: 2, name: 'Sayed', age: 30 },
    { id: 3, name: 'Ahmed', age: 28 },
    { id: 4, name: 'Ahmed', age: 28 },
    { id: 5, name: 'Ahmed', age: 28 },
]

const UsersTable = () => {
    return (
        <div className="overflow-x-auto rounded-md border border-gray-700">
            <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                    <tr className="text-gray-300">
                        <th className="px-4 py-3 text-left border-b border-gray-600">User</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">UserName</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Age</th>
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
                            <td className="px-4 py-3 border-b border-gray-700">{user.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersTable
