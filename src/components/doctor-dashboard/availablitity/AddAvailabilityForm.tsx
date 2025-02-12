"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"

export function AddAvailabilityForm() {
    const [date, setDate] = useState("")
    const [startTime, setStartTime] = useState("")
    const [endTime, setEndTime] = useState("")


    return (
        <Card className="bg-slate-800 pt-4 shadow-lg border-[1px] border-gray-700">
            <CardContent className="">
                <form onSubmit={() => { }} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="date" className="text-gray-400">Date</Label>
                        <input
                            id="date"
                            type="date"
                            className="bg-transparent text-gray-300 border-gray-600 w-full py-2 px-3 outline-none border-[1px] rounded-md"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            required
                        />
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

