"use client"
import { Card, CardContent } from '@/components/ui/card'
import { GetUserDocs } from '@/lib/services/doctor-dashboard/getUserDocs'
import React, { useState } from 'react'
import Image from 'next/image'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Calendar, FileText } from 'lucide-react'
import { Report } from '@/types/Docs'
import { formatTimestamp } from '@/lib/formatDate'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { updateDoc } from '@/lib/services/doctor-dashboard/updateDocs'
import { deleteDoc } from '@/lib/services/doctor-dashboard/deleteDoc'
const Docs = ({ userID }: { userID: string | number }) => {
    const [data, setData] = useState({
        type: "",
        desc: "",
    })
    const [reportId, setReportId] = useState<string | null | number>(null)
    const [isEdit, setIsEdit] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const [resports, setReports] = useState<Report[]>([])
    const [reget, setReget] = useState(false)

    useEffect(() => {
        const getDocs = async () => {
            const res = await GetUserDocs()
            console.log(res)
            setReports(res)
        }

        getDocs()
    }, [reget])

    const handelEdit = (type: string, desc: string) => {
        setIsEdit(true)
        setData({ type, desc })
    }

    const saveEdit = async () => {
        setIsLoading(true)
        await updateDoc({
            ...data,
            user_id: userID
        }, reportId as number)
        setIsLoading(false)
        setIsEdit(false)
        setReget(!reget)
    }

    const deleteReport = async (reportID: string | number) => {
        setIsLoading(true)
        await deleteDoc(reportID)
        setReget(!reget)   
        setIsLoading(false)
    }

    return (
        <>
            {isEdit && (
                <div
                    onClick={() => setIsEdit(false)}
                    className="fixed top-0 right-0 w-full h-full left-0 flex justify-center bg-black bg-opacity-65 items-center z-50">
                    <div onClick={(e) => e.stopPropagation()} className="w-2/6 flex flex-col gap-3 p-4 rounded-md bg-slate-800">
                        <div className="flex items-center gap-3">
                            <Input onChange={(e) => setData({ ...data, type: e.target.value })} type="text" className="border-gray-500 bg-transparent text-gray-400" value={data.type} />
                            <Input onChange={(e) => setData({ ...data, desc: e.target.value })} type="text" className="border-gray-500 bg-transparent text-gray-400" value={data.desc} />
                        </div>
                        <Button disabled={isLoading} onClick={saveEdit}>Save</Button>
                    </div>
                </div>
            )}
            <Card className="bg-slate-800 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden border-gray-700 border-[1px]">
                <CardContent className="p-6">
                    <ScrollArea className="h-[600px] pr-4">
                        {resports.map((report, index) => (
                            <Card key={report.id} className="mb-8 last:mb-0 overflow-hidden bg-slate-900 border-[1px] border-gray-600">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-center mb-4">
                                        <Badge variant="outline" className="text-lg py-1 px-3 text-gray-400 border-[1px] border-gray-600">
                                            Report #{index + 1}
                                        </Badge>
                                        <div className="flex items-center text-sm text-muted-foreground">
                                            <Calendar className="h-4 w-4 mr-1" />
                                            {formatTimestamp(report.created_at)}
                                        </div>
                                    </div>
                                    <div className="flex flex-col md:flex-row gap-6">
                                        <div className="w-full md:w-1/3 ">
                                            <Image
                                                src={report?.user_docs_images[0]?.image_url || "/placeholder.svg"}
                                                alt={`Medical report for`}
                                                width={300}
                                                height={300}
                                                className="w-full h-auto rounded-lg shadow-md border-2"
                                            />
                                        </div>
                                        <div className="w-full md:w-2/3">
                                            <div className="flex items-center space-x-2 mb-2">
                                                <FileText className="h-5 w-5 text-indigo-600" />
                                                <h3 className="text-xl font-semibold text-indigo-600">{report.type}</h3>
                                            </div>
                                            <p className="text-gray-400 leading-relaxed">{report.desc}</p>
                                        </div>
                                    </div>
                                    <div className='mt-3 w-full flex justify-end gap-3'>
                                        <Button onClick={() => {
                                            handelEdit(report.type, report.desc)
                                            setReportId(report.id)
                                        }}>Edit</Button>
                                        <Button
                                        disabled={isLoading}
                                        onClick={()=> deleteReport(report.id)}
                                         variant="destructive">Delete</Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </ScrollArea>
                </CardContent>
            </Card>
        </>
    )
}

export default Docs