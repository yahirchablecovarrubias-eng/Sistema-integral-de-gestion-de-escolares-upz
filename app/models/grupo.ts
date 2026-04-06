import { GrupoSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Carrera from '#models/carrera'
import Periodo from '#models/periodo'
import GrupoMateria from '#models/grupoMateria'

export default class Grupo extends GrupoSchema {

    static table ='grupo'
	@belongsTo(() => Carrera)
	declare carrera: BelongsTo<typeof Carrera>

	@belongsTo(() => Periodo)
	declare periodo: BelongsTo<typeof Periodo>

	@hasMany(() => GrupoMateria)
	declare materias: HasMany<typeof GrupoMateria>
}
