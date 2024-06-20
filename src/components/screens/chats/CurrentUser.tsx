'use client'

import { getImageUrl } from "@/app/config/get-image-url.config"
import { useAuth } from "@/hooks/useAuth"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function CurrentUser() {

  const {user} = useAuth(),
        {push} = useRouter()

  console.log(user)  

  return (
    <div className='p-layout flex items-center justify-between'>
      <div className="flex items-center">
        <Image 
          src={getImageUrl(user?.avatar) || '/no-avatar.png'} 
          alt={user?.email || ''} 
          width={50}
          height={50}
          className="mr-3"
        />
        <span>{user?.username}</span>
      </div>
      <button 
        onClick={() => signOut({
          redirect: false
        }).then(() => {
          window.localStorage.removeItem('token')
          push('/login')
        })} 
        className="text-[#7C7275] hover:text-white transition-colors"
      >
        <LogOut size={20} />
      </button>
    </div>
  )
}
