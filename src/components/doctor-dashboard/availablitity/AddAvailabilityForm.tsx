"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import axios from "axios"
import GetToken from "@/lib/services/auth/GetToken"
import { Day } from "@/types/Appointments"

export function AddAvailabilityForm({days,setReget,reget}: {days: Day[],setReget:React.Dispatch<React.SetStateAction<boolean>>
    , reget: boolean}) {
    const [selectedDay, setSelectedDay] = useState<number | string | null>(null);
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleTimeInput = (value: string, setter: (val: string) => void) => {
        let sanitizedValue = value.replace(/[^0-9:]/g, "");

        if (sanitizedValue.length === 2 && !sanitizedValue.includes(":")) {
            sanitizedValue += ":";
        }
        if (sanitizedValue.length > 5) {
            return;
        }
        setter(sanitizedValue);
    };

    const addAvailability = async () => {
        setIsLoading(true)
        const token = await GetToken()
        console.log(token)
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/doctors/appointments/store`
                , {
                    start_time: startTime+":00",
                    end_time: endTime+":00",
                    day_id: selectedDay,
                }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setStartTime("")
            setEndTime("")
        } catch (error) {
            console.error("Error fetching data!", error);
        } finally {
            setIsLoading(false)
        }
    };

    return (
        <Card className="bg-slate-800 pt-4 shadow-lg border-[1px] border-gray-700">
            <CardContent className="">
                <form onSubmit={() => { }} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-gray-400">Date</Label>
                        <div className="w-full flex items-center gap-3">
                            {days.map((day) => (
                                <div
                                    onClick={() => setSelectedDay(day.id)}
                                    key={day.id}
                                    className={` py-2 px-4 rounded-md text-gray-400 cursor-pointer 
                                                ${selectedDay === day.id ? "border-blue-500 border-2" : "border-slate-600 border-[2px]"}`}>
                                    {day.day}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="start-time" className="text-gray-400">Start Time</Label>
                            <input
                                id="start-time"
                                type="text"
                                className="bg-transparent text-gray-300 border-gray-600 w-full py-2 px-3 outline-none border-[1px] rounded-md"
                                value={startTime}
                                onChange={(e) => handleTimeInput(e.target.value, setStartTime)}
                                required
                                placeholder="00:00"
                            />

                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end-time" className="text-gray-400">End Time</Label>

                            <input
                                id="end-time"
                                type="text"
                                className="bg-transparent text-gray-300 border-gray-600 w-full py-2 px-3 outline-none border-[1px] rounded-md"
                                value={endTime}
                                onChange={(e) => handleTimeInput(e.target.value, setEndTime)}
                                required
                                placeholder="00:00"
                            />
                        </div>
                    </div>
                    <Button disabled={isLoading} onClick={(eo: React.FormEvent) => {
                        eo.preventDefault()
                        addAvailability()
                        setReget(!reget)
                    }} className="w-full">
                        Add Availability
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}
