import { BaseTransformer } from '@adonisjs/core/transformers'
import Profesor from '#models/profesor'

export default class ProfesorTransformer extends BaseTransformer<Profesor> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'nombre',
      'apellidoPaterno',
      'apellidoMaterno',
      'especialidad',
      'email',
      'telefono'
    ])
  }
}