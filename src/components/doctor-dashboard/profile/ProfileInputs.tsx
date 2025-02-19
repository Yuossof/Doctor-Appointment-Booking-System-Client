"use client"
import React, { useReducer } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Hourglass, ListOrdered, Mail, MapPin, MapPinHouse, Phone, User } from "lucide-react"
import { Button } from '@/components/ui/button'
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
} from '../../ui/select'

import { DoctorProfileInputs } from '@/types/Proflle'
import { Gender } from '@/types/Proflle'
import { Textarea } from '@/components/ui/textarea'

const initialState: DoctorProfileInputs = {
    first_name: "",
    last_name: "",
    email: "",
    image: "",
    gender: Gender.gender,
    age: "",
    city: "",
    address: "",
    phone: "",
    ex_years: "",
    desc: "",
    clinic_address: ""
};


function reducer(state: DoctorProfileInputs, action: { field: string, value: string | number | null }): DoctorProfileInputs {
    return { ...state, [action.field]: action.value };
}

const ProfileInputs = () => {
    const [data, dispatch] = useReducer(reducer, initialState);

    const handleInputChange = (field: keyof DoctorProfileInputs, value: string | number | null) => {
        dispatch({ field, value });
    }

    return (
        <div>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName" className='text-gray-300'>First Name</Label>
                        <div className="flex">
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <User className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("first_name", eo.target.value)}
                                value={data.first_name}
                                id="firstName"
                                placeholder="John Doe"
                                className="rounded-l-none bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName" className='text-gray-300'>Last Name</Label>
                        <div className="flex">
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <User className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("last_name", eo.target.value)}
                                value={data.last_name}
                                id="lastName"
                                placeholder="John Doe"
                                className="rounded-l-none bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="email" className='text-gray-300'>Email</Label>
                        <div className="flex">
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <Mail className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("email", eo.target.value)}
                                value={data.email}
                                id="email"
                                type="email"
                                placeholder="johndoe@example.com"
                                className="rounded-l-none bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className='text-gray-300'>Phone</Label>
                        <div className="flex">
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <Phone className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("phone", eo.target.value)}
                                value={data.phone || ""}
                                id="phone"
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className="rounded-l-none bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="phone" className='text-gray-300'>Years of Expreince</Label>
                        <div className="flex">
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <Hourglass className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("ex_years", eo.target.value)}
                                value={data.ex_years || ""}
                                id="ex_years"
                                type="text"
                                placeholder="Years of Experience "
                                className="rounded-l-none bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="clinic_address" className='text-gray-300'>Clinic Address</Label>
                        <div className="flex">
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <MapPinHouse className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("clinic_address", eo.target.value)}
                                value={data.clinic_address || ""}
                                id="clinic_address"
                                type="text"
                                placeholder="Clinic Address"
                                className="rounded-l-none bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="age" className='text-gray-300'>Age</Label>
                        <div className="flex">
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <ListOrdered className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("age", eo.target.value)}
                                value={data.age || ""}
                                id="age"
                                type="text"
                                placeholder="Age"
                                className="rounded-l-none bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="age" className='text-gray-300'>Gender</Label>
                        <Select value={data.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                            <SelectTrigger className='bg-slate-800 border-slate-600 ring-0 focus:ring-1 focus:ring-offset-0  outline-none text-gray-300'>
                                <SelectValue>{data.gender || "Gender"}</SelectValue>
                            </SelectTrigger>
                            <SelectContent className='bg-slate-800 border-[1px] border-gray-600'>
                                <SelectGroup>
                                    {/* <SelectLabel className='text-gray-400'>Gender</SelectLabel> */}
                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="male">Male</SelectItem>
                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="female">Female</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2 ">
                        <Label htmlFor="age" className='text-gray-300'>Specialization</Label>
                        <Select value={data.gender} onValueChange={(value) => handleInputChange("gender", value)}>
                            <SelectTrigger className='bg-slate-800 border-slate-600 ring-0 focus:ring-1 focus:ring-offset-0  outline-none text-gray-300'>
                                <SelectValue>{data.gender || "Gender"}</SelectValue>
                            </SelectTrigger>
                            <SelectContent className='bg-slate-800 border-[1px] border-gray-600'>
                                <SelectGroup>
                                    {/* <SelectLabel className='text-gray-400'>Gender</SelectLabel> */}
                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="male">Title</SelectItem>
                                    <SelectItem className='focus:bg-gray-600 text-gray-300 focus:text-gray-300' value="female">Title2</SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="city" className='text-gray-300'>City</Label>
                        <div className="flex">
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <MapPin className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("city", eo.target.value)}
                                value={data.city}
                                id="city"
                                placeholder="New York, USA"
                                className="rounded-l-none bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="address" className='text-gray-300'>Address</Label>
                        <div className='flex'>
                            <span className="inline-flex bg-slate-900 border-slate-600 items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                <MapPinHouse className="h-4 w-4" />
                            </span>
                            <Input
                                onChange={(eo) => handleInputChange("address", eo.target.value)}
                                value={data.address}
                                id="address"
                                placeholder="New York, USA"
                                className="rounded-l-none  bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300" />
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                        <Label htmlFor="desc" className='text-gray-300'>Description</Label>
                        <div className='flex'>
                            <Textarea
                                onChange={(eo) => handleInputChange("desc", eo.target.value)}
                                value={data.desc}
                                id="desc"
                                placeholder="Description"
                                className="rounded-l-none  bg-slate-800 border-slate-600 focus-visible:ring-offset-0 focus-visible:ring-1 text-gray-300" />
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
