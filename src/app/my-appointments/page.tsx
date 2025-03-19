import CacheMessage from "@/components/CacheMessage/CacheMessage";
import SuccessPaypal from "../../components/paypal-success/page";
import { Metadata } from "next";
import SuccessStripe from "../stripe_success/page";
import { GetUserReservation } from "@/components/GetUserReservation/GetUserReservation";
import { IUser } from "@/types/UserInformation";
import AppointmentsMotion from "@/components/AppointmentsMotion/AppointmentsMotion";
import { IReservations } from "@/types/Reservations";

export const metadata: Metadata = {
  title: "My_Appointments",
};


export default async function AppointmentsPage() {
  const reservations: IReservations[] = await GetUserReservation();

  return (
    <>
      <SuccessPaypal />
      <SuccessStripe />
      <CacheMessage />

      <div className="min-h-screen">
        <div className="container mx-auto py-10 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <AppointmentsMotion reservations={reservations}/>
          </div>
        </div>
      </div>
    </>
  );
}
