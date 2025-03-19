export type UserProfileInputs = {
    first_name: string;
    last_name: string;
    image: File | null;
    gender: string;
    city: string;
    address: string;
    phone: string ;
}

export type DoctorProfileInputs = UserProfileInputs & {
    ex_years: string;
    clinic_address: string;
    desc: string;
}