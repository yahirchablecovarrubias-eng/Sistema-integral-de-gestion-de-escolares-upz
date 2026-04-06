import { CarreraSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PlanEstudio from '#models/planEstudio'
import Grupo from '#models/grupo'
import CarreraCoordinador from '#models/carreraCoordinador'

export default class Carrera extends CarreraSchema {
    static table = 'carrera'
    
	@hasMany(() => PlanEstudio)
	declare planEstudios: HasMany<typeof PlanEstudio>

	@hasMany(() => Grupo)
	declare grupos: HasMany<typeof Grupo>

	@hasMany(() => CarreraCoordinador)
	declare coordinadores: HasMany<typeof CarreraCoordinador>
}
