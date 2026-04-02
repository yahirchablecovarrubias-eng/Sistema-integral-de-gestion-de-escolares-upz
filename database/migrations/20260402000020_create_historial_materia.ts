import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateHistorialMateria extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('historial_materia', (table) => {
      table.increments('id')
      table.integer('alumno_id').unsigned().references('id').inTable('alumno').onDelete('CASCADE')
      table.integer('periodo_id').unsigned().nullable().references('id').inTable('periodo').onDelete('SET NULL')
      table.integer('materia_id').unsigned().nullable().references('id').inTable('materia').onDelete('SET NULL')
      table.enu('tipo_oportunidad', ['ORDINARIO', 'EXTRAORDINARIO', 'RECURSAMIENTO', 'RECUPERACION', 'REVALIDACIÓN'])
      table.double('calificacion')
      table.enu('estatus', ['APROBADA', 'REPROBADA', 'PENDIENTE', 'EN CURSO']).notNullable().defaultTo('PENDIENTE')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('historial_materia')
  }
}
