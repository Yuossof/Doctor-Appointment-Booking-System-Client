'use client';
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { childeDiv, parentDiv } from '@/components/ParentAndChildAnimation';

// Services data array
const servicesData = [
  {
    id: 1,
    title: "Emergency Medical Services",
    description: "Available 24/7 to provide urgent care for patients with critical health conditions. Our trained medical team handles emergencies quickly and efficiently to ensure patient safety."
  },
  {
    id: 2,
    title: "Outpatient Clinics",
    description: "Offering medical examinations and consultations with specialized doctors without requiring hospitalization, providing convenient and timely healthcare for patients."
  },
  {
    id: 3,
    title: "Inpatient Services",
    description: "Providing care for patients who need continuous medical monitoring or surgical procedures, ensuring comprehensive support for safe and speedy recovery."
  },
  {
    id: 4,
    title: "Laboratory and Medical Imaging",
    description: "Accurate laboratory testing and advanced imaging services such as X-rays, MRI, and CT scans to aid proper diagnosis and effective treatment planning."
  },
  {
    id: 5,
    title: "Physical Therapy and Rehabilitation",
    description: "Specialized physical therapy programs designed to help patients regain mobility and strength after injuries or surgeries, improving quality of life and promoting recovery."
  },
  {
    id: 6,
    title: "Home Healthcare Services",
    description: "Personalized medical care delivered at patients' homes, including chronic condition management, medication administration, and ongoing medical support for continuous care outside the hospital."
  }
];

const ServicesHeroSection = () => {
    return (
        <section>
            <div className='flex flex-col gap-3 items-center md:px-0 px-6'>
                <motion.h1
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring', stiffness: 100 }}
                    className='font-semibold text-3xl sm:text-3xl md:text-4xl text-center lg:text-5xl lg:mt-0 mt-4 text-dark-blue lg:max-w-[80%]'>
                    Our Healthcare Services
                </motion.h1>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.4, type: 'spring', stiffness: 100 }}
                    className='text-muted-foreground lg:max-w-[80%] text-center'>
                    We provide comprehensive healthcare services with the highest quality standards <br />
                    to ensure the best care for our patients.
                    Your health and well-being are our top priority.
                </motion.p>
            </div>
            <motion.div 
                variants={parentDiv}
                initial='hidden'
                whileInView='visible'
                className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 mt-16 md:px-0 px-4'
            >
                {servicesData.map((service) => (
                    <motion.div 
                        key={service.id} 
                        variants={childeDiv}
                        className='bg-slate-50 rounded-lg flex flex-col items-center
                         p-4 border-slate-200 border-[1px] shadow-md hover:scale-105 transition'
                    >
                        <div className='bg-mid-blue rounded-full h-[70px] w-[70px] flex justify-center items-center'>
                            <Image 
                                src="/icons/implant-1.png" 
                                alt="service icon" 
                                width={48} 
                                height={48} 
                            />
                        </div>
                        <div className='flex flex-col gap-3 items-center text-center mt-3'>
                            <h2 className='text-dark-blue font-semibold text-2xl'>
                                {service.title}
                            </h2>
                            <p className='text-muted-foreground max-w-[90%]'>
                                {service.description}
                            </p>
                            <Link 
                                href={`/services/${service.id}`} 
                                className='flex items-center mt-3 underline text-dark-blue gap-2 transition-all hover:gap-4'
                            >
                                <span>Learn More</span>
                                <ArrowRightCircle size={20} />
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    )
}

export default ServicesHeroSection