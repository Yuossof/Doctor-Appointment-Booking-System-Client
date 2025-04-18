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

type Data = {
    user: UData,
    token: string
}

export interface ILogin {
    errors?: Record<string, string[]>,
    data?: Record<string, string>,
    message?: string,
    user?: UData,
    userData?: Data,
    errorsData?: string
}