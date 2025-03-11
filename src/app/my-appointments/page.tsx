
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AppointmentCard from "@/components/my-appointments/AppointmentCard"

export default function AppointmentsPage() {
  return (
    <div className="min-h-screen ">
      <div className="container mx-auto py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="space-y-2 text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">My Appointments</h1>
            <p className="text-muted-foreground">View and manage your appointments with doctors</p>
          </div>

          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="space-y-6">
              <AppointmentCard
                doctorName="Dr. Sarah Johnson"
                specialty="Cardiologist"
                date="March 15, 2025"
                time="10:30 AM"
                location="Medical Center, Building A, Room 305"
                status="upcoming"
                avatarSrc="/placeholder.svg?height=80&width=80"
                avatarFallback="SJ"
              />
              <AppointmentCard
                doctorName="Dr. Michael Chen"
                specialty="Dermatologist"
                date="March 22, 2025"
                time="2:15 PM"
                location="Skin Health Clinic, 123 Main St"
                status="upcoming"
                avatarSrc="/placeholder.svg?height=80&width=80"
                avatarFallback="MC"
              />
              <AppointmentCard
                doctorName="Dr. Emily Rodriguez"
                specialty="Neurologist"
                date="April 5, 2025"
                time="9:00 AM"
                location="Neurology Associates, Suite 400"
                status="upcoming"
                avatarSrc="/placeholder.svg?height=80&width=80"
                avatarFallback="ER"
              />
            </TabsContent>
            <TabsContent value="completed" className="space-y-6">
              <AppointmentCard
                doctorName="Dr. James Wilson"
                specialty="Orthopedic Surgeon"
                date="February 28, 2025"
                time="11:45 AM"
                location="Orthopedic Center, 2nd Floor"
                status="completed"
                avatarSrc="/placeholder.svg?height=80&width=80"
                avatarFallback="JW"
              />
              <AppointmentCard
                doctorName="Dr. Lisa Thompson"
                specialty="Ophthalmologist"
                date="February 10, 2025"
                time="3:30 PM"
                location="Vision Care Center"
                status="completed"
                avatarSrc="/placeholder.svg?height=80&width=80"
                avatarFallback="LT"
              />
            </TabsContent>
            <TabsContent value="cancelled" className="space-y-6">
              <AppointmentCard
                doctorName="Dr. Robert Davis"
                specialty="Psychiatrist"
                date="March 3, 2025"
                time="1:00 PM"
                location="Mental Health Clinic, Room 210"
                status="cancelled"
                avatarSrc="/placeholder.svg?height=80&width=80"
                avatarFallback="RD"
              />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}



