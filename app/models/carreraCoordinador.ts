import { CarreraCoordinadorSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Carrera from '#models/carrera'
import Coordinador from '#models/coordinador'

export default class CarreraCoordinador extends CarreraCoordinadorSchema {
	@belongsTo(() => Carrera)
	declare carrera: BelongsTo<typeof Carrera>

	@belongsTo(() => Coordinador)
	declare coordinador: BelongsTo<typeof Coordinador>
}
