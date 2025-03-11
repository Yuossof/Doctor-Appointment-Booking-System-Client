import React from 'react'
import { AvatarCmp } from '../Avatar'

const AdminsTable = () => {
    return (
        <div className='flex-1 p-3 flex flex-col pt-4 overflow-x-auto px-3 bg-slate-900 rounded-md border-[1px] border-slate-700'>
            <h2 className='text-xl text-gray-200'>Admins</h2>
            <div className='w-full h-[1px] bg-gray-600 my-4'></div>
            <div className='flex flex-col gap-4'>
                {[1, 2, 3].map((_itm, i) => (
                    <div key={i} className='w-full flex justify-between' >
                        <div className='flex gap-3 items-center'>
                            <AvatarCmp imgSrc='https://github.com/shadcn.png' w={8} h={8} />
                            <div className='flex items-center gap-3'>
                                <h2 className='text-sm text-gray-300'>Mohammed</h2>
                            </div>
                        </div>
                        <span className='text-muted-foreground'>Role</span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AdminsTable