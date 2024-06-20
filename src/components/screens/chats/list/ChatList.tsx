'use client'

import { useQuery } from '@tanstack/react-query'
import { Search } from 'lucide-react'
import { useState } from 'react'

import Loader from '@/components/ui/loader/Loader'
import { useDebounce } from '@/hooks/useDebounce'
import Field from '@/components/ui/field/Field'
import { ChatListItem } from './ChatListItem'
import { IChat } from '@/types/chat.types'
import { useAuth } from '@/hooks/useAuth'
import { $fetch } from '@/$api/api.fetch'

export function ChatList() {
	const { user, isLoggedIn } = useAuth()

	const [searchTerm, setSearchTerm] = useState('')
	const debouncedSearchTerm = useDebounce(searchTerm)

	const { data, isLoading, isFetching } = useQuery({
		queryKey: ['chats', debouncedSearchTerm],
		queryFn: () =>
			$fetch.get<{ data: IChat[] }>(
				`/chats?sort=createdAt:desc
				&populate[messages]=*
				&populate[participants][populate][avatar]=*
				&filters[participants][email][$eq]=${user?.email}
				&filters[$or][0][participants][username][$contains]=${debouncedSearchTerm}
				&filters[$or][1][messages][text][$contains]=${debouncedSearchTerm}
				`,
				true
			),
		enabled: isLoggedIn,
	})

	return (
		<div>
			<div className='p-layout'>
				<Field
					placeholder='Search chats'
					Icon={Search}
					value={searchTerm}
					onChange={e => setSearchTerm(e.target.value)}
					style={{marginBottom: 0}}
				/>
			</div>
			<div>
				{isLoading || isFetching ? (
					<div className='p-layout flex justify-center'>
						<Loader />
					</div>
				) : (					 
						data?.data.map(chat => {
							return <ChatListItem key={chat.id} chat={chat} />
						})
				)}
			</div>
		</div>
	)
}
