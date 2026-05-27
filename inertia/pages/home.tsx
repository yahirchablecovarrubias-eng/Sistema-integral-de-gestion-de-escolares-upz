import { Head } from '@inertiajs/react'
import styles from './home.module.scss'

export default function Home() {
    return (
        <div className={styles.pageContainer}>
            <Head title="Inicio - Sistema Integral de Gestión" />

            <div className={styles.welcomeCard}>
                <div className={styles.contentSection}>
                    <h1 className={styles.title}>¡Bienvenido al Sistema Integral de Gestión Escolar!</h1>
                    <p className={styles.description}>
                        Este sistema está diseñado para optimizar y centralizar los procesos académicos y administrativos de la Universidad Politécnica de Zacatecas (UPZ).
                        A través de sus diferentes módulos, podrás gestionar de manera eficiente la información de carreras, grupos, profesores y el historial académico de los alumnos.
                    </p>
                    <div className={styles.features}>
                        <span className={styles.featureTag}> Gestión de Alumnos</span>
                        <span className={styles.featureTag}> Control de Grupos</span>
                        <span className={styles.featureTag}> Asignación Docente</span>
                        <span className={styles.featureTag}> Historial Académico</span>
                    </div>
                </div>

                <div className={styles.imageSection}>
                    <img
                        src="/IndexImg.png"
                        alt="UPZ Sistema Integral"
                        className={styles.heroImage}
                    />
                </div>
            </div>
        </div>
    )
}
