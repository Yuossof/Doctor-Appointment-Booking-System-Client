"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin } from "lucide-react"
import StatusBadge from "./StatusBadge"
import { Button } from "../ui/button"
import { GiTakeMyMoney } from "react-icons/gi";
import { TbCurrencyMonero } from "react-icons/tb";
import { MdAttachMoney } from "react-icons/md";
import { FaHourglassEnd } from "react-icons/fa";
import GetToken from "@/lib/services/auth/GetToken"
import { useState } from "react"
import axios from "axios"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { childeDiv, childNav, parentDiv } from "../ParentAndChildAnimation"

export default function AppointmentCard({ appointment_id, id, doctorName, specialty, price, is_paid, payment_method, showStatus, date, time, location, avatarSrc, avatarFallback }: any) {
    const [pendding, setPendding] = useState(false);
    const router = useRouter();

    const handleDelete = async (id: number) => {
        const token = await GetToken();
        try {
            setPendding(true)
             await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/reservations/cancel/${id}`, { appointment_id }, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setPendding(false);
            router.push('/my-appointments');
        } catch (error) {
            setPendding(false);
        }
    }

    return (
        <Card className="overflow-hidden border-[1px] shadow-sm ">
            <CardHeader className="pb-0">
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="flex justify-between items-start">
                    <StatusBadge showStatus={showStatus} />
                </motion.div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        whileInView={{ scale: [1.2, 1], opacity: 1 }}
                        transition={{ duration: 0.7, ease: 'easeIn' }}
                    >
                        <Avatar className="h-20 w-20 border-2 border-muted">
                            <AvatarImage src={avatarSrc} alt={doctorName} />
                            <AvatarFallback className="text-lg">{avatarFallback}</AvatarFallback>
                        </Avatar>
                    </motion.div>
                    <div className="space-y-3 flex-1">
                        <motion.div
                            variants={parentDiv}
                            initial='hidden'
                            whileInView='visible'
                        >
                            <motion.h3
                                variants={childNav}
                                className="font-bold text-lg">{doctorName}</motion.h3>
                            <motion.p
                                variants={childNav}
                                className="text-muted-foreground">{specialty}</motion.p>
                        </motion.div>

                        <motion.div
                            variants={parentDiv}
                            initial='hidden'
                            whileInView='visible'
                            className="grid gap-2">
                            <motion.div
                                variants={childeDiv}
                                className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>{date}</span>
                            </motion.div>
                            <motion.div
                                variants={childeDiv}
                                className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{time}</span>
                            </motion.div>
                            <motion.div
                                variants={childeDiv}
                                className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{location}</span>
                            </motion.div>
                            <motion.div
                                variants={childeDiv}
                                className="flex items-center gap-2 text-sm">
                                <FaHourglassEnd className="h-4 w-4 text-primary" />
                                <span>{showStatus}</span>
                            </motion.div>
                            <motion.div
                                variants={childeDiv}
                                className="flex items-center gap-2 text-sm">
                                <TbCurrencyMonero className="h-4 w-4 text-primary" />
                                <span>{payment_method}</span>
                            </motion.div>
                            <motion.div
                                variants={childeDiv}
                                className="flex items-center gap-2 text-sm">
                                <GiTakeMyMoney className="h-4 w-4 text-primary" />
                                <span>{price}</span>
                            </motion.div>
                            <motion.div
                                variants={childeDiv}
                                className="flex items-center gap-2 text-sm">
                                <MdAttachMoney className="h-4 w-4 text-primary" />
                                <span>{is_paid}</span>
                            </motion.div>
                        </motion.div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 justify-end border-t bg-muted/20 py-3">
                <motion.div
                    initial={{ x:20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.7, ease: 'easeInOut' }}
                >
                    <Button className="disabled:opacity-50 disabled:cursor-not-allowed" disabled={pendding} onClick={() => handleDelete(id)} variant="destructive">
                        {pendding == true ? (
                            <span className="flex items-center gap-3">Loading<span className="loader"></span></span>
                        ) : (
                            'Cancel Appointment'
                        )}
                    </Button>
                </motion.div>
            </CardFooter>
        </Card>
    )
}