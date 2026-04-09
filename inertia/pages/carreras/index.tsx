import { Data } from '@generated/data'
import CarreraCard from '../../Components/statCard'

type PageProps = {
  carreras: Data.Carrera[]
}

export default function CarrerasIndex({ carreras }: PageProps) {

  return<>
  <nav></nav>
  <h1>Carreras</h1>
  </>
}