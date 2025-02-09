import Link from 'next/link'
import React from 'react'
import { Facebook, Instagram, Youtube, Linkedin, Twitter } from 'lucide-react'
import AskQuestion from '../home-page/ask-question/AskQuestion'

const Footer = () => {
    return (
        <div className="translate-y-[35px] container px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]">
        <div className="my-32 w-full"></div>
            <AskQuestion />
            <div className="my-36 w-full"></div>

            <div className='w-full flex flex-col gap-4 pb-6 lg:px-0 px-3'>
                <div className='flex items-center md:justify-between md:flex-row flex-col md:gap-0 gap-4'>
                    <h2 className='font-semibold text-dark-blue text-xl'>LOGO</h2>
                    <div className='flex items-center gap-4'>
                        <Link className='text-gray-800 text-sm hover:underline' href="/">Home</Link>
                        <Link className='text-gray-800 text-sm hover:underline' href="/">Services</Link>
                        <Link className='text-gray-800 text-sm hover:underline' href="/">Blog</Link>
                        <Link className='text-gray-800 text-sm hover:underline' href="/">About</Link>
                        <Link className='text-gray-800 text-sm hover:underline' href="/">Contact</Link>
                    </div>
                </div>

                {/* line start*/}
                <div className='h-[2px] w-full bg-slate-300'></div>
                {/* line  end*/}

                <div className='flex items-center md:justify-between md:flex-row flex-col md:gap-0 gap-5'>
                    <p className='text-sm text-gray-600'>All rights reserved @domain.com</p>
                    <div className='flex items-center gap-4'>
                        <a href="" className=''>
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center '>
                                <Facebook className='text-white' size={18} />
                            </span>
                        </a>
                        <a href="">
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center'>
                                <Instagram className='text-white' size={18} />
                            </span>
                        </a>
                        <a href="">
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center'>
                                <Youtube className='text-white' size={18} />
                            </span>
                        </a>
                        <a href="">
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center'>
                                <Linkedin className='text-white' size={18} />
                            </span>
                        </a>
                        <a href="">
                            <span className='w-8 h-8 rounded-full bg-dark-blue flex justify-center items-center'>
                                <Twitter className='text-white' size={18} />
                            </span>
                        </a>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Footer