import { Head, Link } from '@inertiajs/react'
import styles from './Alumnos.module.scss'
import SubNav, { type SubNavItem } from '~/Components/subnav/SubNav'

interface Alumno {
  matricula: string
  nombreCompleto: string
  grupo: string
}

interface PageProps {
  alumnos: Alumno[]
  grupoId: string | number
  grupoNombre?: string     
}
const TABS: SubNavItem[] = [
  { label: 'Panel Principal', href: '/carreras' },
  { label: 'Planes de estudio', href: '/carreras/plan_de_estudio' },
  { label: 'Coordinadores', href: '/carreras/coordinadores' },
  { label: 'Grupos', href: '/carreras/grupos' },
]

export default function Alumnos({ alumnos, grupoId, grupoNombre }: PageProps) {

  const nombreGrupo = grupoNombre ||
    (alumnos.length > 0 ? alumnos[0].grupo : `Grupo ${grupoId}`)

  return (
    <>
    <SubNav items={TABS} />
      <div className={styles.container}>
        <Head title={`Alumnos - ${nombreGrupo}`} />

        <header className={styles.header}>
          <Link href="/carreras/grupos" className={styles.backLink}>
            ← Volver a grupos
          </Link>
          <h1 className={styles.title}>Lista de Alumnos: {nombreGrupo}</h1>
          <p className={styles.count}>{alumnos.length} alumnos inscritos</p>
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
                </tr>
              </thead>
              <tbody>
                {alumnos.map((alumno) => (
                  <tr key={alumno.matricula}>
                    <td className={styles.matricula}>{alumno.matricula}</td>
                    <td>{alumno.nombreCompleto}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </main>
      </div></>

  )
}