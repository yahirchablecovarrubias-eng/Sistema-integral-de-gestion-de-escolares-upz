import { SubNavItem } from "~/Components/subnav/SubNav"
import SubNav from "~/Components/subnav/SubNav"
import { Data } from "@generated/data"
import PlanEstudioCard from "~/Components/planEstudio/PlanEstudioCard"

const TABS: SubNavItem[] = [
  { label: 'Panel Principal', href: '/carreras' },
  { label: 'Planes de estudio', href: '/carreras/plan_de_estudio' },
  { label: 'Coordinadores', href: '/carreras/coordinadores' },
  { label: 'Grupos', href: '/carreras/grupos' },
]

interface MateriaPlan {
    nombre: string 
    cuatrimestre: number | null
}

export interface PlanProps {
    id: number
    nombre: string 
    materias: MateriaPlan[]          
}

interface PageProps {                    
  plan: PlanProps  
}   

export default function PlanEstudio({ plan }: PageProps) {
  return (
    <>
      <SubNav items={TABS} />

      <PlanEstudioCard
        nombre={plan.nombre}
        materias={plan.materias}
  
      />
    </>
  )
}