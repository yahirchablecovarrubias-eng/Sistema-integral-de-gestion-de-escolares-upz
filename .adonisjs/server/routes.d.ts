import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'home': { paramsTuple?: []; params?: {} }
    'carrera.index': { paramsTuple?: []; params?: {} }
    'profesor.index': { paramsTuple?: []; params?: {} }
    'profesor.show_form_profesor': { paramsTuple?: []; params?: {} }
    'profesor.add_profesor': { paramsTuple?: []; params?: {} }
    'profesor.show_edit_form': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profesor.update_profesor': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'profesor.delete_profesor': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'carrera.show_planes_estudio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'carrera.show_carrera_coordinadores': { paramsTuple?: []; params?: {} }
    'grupo.show_alumnos': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grupo.index': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  GET: {
    'home': { paramsTuple?: []; params?: {} }
    'carrera.index': { paramsTuple?: []; params?: {} }
    'profesor.index': { paramsTuple?: []; params?: {} }
    'profesor.show_form_profesor': { paramsTuple?: []; params?: {} }
    'profesor.show_edit_form': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'carrera.show_planes_estudio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'carrera.show_carrera_coordinadores': { paramsTuple?: []; params?: {} }
    'grupo.show_alumnos': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grupo.index': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  HEAD: {
    'home': { paramsTuple?: []; params?: {} }
    'carrera.index': { paramsTuple?: []; params?: {} }
    'profesor.index': { paramsTuple?: []; params?: {} }
    'profesor.show_form_profesor': { paramsTuple?: []; params?: {} }
    'profesor.show_edit_form': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'carrera.show_planes_estudio': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'carrera.show_carrera_coordinadores': { paramsTuple?: []; params?: {} }
    'grupo.show_alumnos': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'grupo.index': { paramsTuple?: []; params?: {} }
    'new_account.create': { paramsTuple?: []; params?: {} }
    'session.create': { paramsTuple?: []; params?: {} }
  }
  POST: {
    'profesor.add_profesor': { paramsTuple?: []; params?: {} }
    'new_account.store': { paramsTuple?: []; params?: {} }
    'session.store': { paramsTuple?: []; params?: {} }
    'session.destroy': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'profesor.update_profesor': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'profesor.delete_profesor': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}