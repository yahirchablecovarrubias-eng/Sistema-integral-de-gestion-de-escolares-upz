import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateCarreraCoordinador extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('carrera_coordinador', (table) => {
      table.increments('id')
      table.date('fecha_inicio')
      table.date('fecha_fin')
      table.integer('carrera_id').unsigned().references('id').inTable('carrera').onDelete('CASCADE')
      table.integer('coordinador_id').unsigned().references('id').inTable('coordinador').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('carrera_coordinador')
  }
}
