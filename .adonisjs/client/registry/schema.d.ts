/* eslint-disable prettier/prettier */
/// <reference path="../manifest.d.ts" />

import type { ExtractBody, ExtractErrorResponse, ExtractQuery, ExtractQueryForGet, ExtractResponse } from '@tuyau/core/types'
import type { InferInput, SimpleError } from '@vinejs/vine/types'

export type ParamValue = string | number | bigint | boolean

export interface Registry {
  'home': {
    methods: ["GET","HEAD"]
    pattern: '/'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: unknown
      errorResponse: unknown
    }
  }
  'carrera.index': {
    methods: ["GET","HEAD"]
    pattern: '/carreras'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/carrera_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/carrera_controller').default['index']>>>
    }
  }
  'profesor.index': {
    methods: ["GET","HEAD"]
    pattern: '/profesores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['index']>>>
    }
  }
  'profesor.show_form_profesor': {
    methods: ["GET","HEAD"]
    pattern: '/profesores/agregar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['showFormProfesor']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['showFormProfesor']>>>
    }
  }
  'profesor.add_profesor': {
    methods: ["POST"]
    pattern: '/profesores/agregar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/profesor_validator').createProfesorValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/profesor_validator').createProfesorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['addProfesor']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['addProfesor']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profesor.show_edit_form': {
    methods: ["GET","HEAD"]
    pattern: '/profesores/editar/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['showEditForm']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['showEditForm']>>>
    }
  }
  'profesor.update_profesor': {
    methods: ["PUT"]
    pattern: '/profesores/editar/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/profesor_validator').createProfesorValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/profesor_validator').createProfesorValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['updateProfesor']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['updateProfesor']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'profesor.delete_profesor': {
    methods: ["DELETE"]
    pattern: '/profesores/eliminar/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['deleteProfesor']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/profesor_controller').default['deleteProfesor']>>>
    }
  }
  'carrera.show_planes_estudio': {
    methods: ["GET","HEAD"]
    pattern: '/carreras/:id/plan_de_estudio'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/carrera_controller').default['showPlanesEstudio']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/carrera_controller').default['showPlanesEstudio']>>>
    }
  }
  'carrera.show_carrera_coordinadores': {
    methods: ["GET","HEAD"]
    pattern: '/carreras/coordinadores'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/carrera_controller').default['showCarreraCoordinadores']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/carrera_controller').default['showCarreraCoordinadores']>>>
    }
  }
  'grupo.show_alumnos': {
    methods: ["GET","HEAD"]
    pattern: '/grupos/alumnos/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/grupo_controller').default['showAlumnos']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/grupo_controller').default['showAlumnos']>>>
    }
  }
  'grupo.index': {
    methods: ["GET","HEAD"]
    pattern: '/carreras/grupos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/grupo_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/grupo_controller').default['index']>>>
    }
  }
  'alumno.index': {
    methods: ["GET","HEAD"]
    pattern: '/alumnos'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['index']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['index']>>>
    }
  }
  'alumno.show_form_alumno': {
    methods: ["GET","HEAD"]
    pattern: '/alumnos/agregar'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['showFormAlumno']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['showFormAlumno']>>>
    }
  }
  'alumno.add_alumno': {
    methods: ["POST"]
    pattern: '/alumnos/agregar'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/alumno_validator').createAlumnoValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/alumno_validator').createAlumnoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['addAlumno']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['addAlumno']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'alumno.show_edit_form': {
    methods: ["GET","HEAD"]
    pattern: '/alumnos/editar/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['showEditForm']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['showEditForm']>>>
    }
  }
  'alumno.update_alumno': {
    methods: ["PUT"]
    pattern: '/alumnos/editar/:id'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/alumno_validator').createAlumnoValidator)>>
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: ExtractQuery<InferInput<(typeof import('#validators/alumno_validator').createAlumnoValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['updateAlumno']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['updateAlumno']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'alumno.delete_alumno': {
    methods: ["DELETE"]
    pattern: '/alumnos/eliminar/:id'
    types: {
      body: {}
      paramsTuple: [ParamValue]
      params: { id: ParamValue }
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['deleteAlumno']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/alumno_controller').default['deleteAlumno']>>>
    }
  }
  'new_account.create': {
    methods: ["GET","HEAD"]
    pattern: '/signup'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['create']>>>
    }
  }
  'new_account.store': {
    methods: ["POST"]
    pattern: '/signup'
    types: {
      body: ExtractBody<InferInput<(typeof import('#validators/user').signupValidator)>>
      paramsTuple: []
      params: {}
      query: ExtractQuery<InferInput<(typeof import('#validators/user').signupValidator)>>
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/new_account_controller').default['store']>>> | { status: 422; response: { errors: SimpleError[] } }
    }
  }
  'session.create': {
    methods: ["GET","HEAD"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['create']>>>
    }
  }
  'session.store': {
    methods: ["POST"]
    pattern: '/login'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['store']>>>
    }
  }
  'session.destroy': {
    methods: ["POST"]
    pattern: '/logout'
    types: {
      body: {}
      paramsTuple: []
      params: {}
      query: {}
      response: ExtractResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
      errorResponse: ExtractErrorResponse<Awaited<ReturnType<import('#controllers/session_controller').default['destroy']>>>
    }
  }
}
