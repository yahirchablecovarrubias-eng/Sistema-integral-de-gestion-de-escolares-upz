import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreatePlanEstudiosMateria extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('plan_estudios_materia', (table) => {
      table.increments('id')
      table.integer('plan_estudios_id').unsigned().references('id').inTable('plan_estudios').onDelete('CASCADE')
      table.integer('materia_id').unsigned().references('id').inTable('materia').onDelete('CASCADE')
      table.integer('cuatrimestre')
      table.integer('creditos')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('plan_estudios_materia')
  }
}
