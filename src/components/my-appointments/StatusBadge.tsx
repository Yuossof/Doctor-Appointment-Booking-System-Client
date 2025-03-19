import { Badge } from "@/components/ui/badge"

export default function StatusBadge({ showStatus }: { showStatus: string }) {
  if (showStatus === "pendding") {
    return <Badge className="bg-blue-500 hover:bg-blue-600 rounded-full px-3 py-1 text-xs font-medium">Pendding</Badge>
  } else if (showStatus === "complete") {
    return (
      <Badge className="bg-green-500 hover:bg-green-600 rounded-full px-3 py-1 text-xs font-medium">Completed</Badge>
    )
  } else if (showStatus === "cancel") {
    return (
      <Badge variant="destructive" className="rounded-full px-3 py-1 text-xs font-medium">
        Cancelled
      </Badge>
    )
  }
  return null
}
