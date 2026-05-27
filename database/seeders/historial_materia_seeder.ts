import { BaseSeeder } from '@adonisjs/lucid/seeders'
import InscripcionMateria from '#models/inscripcionMateria'
import HistorialMateria from '#models/historialMateria'

export default class HistorialMateriaSeeder extends BaseSeeder {
  async run() {
    const periodoId = 7

    // Extraer inscripcionMateria junto con sus calificaciones_unidad, la inscripcion (para sacar al alumno)
    // y el grupo_materia (para sacar la materia)
    const inscripcionMaterias = await InscripcionMateria.query()
      .preload('calificaciones')
      .preload('inscripcion')
      .preload('grupoMateria')

    let generados = 0

    for (const im of inscripcionMaterias) {
      if (!im.inscripcion || !im.inscripcion.alumnoId || !im.grupoMateria || !im.grupoMateria.materiaId) {
        continue
      }

      // Validar que tengamos calificaciones
      if (im.calificaciones.length === 0) {
        continue
      }

      const alumnoId = im.inscripcion.alumnoId
      const materiaId = im.grupoMateria.materiaId

      // Calcular promedio de las unidades
      let suma = 0
      let unidadReprobada = false

      for (const cu of im.calificaciones) {
        const calificacion = cu.calificacion || 0
        suma += calificacion
        if (calificacion < 70) {
          unidadReprobada = true
        }
      }

      const promedio = suma / im.calificaciones.length
      
      // Reglas de negocio:
      // Si sacó menos de 70 en alguna unidad -> 'RECUPERACION'
      // Si en todas sacó 70 o más -> 'ORDINARIO'
      const tipoOportunidad = unidadReprobada ? 'RECUPERACION' : 'ORDINARIO'
      
      // Estatus de la materia basado en el promedio total
      const estatus = promedio >= 70 ? 'APROBADA' : 'REPROBADA'

      await HistorialMateria.firstOrCreate(
        {
          alumnoId: alumnoId,
          periodoId: periodoId,
          materiaId: materiaId
        },
        {
          alumnoId: alumnoId,
          periodoId: periodoId,
          materiaId: materiaId,
          tipoOportunidad: tipoOportunidad,
          calificacion: promedio,
          estatus: estatus
        }
      )

      generados++
    }

    console.log(`\n🎉 Total de registros de historial_materia generados/verificados: ${generados}`)
  }
}