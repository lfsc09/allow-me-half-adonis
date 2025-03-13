import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export abstract class UserDAO {
  abstract getUserToken(email: string, password: string): Promise<AccessToken>
  abstract verifyUserToken(token: string): Promise<boolean>
  abstract getUser(userId: string): Promise<User>
  abstract getUsers(): Promise<User[]>
  abstract isUserAdmin(userId: string): Promise<boolean>
  abstract deleteUserToken(userId: string, tokenId: string): Promise<void>
  abstract refreshUser(userId: string): Promise<void>
  abstract createUser(input: CreateUserInput): Promise<User>
  abstract deleteUser(user: User): Promise<void>
}

export type CreateUserInput = {
  isAdmin?: boolean
  avatarExt: string
  email: string
  password: string
  fullName: string
  course: string
}
