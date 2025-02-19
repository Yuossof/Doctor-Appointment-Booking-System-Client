"use client"
import React, { useReducer } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Mail, MapPin, Phone, User } from "lucide-react"
import { Button } from '../ui/button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectLabel
} from '../ui/select'
import { UserProfileInputs } from '@/types/Proflle'
import { Gender } from '@/types/Proflle'

const initialState: UserProfileInputs = {
    first_name: "",
    last_name: "",
    email: "",
    image: "",
    gender: Gender.gender,
    age: "",
    city: "",
    address: "",
    phone: ""
};


function reducer(state: UserProfileInputs, action: { field: string, value: string | number | null }): UserProfileInputs {
    return { ...state, [action.field]: action.value };
}

const ProfileInputs = () => {
    const [data, dispatch] = useReducer(reducer, initialState);

    const handleInputChange = (field: keyof UserProfileInputs, value: string | number | null) => {
        dispatch({ field, value });
    }

    return (
        <div>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <User className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("first_name", eo.target.value)}
                                value={data.first_name}
                                id="firstName"
                                placeholder="John Doe"
                                className="rounded-l-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <User className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("last_name", eo.target.value)}
                                value={data.last_name}
                                id="lastName"
                                placeholder="John Doe"
                                className="rounded-l-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <Mail className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("email", eo.target.value)}
                                value={data.email}
                                id="email"
                                type="email"
                                placeholder="johndoe@example.com"
                                className="rounded-l-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <Phone className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("phone", eo.target.value)}
                                value={data.phone || ""}
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className="rounded-l-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <Phone className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("age", eo.target.value)}
                                value={data.age || ""}
                                id="age"
                                type="text"
                                placeholder="Age"
                                className="rounded-l-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 flex items-end">
                        <Select value={data.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                            <SelectTrigger>
                                <SelectValue>{data.gender || "Gender"}</SelectValue> 
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Gender</SelectLabel>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <MapPin className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("city", eo.target.value)}
                                value={data.city}
                                id="city"
                                placeholder="New York, USA"
                                className="rounded-l-none"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address">Address</Label>
                        <div className="flex">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <MapPin className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("address", eo.target.value)}
                                value={data.address}
                                id="address"
                                placeholder="New York, USA"
                                className="rounded-l-none" />
                        </div>
                    </div>
                </div>

            </div>
            <div className="mt-9 flex justify-end">
                <Button disabled={true}>Save Changes</Button>
            </div>
        </div>
    )
}

export default React.memo(ProfileInputs)
