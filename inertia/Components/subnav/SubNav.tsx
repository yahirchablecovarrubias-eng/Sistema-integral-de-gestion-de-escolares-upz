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
const TABS: SubNavItem[] = [
  {label: 'Panel Principal', href:'/carreras'},
  { label: 'Planes de estudio', href: '/carreras/plan_de_estudio' },
  { label: 'Historial de coordinadores', href: '/profesores/informacion' },
  { label: 'Grupos', href: '/profesores/seguimiento' }
]

// ─── Componente ───────────────────────────────────────────────────────────────

// || url.startsWith(item.href + '/') AGREGAR A LA CONDICION DE SER NECESARIO


export default function SubNav({ items }: SubNavProps ) {
  const { url } = usePage()

  return (
    <div className={styles.subNavWrapper}>
      <nav className={styles.subNav} aria-label="Navegación secundaria">   
        {items.map((item) => {
          const isActive = url === item.href 

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