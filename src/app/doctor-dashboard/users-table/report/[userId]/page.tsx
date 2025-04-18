import AddNewReportBox from "@/components/doctor-dashboard/user/reports/AddNewReportBox"
import AddSection from "@/components/doctor-dashboard/user/reports/AddSection"
import Docs from "@/components/doctor-dashboard/user/reports/Docs"

export default async function Page({ params }: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId;

  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <AddNewReportBox userID={Number(userId)} />
      <div className="max-w-7xl mx-auto">
        <AddSection />
        <div>
          <Docs userID={Number(userId)} />
        </div>
      </div>
    </div>
  );
}

