'use client'

import { $fetch } from "@/$api/api.fetch"
import Field from "@/components/ui/field/Field"
import { useAuth } from "@/hooks/useAuth"
import { useReactQuerySubscription } from "@/hooks/useReactQuerySubscription"
import { useMutation } from "@tanstack/react-query"
import { ArrowRightToLine, Send } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"


export default function MessageField() {

  const [message, setMessage] = useState(''),
        send = useReactQuerySubscription(),
        { id } = useParams(),
        { user } = useAuth(),

        { mutate } = useMutation({
          mutationKey: ['update chat', id],
          mutationFn: () => 
            $fetch.post('/messages', {
              data: {
                text: message,
                sender: Number(user?.id),
                chat: id
              },
          }, true),
          onSuccess() {
            setMessage('')
            send({
              operation: 'update',
              entity: 'chat',
              id: id.toString()
            })
          }
        }),

        onSubmit = () => {
          if (!message) return
          mutate()
        }

  return (
    <div className="flex items-center">
      <Field 
        placeholder="Write a message..." 
        Icon={ArrowRightToLine}
        value={message}
        size={message.length} 
        onChange={e => setMessage(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            onSubmit()
        }}}
        className="flex-1"
      />
      <button 
        onClick={onSubmit}
        disabled={!message}
        className="rounded-full ml-2 p-2 bg-blue-700 cursor-pointer transition-colors hover:bg-blue-600"
      >
        <Send size={20} />
      </button>
    </div>
  )
}