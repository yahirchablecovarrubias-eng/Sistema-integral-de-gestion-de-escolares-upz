import { useForm, Head } from '@inertiajs/react'
import { FormEvent } from 'react'
import styles from './login.module.scss'

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
    })

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        post('/login')
    }

    return (
        <div className={styles.pageContainer}>
            <Head title="Iniciar Sesión - Sistema Integral UPZ" />

            <div className={styles.loginCard}>
                {/* Left decorative panel */}
                <div className={styles.decorativePanel}>
                    <img src="/logo_upz.png" alt="Logo UPZ" className={styles.logo} />
                    <h1 className={styles.systemTitle}>Sistema Integral de Gestión Escolar</h1>
                    <p className={styles.systemSubtitle}>Universidad Politécnica de Zacatecas</p>
                    <div className={styles.decorDots}>
                        <span /><span /><span />
                    </div>
                </div>

                {/* Right form panel */}
                <div className={styles.formPanel}>
                    <div className={styles.formHeader}>
                        <h2 className={styles.title}>Bienvenido</h2>
                        <p className={styles.subtitle}>Ingresa tus credenciales para continuar</p>
                    </div>

                    {errors.email && (
                        <div className={styles.errorAlert}>
                            {errors.email}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="email">Correo Electrónico</label>
                            <input
                                id="email"
                                type="email"
                                autoComplete="username"
                                value={data.email}
                                onChange={e => setData('email', e.target.value)}
                                placeholder="correo@ejemplo.com"
                                className={errors.email ? styles.inputError : ''}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="password">Contraseña</label>
                            <input
                                id="password"
                                type="password"
                                autoComplete="current-password"
                                value={data.password}
                                onChange={e => setData('password', e.target.value)}
                                placeholder="••••••••"
                                className={errors.password ? styles.inputError : ''}
                                required
                            />
                            {errors.password && <span className={styles.errorText}>{errors.password}</span>}
                        </div>

                        <button type="submit" disabled={processing} className={styles.btnSubmit}>
                            {processing ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
