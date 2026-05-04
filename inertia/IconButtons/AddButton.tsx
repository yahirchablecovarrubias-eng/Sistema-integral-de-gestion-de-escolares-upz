import styles from './iconAdd.module.scss'
interface ButtonAddProps{
    direccion: string
    className?: string
}
export default function AddButton({direccion, className}:ButtonAddProps){
    return<>
        <button className={[styles.btnAdd, className].join(" ")}>
            <a href={direccion}>Agregar</a>
        </button>
    </>
}