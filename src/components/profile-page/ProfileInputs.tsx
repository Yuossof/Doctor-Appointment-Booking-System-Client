"use client"
import { useActionState, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, User, FileText } from "lucide-react"
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectGroup,
    SelectContent,
    SelectItem,
    SelectLabel,
} from "@/components/ui/select"
import type { UserProfileInputs } from "@/types/Proflle"
import ProfileAction from "@/lib/services/ProfileAction"
import { useImageProfileChanged } from "@/Context/ProfileImageChanged"
import { useProfileImageRef } from "@/Context/RefImageProfile"
import type { IUser } from "@/types/UserInformation"
import { motion } from "framer-motion"
import { childeDiv, parentDiv } from "../ParentAndChildAnimation"
import Cookie from "cookie-universal"
interface initialState {
    success: boolean
    message: string
    data: UserProfileInputs | null
    errors: Record<string, string[]>
}

const ProfileInputs = ({ user }: { user: IUser }) => {
    const imageProfileContext = useImageProfileChanged()
    const [message, setMessage] = useState("")
    const [clinicAddressError, setClinicAddressError] = useState("")
    const ref = useProfileImageRef()
    const cookie = Cookie()
    const [state, action, pending] = useActionState<initialState, FormData>(ProfileAction, {
        success: false,
        message: "",
        data: null,
        errors: {},
    })

    useEffect(() => {

        const msg = cookie.get("error")
        if(msg) {
            setClinicAddressError(msg)
            setTimeout(()=> {
                cookie.remove("error")
            }, 4000)
        }

    }, [cookie])

    const handleSubmit = (formData: FormData) => {
        // Reset clinic address error
        setClinicAddressError("")

        // Check if user is a doctor and clinic address is required
        if (user.role === "doctor") {
            const clinicAddress = formData.get("clinic_address") as string
            if (!clinicAddress || clinicAddress.trim() === "") {
                setClinicAddressError("Clinic address is required for doctors")
                return // Prevent form submission
            }
        }

        // If validation passes, submit the form
        action(formData)
    }

    const handleChange = () => {
        if (ref?.current && ref.current.files?.length === 1) {
            const file = ref.current.files[0]

            // Validate file size (5MB limit)
            const maxSize = 5 * 1024 * 1024 // 5MB in bytes
            if (file.size > maxSize) {
                setMessage("Image size must be less than 5MB")
                setTimeout(() => setMessage(""), 3000)
                return
            }

            // Validate file type
            const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
            if (!validTypes.includes(file.type)) {
                setMessage("Please select a valid image file (JPG, PNG, or GIF)")
                setTimeout(() => setMessage(""), 3000)
                return
            }

            console.log("Selected file:", file)
            const imageURL = URL.createObjectURL(file)
            console.log("Image URL:", imageURL)
            imageProfileContext?.setImage(imageURL)
        }
    }

    useEffect(() => {
        console.log(user)
        if (state?.message && state?.success) {
            setMessage(state?.message)

            setTimeout(() => {
                setMessage("")
            }, 2000)
        }
        return () => setMessage("")
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [state?.message])

    // Reset image preview on successful form submission
    useEffect(() => {
        if (state?.success === true) {
            // Clear the preview image since it's now uploaded
            imageProfileContext?.setImage("")
            // Clear the file input
            if (ref?.current) {
                ref.current.value = ""
            }
        }
    }, [state?.success, imageProfileContext, ref])

    return (
        <>
            {message && (
                <div className="bg-green-500 text-white w-full rounded-md p-2 mb-2 text-center text-[12px] sm:text-[14px]">
                    <span>{message}</span>
                </div>
            )}
            <form action={handleSubmit}>
                <input onChange={handleChange} name="image" type="file" accept="image/*" className="hidden" ref={ref} />

                {/* Avatar Upload Section */}
                <motion.div
                    variants={childeDiv}
                    initial="hidden"
                    whileInView="visible"
                    className="flex flex-col items-center space-y-4 mb-6"
                >
                    <div className="relative">
                        <div className="w-32 h-32 rounded-full border-4 border-gray-200 overflow-hidden bg-gray-100 flex items-center justify-center">
                            {imageProfileContext?.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img
                                    src={imageProfileContext.image || "/placeholder.svg"}
                                    alt="Profile"
                                    className="w-full h-full object-cover"
                                />
                            ) : user?.image_url ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={user.image_url || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <User className="w-16 h-16 text-gray-400" />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => ref?.current?.click()}
                            className="absolute bottom-0 right-0 bg-mid-blue text-white rounded-full p-2 hover:bg-blue-600 transition-colors shadow-lg"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0118.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col mt-14">
                        <h1 className="text-2xl sm:text-3xl font-bold text-gray-300">
                            {user.first_name} {""} {user.last_name}
                        </h1>
                        <p className="text-gray-400 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" /> {user.address}
                        </p>
                    </div>
                </motion.div>

                <div className="space-y-6">
                    <motion.div
                        variants={parentDiv}
                        initial="hidden"
                        whileInView="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-6"
                    >
                        {/* First Name */}
                        <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2">
                            <Label htmlFor="firstName" className="text-sm font-medium text-gray-300">
                                First Name
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    name="first_name"
                                    defaultValue={state?.data?.first_name || user?.first_name}
                                    id="firstName"
                                    placeholder="John"
                                    className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-slate-700 text-gray-200"
                                />
                            </div>
                            {state?.errors?.first_name && <span className="text-red-500 text-sm">{state.errors.first_name[0]}</span>}
                        </motion.div>

                        {/* Last Name */}
                        <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2">
                            <Label htmlFor="lastName" className="text-sm font-medium text-gray-300">
                                Last Name
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    name="last_name"
                                    defaultValue={state?.data?.last_name || user?.last_name}
                                    id="lastName"
                                    placeholder="Doe"
                                    className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-slate-700 text-gray-200"
                                />
                            </div>
                            {state?.errors?.last_name && <span className="text-red-500 text-sm">{state.errors.last_name[0]}</span>}
                        </motion.div>

                        {/* Phone */}
                        <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2">
                            <Label htmlFor="phone" className="text-sm font-medium text-gray-300">
                                Phone Number
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    name="phone"
                                    defaultValue={state?.data?.phone || user?.phone}
                                    id="phone"
                                    type="tel"
                                    placeholder="+1 (555) 123-4567"
                                    className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-slate-700 text-gray-200"
                                />
                            </div>
                            {state?.errors?.phone && <span className="text-red-500 text-sm">{state.errors.phone[0]}</span>}
                        </motion.div>

                        {/* Gender */}
                        <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2">
                            <Label htmlFor="gender" className="text-sm font-medium text-gray-300">
                                Gender
                            </Label>
                            <Select defaultValue={state?.data?.gender || user?.gender} name="gender">
                                <SelectTrigger className="focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-slate-700 text-gray-200">
                                    <SelectValue placeholder="Select Gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Gender</SelectLabel>
                                        <SelectItem value="M">Male</SelectItem>
                                        <SelectItem value="F">Female</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            {state?.errors?.gender && <span className="text-red-500 text-sm">{state.errors.gender[0]}</span>}
                        </motion.div>

                        {/* City */}
                        <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2">
                            <Label htmlFor="city" className="text-sm font-medium text-gray-300">
                                City
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    name="city"
                                    defaultValue={state?.data?.city || user?.city}
                                    id="city"
                                    placeholder="New York"
                                    className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-slate-700 text-gray-200"
                                />
                            </div>
                            {state?.errors?.city && <span className="text-red-500 text-sm">{state.errors.city[0]}</span>}
                        </motion.div>

                        {/* Home Address */}
                        <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2">
                            <Label htmlFor="address" className="text-sm font-medium text-gray-300">
                                Home Address
                            </Label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <MapPin className="h-4 w-4 text-gray-400" />
                                </div>
                                <Input
                                    name="address"
                                    defaultValue={state?.data?.address || user?.address}
                                    id="address"
                                    placeholder="123 Main Street"
                                    className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-slate-700 text-gray-200"
                                />
                            </div>
                            {state?.errors?.address && <span className="text-red-500 text-sm">{state.errors.address[0]}</span>}
                        </motion.div>
                    </motion.div>

                    {/* Clinic Address */}
                    {user.role === "doctor" && (
                        <>
                            <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2 md:col-span-2">
                                <Label htmlFor="clinicAddress" className="text-sm font-medium text-gray-300">
                                    Clinic Address <span className="text-red-500">*</span>
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        name="clinic_address"
                                        defaultValue={state?.data?.clinic_address || user?.clinic_address}
                                        id="clinicAddress"
                                        placeholder="456 Medical Center Dr"
                                        className={`pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-slate-700 text-gray-200 ${clinicAddressError ? 'border-red-500' : ''
                                            }`}
                                        onChange={() => setClinicAddressError("")} // Clear error on change
                                    />
                                </div>
                                {(clinicAddressError || state?.errors?.clinic_address) && (
                                    <span className="text-red-500 text-sm block mt-1">
                                        {clinicAddressError || state.errors.clinic_address[0]}
                                    </span>
                                )}
                            </motion.div>

                            <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2 md:col-span-2">
                                <Label htmlFor="ex_years" className="text-sm font-medium text-gray-300">
                                    Experience Years
                                </Label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <MapPin className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Input
                                        name="ex_years"
                                        type="number"
                                        defaultValue={state?.data?.ex_years || user?.ex_years}
                                        id="ex_years"
                                        placeholder="Experience in years"
                                        className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-0 bg-slate-700 text-gray-200"
                                    />
                                </div>
                                {state?.errors?.ex_years && (
                                    <span className="text-red-500 text-sm">{state.errors.ex_years[0]}</span>
                                )}
                            </motion.div>

                            {/* Description field - full width */}
                            <motion.div variants={childeDiv} initial="hidden" whileInView="visible" className="space-y-2">
                                <Label htmlFor="desc" className="text-sm font-medium text-gray-300">
                                    Description
                                </Label>
                                <div className="relative">
                                    <div className="absolute top-3 left-3 flex items-start pointer-events-none">
                                        <FileText className="h-4 w-4 text-gray-400" />
                                    </div>
                                    <Textarea
                                        name="desc"
                                        defaultValue={state?.data?.desc || user?.desc}
                                        id="desc"
                                        placeholder="Tell us about yourself..."
                                        className="pl-10 focus-visible:ring-2 focus-visible:ring-blue-500 bg-slate-700 text-gray-200 focus-visible:ring-offset-0 min-h-[100px] resize-none"
                                        rows={4}
                                    />
                                </div>
                                {state?.errors?.desc && <span className="text-red-500 text-sm">{state.errors.desc[0]}</span>}
                            </motion.div>
                        </>
                    )}

                    <div className="mt-8 flex justify-end">
                        <motion.button
                            initial={{ x: 20, opacity: 0 }}
                            whileInView={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: "easeIn" }}
                            disabled={pending}
                            className={`${pending ? "opacity-50 cursor-not-allowed" : "opacity-100 hover:bg-blue-600"} bg-mid-blue rounded-md px-6 py-2 text-white font-medium transition-colors duration-200`}
                        >
                            {pending ? (
                                <span className="flex items-center gap-2">
                                    Loading
                                    <span className="loader"></span>
                                </span>
                            ) : (
                                "Save Changes"
                            )}
                        </motion.button>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ProfileInputs