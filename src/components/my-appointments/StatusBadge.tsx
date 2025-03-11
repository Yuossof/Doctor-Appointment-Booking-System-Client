import { Badge } from "@/components/ui/badge"

export default function StatusBadge({ status }: { status: string }) {
  if (status === "upcoming") {
    return <Badge className="bg-blue-500 hover:bg-blue-600 rounded-full px-3 py-1 text-xs font-medium">Upcoming</Badge>
  } else if (status === "completed") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600 rounded-full px-3 py-1 text-xs font-medium">Completed</Badge>
    )
  } else if (status === "cancelled") {
    return (
      <Badge variant="destructive" className="rounded-full px-3 py-1 text-xs font-medium">
        Cancelled
      </Badge>
    )
  }
  return null
}
