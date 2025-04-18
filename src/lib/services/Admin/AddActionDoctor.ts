'use server'
import { IData } from '@/types/Admin/AddUser'
import GetToken from '../auth/GetToken'
import { addDoctorSchema } from '@/lib/validation/AddDoctorSchema';

export default async function AddActionDoctor(state: IData, formData: FormData): Promise<IData> {
    const token = await GetToken();

    const formValues = {
        first_name: formData.get('first_name') as string,
        last_name: formData.get('last_name') as string,
        email: formData.get('email') as string,
        password: formData.get('password') as string,
        gender: formData.get('gender') as string,
        role: formData.get('role') as string,
        specialization_id: formData.get('specialization_id') as string
    }


    const validationFieldes = addDoctorSchema.safeParse(formValues);
    if (!validationFieldes.success) {
        return {
            data: formValues,
            errors: validationFieldes.error.flatten().fieldErrors,
            success: false,
            message: ''
        }
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/doctors/store`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
    })
    const data = await res.json();
    
    if (!res.ok) {
        return {
            errors: data.errors,
            data: formValues,
            success: false,
            message: ''
        }
    }

    return {
        data: data.data,
        message: 'Created Successfully',
        success: true
    }

}
