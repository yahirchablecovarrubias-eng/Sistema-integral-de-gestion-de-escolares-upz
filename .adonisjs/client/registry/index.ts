/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'home': {
    methods: ["GET","HEAD"],
    pattern: '/',
    tokens: [{"old":"/","type":0,"val":"/","end":""}],
    types: placeholder as Registry['home']['types'],
  },
  'carrera.index': {
    methods: ["GET","HEAD"],
    pattern: '/carreras',
    tokens: [{"old":"/carreras","type":0,"val":"carreras","end":""}],
    types: placeholder as Registry['carrera.index']['types'],
  },
  'profesor.index': {
    methods: ["GET","HEAD"],
    pattern: '/profesores',
    tokens: [{"old":"/profesores","type":0,"val":"profesores","end":""}],
    types: placeholder as Registry['profesor.index']['types'],
  },
  'profesor.show_form_profesor': {
    methods: ["GET","HEAD"],
    pattern: '/profesores/agregar',
    tokens: [{"old":"/profesores/agregar","type":0,"val":"profesores","end":""},{"old":"/profesores/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['profesor.show_form_profesor']['types'],
  },
  'profesor.add_profesor': {
    methods: ["POST"],
    pattern: '/profesores/agregar',
    tokens: [{"old":"/profesores/agregar","type":0,"val":"profesores","end":""},{"old":"/profesores/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['profesor.add_profesor']['types'],
  },
  'profesor.show_edit_form': {
    methods: ["GET","HEAD"],
    pattern: '/profesores/editar/:id',
    tokens: [{"old":"/profesores/editar/:id","type":0,"val":"profesores","end":""},{"old":"/profesores/editar/:id","type":0,"val":"editar","end":""},{"old":"/profesores/editar/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['profesor.show_edit_form']['types'],
  },
  'profesor.update_profesor': {
    methods: ["PUT"],
    pattern: '/profesores/editar/:id',
    tokens: [{"old":"/profesores/editar/:id","type":0,"val":"profesores","end":""},{"old":"/profesores/editar/:id","type":0,"val":"editar","end":""},{"old":"/profesores/editar/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['profesor.update_profesor']['types'],
  },
  'profesor.delete_profesor': {
    methods: ["DELETE"],
    pattern: '/profesores/eliminar/:id',
    tokens: [{"old":"/profesores/eliminar/:id","type":0,"val":"profesores","end":""},{"old":"/profesores/eliminar/:id","type":0,"val":"eliminar","end":""},{"old":"/profesores/eliminar/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['profesor.delete_profesor']['types'],
  },
  'profesor.asignaturas': {
    methods: ["GET","HEAD"],
    pattern: '/profesores/asignaturas',
    tokens: [{"old":"/profesores/asignaturas","type":0,"val":"profesores","end":""},{"old":"/profesores/asignaturas","type":0,"val":"asignaturas","end":""}],
    types: placeholder as Registry['profesor.asignaturas']['types'],
  },
  'profesor.asignaturas_detalle': {
    methods: ["GET","HEAD"],
    pattern: '/profesores/asignaturas/:id',
    tokens: [{"old":"/profesores/asignaturas/:id","type":0,"val":"profesores","end":""},{"old":"/profesores/asignaturas/:id","type":0,"val":"asignaturas","end":""},{"old":"/profesores/asignaturas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['profesor.asignaturas_detalle']['types'],
  },
  'profesor.asignar_materia': {
    methods: ["POST"],
    pattern: '/profesores/asignaturas/:id',
    tokens: [{"old":"/profesores/asignaturas/:id","type":0,"val":"profesores","end":""},{"old":"/profesores/asignaturas/:id","type":0,"val":"asignaturas","end":""},{"old":"/profesores/asignaturas/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['profesor.asignar_materia']['types'],
  },
  'profesor.remover_materia': {
    methods: ["DELETE"],
    pattern: '/profesores/asignaturas/:profesorId/:grupoMateriaId',
    tokens: [{"old":"/profesores/asignaturas/:profesorId/:grupoMateriaId","type":0,"val":"profesores","end":""},{"old":"/profesores/asignaturas/:profesorId/:grupoMateriaId","type":0,"val":"asignaturas","end":""},{"old":"/profesores/asignaturas/:profesorId/:grupoMateriaId","type":1,"val":"profesorId","end":""},{"old":"/profesores/asignaturas/:profesorId/:grupoMateriaId","type":1,"val":"grupoMateriaId","end":""}],
    types: placeholder as Registry['profesor.remover_materia']['types'],
  },
  'carrera.show_planes_estudio': {
    methods: ["GET","HEAD"],
    pattern: '/carreras/:id/plan_de_estudio',
    tokens: [{"old":"/carreras/:id/plan_de_estudio","type":0,"val":"carreras","end":""},{"old":"/carreras/:id/plan_de_estudio","type":1,"val":"id","end":""},{"old":"/carreras/:id/plan_de_estudio","type":0,"val":"plan_de_estudio","end":""}],
    types: placeholder as Registry['carrera.show_planes_estudio']['types'],
  },
  'carrera.show_carrera_coordinadores': {
    methods: ["GET","HEAD"],
    pattern: '/carreras/coordinadores',
    tokens: [{"old":"/carreras/coordinadores","type":0,"val":"carreras","end":""},{"old":"/carreras/coordinadores","type":0,"val":"coordinadores","end":""}],
    types: placeholder as Registry['carrera.show_carrera_coordinadores']['types'],
  },
  'carrera.show_form_coordinador': {
    methods: ["GET","HEAD"],
    pattern: '/carreras/coordinadores/agregar',
    tokens: [{"old":"/carreras/coordinadores/agregar","type":0,"val":"carreras","end":""},{"old":"/carreras/coordinadores/agregar","type":0,"val":"coordinadores","end":""},{"old":"/carreras/coordinadores/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['carrera.show_form_coordinador']['types'],
  },
  'carrera.add_coordinador': {
    methods: ["POST"],
    pattern: '/carreras/coordinadores/agregar',
    tokens: [{"old":"/carreras/coordinadores/agregar","type":0,"val":"carreras","end":""},{"old":"/carreras/coordinadores/agregar","type":0,"val":"coordinadores","end":""},{"old":"/carreras/coordinadores/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['carrera.add_coordinador']['types'],
  },
  'carrera.show_edit_coordinador': {
    methods: ["GET","HEAD"],
    pattern: '/carreras/coordinadores/editar/:relacionId',
    tokens: [{"old":"/carreras/coordinadores/editar/:relacionId","type":0,"val":"carreras","end":""},{"old":"/carreras/coordinadores/editar/:relacionId","type":0,"val":"coordinadores","end":""},{"old":"/carreras/coordinadores/editar/:relacionId","type":0,"val":"editar","end":""},{"old":"/carreras/coordinadores/editar/:relacionId","type":1,"val":"relacionId","end":""}],
    types: placeholder as Registry['carrera.show_edit_coordinador']['types'],
  },
  'carrera.update_coordinador': {
    methods: ["PUT"],
    pattern: '/carreras/coordinadores/editar/:relacionId',
    tokens: [{"old":"/carreras/coordinadores/editar/:relacionId","type":0,"val":"carreras","end":""},{"old":"/carreras/coordinadores/editar/:relacionId","type":0,"val":"coordinadores","end":""},{"old":"/carreras/coordinadores/editar/:relacionId","type":0,"val":"editar","end":""},{"old":"/carreras/coordinadores/editar/:relacionId","type":1,"val":"relacionId","end":""}],
    types: placeholder as Registry['carrera.update_coordinador']['types'],
  },
  'carrera.delete_carrera_coordinador': {
    methods: ["DELETE"],
    pattern: '/carreras/coordinadores/eliminar/:relacionId',
    tokens: [{"old":"/carreras/coordinadores/eliminar/:relacionId","type":0,"val":"carreras","end":""},{"old":"/carreras/coordinadores/eliminar/:relacionId","type":0,"val":"coordinadores","end":""},{"old":"/carreras/coordinadores/eliminar/:relacionId","type":0,"val":"eliminar","end":""},{"old":"/carreras/coordinadores/eliminar/:relacionId","type":1,"val":"relacionId","end":""}],
    types: placeholder as Registry['carrera.delete_carrera_coordinador']['types'],
  },
  'grupo.show_alumnos': {
    methods: ["GET","HEAD"],
    pattern: '/grupos/alumnos/:id',
    tokens: [{"old":"/grupos/alumnos/:id","type":0,"val":"grupos","end":""},{"old":"/grupos/alumnos/:id","type":0,"val":"alumnos","end":""},{"old":"/grupos/alumnos/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['grupo.show_alumnos']['types'],
  },
  'grupo.asignar_alumno': {
    methods: ["POST"],
    pattern: '/grupos/:grupoId/alumnos',
    tokens: [{"old":"/grupos/:grupoId/alumnos","type":0,"val":"grupos","end":""},{"old":"/grupos/:grupoId/alumnos","type":1,"val":"grupoId","end":""},{"old":"/grupos/:grupoId/alumnos","type":0,"val":"alumnos","end":""}],
    types: placeholder as Registry['grupo.asignar_alumno']['types'],
  },
  'grupo.remover_alumno': {
    methods: ["DELETE"],
    pattern: '/grupos/:grupoId/alumnos/:alumnoId',
    tokens: [{"old":"/grupos/:grupoId/alumnos/:alumnoId","type":0,"val":"grupos","end":""},{"old":"/grupos/:grupoId/alumnos/:alumnoId","type":1,"val":"grupoId","end":""},{"old":"/grupos/:grupoId/alumnos/:alumnoId","type":0,"val":"alumnos","end":""},{"old":"/grupos/:grupoId/alumnos/:alumnoId","type":1,"val":"alumnoId","end":""}],
    types: placeholder as Registry['grupo.remover_alumno']['types'],
  },
  'grupo.index': {
    methods: ["GET","HEAD"],
    pattern: '/carreras/grupos',
    tokens: [{"old":"/carreras/grupos","type":0,"val":"carreras","end":""},{"old":"/carreras/grupos","type":0,"val":"grupos","end":""}],
    types: placeholder as Registry['grupo.index']['types'],
  },
  'grupo.show_form_grupo': {
    methods: ["GET","HEAD"],
    pattern: '/grupos/agregar',
    tokens: [{"old":"/grupos/agregar","type":0,"val":"grupos","end":""},{"old":"/grupos/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['grupo.show_form_grupo']['types'],
  },
  'grupo.add_grupo': {
    methods: ["POST"],
    pattern: '/grupos/agregar',
    tokens: [{"old":"/grupos/agregar","type":0,"val":"grupos","end":""},{"old":"/grupos/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['grupo.add_grupo']['types'],
  },
  'alumno.index': {
    methods: ["GET","HEAD"],
    pattern: '/alumnos',
    tokens: [{"old":"/alumnos","type":0,"val":"alumnos","end":""}],
    types: placeholder as Registry['alumno.index']['types'],
  },
  'alumno.show_form_alumno': {
    methods: ["GET","HEAD"],
    pattern: '/alumnos/agregar',
    tokens: [{"old":"/alumnos/agregar","type":0,"val":"alumnos","end":""},{"old":"/alumnos/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['alumno.show_form_alumno']['types'],
  },
  'alumno.add_alumno': {
    methods: ["POST"],
    pattern: '/alumnos/agregar',
    tokens: [{"old":"/alumnos/agregar","type":0,"val":"alumnos","end":""},{"old":"/alumnos/agregar","type":0,"val":"agregar","end":""}],
    types: placeholder as Registry['alumno.add_alumno']['types'],
  },
  'alumno.show_edit_form': {
    methods: ["GET","HEAD"],
    pattern: '/alumnos/editar/:id',
    tokens: [{"old":"/alumnos/editar/:id","type":0,"val":"alumnos","end":""},{"old":"/alumnos/editar/:id","type":0,"val":"editar","end":""},{"old":"/alumnos/editar/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['alumno.show_edit_form']['types'],
  },
  'alumno.update_alumno': {
    methods: ["PUT"],
    pattern: '/alumnos/editar/:id',
    tokens: [{"old":"/alumnos/editar/:id","type":0,"val":"alumnos","end":""},{"old":"/alumnos/editar/:id","type":0,"val":"editar","end":""},{"old":"/alumnos/editar/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['alumno.update_alumno']['types'],
  },
  'alumno.delete_alumno': {
    methods: ["DELETE"],
    pattern: '/alumnos/eliminar/:id',
    tokens: [{"old":"/alumnos/eliminar/:id","type":0,"val":"alumnos","end":""},{"old":"/alumnos/eliminar/:id","type":0,"val":"eliminar","end":""},{"old":"/alumnos/eliminar/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['alumno.delete_alumno']['types'],
  },
  'alumno.historial_global': {
    methods: ["GET","HEAD"],
    pattern: '/alumnos/historial',
    tokens: [{"old":"/alumnos/historial","type":0,"val":"alumnos","end":""},{"old":"/alumnos/historial","type":0,"val":"historial","end":""}],
    types: placeholder as Registry['alumno.historial_global']['types'],
  },
  'alumno.historial_detalle': {
    methods: ["GET","HEAD"],
    pattern: '/alumnos/historial/:id',
    tokens: [{"old":"/alumnos/historial/:id","type":0,"val":"alumnos","end":""},{"old":"/alumnos/historial/:id","type":0,"val":"historial","end":""},{"old":"/alumnos/historial/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['alumno.historial_detalle']['types'],
  },
  'new_account.create': {
    methods: ["GET","HEAD"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.create']['types'],
  },
  'new_account.store': {
    methods: ["POST"],
    pattern: '/signup',
    tokens: [{"old":"/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['new_account.store']['types'],
  },
  'session.create': {
    methods: ["GET","HEAD"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.create']['types'],
  },
  'session.store': {
    methods: ["POST"],
    pattern: '/login',
    tokens: [{"old":"/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['session.store']['types'],
  },
  'session.destroy': {
    methods: ["POST"],
    pattern: '/logout',
    tokens: [{"old":"/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['session.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
