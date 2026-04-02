import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateCoordinador extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('coordinador', (table) => {
      table.increments('id')
      table.string('apellido_paterno')
      table.string('apellido_materno')
      table.string('nombre')
      table.string('telefono')
      table.string('correo')
      table.string('curp')
      table.string('rfc')
      table.string('no_cedula_profesional')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('coordinador')
  }
}
