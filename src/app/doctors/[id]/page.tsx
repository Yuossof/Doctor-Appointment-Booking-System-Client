import GetDoctor from '@/components/Doctor/GetDoctor';
import MainContent from '@/components/Doctor/MainContent';
import ShowMessageDialog from '@/components/Doctors/ShowMessageDialog';
import { Params } from '@/types/Params';
import React from 'react'

export default async function Doctor({ params }: { params: Params }) {
  const id = params?.id || '';
  return (
    <>
      <GetDoctor id={id}/>
      <ShowMessageDialog />
      <div className='container h-full px-[5px] md:px-[20px] lg:px-[80px] xl:px-[130px]'>
        <MainContent/>
      </div>
    </>
  )
}
