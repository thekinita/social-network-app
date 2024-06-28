import type { Metadata } from "next"

import { NO_INDEX_PAGE } from "@/constants/seo.constants"
import ChatsScreen from "@/components/screens/chats/ChatsScreen"
import { Chat } from "@/components/screens/chats/chat/Chat"

export const metadata: Metadata = {
  ...NO_INDEX_PAGE
}

export default function ChatPage({params}: {params: {id: string} }) {
  return <Chat id={params.id} />
}