import { BaseSeeder } from '@adonisjs/lucid/seeders'
import PlanEstudiosMateria from '#models/planEstudiosMateria'
import Unidad from '#models/unidad'

export default class UnidadSeeder extends BaseSeeder {
  async run() {
    const data = [
      { cuatrimestre: 2, nombre: 'INGLES II', planId: 1 },
      { cuatrimestre: 5, nombre: 'INGLES V', planId: 1 },
      { cuatrimestre: 8, merge: true, nombre: 'INGLES VII', planId: 1 },
      { cuatrimestre: 2, nombre: 'HABILIDADES SOCIOEMOCIONALES', planId: 1 },
      { cuatrimestre: 5, nombre: 'LIDERAZGO DE EQUIPOS DE ALTO RENDIMIENTO', planId: 1 },
      { cuatrimestre: 8, nombre: 'ELECTRONICA DIGITAL', planId: 1 },
      { cuatrimestre: 2, nombre: 'CALCULO DIFERENCIAL', planId: 1 },
      { cuatrimestre: 5, nombre: 'ECUACIONES DIFERENCIALES', planId: 1 },
      { cuatrimestre: 8, nombre: 'PROYECTOS DE TECNOLOGIA', planId: 1 },
      { cuatrimestre: 2, nombre: 'CONMUTACION Y ENRUTAMIENTO DE REDES', planId: 1 },
      { cuatrimestre: 5, nombre: 'APLICACIONES WEB ORIENTADAS A SERVICIOS', planId: 1 },
      { cuatrimestre: 8, nombre: 'PROGRAMACION PARA INTELIGENCIA ARTIFICIAL', planId: 1 },
      { cuatrimestre: 2, nombre: 'PROBABILIDAD Y ESTADISTICA', planId: 1 },
      { cuatrimestre: 5, nombre: 'BASES DE DATOS AVANZADAS', planId: 1 },
      { cuatrimestre: 8, nombre: 'ADMINISTRACION DE SERVIDORES', planId: 1 },
      { cuatrimestre: 2, nombre: 'PROGRAMACION ESTRUCTURADA', planId: 1 },
      { cuatrimestre: 8, nombre: 'INTEGRACION DE SOLUCIONES', planId: 1 },
      { cuatrimestre: 2, nombre: 'SISTEMAS OPERATIVOS', planId: 1 },
      { cuatrimestre: 5, nombre: 'PROYECTO INTEGRADOR II', planId: 1 },
      { cuatrimestre: 5, nombre: 'ESTANDARES Y METRICAS PARA EL DESARROLLO DE SOFTWARE', planId: 1 },
      { cuatrimestre: 8, nombre: 'INFORMATICA FORENSE', planId: 1 },
      { cuatrimestre: 2, nombre: 'INGLES II', planId: 2 },
      { cuatrimestre: 2, nombre: 'CALCULO DIFERENCIAL', planId: 2 },
      { cuatrimestre: 2, nombre: 'PROGRAMACION ESTRUCTURADA', planId: 2 },
      { cuatrimestre: 2, nombre: 'FISICA II', planId: 2 },
      { cuatrimestre: 2, nombre: 'ELECTRICIDAD Y MAGNETISMO', planId: 2 },
      { cuatrimestre: 2, nombre: 'MATERIALES DE INGENIERIA', planId: 2 },
      { cuatrimestre: 2, nombre: 'HABILIDADES SOCIOEMOCIONALES', planId: 2 },
      { cuatrimestre: 5, nombre: 'INGLES V', planId: 2 },
      { cuatrimestre: 5, nombre: 'ECUACIONES DIFERENCIALES', planId: 2 },
      { cuatrimestre: 5, nombre: 'CONTROL AUTOMATICO', planId: 2 },
      { cuatrimestre: 5, nombre: 'MICROCONTROLADORES', planId: 2 },
      { cuatrimestre: 5, nombre: 'SISTEMAS EMBEBIDOS', planId: 2 },
      { cuatrimestre: 5, nombre: 'MANUFACTURA AUTOMATIZADA', planId: 2 },
      { cuatrimestre: 5, nombre: 'LIDERAZGO DE EQUIPOS DE ALTO RENDIMIENTO', planId: 2 },
      { cuatrimestre: 8, nombre: 'INGLES VII', planId: 2 },
      { cuatrimestre: 8, nombre: 'INTELIGENCIA ARTIFICIAL', planId: 2 },
      { cuatrimestre: 8, nombre: 'AUTOMATIZACION INDUSTRIAL', planId: 2 },
      { cuatrimestre: 8, nombre: 'DISENO MECATRONICO', planId: 2 },
      { cuatrimestre: 8, nombre: 'SISTEMAS SCADA', planId: 2 },
      { cuatrimestre: 8, nombre: 'ENERGIAS RENOVABLES', planId: 2 },
      { cuatrimestre: 8, nombre: 'EVALUACION DE PROYECTOS', planId: 2 }
    ]

    for (const item of data) {
      const pem = await PlanEstudiosMateria.query()
        .where('planEstudioId', item.planId)
        .where('cuatrimestre', item.cuatrimestre)
        .whereHas('materia', (query) => {
          query.where('nombre', item.nombre)
        })
        .first()

      if (!pem) {
        console.warn(`PlanEstudiosMateria no encontrado para: ${item.nombre} (Plan: ${item.planId}, Cuatrimestre: ${item.cuatrimestre})`)
        continue
      }

      // Por defecto creamos 3 unidades por materia, se puede ajustar
      for (let i = 1; i <= 3; i++) {
        await Unidad.firstOrCreate(
          { 
            planEstudiosMateriaId: pem.id,
            numeroUnidad: i
          },
          {
            nombre: `Unidad ${i}`,
            numeroUnidad: i,
            planEstudiosMateriaId: pem.id
          }
        )
      }
      console.log(`✅ Unidades creadas/verificadas para ${item.nombre} (Plan: ${item.planId}, Cuatri: ${item.cuatrimestre})`)
    }
  }
}