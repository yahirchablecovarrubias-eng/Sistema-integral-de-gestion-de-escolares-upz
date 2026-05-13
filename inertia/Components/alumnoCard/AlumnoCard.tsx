import styles from './AlumnoCard.module.scss'
import { Data } from '@generated/data'
import IconBtn from '~/IconButtons/IconBtn'
import { Mail, Phone, Hash, BookOpen } from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface AlumnoCardProps {
    alumno: Data.Alumno & {
        cuatrimestreActual?: number;
        estadoAcademico?: string;
    }
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AlumnoCard({ alumno }: AlumnoCardProps) {
    const estadoClass = alumno.estadoAcademico 
        ? styles[`badge--${alumno.estadoAcademico.toLowerCase()}`] || styles['badge--default']
        : styles['badge--default'];

    return (
        <div className={styles.cardStat}>

            {/* Foto / Avatar del alumno */}
            <div className={styles.imgAlumnoContainer}>
                <img
                    src="/logo_upz.png"
                    alt={`Foto de ${alumno.nombre}`}
                    className={styles.imgAlumno}
                />
            </div>

            {/* Información principal */}
            <div className={styles.infoAlumno}>
                <p className={styles.alumnoName}>
                    {alumno.nombre} {alumno.apellidoPaterno}
                    {alumno.apellidoMaterno ? ` ${alumno.apellidoMaterno}` : ''}
                </p>
                <div className={styles.alumnoContact}>
                    <span className={styles.contactItem} title="Matrícula">
                        <Hash size={14} /> {alumno.matricula}
                    </span>
                    {alumno.email && (
                        <span className={styles.contactItem} title="Correo">
                            <Mail size={14} /> {alumno.email}
                        </span>
                    )}
                    {alumno.telefono && (
                        <span className={styles.contactItem} title="Teléfono">
                            <Phone size={14} /> {alumno.telefono}
                        </span>
                    )}
                </div>
            </div>

            {/* Badges de Cuatrimestre y Estado */}
            <div className={styles.badgesContainer}>
                {alumno.estadoAcademico && (
                    <span className={`${styles.badge} ${estadoClass}`}>
                        {alumno.estadoAcademico}
                    </span>
                )}
                {alumno.cuatrimestreActual !== undefined && alumno.cuatrimestreActual !== null && (
                    <span className={styles.badgeCuatrimestre} title="Cuatrimestre Actual">
                        <BookOpen size={14} /> {alumno.cuatrimestreActual}° Cuatri
                    </span>
                )}
            </div>

            {/* Botones de acción */}
            <div className={styles.actionButtons}>
                <IconBtn
                    id={alumno.id}
                    rutaBase="alumnos"
                    tipo={1}
                />
                <IconBtn
                    id={alumno.id}
                    rutaBase="alumnos"
                    tipo={2}
                />
            </div>

        </div>
    )
}