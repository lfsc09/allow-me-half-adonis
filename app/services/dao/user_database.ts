import { AccessToken } from '@adonisjs/auth/access_tokens'
import { UserDAO } from '../../../contracts/user_dao.js'
import User from '#models/user'

export class UserDAODatabase implements UserDAO {
  async getUserToken(email: string, password: string): Promise<AccessToken> {
    const user = await User.verifyCredentials(email, password)
    return User.accessTokens.create(user)
  }

  async getUser(id: string): Promise<User> {
    return User.findOrFail(id)
  }

  async deleteUserToken(userId: string, tokenId: string): Promise<void> {
    const user = await User.findOrFail(userId)
    await User.accessTokens.delete(user, tokenId)
  }
}
