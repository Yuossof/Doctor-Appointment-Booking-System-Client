'use server'
import GetToken from '@/lib/services/auth/GetToken'
import RFAction from '@/types/ReviewAction';
import { number, z } from 'zod'

export default async function ReviewAction(state: RFAction, formData: FormData) : Promise<RFAction> {
    const token = await GetToken();

    const formValues = {
        comment: formData.get('comment'),
        rate: formData.get('rate'),
        doctor_id: state.id
    }

    console.log(formValues.rate);

    const schema = z.object({
        comment : z.string().min(1, { message: 'Comment Is Required' }).trim(),
        rate : z.string().min(1, { message: 'Rate Is Required' }).transform(Number),
    })

    const validationFieldes = schema.safeParse(formValues);

    if(!validationFieldes.success){
        return {
            id: state.id,
            success: false,
            data: formValues,
            errors: {
                error: validationFieldes.error.flatten().fieldErrors
            },
            message: ''
        }
    }

    const res = await fetch(`http://localhost:8000/api/reviews/store`, {
        method: 'POST',
        headers:{
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formValues)
    })

    if(!res.ok){
        const errorsData = await res.json();
        console.log(errorsData)
        return {
            id: state.id,
            success: false,
            data: formValues,
            errors: {
                message: errorsData.error
            },
            message: ''

        }
    }

    const data = await res.json();
    return {
        id: state.id,
        success: true,
        data: {},
        errors: {},
        message: data.message
    }
}
