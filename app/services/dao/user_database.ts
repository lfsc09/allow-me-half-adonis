import User from '#models/user'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { Secret } from '@adonisjs/core/helpers'
import { CreateUserInput, UserDAO } from '../../../contracts/user_dao.js'

export class UserDAODatabase implements UserDAO {
  async getUserToken(email: string, password: string): Promise<AccessToken> {
    const user = await User.verifyCredentials(email, password)
    return User.accessTokens.create(user)
  }

  async verifyUserToken(token: string): Promise<boolean> {
    return User.accessTokens.verify(new Secret(token)) !== null
  }

  async getUser(userId: string): Promise<User> {
    return User.findOrFail(userId)
  }

  async getUsers(): Promise<User[]> {
    return (await User.all()).sort((a, b) => a.fullName.localeCompare(b.fullName))
  }

  async isUserAdmin(userId: string): Promise<boolean> {
    const user = await User.findOrFail(userId)
    return user.isAdmin
  }

  async deleteUserToken(userId: string, tokenId: string): Promise<void> {
    const user = await User.findOrFail(userId)
    await User.accessTokens.delete(user, tokenId)
  }

  async refreshUser(userId: string): Promise<void> {
    const user = await User.findOrFail(userId)
    user.rgm = User.newRgm()
    user.cardCode = User.newCardCode()
    user.validUntil = User.newValidUntil()
    await user.save()
  }

  async createUser(input: CreateUserInput): Promise<User> {
    return await User.create(input)
  }

  async deleteUser(userId: string): Promise<void> {
    const user = await User.find(userId)
    if (user) await user.delete()
  }
}
