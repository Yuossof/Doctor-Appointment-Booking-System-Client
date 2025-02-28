'use client'
import Image from 'next/image'
import React from 'react'
import { motion } from 'framer-motion'

const textVariants = [
    'Dentists today already utilize software to capture insights in clinical decision-making.',
    'These practices will continue to develop to integrate AI algorithms that enable clinicians to find the best modalities for their patients.',
    'In the 21st century, digital radiographs and 3D imaging have become the standard of dental care.',
    'Using an intraoral scanner with digitized data for 3D dental impressions (vs. polyvinyl siloxane and rubber base impressions) for a dental crown is now commonplace.',
    'Artificial intelligence is laying the groundwork for the future of the dental industry.',
    'Dental robots can now perform functions such as filling cavities and cleaning or extracting teeth'
]

const parentText = {
    hidden: {
        x: 50,
        opacity: 0
    },
    visible: (i: number) => ({
        x: 0,
        opacity: 1,
        transition: {
            duration: 0.6, delay: i * 0.3
        }
    })
};

const LatestTechnologySection = () => {
    return (
        <section className='lg:px-0 px-4'>
            <div className='flex flex-col items-center gap-4'>
                <motion.h2
                    initial={{ y: -50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring', stiffness: 50, mass: 2 }}
                    className='font-semibold lg:text-4xl md:text-3xl text-2xl'>Latest Technology</motion.h2>
                <motion.p
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    transition={{ duration: 1.5, type: 'spring', stiffness: 50, mass: 2 }}
                    className='text-muted-foreground text-center'>
                    Thanks to major technological advancements, dentistry allows treating
                    the most complex <br /> cases with less time and more efficiency.
                </motion.p>
            </div>
            <div className='mt-24 flex gap-9'>
                <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 20, mass: 3, damping: 7 }}
                    className='w-auto lg:block hidden'>
                    <Image src="/images/Rectangle 662 (1).png" alt='img' width={600} height={500} />
                </motion.div>
                <div className='flex-1 lg:text-left text-center'>
                    <motion.h3
                        initial={{ y: -50, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, type: 'spring', stiffness: 20 }}
                        className='text-2xl font-medium text-dark-blue'>The Future of Dentistry is Digital:</motion.h3>
                    <motion.p className='text-muted-foreground mt-4 leading-8'>
                        { textVariants.map((text, i) => (
                            <motion.span
                            key={i}
                            custom={i}
                            variants={parentText}
                            initial='hidden'
                            whileInView='visible'
                            className="block"
                            >
                                { text }
                            </motion.span>
                        )) }
                    </motion.p>
                </div>
            </div>
        </section>
    )
}

export default LatestTechnologySection