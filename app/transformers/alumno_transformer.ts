import Alumno from "#models/alumno";
import { BaseTransformer } from "@adonisjs/core/transformers";

export default class AlumnoTransformer extends BaseTransformer<Alumno> {
    toObject() {
        const data: any = this.pick(this.resource, [
            'id',
            'nombre',
            'apellidoPaterno',
            'apellidoMaterno',
            'email',
            'telefono',
            'matricula',
        ]);

        if (this.resource.inscripciones && this.resource.inscripciones.length > 0) {
            const inscripcion = this.resource.inscripciones[0];
            data.cuatrimestreActual = inscripcion.cuatrimestreActual;
            data.estadoAcademico = inscripcion.estadoAcademico;
        }

        return data;
    }
}