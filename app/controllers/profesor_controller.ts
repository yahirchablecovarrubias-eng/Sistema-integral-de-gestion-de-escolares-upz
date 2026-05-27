import type { HttpContext } from '@adonisjs/core/http'
import ProfesorTransformer from '#transformers/profesor_transformer'
import Profesor from '#models/profesor'
import { createProfesorValidator } from '#validators/profesor_validator'
import db from '@adonisjs/lucid/services/db'
import GrupoMateria from '#models/grupoMateria'
import GrupoMateriaProfesor from '#models/grupoMateriaProfesor'

export default class ProfesorController {

    async index({ inertia }: HttpContext) {
        const profesores = await Profesor.query()
        return inertia.render('profesores/index', {
            profesores: ProfesorTransformer.transform(profesores)
        })
    }

    // Alta — sin profesor en props
    async showFormProfesor({ inertia }: HttpContext) {
        return inertia.render('profesores/Agregar', {})
    }

    // Edición — manda el profesor completo al form
    async showEditForm({ inertia, params }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)

        return inertia.render('profesores/Agregar', {
            profesor: {
                id:                  profesor.id,
                nombre:              profesor.nombre              ?? '',
                apellidoPaterno:     profesor.apellidoPaterno     ?? '',
                apellidoMaterno:     profesor.apellidoMaterno     ?? '',
                curp:                profesor.curp                ?? '',
                email:               profesor.email               ?? '',
                especialidad:        profesor.especialidad        ?? '',
                noCedulaProfesional: profesor.noCedulaProfesional ?? '',
                rfc:                 profesor.rfc                 ?? '',
                telefono:            profesor.telefono            ?? '',
            }
        })
    }

    async addProfesor({ request, response }: HttpContext) {
        const data = await request.validateUsing(createProfesorValidator)
        await Profesor.create(data)
        return response.redirect('/profesores')
    }

    async updateProfesor({ request, response, params }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)
        const data = await request.validateUsing(createProfesorValidator)
        profesor.merge(data)
        await profesor.save()
        return response.redirect('/profesores')
    }

    async deleteProfesor({ params, response }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)
        await profesor.delete()
        return response.redirect('/profesores')
    }

    async asignaturas({ inertia }: HttpContext) {
        const profesores = await Profesor.query()
            .preload('grupoMateriaProfesores', (gmpQuery) => {
                gmpQuery.preload('grupoMateria', (gmQuery) => {
                    gmQuery.preload('materia')
                    gmQuery.preload('grupo', (gQuery) => {
                        gQuery.preload('carrera')
                    })
                })
            })
        
        const data = profesores.map(p => {
            return {
                id: p.id,
                nombreCompleto: `${p.nombre || ''} ${p.apellidoPaterno || ''} ${p.apellidoMaterno || ''}`.trim(),
                especialidad: p.especialidad,
                asignaturas: p.grupoMateriaProfesores.map(gmp => {
                    const gm = gmp.grupoMateria
                    if (!gm) return null
                    return {
                        id: gm.id,
                        materia: gm.materia?.nombre || 'Sin materia',
                        grupo: gm.grupo?.nombre || 'Sin grupo',
                        carrera: gm.grupo?.carrera?.nombre || 'Sin carrera',
                    }
                }).filter(Boolean)
            }
        })

        return inertia.render('profesores/Asignaturas', { 
            profesores: data
        })
    }

    async asignaturasDetalle({ inertia, params }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)
        
        await profesor.load('grupoMateriaProfesores', (gmpQuery) => {
            gmpQuery.preload('grupoMateria', (gmQuery) => {
                gmQuery.preload('materia')
                gmQuery.preload('grupo', (gQuery) => {
                    gQuery.preload('carrera')
                })
            })
        })

        const data = {
            id: profesor.id,
            nombreCompleto: `${profesor.nombre || ''} ${profesor.apellidoPaterno || ''} ${profesor.apellidoMaterno || ''}`.trim(),
            especialidad: profesor.especialidad,
            asignaturas: profesor.grupoMateriaProfesores.map(gmp => {
                const gm = gmp.grupoMateria
                if (!gm) return null
                return {
                    id: gm.id,
                    materia: gm.materia?.nombre || 'Sin materia',
                    grupo: gm.grupo?.nombre || 'Sin grupo',
                    carrera: gm.grupo?.carrera?.nombre || 'Sin carrera',
                }
            }).filter(Boolean)
        }

        const asignadasIds = await db.from('grupo_materia_profesor').select('grupo_materia_id')
        const ids = asignadasIds.map(row => row.grupo_materia_id)

        const query = GrupoMateria.query()
            .preload('materia')
            .preload('grupo', g => g.preload('carrera'))
            
        if (ids.length > 0) {
            query.whereNotIn('id', ids)
        }
        
        const disponiblesRaw = await query
        const materiasDisponibles = disponiblesRaw.map(gm => ({
            id: gm.id,
            materia: gm.materia?.nombre || 'Sin materia',
            grupo: gm.grupo?.nombre || 'Sin grupo',
            carrera: gm.grupo?.carrera?.nombre || 'Sin carrera',
        }))

        return inertia.render('profesores/AsignaturasDetalle', { 
            profesor: data,
            materiasDisponibles
        })
    }

    async asignarMateria({ request, response, params }: HttpContext) {
        const profesor = await Profesor.findOrFail(params.id)
        const grupoMateriaId = request.input('grupoMateriaId')
        
        if (grupoMateriaId) {
            await GrupoMateriaProfesor.create({
                profesorId: profesor.id,
                grupoMateriaId: Number(grupoMateriaId)
            })
        }
        return response.redirect().back()
    }

    async removerMateria({ response, params }: HttpContext) {
        const profesorId = params.profesorId
        const grupoMateriaId = params.grupoMateriaId
        
        const gmp = await GrupoMateriaProfesor.query()
            .where('profesorId', profesorId)
            .where('grupoMateriaId', grupoMateriaId)
            .firstOrFail()
            
        await gmp.delete()
        return response.redirect().back()
    }
}