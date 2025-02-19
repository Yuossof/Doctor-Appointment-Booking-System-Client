export enum Gender {
    gender = "Gender",
    male = "male",
    female = "female"
}

export type UserProfileInputs = {
    first_name: string;
    last_name: string;
    email: string;
    image: string;
    gender: Gender;
    age: string | null;
    city: string;
    address: string;
    phone: string | null;
}

export type DoctorProfileInputs = UserProfileInputs & {
    ex_years: string;
    clinic_address: string;
    desc: string;
}