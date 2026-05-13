import type { HttpContext } from '@adonisjs/core/http'
import Alumno from '#models/alumno'
import AlumnoTransformer from '#transformers/alumno_transformer'
import PlanEstudio from '#models/planEstudio'
import Periodo from '#models/periodo'
import db from '@adonisjs/lucid/services/db'
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
        const payload = await request.validateUsing(createAlumnoValidator)
        
        // Extraer los datos de inscripción y los del alumno
        const { periodo, cuatrimestre, estadoAcademico, ...alumnoData } = payload

        // Buscar el periodo asumiendo el año 2026
        const periodoEncontrado = await Periodo.query()
            .where('nombre', periodo)
            .where('anio', 2026)
            .firstOrFail()

        // Usar una transacción para asegurar la integridad de los datos
        await db.transaction(async (trx) => {
            // Crear el alumno
            const alumno = new Alumno()
            alumno.fill(alumnoData)
            alumno.useTransaction(trx)
            await alumno.save()

            // Crear el registro de inscripción asociado al alumno
            await alumno.related('inscripciones').create({
                periodoId: periodoEncontrado.id,
                cuatrimestreActual: cuatrimestre,
                estadoAcademico: estadoAcademico
            }, { client: trx })
        })

        return response.redirect('/alumnos')
    }

    async showEditForm({ params, inertia }: HttpContext) {
        const alumno = await Alumno.query()
            .where('id', params.id)
            .preload('inscripciones', (query) => {
                query.preload('periodo').orderBy('id', 'desc').limit(1)
            })
            .firstOrFail()

        const planesEstudio = await PlanEstudio.all()

        let periodoNombre = ''
        let cuatrimestreActual = ''
        let estadoAcademico = ''

        if (alumno.inscripciones && alumno.inscripciones.length > 0) {
            const inscripcion = alumno.inscripciones[0]
            cuatrimestreActual = inscripcion.cuatrimestreActual?.toString() || ''
            estadoAcademico = inscripcion.estadoAcademico || ''
            if (inscripcion.periodo) {
                periodoNombre = inscripcion.periodo.nombre
            }
        }

        return inertia.render('alumnos/Agregar', {
            alumno: {
                id: alumno.id,
                nombre: alumno.nombre || '',
                apellidoPaterno: alumno.apellidoPaterno || '',
                apellidoMaterno: alumno.apellidoMaterno || '',
                curp: alumno.curp || '',
                email: alumno.email || '',
                matricula: alumno.matricula || '',
                telefono: alumno.telefono || '',
                planEstudiosId: alumno.planEstudiosId?.toString() || '',
                periodo: periodoNombre,
                cuatrimestre: cuatrimestreActual,
                estadoAcademico: estadoAcademico
            },
            planesEstudio: planesEstudio.map(plan => ({
                id: plan.id,
                nombre: plan.nombre
            }))
        })
    }

    async updateAlumno({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(createAlumnoValidator)
        const { periodo, cuatrimestre, estadoAcademico, ...alumnoData } = payload

        const alumno = await Alumno.findOrFail(params.id)

        const periodoEncontrado = await Periodo.query()
            .where('nombre', periodo)
            .where('anio', 2026)
            .firstOrFail()

        await db.transaction(async (trx) => {
            alumno.merge(alumnoData)
            alumno.useTransaction(trx)
            await alumno.save()

            const ultimaInscripcion = await alumno.related('inscripciones').query().orderBy('id', 'desc').first()
            if (ultimaInscripcion) {
                ultimaInscripcion.merge({
                    periodoId: periodoEncontrado.id,
                    cuatrimestreActual: cuatrimestre,
                    estadoAcademico: estadoAcademico
                })
                ultimaInscripcion.useTransaction(trx)
                await ultimaInscripcion.save()
            } else {
                await alumno.related('inscripciones').create({
                    periodoId: periodoEncontrado.id,
                    cuatrimestreActual: cuatrimestre,
                    estadoAcademico: estadoAcademico
                }, { client: trx })
            }
        })

        return response.redirect('/alumnos')
    }

    async deleteAlumno({ params, response }: HttpContext) {
        const alumno = await Alumno.findOrFail(params.id)
        await alumno.delete()
        return response.redirect('/alumnos')
    }
}