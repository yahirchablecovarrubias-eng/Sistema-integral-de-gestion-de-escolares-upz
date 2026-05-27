import { Head, Link } from '@inertiajs/react'
import SubNav, { SubNavItem } from '~/Components/subnav/SubNav'
import styles from './asignaturas.module.scss'

const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/profesores' },

    { label: 'Asignaturas', href: '/profesores/asignaturas' },
]

type Asignatura = {
    id: number
    materia: string
    grupo: string
    carrera: string
}

type ProfesorData = {
    id: number
    nombreCompleto: string
    especialidad: string | null
    asignaturas: Asignatura[]
}

type PageProps = {
    profesores: ProfesorData[]
}

export default function Asignaturas({ profesores }: PageProps) {
    return (
        <>
            <Head title="Asignaturas por Profesor" />

            <SubNav items={TABS} />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Asignaturas Impartidas</h1>
                </div>

                <div className={styles.grid}>
                    {profesores.map(profesor => (
                        <div key={profesor.id} className={styles.card}>
                            <div className={styles.profesorInfo}>
                                <h2>{profesor.nombreCompleto}</h2>
                                {profesor.especialidad && (
                                    <span className={styles.especialidad}>{profesor.especialidad}</span>
                                )}
                            </div>

                            <div className={styles.asignaturasList}>
                                {profesor.asignaturas.length > 0 ? (
                                    profesor.asignaturas.slice(0, 3).map(asig => (
                                        <div key={asig.id} className={styles.asignaturaItem}>
                                            <p className={styles.materiaNombre}>{asig.materia}</p>
                                            <div className={styles.detalles}>
                                                <span className={`${styles.tag} ${styles.grupo}`}>{asig.grupo}</span>
                                                <span className={`${styles.tag} ${styles.carrera}`}>{asig.carrera}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className={styles.emptyState}>
                                        <p>Sin carga académica actual</p>
                                    </div>
                                )}

                                {profesor.asignaturas.length > 3 && (
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280', textAlign: 'center' }}>
                                        + {profesor.asignaturas.length - 3} materias más
                                    </p>
                                )}
                            </div>

                            <div className={styles.acciones}>
                                <Link
                                    href={`/profesores/asignaturas/${profesor.id}`}
                                    className={styles.btnDetalle}
                                >
                                    Ver Detalle Completo
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
