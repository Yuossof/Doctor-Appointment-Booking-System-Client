import React from 'react'
import { AvatarCmp } from '../Avatar'
import { Button } from '../ui/button'

const UsersMakedReservation = () => {

    const users = [
        {
            id: 1,
            name: 'Mohammed',
            email: "example@gmail.com",
            phone: "01023968776",
            reservations: 20
        },
        {
            id: 2, name: 'Sayed',
            email: "example@gmail.com",
            phone: "01023968776",
            reservations: 10
        },
        {
            id: 3, name: 'Ahmed',
            email: "example@gmail.com",
            phone: "01023968776",
            reservations: 40
        },
    ]

    return (
        <div className="overflow-x-auto rounded-md border border-gray-700 w-3/4">
            <table className="min-w-full">
                <thead className="bg-gray-800 text-white">
                    <tr className="text-gray-300">
                        <th className="px-4 py-3 text-left border-b border-gray-600">User</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">User Name</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Email</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Phone</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">date</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Action</th>
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
                            <td className="px-4 py-3 border-b border-gray-700">{user.email}</td>
                            <td className="px-4 py-3 border-b border-gray-700">{user.phone}</td>
                            <td className="px-4 py-3 border-b border-gray-700">8:00 to 9:00</td>
                            <td className="px-4 py-3 border-b border-gray-700">
                                <Button size="sm" variant="destructive">Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default UsersMakedReservation