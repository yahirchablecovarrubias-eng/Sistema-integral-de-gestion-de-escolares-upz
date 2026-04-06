import { SalonSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Edificio from '#models/edificio'
import Horario from '#models/horario'

export default class Salon extends SalonSchema {
	@belongsTo(() => Edificio)
	declare edificio: BelongsTo<typeof Edificio>

	@hasMany(() => Horario)
	declare horarios: HasMany<typeof Horario>
}
