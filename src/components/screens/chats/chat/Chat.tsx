'use client'

import { useQuery } from "@tanstack/react-query";
import MessageField from "./MessageField";
import { $fetch } from "@/$api/api.fetch";
import { IChat } from "@/types/chat.types";
import { Message } from "./Message";
import ChatHeader from "./ChatHeader";
import Loader from "@/components/ui/loader/Loader";
import { useAuth } from "@/hooks/useAuth";

export function Chat({id}: {id: string}) {

  const { data, isLoading } = useQuery({
    queryKey: ['chat', id],
    queryFn: () => $fetch.get<{data: IChat}>(
      `/chats/${id}?populate[messages][populate][sender]=*
			&populate[participants][populate][avatar]=*`,
      true
    ),
    select: data => data.data,
    enabled: !!id
  })

  const user = useAuth(),
        correspondent = data?.participants.find(u => u.email !== user.user?.email)

  return (
    <div className='p-layout flex flex-col justify-between'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="border-b border-border">
            <ChatHeader correspondent={correspondent} />
          </div>
          <div>
            {data?.messages.map(message => (
              <Message key={message.id} message={message} />
            ))}
            <MessageField />
          </div>
        </>
      )}
    </div>
  )
}