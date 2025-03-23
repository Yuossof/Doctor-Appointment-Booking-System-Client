'use server';
import { cookies } from 'next/headers';
import { LoginSchema } from '../../validation/LoginSchema';


// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function LoginAction(state: any, formData: FormData) {
    const cookie = await cookies();
    
    const formValues = {
        email: formData.get('email')?.toString() || '',
        password: formData.get('password')?.toString() || ''
    }

      const validationFeildes = LoginSchema.safeParse(formValues);
      if (!validationFeildes.success) {
        return {
          errors: validationFeildes.error.flatten().fieldErrors,
          data: formValues,
        };
      }
    
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/login`, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });
    

        if (!res.ok) {
          const errorsData = await res.json();
          console.log(errorsData);
          return {
            errors: errorsData.errors,
            data: formValues,
            userData: errorsData.data,
            message: errorsData.message
          };
        }
    
        const data = await res.json();
        console.log(data)
        cookie.set('data', JSON.stringify(data.data));
        
        return {
          user: data.data
        }
}
