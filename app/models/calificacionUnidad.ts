import { CalificacionUnidadSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import InscripcionMateria from '#models/inscripcionMateria'
import Unidad from '#models/unidad'

export default class CalificacionUnidad extends CalificacionUnidadSchema {
    static table = 'calificacion_unidad'


	@belongsTo(() => InscripcionMateria)
	declare inscripcionMateria: BelongsTo<typeof InscripcionMateria>

	@belongsTo(() => Unidad)
	declare unidad: BelongsTo<typeof Unidad>
}
