import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()
      table.string('avatar_id').notNullable()
      table.string('avatar_ext')
      table.boolean('is_admin').notNullable().defaultTo(false)
      table.string('email', 254).notNullable().unique()
      table.string('password').notNullable()
      table.string('full_name').notNullable()
      table.string('course').notNullable()
      table.string('rgm').notNullable()
      table.string('card_code').notNullable()
      table.dateTime('valid_until').notNullable()

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
