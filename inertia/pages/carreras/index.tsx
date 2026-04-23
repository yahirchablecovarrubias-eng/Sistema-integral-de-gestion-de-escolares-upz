import { Data } from '@generated/data'
import CarreraCard from '~/Components/carreraCard/CarreraCard'
import { SubNavItem } from '~/Components/subnav/SubNav'
import SubNav from '~/Components/subnav/SubNav'
import styles from './CarrerasIndex.module.scss'

type PageProps = {
  carreras: Data.Carrera[]
}

const TABS: SubNavItem[] = [
  { label: 'Panel Principal',            href: '/carreras' },
  { label: 'Planes de estudio',          href: '/carreras/plan_de_estudio' },
  { label: 'Historial de coordinadores', href: '/profesores/informacion' },
  { label: 'Grupos',                     href: '/profesores/seguimiento' },
]

export default function CarrerasIndex({ carreras }: PageProps) {
  return (
    <>
      <SubNav items={TABS} />

      <section className={styles.pageSection}>

        <div className={styles.sectionHeader}>
          <h1 className={styles.sectionTitle}>Carreras</h1>
          <p className={styles.sectionMeta}>{carreras.length} carrera{carreras.length !== 1 ? 's' : ''} registrada{carreras.length !== 1 ? 's' : ''}</p>
        </div>

        {carreras.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No hay carreras registradas aún.</p>
          </div>
        ) : (
          <div className={styles.carrerasGrid}>
            {carreras.map((carrera) => (
              <CarreraCard
                key={carrera.id}
                id={carrera.id}
                nombre={carrera.nombre}
                descripcion={carrera.descripcion}
                /* imagen={carrera.imagen} */   // descomenta cuando agregues la columna al modelo
              />
            ))}
          </div>
        )}

      </section>
    </>
  )
}