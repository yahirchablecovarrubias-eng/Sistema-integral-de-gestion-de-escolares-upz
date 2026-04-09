import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddEmailToProfesor extends BaseSchema {
  public async up() {
    this.schema.withSchema('public').table('profesor', (table) => {
      table.string('email').nullable().unique()
    })
  }

  public async down() {
    this.schema.withSchema('public').table('profesor', (table) => {
      table.dropColumn('email')
    })
  }
}
