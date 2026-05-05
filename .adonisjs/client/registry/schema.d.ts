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
