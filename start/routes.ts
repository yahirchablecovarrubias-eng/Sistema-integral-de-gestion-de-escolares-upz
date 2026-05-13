import { middleware } from '#start/kernel'
import { controllers } from '#generated/controllers'
import router from '@adonisjs/core/services/router'

router.on('/').renderInertia('home', {}).as('home')

router.get('/carreras', [controllers.Carrera, 'index'])

router.get('/profesores', [controllers.Profesor, 'index'])
router.get('/profesores/agregar', [controllers.Profesor, 'showFormProfesor'])
router.post('/profesores/agregar', [controllers.Profesor, 'addProfesor'])
router.get('/profesores/editar/:id', [controllers.Profesor, 'showEditForm'])
router.put('/profesores/editar/:id', [controllers.Profesor, 'updateProfesor'])
router.delete('/profesores/eliminar/:id', [controllers.Profesor, 'deleteProfesor'])

router.get('/carreras/:id/plan_de_estudio', [controllers.Carrera, 'showPlanesEstudio'])
router.get('/carreras/coordinadores', [controllers.Carrera, 'showCarreraCoordinadores'])


router.get('/grupos/alumnos/:id', [controllers.Grupo, 'showAlumnos'])
router.get('/carreras/grupos', [controllers.Grupo, 'index'])

router.get('/alumnos', [controllers.Alumno, 'index'])



router
    .group(() => {
        router.get('signup', [controllers.NewAccount, 'create'])
        router.post('signup', [controllers.NewAccount, 'store'])
        router.get('login', [controllers.Session, 'create'])
        router.post('login', [controllers.Session, 'store'])
    })
    .use(middleware.guest())

router
    .group(() => {
        router.post('logout', [controllers.Session, 'destroy'])
    })
    .use(middleware.auth())