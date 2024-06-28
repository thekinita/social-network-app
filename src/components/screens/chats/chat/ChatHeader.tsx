import { getImageUrl } from "@/app/config/get-image-url.config"
import Image from "next/image"
import { Ellipsis, Search } from "lucide-react"
import { IUser } from "@/types/user.types"

export default function ChatHeader({ correspondent }: { correspondent?: IUser }) {

  return (
    <div className='pb-4 flex items-center justify-between'>
      <div className="flex items-center">
        <Image 
          src={getImageUrl(correspondent?.avatar?.url) || '/no-avatar.png'} 
          alt={''} 
          width={40}
          height={40}
          className="mr-3"
        />
        <span>{correspondent?.username}</span>
      </div>
      <div className="flex">
        <button>
          <Search className="mx-2 text-[#7C7275] hover:text-white" />
        </button>
        <button>
          <Ellipsis className="mx-2 text-[#7C7275] hover:text-white" />
        </button>
      </div>
    </div>
  )
}