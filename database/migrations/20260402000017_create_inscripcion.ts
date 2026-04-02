import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateInscripcion extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('inscripcion', (table) => {
      table.increments('id')
      table.integer('alumno_id').unsigned().references('id').inTable('alumno').onDelete('CASCADE')
      table.integer('periodo_id').unsigned().nullable().references('id').inTable('periodo').onDelete('SET NULL')
      table.integer('cuatrimestre_actual')
      table.enu('estado_academico', ['REGULAR', 'IRREGULAR']).notNullable()
    })
  }

  public async down() {
    this.schema.dropTableIfExists('inscripcion')
  }
}
