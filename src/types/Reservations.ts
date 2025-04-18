import { IUser } from "./UserInformation";

type Appointment = {
  end_time: string;
  start_time: string;
};

type Fees = {
  price: number;
};

export interface IReservations {
  id: number;
  appointment_id: number,
  created_at: string;
  feese: Fees;
  doctor: IUser;
  is_paid: string;
  payment_method: string;
  status: string;
  appointment: Appointment,
}
