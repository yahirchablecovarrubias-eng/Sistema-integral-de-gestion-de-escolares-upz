import { Data } from '@generated/data'

type PagePops = {
    carreras: Data.Carrera[]
}
export default function CarrerasIndex({carreras}: PagePops) {
    return <>
        {/* <ul>
            {carreras.map((e) =>(
                <li>
                    {e.nombre}
                </li>
            ))}
        </ul> */}
    <h1>Carreras Funciona</h1>

    </>
}
