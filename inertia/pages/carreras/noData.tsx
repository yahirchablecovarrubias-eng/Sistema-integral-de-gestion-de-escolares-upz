import { Data } from "@generated/data"
interface noData {
    carreraSinPlan : Data.Carrera[]
}
export default function NoData({carreraSinPlan}: noData){
    return<>
    <h1>
        Actaualmente la carrera: {carreraSinPlan[0].nombre} no tiene ningun Plan vigente

    </h1>
    
    </>
}