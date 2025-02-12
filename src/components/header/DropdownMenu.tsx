'use client'
import {
    LogOut,
    User,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link";
import GetToken from "../GetToken/GetToken";
import { useToastMessage } from "../Context/ToastMessage";
import { useUser } from "../Context/User";
import Cookie from 'cookie-universal';
import { useRouter } from "next/navigation";

interface DropdownMenuCheckboxesProps {
    AvatarCmp: React.ElementType;
}

export function DropdownMenuCheckboxes({ AvatarCmp }: DropdownMenuCheckboxesProps) {
    const cookieStore = Cookie();
    const messageContext = useToastMessage();
    const userContext = useUser();
    const router = useRouter()
 

    const handleLogout = async () => {
        const token = await GetToken();
        const res = await fetch('http://localhost:8000/api/users/logout', {
            headers: {
                Accept: 'application/json',
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${token}`
            }
        });
        if(res.ok){
            cookieStore.removeAll();
            messageContext?.setToastMessage('Logout Successfully');
            userContext?.setUser(null);
            router.push('/login');
        }
    }

    return (
        <>
            {(userContext?.user && userContext?.user.email_verified_at !== null) && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button className="outline-none">
                            <AvatarCmp />
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56 mr-24">
                        <DropdownMenuLabel className="font-medium text-gray-700">My Account</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <DropdownMenuItem className="text-gray-700 cursor-pointer">
                                <User />
                                <Link href={'/profile'}>Profile</Link>
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem  onClick={handleLogout} className="text-gray-700 cursor-pointer">
                            <LogOut />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )}
        </>
    )
}
