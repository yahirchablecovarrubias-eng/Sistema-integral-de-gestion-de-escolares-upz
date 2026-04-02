import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateCalificacionUnidad extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('calificacion_unidad', (table) => {
      table.increments('id')
      table.integer('inscripcion_materia_id').unsigned().references('id').inTable('inscripcion_materia').onDelete('CASCADE')
      table.integer('unidad_id').unsigned().nullable().references('id').inTable('unidad').onDelete('SET NULL')
      table.double('calificacion')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('calificacion_unidad')
  }
}
