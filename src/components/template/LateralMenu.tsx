import useAppData from "../../data/hook/useAppData";
import {IconCreate, IconHome, IconLogout, IconPen } from "../icons";
import Logo from "./Logo";
import MenuItem from "./Menuitem";

export default function LateralMenu() {
    const ctx = useAppData()
    return (
        <aside className={`flex flex-col`}>
            <div className={`
            flex flex-col items-center justify-center
            bg-gradient-to-r from-indigo-500 to-purple-800
            h-20 w-20`}>
                <Logo/>
            </div>
            <ul className="flex-grow">
                <MenuItem url="/" text="Início" icon={IconHome} />
                <MenuItem url="/CreateTask" text="Criar Tarefa" icon={IconCreate} />
            </ul>
            <ul>
                <MenuItem click={ctx.logout} text="Sair" icon={IconLogout}/>
            </ul>
        </aside>
    )
}