'use server'
import { IMakeSpecialization } from '@/types/Admin/AddSpecialization';
import GetToken from '../auth/GetToken'
import { z } from 'zod';

export default async function AddActionSpecialization(state: IMakeSpecialization, formData: FormData): Promise<IMakeSpecialization> {
    const token = await GetToken();

    const formValues = {
        name_en: formData.get('name_en') as string,
        is_deleted: formData.get('is_deleted') as string,
    }

    const addSpecialization = z.object({
        name_en: z.string().min(1, { message: 'Name Is Required' }).trim(),
        is_deleted: z.string().min(1, { message: 'Status Is Required' }).trim(),
    })

    const validationFieldes = addSpecialization.safeParse(formValues);

    if (!validationFieldes.success) {
        return {
            data: formValues,
            errors: validationFieldes.error.flatten().fieldErrors,
            success: false,
            message: ''
        }
    }


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/specializations/store`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
    })

    const data = await res.json();
    console.log(data)
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
