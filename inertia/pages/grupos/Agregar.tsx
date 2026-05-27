import { useForm, Head, Link } from '@inertiajs/react'
import { FormEvent, useState, useEffect } from 'react'
import { FolderPlus, Calendar } from 'lucide-react'
import styles from './agregar.module.scss'
import SubNav, { SubNavItem } from '~/Components/subnav/SubNav'

const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/carreras' },
    { label: 'Planes de estudio', href: '/carreras/plan_de_estudio' },
    { label: 'Coordinadores', href: '/carreras/coordinadores' },
    { label: 'Grupos', href: '/carreras/grupos' },
]

type CarreraData = {
    id: number
    nombre: string
}

type PageProps = {
    carreras: CarreraData[]
}

export default function AgregarGrupo({ carreras }: PageProps) {
    const { data, setData, post, processing } = useForm({
        nombre: '',
        carrera_id: '',
        cuatrimestre: '1'
    })

    const [periodoAsignado, setPeriodoAsignado] = useState('SEPTIEMBRE-DICIEMBRE (Año actual)')

    useEffect(() => {
        const cuatri = Number(data.cuatrimestre)
        if ([1, 4, 7, 10].includes(cuatri)) {
            setPeriodoAsignado('SEPTIEMBRE-DICIEMBRE')
        } else if ([2, 5, 8].includes(cuatri)) {
            setPeriodoAsignado('ENERO-ABRIL')
        } else if ([3, 6, 9].includes(cuatri)) {
            setPeriodoAsignado('MAYO-AGOSTO')
        } else {
            setPeriodoAsignado('Desconocido')
        }
    }, [data.cuatrimestre])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        post('/grupos/agregar')
    }

    return (
        <>
            <Head title="Agregar Grupo" />
            <SubNav items={TABS} />

            <div className={styles.pageWrapper}>
                <div className={styles.formCard}>
                    <div className={styles.formHeader}>
                        <div className={styles.headerIcon}>
                            <FolderPlus size={24} />
                        </div>
                        <div className={styles.headerText}>
                            <h1 className={styles.formTitle}>Alta de Grupo</h1>
                            <p className={styles.formSubtitle}>Ingresa los detalles para registrar un nuevo grupo académico.</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.row}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor="nombre" className={styles.label}>Nombre del Grupo</label>
                                <input
                                    id="nombre"
                                    type="text"
                                    className={styles.input}
                                    placeholder="Ej. ITIID 8.1"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    required
                                    style={{ textTransform: 'uppercase' }}
                                />
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor="carrera_id" className={styles.label}>Carrera</label>
                                <select
                                    id="carrera_id"
                                    className={styles.select}
                                    value={data.carrera_id}
                                    onChange={e => setData('carrera_id', e.target.value)}
                                    required
                                >
                                    <option value="" disabled>Seleccione una carrera...</option>
                                    {carreras.map(c => (
                                        <option key={c.id} value={c.id}>{c.nombre}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.fieldGroup}>
                                <label htmlFor="cuatrimestre" className={styles.label}>Cuatrimestre</label>
                                <select
                                    id="cuatrimestre"
                                    className={styles.select}
                                    value={data.cuatrimestre}
                                    onChange={e => setData('cuatrimestre', e.target.value)}
                                    required
                                >
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                        <option key={num} value={num}>Cuatrimestre {num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className={styles.row}>
                            <div className={styles.fieldGroup}>
                                <label className={styles.label}>Periodo Asignado (Automático)</label>
                                <div className={styles.periodoAsignado}>
                                    <Calendar size={18} />
                                    <span>{periodoAsignado} 2026</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.actions}>
                            <Link href="/carreras/grupos" className={styles.btnCancel}>
                                Cancelar
                            </Link>
                            <button type="submit" className={styles.btnSubmit} disabled={processing}>
                                Registrar Grupo
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
