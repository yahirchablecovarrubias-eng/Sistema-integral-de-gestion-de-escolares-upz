import { PeriodoSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Grupo from '#models/grupo'
import Inscripcion from '#models/inscripcion'
import HistorialMateria from '#models/historialMateria'

export default class Periodo extends PeriodoSchema {
    static table = 'periodo'
	@hasMany(() => Grupo)
	declare grupos: HasMany<typeof Grupo>

	@hasMany(() => Inscripcion)
	declare inscripciones: HasMany<typeof Inscripcion>

	@hasMany(() => HistorialMateria)
	declare historiales: HasMany<typeof HistorialMateria>
}
