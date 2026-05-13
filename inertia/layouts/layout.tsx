import { Data } from '@generated/data'
import { toast, Toaster } from 'sonner'
import { usePage } from '@inertiajs/react'
import { ReactElement, useEffect, useState } from 'react'
import { Link } from '@adonisjs/inertia/react'

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface SidebarGroup {
  title?: string          // encabezado de sección (opcional)
  items: SidebarItem[]
}

export interface SidebarItem {
  label: string
  href: string
  icon?: ReactElement
  badge?: string | number
  children?: SidebarItem[]
}

// ─── Datos del sidebar  (llenar según necesidad) ──────────────────────────────

const SIDEBAR_GROUPS: SidebarGroup[] = [
  {
    items: [
      { label: 'Carreras', href: "/carreras" },
      { label: "Profesores", href: "/profesores" },
      { label: "Alumnos", href: "/alumnos" }
    ]
  }
  // {
  //   items: [
  //     { label: 'Alumno',                              href: '/administrador/alumnos' },
  //     { label: 'Profesor',                            href: '/administrador/profesores' },
  //     { label: 'Clase',                               href: '/administrador/clases' },
  //     { label: 'Carga',                               href: '/administrador/carga' },
  //     { label: 'Horario',                             href: '/administrador/horarios' },
  //   ],
  // },
  // {
  //   title: 'Reportes',
  //   items: [
  //     { label: 'Horarios de Grupo',                   href: '/administrador/horarios-grupo' },
  //     { label: 'Alumnos por Grupo',                   href: '/administrador/alumnos-grupo' },
  //     { label: 'Alumnos sin grupo',                   href: '/administrador/alumnos-sin-grupo' },
  //     { label: 'Horarios del Profesor',               href: '/administrador/horarios-profesor' },
  //     { label: 'Materias impartidas por el Profesor', href: '/administrador/materias-profesor' },
  //     { label: 'Grupos sin Alumno',                   href: '/administrador/grupos-sin-alumno' },
  //     { label: 'Alumnos Regulares',                   href: '/administrador/alumnos-regulares' },
  //     { label: 'Alumnos Irregulares',                 href: '/administrador/alumnos-irregulares' },
  //     { label: 'Profesores sin Asignaturas',          href: '/administrador/profesores-sin-asignaturas' },
  //   ],
  // },
]

// ─── Componentes auxiliares ───────────────────────────────────────────────────

function SidebarItemRow({
  item,
  depth = 0,
  currentUrl,
}: {
  item: SidebarItem
  depth?: number
  currentUrl: string
}) {
  const [open, setOpen] = useState(false)
  const isActive = currentUrl.startsWith(item.href)
  const hasChildren = item.children && item.children.length > 0

  return (
    <>
      <li className={`sidebar-item ${isActive ? 'active' : ''}`}>
        {hasChildren ? (
          <button
            className="sidebar-link sidebar-toggle"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            style={{ paddingLeft: `${1 + depth * 0.875}rem` }}
          >
            {item.icon && <span className="sidebar-icon">{item.icon}</span>}
            <span className="sidebar-label">{item.label}</span>
            {item.badge !== undefined && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
            <span className={`sidebar-chevron ${open ? 'rotated' : ''}`}>▾</span>
          </button>
        ) : (
          <Link
            href={item.href}
            className="sidebar-link"
            style={{ paddingLeft: `${1 + depth * 0.875}rem` }}
          >
            {item.icon && <span className="sidebar-icon">{item.icon}</span>}
            <span className="sidebar-label">{item.label}</span>
            {item.badge !== undefined && (
              <span className="sidebar-badge">{item.badge}</span>
            )}
          </Link>
        )}
      </li>

      {hasChildren && open &&
        item.children!.map((child) => (
          <SidebarItemRow
            key={child.href}
            item={child}
            depth={depth + 1}
            currentUrl={currentUrl}
          />
        ))
      }
    </>
  )
}

// ─── Layout principal ─────────────────────────────────────────────────────────

export default function Layout({ children }: { children: ReactElement<Data.SharedProps> }) {
  const { url } = usePage()
  const [sidebarOpen, setSidebarOpen] = useState(true)

  useEffect(() => {
    toast.dismiss()
  }, [url])

  useEffect(() => {
    if (children.props.flash?.error) toast.error(children.props.flash.error)
    if (children.props.flash?.success) toast.success(children.props.flash.success)
  })

  return (
    <div className="app-shell">

      {/* ── Navbar ─────────────────────────────────────────────────── */}
      <header className="navbar">

        {/* Izquierda: toggle + logo + título */}
        <div className="navbar-left">
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Alternar sidebar"
          >
            <span className="hamburger" />
          </button>

          <Link href="/" className="navbar-brand">
            {/* Reemplazar src con la ruta real del logo */}
            <img src="/logo_upz.png" alt="Logo UPZ" className="navbar-logo" />
            <span className="navbar-title">Sistema Universitario</span>
          </Link>
        </div>

        {/* Derecha: usuario + avatar + cerrar sesión */}
        <div className="navbar-right">
          <span className="navbar-username">Usuario</span>

          {/* Contenedor del avatar — colocar <img> cuando esté disponible */}
          <div className="navbar-avatar" aria-label="Avatar de usuario">
            {/* <img src="/avatar.png" alt="Avatar" /> */}
          </div>

          <Link href="/logout" method="post" as="button" className="btn-logout">
            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth="2.2"
              strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Cerrar Sesión
          </Link>
        </div>
      </header>

      <div className="body-wrapper">

        {/* ── Sidebar ────────────────────────────────────────────────── */}
        <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : 'sidebar--closed'}`}>
          <nav aria-label="Menú lateral">
            {SIDEBAR_GROUPS.length === 0 ? (
              <p className="sidebar-empty">Sin elementos aún</p>
            ) : (
              SIDEBAR_GROUPS.map((group, gi) => (
                <div key={gi} className="sidebar-group">
                  {group.title && (
                    <span className="sidebar-group-title">{group.title}</span>
                  )}
                  <ul className="sidebar-list">
                    {group.items.map((item) => (
                      <SidebarItemRow
                        key={item.href}
                        item={item}
                        currentUrl={url}
                      />
                    ))}
                  </ul>
                </div>
              ))
            )}
          </nav>
        </aside>

        {/* ── Contenido principal ─────────────────────────────────────── */}
        <main className={`main-content ${sidebarOpen ? 'main-content--shifted' : ''}`}>
          {children}
        </main>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  )
}