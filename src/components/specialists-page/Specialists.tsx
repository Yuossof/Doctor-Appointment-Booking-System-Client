import React from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'

const Specialists = () => {
    const sp = [
        {
            name: "DR.Brent",
            description: "When it comes to oral surgeons, few can compare to the modern-day legend that is Dr. James Connors.As our oral and maxillofacial surgery specialist, Dr.Connors will brighten your day with his seasoned expertise, welcoming conversations, and – of course – his signature rotation of fun bowties.Dr.Connors and his younger sister grew up in Massachusetts with a mother who worked as a hygienist and a grandfather who was a general dentist.",
            specility: "Specility in General & Cosmetic Services",
            image: "/images/Rectangle 662.png"
        },
        {
            name: "Dr. James Connors",
            description: ` Dr. Ashish J. Vashi has been practicing general, cosmetic and implant dentistry in California for over 18 years. He believes in giving the highest quality dentistry in a comfortable, caring environment. He strives to get to know his patients, not just their teeth.including full mouth restoration, dental veneers, crowns, bridges, dental implants, wisdom teeth extractions, Invisalign, and dentures`,
            specility: "Specility in General & Cosmetic Services",
            image: "/images/Rectangle 661.png"
        },
        {
            name: "Dr.Jhone Doe",
            description: ` Dr. Ashish J. Vashi has been practicing general, cosmetic and implant dentistry in California for over 18 years. He believes in giving the highest quality dentistry in a comfortable, caring environment. He strives to get to know his patients, not just their teeth.including full mouth restoration, dental veneers, crowns, bridges, dental implants, wisdom teeth extractions, Invisalign, and dentures`,
            specility: "Specility in General & Cosmetic Services",
            image: "/images/Rectangle 660.png"
        },
    ]
    return (
        <section className='flex justify-center'>
            <div className='lg:w-[70%] w-full flex flex-col'>
                {sp.map((item, i) => (
                    <div key={i}>
                        <div className='flex gap-6 lg:flex-row flex-col lg:pl-0 pl-6'>
                            <div className=''>
                                <Image src={item.image} alt='img' width={250} height={150} />
                            </div>
                            <div className='flex-1 '>
                                <div>
                                    <div className='flex items-center gap-2'>
                                        <h3 className='font-semibold text-lg text-dark-blue'>{item.name}</h3>
                                        <span className='text-muted-foreground text-xs md:text-sm'>({item.specility})</span>
                                    </div>
                                    <p className='text-muted-foreground md:text-md text-sm mt-3 leading-7'>
                                        {item.description}
                                    </p>
                                </div>
                                <Button className='mt-6 bg-mid-blue py-6 px-4'>Book an appointment</Button>
                            </div>
                        </div>
                        <div className={`${i === sp.length - 1 ? "hidden" : "block"} w-full h-[1px] bg-gray-300 my-9`}></div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Specialists