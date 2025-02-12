'use server';
import { CheckEmail } from './CheckEmailSchema';
import { cookies } from 'next/headers';

export default async function CheckEmailAction(state: any, formData: FormData) {
    const cookie = await cookies();
    const formValues = {  
        email: formData.get('email')?.toString() || '',
    }

    const validationFeildes = CheckEmail.safeParse(formValues);
    if (!validationFeildes.success) {
        return {
            errors: validationFeildes.error.flatten().fieldErrors,
            data: formValues,
        };
    }

    const res = await fetch("http://localhost:8000/api/users/check-forget-password", {
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
      cookie.set('email', formValues.email);
      return {
        message: data.message
      }
}
