import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomInt } from 'crypto'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        email: 'adonis@gmail.com',
        password: '12345678',
        fullName: 'Adonis Lucid de Jargas',
        course: 'Computer Science',
        rgm: '1234565978',
        validUntil: DateTime.now().plus({ months: randomInt(24) + 8 }),
      },
    ])
  }
}
