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
  'grupo.index': {
    methods: ["GET","HEAD"],
    pattern: '/carreras/grupos',
    tokens: [{"old":"/carreras/grupos","type":0,"val":"carreras","end":""},{"old":"/carreras/grupos","type":0,"val":"grupos","end":""}],
    types: placeholder as Registry['grupo.index']['types'],
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
