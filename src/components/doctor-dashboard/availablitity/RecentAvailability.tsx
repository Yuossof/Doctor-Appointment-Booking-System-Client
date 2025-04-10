"use client"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { GetAllAppointmens } from "@/lib/services/doctor-dashboard/getAllAppointments"
import { WeaklyAppointments } from "@/types/Appointments"
import { formatTimestamp } from "@/lib/formatDate"
import { Input } from "@/components/ui/input"
import { editAppointment } from "@/lib/services/doctor-dashboard/edit-appointment"
interface Data {
    start_time: string,
    end_time: string,
    id: number | string | null
}

export function RecentAvailability() {
    const [weaklyAppointments, setWeaklyAppointments] = useState<WeaklyAppointments[]>([])
    const [showBox, setShowBox] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [data, setData] = useState<Data>({
        start_time: "",
        end_time: "",
        id: null
    })

    useEffect(() => {
        const getReservations = async () => {
            const res = await GetAllAppointmens()
            // setAppointmentData(res)
            setWeaklyAppointments(res.data.weakly_appointments)
        }
        getReservations()
    }, [])

    const handelEdit = async () => {
        setIsLoading(true)
        await editAppointment(data.id as number, {
            start_time: data.start_time,
            end_time: data.end_time
        })
        setIsLoading(false)
    }

    
    return (
        <div className="border-[1px] border-gray-700 rounded-md overflow-hidden">
            {showBox && (
                <div
                onClick={()=> setShowBox(false)} 
                className="fixed top-0 right-0 w-full h-full left-0 flex justify-center bg-black bg-opacity-65 items-center z-50">
                    <div onClick={(e)=> e.stopPropagation()} className="w-2/6 flex flex-col gap-3 p-4 rounded-md bg-slate-800">
                        <div className="flex items-center gap-3">
                            <Input onChange={(e)=> setData({...data, start_time: e.target.value})} type="text" className="border-gray-500 bg-transparent text-gray-400" value={data.start_time} />
                            <Input onChange={(e)=> setData({...data, end_time: e.target.value})} type="text" className="border-gray-500 bg-transparent text-gray-400" value={data.end_time} />
                        </div>
                        <Button disabled={isLoading} onClick={()=> handelEdit()}>Save</Button>
                    </div>
                </div>
            )}
            <Table >
                <TableHeader>
                    <TableRow className="bg-slate-800 hover:bg-slate-800 border-gray-600">
                        <TableHead className="text-gray-300">ID</TableHead>
                        <TableHead className="text-gray-300">start_time</TableHead>
                        <TableHead className="text-gray-300">end_time</TableHead>
                        <TableHead className="text-gray-300">status</TableHead>
                        <TableHead className="text-gray-300">created_At</TableHead>
                        <TableHead className="text-gray-300">action</TableHead>
                    </TableRow>
                </TableHeader>
                {weaklyAppointments.map((weaklyAppointment, index) => (
                    <TableBody key={index}>
                        {weaklyAppointment.appointments.map((appointment) => (
                            <TableRow key={appointment.id} className="text-gray-400 hover:bg-transparent border-gray-600">
                                <TableCell>{appointment.id}</TableCell>
                                <TableCell>{appointment.start_time}</TableCell>
                                <TableCell>{appointment.end_time}</TableCell>
                                <TableCell>{appointment.status}</TableCell>
                                <TableCell>{formatTimestamp(appointment.created_at)}</TableCell>
                                <TableCell>
                                    <Button onClick={()=> {
                                        setData({
                                            start_time: appointment.start_time,
                                            end_time: appointment.end_time,
                                            id: appointment.id
                                        })
                                        setShowBox(true)
                                    }} className="bg-mid-blue" size="sm">
                                        Edit
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                ))}
            </Table>
        </div>
    )
}

