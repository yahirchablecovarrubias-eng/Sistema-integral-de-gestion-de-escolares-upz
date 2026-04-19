import type { HttpContext } from '@adonisjs/core/http'
import ProfesorTransformer from '#transformers/profesor_transformer'
import Profesor from '#models/profesor'

export default class ProfesorController{
    async index ({inertia}: HttpContext){
        const profesores = await Profesor.query()
        console.log("Profesores: " + profesores.toString())
        return inertia.render('profesores/index', {
            profesores: ProfesorTransformer.transform(profesores)
        })
    }
}