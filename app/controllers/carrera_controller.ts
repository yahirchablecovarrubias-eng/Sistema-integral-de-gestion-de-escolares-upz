import type { HttpContext } from '@adonisjs/core/http'
import Carrera from '#models/carrera'
import CarreraTransformer from '#transformers/carrera_transformer'
import PlanEstudio from '#models/planEstudio'
import Coordinador from '#models/coordinador'
import CarreraCoordinador from '#models/carreraCoordinador'

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


}