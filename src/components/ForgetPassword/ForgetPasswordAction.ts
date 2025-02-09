'use server';
import { redirect } from 'next/navigation';
import { ForgetPasswordSchema } from './ForgetPasswordSchema';
import { cookies } from 'next/headers';

export default async function ForgetPasswordAction(state: any, formData: FormData) {
    const cookie = await cookies();

    const formValues = {
        email: formData.get('email')?.toString() || '', 
        password: formData.get('password')?.toString() || '',
        password_confirmation: formData.get('password_confirmation')?.toString() || '',
    };

    const validationFeildes = ForgetPasswordSchema.safeParse(formValues);
    if (!validationFeildes.success) {
        return {
            errors: validationFeildes.error.flatten().fieldErrors,
            data: formValues,
        };
    }

    const res = await fetch("http://localhost:8000/api/users/forget-password", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
    });

    if (!res.ok) {
        const errorsData = await res.json();
        return {
            errors: errorsData.errors,
            data: formValues,
        };
    }

    const data = await res.json();
    cookie.set('message', data.message);
    cookie.delete('email');
    redirect('/');
}
