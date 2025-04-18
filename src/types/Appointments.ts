

export type Appointments = {
    id: string | number
    start_time: string
    end_time: string
    status: string
    created_at: string
}


export type WeaklyAppointments = {
    id: string | number
    appointments: Appointments[]
}


export interface Day {
    id: number | string
    day: string 
}