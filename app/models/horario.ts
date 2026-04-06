import { HorarioSchema } from '#database/schema'
import { belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import GrupoMateria from '#models/grupoMateria'
import Salon from '#models/salon'

export default class Horario extends HorarioSchema {
	@belongsTo(() => GrupoMateria)
	declare grupoMateria: BelongsTo<typeof GrupoMateria>

	@belongsTo(() => Salon)
	declare salon: BelongsTo<typeof Salon>
}
