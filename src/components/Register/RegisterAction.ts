"use server";
import { cookies } from "next/headers";
import { RegisterSchema } from "./RegisterSchema";
import { redirect } from "next/navigation";

export default async function RegisterAction(state: any, formData: FormData) {

  const cookiesStore = await cookies();
    
  const formValues = {
    first_name: formData.get("first_name")?.toString() || "",
    last_name: formData.get("last_name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    phone: formData.get("phone")?.toString() || "",
    password: formData.get("password")?.toString() || "",
    password_confirmation: formData.get("password_confirmation")?.toString() || "",
    birth_date: formData.get("birth_date")?.toString() || "",
    gender: formData.get('gender')?.toString() || ""
  };

  const validationFeildes = RegisterSchema.safeParse(formValues);
  if (!validationFeildes.success) {
    return {
      errors: validationFeildes.error.flatten().fieldErrors,
      data: formValues,
    };
  }

    const res = await fetch("http://localhost:8000/api/register", {
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
      user: data.data
    }
}

