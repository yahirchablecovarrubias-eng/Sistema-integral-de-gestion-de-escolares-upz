import { Data } from "@generated/data";
import { useState } from "react";
import { Link } from "@inertiajs/react";
import { Search, Plus } from "lucide-react";
import styles from './profesores.module.scss'
import ProfesorCard from "../../Components/profesorCard";
import SubNav from "~/Components/subnav/SubNav";
import { SubNavItem } from "~/Components/subnav/SubNav";
type PageProps = {
    profesores: Data.Profesor[]
}


const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/profesores' },
    { label: 'Asignaturas', href: '/profesores/asignaturas' },
]

export default function profesorIndex({ profesores }: PageProps) {
    const [searchTerm, setSearchTerm] = useState('')

    const filteredProfesores = profesores.filter(p => {
        const fullStr = `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno} ${p.especialidad}`.toLowerCase()
        return fullStr.includes(searchTerm.toLowerCase())
    })

    return (
        <div className={styles.pageContainer}>
            <SubNav items={TABS} />

            <div className={styles.headerArea}>
                <div className={styles.searchWrapper}>
                    <Search size={18} className={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Buscar profesor por nombre o especialidad..."
                        className={styles.searchInput}
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>

                <Link href="/profesores/agregar" className={styles.btnAdd}>
                    <Plus size={18} />
                    <span>Agregar Profesor</span>
                </Link>
            </div>

            <div className={styles.scrollArea}>
                <div className={styles.profesoresList}>
                    {filteredProfesores.length > 0 ? (
                        filteredProfesores.map((e) => (
                            <ProfesorCard
                                key={e.id}
                                profesor={e}
                            />
                        ))
                    ) : (
                        <div className={styles.emptyState}>
                            No se encontraron profesores que coincidan con la búsqueda.
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}