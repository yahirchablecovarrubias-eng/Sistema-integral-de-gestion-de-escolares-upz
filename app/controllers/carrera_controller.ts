import type { HttpContext } from '@adonisjs/core/http'
import Carrera from '#models/carrera'
import CarreraTransformer from '#transformers/carrera_transformer'
import PlanEstudio from '#models/planEstudio'
import Coordinador from '#models/coordinador'
import CarreraCoordinador from '#models/carreraCoordinador'
import db from '@adonisjs/lucid/services/db'
import { createCoordinadorValidator } from '#validators/coordinador_validator'

export default class CarreraController {

    async index({ inertia }: HttpContext) {
        const carreras = await Carrera.query()
        console.log("Propiedades: " + await Carrera.$columns)
        return inertia.render('carreras/index', {
            carreras: CarreraTransformer.transform(carreras)
        })
    }

    async showPlanesEstudio({ inertia, params }: HttpContext) {
        const carreraId = params.id;

        try {

            const plan = await PlanEstudio.query().
                where('carrera_id', carreraId).
                preload('materias', (materiaQuery) => {
                    materiaQuery.preload('materia').
                        orderBy('cuatrimestre', 'asc').
                        select('*')
                }).firstOrFail()



            const materiasDelPlan = plan.materias.map((e) => ({
                nombre: e.materia.nombre,
                cuatrimestre: e.cuatrimestre,
            }))
            console.log(materiasDelPlan)
            console.log("Esta es la primera: " + materiasDelPlan[0].nombre)

            return inertia.render('carreras/plan_de_estudio', {
                plan: {
                    id: plan.id,
                    nombre: plan.nombre,
                    materias: materiasDelPlan
                }
            })
        } catch (error) {
            const carreraSinPlan = await Carrera.query().where('id', carreraId)
            console.log("La carrera sin plan es: " + carreraSinPlan)
            return inertia.render('carreras/noData', {
                carreraSinPlan: CarreraTransformer.transform(carreraSinPlan)
            })

        }

    }
    // app/controllers/carrera_controller.ts
    // app/controllers/carrera_controller.ts  (o donde lo tengas)
async showCarreraCoordinadores({ inertia }: HttpContext) {

    const coordinadoresConCarrera = await CarreraCoordinador.query()
        .preload('carrera')
        .preload('coordinador')
        .orderBy('fechaInicio', 'desc')
        .exec()

    const datos = coordinadoresConCarrera.map((relacion) => ({
        relacionId: relacion.id,
        coordinadorId: relacion.coordinador.id,
        nombreCompleto: [
            relacion.coordinador.nombre,
            relacion.coordinador.apellidoPaterno,
            relacion.coordinador.apellidoMaterno,
        ].filter(Boolean).join(' '),
        telefono: relacion.coordinador.telefono,
        correo: relacion.coordinador.correo,
        especialidad: relacion.coordinador.especialidad,
        carreraId: relacion.carrera.id,
        carreraNombre: relacion.carrera.nombre,
        fechaInicio: relacion.fechaInicio,
        fechaFin: relacion.fechaFin,
        estaActivo: !relacion.fechaFin,
    }))

    return inertia.render('carreras/carrera_coordinador', {
        coordinadores: datos
    })
}

    async showFormCoordinador({ inertia }: HttpContext) {
        const carreras = await Carrera.query().preload('coordinadores', (q) => q.whereNull('fecha_fin').preload('coordinador'))
        
        const carrerasDisponibles = carreras.map(c => ({
            id: c.id,
            nombre: c.nombre,
            coordinadorActivo: c.coordinadores.length > 0 
                ? `${c.coordinadores[0].coordinador.nombre} ${c.coordinadores[0].coordinador.apellidoPaterno}`.trim() 
                : null
        }))

        return inertia.render('carreras/AgregarCoordinador', {
            carreras: carrerasDisponibles
        })
    }

    async addCoordinador({ request, response }: HttpContext) {
        const payload = await request.validateUsing(createCoordinadorValidator)
        
        await db.transaction(async (trx) => {
            // Buscar si hay activo
            const activo = await CarreraCoordinador.query({ client: trx })
                .where('carreraId', payload.carreraId)
                .whereNull('fechaFin')
                .first()
                
            if (activo) {
                activo.fechaFin = payload.fechaInicio as any
                activo.useTransaction(trx)
                await activo.save()
            }
            
            const nuevoCoord = new Coordinador()
            nuevoCoord.fill({
                nombre: payload.nombre,
                apellidoPaterno: payload.apellidoPaterno,
                apellidoMaterno: payload.apellidoMaterno,
                telefono: payload.telefono,
                correo: payload.correo,
                curp: payload.curp,
                rfc: payload.rfc,
                noCedulaProfesional: payload.noCedulaProfesional
            })
            nuevoCoord.useTransaction(trx)
            await nuevoCoord.save()
            
            await nuevoCoord.related('carreras').create({
                carreraId: payload.carreraId,
                fechaInicio: payload.fechaInicio as any
            }, { client: trx })
        })

        return response.redirect('/carreras/coordinadores')
    }

    async showEditCoordinador({ params, inertia }: HttpContext) {
        const relacion = await CarreraCoordinador.findOrFail(params.relacionId)
        await relacion.load('coordinador')
        
        const carreras = await Carrera.query().preload('coordinadores', (q) => q.whereNull('fecha_fin').preload('coordinador'))
        
        const carrerasDisponibles = carreras.map(c => {
            const activeCoord = c.coordinadores.find(coordRel => coordRel.id !== relacion.id)
            return {
                id: c.id,
                nombre: c.nombre,
                coordinadorActivo: activeCoord 
                    ? `${activeCoord.coordinador.nombre} ${activeCoord.coordinador.apellidoPaterno}`.trim() 
                    : null
            }
        })

        // Format fechaInicio string from luxon Date or JS Date
        let localISOTime = ''
        if (relacion.fechaInicio) {
            const d = new Date(relacion.fechaInicio as any)
            const tzOffset = d.getTimezoneOffset() * 60000;
            localISOTime = (new Date(d.getTime() - tzOffset)).toISOString().split('T')[0];
        }

        return inertia.render('carreras/AgregarCoordinador', {
            coordinador: {
                relacionId: relacion.id,
                nombre: relacion.coordinador.nombre,
                apellidoPaterno: relacion.coordinador.apellidoPaterno,
                apellidoMaterno: relacion.coordinador.apellidoMaterno,
                telefono: relacion.coordinador.telefono || '',
                correo: relacion.coordinador.correo || '',
                curp: relacion.coordinador.curp || '',
                rfc: relacion.coordinador.rfc || '',
                noCedulaProfesional: relacion.coordinador.noCedulaProfesional || '',
                carreraId: relacion.carreraId,
                fechaInicio: localISOTime
            },
            carreras: carrerasDisponibles
        })
    }

    async updateCoordinador({ params, request, response }: HttpContext) {
        const payload = await request.validateUsing(createCoordinadorValidator)
        const relacion = await CarreraCoordinador.findOrFail(params.relacionId)
        await relacion.load('coordinador')

        await db.transaction(async (trx) => {
            if (relacion.carreraId !== payload.carreraId && !relacion.fechaFin) {
                const activoNuevo = await CarreraCoordinador.query({ client: trx })
                    .where('carreraId', payload.carreraId)
                    .whereNull('fechaFin')
                    .first()
                if (activoNuevo) {
                    activoNuevo.fechaFin = payload.fechaInicio as any
                    activoNuevo.useTransaction(trx)
                    await activoNuevo.save()
                }
            }

            const coord = relacion.coordinador
            coord.merge({
                nombre: payload.nombre,
                apellidoPaterno: payload.apellidoPaterno,
                apellidoMaterno: payload.apellidoMaterno,
                telefono: payload.telefono,
                correo: payload.correo,
                curp: payload.curp,
                rfc: payload.rfc,
                noCedulaProfesional: payload.noCedulaProfesional
            })
            coord.useTransaction(trx)
            await coord.save()

            relacion.merge({
                carreraId: payload.carreraId,
                fechaInicio: payload.fechaInicio as any
            })
            relacion.useTransaction(trx)
            await relacion.save()
        })

        return response.redirect('/carreras/coordinadores')
    }

    async deleteCarreraCoordinador({ params, response }: HttpContext) {
        const relacion = await CarreraCoordinador.findOrFail(params.relacionId)
        await relacion.delete()
        return response.redirect('/carreras/coordinadores')
    }

}