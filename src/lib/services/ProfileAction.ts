'use server'
import { UserProfileInputs } from "@/types/Proflle"
import GetToken from "./auth/GetToken"
import { ProfileSchema } from "../validation/ProfileSchema";
import { cookies } from "next/headers";

interface Returned {
    success: boolean,
    message: string,
    data: UserProfileInputs | null,
    errors: Record<string, string[]>
}

export default async function ProfileAction(state: Returned, formData: FormData)
    : Promise<Returned> {
    const cookie = await cookies()
    const token = await GetToken();

    const formValues = {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        gender: formData.get('gender') as string,
        phone: formData.get('phone') as string,
        city: formData.get('city') as string,
        address: formData.get('address') as string,
        clinic_address: formData.get('clinic_address') as string, // Fixed: was getting 'address' instead
        desc: formData.get('desc') as string,
        image: formData.get('image') as File,
        ex_years: formData.get('ex_years') as string,
    }

    const validationFieldies = ProfileSchema.safeParse(formValues);

    if (!validationFieldies.success) {
        return {
            success: false,
            message: '',
            data: formValues,
            errors: validationFieldies.error.flatten().fieldErrors
        }
    }

    const formDataToSend = new FormData();
    formDataToSend.append("first_name", formValues.first_name);
    formDataToSend.append("last_name", formValues.last_name);
    formDataToSend.append("gender", formValues.gender);
    formDataToSend.append("phone", formValues.phone);
    formDataToSend.append("city", formValues.city);
    formDataToSend.append("address", formValues.address);

    // Add the missing fields
    formDataToSend.append("clinic_address", formValues.clinic_address);
    formDataToSend.append("desc", formValues.desc);
    formDataToSend.append("ex_years", formValues.ex_years);

    if (formValues.image && formValues.image.size > 0) {
        formDataToSend.append("image", formValues.image);
    }


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/profile`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
    })

    if (!res.ok) {
        const errorData = await res.json();
        console.log(errorData)
        return {
            message: errorData.error,
            success: false,
            data: formValues,
            errors: errorData.errors
        }
    }

    const data = await res.json();
    cookie.set('data', JSON.stringify(data.data))

    return {
        message: data.message,
        success: true,
        data: data,
        errors: {}
    }
}