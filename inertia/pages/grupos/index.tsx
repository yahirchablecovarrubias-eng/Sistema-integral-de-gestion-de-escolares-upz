import { Link } from '@inertiajs/react'
import styles from './index.module.scss'
import SubNav, { type SubNavItem } from '~/Components/subnav/SubNav'
import GrupoCard, { type GrupoItem } from '~/Components/GrupoCard/GrupoCard'

const TABS: SubNavItem[] = [
  { label: 'Panel Principal', href: '/carreras' },
  { label: 'Planes de estudio', href: '/carreras/plan_de_estudio' },
  { label: 'Coordinadores', href: '/carreras/coordinadores' },
  { label: 'Grupos', href: '/carreras/grupos' },
]

interface PageProps {
  grupos: GrupoItem[]
}

export default function GruposIndex({ grupos }: PageProps) {
  return (
    <>
      <SubNav items={TABS} />

      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.headerText}>
            <h1 className={styles.heading}>Grupos</h1>
            <p className={styles.subheading}>
              {grupos.length === 0
                ? 'No hay grupos registrados aún.'
                : `${grupos.length} grupo${grupos.length !== 1 ? 's' : ''} registrado${grupos.length !== 1 ? 's' : ''}`}
            </p>
          </div>

          <Link href="/grupos/crear" className={styles.btnPrimary}>
            + Nuevo grupo
          </Link>
        </header>

        {grupos.length > 0 ? (
          <section className={styles.grid}>
            {grupos.map((g) => (
              <GrupoCard key={g.id} item={g} /> // Uso del ID como key única
            ))}
          </section>
        ) : (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}>📋</span>
            <p>Agrega el primer grupo usando el botón de arriba.</p>
          </div>
        )}
      </div>
    </>
  )
}