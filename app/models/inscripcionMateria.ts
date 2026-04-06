import { InscripcionMateriaSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Inscripcion from '#models/inscripcion'
import GrupoMateria from '#models/grupoMateria'
import CalificacionUnidad from '#models/calificacionUnidad'

export default class InscripcionMateria extends InscripcionMateriaSchema {
	@belongsTo(() => Inscripcion)
	declare inscripcion: BelongsTo<typeof Inscripcion>

	@belongsTo(() => GrupoMateria)
	declare grupoMateria: BelongsTo<typeof GrupoMateria>

	@hasMany(() => CalificacionUnidad)
	declare calificaciones: HasMany<typeof CalificacionUnidad>
}
