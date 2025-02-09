import Specialists from '@/components/specialists-page/Specialists'
import React from 'react'

const Specialist = () => {
    return (
        <div className='flex flex-col items-center container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>
            <div className='text-center flex flex-col items-center mt-14'>
                <h1 className='lg:text-4xl text-3xl font-semibold text-dark-blue '>Meet Our Specialists</h1>
                <p className='text-muted-foreground mt-6 lg:max-w-[69%]'>
                    We use only the best quality materials on the market in order to provide the best products to our patients,
                    So don’t worry about anything and book yourself.
                </p>
            </div>
            <div className="mt-24 w-full"></div>
            <div>
                <Specialists />
            </div>
        </div>
    )
}

export default Specialist