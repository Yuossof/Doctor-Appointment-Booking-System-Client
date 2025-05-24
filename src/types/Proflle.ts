export type UserProfileInputs = {
    first_name: string;
    last_name: string;
    image: File | null;
    gender: string;
    city: string;
    address: string;
    phone: string ;
    clinic_address: string;
    desc: string;
    ex_years: string;
}

export type DoctorProfileInputs = UserProfileInputs & {
    clinic_address: string;
    desc: string;
}