import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreateEdificio extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('edificio', (table) => {
      table.increments('id')
      table.string('nombre')
      table.integer('numero_salones')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('edificio')
  }
}
