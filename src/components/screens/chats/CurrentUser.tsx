'use client'

import { getImageUrl } from "@/app/config/get-image-url.config"
import Loader from "@/components/ui/loader/Loader"
import { useAuth } from "@/hooks/useAuth"
import { useProfile } from "@/hooks/useProfile"
import { LogOut } from "lucide-react"
import { signOut } from "next-auth/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function CurrentUser() {

  const { user } = useAuth(),
        { push } = useRouter(),
        { data, isLoading } = useProfile()

  console.log(data)  

  return (
    <div className='p-layout flex items-center justify-between'>
      <div className="flex items-center">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <Image 
              src={getImageUrl(data?.avatar?.url) || '/no-avatar.png'} 
              alt={user?.email || ''} 
              width={50}
              height={50}
              className="mr-3"
            />
          </>
        )}
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
