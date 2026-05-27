import { Head, Link } from '@inertiajs/react'
import { ChevronLeft, BookMarked, GraduationCap, CheckCircle2, XCircle, Clock } from 'lucide-react'
import SubNav, { SubNavItem } from '~/Components/subnav/SubNav'
import styles from './historialDetalle.module.scss'

const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/alumnos' },
    { label: 'Historial Académico', href: '/alumnos/historial' },
]

interface Calificacion {
    id: number
    calificacion: number | null
    tipo_oportunidad: string | null
    estatus: string
    materia_nombre: string
    cuatrimestre: number | null
}

interface PageProps {
    alumno: {
        id: number
        matricula: string
        nombreCompleto: string
        promedioGlobal: string
    }
    calificaciones: Calificacion[]
}

export default function HistorialDetalle({ alumno, calificaciones }: PageProps) {

    const getStatusIcon = (estatus: string) => {
        switch (estatus) {
            case 'APROBADA': return <CheckCircle2 size={16} />
            case 'REPROBADA': return <XCircle size={16} />
            case 'PENDIENTE': return <Clock size={16} />
            default: return <Clock size={16} />
        }
    }

    const getStatusClass = (estatus: string) => {
        switch (estatus) {
            case 'APROBADA': return styles.badgeAprobada
            case 'REPROBADA': return styles.badgeReprobada
            case 'PENDIENTE': return styles.badgePendiente
            default: return styles.badgePendiente
        }
    }

    return (
        <div className={styles.pageContainer}>
            <Head title={`Historial - ${alumno.nombreCompleto}`} />
            <SubNav items={TABS} />

            <div className={styles.content}>
                <div className={styles.topBar}>
                    <Link href="/alumnos/historial" className={styles.btnBack}>
                        <ChevronLeft size={20} />
                        Volver al Historial
                    </Link>
                </div>

                <div className={styles.headerCard}>
                    <div className={styles.headerInfo}>
                        <div className={styles.iconContainer}>
                            <GraduationCap size={32} />
                        </div>
                        <div>
                            <span className={styles.tag}>Historial Académico</span>
                            <h1 className={styles.alumnoNombre}>{alumno.nombreCompleto}</h1>
                            <p className={styles.alumnoMatricula}>Matrícula: {alumno.matricula}</p>
                        </div>
                    </div>
                    <div className={styles.promedioBanner}>
                        <span className={styles.promedioLabel}>Promedio Global</span>
                        <span className={styles.promedioValue}>{alumno.promedioGlobal}</span>
                    </div>
                </div>

                <div className={styles.materiasContainer}>
                    <h2 className={styles.sectionTitle}>Desglose por Materia</h2>
                    
                    {calificaciones.length === 0 ? (
                        <div className={styles.empty}>
                            El alumno no tiene calificaciones registradas.
                        </div>
                    ) : (
                        <div className={styles.materiasGrid}>
                            {calificaciones.map((cal, idx) => (
                                <div key={idx} className={styles.materiaCard}>
                                    <div className={styles.materiaTop}>
                                        <div className={styles.materiaTitle}>
                                            <BookMarked size={18} className={styles.materiaIcon} />
                                            <span className={styles.materiaName}>{cal.materia_nombre}</span>
                                        </div>
                                        <div className={`${styles.statusBadge} ${getStatusClass(cal.estatus)}`}>
                                            {getStatusIcon(cal.estatus)}
                                            {cal.estatus}
                                        </div>
                                    </div>
                                    <div className={styles.materiaBody}>
                                        <div className={styles.infoRow}>
                                            <span className={styles.infoLabel}>Cuatrimestre</span>
                                            <span className={styles.infoValue}>
                                                {cal.cuatrimestre ? `${cal.cuatrimestre}°` : 'N/A'}
                                            </span>
                                        </div>
                                        <div className={styles.infoRow}>
                                            <span className={styles.infoLabel}>Oportunidad</span>
                                            <span className={styles.infoValue}>
                                                {cal.tipo_oportunidad || 'N/A'}
                                            </span>
                                        </div>
                                    </div>
                                    <div className={styles.materiaFooter}>
                                        <span className={styles.calificacionLabel}>Calificación Final</span>
                                        <span className={`${styles.calificacionValue} ${cal.estatus === 'REPROBADA' ? styles.valueRed : ''}`}>
                                            {cal.calificacion !== null ? cal.calificacion : '--'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
