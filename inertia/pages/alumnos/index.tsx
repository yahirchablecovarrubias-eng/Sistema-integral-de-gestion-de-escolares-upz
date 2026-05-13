import { Data } from "@generated/data"
type PageProps = Data.SharedProps & {
    alumnos: Data.Alumno[]
}

export default function index({ alumnos }: PageProps) {
    return (
        <div>
            <h1>Alumnos</h1>
            <ul>
                {alumnos.map((alumno) => (
                    <li key={alumno.id}>
                        {alumno.nombre} {alumno.apellidoPaterno} {alumno.apellidoMaterno}
                    </li>
                ))}
            </ul>
        </div>
    )
}