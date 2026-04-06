import { GrupoMateriaProfesorSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import GrupoMateria from '#models/grupoMateria'
import Profesor from '#models/profesor'

export default class GrupoMateriaProfesor extends GrupoMateriaProfesorSchema {
	@belongsTo(() => GrupoMateria)
	declare grupoMateria: BelongsTo<typeof GrupoMateria>

	@belongsTo(() => Profesor)
	declare profesor: BelongsTo<typeof Profesor>
}
