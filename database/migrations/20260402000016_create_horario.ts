import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateHorario extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('horario', (table) => {
      table.increments('id')
      table.integer('grupo_materia_id').unsigned().references('id').inTable('grupo_materia').onDelete('CASCADE')
      table.enu('dia_semana', ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO', 'DOMINGO']).notNullable()
      table.time('hora_inicio')
      table.time('hora_fin')
      table.integer('salon_id').unsigned().nullable().references('id').inTable('salon').onDelete('SET NULL')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('horario')
  }
}
