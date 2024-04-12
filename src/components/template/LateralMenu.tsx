import UseAuth from "../../data/hook/UseAuth";
import {IconCreate, IconHome, IconLogout, IconPen } from "../icons";
import Logo from "./Logo";
import MenuItem from "./Menuitem";

export default function LateralMenu() {
    const {logout}=UseAuth()
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
                <MenuItem url="/EdtTask" text="Editar Tarefa" icon={IconPen} />
            </ul>
            <ul>
                <MenuItem click={logout} text="Sair" icon={IconLogout} className={`bg-red-400 text-white`}/>
            </ul>
        </aside>
    )
}