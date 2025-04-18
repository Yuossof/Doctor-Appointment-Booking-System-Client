"use server";
import { cookies } from "next/headers";
import { RegisterSchema } from "../../validation/RegisterSchema";
import { IRegister } from "@/types/Register";

export default async function RegisterAction(state: IRegister, formData: FormData): Promise<IRegister> {

  const cookiesStore = await cookies();
    
  const formValues = {
    first_name: formData.get("first_name") as string,
    last_name: formData.get("last_name") as string,
    email: formData.get("email") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
    birth_date: formData.get("birth_date") as string,
    gender: formData.get('gender') as string
  };

  const validationFeildes = RegisterSchema.safeParse(formValues);
  if (!validationFeildes.success) {
    return {
      errors: validationFeildes.error.flatten().fieldErrors,
      data: formValues,
    };
  }


    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/register`, {
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
    cookiesStore.set('data', JSON.stringify(data.data));
    
    return {
      user: data.data.user
    }
}

