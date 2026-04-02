import { BaseSchema } from '@adonisjs/lucid/schema'

export default class CreatePeriodo extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .createTable('periodo', (table) => {
      table.increments('id')
      table.enu('nombre', ['SEPTIEMBRE-DICIEMBRE', 'ENERO-ABRIL', 'MAYO-AGOSTO']).notNullable()
      table.integer('anio')
    })
  }

  public async down() {
    this.schema.dropTableIfExists('periodo')
  }
}
