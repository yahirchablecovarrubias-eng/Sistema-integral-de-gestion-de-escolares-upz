import { Link } from '@inertiajs/react'
import styles from './CarreraCard.module.scss'

interface CarreraCardProps {
    id: number
    nombre: string
    descripcion?: string | null
    imagen?: string | null
}

export default function CarreraCard({ id, nombre, descripcion, imagen }: CarreraCardProps) {
    return (
        <article className={styles.card}>

            {/* ── Zona de imagen ── */}
            <div className={styles.cardImg}>
                {imagen ? (
                    <img
                        src={imagen}
                        alt={`Imagen de ${nombre}`}
                        className={styles.cardImgEl}
                    />
                ) : (
                    <div className={styles.cardImgPlaceholder}>
                        <div className={styles.geoOuter}>
                            <div className={styles.geoInner} />
                        </div>
                    </div>
                )}
            </div>

            {/* ── Cuerpo ── */}
            <div className={styles.cardBody}>
                <span className={styles.cardTag}>Licenciatura</span>
                <h3 className={styles.cardNombre}>{nombre}</h3>
                {descripcion && (
                    <p className={styles.cardDesc}>{descripcion}</p>
                )}
            </div>

            {/* ── Footer — Plan de estudios ── */}
            <div className={styles.cardFooter}>
                <Link
                    href={`/carreras/${id}/plan_de_estudio`}
                    className={styles.planLink}
                >
                    consultar plan de estudios
                    <span className={styles.planArrow}>→</span>
                </Link>
            </div>

        </article>
    )
}