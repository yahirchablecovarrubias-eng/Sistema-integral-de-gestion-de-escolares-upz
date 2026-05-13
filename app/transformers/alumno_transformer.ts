import Alumno from "#models/alumno";
import { BaseTransformer } from "@adonisjs/core/transformers";

export default class AlumnoTransformer extends BaseTransformer<Alumno> {
    toObject() {
        return this.pick(this.resource, [
            'id',
            'nombre',
            'apellidoPaterno',
            'apellidoMaterno',
            'email',
            'telefono',
            'matricula',


        ])
    }
}