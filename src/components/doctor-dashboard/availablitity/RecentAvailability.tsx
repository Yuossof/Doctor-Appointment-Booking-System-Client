import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const recentAvailability = [
    { id: 1, date: "2023-06-01", startTime: "09:00", endTime: "17:00" },
    { id: 2, date: "2023-06-02", startTime: "10:00", endTime: "18:00" },
    { id: 3, date: "2023-06-03", startTime: "08:00", endTime: "16:00" },
]

export function RecentAvailability() {
    return (
        <div className = "border-[1px] border-gray-700 rounded-md overflow-hidden">
            <Table >
                <TableHeader>
                    <TableRow className="bg-slate-800 hover:bg-slate-800 border-gray-600">
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">Start Time</TableHead>
                        <TableHead className="text-gray-300">End Time</TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody >
                    {recentAvailability.map((availability) => (
                        <TableRow key={availability.id} className="text-gray-400 hover:bg-transparent border-gray-600">
                            <TableCell>{availability.date}</TableCell>
                            <TableCell>{availability.startTime}</TableCell>
                            <TableCell>{availability.endTime}</TableCell>
                            <TableCell>
                                <Button className="bg-mid-blue" size="sm">
                                    Edit
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

