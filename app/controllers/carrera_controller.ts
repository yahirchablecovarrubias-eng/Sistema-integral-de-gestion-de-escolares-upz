import type { HttpContext } from '@adonisjs/core/http'
export default class CarreraController {
    async index({inertia}: HttpContext){
        return inertia.render('carreras/index', {})
    }
}