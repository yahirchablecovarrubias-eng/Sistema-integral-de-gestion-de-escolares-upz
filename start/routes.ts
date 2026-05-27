import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'


// ── Rutas protegidas — requieren autenticación ──────────────────────────────
router
    .group(() => {
        router.on('/').renderInertia('home', {}).as('home')

        router.get('/carreras', [controllers.Carrera, 'index'])

        router.get('/profesores', [controllers.Profesor, 'index'])
        router.get('/profesores/agregar', [controllers.Profesor, 'showFormProfesor'])
        router.post('/profesores/agregar', [controllers.Profesor, 'addProfesor'])
        router.get('/profesores/editar/:id', [controllers.Profesor, 'showEditForm'])
        router.put('/profesores/editar/:id', [controllers.Profesor, 'updateProfesor'])
        router.delete('/profesores/eliminar/:id', [controllers.Profesor, 'deleteProfesor'])
        router.get('/profesores/asignaturas', [controllers.Profesor, 'asignaturas'])
        router.get('/profesores/asignaturas/:id', [controllers.Profesor, 'asignaturasDetalle'])
        router.post('/profesores/asignaturas/:id', [controllers.Profesor, 'asignarMateria'])
        router.delete('/profesores/asignaturas/:profesorId/:grupoMateriaId', [controllers.Profesor, 'removerMateria'])

        router.get('/carreras/:id/plan_de_estudio', [controllers.Carrera, 'showPlanesEstudio'])
        router.get('/carreras/coordinadores', [controllers.Carrera, 'showCarreraCoordinadores'])
        router.get('/carreras/coordinadores/agregar', [controllers.Carrera, 'showFormCoordinador'])
        router.post('/carreras/coordinadores/agregar', [controllers.Carrera, 'addCoordinador'])
        router.get('/carreras/coordinadores/editar/:relacionId', [controllers.Carrera, 'showEditCoordinador'])
        router.put('/carreras/coordinadores/editar/:relacionId', [controllers.Carrera, 'updateCoordinador'])
        router.delete('/carreras/coordinadores/eliminar/:relacionId', [controllers.Carrera, 'deleteCarreraCoordinador'])

        router.get('/grupos/alumnos/:id', [controllers.Grupo, 'showAlumnos'])
        router.post('/grupos/:grupoId/alumnos', [controllers.Grupo, 'asignarAlumno'])
        router.delete('/grupos/:grupoId/alumnos/:alumnoId', [controllers.Grupo, 'removerAlumno'])
        router.get('/carreras/grupos', [controllers.Grupo, 'index'])
        router.get('/grupos/agregar', [controllers.Grupo, 'showFormGrupo'])
        router.post('/grupos/agregar', [controllers.Grupo, 'addGrupo'])

        router.get('/alumnos', [controllers.Alumno, 'index'])
        router.get('/alumnos/agregar', [controllers.Alumno, 'showFormAlumno'])
        router.post('/alumnos/agregar', [controllers.Alumno, 'addAlumno'])
        router.get('/alumnos/editar/:id', [controllers.Alumno, 'showEditForm'])
        router.put('/alumnos/editar/:id', [controllers.Alumno, 'updateAlumno'])
        router.delete('/alumnos/eliminar/:id', [controllers.Alumno, 'deleteAlumno'])
        router.get('/alumnos/historial', [controllers.Alumno, 'historialGlobal'])
        router.get('/alumnos/historial/:id', [controllers.Alumno, 'historialDetalle'])
    })
    .use(middleware.auth())

// ── Rutas públicas — solo para invitados (no autenticados) ──────────────────
router
    .group(() => {
        router.get('signup', [controllers.NewAccount, 'create'])
        router.post('signup', [controllers.NewAccount, 'store'])
        router.get('login', [controllers.Session, 'create'])
        router.post('login', [controllers.Session, 'store'])
    })
    .use(middleware.guest())

// ── Rutas de sesión — requieren autenticación ───────────────────────────────
router
    .group(() => {
        router.post('logout', [controllers.Session, 'destroy'])
    })
    .use(middleware.auth())