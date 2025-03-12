import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { randomInt } from 'crypto'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const uniqueKey = 'email'

    await User.updateOrCreateMany(uniqueKey, [
      {
        isAdmin: true,
        email: 'adonis@gmail.com',
        password: '12345678',
        fullName: 'Adonis Lucid de Jargas',
        course: 'Computer Science',
        rgm: '1234565978',
        cardCode: 'M814a9z',
        validUntil: DateTime.now().plus({ months: randomInt(24) + 8 }),
      },
      {
        isAdmin: false,
        email: 'user@gmail.com',
        password: '12345678',
        fullName: 'Simple User de Jargas',
        course: 'Computer Science',
        rgm: '54987845',
        cardCode: 'M854h9p',
        validUntil: DateTime.now().plus({ months: randomInt(24) + 8 }),
      },
    ])
  }
}
