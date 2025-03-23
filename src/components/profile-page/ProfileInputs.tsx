"use client"
import React, { useActionState, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, User } from "lucide-react"
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
import ProfileAction from '@/lib/services/ProfileAction'
import { useImageProfileChanged } from '@/Context/ProfileImageChanged'
import { useProfileImageRef } from '@/Context/RefImageProfile'
import { IUser } from '@/types/UserInformation'
import { motion } from 'framer-motion'
import { childeDiv, parentDiv } from '../ParentAndChildAnimation'

interface initialState {
    success: boolean,
    message: string,
    data: UserProfileInputs | null,
    errors: Record<string, string[]>
}

const ProfileInputs = ({ user }: { user: IUser }) => {
    const imageProfileContext = useImageProfileChanged()
    const [message, setMessage] = useState('');
    const ref = useProfileImageRef();
    const [state, action, pending] = useActionState<initialState, FormData>(ProfileAction, {
        success: false,
        message: '',
        data: null,
        errors: {}
    })

    const handleChange = () => {
        if (ref?.current && ref.current.files?.length === 1) {
            const file = ref.current.files[0];
            console.log(file)
            const imageURL = URL.createObjectURL(file);
            console.log(imageURL)
            imageProfileContext?.setImage(imageURL);
            // console.log(imageProfileContext?.image)
        }
    };

    // useEffect(() => {
    //     if (state?.success == false) {
    //         console.log(state?.success)
    //         // imageProfileContext?.setImage(undefined)
    //     }
    // }, [state?.success])


    useEffect(() => {
        if (state?.message) {
            setMessage(state?.message)

            setTimeout(() => {
                setMessage('');
            }, 2000);
        }
        return () => setMessage('');
    }, [state?.message])

    return (
        <>
            {message &&
                <div className="bg-green-500 text-white w-full rounded-md p-2 mb-2 text-center text-[12px] sm:text-[14px]">
                    <span>{message}</span>
                </div>
            }
            <form action={action}>
                <input onChange={handleChange} name='image' type="file" accept="image/*" className="hidden" ref={ref} />
                <div className="space-y-4">
                    <motion.div
                        variants={parentDiv}
                        initial='hidden'
                        whileInView='visible'
                        className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <motion.div
                            variants={childeDiv}
                            initial='hidden'
                            whileInView='visible'
                            className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                    <User className="h-4 w-4" />
                                </span>
                                <Input
                                    name='first_name'
                                    defaultValue={user?.first_name}
                                    id="firstName"
                                    placeholder="John Doe"
                                    className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            {state?.errors?.first_name && <span className="text-red-600">{state.errors.first_name[0]}</span>}
                        </motion.div>
                        <motion.div
                            variants={childeDiv}
                            initial='hidden'
                            whileInView='visible'
                            className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                    <User className="h-4 w-4" />
                                </span>
                                <Input
                                    name='last_name'
                                    defaultValue={state?.data?.last_name || user?.last_name}
                                    id="lastName"
                                    placeholder="John Doe"
                                    className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            {state?.errors?.last_name && <span className="text-red-600">{state.errors.last_name[0]}</span>}
                        </motion.div>
                        <motion.div
                            variants={childeDiv}
                            initial='hidden'
                            whileInView='visible'
                            className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                    <Phone className="h-4 w-4" />
                                </span>
                                <Input
                                    name='phone'
                                    defaultValue={state?.data?.phone || user?.phone}
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            {state?.errors?.phone && <span className="text-red-600">{state.errors.phone[0]}</span>}
                        </motion.div>
                        <motion.div
                            variants={childeDiv}
                            initial='hidden'
                            whileInView='visible'
                            className="space-y-2">
                            <Label htmlFor="gender">Gender</Label>
                            <Select defaultValue={state?.data?.gender || user?.gender} name='gender'>
                                <SelectTrigger className="focus-visible:ring-0 focus-visible:ring-offset-0">
                                    <SelectValue placeholder={'Select Gender'} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        <SelectItem value="M">Male</SelectItem>
                                        <SelectItem value="F">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {state?.errors?.gender && <span className="text-red-600">{state.errors.gender[0]}</span>}
                        </motion.div>
                        <motion.div
                            variants={childeDiv}
                            initial='hidden'
                            whileInView='visible'
                            className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                    <MapPin className="h-4 w-4" />
                                </span>
                                <Input
                                    name='city'
                                    defaultValue={state?.data?.city || user?.city}
                                    id="city"
                                    placeholder="New York, USA"
                                    className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0"
                                />
                            </div>
                            {state?.errors?.city && <span className="text-red-600">{state.errors.city[0]}</span>}

                        </motion.div>
                        <motion.div
                            variants={childeDiv}
                            initial='hidden'
                            whileInView='visible'
                            className="space-y-2">
                            <Label htmlFor="address">Address</Label>
                            <div className="flex">
                                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-input bg-muted text-muted-foreground text-sm">
                                    <MapPin className="h-4 w-4" />
                                </span>
                                <Input
                                    name='address'
                                    defaultValue={state?.data?.address || user?.address}
                                    id="address"
                                    placeholder="New York, USA"
                                    className="rounded-l-none focus-visible:ring-0 focus-visible:ring-offset-0" />
                            </div>
                            {state?.errors?.address && <span className="text-red-600">{state.errors.address[0]}</span>}

                        </motion.div>
                    </motion.div>

                </div>
                <div className="mt-9 flex justify-end">
                    <motion.button
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeIn' }}
                        disabled={pending} className={`${pending ? 'opacity-50' : 'opacity-100'} bg-mid-blue rounded-md p-2 text-white`}>
                        {pending ? <span className="flex items-center gap-1">Loading <span className="loader"></span></span> : 'Save Changes'}
                    </motion.button>
                </div>
            </form>
        </>
    )
}

export default ProfileInputs;
