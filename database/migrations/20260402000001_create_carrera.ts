import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateCarrera extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('carrera', (table) => {
      table.increments('id')
      table.string('nombre').notNullable()
    })
  }

  public async down() {
    this.schema.dropTableIfExists('carrera')
  }
}
