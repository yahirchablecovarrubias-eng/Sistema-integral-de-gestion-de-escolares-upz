import type { HttpContext } from '@adonisjs/core/http'
import ProfesorTransformer from '#transformers/profesor_transformer'
import Profesor from '#models/profesor'
import { createProfesorValidator } from '#validators/profesor_validator'

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
        // validateUsing lanza una excepción si falla la validación.
        // Inertia la intercepta automáticamente y regresa los errores
        // por campo al frontend sin necesidad de manejo manual.
        const data = await request.validateUsing(createProfesorValidator)

        await Profesor.create(data)

        return response.redirect('/profesores')
    }

    async deleteProfesor({ params, response }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)
        await profesor.delete()
        return response.redirect('/profesores')
    }
}