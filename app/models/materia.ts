import { MateriaSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import PlanEstudiosMateria from '#models/planEstudiosMateria'
import GrupoMateria from '#models/grupoMateria'
import HistorialMateria from '#models/historialMateria'

export default class Materia extends MateriaSchema {
    static table = 'materia'
	@hasMany(() => PlanEstudiosMateria)
	declare planMaterias: HasMany<typeof PlanEstudiosMateria>

	@hasMany(() => GrupoMateria)
	declare gruposMaterias: HasMany<typeof GrupoMateria>

	@hasMany(() => HistorialMateria)
	declare historiales: HasMany<typeof HistorialMateria>
}
	