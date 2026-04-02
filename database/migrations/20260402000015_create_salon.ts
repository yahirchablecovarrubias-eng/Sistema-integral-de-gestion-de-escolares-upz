import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateSalon extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('salon', (table) => {
      table.increments('id')
      table.string('nombre')
      table.integer('edificio_id').unsigned().nullable().references('id').inTable('edificio').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('salon')
  }
}
