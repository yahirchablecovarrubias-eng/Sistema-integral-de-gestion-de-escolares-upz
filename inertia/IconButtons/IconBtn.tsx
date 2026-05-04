import { LucideIcon, Pencil, Trash2 } from 'lucide-react';
import styles from './iconBtn.module.scss'
import { router, useForm, usePage } from "@inertiajs/react";


import { Data } from "@generated/data"
interface IconBtn{
    profesor: Data.Profesor
    tipo: number
}
export default function IconBtn({profesor, tipo}:IconBtn){
    function deleteProfesor(){
        router.delete('profesores/eliminar/' + profesor.id)
    }
    function editProfesor(){
        router.get('profesores/editar/'+ profesor.id)
    }

    if(tipo==1){
        return <>
        <div className={styles.iconBtn + " " + styles.iconBtnDelete} onClick={()=>{deleteProfesor()}}>
            <Trash2></Trash2>

        </div>
        </>
    }
    else{
        return<>
        <div className={styles.iconBtn + " " + styles.iconBtnEdit} onClick={()=>{editProfesor()}}>

        <Pencil></Pencil>
        </div>

        
        </>
    }

}