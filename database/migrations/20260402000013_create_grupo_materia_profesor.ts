import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateGrupoMateriaProfesor extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('grupo_materia_profesor', (table) => {
      table.increments('id')
      table.integer('profesor_id').unsigned().nullable().references('id').inTable('profesor').onDelete('SET NULL')
      table.integer('grupo_materia_id').unsigned().references('id').inTable('grupo_materia').onDelete('CASCADE')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('grupo_materia_profesor')
  }
}
