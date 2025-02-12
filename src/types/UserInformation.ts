interface Fesses {
    id: number,
    price: number,
    count_review: string
}

interface Appointments{
    id: number,
    date: string,
}

interface Days{
    id: number,
    day: string,
    appointments: Appointments[]
}

export interface IUser {
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    image: string,
    image_url: string,
    role: string,
    gender: string,
    status: string,
    age: number,
    address?: string,
    city?: string,
    clinic_address?: string,
    desc?: string,
    email_verified_at?: string,
    ex_years?: string,
    specializon_id?: number,
    specialization_name?: string,
    avg_rating?: number,
    reservation_count?: number,
    feeses?: Fesses[],
    days?: Days[]
}