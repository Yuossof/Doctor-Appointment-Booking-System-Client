'use client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AppointmentCard from '../my-appointments/AppointmentCard';
import { IReservations } from '@/types/Reservations';
import { motion } from "framer-motion";
import { childeDiv, parentDiv } from "../ParentAndChildAnimation";

export default function AppointmentsMotion({ reservations }: { reservations: IReservations[] }) {
    return (
        <>
            <motion.div
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className="space-y-2 text-center mb-8">
                <motion.h1
                    variants={childeDiv}
                    className="text-3xl font-bold tracking-tight">My Appointments</motion.h1>
                <motion.p
                    variants={childeDiv}
                    className="text-muted-foreground">View and manage your appointments with doctors</motion.p>
            </motion.div>

            <Tabs defaultValue="pendding" className="w-full">
                <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    whileInView={{ scale: [1.2, 1], opacity: 1 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                >
                    <TabsList className="grid w-full grid-cols-3 mb-8">
                        <TabsTrigger value="pendding">pendding</TabsTrigger>
                        <TabsTrigger value="complete">completed</TabsTrigger>
                        <TabsTrigger value="cancel">Canceled</TabsTrigger>
                    </TabsList>
                </motion.div>
                <TabsContent value="pendding" className="space-y-6 overflow-auto min-h-[420px]">
                    {reservations &&
                        reservations.length > 0 &&
                        reservations
                            .filter((reserve) => reserve.status === "pendding")
                            .map((reserve) => (
                                <AppointmentCard
                                    key={reserve?.id}
                                    doctorName={reserve?.doctor?.first_name + ' ' + reserve?.doctor?.last_name}
                                    date={new Date(reserve?.created_at).toLocaleDateString()}
                                    time={reserve?.appointment?.start_time}
                                    location={reserve?.doctor?.clinic_address}
                                    avatarSrc={reserve.doctor.image_url}
                                    specialty={reserve?.doctor?.specialization?.name_en}
                                    showStatus={reserve?.status}
                                    payment_method={reserve?.payment_method}
                                    price={reserve?.feese?.price}
                                    is_paid={reserve?.is_paid}
                                    appointment_id={reserve?.appointment_id}
                                    id={reserve?.id}
                                />
                            ))}
                </TabsContent>

                <TabsContent value={'complete'} className="space-y-6 overflow-auto min-h-[420px]">
                    {reservations &&
                        reservations.length > 0 &&
                        reservations
                            .filter((reserve) => reserve.status === "complete" || reserve.status === 'finished')
                            .map((reserve) => (
                                <AppointmentCard
                                    key={reserve?.id}
                                    doctorName={reserve?.doctor?.first_name + ' ' + reserve?.doctor?.last_name}
                                    date={new Date(reserve?.created_at).toLocaleDateString()}
                                    time={reserve?.appointment?.start_time}
                                    location={reserve?.doctor?.clinic_address}
                                    appointment_id={reserve?.appointment_id}
                                    specialty={reserve?.doctor?.specialization?.name_en}
                                    showStatus={reserve?.status}
                                    price={reserve?.feese?.price}
                                    is_paid={reserve?.is_paid}
                                    payment_method={reserve?.payment_method}
                                    avatarSrc={reserve.doctor.image_url}
                                    id={reserve?.id}
                                />
                            ))}
                </TabsContent>

                <TabsContent value="cancel" className="space-y-6 overflow-auto min-h-[420px]">
                    {reservations &&
                        reservations.length > 0 &&
                        reservations
                            .filter((reserve) => reserve.status === "cancel")
                            .map((reserve) => (
                                <AppointmentCard
                                    key={reserve?.id}
                                    doctorName={reserve?.doctor?.first_name + ' ' + reserve?.doctor?.last_name}
                                    date={new Date(reserve?.created_at).toLocaleDateString()}
                                    time={reserve?.appointment?.start_time}
                                    showStatus={reserve?.status}
                                    location={reserve?.doctor?.clinic_address}
                                    specialty={reserve?.doctor?.specialization?.name_en}
                                    price={reserve?.feese?.price}
                                    is_paid={reserve?.is_paid}
                                    payment_method={reserve?.payment_method}
                                    avatarSrc={reserve.doctor.image_url}
                                    appointment_id={reserve?.appointment_id}
                                    id={reserve?.id}
                                />
                            ))}
                </TabsContent>
            </Tabs>
        </>
    )
}
