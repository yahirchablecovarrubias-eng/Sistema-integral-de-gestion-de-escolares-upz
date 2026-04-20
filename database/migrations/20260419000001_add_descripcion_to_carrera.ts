import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddDescripcionToCarrera extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .table('carrera', (table) => {
        table.string('descripcion')
      })
  }

  public async down() {
    this.schema
      .withSchema('public')
      .table('carrera', (table) => {
        table.dropColumn('descripcion')
      })
  }
}
