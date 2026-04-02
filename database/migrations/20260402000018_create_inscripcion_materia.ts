import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateInscripcionMateria extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('inscripcion_materia', (table) => {
      table.increments('id')
      table.integer('inscripcion_id').unsigned().references('id').inTable('inscripcion').onDelete('CASCADE')
      table.integer('grupo_materia_id').unsigned().nullable().references('id').inTable('grupo_materia').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('inscripcion_materia')
  }
}
