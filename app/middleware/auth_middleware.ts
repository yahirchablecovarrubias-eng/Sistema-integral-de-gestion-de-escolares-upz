import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import type { Authenticators } from '@adonisjs/auth/types'

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
  /**
   * The URL to redirect to, when authentication fails
   */
  redirectTo = '/login'

  async handle(
    ctx: HttpContext,
    next: NextFn,
    options: {
      guards?: (keyof Authenticators)[]
    } = {}
  ) {
    await ctx.auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo })

    // Evitar que el navegador guarde en caché las páginas protegidas.
    // Sin esto, al cerrar sesión y presionar "atrás" el navegador
    // muestra la página anterior desde su caché local.
    ctx.response.header('Cache-Control', 'no-cache, no-store, must-revalidate')
    ctx.response.header('Pragma', 'no-cache')
    ctx.response.header('Expires', '0')

    return next()
  }
}
