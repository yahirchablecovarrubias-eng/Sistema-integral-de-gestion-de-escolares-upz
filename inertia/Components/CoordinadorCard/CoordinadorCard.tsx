// ─── CoordinadorCard.tsx ──────────────────────────────────────
import styles from './CoordinadorCard.module.scss'

// ── Tipo público — coincide exactamente con el controlador ────
export interface CoordinadorData {
    coordinadorId: number
    nombreCompleto: string
    telefono:      string | null
    correo:        string | null
    especialidad:  string | null
    carreraId:     number
    carreraNombre: string
    fechaInicio:   string | null   // Luxon DateTime serializado como ISO, o null
    fechaFin:      string | null
    estaActivo:    boolean
}

interface Props {
    coordinador: CoordinadorData
}

// ── Helpers ───────────────────────────────────────────────────

function obtenerIniciales(nombreCompleto: string): string {
    const partes = nombreCompleto.trim().split(/\s+/)
    if (partes.length === 1) return partes[0].slice(0, 2).toUpperCase()
    return (partes[0][0] + partes[1][0]).toUpperCase()
}

function formatearFecha(fecha: string | null): string {
    if (!fecha) return '—'
    const meses = ['Ene','Feb','Mar','Abr','May','Jun',
                   'Jul','Ago','Sep','Oct','Nov','Dic']
    const d = new Date(fecha)
    if (isNaN(d.getTime())) return '—'
    return `${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`
}

function formatearPeriodo(fechaInicio: string | null, fechaFin: string | null): string {
    const inicio = fechaInicio ? formatearFecha(fechaInicio) : 'Sin fecha'
    const fin    = fechaFin    ? formatearFecha(fechaFin)    : 'Presente'
    return `${inicio} — ${fin}`
}

// ── Componente ────────────────────────────────────────────────

export default function CoordinadorCard({ coordinador }: Props) {
    const {
        nombreCompleto,
        carreraNombre,
        telefono,
        correo,
        especialidad,
        fechaInicio,
        fechaFin,
        estaActivo,
    } = coordinador

    const iniciales = obtenerIniciales(nombreCompleto)
    const periodo   = formatearPeriodo(fechaInicio, fechaFin)

    return (
        <article className={styles.card}>

            {/* ── Cabecera ── */}
            <div className={styles.cardHeader}>

                <span className={`${styles.badgeStatus} ${estaActivo ? styles.badgeActivo : styles.badgeInactivo}`}>
                    <span className={styles.badgeDot} />
                    {estaActivo ? 'Activo' : 'Inactivo'}
                </span>

                <div className={styles.avatar}>
                    <span className={styles.avatarIniciales}>{iniciales}</span>
                </div>

                <h3 className={styles.nombreCompleto}>{nombreCompleto}</h3>

                {especialidad && (
                    <span className={styles.carreraTag}>{especialidad}</span>
                )}

            </div>

            {/* ── Datos de contacto ── */}
            <div className={styles.cardBody}>

                {correo && (
                    <div className={styles.contactItem}>
                        <span className={styles.contactIcon} aria-hidden="true">✉</span>
                        <div className={styles.contactText}>
                            <span className={styles.contactLabel}>Correo</span>
                            <a
                                href={`mailto:${correo}`}
                                className={`${styles.contactValue} ${styles.contactValueLink}`}
                                title={correo}
                            >
                                {correo}
                            </a>
                        </div>
                    </div>
                )}

                {telefono && (
                    <div className={styles.contactItem}>
                        <span className={styles.contactIcon} aria-hidden="true">☎</span>
                        <div className={styles.contactText}>
                            <span className={styles.contactLabel}>Teléfono</span>
                            <a
                                href={`tel:${telefono}`}
                                className={`${styles.contactValue} ${styles.contactValueLink}`}
                            >
                                {telefono}
                            </a>
                        </div>
                    </div>
                )}

                {!correo && !telefono && (
                    <p className={styles.contactSinDatos}>
                        Sin datos de contacto registrados.
                    </p>
                )}

            </div>

            {/* ── Período ── */}
            <footer className={styles.cardFooter}>
                <span className={styles.periodoIcon} aria-hidden="true">📅</span>
                <div className={styles.periodoInfo}>
                    <span className={styles.periodoLabel}>Período</span>
                    <span className={styles.periodoRango}>{periodo}</span>
                </div>
            </footer>

        </article>
    )
}