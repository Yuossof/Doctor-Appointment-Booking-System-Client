"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'

const WelcomeSection = () => {
    const [PhoneNumber, setPhoneNumber] = useState<string | null>(null)

    const checkInputType = (eo: React.ChangeEvent<HTMLInputElement>) => {
        const regex = /^\d*$/;
        if (regex.test(eo.target.value)) {
            setPhoneNumber(eo.target.value);
        } else {
            eo.preventDefault();
        }
    }

    return (
        <section className='flex lg:justify-between lg:flex-row md:px-[65px] px-[10px] lg:px-[70px] flex-col items-center '>
            <div className='w-full relative  lg:justify-end justify-center lg:hidden flex '>
                <Image src="/images/Group-1000001023.png" alt='img'
                    width={500}
                    height={400}
                    priority
                    className='md:scale-90'
                />
            </div>
            <div className='flex flex-col gap-12 flex-1 lg:items-start items-center pt-3 lg:pt-[24px]'>
                <div className='flex flex-col gap-7 lg:text-left text-center'>
                    <h2 className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-4xl text-dark-blue lg:max-w-[80%] lg:mt-0 mt-6'>
                        We're Welcoming New Patients And Can't Wait To Meet You
                    </h2>
                    <p className='text-muted-foreground text-md lg:max-w-[80%]'>
                        We use only the best quality materials on the market in order to provide
                        provide the best products to our patients, So don't worry about anything and book yourself
                    </p>
                </div>
                <div className='flex h-[50px] w-[90%] lg:w-[70%] md:w-[70%]'>
                    <input
                        value={PhoneNumber || ""}
                        onChange={checkInputType}
                        className='w-[80%] outline-none h-full border-r-0 border-gray-400 border-[1px] !pl-[10px] rounded-l-lg' type="text"
                        placeholder='Enter your Phone Number' />
                    <Button className='flex-1 h-full border-l-0 rounded-l-none bg-mid-blue'>Submit</Button>
                </div>
            </div>
            <div className='lg:w-2/4 w-full relative lg:flex hidden lg:justify-end justify-center '>
                <Image src="/images/Group-1000001023.png" alt='img'
                    width={500}
                    height={400}
                    priority
                    className='md:scale-90'
                />
            </div>
        </section>
    )
}

export default WelcomeSection