import { Data } from '@generated/data'

type PageProps = {
    carreras: Data.Carrera[]
}
export default function CarrerasIndex({carreras}: PageProps) {
    return <>
        <ul>
            {carreras.map((e) =>(
                <li>
                    {e.nombre}
                </li>
            ))}
        </ul>

    </>
}
