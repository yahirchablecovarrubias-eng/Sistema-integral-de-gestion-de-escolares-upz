import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddEmailToAlumno extends BaseSchema {
  public async up() {
    this.schema.withSchema('public').table('alumno', (table) => {
      table.string('email').nullable()
    })
  }

  public async down() {
    this.schema.withSchema('public').table('alumno', (table) => {
      table.dropColumn('email')
    })
  }
}
