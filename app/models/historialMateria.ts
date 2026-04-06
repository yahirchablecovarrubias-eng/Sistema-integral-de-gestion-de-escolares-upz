import { HistorialMateriaSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Alumno from '#models/alumno'
import Periodo from '#models/periodo'
import Materia from '#models/materia'

export default class HistorialMateria extends HistorialMateriaSchema {
	@belongsTo(() => Alumno)
	declare alumno: BelongsTo<typeof Alumno>

	@belongsTo(() => Periodo)
	declare periodo: BelongsTo<typeof Periodo>

	@belongsTo(() => Materia)
	declare materia: BelongsTo<typeof Materia>
}
