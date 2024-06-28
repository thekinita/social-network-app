import { useAuth } from "@/hooks/useAuth"
import dayjs from "dayjs"
import Image from "next/image"
import { IMessage } from "@/types/chat.types"
import { getImageUrl } from "@/app/config/get-image-url.config"

export function Message({message}: {message: IMessage}) {

  const {user} = useAuth(),
        isSender = user?.email === message.sender.email

  return (
    <div className={`flex ${isSender ? 'justify-end' : 'justify-start'} mb-2.5`}>
      <div className={`relative flex flex-col ${isSender ? 'flex-row-reverse' : ''}`}>
        <div 
          className={`py-2 px-4 rounded-2xl min-w-20 text-sm
            ${isSender 
              ? 'mr-3 bg-primary rounded-tr-none' 
              : 'ml-3 bg-border rounded-tl-none'}
              `}>
          {message.text}
        </div>
        <div className={`text-xs opacity-30 block py-2 px-4 ${isSender ? 'text-right' : 'text-left'}`}>
          {dayjs(message.createdAt).format("HH:mm")}
        </div>
      </div>
      {/* <Image 
        src={getImageUrl(message.sender.avatar?.url) || '/no-avatar.png'}
        alt="Avatar"
        className="rounded-full"
        width={40}
        height={40}
      /> */}
    </div>
  )
}