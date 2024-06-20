export interface IUser {
	attributes: {
		id: number
		username: string
		email: string
		confirmed: boolean
		role: string
		friends: IUser[]
		avatar: {
			data: {
				attributes: {
					url: string
					} | null	
				}
			}
	}
}

export type UserJwt = {
	user: IUser
	jwt: string
}