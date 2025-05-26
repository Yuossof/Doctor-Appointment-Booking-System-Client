import { Card } from "@/components/ui/card"

import ProfileInputs from "@/components/profile-page/ProfileInputs"
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
      <Card className="max-w-4xl mx-auto overflow-hidden">
        <div className="relative px-4 sm:px-8 pb-8">
          <div className="flex flex-col">
            <ProfileButtons/>
          </div>
          <div className="mt-9">
            <ProfileInputs user={user}/>
          </div>
        </div>
      </Card >
    </div >
  )
}