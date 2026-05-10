import { BaseSchema } from '@adonisjs/lucid/schema'

export default class AddUniquePeriodoNombreAnio extends BaseSchema {
  public async up() {
    this.schema
      .withSchema('public')
      .alterTable('periodo', (table) => {
        table.unique(['nombre', 'anio'], 'periodo_nombre_anio_unique')
      })
  }

  public async down() {
    this.schema
      .withSchema('public')
      .alterTable('periodo', (table) => {
        table.dropUnique(['nombre', 'anio'], 'periodo_nombre_anio_unique')
      })
  }
}
