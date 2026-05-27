import { Head, Link, router } from '@inertiajs/react'
import { ChevronLeft, Users, GraduationCap, Trash2 } from 'lucide-react'
import styles from './Alumnos.module.scss'
import SubNav, { type SubNavItem } from '~/Components/subnav/SubNav'

interface Alumno {
  id: number
  matricula: string
  nombreCompleto: string
  grupo: string
}

interface PageProps {
  alumnos: Alumno[]
  alumnosDisponibles: Alumno[]
  grupoId: string | number
  grupoNombre?: string     
}
const TABS: SubNavItem[] = [
  { label: 'Panel Principal', href: '/carreras' },
  { label: 'Planes de estudio', href: '/carreras/plan_de_estudio' },
  { label: 'Coordinadores', href: '/carreras/coordinadores' },
  { label: 'Grupos', href: '/carreras/grupos' },
]

export default function Alumnos({ alumnos, alumnosDisponibles, grupoId, grupoNombre }: PageProps) {

  function handleEliminar(alumnoId: number) {
    if (confirm('¿Seguro que quiere remover a este alumno del grupo? Se eliminará de todas las materias asignadas de este grupo.')) {
      router.delete(`/grupos/${grupoId}/alumnos/${alumnoId}`, { preserveScroll: true })
    }
  }

  function handleAsignar(e: React.FormEvent) {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const alumno_id = formData.get('alumno_id')
    if (!alumno_id) return
    
    router.post(`/grupos/${grupoId}/alumnos`, { alumno_id }, {
      preserveScroll: true,
      onSuccess: () => form.reset()
    })
  }

  const nombreGrupo = grupoNombre ||
    (alumnos.length > 0 ? alumnos[0].grupo : `Grupo ${grupoId}`)

  return (
    <>
    <SubNav items={TABS} />
      <div className={styles.container}>
        <Head title={`Alumnos - ${nombreGrupo}`} />

        <header className={styles.header}>
          <div className={styles.headerTop}>
            <Link href="/carreras/grupos" className={styles.backBtn}>
              <ChevronLeft size={18} />
              Volver a grupos
            </Link>
          </div>
          
          <div className={styles.titleSection}>
            <div className={styles.iconContainer}>
              <Users size={36} className={styles.titleIcon} />
            </div>
            <div className={styles.titleText}>
              <h1 className={styles.title}>Alumnos Inscritos</h1>
              <p className={styles.subtitle}>
                Grupo <strong>{nombreGrupo}</strong> • <span className={styles.badge}>{alumnos.length} registrados</span>
              </p>
            </div>
          </div>
        </header>

        <main className={styles.content}>
          {alumnos.length === 0 ? (
            <p className={styles.empty}>No hay alumnos inscritos en este grupo.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Matrícula</th>
                  <th>Nombre Completo</th>
                  <th style={{ width: '80px', textAlign: 'center' }}>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.matricula}>
                    <td className={styles.matricula}>{alumno.matricula}</td>
                    <td>{alumno.nombreCompleto}</td>
                    <td style={{ textAlign: 'center' }}>
                      <button 
                        onClick={() => handleEliminar(alumno.id)}
                        className={styles.btnEliminar}
                        title="Remover del grupo"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <div className={styles.asignarSection}>
            <h3 className={styles.asignarTitle}>Asignar nuevo alumno</h3>
            {alumnosDisponibles.length === 0 ? (
              <p className={styles.emptyAsignar}>No hay alumnos disponibles en el mismo cuatrimestre para asignar a este grupo.</p>
            ) : (
              <form onSubmit={handleAsignar} className={styles.asignarForm}>
                <select name="alumno_id" defaultValue="" className={styles.selectAlumno} required>
                  <option value="" disabled>Seleccione un alumno disponible...</option>
                  {alumnosDisponibles.map(a => (
                    <option key={a.id} value={a.id}>
                      {a.matricula} - {a.nombreCompleto}
                    </option>
                  ))}
                </select>
                <button type="submit" className={styles.btnAsignar}>Asignar Alumno</button>
              </form>
            )}
          </div>
        </main>
      </div></>

  )
}