import type { HttpContext } from '@adonisjs/core/http'
import Carrera from '#models/carrera'
import { createCarreraPublic } from '../dtos/carreras.ts'
import CarreraTransformer from '#transformers/carrera_transformer'
export default class CarreraController {
    async index({inertia}: HttpContext){
        const carreras = await Carrera.query()
        return inertia.render('carreras/index', {
            carreras: CarreraTransformer.transform(carreras)
        })
    }
}