import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateUnidad extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('unidad', (table) => {
      table.increments('id')
      table.string('nombre')
      table.integer('numero_unidad')
      table.integer('plan_estudios_materia_id').unsigned().references('id').inTable('plan_estudios_materia').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('unidad')
  }
}
