import { SearchParams } from '@/types/SearchParams'
import React from 'react'

export default async function Doctor({ searchParams }: SearchParams) {
  const id = searchParams?.id || ''; 
  return (
    <div>Doctor</div>
  )
}
