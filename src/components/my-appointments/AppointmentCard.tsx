"use client"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, MapPin } from "lucide-react"
import StatusBadge from "./StatusBadge"
import { Button } from "../ui/button"
import CancelAppointmentDialog from "./CancelAppointmentDialog"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AppointmentCard({ doctorName, specialty, date, time, location, status, avatarSrc, avatarFallback }: any) {
    return (
        <Card className="overflow-hidden border-[1px] shadow-sm">
            <CardHeader className="pb-0">
                <div className="flex justify-between items-start">
                    <StatusBadge status={status} />
                </div>
            </CardHeader>
            <CardContent className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4">
                    <Avatar className="h-20 w-20 border-2 border-muted">
                        <AvatarImage src={avatarSrc} alt={doctorName} />
                        <AvatarFallback className="text-lg">{avatarFallback}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-3 flex-1">
                        <div>
                            <h3 className="font-bold text-lg">{doctorName}</h3>
                            <p className="text-muted-foreground">{specialty}</p>
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center gap-2 text-sm">
                                <Calendar className="h-4 w-4 text-primary" />
                                <span>{date}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <Clock className="h-4 w-4 text-primary" />
                                <span>{time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                                <MapPin className="h-4 w-4 text-primary" />
                                <span>{location}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
            <CardFooter className="flex flex-wrap gap-2 justify-end border-t bg-muted/20 py-3">
                <Button variant="outline">View Details</Button>
                {status === "upcoming" && <CancelAppointmentDialog />}
            </CardFooter>
        </Card>
    )
}