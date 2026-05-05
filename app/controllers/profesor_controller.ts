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

    // Alta — sin profesor en props
    async showFormProfesor({ inertia }: HttpContext) {
        return inertia.render('profesores/Agregar', {})
    }

    // Edición — manda el profesor completo al form
    async showEditForm({ inertia, params }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)

        return inertia.render('profesores/Agregar', {
            profesor: {
                id:                  profesor.id,
                nombre:              profesor.nombre              ?? '',
                apellidoPaterno:     profesor.apellidoPaterno     ?? '',
                apellidoMaterno:     profesor.apellidoMaterno     ?? '',
                curp:                profesor.curp                ?? '',
                email:               profesor.email               ?? '',
                especialidad:        profesor.especialidad        ?? '',
                noCedulaProfesional: profesor.noCedulaProfesional ?? '',
                rfc:                 profesor.rfc                 ?? '',
                telefono:            profesor.telefono            ?? '',
            }
        })
    }

    async addProfesor({ request, response }: HttpContext) {
        const data = await request.validateUsing(createProfesorValidator)
        await Profesor.create(data)
        return response.redirect('/profesores')
    }

    async updateProfesor({ request, response, params }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)
        const data = await request.validateUsing(createProfesorValidator)
        profesor.merge(data)
        await profesor.save()
        return response.redirect('/profesores')
    }

    async deleteProfesor({ params, response }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)
        await profesor.delete()
        return response.redirect('/profesores')
    }
}