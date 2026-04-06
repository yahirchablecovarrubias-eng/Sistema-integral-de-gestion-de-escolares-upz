import { CoordinadorSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import CarreraCoordinador from '#models/carreraCoordinador'

export default class Coordinador extends CoordinadorSchema {
	@hasMany(() => CarreraCoordinador)
	declare carreras: HasMany<typeof CarreraCoordinador>
}
