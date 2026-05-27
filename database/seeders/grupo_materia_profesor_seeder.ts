import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Profesor from '#models/profesor'
import GrupoMateria from '#models/grupoMateria'
import GrupoMateriaProfesor from '#models/grupoMateriaProfesor'

export default class GrupoMateriaProfesorSeeder extends BaseSeeder {
  async run() {
    // 1. Crear/Actualizar profesores con especialidades clave y datos ficticios con el formato adecuado
    const nuevosProfesores = [
      {
        nombre: 'JUAN',
        apellidoPaterno: 'PEREZ',
        apellidoMaterno: 'LOPEZ',
        email: 'juan.idiomas@upz.edu.mx',
        especialidad: 'IDIOMAS',
        curp: 'PELJ750412HDFRPL01',
        rfc: 'PELJ750412ABC',
        noCedulaProfesional: '78912345',
        telefono: '492-123-4567'
      },
      {
        nombre: 'MARIA',
        apellidoPaterno: 'GOMEZ',
        apellidoMaterno: 'DIAZ',
        email: 'maria.mates@upz.edu.mx',
        especialidad: 'MATEMATICAS',
        curp: 'GODM800923MDFRPL02',
        rfc: 'GODM800923XYZ',
        noCedulaProfesional: '89023456',
        telefono: '492-234-5678'
      },
      {
        nombre: 'ROBERTO',
        apellidoPaterno: 'DIAZ',
        apellidoMaterno: 'RUIZ',
        email: 'roberto.sistemas@upz.edu.mx',
        especialidad: 'SISTEMAS E INFORMATICA',
        curp: 'DIRR851105HDFRPL03',
        rfc: 'DIRR851105123',
        noCedulaProfesional: '90134567',
        telefono: '492-345-6789'
      },
      {
        nombre: 'LAURA',
        apellidoPaterno: 'SANCHEZ',
        apellidoMaterno: 'CRUZ',
        email: 'laura.mecatronica@upz.edu.mx',
        especialidad: 'MECATRONICA Y ELECTRONICA',
        curp: 'SACL880215MDFRPL04',
        rfc: 'SACL880215456',
        noCedulaProfesional: '12345098',
        telefono: '492-456-7890'
      },
      {
        nombre: 'CARLOS',
        apellidoPaterno: 'RUIZ',
        apellidoMaterno: 'GARCIA',
        email: 'carlos.humanidades@upz.edu.mx',
        especialidad: 'ADMINISTRACION Y HUMANIDADES',
        curp: 'RUGC900630HDFRPL05',
        rfc: 'RUGC900630789',
        noCedulaProfesional: '23456109',
        telefono: '492-567-8901'
      }
    ]

    for (const p of nuevosProfesores) {
      await Profesor.updateOrCreate({ email: p.email }, p)
    }

    const todosLosProfesores = await Profesor.query()

    const reglasEspecialidad: Record<string, string[]> = {
      'IDIOMAS': ['INGLES'],
      'MATEMATICAS': ['CALCULO', 'ECUACIONES', 'PROBABILIDAD', 'MATEMATICAS'],
      'SISTEMAS E INFORMATICA': ['PROGRAMACION', 'BASES DE DATOS', 'SERVIDORES', 'WEB', 'REDES', 'SISTEMAS OPERATIVOS', 'SOFTWARE', 'INFORMATICA', 'INTELIGENCIA ARTIFICIAL', 'INTEGRACION'],
      'MECATRONICA Y ELECTRONICA': ['ELECTRONICA', 'MICROCONTROLADORES', 'AUTOMATIZACION', 'MECATRONICA', 'SCADA', 'EMBEBIDOS', 'CONTROL', 'ELECTRICIDAD', 'FISICA', 'MATERIALES', 'MANUFACTURA', 'ENERGIAS'],
      'ADMINISTRACION Y HUMANIDADES': ['HABILIDADES', 'LIDERAZGO', 'PROYECTOS']
    }

    const gruposMaterias = await GrupoMateria.query().preload('materia')
    let asignaciones = 0

    for (const gm of gruposMaterias) {
      if (!gm.materia) continue

      // Respetar asignaciones previas para evitar duplicidad de profesores en un mismo grupo_materia
      const asignacionExistente = await GrupoMateriaProfesor.query().where('grupoMateriaId', gm.id).first()
      if (asignacionExistente) {
        console.log(`ℹ️ GrupoMateria ID ${gm.id} ya tiene profesor asignado (Profesor ID: ${asignacionExistente.profesorId}). Saltando...`)
        continue
      }

      const nombreMateria = gm.materia.nombre.toUpperCase()
      let especialidadBuscada: string | null = null
      
      for (const [esp, keywords] of Object.entries(reglasEspecialidad)) {
        if (keywords.some(kw => nombreMateria.includes(kw))) {
          especialidadBuscada = esp
          break
        }
      }

      let profesorAsignado = null
      if (especialidadBuscada) {
        const profesoresEspecialidad = todosLosProfesores.filter(p => 
          p.especialidad && p.especialidad.toUpperCase().includes(especialidadBuscada!)
        )
        if (profesoresEspecialidad.length > 0) {
          profesorAsignado = profesoresEspecialidad[Math.floor(Math.random() * profesoresEspecialidad.length)]
        }
      }

      if (!profesorAsignado) {
        profesorAsignado = todosLosProfesores[Math.floor(Math.random() * todosLosProfesores.length)]
      }

      await GrupoMateriaProfesor.create({
        grupoMateriaId: gm.id,
        profesorId: profesorAsignado.id
      })
      asignaciones++
    }

    console.log(`\n🎉 Nuevas asignaciones Grupo-Materia a Profesores: ${asignaciones}`)
  }
}