import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const DentalAdvantages = () => {
    return (
        <section className='flex lg:justify-between md:justify-between lg:flex-row bg-slate-100 rounded-lg p-9 gap-5 flex-col items-center'>
            <div className='lg:w-2/4 w-full lg:justify-start justify-center lg:flex flex lg:pl-24 md:hidden'>
                <Image src="/images/Rectangle-631.png" alt='img' width={400} height={300} />
            </div>
            <div className='flex-1 flex flex-col gap-9 lg:items-start items-center lg:pr-9 '>
                <div className='lg:text-left text-center flex flex-col gap-6'>
                    <h2 className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-5xl lg:mt-0 mt-4 text-dark-blue lg:max-w-[80%] '>
                        Why choose Smile for all your dental treatments?
                    </h2>
                    <p className='text-muted-foreground text-md lg:max-w-[80%]'>
                        We use only the best quality materials on the market in order to provide the best products to our patients.
                    </p>
                    <div className='flex flex-col gap-3 mt-5'>
                        <div className='flex items-center gap-2'>
                            <Image src="/icons/Shield Done.png" alt='icon' width={21} height={21} />
                            <span>Top quality dental team</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image src="/icons/Shield Done.png" alt='icon' width={21} height={21} />
                            <span>State of the art dental services</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image src="/icons/Shield Done.png" alt='icon' width={21} height={21} />
                            <span>Discount on all dental treatment</span>
                        </div>
                        <div className='flex items-center gap-2'>
                            <Image src="/icons/Shield Done.png" alt='icon' width={21} height={21} />
                            <span>Enrollment is quick and easy</span>
                        </div>
                    </div>
                </div>
                <Button className='bg-mid-blue h-14'>Book an appointment</Button>
            </div>
        </section>
    )
}

export default DentalAdvantages