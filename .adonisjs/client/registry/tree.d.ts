/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  carrera: {
    index: typeof routes['carrera.index']
    showPlanesEstudio: typeof routes['carrera.show_planes_estudio']
    showCarreraCoordinadores: typeof routes['carrera.show_carrera_coordinadores']
  }
  profesor: {
    index: typeof routes['profesor.index']
    showFormProfesor: typeof routes['profesor.show_form_profesor']
    addProfesor: typeof routes['profesor.add_profesor']
    showEditForm: typeof routes['profesor.show_edit_form']
    updateProfesor: typeof routes['profesor.update_profesor']
    deleteProfesor: typeof routes['profesor.delete_profesor']
  }
  grupo: {
    showAlumnos: typeof routes['grupo.show_alumnos']
    index: typeof routes['grupo.index']
  }
  alumno: {
    index: typeof routes['alumno.index']
    showFormAlumno: typeof routes['alumno.show_form_alumno']
    addAlumno: typeof routes['alumno.add_alumno']
    showEditForm: typeof routes['alumno.show_edit_form']
    updateAlumno: typeof routes['alumno.update_alumno']
    deleteAlumno: typeof routes['alumno.delete_alumno']
  }
  newAccount: {
    create: typeof routes['new_account.create']
    store: typeof routes['new_account.store']
  }
  session: {
    create: typeof routes['session.create']
    store: typeof routes['session.store']
    destroy: typeof routes['session.destroy']
  }
}
