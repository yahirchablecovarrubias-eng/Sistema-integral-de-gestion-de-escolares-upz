import Carrera from "#models/carrera";
interface CarreraPublic{
    id: number
    nombre: string
}
export function createCarreraPublic(carrera: Carrera): CarreraPublic{
    return{
        id: carrera.id,
        nombre: carrera.nombre
    }
}