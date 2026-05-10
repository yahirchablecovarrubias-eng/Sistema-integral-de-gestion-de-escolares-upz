import { Link } from '@inertiajs/react'
import styles from './index.module.scss'
import SubNav, { type SubNavItem } from '~/Components/subnav/SubNav'

const TABS: SubNavItem[] = [
  { label: 'Panel Principal', href: '/carreras' },
  { label: 'Planes de estudio', href: '/carreras/plan_de_estudio' },
  { label: 'Coordinadores', href: '/carreras/coordinadores' },
  { label: 'Grupos', href: '/carreras/grupos' },
]

// ------------------------------------------------------------
// Tipado — coincide exactamente con el .select() del controlador
// ------------------------------------------------------------
interface GrupoItem {
  grupo: string
  periodo: string
  carrera: string
}

interface PageProps {
  grupos: GrupoItem[]
}

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
function getInitials(nombre: string): string {
  return nombre
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? '')
    .join('')
}

// Asigna un color de acento por cuatrimestre/letra para distinguir cards
const BADGE_COLORS = [
  '#2563a8',
  '#1a3a5c',
  '#e8a020',
  '#1e4a78',
  '#3b82b0',
  '#cf8c12',
]
function badgeColor(str: string): string {
  let hash = 0
  for (const ch of str) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffff
  return BADGE_COLORS[hash % BADGE_COLORS.length]
}

// ------------------------------------------------------------
// Componente de card individual
// ------------------------------------------------------------
function GrupoCard({ item }: { item: GrupoItem }) {
  const initials = getInitials(item.grupo)
  const color = badgeColor(item.grupo + item.carrera)

  return (

    <div className={styles.card}>
      {/* Avatar con iniciales */}
      <div
        className={styles.cardAvatar}
        style={{ background: color }}
      >
        {initials}
      </div>

      {/* Cuerpo */}
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

      {/* Acción */}
      <div className={styles.cardFooter}>
        <Link href={`/grupos/${encodeURIComponent(item.grupo)}`} className={styles.cardLink}>
          Ver detalle →
        </Link>
      </div>
    </div>
  )
}

// ------------------------------------------------------------
// Página principal
// ------------------------------------------------------------
export default function GruposIndex({ grupos }: PageProps) {
  return (
    <>
      <SubNav items={TABS} />

      <div className={styles.page}>

        {/* Encabezado */}
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.heading}>Grupos</h1>
            <p className={styles.subheading}>
              {grupos.length === 0
                ? 'No hay grupos registrados aún.'
                : `${grupos.length} grupo${grupos.length !== 1 ? 's' : ''} registrado${grupos.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          {/* Botón de alta — esquina superior derecha del header */}
          <Link href="/grupos/crear" className={styles.btnPrimary}>
            + Nuevo grupo
          </Link>
        </header>

        {/* Grid de cards */}
        {grupos.length > 0 ? (
          <section className={styles.grid}>
            {grupos.map((g, i) => (
              <GrupoCard key={`${g.grupo}-${g.periodo}-${i}`} item={g} />
            ))}
          </section>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📋</span>
            <p>Agrega el primer grupo usando el botón de arriba.</p>
          </div>
        )}
      </div></>


  )
}