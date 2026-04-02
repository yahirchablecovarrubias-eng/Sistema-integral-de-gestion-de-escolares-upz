import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateMateria extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('materia', (table) => {
      table.increments('id')
      table.string('nombre').notNullable()
    })
  }

  public async down() {
    this.schema.dropTableIfExists('materia')
  }
}
