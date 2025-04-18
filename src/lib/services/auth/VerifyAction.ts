'use server'
import GetToken from './GetToken'
import { VerfiySchema } from '../../validation/VerifySchema';
import { cookies } from 'next/headers';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function VerifyAction(state: any, formData: FormData) {
    const token = await GetToken();
    const cookiesStore = await cookies();

    console.log(token)

    const formValues = {
        code: formData.get('code') as string
    }

     const validationFeildes = VerfiySchema.safeParse(formValues);
      if (!validationFeildes.success) {
        return {
          errors: validationFeildes.error.flatten().fieldErrors,
          data: formValues,
        };
      }


      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/users/check-code`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
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
      cookiesStore.set('message', data.message);
      cookiesStore.set('data', JSON.stringify(data.data));
      cookiesStore.delete('verify');
      
      return {
        user: data.data.user
      }
}
