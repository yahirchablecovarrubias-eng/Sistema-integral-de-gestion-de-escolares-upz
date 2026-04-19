import PlanEstudiosMateria from "#models/planEstudiosMateria";
import { BaseTransformer } from "@adonisjs/core/transformers";
export default class PlanEstudioMateriaTransformer extends BaseTransformer<PlanEstudiosMateria>{
    toObjetc(){
        return this.pick(this.resource, [
            'materiaId',
            'creditos'
        ])
    }
}