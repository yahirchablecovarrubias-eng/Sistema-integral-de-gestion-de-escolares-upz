/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  home: typeof routes['home']
  carrera: {
    index: typeof routes['carrera.index']
    showPlanesEstudio: typeof routes['carrera.show_planes_estudio']
    showCarreraCoordinadores: typeof routes['carrera.show_carrera_coordinadores']
    showFormCoordinador: typeof routes['carrera.show_form_coordinador']
    addCoordinador: typeof routes['carrera.add_coordinador']
    showEditCoordinador: typeof routes['carrera.show_edit_coordinador']
    updateCoordinador: typeof routes['carrera.update_coordinador']
    deleteCarreraCoordinador: typeof routes['carrera.delete_carrera_coordinador']
  }
  profesor: {
    index: typeof routes['profesor.index']
    showFormProfesor: typeof routes['profesor.show_form_profesor']
    addProfesor: typeof routes['profesor.add_profesor']
    showEditForm: typeof routes['profesor.show_edit_form']
    updateProfesor: typeof routes['profesor.update_profesor']
    deleteProfesor: typeof routes['profesor.delete_profesor']
    asignaturas: typeof routes['profesor.asignaturas']
    asignaturasDetalle: typeof routes['profesor.asignaturas_detalle']
    asignarMateria: typeof routes['profesor.asignar_materia']
    removerMateria: typeof routes['profesor.remover_materia']
  }
  grupo: {
    showAlumnos: typeof routes['grupo.show_alumnos']
    asignarAlumno: typeof routes['grupo.asignar_alumno']
    removerAlumno: typeof routes['grupo.remover_alumno']
    index: typeof routes['grupo.index']
    showFormGrupo: typeof routes['grupo.show_form_grupo']
    addGrupo: typeof routes['grupo.add_grupo']
  }
  alumno: {
    index: typeof routes['alumno.index']
    showFormAlumno: typeof routes['alumno.show_form_alumno']
    addAlumno: typeof routes['alumno.add_alumno']
    showEditForm: typeof routes['alumno.show_edit_form']
    updateAlumno: typeof routes['alumno.update_alumno']
    deleteAlumno: typeof routes['alumno.delete_alumno']
    historialGlobal: typeof routes['alumno.historial_global']
    historialDetalle: typeof routes['alumno.historial_detalle']
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
