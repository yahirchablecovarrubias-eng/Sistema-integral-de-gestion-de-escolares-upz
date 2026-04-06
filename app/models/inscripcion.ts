import { InscripcionSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Alumno from '#models/alumno'
import Periodo from '#models/periodo'
import InscripcionMateria from '#models/inscripcionMateria'

export default class Inscripcion extends InscripcionSchema {
    static table = 'inscripcion'
	@belongsTo(() => Alumno)
	declare alumno: BelongsTo<typeof Alumno>

	@belongsTo(() => Periodo)
	declare periodo: BelongsTo<typeof Periodo>

	@hasMany(() => InscripcionMateria)
	declare materias: HasMany<typeof InscripcionMateria>
}
