import { Head, Link, router } from '@inertiajs/react'
import { Trash2 } from 'lucide-react'
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
    profesor: ProfesorData
    materiasDisponibles: Asignatura[]
}

export default function AsignaturasDetalle({ profesor, materiasDisponibles }: PageProps) {
    function handleDelete(grupoMateriaId: number) {
        if (confirm('¿Seguro que quiere quitar esta clase a este profesor?')) {
            router.delete(`/profesores/asignaturas/${profesor.id}/${grupoMateriaId}`, {
                preserveScroll: true
            })
        }
    }

    function handleAsignar(e: React.FormEvent) {
        e.preventDefault()
        const form = e.target as HTMLFormElement
        const formData = new FormData(form)
        const grupoMateriaId = formData.get('grupoMateriaId')
        if (!grupoMateriaId) return

        router.post(`/profesores/asignaturas/${profesor.id}`, { grupoMateriaId }, {
            preserveScroll: true,
            onSuccess: () => form.reset()
        })
    }

    return (
        <>
            <Head title={`Asignaturas - ${profesor.nombreCompleto}`} />

            <SubNav items={TABS} />

            <div className={styles.container}>
                <div className={styles.header}>
                    <h1>Detalle de Asignaturas</h1>
                    <Link href="/profesores/asignaturas" className={styles.backButton}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="19" y1="12" x2="5" y2="12"></line>
                            <polyline points="12 19 5 12 12 5"></polyline>
                        </svg>
                        Volver a Asignaturas
                    </Link>
                </div>

                <div className={`${styles.card} ${styles.detailCard}`}>
                    <div className={styles.profesorInfo}>
                        <h2>{profesor.nombreCompleto}</h2>
                        {profesor.especialidad && (
                            <span className={styles.especialidad}>{profesor.especialidad}</span>
                        )}
                        <p style={{ marginTop: '0.75rem', color: '#4b5563' }}>
                            Total de materias asignadas: <strong>{profesor.asignaturas.length}</strong>
                        </p>
                    </div>

                    <div className={styles.asignaturasList}>
                        {profesor.asignaturas.length > 0 ? (
                            profesor.asignaturas.map(asig => (
                                <div key={asig.id} className={styles.asignaturaItem}>
                                    <p className={styles.materiaNombre}>{asig.materia}</p>
                                    <div className={styles.detalles}>
                                        <span className={`${styles.tag} ${styles.grupo}`}>
                                            Grupo: {asig.grupo}
                                        </span>
                                        <span className={`${styles.tag} ${styles.carrera}`}>
                                            Carrera: {asig.carrera}
                                        </span>
                                    </div>
                                    <button
                                        className={styles.btnEliminarClase}
                                        onClick={() => handleDelete(asig.id)}
                                        title="Remover asignatura"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))
                        ) : (
                            <div className={styles.emptyState}>
                                <p>Este profesor actualmente no tiene carga académica asignada.</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.asignarFormContainer} style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.07)', paddingTop: '1.5rem' }}>
                        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--color-primary)' }}>Asignar nueva clase</h3>
                        <form onSubmit={handleAsignar} className={styles.asignarForm}>
                            <select name="grupoMateriaId" defaultValue="" className={styles.selectLibre} required>
                                <option value="" disabled>Seleccione una materia libre...</option>
                                {materiasDisponibles.map(m => (
                                    <option key={m.id} value={m.id}>
                                        {m.materia} ({m.grupo}) - {m.carrera}
                                    </option>
                                ))}
                            </select>
                            <button type="submit" className={styles.btnAsignar}>Asignar</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
