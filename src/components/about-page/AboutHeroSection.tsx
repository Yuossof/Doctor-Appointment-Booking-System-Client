import Image from 'next/image'
import React from 'react'

const AboutHeroSection = () => {
    return (
        <section className='flex justify-center w-full'>
            <div className='flex flex-col items-center gap-5 lg:mt-16 mt-11'>
                <div>
                    <h1 className='font-semibold text-3xl sm:text-3xl md:text-4xl text-center md:text-left lg:text-5xl text-dark-blue'>About Us</h1>
                </div>
                <div className='flex lg:gap-32 lg:px-0 px-4 mt-24 w-full justify-center'>
                    <div className='flex-1 flex flex-col gap-6 lg:items-start items-center lg:text-left text-center'>
                        <h2 className='font-semibold text-2xl lg:text-3xl text-dark-blue'>Our Mission</h2>
                        <p className='text-muted-foreground leading-8 lg:text-left text-center'>
                            At Northern Heights Dental, people come first. We help each of our
                            patients to achieve optimal wellness and health by using a whole body
                            approach to oral health. This means not just focusing on cavities, but
                            focusing on; cranio-facial development, bite and joint balance, oral flora,
                            proper muscle balance/function, and bio-compatibility of dental materials.
                            Great care and planning ensure that everything we do helps promote overall
                            health and well being.
                            We work hard to stay up to date with the most advanced techniques and technologies to ensure
                            that our patients receive the best care possible. Our office utilizes 3D CBCT radiographs to allow
                            for guided surgical and endodontic protocols. This enables these procedures to performed digitally
                            before they are performed surgically to ensure optimal results. 3D imaging also is utilized for the analysis
                            of airway growth and development. We also use the best 3D optical scanner for all of our dental
                            restoration and Invisalign impressions.
                            Dr Williams is a strong advocate for using microsurgical techniques, this means less discomfort
                            and faster healing times.
                        </p>
                    </div>
                    <div>
                        <div className='w-auto hidden lg:block'>
                            <Image src="/images/Rectangle 682.png" alt='img'
                                width={500}
                                height={250}
                                priority
                                className='md:scale-90'
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default AboutHeroSection