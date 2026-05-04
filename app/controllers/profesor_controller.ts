import type { HttpContext } from '@adonisjs/core/http'
import ProfesorTransformer from '#transformers/profesor_transformer'
import Profesor from '#models/profesor'

export default class ProfesorController {

    async index({ inertia }: HttpContext) {
        const profesores = await Profesor.query()
        return inertia.render('profesores/index', {
            profesores: ProfesorTransformer.transform(profesores)
        })
    }

    async showFormProfesor({ inertia }: HttpContext) {
        return inertia.render('profesores/Agregar', {})
    }

    async addProfesor({ request, response }: HttpContext) {
        const data = request.only([
            'nombre',
            'apellidoPaterno',
            'apellidoMaterno',
            'curp',
            'email',
            'especialidad',
            'noCedulaProfesional',
            'rfc',
            'telefono',
        ])

        await Profesor.create(data)

        return response.redirect('/profesores')
    }

    async deleteProfesor({ params, response }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)
        await profesor.delete()
        return response.redirect('/profesores')
    }
}