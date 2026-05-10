import type { HttpContext } from '@adonisjs/core/http'
import Grupo from '#models/grupo'

export default class GrupoController {
  async index({ inertia }: HttpContext) {
    const rows = await Grupo.query()
      .select([
        'grupo.nombre as grupo',
        'periodo.nombre as periodo',
        'carrera.nombre as carrera',
      ])
      .innerJoin('carrera', 'grupo.carrera_id', 'carrera.id')
      .innerJoin('periodo', 'grupo.periodo_id', 'periodo.id')
      .orderBy('periodo.nombre', 'desc')
      .orderBy('grupo.nombre')
      .exec()

    // Los alias no son @column() → Lucid los mete en $extras
    // Mapeamos a objetos planos ANTES de pasarlos a Inertia
    const grupos = rows.map((r) => ({
      grupo:   r.$extras.grupo   as string,
      periodo: r.$extras.periodo as string,
      carrera: r.$extras.carrera as string,
    }))

    return inertia.render('grupos/index', { grupos })
  }
}