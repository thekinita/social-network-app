import { IUser } from './user.types'

export interface IMessage {
	attributes: {
		text: string
		createdAt: string
		sender: IUser
	}
}

export interface IChat {
	id: number
	attributes: {
		messages: {
			data: IMessage[]
		}
		participants: {
			data: IUser[]
		}
	}
}