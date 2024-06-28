'use client'

import FriendsItem from "@/components/screens/friends/FriendsItem"
import Loader from "@/components/ui/loader/Loader"
import { useQuery } from "@tanstack/react-query"
import { IUser } from "@/types/user.types"
import { $fetch } from "@/$api/api.fetch"
import cn from "clsx"

export function Friends() {

  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['users'],
    queryFn: () => $fetch.get<IUser[]>('/users?populate=avatar', true)
  })

  return <div className="p-layout">
    <h1 className="text-3xl font-bold">Friends</h1>
    <div className="">  
      {isLoading || isFetching ? (
        <Loader />
        ) : (
        data?.map((user, index) => {
        return <FriendsItem key={user.id} user={user} />
        })
      )}
    </div>
  </div>
}