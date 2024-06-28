import { CurrentUser } from "@/components/screens/chats/CurrentUser"
import { ChatList } from "@/components/screens/chats/list/ChatList"
import { type PropsWithChildren } from "react"

export default function ChatLayout({ children }: PropsWithChildren<unknown> ) {
  return (
    <div 
      className='grid h-full' 
      style={{
      gridTemplateColumns: '.7fr 3fr',
      }}
    >
      <div className='border-r border-border'>
        <CurrentUser />
        <ChatList />
      </div>
      {children}
    </div>
  )
}