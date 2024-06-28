import { getImageUrl } from "@/app/config/get-image-url.config";
import { useProfile } from "@/hooks/useProfile";
import { IUser } from "@/types/user.types";
import Image from "next/image";

interface IFriendsItem {
  user: IUser
}

export default function FriendsItem({ user }: IFriendsItem) {

  const { data: authUser } = useProfile()
  const isFriend = authUser?.friends?.some(u => u.id === user.id)
          
  return <div className="flex p-layout">
    {isFriend && (
      <>
        <Image 
          width={80} 
          height={80} 
          alt={user.username} 
          src={getImageUrl(user.avatar?.url) || '/no-avatar.png'} 
        />
        <div className="text-lg font-medium mx-3 *:m-1">
          <p>{user.username}</p>
          <button 
            className="bg-primary rounded-2xl text-sm transition-colors duration-300 ease-linear py-1 px-1 hover:bg-primary/80">
            Send message
          </button>
          <button 
            className="bg-red-700 rounded-2xl text-sm transition-colors duration-300 ease-linear py-1 px-1 hover:bg-red-700/80">
            Delete
          </button>
        </div>
      </>
    )}
  </div>
}