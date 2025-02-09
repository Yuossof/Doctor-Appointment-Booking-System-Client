'use server';
import { LoginSchema } from './LoginSchema';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function LoginAction(state: any, formData: FormData) {

    const cookiesStore = await cookies();

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
    
        const res = await fetch("http://localhost:8000/api/login", {
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
            userData: errorsData.data,
            message: errorsData.message
          };
        }
    
        const data = await res.json();
        cookiesStore.set('data', JSON.stringify(data.data));
        cookiesStore.set('message', data.message);
        redirect('/');
}
