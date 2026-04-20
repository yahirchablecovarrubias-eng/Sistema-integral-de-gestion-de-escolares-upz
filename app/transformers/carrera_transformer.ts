import { BaseTransformer } from '@adonisjs/core/transformers'
import Carrera from '#models/carrera'

export default class CarreraTransformer extends BaseTransformer<Carrera> {
  toObject() {
    return this.pick(this.resource, [  
      'id',
      'nombre',
      "descripcion"
    
    ])
  }
}