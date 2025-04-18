export type IAddUser = {
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    role: string,
    gender: string,
    specialization_id?: string
}

type ErrorsType = Partial<Record<keyof IAddUser, string[]>>;

export interface IData {
    errors?: ErrorsType,
    data?: IAddUser,
    success: boolean,
    message: string
}