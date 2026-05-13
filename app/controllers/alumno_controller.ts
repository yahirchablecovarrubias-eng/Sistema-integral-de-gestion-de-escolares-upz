import type { HttpContext } from '@adonisjs/core/http'
import Alumno from '#models/alumno'
import AlumnoTransformer from '#transformers/alumno_transformer'
export default class AlumnoController {
    async index({ inertia }: HttpContext) {
        const alumnos = await Alumno.all()
        console.log(alumnos)
        return inertia.render('alumnos/index', {
            alumnos: AlumnoTransformer.transform(alumnos)
        })
    }
}