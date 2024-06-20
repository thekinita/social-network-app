'use client'

import { getImageUrl } from '@/app/config/get-image-url.config'
import LastMessageTime from './LastMessageTime'
import { IChat } from '@/types/chat.types'
import { useAuth } from '@/hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'

interface IChatListItem {
	chat: IChat
}

export function ChatListItem({ chat }: IChatListItem) {
	const { user } = useAuth(),
				correspondent = chat.attributes.participants.data.find(u => u.attributes.email !== user?.email),
				lastMessage = chat.attributes.messages.data.at(-1),
				avatar = correspondent?.attributes.avatar.data,
				imageUrl = avatar === null ? '/no-avatar.png' : String(getImageUrl(avatar?.attributes?.url))

	return (
		<Link
			href={`/chat/${chat.id}`}
			className='p-layout flex items-center duration-300 ease-linear transition-colors hover:bg-border animation-slide-fade'
		>
			<Image
				src={imageUrl}
				alt={correspondent?.attributes.email || ''}
				width={45}
				height={45}
				className='mr-4'
			/>
			<div className='text-sm w-full'>
				<div className='flex items-center justify-between'>
					<span>{correspondent?.attributes.username}</span>
					<LastMessageTime time={lastMessage?.attributes.createdAt} />
				</div>
				<div className='opacity-30 mt-0.5'>{lastMessage?.attributes.text}</div>
			</div>
		</Link>
	)
}
