import { UnidadSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PlanEstudiosMateria from '#models/planEstudiosMateria'
import CalificacionUnidad from '#models/calificacionUnidad'

export default class Unidad extends UnidadSchema {
    static table = 'unidad'
	@belongsTo(() => PlanEstudiosMateria)
	declare planEstudiosMateria: BelongsTo<typeof PlanEstudiosMateria>

	@hasMany(() => CalificacionUnidad)
	declare calificaciones: HasMany<typeof CalificacionUnidad>
}
