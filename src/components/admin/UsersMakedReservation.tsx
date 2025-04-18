import React from 'react'
import Admins from './Admins'

const UsersMakedReservation = () => {
    
    return (
        <div className="overflow-x-auto overflow-hidden rounded-md border border-gray-700">
            <table className="w-full">
                <thead className="bg-gray-800 text-white">
                    <tr className="text-gray-300">
                        <th className="px-4 py-3 text-left border-b border-gray-600">User</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Name</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Email</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Phone</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Age</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">City</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Address</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Role</th>
                        <th className="px-4 py-3 text-left border-b border-gray-600">Action</th>
                    </tr>
                </thead>
                    <Admins/>
            </table>
        </div>
    )
}

export default UsersMakedReservation;