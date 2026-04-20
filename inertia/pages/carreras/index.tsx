import { Data } from '@generated/data'
import CarreraCard from '../../Components/statCard'
import { SubNavItem } from '~/Components/subnav/SubNav'
import SubNav from '~/Components/subnav/SubNav'

type PageProps = {
  carreras: Data.Carrera[]
}


const TABS: SubNavItem[] = [
  {label: 'Panel Principal', href:'/carreras'},
  { label: 'Planes de estudio', href: '/carreras/plan_de_estudio' },
  { label: 'Historial de coordinadores', href: '/profesores/informacion' },
  { label: 'Grupos', href: '/profesores/seguimiento' }
]


export default function CarrerasIndex({ carreras }: PageProps) {

  return <>
    <SubNav
      items={TABS}
    />

    <h1>Carreras</h1>
    <ul>
      {carreras.map((e)=>(
        <li>
          {e.nombre}
          <span>{e.descripcion}</span>
        </li>
        
      ))}
    </ul>







  </>
}