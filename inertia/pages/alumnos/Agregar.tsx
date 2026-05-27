import { useForm } from '@inertiajs/react'
import { useEffect } from 'react'
import styles from './agregar.module.scss'
import SubNav from '~/Components/subnav/SubNav'
import { SubNavItem } from '~/Components/subnav/SubNav'

// ─── Navegación ───────────────────────────────────────────────────────────────

const TABS: SubNavItem[] = [
    { label: 'Panel Principal', href: '/alumnos' },
    { label: 'Información Personal', href: '/alumnos/informacion' },
    { label: 'Seguimiento', href: '/alumnos/seguimiento' },
    { label: 'Historial Académico', href: '/alumnos/historial' },
]

// ─── Tipos ────────────────────────────────────────────────────────────────────

type AlumnoForm = {
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string
    curp: string
    email: string
    matricula: string
    telefono: string
    planEstudiosId: string   // se envía como string y el controlador lo castea a number
    periodo: string
    cuatrimestre: string
    estadoAcademico: string
    grupoId: string
}

// planEstudiosId llega como number desde el servidor en modo edición
type PageProps = {
    alumno?: AlumnoForm & { id: number };
    planesEstudio: { id: number, nombre: string, carreraId?: number }[];
    periodos?: { id: number, nombre: string }[];
    grupos?: { id: number, nombre: string, carreraId: number, cuatrimestre: number, periodoId: number }[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatTelefono(value: string): string {
    const digits = value.replace(/\D/g, '').slice(0, 10)
    if (digits.length <= 3) return digits
    if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`
}

const EMPTY: AlumnoForm = {
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    curp: '',
    email: '',
    matricula: '',
    telefono: '',
    planEstudiosId: '',
    periodo: '',
    cuatrimestre: '',
    estadoAcademico: '',
    grupoId: '',
}

// ─── Componente ───────────────────────────────────────────────────────────────

export default function AgregarAlumno({ alumno, planesEstudio, periodos = [], grupos = [] }: PageProps) {
    const esEdicion = !!alumno

    const { data, setData, post, put, processing, errors, reset } = useForm<AlumnoForm>(
        alumno
            ? {
                nombre: alumno.nombre,
                apellidoPaterno: alumno.apellidoPaterno,
                apellidoMaterno: alumno.apellidoMaterno,
                curp: alumno.curp,
                email: alumno.email,
                matricula: alumno.matricula,
                telefono: alumno.telefono,
                planEstudiosId: String(alumno.planEstudiosId ?? ''),
                periodo: alumno.periodo ?? '',
                cuatrimestre: String(alumno.cuatrimestre ?? ''),
                estadoAcademico: alumno.estadoAcademico ?? '',
                grupoId: alumno.grupoId ?? '',
            }
            : EMPTY
    )

    let cuatrimestresDisponibles: number[] = [];
    if (data.periodo === 'ENERO-ABRIL') cuatrimestresDisponibles = [2, 5, 8];
    else if (data.periodo === 'MAYO-AGOSTO') cuatrimestresDisponibles = [3, 6, 9];
    else if (data.periodo === 'SEPTIEMBRE-DICIEMBRE') cuatrimestresDisponibles = [1, 4, 7, 10];

    useEffect(() => {
        if (data.cuatrimestre && !cuatrimestresDisponibles.includes(Number(data.cuatrimestre))) {
            setData('cuatrimestre', '')
        }
    }, [data.periodo])

    const selectedPlan = planesEstudio.find(p => p.id.toString() === data.planEstudiosId);
    const selectedPeriodo = periodos.find(p => p.nombre === data.periodo);
    
    const gruposDisponibles = grupos.filter(g => 
        selectedPlan && g.carreraId === selectedPlan.carreraId &&
        selectedPeriodo && g.periodoId === selectedPeriodo.id &&
        g.cuatrimestre.toString() === data.cuatrimestre
    );

    const len = gruposDisponibles.length;
    const firstId = len > 0 ? gruposDisponibles[0].id.toString() : '';
    useEffect(() => {
        if (len === 1 && data.grupoId !== firstId) {
            setData('grupoId', firstId);
        } else if (len === 0 && data.grupoId !== '') {
            setData('grupoId', '');
        }
    }, [len, firstId]);

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        if (esEdicion) {
            put(`/alumnos/editar/${alumno!.id}`)
        } else {
            post('/alumnos/agregar', { onSuccess: () => reset() })
        }
    }

    return (
        <>
            <SubNav items={TABS} />

            <div className={styles.pageWrapper}>
                <div className={styles.formCard}>

                    {/* ── Header ──────────────────────────────────────── */}
                    <div className={styles.formHeader}>
                        <div className={styles.headerAccent} />
                        <div>
                            <h2 className={styles.formTitle}>
                                {esEdicion ? 'Editar Alumno' : 'Nuevo Alumno'}
                            </h2>
                            <p className={styles.formSubtitle}>
                                {esEdicion
                                    ? 'Modifica los campos que deseas actualizar'
                                    : 'Complete todos los campos para registrar al alumno en el sistema'}
                            </p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.form}>

                        {/* ── SECCIÓN: Datos personales ────────────────── */}
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
                                        onChange={e => setData('nombre', e.target.value.toUpperCase())}
                                        placeholder="Ej. JUAN CARLOS"
                                    />
                                    {errors.nombre && <span className={styles.errorMsg}>{errors.nombre}</span>}
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="apellidoPaterno">Apellido Paterno *</label>
                                    <input
                                        id="apellidoPaterno"
                                        type="text"
                                        className={`${styles.input} ${errors.apellidoPaterno ? styles.inputError : ''}`}
                                        value={data.apellidoPaterno}
                                        onChange={e => setData('apellidoPaterno', e.target.value.toUpperCase())}
                                        placeholder="Ej. GARCÍA"
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
                                        onChange={e => setData('apellidoMaterno', e.target.value.toUpperCase())}
                                        placeholder="Ej. LÓPEZ"
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
                                        placeholder="alumno@upz.edu.mx"
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
                                        onChange={e => setData('telefono', formatTelefono(e.target.value))}
                                        placeholder="492-000-0000"
                                        maxLength={12}
                                    />
                                    {errors.telefono && <span className={styles.errorMsg}>{errors.telefono}</span>}
                                </div>
                            </div>
                        </fieldset>

                        {/* ── SECCIÓN: Documentación oficial ───────────── */}
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>
                                <span className={styles.legendDot} />
                                Documentación Oficial
                            </legend>

                            <div className={styles.row}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="matricula">Matrícula *</label>
                                    <input
                                        id="matricula"
                                        type="text"
                                        className={`${styles.input} ${styles.inputMono} ${errors.matricula ? styles.inputError : ''}`}
                                        value={data.matricula}
                                        onChange={e => setData('matricula', e.target.value.toUpperCase())}
                                        placeholder="Ej. UPZ2400001"
                                        maxLength={12}
                                    />
                                    {errors.matricula && <span className={styles.errorMsg}>{errors.matricula}</span>}
                                </div>

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
                            </div>
                        </fieldset>

                        {/* ── SECCIÓN: Información académica ────────────── */}
                        <fieldset className={styles.fieldset}>
                            <legend className={styles.legend}>
                                <span className={styles.legendDot} />
                                Información Académica
                            </legend>

                            <div className={styles.row}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="planEstudiosId">Plan de Estudios *</label>
                                    <select
                                        id="planEstudiosId"
                                        className={`${styles.input} ${errors.planEstudiosId ? styles.inputError : ''}`}
                                        value={data.planEstudiosId}
                                        onChange={e => setData('planEstudiosId', e.target.value)}
                                    >
                                        <option value="" disabled>Seleccione un plan de estudios...</option>
                                        {planesEstudio && planesEstudio.map((plan) => (
                                            <option key={plan.id} value={plan.id}>
                                                {plan.nombre}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.planEstudiosId && <span className={styles.errorMsg}>{errors.planEstudiosId}</span>}
                                </div>
                            </div>
                        </fieldset>

                        {/* ── SECCIÓN: Datos de Inscripción ────────────── */}
                        <fieldset className={styles.fieldset} style={{ borderLeftColor: 'var(--color-accent)' }}>
                            <legend className={styles.legend} style={{ color: 'var(--color-accent)' }}>
                                <span className={styles.legendDot} style={{ backgroundColor: 'var(--color-accent)' }} />
                                Datos de Inscripción (Alta Inicial)
                            </legend>

                            <div className={styles.row}>
                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="periodo">Período *</label>
                                    <select
                                        id="periodo"
                                        className={`${styles.input} ${errors.periodo ? styles.inputError : ''}`}
                                        value={data.periodo}
                                        onChange={e => setData('periodo', e.target.value)}
                                    >
                                        <option value="" disabled>Seleccione un período...</option>
                                        <option value="ENERO-ABRIL">ENERO-ABRIL</option>
                                        <option value="MAYO-AGOSTO">MAYO-AGOSTO</option>
                                        <option value="SEPTIEMBRE-DICIEMBRE">SEPTIEMBRE-DICIEMBRE</option>
                                    </select>
                                    {errors.periodo && <span className={styles.errorMsg}>{errors.periodo}</span>}
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="cuatrimestre">Cuatrimestre *</label>
                                    <select
                                        id="cuatrimestre"
                                        className={`${styles.input} ${errors.cuatrimestre ? styles.inputError : ''}`}
                                        value={data.cuatrimestre}
                                        onChange={e => setData('cuatrimestre', e.target.value)}
                                        disabled={!data.periodo}
                                    >
                                        <option value="" disabled>Seleccione un cuatrimestre...</option>
                                        {cuatrimestresDisponibles.map(num => (
                                            <option key={num} value={num}>
                                                {num}° Cuatrimestre
                                            </option>
                                        ))}
                                    </select>
                                    {errors.cuatrimestre && <span className={styles.errorMsg}>{errors.cuatrimestre}</span>}
                                    {!data.periodo && <small style={{ color: 'var(--color-text-muted)', marginTop: '4px', fontSize: '0.75rem' }}>Seleccione un período primero</small>}
                                </div>

                                <div className={styles.fieldGroup}>
                                    <label className={styles.label} htmlFor="estadoAcademico">Estado Académico *</label>
                                    <select
                                        id="estadoAcademico"
                                        className={`${styles.input} ${errors.estadoAcademico ? styles.inputError : ''}`}
                                        value={data.estadoAcademico}
                                        onChange={e => setData('estadoAcademico', e.target.value)}
                                    >
                                        <option value="" disabled>Seleccione estado...</option>
                                        <option value="REGULAR">REGULAR</option>
                                        <option value="IRREGULAR">IRREGULAR</option>
                                    </select>
                                    {errors.estadoAcademico && <span className={styles.errorMsg}>{errors.estadoAcademico}</span>}
                                </div>
                            </div>

                            {data.estadoAcademico === 'REGULAR' && (
                                <div className={styles.row} style={{ marginTop: '1rem' }}>
                                    <div className={styles.fieldGroup}>
                                        <label className={styles.label} htmlFor="grupoId">Grupo Asignado *</label>
                                        <select
                                            id="grupoId"
                                            className={`${styles.input} ${errors.grupoId ? styles.inputError : ''}`}
                                            value={data.grupoId}
                                            onChange={e => setData('grupoId', e.target.value)}
                                            disabled={gruposDisponibles.length === 0}
                                            required={data.estadoAcademico === 'REGULAR'}
                                        >
                                            <option value="" disabled>
                                                {gruposDisponibles.length === 0 ? 'No hay grupos disponibles para estos criterios' : 'Seleccione un grupo...'}
                                            </option>
                                            {gruposDisponibles.map(g => (
                                                <option key={g.id} value={g.id}>
                                                    {g.nombre}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.grupoId && <span className={styles.errorMsg}>{errors.grupoId}</span>}
                                    </div>
                                </div>
                            )}
                        </fieldset>

                        {/* ── Acciones ──────────────────────────────────── */}
                        <div className={styles.actions}>
                            <a href="/alumnos" className={styles.btnCancel}>
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
                                    esEdicion ? 'Guardar Cambios' : 'Registrar Alumno'
                                )}
                            </button>
                        </div>

                    </form>
                </div>
            </div>
        </>
    )
}