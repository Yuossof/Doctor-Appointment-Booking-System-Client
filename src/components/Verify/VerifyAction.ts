'use server'
import GetToken from '../GetToken/GetToken'
import { VerfiySchema } from './VerifySchema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function VerifyAction(state: any, formData: FormData) {
    const token = await GetToken();
    const cookiesStore = await cookies();

    console.log(token)

    const formValues = {
        code: formData.get('code')?.toString() || ''
    }

     const validationFeildes = VerfiySchema.safeParse(formValues);
      if (!validationFeildes.success) {
        return {
          errors: validationFeildes.error.flatten().fieldErrors,
          data: formValues,
        };
      }

      const res = await fetch("http://localhost:8000/api/users/check-code", {
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
        console.log(errorsData)
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
        user: data.data
      }
}
