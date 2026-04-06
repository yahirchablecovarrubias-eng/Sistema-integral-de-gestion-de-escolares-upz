import { GrupoMateriaSchema } from '#database/schema'
import { belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Grupo from '#models/grupo'
import Materia from '#models/materia'
import GrupoMateriaProfesor from '#models/grupoMateriaProfesor'
import Horario from '#models/horario'
import InscripcionMateria from './inscripcionMateria.ts'

export default class GrupoMateria extends GrupoMateriaSchema {

    static table = 'grupo_materia'
	@belongsTo(() => Grupo)
	declare grupo: BelongsTo<typeof Grupo>

	@belongsTo(() => Materia)
	declare materia: BelongsTo<typeof Materia>

	@hasMany(() => GrupoMateriaProfesor)
	declare profesores: HasMany<typeof GrupoMateriaProfesor>

	@hasMany(() => Horario)
	declare horarios: HasMany<typeof Horario>

    @hasMany(()=>InscripcionMateria)
    declare inscripcionMateria: HasMany<typeof InscripcionMateria>
}
