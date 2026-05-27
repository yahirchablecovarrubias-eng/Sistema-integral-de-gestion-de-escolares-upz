import { useEffect, useRef, useState, useCallback } from 'react'
import { router } from '@inertiajs/react'
import styles from './alumnos.module.scss'
import AlumnoCard from '~/Components/alumnoCard/AlumnoCard'
import SubNav from '~/Components/subnav/SubNav'
import { SubNavItem } from '~/Components/subnav/SubNav'
import AddButton from '~/IconButtons/AddButton'
import { Data } from '@generated/data'
import { Search, Filter } from 'lucide-react'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface PaginationMeta {
    currentPage: number;
    lastPage: number;
}

interface PageProps {
    alumnosData: {
        meta: PaginationMeta;
        data: Data.Alumno[];
    };
    filters?: {
        search?: string;
        cuatrimestre?: string;
    };
}

// ─── Navegación ───────────────────────────────────────────────────────────────

const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/alumnos' },

    { label: 'Historial Académico', href: '/alumnos/historial' },
]

// ─── Página ───────────────────────────────────────────────────────────────────

export default function AlumnosIndex({ alumnosData, filters }: PageProps) {
    const [alumnos, setAlumnos] = useState<Data.Alumno[]>(alumnosData.data)
    const { meta } = alumnosData
    const observerTarget = useRef<HTMLDivElement>(null)
    const [isLoading, setIsLoading] = useState(false)

    // Estado local para los filtros
    const [searchTerm, setSearchTerm] = useState(filters?.search || '')
    const [cuatrimestre, setCuatrimestre] = useState(filters?.cuatrimestre || '')

    // Sincronizar el estado cuando llega nueva página o si cambia la búsqueda
    useEffect(() => {
        if (meta.currentPage === 1) {
            setAlumnos(alumnosData.data)
        } else {
            setAlumnos(prev => {
                const newItems = alumnosData.data.filter(a => !prev.some(p => p.id === a.id))
                return [...prev, ...newItems]
            })
        }
        setIsLoading(false)
    }, [alumnosData])

    // Función para aplicar filtros (se dispara en Enter o al cambiar select)
    const applyFilters = () => {
        router.get(
            '/alumnos',
            { search: searchTerm, cuatrimestre: cuatrimestre, page: 1 },
            { preserveState: true, preserveScroll: true }
        )
    }

    // Observer para Infinite Scroll
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && meta.currentPage < meta.lastPage && !isLoading) {
                    setIsLoading(true)
                    router.get(
                        '/alumnos',
                        { page: meta.currentPage + 1, search: searchTerm, cuatrimestre: cuatrimestre },
                        { preserveState: true, preserveScroll: true, only: ['alumnosData'] }
                    )
                }
            },
            { threshold: 0.1 }
        )

        if (observerTarget.current) {
            observer.observe(observerTarget.current)
        }

        return () => {
            if (observerTarget.current) observer.unobserve(observerTarget.current)
        }
    }, [meta.currentPage, meta.lastPage, isLoading, searchTerm, cuatrimestre])

    return (
        <>
            <SubNav items={TABS} />

            {/* Barra de Filtros */}
            <div className={styles.filtersBar}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1, position: 'relative' }}>
                    <Search size={18} color="var(--color-text-muted)" style={{ position: 'absolute', left: '10px' }} />
                    <input
                        type="text"
                        placeholder="Buscar por nombre o matrícula..."
                        className={styles.searchInput}
                        style={{ paddingLeft: '35px' }}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && applyFilters()}
                    />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Filter size={18} color="var(--color-text-muted)" />
                    <select
                        value={cuatrimestre}
                        onChange={e => {
                            setCuatrimestre(e.target.value)
                            // Aplicar inmediatamente al cambiar select
                            router.get('/alumnos', { search: searchTerm, cuatrimestre: e.target.value, page: 1 }, { preserveState: true })
                        }}
                    >
                        <option value="">Todos los cuatrimestres</option>
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                            <option key={num} value={num}>{num}° Cuatrimestre</option>
                        ))}
                    </select>
                </div>
            </div>

            <div className={styles.alumnosList}>
                {alumnos.map((alumno) => (
                    <AlumnoCard
                        key={alumno.id}
                        alumno={alumno}
                    />
                ))}

                {alumnos.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-text-muted)' }}>
                        No se encontraron alumnos con los filtros actuales.
                    </div>
                )}
            </div>

            {meta.currentPage < meta.lastPage && (
                <div ref={observerTarget} className={styles.loadingIndicator}>
                    Cargando más alumnos...
                </div>
            )}

            <div>
                <AddButton
                    direccion="/alumnos/agregar"
                    className="fab-button"
                />
            </div>
        </>
    )
}