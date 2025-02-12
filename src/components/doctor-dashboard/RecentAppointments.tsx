import React from 'react'
import { AvatarCmp } from '../Avatar'
import { Clock } from 'lucide-react'

const RecentAppointments = () => {
  return (
    <div className='w-full mt-6'>
      <div className='w-full bg-slate-800 rounded-md overflow-hidden shadow-lg'>
        <div className='bg-gray-700 w-full py-3 px-3'>
          <h2 className='text-xl text-slate-400'>Today Appointments <span className='text-gray-400'>(12)</span></h2>
        </div>
        <div className='w-full p-3 flex flex-col gap-6 pt-6'>
          {[1, 2, 3].map((_itm, i) => (
            <div key={i} className='w-full flex justify-between'>
              <div className='flex gap-3 items-center'>
                <AvatarCmp imgSrc='https://github.com/shadcn.png' w={8} h={8} />
                <h2 className='text-sm text-gray-300'>Youssof Ahmed</h2>
              </div>
              <div className='flex items-center gap-4'>
                <div className='flex items-center bg-opacity-35  overflow-hidden rounded-md border-[1px] border-slate-700 pl-[2px]'>
                  <span className='text-orange-300 bg-slate-900 p-1 rounded-md'>
                    <Clock />
                  </span>
                  <span className='text-lg text-orange-200 p-1 bg-slate-800 px-2'>
                    8:00
                  </span>
                </div>
                <button className='bg-orange-800 py-[6px] text-white rounded-md px-3 hover:bg-orange-700'>Cancel</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentAppointments