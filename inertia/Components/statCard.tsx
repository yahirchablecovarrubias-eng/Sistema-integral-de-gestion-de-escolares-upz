import styles from './WildCard.module.scss'
import { Data } from '@generated/data'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface WildCardProps {
  profesor: Data.Profesor
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function StatCard({ profesor }: WildCardProps) {
  return (
    <div className={styles.cardStat}>

      {/* Foto del profesor */}
      <div className={styles.imgProfeContainer}>
        <img
          src="/logo_upz.png"
          alt={`Foto de ${profesor.nombre}`}
          className={styles.imgProfe}
        />
      </div>

      {/* Información principal */}
      <div className={styles.infoProfesor}>
        <p className={styles.profesorName}>
          {profesor.nombre} {profesor.apellidoPaterno}  
        </p>
        <div className={styles.profesorContact}>
          <span className={styles.contactItem}>{profesor.email}</span>
          <span className={styles.contactItem}>{profesor.telefono}</span>
        </div>
      </div>

      {/* Botones de acción — agregar <IconBtn> aquí cuando esté listo */}
      <div className={styles.actionButtons}>
        {/* <IconBtn profesor={profesor} tipo={2} /> */}
        {/* <IconBtn profesor={profesor} tipo={1} /> */}
      </div>

    </div>
  )
}