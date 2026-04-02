import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateGrupoMateria extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('grupo_materia', (table) => {
      table.increments('id')
      table.integer('grupo_id').unsigned().references('id').inTable('grupo').onDelete('CASCADE')
      table.integer('materia_id').unsigned().references('id').inTable('materia').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('grupo_materia')
  }
}
