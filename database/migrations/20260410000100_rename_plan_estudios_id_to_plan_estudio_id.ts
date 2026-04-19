import { BaseSchema } from '@adonisjs/lucid/schema'

export default class RenamePlanEstudiosIdToPlanEstudioId extends BaseSchema {
  public async up() {
    this.schema.withSchema('public').alterTable('plan_estudios_materia', (table) => {
      table.renameColumn('plan_estudios_id', 'plan_estudio_id')
    })
  }

  public async down() {
    this.schema.withSchema('public').alterTable('plan_estudios_materia', (table) => {
      table.renameColumn('plan_estudio_id', 'plan_estudios_id')
    })
  }
}
