import { Head, Link, router } from '@inertiajs/react'
import { useState } from 'react'
import { Search, GraduationCap } from 'lucide-react'
import SubNav, { SubNavItem } from '~/Components/subnav/SubNav'
import styles from './historial.module.scss'

const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/alumnos' },

    { label: 'Historial Académico', href: '/alumnos/historial' },
]

interface AlumnoHistorial {
    id: number
    matricula: string
    nombreCompleto: string
    email: string
    curp: string
    promedioGlobal: string
}

interface PageProps {
    alumnos: AlumnoHistorial[]
    filters: { search: string }
}

export default function Historial({ alumnos, filters }: PageProps) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '')

    const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            router.get('/alumnos/historial', { search: searchTerm }, { preserveState: true })
        }
    }

    return (
        <div className={styles.pageContainer}>
            <Head title="Historial Académico Global" />
            <SubNav items={TABS} />

            <div className={styles.headerArea}>
                <div className={styles.searchWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar alumno por nombre o matrícula y presiona Enter..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={handleSearch}
                    />
                </div>
            </div>

            <div className={styles.scrollArea}>
                <div className={styles.grid}>
                    {alumnos.length > 0 ? (
                        alumnos.map(alumno => (
                            <div key={alumno.id} className={styles.card}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.iconWrapper}>
                                        <GraduationCap size={24} />
                                    </div>
                                    <div className={styles.info}>
                                        <h3 className={styles.nombre}>{alumno.nombreCompleto}</h3>
                                        <p className={styles.matricula}>{alumno.matricula}</p>
                                    </div>
                                </div>
                                <div className={styles.cardBody}>
                                    <div className={styles.promedioBox}>
                                        <span className={styles.promedioLabel}>Promedio Global</span>
                                        <span className={styles.promedioValue}>{alumno.promedioGlobal}</span>
                                    </div>
                                </div>
                                <div className={styles.cardFooter}>
                                    <Link
                                        href={`/alumnos/historial/${alumno.id}`}
                                        className={styles.btnDetalles}
                                    >
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.empty}>
                            No se encontraron alumnos en el historial.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
