"use client"
import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Input } from '@/components/ui/input'
import MultiImageUploader from '@/components/MultiImageUploader'
import { Textarea } from '@/components/ui/textarea'
import { X } from 'lucide-react'
import { useAddReport } from '@/Context/AddReport'
import { z } from 'zod'
import axios from 'axios'
import GetToken from '@/lib/services/auth/GetToken'
import { useDocsImage } from '@/Context/DocsImages'
import { useRouter } from 'next/navigation'

const AddNewReportBox = () => {
    const showBox = useAddReport();
    const [pending, setPending] = useState(false);
    const [errors, setErrors] = useState<{ type?: string[]; desc?: string[]; image?: string }>({});
    const docsImageContext = useDocsImage();
    const [message, setMessage] = useState(null)
    const router = useRouter();

    const [formData, setFormData] = useState({
            type: '',
            desc: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { value, name } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        setErrors(prev => ({
            ...prev,
            [name]: ''
        }))

    }


    const docsSchema = z.object({
        type: z
            .string()
            .min(1, { message: 'Type is required' })
            .trim(),

        desc: z
            .string()
            .min(1, { message: 'Description is required' })
            .trim(),
    })

    const formAction = async () => {
        const validationResults = docsSchema.safeParse(formData);
        if (!validationResults.success) {
            setErrors(validationResults.error.flatten().fieldErrors);
            return false;
        }
        setPending(true);
        const token = await GetToken();

        const data = new FormData();
        data.append('type', formData.type);
        data.append('desc', formData.desc);

        if (docsImageContext?.image && docsImageContext.image.length > 0) {
            Array.from(docsImageContext.image).map((file: File) => {
                data.append('image[]', file);
            });
        }

        if (showBox?.showBox) {
            try {
                const res = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/user_documentations/store`, data, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data'
                    }

                })
                setMessage(res.data.message);
                setFormData({ desc: '', type: '' })
                setErrors({ desc: [], type: [], image: '' })
                docsImageContext?.setSuccessUpload(true);
                setPending(false);
                router.push('/profile/reports');
            } catch (error) {
                setPending(false);
                if (axios.isAxiosError(error) && error.response) {
                    setErrors(prev => ({
                        ...prev,
                        image: error?.response?.data?.message
                    }));
                    console.log(error?.response?.data?.message)
                }
            }
        }

    };

    useEffect(() => {
        if (message) {
            setTimeout(() => {
                showBox?.setShowBox(false)
                setMessage(null);
                docsImageContext?.setSuccessUpload(true);
            }, 1000);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [message])


    return (
        <>
            {showBox?.showBox && (
                <div
                    onClick={() => showBox?.setShowBox(false)}
                    className='fixed top-0 bottom-0 right-0 left-0 bg-opacity-80 bg-black z-50 flex justify-center'>
                    <div className='w-full flex justify-center items-center'>
                        <motion.div

                            onClick={(eo) => eo.stopPropagation()}
                            initial={{ y: '-100vh', opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className='bg-slate-100 w-2/5 rounded-md px-4 py-4  relative'
                        >
                            {message &&
                                <div className="bg-green-500 mt-4 text-white w-full rounded-md p-2 text-center text-[12px] sm:text-[14px]">
                                    <span>{message}</span>
                                </div>
                            }
                            <X onClick={() => showBox?.setShowBox(false)} className='absolute top-2 right-2 cursor-pointer' size={18} />
                            <div className='w-full flex flex-col gap-3 mt-4'>
                                <div>
                                    <Input className='mb-1' onChange={handleChange} name='type' value={formData.type} type='text' placeholder='Report Name' />
                                    {errors?.type && <span className="text-red-600">{errors.type[0]}</span>}
                                </div>
                                <div>
                                    <Textarea className='mb-1' onChange={handleChange} name='desc' value={formData.desc} placeholder='Report Description' />
                                    {errors?.desc && <span className="text-red-600">{errors.desc[0]}</span>}
                                </div>
                            </div>
                            <div
                                className='w-full
                            min-h-28 bg-gray-200 
                            mt-4 rounded-md flex 
                            justify-center items-center
                            border-dashed border-2 border-blue-300'
                            >
                                <MultiImageUploader />
                            </div>
                            {errors?.image && <span className="text-red-600 block my-1 text-center">{errors.image}</span>}
                            <button onClick={formAction} disabled={pending} className={`${pending ? 'opacity-50' : 'opacity-100'} bg-mid-blue rounded-md py-2 px-6 mx-auto block mt-4 text-white`}>
                                {pending ? <span className="flex items-center gap-1">Loading <span className="loader"></span></span> : 'Submit'}
                            </button>
                        </motion.div>
                    </div>
                </div>
            )}
        </>
    )
}

export default AddNewReportBox