type UData = {
    id: number
    first_name: string,
    last_name: string,
    email: string,
    phone?: string,
    gender: string,
    image_url?: string,
    address?: string,
    city?: string,
    email_verified_at?: string | null,
    role?: string,
    clinic_address?: string
}

export interface IForgetPassword {
    errors?: Record<string, string[]>,
    data?: Record<string, string>,
    user?: UData
}