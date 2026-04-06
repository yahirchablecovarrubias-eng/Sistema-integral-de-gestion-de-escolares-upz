import { BaseTransformer } from '@adonisjs/core/transformers'
import Carrera from '#models/carrera'

export default class CarreraTransformer extends BaseTransformer<Carrera> {
  toObject() {
    // Aquí defines exactamente qué campos quieres enviar al frontend
    return this.pick(this.resource, [  
      'id',
      'nombre'
    
    ])
  }
}