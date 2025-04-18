import { IUser } from "../UserInformation"

type IAppointmnets = {
    id: number,
    end_time: string,
    start_time: string
}

type IReservations = {
    id: number,
    is_paid: string,
    payment_method: string,
    status: string,
    user: IUser,
    doctor: IUser,
    appointment: IAppointmnets
}

type TodayReservations = {
    id: number,
    date: string,
    day: string,
    reservations: IReservations[],
}

export type weakly_appointments = {
    id: number,
    appointments_count: number,
    date: string,
    day: string
}

type WeeklyEarnings = {
    [key: string]: { total_price: number }
}

export interface IAdminDashboardData {
    admins: IUser[],
    doctors_count: number,
    today_reservations: TodayReservations[],
    users_count: number,
    users_count_of_reservations: number,
    weakly_appointments: weakly_appointments[],
    weekly_earnings: WeeklyEarnings
}