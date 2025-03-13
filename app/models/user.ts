import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose, cuid } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import { afterFind, BaseModel, beforeCreate, column } from '@adonisjs/lucid/orm'
import { randomInt, randomUUID } from 'crypto'
import { DateTime } from 'luxon'
import RandExp from 'randexp'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  selfAssignPrimaryKey = true

  @beforeCreate()
  static assignData(user: User) {
    user.id = randomUUID()
    user.avatarId = cuid()
    user.rgm = this.newRgm()
    user.cardCode = this.newCardCode()
    user.validUntil = this.newValidUntil()
  }

  @afterFind()
  static async setDatesZone(user: User) {
    user.validUntil = user.validUntil.setZone('UTC-3')
    user.createdAt = user.createdAt.setZone('UTC-3')
    if (user.updatedAt) user.updatedAt = user.updatedAt.setZone('UTC-3')
  }

  @column({ isPrimary: true })
  declare id: string

  @column()
  declare avatarId: string

  @column()
  declare avatarExt: string | null

  @column()
  declare isAdmin: boolean

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare fullName: string

  @column()
  declare course: string

  @column()
  declare rgm: string

  @column()
  declare cardCode: string

  @column.date()
  declare validUntil: DateTime

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User)

  static newRgm(): string {
    const array = new Uint8Array(randomInt(8, 15))
    crypto.getRandomValues(array)
    return Array.from(array, (num) => num % 10).join('')
  }

  static newCardCode(): string {
    return new RandExp(/M\d{3}[a-z]\d[a-z]/).gen()
  }

  static newValidUntil(): DateTime {
    return DateTime.now().plus({ months: randomInt(24) + 8 })
  }
}
