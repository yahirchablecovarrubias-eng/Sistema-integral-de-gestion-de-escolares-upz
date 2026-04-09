import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddTelefonoToProfesor extends BaseSchema {
  public async up() {
    this.schema.withSchema('public').table('profesor', (table) => {
      table.string('telefono').nullable()
    })
  }

  public async down() {
    this.schema.withSchema('public').table('profesor', (table) => {
      table.dropColumn('telefono')
    })
  }
}
