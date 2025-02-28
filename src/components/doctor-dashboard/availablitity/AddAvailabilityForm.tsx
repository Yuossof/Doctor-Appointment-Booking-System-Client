"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function AddAvailabilityForm() {
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")

    const days = [
        { id: crypto.randomUUID(), day: "Monday" },
        { id: crypto.randomUUID(), day: "Tuesday" },
        { id: crypto.randomUUID(), day: "Wednesday" },
        { id: crypto.randomUUID(), day: "Thursday" },
        { id: crypto.randomUUID(), day: "Friday" },
        { id: crypto.randomUUID(), day: "Saturday" },
        { id: crypto.randomUUID(), day: "Sunday" },
    ]
    return (
        <Card className="bg-slate-800 pt-4 shadow-lg border-[1px] border-gray-700">
            <CardContent className="">
                <form onSubmit={() => { }} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-gray-400">Date</Label>
                        <div className="w-full flex items-center gap-3">
                            {days.map((day) => (
                                <div
                                    onClick={() => setSelectedDay(day.day)}
                                    key={day.id}
                                    className={` py-2 px-4 rounded-md text-gray-400 cursor-pointer 
                                                ${selectedDay === day.day ? "border-blue-500 border-2" : "border-slate-600 border-[2px]"}`}>
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
                                type="time"
                                className="bg-transparent text-gray-300 border-gray-600 w-full py-2 px-3 outline-none border-[1px] rounded-md"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="end-time" className="text-gray-400">End Time</Label>
                            <input
                                id="end-time"
                                type="time"
                                value={endTime}
                                className="bg-transparent text-gray-300 border-gray-600 w-full py-2 px-3 outline-none border-[1px] rounded-md"
                                onChange={(e) => setEndTime(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Add Availability
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
}

// ليه بيعمل تحديد للكل