
import AddNewReportBox from "@/components/profile-page/reports/AddNewReportBox"
import UpdateReport from "@/components/profile-page/reports/UpdateReport"
import AddSection from "@/components/profile-page/reports/AddSection"
import { Metadata } from "next"
import { GetDocs } from "@/lib/services/GetDocumentations"
import { Doc } from "@/types/Docs"
import ShowImageReport from "@/components/ImageReport/ShowImageReport"
import ReservationsCard from "@/components/ReservationsCard/ReservationsCard"

export const metadata: Metadata = {
  title: 'Reports'
}

export default async function MedicalConnectionsPage() {
  const docs: Doc[] = await GetDocs();
  return (
    <div className="min-h-screen relative bg-gradient-to-br p-8">
      <ShowImageReport />
      <AddNewReportBox />
      <UpdateReport />
      <div className="max-w-7xl mx-auto">
        <AddSection />
        <div>
          {docs && docs?.length > 0 &&
            docs?.map((doc, i) => (
              // eslint-disable-next-line react/jsx-key
              <ReservationsCard docs={docs} doc={doc} i={i}/>

            ))}
        </div>
      </div>
    </div>
  )
}

