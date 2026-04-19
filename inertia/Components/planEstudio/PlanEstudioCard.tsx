import styles from './PlanEstudioCard.module.scss'

interface MateriaPlan {
    nombre: string
    cuatrimestre: number | null
}

interface PlanEstudioCardProps {
    nombre: string
    materias: MateriaPlan[]
}

export default function PlanEstudioCard({ nombre, materias }: PlanEstudioCardProps) {

    // Agrupar materias por cuatrimestre
    const grouped = materias.reduce<Record<number, string[]>>((acc, m) => {
        const key = m.cuatrimestre ?? 0
        if (!acc[key]) acc[key] = []
        acc[key].push(m.nombre)
        return acc
    }, {})

    const cuatrimestres = Object.keys(grouped).map(Number).sort((a, b) => a - b)

    return (
        <section className={styles.planContainer}>

            <div className={styles.planHeader}>
                <span className={styles.planTag}>Plan de estudios</span>
                <h2 className={styles.planNombre}>{nombre}</h2>
                <p className={styles.planMeta}>
                    {materias.length} materias · {cuatrimestres.length} cuatrimestres
                </p>
            </div>

            <div className={styles.cuatriGrid}>
                {cuatrimestres.map((cuatri) => (
                    <div key={cuatri} className={styles.cuatriCard}>

                        <div className={styles.cuatriHeader}>
                            <span className={styles.cuatriNum}>{cuatri}</span>
                            <span className={styles.cuatriLabel}>Cuatrimestre</span>
                        </div>

                        <ul className={styles.materiaList}>
                            {grouped[cuatri].map((mat, i) => (
                                <li key={i} className={styles.materiaItem}>
                                    <span className={styles.materiaDot} />
                                    <span className={styles.materiaNombre}>{mat}</span>
                                </li>
                            ))}
                        </ul>

                        <div className={styles.cuatriFooter}>
                            <span className={styles.materiaCount}>
                                {grouped[cuatri].length} materia{grouped[cuatri].length !== 1 ? 's' : ''}
                            </span>
                        </div>

                    </div>
                ))}
            </div>

        </section>
    )
}