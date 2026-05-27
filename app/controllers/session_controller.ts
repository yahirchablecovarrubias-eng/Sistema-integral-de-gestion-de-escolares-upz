import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionController {
  async create({ inertia }: HttpContext) {
    return inertia.render('auth/login', {})
  }

  async store({ request, auth, response }: HttpContext) {
    const { email, password } = request.all()
    const user = await User.verifyCredentials(email, password)

    await auth.use('web').login(user)
    response.redirect().toRoute('home')
  }

  async destroy({ auth, inertia }: HttpContext) {
    await auth.use('web').logout()

    // Esto fuerza al navegador a hacer una recarga completa de la ventana,
    // destruyendo toda la memoria y el historial de React/Inertia al instante.
    return inertia.location('/login')
  }
}
