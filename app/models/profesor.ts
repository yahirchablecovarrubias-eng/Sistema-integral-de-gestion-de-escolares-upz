import { ProfesorSchema } from '#database/schema'
import { hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import GrupoMateriaProfesor from '#models/grupoMateriaProfesor'

export default class Profesor extends ProfesorSchema {
	@hasMany(() => GrupoMateriaProfesor)
	declare grupoMateriaProfesores: HasMany<typeof GrupoMateriaProfesor>
}
