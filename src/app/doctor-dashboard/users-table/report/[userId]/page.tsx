import AddNewReportBox from "@/components/doctor-dashboard/user/reports/AddNewReportBox"
import AddSection from "@/components/doctor-dashboard/user/reports/AddSection"
import { GetUser } from "@/lib/services/auth/GetUser"
import Docs from "@/components/doctor-dashboard/user/reports/Docs"


export default async function page({ params }: { params: { userId: string } }) {
  const user = await GetUser()
  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <AddNewReportBox userID={params.userId} doctorID={user.id} />
      <div className="max-w-7xl mx-auto">
        <AddSection />
        <div>
          <Docs userID={params.userId}/>
        </div>
      </div>
    </div>
  )
}

