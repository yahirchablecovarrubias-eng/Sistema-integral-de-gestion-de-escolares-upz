import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'
import Grupo from '#models/grupo'

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

async showAlumnos({ params, inertia }: HttpContext) {
        const grupoId = params.id

        const rows = await Grupo.query()
            .select([
                'alumno.matricula',
                'alumno.nombre',
                'alumno.apellido_paterno',
                'alumno.apellido_materno',
                'grupo.nombre as grupo_nombre'   // alias necesario aquí para claridad
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
            matricula: row.$extras.matricula,
            nombreCompleto: `${row.nombre || ''} ${row.$extras.apellido_paterno || ''} ${row.$extras.apellido_materno || ''}`.trim(),
            grupo: row.$extras.grupo_nombre,
        }))

        return inertia.render('grupos/alumnos', {
            alumnos,
            grupoId,
            // Opcional: enviar también el nombre del grupo de forma más limpia
            grupoNombre: rows[0]?.$extras.grupo_nombre || `Grupo ${grupoId}`
        })
    }
}