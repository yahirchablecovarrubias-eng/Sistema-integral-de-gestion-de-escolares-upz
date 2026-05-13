import type { HttpContext } from '@adonisjs/core/http'
import Alumno from '#models/alumno'
import AlumnoTransformer from '#transformers/alumno_transformer'
import PlanEstudio from '#models/planEstudio'
import { createAlumnoValidator } from '#validators/alumno_validator'

export default class AlumnoController {
    async index({ request, inertia }: HttpContext) {
        const page = request.input('page', 1)
        const limit = 12
        const search = request.input('search', '')
        const cuatrimestre = request.input('cuatrimestre', '')

        const query = Alumno.query()
            .preload('inscripciones', (inscQuery) => {
                inscQuery.orderBy('id', 'desc')
            })
            .orderBy('id', 'desc')

        if (search) {
            query.where((q) => {
                q.whereILike('nombre', `%${search}%`)
                    .orWhereILike('apellidoPaterno', `%${search}%`)
                    .orWhereILike('apellidoMaterno', `%${search}%`)
                    .orWhereILike('matricula', `%${search}%`)
            })
        }

        if (cuatrimestre) {
            query.whereHas('inscripciones', (inscQuery) => {
                inscQuery.where('cuatrimestreActual', cuatrimestre)
            })
        }

        const alumnosQuery = await query.paginate(page, limit)

        const serialized = alumnosQuery.serialize()
        serialized.data = AlumnoTransformer.transform(alumnosQuery.all())

        return inertia.render('alumnos/index', {
            alumnosData: serialized,
            filters: { search, cuatrimestre }
        } as any)
    }

    async showFormAlumno({ inertia }: HttpContext) {
        // Obtenemos los planes de estudio vigentes (o todos, según necesites)
        const planesEstudio = await PlanEstudio.all()

        return inertia.render('alumnos/Agregar', {
            planesEstudio: planesEstudio.map(plan => ({
                id: plan.id,
                nombre: plan.nombre
            }))
        });
    }

    async addAlumno({ request, response }: HttpContext) {
        const data = await request.validateUsing(createAlumnoValidator)
        await Alumno.create(data)
        return response.redirect('/alumnos')
    }
}