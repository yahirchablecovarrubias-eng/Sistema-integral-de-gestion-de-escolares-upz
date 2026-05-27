import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Grupo from '#models/grupo'
import Carrera from '#models/carrera'

export default class GrupoController {
  async index({ inertia }: HttpContext) {
    const rows = await Grupo.query()
      .select([
        'grupo.id',
        'grupo.nombre as grupo',
        'periodo.nombre as periodo',
        'carrera.nombre as carrera',
      ])
      .innerJoin('carrera', 'grupo.carrera_id', 'carrera.id')
      .innerJoin('periodo', 'grupo.periodo_id', 'periodo.id')
      .orderBy('periodo.nombre', 'desc')
      .orderBy('grupo.nombre')
      .exec()

    const grupos = rows.map((r) => ({
      id: r.id,
      grupo: r.$extras.grupo as string,
      periodo: r.$extras.periodo as string,
      carrera: r.$extras.carrera as string,
    }))

    return inertia.render('grupos/index', { grupos })
  }

  async showFormGrupo({ inertia }: HttpContext) {
    const carreras = await Carrera.query().select('id', 'nombre')
    return inertia.render('grupos/Agregar', { carreras })
  }

  async addGrupo({ request, response }: HttpContext) {
    const payload = request.only(['nombre', 'carrera_id', 'cuatrimestre'])
    
    const cuatri = Number(payload.cuatrimestre)
    let periodo_id = 9 // Por defecto SEPTIEMBRE-DICIEMBRE
    
    if ([1, 4, 7, 10].includes(cuatri)) {
        periodo_id = 9
    } else if ([2, 5, 8].includes(cuatri)) {
        periodo_id = 7
    } else if ([3, 6, 9].includes(cuatri)) {
        periodo_id = 8
    }

    await Grupo.create({
        nombre: payload.nombre.toUpperCase(),
        cuatrimestre: cuatri,
        carreraId: Number(payload.carrera_id),
        periodoId: periodo_id
    })

    return response.redirect('/carreras/grupos')
  }

async showAlumnos({ params, inertia }: HttpContext) {
        const grupoId = params.id
        const grupo = await Grupo.findOrFail(grupoId)

        const rows = await Grupo.query()
            .select([
                'alumno.id as alumno_id',
                'alumno.matricula',
                'alumno.nombre',
                'alumno.apellido_paterno',
                'alumno.apellido_materno',
                'grupo.nombre as grupo_nombre'
            ])
            .innerJoin('grupo_materia', 'grupo.id', 'grupo_materia.grupo_id')
            .innerJoin('inscripcion_materia', 'grupo_materia.id', 'inscripcion_materia.grupo_materia_id')
            .innerJoin('inscripcion', 'inscripcion_materia.inscripcion_id', 'inscripcion.id')
            .innerJoin('alumno', 'inscripcion.alumno_id', 'alumno.id')
            .where('grupo.id', grupoId)
            .distinct()
            .orderBy('alumno.apellido_paterno')
            .orderBy('alumno.apellido_materno')
            .orderBy('alumno.nombre')
            .exec()

        const alumnos = rows.map((row) => ({
            id: row.$extras.alumno_id,
            matricula: row.$extras.matricula,
            nombreCompleto: `${row.nombre || ''} ${row.$extras.apellido_paterno || ''} ${row.$extras.apellido_materno || ''}`.trim(),
            grupo: row.$extras.grupo_nombre,
        }))

        const inscritosIds = rows.map(r => r.$extras.alumno_id)

        const disponiblesQuery = db.from('inscripcion')
            .innerJoin('alumno', 'inscripcion.alumno_id', 'alumno.id')
            .where('inscripcion.cuatrimestre_actual', grupo.cuatrimestre)
            .select(
                'alumno.id',
                'alumno.matricula',
                'alumno.nombre',
                'alumno.apellido_paterno',
                'alumno.apellido_materno'
            )
            .distinct()

        if (inscritosIds.length > 0) {
            disponiblesQuery.whereNotIn('alumno.id', inscritosIds)
        }

        const disponiblesRows = await disponiblesQuery
        const alumnosDisponibles = disponiblesRows.map(row => ({
            id: row.id,
            matricula: row.matricula,
            nombreCompleto: `${row.nombre || ''} ${row.apellido_paterno || ''} ${row.apellido_materno || ''}`.trim()
        }))

        return inertia.render('grupos/alumnos', {
            alumnos,
            alumnosDisponibles,
            grupoId,
            grupoNombre: rows[0]?.$extras.grupo_nombre || grupo.nombre
        })
    }

    async asignarAlumno({ params, request, response }: HttpContext) {
        const grupoId = params.grupoId
        const { alumno_id } = request.only(['alumno_id'])

        // 1. Encontrar la inscripción del alumno para el cuatrimestre del grupo
        const grupo = await Grupo.findOrFail(grupoId)
        
        const inscripcion = await db.from('inscripcion')
            .where('alumno_id', alumno_id)
            .where('cuatrimestre_actual', grupo.cuatrimestre)
            .select('id')
            .first()

        if (!inscripcion) {
            return response.badRequest('El alumno no tiene una inscripción válida para el cuatrimestre del grupo.')
        }

        // 2. Obtener todas las materias (grupo_materia) de este grupo
        const materiasDelGrupo = await db.from('grupo_materia').where('grupo_id', grupoId).select('id')

        // 3. Crear los registros en inscripcion_materia
        const insertData = materiasDelGrupo.map(m => ({
            inscripcion_id: inscripcion.id,
            grupo_materia_id: m.id
        }))

        if (insertData.length > 0) {
            await db.table('inscripcion_materia').insert(insertData)
        }

        return response.redirect().back()
    }

    async removerAlumno({ params, response }: HttpContext) {
        const { grupoId, alumnoId } = params

        // Obtener IDs de grupo_materia que pertenecen al grupo
        const materiasDelGrupo = await db.from('grupo_materia')
            .where('grupo_id', grupoId)
            .select('id')
        
        const materiasIds = materiasDelGrupo.map(m => m.id)

        if (materiasIds.length === 0) {
            return response.redirect().back()
        }

        // Obtener el ID de la inscripción del alumno (puede tener más de una, pero buscaremos las que estén conectadas a las materiasIds de ese alumno)
        // La mejor manera es hacer el delete con un subquery o inner joins
        
        const inscripcionesAlumno = await db.from('inscripcion')
            .where('alumno_id', alumnoId)
            .select('id')
            
        const inscripcionesIds = inscripcionesAlumno.map(i => i.id)

        if (inscripcionesIds.length > 0) {
            await db.from('inscripcion_materia')
                .whereIn('grupo_materia_id', materiasIds)
                .whereIn('inscripcion_id', inscripcionesIds)
                .delete()
        }

        return response.redirect().back()
    }
}