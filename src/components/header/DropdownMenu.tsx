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

interface DropdownMenuCheckboxesProps {
    AvatarCmp: React.ElementType;
}

export function DropdownMenuCheckboxes({AvatarCmp}: DropdownMenuCheckboxesProps) {
    return (
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
                        <span>Profile</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-gray-700 cursor-pointer">
                    <LogOut />
                    <span>Log out</span>
                </DropdownMenuItem> 
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
