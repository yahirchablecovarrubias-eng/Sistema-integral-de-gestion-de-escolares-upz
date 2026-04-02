import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateGrupo extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('grupo', (table) => {
      table.increments('id')
      table.string('nombre')
      table.integer('cuatrimestre')
      table.integer('carrera_id').unsigned().nullable().references('id').inTable('carrera').onDelete('SET NULL')
      table.integer('periodo_id').unsigned().nullable().references('id').inTable('periodo').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('grupo')
  }
}
