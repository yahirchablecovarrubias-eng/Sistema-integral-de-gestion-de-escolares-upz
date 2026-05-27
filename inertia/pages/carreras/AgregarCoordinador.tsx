import { Head, Link, useForm } from '@inertiajs/react'
import { FormEvent, useEffect, useState } from 'react'
import { ChevronLeft, Save, UserPlus, AlertTriangle } from 'lucide-react'
import styles from './agregarCoordinador.module.scss'

interface CarreraDisponible {
    id: number
    nombre: string
    coordinadorActivo: string | null
}

interface PageProps {
    carreras: CarreraDisponible[]
    coordinador?: {
        relacionId: number
        nombre: string
        apellidoPaterno: string
        apellidoMaterno: string
        telefono: string
        correo: string
        curp: string
        rfc: string
        noCedulaProfesional: string
        carreraId: number
        fechaInicio: string
    }
}

export default function AgregarCoordinador({ carreras, coordinador }: PageProps) {
    const isEditing = !!coordinador

    const getToday = () => {
        const d = new Date()
        const tzOffset = d.getTimezoneOffset() * 60000;
        return (new Date(d.getTime() - tzOffset)).toISOString().split('T')[0]
    }

    const { data, setData, post, put, processing, errors } = useForm({
        nombre: coordinador?.nombre || '',
        apellidoPaterno: coordinador?.apellidoPaterno || '',
        apellidoMaterno: coordinador?.apellidoMaterno || '',
        telefono: coordinador?.telefono || '',
        correo: coordinador?.correo || '',
        curp: coordinador?.curp || '',
        rfc: coordinador?.rfc || '',
        noCedulaProfesional: coordinador?.noCedulaProfesional || '',
        carreraId: coordinador?.carreraId || '',
        fechaInicio: coordinador?.fechaInicio || getToday()
    })

    const [warningMsg, setWarningMsg] = useState<string | null>(null)

    useEffect(() => {
        if (data.carreraId) {
            const carreraSeleccionada = carreras.find(c => c.id === Number(data.carreraId))
            if (carreraSeleccionada && carreraSeleccionada.coordinadorActivo) {
                setWarningMsg(` Esta carrera ya tiene a ${carreraSeleccionada.coordinadorActivo} como coordinador activo. Al guardar, el coordinador anterior será dado de baja con la nueva fecha de inicio.`)
            } else {
                setWarningMsg(null)
            }
        } else {
            setWarningMsg(null)
        }
    }, [data.carreraId, carreras])

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (isEditing) {
            put(`/carreras/coordinadores/editar/${coordinador.relacionId}`)
        } else {
            post('/carreras/coordinadores/agregar')
        }
    }

    return (
        <div className={styles.pageContainer}>
            <Head title={isEditing ? 'Editar Coordinador' : 'Agregar Coordinador'} />

            <div className={styles.topBar}>
                <Link href="/carreras/coordinadores" className={styles.btnBack}>
                    <ChevronLeft size={20} />
                    Volver a Coordinadores
                </Link>
            </div>

            <div className={styles.formContainer}>
                <div className={styles.formHeader}>
                    <div className={styles.iconWrapper}>
                        <UserPlus size={28} />
                    </div>
                    <div>
                        <h1 className={styles.title}>{isEditing ? 'Editar Coordinador' : 'Alta de Coordinador'}</h1>
                        <p className={styles.subtitle}>
                            {isEditing ? 'Modifica los datos del coordinador o transfiérelo de carrera' : 'Ingresa la información personal y académica del nuevo coordinador'}
                        </p>
                    </div>
                </div>

                {warningMsg && (
                    <div className={styles.warningAlert}>
                        <AlertTriangle size={20} />
                        <span>{warningMsg}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Datos Personales</h2>
                        <div className={styles.gridContainer}>
                            <div className={styles.formGroup}>
                                <label>Nombre(s)</label>
                                <input
                                    type="text"
                                    value={data.nombre}
                                    onChange={e => setData('nombre', e.target.value)}
                                    className={errors.nombre ? styles.inputError : ''}
                                    required
                                />
                                {errors.nombre && <span className={styles.errorText}>{errors.nombre}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Apellido Paterno</label>
                                <input
                                    type="text"
                                    value={data.apellidoPaterno}
                                    onChange={e => setData('apellidoPaterno', e.target.value)}
                                    className={errors.apellidoPaterno ? styles.inputError : ''}
                                    required
                                />
                                {errors.apellidoPaterno && <span className={styles.errorText}>{errors.apellidoPaterno}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Apellido Materno</label>
                                <input
                                    type="text"
                                    value={data.apellidoMaterno}
                                    onChange={e => setData('apellidoMaterno', e.target.value)}
                                    className={errors.apellidoMaterno ? styles.inputError : ''}
                                />
                                {errors.apellidoMaterno && <span className={styles.errorText}>{errors.apellidoMaterno}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Teléfono</label>
                                <input
                                    type="tel"
                                    value={data.telefono}
                                    onChange={e => {
                                        const val = e.target.value.replace(/\D/g, '')
                                        let formatted = val
                                        if (val.length > 0) {
                                            if (val.length <= 3) formatted = val
                                            else if (val.length <= 6) formatted = `${val.slice(0, 3)}-${val.slice(3)}`
                                            else formatted = `${val.slice(0, 3)}-${val.slice(3, 6)}-${val.slice(6, 10)}`
                                        }
                                        setData('telefono', formatted)
                                    }}
                                    maxLength={12}
                                />
                                {errors.telefono && <span className={styles.errorText}>{errors.telefono}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Correo Electrónico</label>
                                <input
                                    type="email"
                                    value={data.correo}
                                    onChange={e => setData('correo', e.target.value)}
                                    className={errors.correo ? styles.inputError : ''}
                                />
                                {errors.correo && <span className={styles.errorText}>{errors.correo}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>CURP</label>
                                <input
                                    type="text"
                                    value={data.curp}
                                    onChange={e => setData('curp', e.target.value.toUpperCase())}
                                    maxLength={18}
                                />
                                {errors.curp && <span className={styles.errorText}>{errors.curp}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>RFC</label>
                                <input
                                    type="text"
                                    value={data.rfc}
                                    onChange={e => setData('rfc', e.target.value.toUpperCase())}
                                    maxLength={13}
                                />
                                {errors.rfc && <span className={styles.errorText}>{errors.rfc}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>No. Cédula Profesional</label>
                                <input
                                    type="text"
                                    value={data.noCedulaProfesional}
                                    onChange={e => setData('noCedulaProfesional', e.target.value)}
                                />
                                {errors.noCedulaProfesional && <span className={styles.errorText}>{errors.noCedulaProfesional}</span>}
                            </div>
                        </div>
                    </div>

                    <div className={styles.formSection}>
                        <h2 className={styles.sectionTitle}>Asignación Académica</h2>
                        <div className={styles.gridContainer}>
                            <div className={styles.formGroup}>
                                <label>Carrera Asignada</label>
                                <select
                                    value={data.carreraId}
                                    onChange={e => setData('carreraId', e.target.value)}
                                    className={errors.carreraId ? styles.inputError : ''}
                                    required
                                >
                                    <option value="" disabled>Seleccione una carrera...</option>
                                    {carreras.map(c => (
                                        <option key={c.id} value={c.id}>
                                            {c.nombre}
                                        </option>
                                    ))}
                                </select>
                                {errors.carreraId && <span className={styles.errorText}>{errors.carreraId}</span>}
                            </div>
                            <div className={styles.formGroup}>
                                <label>Fecha de Inicio</label>
                                <input
                                    type="date"
                                    value={data.fechaInicio}
                                    onChange={e => setData('fechaInicio', e.target.value)}
                                    className={errors.fechaInicio ? styles.inputError : ''}
                                    required
                                />
                                {errors.fechaInicio && <span className={styles.errorText}>{errors.fechaInicio}</span>}
                            </div>
                        </div>
                    </div>

                    <div className={styles.formActions}>
                        <button type="submit" disabled={processing} className={styles.btnSubmit}>
                            <Save size={18} />
                            {processing ? 'Guardando...' : (isEditing ? 'Guardar Cambios' : 'Registrar Coordinador')}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
