import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, MapPin } from 'lucide-react'
import ProfileInputs from "@/components/profile-page/ProfileInputs"
import { GetUser } from "@/lib/services/auth/GetUser"

export default async function ProfilePage() {
  const user = await GetUser();
  return (
    <>
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto overflow-hidden bg-slate-800 border-gray-700 shadow-lg"> 
        <div className="relative h-48 sm:h-64 bg-gradient-to-r from-blue-400 to-blue-600 z-[0]">
          <Button variant="secondary" size="icon" className="absolute top-4 right-4 bg-white/80 hover:bg-white">
            <Camera className="h-4 w-4" />
            <span className="sr-only">Change cover photo</span>
          </Button>
        </div>

        <div className="relative px-4 sm:px-8 pb-8">
          <div className="flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-center sm:items-end absolute -top-16 sm:-top-20 inset-x-4 sm:inset-x-8">
              <div className="relative mb-4 sm:mb-0">
                <Avatar className="w-32 h-32 border-4 border-white">
                  <AvatarImage src="/placeholder.svg?height=128&width=128" alt="Profile Picture" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-0 right-0 rounded-full bg-white hover:bg-gray-100"
                >
                  <Camera className="h-4 w-4" />
                  <span className="sr-only">Change profile picture</span>
                </Button>
              </div>

            </div>
            <div className="flex flex-col mt-14">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-300">John Doe</h1>
              <p className="text-gray-400 flex items-center mt-1">
                <MapPin className="h-4 w-4 mr-1" /> New York, USA
              </p>
            </div>
          </div>

          <div className="mt-9">
            <ProfileInputs user={user}/>
          </div>
        </div>
      </Card>
    </div>
    </>

  )
}