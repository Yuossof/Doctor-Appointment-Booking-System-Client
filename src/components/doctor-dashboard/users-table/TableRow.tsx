"use client"
import { AvatarCmp } from "@/components/Avatar"
import { usePathname, useRouter } from "next/navigation"
type UserProps = {
    id: number,
    name: string,
    age: number
}


export const TableSlice = ({ user, i }: { user: UserProps, i: number }) => {
    const router = useRouter()
    const pathname = usePathname()
    return (
        <tr
            onClick={() => router.push(`${pathname}/report/${i}`)}
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
    )
}