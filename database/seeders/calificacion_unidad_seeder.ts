import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Inscripcion from '#models/inscripcion'
import PlanEstudiosMateria from '#models/planEstudiosMateria'
import CalificacionUnidad from '#models/calificacionUnidad'

export default class CalificacionUnidadSeeder extends BaseSeeder {
  async run() {
    // Buscar inscripciones de los cuatrimestres 2, 5, 8
    const inscripciones = await Inscripcion.query()
      .whereIn('cuatrimestreActual', [2, 5, 8])
      .preload('alumno')
      .preload('materias', (materiasQuery) => {
        materiasQuery.preload('grupoMateria', (gmQuery) => {
          gmQuery.preload('materia')
        })
      })

    let generadas = 0

    for (const inscripcion of inscripciones) {
      if (!inscripcion.alumno || !inscripcion.alumno.planEstudiosId) continue

      for (const im of inscripcion.materias) {
        if (!im.grupoMateria || !im.grupoMateria.materia) continue

        const materia = im.grupoMateria.materia

        // Buscar el plan de estudios materia para sacar las unidades
        const pem = await PlanEstudiosMateria.query()
          .where('planEstudioId', inscripcion.alumno.planEstudiosId)
          .where('cuatrimestre', inscripcion.cuatrimestreActual!)
          .where('materiaId', materia.id)
          .preload('unidades')
          .first()

        if (!pem) {
          console.warn(`[!] No se encontró PlanEstudiosMateria para materia: ${materia.nombre} (ID: ${materia.id}), Plan: ${inscripcion.alumno.planEstudiosId}, Cuatri: ${inscripcion.cuatrimestreActual}`)
          continue
        }

        // Crear una calificación aleatoria (ej. 70 a 100) para cada unidad
        for (const unidad of pem.unidades) {
          // Generar número entre 70 y 100
          const califRandom = Math.floor(Math.random() * (100 - 70 + 1)) + 70

          await CalificacionUnidad.firstOrCreate(
            {
              inscripcionMateriaId: im.id,
              unidadId: unidad.id
            },
            {
              inscripcionMateriaId: im.id,
              unidadId: unidad.id,
              calificacion: califRandom
            }
          )
          generadas++
        }
      }
      console.log(`✅ Calificaciones generadas para alumno ${inscripcion.alumno.nombre} (Inscripción ID: ${inscripcion.id})`)
    }

    console.log(`\n🎉 Total de calificaciones de unidad generadas/verificadas: ${generadas}`)
  }
}