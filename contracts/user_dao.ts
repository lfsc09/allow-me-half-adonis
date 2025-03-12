import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'

export abstract class UserDAO {
  abstract getUserToken(email: string, password: string): Promise<AccessToken>
  abstract getUser(id: string): Promise<User>
  abstract deleteUserToken(userId: string, tokenId: string): Promise<void>
}
