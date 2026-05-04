import { Data } from "@generated/data";
import styles from './profesores.module.scss'
import ProfesorCard from "../../Components/profesorCard";
import SubNav from "~/Components/subnav/SubNav";
import { SubNavItem } from "~/Components/subnav/SubNav";
import AddButton from "~/IconButtons/AddButton";
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
                <ProfesorCard
                    profesor={e}
                />
            ))}

        </div>
    <div>
        <AddButton
        direccion="/profesores/agregar"
        className="fab-buton"
        />

    </div>

    </>
}