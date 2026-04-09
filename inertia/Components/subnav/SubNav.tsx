import styles from './SubNav.module.scss'
import { Link } from '@adonisjs/inertia/react'
import { usePage } from '@inertiajs/react'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface SubNavItem {
  label: string
  href: string
}

export interface SubNavProps {
  items: SubNavItem[]
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function SubNav({ items }: SubNavProps) {
  const { url } = usePage()

  return (
    <div className={styles.subNavWrapper}>
      <nav className={styles.subNav} aria-label="Navegación secundaria">
        {items.map((item) => {
          const isActive = url === item.href || url.startsWith(item.href + '/')
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.subNavItem} ${isActive ? styles.subNavItemActive : ''}`}
            >
              {item.label}
            </Link>
          )
        })}
      </nav>
    </div>
  )
}