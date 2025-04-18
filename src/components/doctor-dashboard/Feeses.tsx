"use client"
import { Button } from '@/components/ui/button'
import { addFeese, editFeese, getFeeses } from '@/lib/services/doctor-dashboard/Feeses'
import { Edit, Plus, X } from 'lucide-react'
import React from 'react'
import { useEffect, useState } from 'react'
interface Feese {
    id: number,
    price: number
}
const Feeses = () => {

    const [feese, setFeese] = useState<Feese[]>([])
    const [showEditBox1, setShowEditBox1] = useState(false)
    const [showEditBox2, setShowEditBox2] = useState(false)
    const [feeseId, setFeeseId] = useState<number | null>(null)
    const [CurrentFeese, setCurrentFeese] = useState<number | null>(null)
    const [reget, setReget] = useState(false)
    const [isFeeseLoading, setIsFeeseLoading] = useState(false)
    const [errMessage, setErrMessage] = useState('')

    const AddFeese = async () => {
        setIsFeeseLoading(true)
        const err = await addFeese(CurrentFeese as number, 'one')
        setIsFeeseLoading(false)
        if (!err) setShowEditBox1(false)
        setErrMessage(err)
        setReget(!reget)
    }


    const EditFeese = async () => {
        setIsFeeseLoading(true)
        await editFeese(CurrentFeese as number, 'one', feeseId as number)
        setIsFeeseLoading(false)
        setShowEditBox2(false)
        setReget(!reget)
    }

    useEffect(() => {
        const f = async () => {
            const res: Feese[] = await getFeeses()
            setFeese(res)
            console.log(res)
        }
        f()
    }, [reget])

    return (
        <div>
            <div className='bg-slate-800 p-3 rounded-md flex flex-col items-start
                gap-3 shadow-lg hover:border-blue-500 border-2
                 border-transparent transition-all  w-2/5 relative'
            >
                {showEditBox1 && (
                    <div onClick={() => setShowEditBox1(false)} className='bg-black fixed z-50 bg-opacity-60 top-0 right-0 bottom-0 left-0 flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='bg-slate-900 border-gray-500 border-2 rounded-md flex flex-col gap-5 p-4 pt-11 relative -translate-y-24'>
                            <X onClick={() => setShowEditBox1(false)} className='absolute top-2 right-2 text-gray-200 hover:text-gray-400 cursor-pointer transition' />
                            <input
                                className='bg-transparent border-[1px] border-slate-500 py-2 px-2 rounded-md outline-blue-500 text-gray-300'
                                type="text"
                                placeholder='feese'
                                onChange={(e) => setCurrentFeese(Number(e.target.value))}
                                value={Number(CurrentFeese)}
                            />
                            {errMessage && <span className='text-red-500 text-sm'>{errMessage}</span>}
                            <Button onClick={AddFeese} disabled={isFeeseLoading}>Add</Button>
                        </div>
                    </div>
                )}
                {showEditBox2 && (
                    <div onClick={() => setShowEditBox2(false)} className='bg-black fixed z-50 bg-opacity-60 top-0 right-0 bottom-0 left-0 flex justify-center items-center'>
                        <div onClick={(e) => e.stopPropagation()} className='bg-slate-900 border-gray-500 border-2 rounded-md flex flex-col gap-5 p-4 pt-11 relative -translate-y-24'>
                            <X onClick={() => setShowEditBox2(false)} className='absolute top-2 right-2 text-gray-200 hover:text-gray-400 cursor-pointer transition' />
                            <input
                                className='bg-transparent border-[1px] border-slate-500 py-2 px-2 rounded-md outline-blue-500 text-gray-300'
                                type="text"
                                placeholder='feese'
                                onChange={(e) => setCurrentFeese(Number(e.target.value))}
                                value={Number(CurrentFeese)}
                            />
                            <Button onClick={() => EditFeese()} disabled={isFeeseLoading}>Save</Button>
                        </div>
                    </div>
                )}
                <div className='flex w-full justify-end'>
                        <Plus style={{opacity: feese.length === 2 ? 0.4 : 1, cursor: feese.length > 2 ? "pointer": "auto"}} onClick={() => {
                            if(feese.length === 2) return
                            setCurrentFeese(0)
                            setShowEditBox1(true)
                            setErrMessage('')

                        }} className='text-white hover:text-gray-300' />
                </div>
                {feese.map((itm) => (
                    <div key={itm.id} className='flex justify-between items-center w-full mt-3'>
                        <div>
                            <h2 className='text-sm text-slate-400'>Current Feese</h2>
                            <h2 className='text-2xl text-white'>{itm.price}</h2>
                        </div>
                        <Edit size={18} onClick={() => {
                            setShowEditBox2(true)
                            setFeeseId(itm.id)
                            setCurrentFeese(itm.price)
                        }} className='text-white hover:text-gray-300 cursor-pointer' />
                    </div>
                ))}

                {/* <span className='px-3 py-1 bg-orange-900 bg-opacity-40 rounded-md text-sm text-gray-200'>+3.5%</span> */}
            </div>
        </div>
    )
}

export default Feeses