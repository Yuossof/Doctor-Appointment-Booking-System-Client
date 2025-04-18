import Loading from '@/components/Loading'
import SuccessStripe from '@/components/SuccessStripe/SuccessStripe'
import React, { Suspense } from 'react'

export default function page() {
  return (
    <Suspense fallback={<Loading/>}>
        <SuccessStripe/>
    </Suspense>
  )
}
