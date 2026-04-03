import { ReactNode ,useState } from "react";
import { Form, Link } from '@adonisjs/inertia/react'

interface MenuItem{
    tittle: string 
    link: string
}
interface MenuProps{
    menuItems: Array<MenuItem>
    onChange : (index :number) => void
    selectedIndex: number | null 
}
export default function Menu ({menuItems, onChange, selectedIndex}: MenuProps){
    const [selected, setSelected] =  useState <number | null>(selectedIndex)
    return (
        <ul className="menu-items">
            {menuItems.map((e, i)=>(<li
            className={i==selected ? "selected" : ""}
            onClick={()=>{
                setSelected(i)
                onChange(i)
            }}
            >
                <Link route={e.link}>
                {e.tittle}
                </Link>

            </li>))}
        </ul>   
    )
}   