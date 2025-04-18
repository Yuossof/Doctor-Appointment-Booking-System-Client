export interface ISpecialization {
    name_en: string,
    is_deleted: string
}

type ErrorsType = Partial<Record<keyof ISpecialization, string[]>>

export interface IMakeSpecialization {
    errors?: ErrorsType,
    data: ISpecialization,
    message: string,
    success: boolean
}