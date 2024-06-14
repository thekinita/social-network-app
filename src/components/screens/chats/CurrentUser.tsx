'use client'

import { useAuth } from "@/hooks/useAuth"
import Image from "next/image"

export function CurrentUser() {

  const {user} = useAuth()
  return (
    <div className='p-layout flex items-center'>
      <Image 
        src={user?.avatar || '/no-avatar.png'} 
        alt={user?.email || ''} 
        width={50}
        height={50}
        className="mr-3"
      />
      <span>{user?.username}</span>
    </div>
  )
}
