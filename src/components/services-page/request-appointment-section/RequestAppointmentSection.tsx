import { Button } from '@/components/ui/button'
import { CircleArrowRight } from 'lucide-react'
import React from 'react'

const RequestAppointmentSection = () => {
    return (
        <section className='w-full bg-dark-blue flex justify-center items-center  px-3 py-14'>
            <div className='flex lg:gap-9 justify-center w-full px-3 lg:w-[80%] md:flex-row flex-col'>
                <div className='md:w-2/4 w-full flex flex-col gap-7 items-center md:items-start'>
                    <div className='flex flex-col items-start gap-4 '>
                        <h1
                            className='font-semibold text-3xl sm:text-3xl md:text-4xl text-center md:text-left lg:text-4xl lg:mt-0 mt-4 text-white'>
                            Leave Your Worries At The Door And Enjoy A Healthier, More Precise Smile
                        </h1>
                        <p className='text-muted-foreground text-center md:text-left'>
                            We use only the best quality materials on the market in order to provide the best
                            products to our patients
                            So don’t worry about anything and book yourself.
                        </p>
                    </div>
                    <Button className='bg-mid-blue py-6 px-6 flex items-center gap-2 mt-5'>
                        <span>Learn More</span>
                        <CircleArrowRight />
                    </Button>
                </div>
                <div className='md:w-2/4 w-full flex justify-center md:justify-end'>
                    <div className='bg-white md:w-[80%] w-full px-4 py-5 flex flex-col gap-6 items-center rounded-md md:mt-0 mt-9'>
                        <h2 className='md:text-3xl text-2xl text-dark-blue font-semibold mt-2'>Request Appointment</h2>
                        <div className='flex flex-col gap-4 mt-3 w-full'>
                            <input
                                className='w-full border-[1px] border-gray-300 rounded-sm py-3 pl-2 outline-none text-gray-700'
                                type="text"
                                placeholder='Full Name'
                            />

                            <input
                                className='w-full border-[1px] border-gray-300 rounded-sm py-3 pl-2 outline-none text-gray-700'
                                type="text"
                                placeholder='Phone Number'
                            />

                            <input
                                className='w-full border-[1px] border-gray-300 rounded-sm py-3 pl-2 outline-none text-gray-700'
                                type="text"
                                placeholder='Email Address'
                            />
                        </div>
                        <div className='w-full'>
                            <Button className='w-full bg-mid-blue'>Submit</Button>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default RequestAppointmentSection