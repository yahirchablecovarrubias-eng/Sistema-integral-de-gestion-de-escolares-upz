import type { HttpContext } from '@adonisjs/core/http'
import Alumno from '#models/alumno'
import AlumnoTransformer from '#transformers/alumno_transformer'
import PlanEstudio from '#models/planEstudio'
import Periodo from '#models/periodo'
import Grupo from '#models/grupo'
import GrupoMateria from '#models/grupoMateria'
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
        const planesEstudio = await PlanEstudio.all()
        const periodos = await Periodo.query().where('anio', 2026)
        const periodoIds = periodos.map(p => p.id)
        const grupos = await Grupo.query().whereIn('periodoId', periodoIds)

        return inertia.render('alumnos/Agregar', {
            planesEstudio: planesEstudio.map(plan => ({
                id: plan.id,
                nombre: plan.nombre,
                carreraId: plan.carreraId
            })),
            periodos: periodos.map(p => ({
                id: p.id,
                nombre: p.nombre
            })),
            grupos: grupos.map(g => ({
                id: g.id,
                nombre: g.nombre,
                carreraId: g.carreraId,
                periodoId: g.periodoId,
                cuatrimestre: g.cuatrimestre
            }))
        });
    }

    async addAlumno({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createAlumnoValidator)
        
        // Extraer los datos de inscripción y los del alumno
        const { periodo, cuatrimestre, estadoAcademico, grupoId, ...alumnoData } = payload

        const periodoEncontrado = await Periodo.query()
            .where('nombre', periodo)
            .where('anio', 2026)
            .firstOrFail()

        await db.transaction(async (trx) => {
            const alumno = new Alumno()
            alumno.fill(alumnoData)
            alumno.useTransaction(trx)
            await alumno.save()

            const inscripcion = await alumno.related('inscripciones').create({
                periodoId: periodoEncontrado.id,
                cuatrimestreActual: cuatrimestre,
                estadoAcademico: estadoAcademico
            }, { client: trx })

            if (estadoAcademico === 'REGULAR' && grupoId) {
                const grupoMaterias = await GrupoMateria.query().where('grupoId', grupoId)
                for (const gm of grupoMaterias) {
                    await inscripcion.related('materias').create({
                        grupoMateriaId: gm.id
                    }, { client: trx })
                }
            }
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
        const periodos = await Periodo.query().where('anio', 2026)
        const periodoIds = periodos.map(p => p.id)
        const grupos = await Grupo.query().whereIn('periodoId', periodoIds)

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
                estadoAcademico: estadoAcademico,
                grupoId: '' // No pre-poblamos grupo en edición por simplicidad
            },
            planesEstudio: planesEstudio.map(plan => ({
                id: plan.id,
                nombre: plan.nombre,
                carreraId: plan.carreraId
            })),
            periodos: periodos.map(p => ({
                id: p.id,
                nombre: p.nombre
            })),
            grupos: grupos.map(g => ({
                id: g.id,
                nombre: g.nombre,
                carreraId: g.carreraId,
                periodoId: g.periodoId,
                cuatrimestre: g.cuatrimestre
            }))
        })
    }

    async updateAlumno({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(createAlumnoValidator)
        // Ignoramos grupoId en la edición por ahora ya que no manejamos cambio de grupo
        const { periodo, cuatrimestre, estadoAcademico, grupoId, ...alumnoData } = payload

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

    async historialGlobal({ inertia, request }: HttpContext) {
        const search = request.input('search', '')

        const query = db.from('alumno')
            .leftJoin('historial_materia', 'alumno.id', 'historial_materia.alumno_id')
            .select(
                'alumno.id',
                'alumno.matricula',
                'alumno.nombre',
                'alumno.apellido_paterno',
                'alumno.apellido_materno',
                'alumno.email',
                'alumno.curp'
            )
            .select(db.raw('AVG(CASE WHEN historial_materia.estatus != \'PENDIENTE\' THEN historial_materia.calificacion ELSE NULL END) as promedio_global'))
            .groupBy('alumno.id')
            .orderBy('alumno.apellido_paterno')
            .orderBy('alumno.apellido_materno')

        if (search) {
            query.where((q) => {
                q.whereILike('alumno.nombre', `%${search}%`)
                    .orWhereILike('alumno.apellido_paterno', `%${search}%`)
                    .orWhereILike('alumno.apellido_materno', `%${search}%`)
                    .orWhereILike('alumno.matricula', `%${search}%`)
            })
        }

        const alumnos = await query

        // Formatear promedios y datos para el frontend
        const historialGlobal = alumnos.map(row => {
            const prom = row.promedio_global ? Number(row.promedio_global) : 0;
            const promEntero = Math.floor(prom);
            const promDecimalInt = Math.round((prom - promEntero) * 100);
            const promedioFinal = promDecimalInt >= 60 ? promEntero + 1 : promEntero;
            const promedioStr = prom > 0 ? promedioFinal.toString() : "0";
            
            return {
                id: row.id,
                matricula: row.matricula,
                nombreCompleto: `${row.nombre || ''} ${row.apellido_paterno || ''} ${row.apellido_materno || ''}`.trim(),
                email: row.email,
                curp: row.curp,
                promedioGlobal: promedioStr
            }
        })

        return inertia.render('alumnos/Historial', {
            alumnos: historialGlobal,
            filters: { search }
        })
    }

    async historialDetalle({ params, inertia }: HttpContext) {
        const alumno = await Alumno.findOrFail(params.id)

        const calificaciones = await db.from('historial_materia')
            .join('materia', 'historial_materia.materia_id', 'materia.id')
            .leftJoin('plan_estudios_materia', (join) => {
                join.on('materia.id', '=', 'plan_estudios_materia.materia_id')
                    .andOnVal('plan_estudios_materia.plan_estudio_id', '=', alumno.planEstudiosId)
            })
            .where('historial_materia.alumno_id', params.id)
            .select(
                'historial_materia.id',
                'historial_materia.calificacion',
                'historial_materia.tipo_oportunidad',
                'historial_materia.estatus',
                'materia.nombre as materia_nombre',
                'plan_estudios_materia.cuatrimestre'
            )
            .orderBy('plan_estudios_materia.cuatrimestre', 'asc')
            .orderBy('materia.nombre', 'asc')

        // Calcular promedio global otra vez para pasarlo a la vista
        let suma = 0;
        let cont = 0;
        calificaciones.forEach(c => {
            const originalCalif = c.calificacion;
            
            if (c.estatus !== 'PENDIENTE' && originalCalif !== null) {
                suma += Number(originalCalif);
                cont++;
            }
            
            if (originalCalif !== null) {
                const califNum = Number(originalCalif);
                const entero = Math.floor(califNum);
                const decimalInt = Math.round((califNum - entero) * 100);
                c.calificacion = decimalInt >= 60 ? entero + 1 : entero;
            }
        });
        
        const prom = cont > 0 ? suma / cont : 0;
        const promEntero = Math.floor(prom);
        const promDecimalInt = Math.round((prom - promEntero) * 100);
        const promedioFinal = promDecimalInt >= 60 ? promEntero + 1 : promEntero;
        const promedioStr = prom > 0 ? promedioFinal.toString() : "0";

        return inertia.render('alumnos/HistorialDetalle', {
            alumno: {
                id: alumno.id,
                matricula: alumno.matricula,
                nombreCompleto: `${alumno.nombre || ''} ${alumno.apellidoPaterno || ''} ${alumno.apellidoMaterno || ''}`.trim(),
                promedioGlobal: promedioStr
            },
            calificaciones
        })
    }
}