import { LucideIcon, Pencil, Trash2 } from 'lucide-react';
import styles from './iconBtn.module.scss'
import { router } from "@inertiajs/react";

interface IconBtnProps {
    id: number | string;
    rutaBase: string; // Ejemplo: 'profesores', 'alumnos'
    tipo: number; // 1 = Eliminar, 2 = Editar
}

export default function IconBtn({ id, rutaBase, tipo }: IconBtnProps) {
    function handleDelete() {
        const confirmar = window.confirm('¿Estás totalmente seguro de que deseas eliminar este registro? Esta acción no se puede deshacer.');
        if (confirmar) {
            router.delete(`/${rutaBase}/eliminar/${id}`);
        }
    }
    function handleEdit() {
        router.get(`/${rutaBase}/editar/${id}`);
    }

    if (tipo === 1) {
        return (
            <div className={`${styles.iconBtn} ${styles.iconBtnDelete}`} onClick={handleDelete}>
                <Trash2 />
            </div>
        );
    } else {
        return (
            <div className={`${styles.iconBtn} ${styles.iconBtnEdit}`} onClick={handleEdit}>
                <Pencil />
            </div>
        );
    }
}