import '@adonisjs/inertia/types'

import type React from 'react'
import type { Prettify } from '@adonisjs/core/types/common'

type ExtractProps<T> =
  T extends React.FC<infer Props>
    ? Prettify<Omit<Props, 'children'>>
    : T extends React.Component<infer Props>
      ? Prettify<Omit<Props, 'children'>>
      : never

declare module '@adonisjs/inertia/types' {
  export interface InertiaPages {
    'alumnos/Agregar': ExtractProps<(typeof import('../../inertia/pages/alumnos/Agregar.tsx'))['default']>
    'alumnos/Historial': ExtractProps<(typeof import('../../inertia/pages/alumnos/Historial.tsx'))['default']>
    'alumnos/HistorialDetalle': ExtractProps<(typeof import('../../inertia/pages/alumnos/HistorialDetalle.tsx'))['default']>
    'alumnos/index': ExtractProps<(typeof import('../../inertia/pages/alumnos/index.tsx'))['default']>
    'auth/login': ExtractProps<(typeof import('../../inertia/pages/auth/login.tsx'))['default']>
    'auth/signup': ExtractProps<(typeof import('../../inertia/pages/auth/signup.tsx'))['default']>
    'carreras/AgregarCoordinador': ExtractProps<(typeof import('../../inertia/pages/carreras/AgregarCoordinador.tsx'))['default']>
    'carreras/carrera_coordinador': ExtractProps<(typeof import('../../inertia/pages/carreras/carrera_coordinador.tsx'))['default']>
    'carreras/index': ExtractProps<(typeof import('../../inertia/pages/carreras/index.tsx'))['default']>
    'carreras/noData': ExtractProps<(typeof import('../../inertia/pages/carreras/noData.tsx'))['default']>
    'carreras/plan_de_estudio': ExtractProps<(typeof import('../../inertia/pages/carreras/plan_de_estudio.tsx'))['default']>
    'carreras/plan': ExtractProps<(typeof import('../../inertia/pages/carreras/plan.tsx'))['default']>
    'errors/not_found': ExtractProps<(typeof import('../../inertia/pages/errors/not_found.tsx'))['default']>
    'errors/server_error': ExtractProps<(typeof import('../../inertia/pages/errors/server_error.tsx'))['default']>
    'grupos/Agregar': ExtractProps<(typeof import('../../inertia/pages/grupos/Agregar.tsx'))['default']>
    'grupos/alumnos': ExtractProps<(typeof import('../../inertia/pages/grupos/alumnos.tsx'))['default']>
    'grupos/index': ExtractProps<(typeof import('../../inertia/pages/grupos/index.tsx'))['default']>
    'home': ExtractProps<(typeof import('../../inertia/pages/home.tsx'))['default']>
    'profesores/Agregar': ExtractProps<(typeof import('../../inertia/pages/profesores/Agregar.tsx'))['default']>
    'profesores/Asignaturas': ExtractProps<(typeof import('../../inertia/pages/profesores/Asignaturas.tsx'))['default']>
    'profesores/AsignaturasDetalle': ExtractProps<(typeof import('../../inertia/pages/profesores/AsignaturasDetalle.tsx'))['default']>
    'profesores/index': ExtractProps<(typeof import('../../inertia/pages/profesores/index.tsx'))['default']>
  }
}
