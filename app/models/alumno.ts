import { AlumnoSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import PlanEstudio from '#models/planEstudio'
import Inscripcion from '#models/inscripcion'
import HistorialMateria from '#models/historialMateria'

export default class Alumno extends AlumnoSchema {
	@belongsTo(() => PlanEstudio)
	declare planEstudio: BelongsTo<typeof PlanEstudio>

	@hasMany(() => Inscripcion)
	declare inscripciones: HasMany<typeof Inscripcion>

	@hasMany(() => HistorialMateria)
	declare historiales: HasMany<typeof HistorialMateria>
}
