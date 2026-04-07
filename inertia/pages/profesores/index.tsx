import { Data } from "@generated/data";
type PageProps = {
    profesores: Data.Profesor[]
}
export default function profesorIndex({profesores}: PageProps){
    return<>
    <h1>
        Lista de Profesores
    </h1>
    <ul>
        {profesores.map((e)=>(
            <li>
                {e.nombre}
                <br />
                {e.especialidad}
            </li>
        ))}
    </ul>
    </>
}