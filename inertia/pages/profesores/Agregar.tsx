import { useForm } from '@inertiajs/react'
import styles from './agregar.module.scss'
import SubNav from '~/Components/subnav/SubNav'
import { SubNavItem } from '~/Components/subnav/SubNav'

const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/profesores' },
    { label: 'Información Personal', href: '/profesores/informacion' },
    { label: 'Seguimiento', href: '/profesores/seguimiento' },
    { label: 'Desempeño', href: '/profesores/desempeno' },
    { label: 'Asignaturas', href: '/profesores/asignaturas' },
]

type ProfesorForm = {
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    curp: string
    email: string
    especialidad: string
    noCedulaProfesional: string
    rfc: string
    telefono: string
}

export default function AgregarProfesor() {
    const { data, setData, post, processing, errors, reset } = useForm<ProfesorForm>({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        curp: '',
        email: '',
        especialidad: '',
        noCedulaProfesional: '',
        rfc: '',
        telefono: '',
    })

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        post('/profesores/agregar', {
            onSuccess: () => reset(),
        })
    }

    return (
        <>
            <SubNav items={TABS} />

            <div className={styles.pageWrapper}>
                <div className={styles.formCard}>

                    {/* Header */}
                    <div className={styles.formHeader}>
                        <div className={styles.headerAccent} />
                        <div>
                            <h2 className={styles.formTitle}>Nuevo Profesor</h2>
                            <p className={styles.formSubtitle}>Complete todos los campos para registrar al docente en el sistema</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>

                        {/* SECCIÓN: Datos personales */}
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>
                                <span className={styles.legendDot} />
                                Datos Personales
                            </legend>

                            <div className={styles.row}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="nombre">Nombre(s) *</label>
                                    <input
                                        id="nombre"
                                        type="text"
                                        className={`${styles.input} ${errors.nombre ? styles.inputError : ''}`}
                                        value={data.nombre}
                                        onChange={e => setData('nombre', e.target.value)}
                                        placeholder="Ej. Juan Carlos"
                                    />
                                    {errors.nombre && <span className={styles.errorMsg}>{errors.nombre}</span>}
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="apellidoPaterno">Apellido Paterno</label>
                                    <input
                                        id="apellidoPaterno"
                                        type="text"
                                        className={`${styles.input} ${errors.apellidoPaterno ? styles.inputError : ''}`}
                                        value={data.apellidoPaterno}
                                        onChange={e => setData('apellidoPaterno', e.target.value)}
                                        placeholder="Ej. García"
                                    />
                                    {errors.apellidoPaterno && <span className={styles.errorMsg}>{errors.apellidoPaterno}</span>}
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="apellidoMaterno">Apellido Materno</label>
                                    <input
                                        id="apellidoMaterno"
                                        type="text"
                                        className={`${styles.input} ${errors.apellidoMaterno ? styles.inputError : ''}`}
                                        value={data.apellidoMaterno}
                                        onChange={e => setData('apellidoMaterno', e.target.value)}
                                        placeholder="Ej. López"
                                    />
                                    {errors.apellidoMaterno && <span className={styles.errorMsg}>{errors.apellidoMaterno}</span>}
                                </div>
                            </div>

                            <div className={styles.row}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="email">Correo Electrónico</label>
                                    <input
                                        id="email"
                                        type="email"
                                        className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                                        value={data.email}
                                        onChange={e => setData('email', e.target.value)}
                                        placeholder="profesor@upz.edu.mx"
                                    />
                                    {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="telefono">Teléfono</label>
                                    <input
                                        id="telefono"
                                        type="tel"
                                        className={`${styles.input} ${errors.telefono ? styles.inputError : ''}`}
                                        value={data.telefono}
                                        onChange={e => setData('telefono', e.target.value)}
                                        placeholder="492 000 0000"
                                    />
                                    {errors.telefono && <span className={styles.errorMsg}>{errors.telefono}</span>}
                                </div>
                            </div>
                        </fieldset>

                        {/* SECCIÓN: Documentación oficial */}
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>
                                <span className={styles.legendDot} />
                                Documentación Oficial
                            </legend>

                            <div className={styles.row}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="curp">CURP</label>
                                    <input
                                        id="curp"
                                        type="text"
                                        className={`${styles.input} ${styles.inputMono} ${errors.curp ? styles.inputError : ''}`}
                                        value={data.curp}
                                        onChange={e => setData('curp', e.target.value.toUpperCase())}
                                        placeholder="XXXX000000XXXXXX00"
                                        maxLength={18}
                                    />
                                    {errors.curp && <span className={styles.errorMsg}>{errors.curp}</span>}
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="rfc">RFC</label>
                                    <input
                                        id="rfc"
                                        type="text"
                                        className={`${styles.input} ${styles.inputMono} ${errors.rfc ? styles.inputError : ''}`}
                                        value={data.rfc}
                                        onChange={e => setData('rfc', e.target.value.toUpperCase())}
                                        placeholder="XXXX000000XXX"
                                        maxLength={13}
                                    />
                                    {errors.rfc && <span className={styles.errorMsg}>{errors.rfc}</span>}
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="noCedulaProfesional">No. Cédula Profesional</label>
                                    <input
                                        id="noCedulaProfesional"
                                        type="text"
                                        className={`${styles.input} ${styles.inputMono} ${errors.noCedulaProfesional ? styles.inputError : ''}`}
                                        value={data.noCedulaProfesional}
                                        onChange={e => setData('noCedulaProfesional', e.target.value)}
                                        placeholder="00000000"
                                        maxLength={10}
                                    />
                                    {errors.noCedulaProfesional && <span className={styles.errorMsg}>{errors.noCedulaProfesional}</span>}
                                </div>
                            </div>
                        </fieldset>

                        {/* SECCIÓN: Perfil académico */}
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>
                                <span className={styles.legendDot} />
                                Perfil Académico
                            </legend>

                            <div className={styles.row}>
                                <div className={`${styles.fieldGroup} ${styles.fieldGroupFull}`}>
                                    <label className={styles.label} htmlFor="especialidad">Especialidad</label>
                                    <input
                                        id="especialidad"
                                        type="text"
                                        className={`${styles.input} ${errors.especialidad ? styles.inputError : ''}`}
                                        value={data.especialidad}
                                        onChange={e => setData('especialidad', e.target.value)}
                                        placeholder="Ej. Ingeniería de Software, Redes y Telecomunicaciones..."
                                    />
                                    {errors.especialidad && <span className={styles.errorMsg}>{errors.especialidad}</span>}
                                </div>
                            </div>
                        </fieldset>

                        {/* Acciones */}
                        <div className={styles.actions}>
                            <a href="/profesores" className={styles.btnCancel}>
                                Cancelar
                            </a>
                            <button
                                type="submit"
                                className={styles.btnSubmit}
                                disabled={processing}
                            >
                                {processing ? (
                                    <>
                                        <span className={styles.spinner} />
                                        Guardando...
                                    </>
                                ) : (
                                    'Registrar Profesor'
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}