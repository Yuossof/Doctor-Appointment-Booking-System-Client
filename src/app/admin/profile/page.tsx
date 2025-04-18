import { Card } from "@/components/ui/card"

import ProfileInputs from "@/components/profile-page/ProfileInputs"
import ProfilePicture from "@/components/ProfilePicture/ProfilePicture"
import ProfileButtons from "@/components/ProfileButtons/ProfileButtons"
import { GetUser } from "@/lib/services/auth/GetUser"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Profile'
}

export default async function ProfilePage() {
  const user = await GetUser();
  return (
    <div className="container mx-auto py-10 px-4">
      <Card className="max-w-4xl mx-auto overflow-hidden bg-slate-800 border-gray-700 shadow-lg">
        <div className="relatiove h-48 sm:h-64 bg-gradient-to-r from-blue-400 to-blue-600"></div>
        <div className="relative px-4 sm:px-8 pb-8">
          <div className="flex flex-col">
            <ProfilePicture user={user}/>
            {/* <ProfileButtons user={user}/> */}
          </div>
          <div className="mt-16">
            <ProfileInputs user={user}/>
          </div>
        </div>
      </Card >
    </div >
  )
}