'use client';
import { IUser } from '@/types/UserInformation'
import React from 'react'
import { MapPin } from 'lucide-react'
import { motion } from 'framer-motion';
import { childeDiv, childNav, parentDiv } from '../ParentAndChildAnimation';

export default function NamesProfile({ user }: { user: IUser }) {
  return (
    <motion.div 
    variants={parentDiv}
    initial='hidden'
    whileInView='visible'
    className="flex flex-col mt-14">
      <motion.h1
      variants={childeDiv}
      className="text-2xl sm:text-3xl font-bold">{ user?.first_name + ' ' + user?.last_name }</motion.h1>
      <motion.p 
      variants={childeDiv}
      className="text-muted-foreground flex items-center mt-1">
        <MapPin className="h-4 w-4 mr-1" /> { user?.city + ', ' + user?.address }
      </motion.p>
    </motion.div>
  )
}
