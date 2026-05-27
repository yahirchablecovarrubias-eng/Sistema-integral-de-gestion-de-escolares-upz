import { Pencil, Trash2, BookOpen } from 'lucide-react';
import styles from './iconBtn.module.scss'
import { router } from "@inertiajs/react";

interface IconBtnProps {
    id: number | string;
    rutaBase: string; // Ejemplo: 'profesores', 'alumnos'
    tipo: number; // 1 = Eliminar, 2 = Editar, 3 = Ver Asignaturas
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
    function handleViewSubjects() {
        router.get(`/${rutaBase}/asignaturas/${id}`);
    }

    if (tipo === 1) {
        return (
            <div className={`${styles.iconBtn} ${styles.iconBtnDelete}`} onClick={handleDelete}>
                <Trash2 />
            </div>
        );
    } else if (tipo === 2) {
        return (
            <div className={`${styles.iconBtn} ${styles.iconBtnEdit}`} onClick={handleEdit}>
                <Pencil />
            </div>
        );
    } else if (tipo === 3) {
        return (
            <div className={`${styles.iconBtn} ${styles.iconBtnEdit}`} onClick={handleViewSubjects} title="Ver Asignaturas">
                <BookOpen />
            </div>
        );
    }
}