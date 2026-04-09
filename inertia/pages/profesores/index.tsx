import { Data } from "@generated/data";
import styles from './profesores.module.scss'
import StatCard from "../../Components/statCard";
import SubNav from "~/Components/subnav/SubNav";
import { SubNavItem } from "~/Components/subnav/SubNav";
type PageProps = {
    profesores: Data.Profesor[]
}


const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/profesores' },
    { label: 'Información Personal', href: '/profesores/informacion' },
    { label: 'Seguimiento', href: '/profesores/seguimiento' },
    { label: 'Desempeño', href: '/profesores/desempeno' },
    { label: 'Asignaturas', href: '/profesores/asignaturas' },
]

export default function profesorIndex({ profesores }: PageProps) {


    return <>
    <SubNav 
    items={TABS}
    />


        <div className={styles.profesoresList}>
            {profesores.map((e) => (
                <StatCard
                    profesor={e}
                />
            ))}

        </div>

    </>
}