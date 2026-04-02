import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateProfesor extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('profesor', (table) => {
      table.increments('id')
      table.string('apellido_paterno')
      table.string('apellido_materno')
      table.string('nombre')
      table.string('curp')
      table.string('rfc')
      table.string('no_cedula_profesional')
      table.string('especialidad')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('profesor')
  }
}
