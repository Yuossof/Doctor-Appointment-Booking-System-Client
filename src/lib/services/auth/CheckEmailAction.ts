'use server';
import { CheckEmail } from '../../validation/CheckEmailSchema';
import { cookies } from 'next/headers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    const res = await fetch(`${process.env.NEXT_BASE_URL}/api/users/check-forget-password`, {
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
