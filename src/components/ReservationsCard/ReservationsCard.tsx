'use client';
import { Doc } from '@/types/Docs'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { UserCircle, Stethoscope, FileText, Calendar } from "lucide-react"
import ImageReport from '../ImageReport/ImageReport'
import ActionReport from '../ActionReport/ActionReport'
import { motion } from 'framer-motion';
import { childNav, parentDiv } from '../ParentAndChildAnimation';

export default function ReservationsCard({ docs, doc, i }: { docs: Doc[], doc: Doc, i: number }) {
    return (
        <Card className="bg-white/80 my-4 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden ">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                    <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex items-center space-x-4">
                        {doc?.doctor ? (
                            <Stethoscope className="h-8 w-8 text-indigo-600" />
                        ) : (
                            <UserCircle className="h-8 w-8 text-indigo-600" />
                        )}
                        <div>
                            <h2 className="text-2xl font-semibold text-indigo-800">{doc?.doctor ? doc?.doctor?.first_name + ' ' + doc?.doctor?.last_name : 'Created By Me'}</h2>
                            {doc?.doctor && (
                                <p className="text-indigo-600">Doctor</p>
                            )}
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ x: 20, opacity: 0 }}
                        whileInView={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.3, ease: 'easeOut' }}
                        className="flex items-center space-x-4">
                        <UserCircle className="h-8 w-8 text-indigo-600" />
                        <div>
                            <h2 className="text-2xl font-semibold text-indigo-800">{doc?.user?.first_name + ' ' + doc?.user?.last_name}</h2>
                            <p className="text-indigo-600">Patient</p>
                        </div>
                    </motion.div>
                </div>
                <ScrollArea className="pr-4">
                    <Card className="mb-8 last:mb-0 overflow-y-auto overflow-x-hidden h-[715px]">
                        <CardContent className="p-6">
                            <motion.div
                                initial={{ x: -20, opacity: 0 }}
                                whileInView={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                                className="flex justify-between items-center mb-4">
                                <Badge variant="outline" className="text-lg py-1 px-3">
                                    Report # {i + 1}
                                </Badge>
                                <motion.div
                                    initial={{ x: 50, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, ease: 'easeOut' }}
                                    className="flex items-center text-sm text-gray-500">
                                    <Calendar className="h-4 w-4 mr-1" />
                                    {new Date(doc?.created_at).toLocaleString('en-En', { timeZone: 'Africa/Cairo' })}
                                </motion.div>
                            </motion.div>
                            <div className="flex flex-col md:flex-row gap-4">
                                <div className="flex flex-wrap gap-10">
                                    {docs && docs?.length > 0 &&
                                        doc?.user_docs_images && doc?.user_docs_images?.length > 0 &&
                                        doc?.user_docs_images?.map((image) => (
                                            <ImageReport key={image?.id} image={image} doc={doc} />
                                        ))}
                                </div>
                                <motion.div
                                    variants={parentDiv}
                                    initial='hidden'
                                    whileInView='visible'
                                    className="w-full ">
                                    <motion.div
                                        variants={childNav}
                                        className="flex items-center space-x-2 mb-2">
                                        <FileText className="h-5 w-5 text-indigo-600" />
                                        <h3 className="text-xl font-semibold text-indigo-800">{doc?.type}</h3>
                                    </motion.div>
                                    <motion.p
                                        variants={childNav}
                                        className="text-gray-700 leading-relaxed">{doc?.desc}</motion.p>
                                </motion.div>
                            </div>
                        </CardContent>
                        <ActionReport doc={doc} />
                    </Card>
                </ScrollArea>
            </CardContent>
        </Card>
    )
}
