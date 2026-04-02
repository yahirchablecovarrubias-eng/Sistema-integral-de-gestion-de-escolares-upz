import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateAlumno extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('alumno', (table) => {
      table.increments('id')
      table.string('apellido_paterno')
      table.string('apellido_materno')
      table.string('nombre')
      table.string('telefono')
      table.string('curp')
      table.string('matricula')
      table.integer('plan_estudios_id').unsigned().nullable().references('id').inTable('plan_estudios').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('alumno')
  }
}
