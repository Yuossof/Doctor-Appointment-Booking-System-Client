import { Card } from "@/components/ui/card"

import ProfileInputs from "@/components/profile-page/ProfileInputs"
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
        <div className="relative px-4 sm:px-8 pb-8">
          <div className="mt-16">
            <ProfileInputs user={user}/>
          </div>
        </div>
      </Card >
    </div>
  )
}