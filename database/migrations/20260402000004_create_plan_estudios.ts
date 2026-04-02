import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreatePlanEstudios extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('plan_estudios', (table) => {
      table.increments('id')
      table.integer('carrera_id').unsigned().references('id').inTable('carrera').onDelete('CASCADE')
      table.string('nombre').notNullable()
      table.enu('vigente', ['SI', 'NO']).notNullable().defaultTo('SI')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('plan_estudios')
  }
}
