import React from 'react'
import { AddAvailabilityForm } from '@/components/doctor-dashboard/availablitity/AddAvailabilityForm'
import { RecentAvailability } from '@/components/doctor-dashboard/availablitity/RecentAvailability'

const page = () => {
    return (
        <div className="container mx-auto py-10">
            <div className="">
                <div>
                    <h2 className="text-2xl font-semibold mb-4 text-slate-300">Add New Availability</h2>
                    <AddAvailabilityForm />
                </div>

                <div className="mt-12">
                    <h2 className="text-2xl font-semibold mb-4 text-slate-300">Recently Added Availability</h2>
                    <RecentAvailability />
                </div>
            </div>
        </div>
    )
}

export default page