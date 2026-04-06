import { PlanEstudioSchema } from '#database/schema'
import { hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import PlanEstudiosMateria from '#models/planEstudiosMateria'
import Carrera from '#models/carrera'
import Alumno from '#models/alumno'

export default class PlanEstudio extends PlanEstudioSchema {
	@hasMany(() => PlanEstudiosMateria)
	declare materias: HasMany<typeof PlanEstudiosMateria>

	@belongsTo(() => Carrera)
	declare carrera: BelongsTo<typeof Carrera>

	@hasMany(() => Alumno)
	declare alumnos: HasMany<typeof Alumno>
}
