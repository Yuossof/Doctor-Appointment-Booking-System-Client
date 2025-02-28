import React from 'react'
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AvatarCmp } from '@/components/Avatar';

const HappyClients = () => {
    const clients = [
        {
            pic: "",
            name: "Thomas daniel",
            rate: 5,
            desc: " We use only the best quality best products to our patients,materials on the market in order to provideprovide So don't worry about anything and book yourself"
        },
        {
            pic: "",
            name: "Thomas daniel",
            rate: 5,
            desc: " We use only the best quality materials on the market in order to provideprovide the best products to our patients, So don't worry about anything and book yourself"
        },
        {
            pic: "",
            name: "Thomas daniel",
            rate: 5,
            desc: " We use only the best quality materials on the market in order to provideprovide the best products to our patients, So don't worry about anything and book yourself"
        },
        {
            pic: "",
            name: "Thomas daniel",
            rate: 5,
            desc: " We use only the best quality materials on the market in order to provideprovide the best products to our patients, So don't worry about anything and book yourself"
        },
    ]

    return (
        <div className='flex flex-col w-full items-center px-[15px]'>
            <div className='flex justify-center flex-col text-center gap-4 items-center w-full'>
                <h2 className='font-semibold text-2xl  sm:text-2xl md:text-3xl lg:text-4xl lg:mt-0 mt-4 text-dark-blue lg:max-w-[80%] '>Our Happy Clients</h2>
                <p className='text-muted-foreground text-md text-center'>We use only the best quality materials on the market in order <br /> to provide the best products to our patients.</p>
            </div>
            <div className='grid 2xl:grid-cols-4 md:grid-cols-3 grid-cols-1 gap-7 mt-11 w-auto lg:w-[80%]'>
                {clients.map((client, i) => (
                    <div key={i} className='flex flex-col items-start p-4 shadow-lg bg-slate-50 rounded-lg border-[1px] border-gray-300'>
                        <div className='flex gap-2'>
                            <div>
                                <AvatarCmp imgSrc="https://github.com/shadcn.png" />
                            </div>
                            <div>
                                <h3 className='text-md text-dark-blue'>{client.name}</h3>
                                {[1, 2, 3, 4, 5].map((star, i) => (
                                    // eslint-disable-next-line react/jsx-key
                                    (i + 1) <= client.rate ? <StarIcon key={star} className="text-yellow-400 w-5 h-5" /> : <StarBorderIcon className='text-gray-600 w-5 h-5' />
                                ))}
                            </div>
                        </div>
                        <div className='text-left mt-3'>
                            <p className='text-sm text-muted-foreground'>
                                {client.desc}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className='w-full flex justify-end mt-2 lg:w-[80%]'>
                <Button variant="link">view more <ChevronRight /></Button>
            </div>
        </div>
    )
}

export default HappyClients