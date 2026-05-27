// ─── carrera_coordinador.tsx ──────────────────────────────────
import { Link } from '@inertiajs/react'
import { Plus } from 'lucide-react'
import SubNav, { type SubNavItem } from '~/Components/subnav/SubNav'
import CoordinadorCard, { type CoordinadorData } from '~/Components/CoordinadorCard/CoordinadorCard'
import styles from './Carrera_coordinador.module.scss'

// ── Tabs de navegación secundaria ─────────────────────────────

const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/carreras' },
    { label: 'Coordinadores', href: '/carreras/coordinadores' },
    { label: 'Grupos', href: '/carreras/grupos' },
]
// ── Props — coinciden exactamente con lo que envía el controlador
interface PageProps {
    coordinadores: CoordinadorData[]
}

// ── Helper: agrupa el array plano por carrera ─────────────────
interface GrupoCarrera {
    carreraId: number
    carreraNombre: string
    activos: CoordinadorData[]
    anteriores: CoordinadorData[]
}

function agruparPorCarrera(coordinadores: CoordinadorData[]): GrupoCarrera[] {
    const mapa = new Map<number, GrupoCarrera>()

    for (const c of coordinadores) {
        if (!mapa.has(c.carreraId)) {
            mapa.set(c.carreraId, {
                carreraId: c.carreraId,
                carreraNombre: c.carreraNombre,
                activos: [],
                anteriores: [],
            })
        }
        const grupo = mapa.get(c.carreraId)!
        if (c.estaActivo) {
            grupo.activos.push(c)
        } else {
            grupo.anteriores.push(c)
        }
    }

    // Ordenar: primero las carreras que tienen coordinador activo
    return [...mapa.values()].sort((a, b) => b.activos.length - a.activos.length)
}

// ── Componente ────────────────────────────────────────────────

export default function CarreraCoordinador({ coordinadores }: PageProps) {
    const grupos = agruparPorCarrera(coordinadores)

    return (
        <>
            <SubNav items={TABS} />

            <div className={styles.page}>

                <div className={styles.actionsBar}>
                    <Link href="/carreras/coordinadores/agregar" className={styles.btnAgregar}>
                        <Plus size={18} />
                        Nuevo Coordinador
                    </Link>
                </div>

                {/* ── Empty state ── */}
                {coordinadores.length === 0 && (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon} aria-hidden="true">🎓</div>
                        <p className={styles.emptyText}>
                            No hay coordinadores registrados.
                        </p>
                    </div>
                )}

                {/* ── Un bloque por carrera ── */}
                {grupos.map((grupo) => (
                    <section key={grupo.carreraId} className={styles.carreraSection}>

                        {/* Título de carrera */}
                        <header className={styles.carreraHeader}>
                            <h2 className={styles.carreraNombre}>{grupo.carreraNombre}</h2>
                            <span className={styles.carreraResumen}>
                                {grupo.activos.length > 0
                                    ? `${grupo.activos.length} activo${grupo.activos.length > 1 ? 's' : ''}`
                                    : 'Sin coordinador activo'}
                                {grupo.anteriores.length > 0 &&
                                    ` · ${grupo.anteriores.length} anterior${grupo.anteriores.length > 1 ? 'es' : ''}`}
                            </span>
                        </header>

                        {/* Coordinadores activos */}
                        {grupo.activos.length > 0 && (
                            <div className={styles.subSection}>
                                <div className={styles.sectionLabel}>
                                    <span className={styles.sectionDot} aria-hidden="true" />
                                    Coordinación actual
                                </div>
                                <div className={styles.grid}>
                                    {grupo.activos.map((c) => (
                                        <CoordinadorCard key={c.coordinadorId} coordinador={c} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Coordinadores anteriores */}
                        {grupo.anteriores.length > 0 && (
                            <div className={styles.subSection}>
                                <div className={styles.sectionLabel}>
                                    Coordinaciones anteriores
                                </div>
                                <div className={styles.grid}>
                                    {grupo.anteriores.map((c) => (
                                        <CoordinadorCard
                                            key={`${c.coordinadorId}-${c.fechaInicio ?? c.carreraId}`}
                                            coordinador={c}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                    </section>
                ))}

            </div>
        </>
    )
}