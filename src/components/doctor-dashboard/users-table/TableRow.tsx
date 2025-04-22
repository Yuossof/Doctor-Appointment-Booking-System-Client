"use client"
import { AvatarCmp } from "@/components/Avatar"
import { usePathname, useRouter } from "next/navigation"
export type UserProps = {
    id: number,
    first_name: string,
    age: number,
    gender: string,
    phone: string,
    image_url: string,
    address: string,
    email: string
}



export const TableSlice = ({ user, i }: { user: UserProps, i: number }) => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <tr
            onClick={() => router.push(`${pathname}/report/${user.id}`)}
            key={user.id}
            className={`hover:bg-orange-900 cursor-pointer hover:bg-opacity-5 transition duration-200 ${i % 2 !== 0 ? "bg-orange-900 bg-opacity-15" : ""}`}>
            <td className="px-4 py-3 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <span className="text-gray-300">{user.id}- </span>
                    <AvatarCmp imgSrc={user.image_url} w={8} h={8} />
                </div>
            </td>
            <td className="px-4 py-3 border-b border-gray-700">{user.first_name}</td>
            <td className="px-4 py-3 border-b border-gray-700">{user.age}</td>
            <td className="px-4 py-3 border-b border-gray-700">{user.gender === "M" ? "Male" : "Female"}</td>
            <td className="px-4 py-3 border-b border-gray-700">{user.phone}</td>
            <td className="px-4 py-3 border-b border-gray-700">{user.email}</td>
            <td className="px-4 py-3 border-b border-gray-700">{user.address}</td>
        </tr>
    )
}