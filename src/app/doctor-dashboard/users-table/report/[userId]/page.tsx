import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserCircle, Stethoscope, FileText, Calendar } from "lucide-react"
import AddNewReportBox from "@/components/doctor-dashboard/user/reports/AddNewReportBox"
import AddSection from "@/components/doctor-dashboard/user/reports/AddSection"

interface Connection {
  id: string
  doctorName: string
  patientName: string
  medicalReports: MedicalReport[]
}

interface MedicalReport {
  id: string
  date: string
  imageUrl: string | null
  diseaseType: string
  diseaseDescription: string
}

const connections: Connection[] = [
  {
    id: "1",
    doctorName: "Dr. John Smith",
    patientName: "Jane Doe",
    medicalReports: [
      {
        id: "1a",
        date: "2023-10-26",
        imageUrl: "/images/Rectangle 662 (1).png",
        diseaseType: "Influenza",
        diseaseDescription:
          "Patient presented with fever, cough, and body aches.  Diagnosis of Influenza confirmed via rapid antigen test.",
      },
      {
        id: "1b",
        date: "2023-10-27",
        imageUrl: "/images/Rectangle 662 (1).png",
        diseaseType: "Pneumonia",
        diseaseDescription: "Chest X-ray revealed signs of pneumonia. Patient started on antibiotic treatment.",
      },
    ],
  },
]

export default function page() {
  return (
    <div className="min-h-screen bg-gradient-to-br p-8">
      <AddNewReportBox />
      <div className="max-w-7xl mx-auto">
        <AddSection />
        <div>
          {connections.map((connection, i) => (
            <Card key={i} className="bg-slate-800 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border-gray-700 border-[1px]">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Stethoscope className="h-8 w-8 text-indigo-600" />
                    <div>
                      <h2 className="text-2xl font-semibold text-indigo-600">{connection.doctorName}</h2>
                      <p className="text-indigo-500">Doctor</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <UserCircle className="h-8 w-8 text-indigo-600" />
                    <div>
                      <h2 className="text-2xl font-semibold text-indigo-600">{connection.patientName}</h2>
                      <p className="text-indigo-500">Patient</p>
                    </div>
                  </div>
                </div>
                <ScrollArea className="h-[600px] pr-4">
                  {connection.medicalReports.map((report, index) => (
                    <Card key={report.id} className="mb-8 last:mb-0 overflow-hidden bg-slate-900 border-[1px] border-gray-600">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-center mb-4">
                          <Badge variant="outline" className="text-lg py-1 px-3 text-gray-400 border-[1px] border-gray-600">
                            Report #{index + 1}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="h-4 w-4 mr-1" />
                            {report.date}
                          </div>
                        </div>
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/3 ">
                            <Image
                              src={report.imageUrl || "/placeholder.svg"}
                              alt={`Medical report for ${connection.patientName}`}
                              width={300}
                              height={300}
                              className="w-full h-auto rounded-lg shadow-md border-2"
                            />
                          </div>
                          <div className="w-full md:w-2/3">
                            <div className="flex items-center space-x-2 mb-2">
                              <FileText className="h-5 w-5 text-indigo-600" />
                              <h3 className="text-xl font-semibold text-indigo-600">{report.diseaseType}</h3>
                            </div>
                            <p className="text-gray-400 leading-relaxed">{report.diseaseDescription}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </ScrollArea>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

