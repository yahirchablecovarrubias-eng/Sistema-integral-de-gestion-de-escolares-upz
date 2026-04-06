import { PlanEstudiosMateriaSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PlanEstudio from '#models/planEstudio'
import Materia from '#models/materia'
import Unidad from '#models/unidad'

export default class PlanEstudiosMateria extends PlanEstudiosMateriaSchema {
	@belongsTo(() => PlanEstudio)
	declare planEstudio: BelongsTo<typeof PlanEstudio>

	@belongsTo(() => Materia)
	declare materia: BelongsTo<typeof Materia>

	@hasMany(() => Unidad)
	declare unidades: HasMany<typeof Unidad>
}
