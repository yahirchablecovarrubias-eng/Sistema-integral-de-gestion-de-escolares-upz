import { Link } from '@inertiajs/react'
import styles from './GrupoCard.module.scss'

export interface GrupoItem {
    id: number
    grupo: string
    periodo: string
    carrera: string
}

// Helpers internos
function getInitials(nombre: string): string {
    return nombre
        .split(/\s+/)
        .slice(0, 2)
        .map((w) => w[0]?.toUpperCase() ?? '')
        .join('')
}

const BADGE_COLORS = ['#2563a8', '#1a3a5c', '#e8a020', '#1e4a78', '#3b82b0', '#cf8c12']

function badgeColor(str: string): string {
    let hash = 0
    for (const ch of str) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff
    return BADGE_COLORS[hash % BADGE_COLORS.length]
}

export default function GrupoCard({ item }: { item: GrupoItem }) {
    const initials = getInitials(item.grupo)
    const color = badgeColor(item.grupo + item.carrera)

    return (
        <div className={styles.card}>
            <div className={styles.cardAvatar} style={{ background: color }}>
                {initials}
            </div>

            <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{item.grupo}</h3>
                <dl className={styles.cardMeta}>
                    <div className={styles.metaRow}>
                        <span className={styles.metaIcon} aria-hidden="true">🎓</span>
                        <dt className={styles.srOnly}>Carrera</dt>
                        <dd className={styles.metaValue}>{item.carrera}</dd>
                    </div>
                    <div className={styles.metaRow}>
                        <span className={styles.metaIcon} aria-hidden="true">📅</span>
                        <dt className={styles.srOnly}>Periodo</dt>
                        <dd className={styles.metaBadge}>{item.periodo}</dd>
                    </div>
                </dl>
            </div>

            <div className={styles.cardFooter}>
                {/* Ruta actualizada para usar el ID del grupo */}
                <Link href={`/grupos/alumnos/${item.id}`} className={styles.cardLink}>
                    Ver detalle →
                </Link>
            </div>
        </div>
    )
}