import useAppData from "../../data/hook/useAppData";
import { IconCreate, IconHome, IconLogout, IconPen } from "../icons";
import Logo from "./Logo";
import MenuItem from "./Menuitem";

export default function LateralMenu() {
    const ctx = useAppData()
    return (
        <div className="flex flex-col h-screen bg-white" >
            <aside className="flex flex-col w-20 h-screen bg-white">
                <div className="fixed flex h-screen flex-col bg-white">
                    <div className="flex flex-col items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-800 h-20 w-20">
                        <Logo />
                    </div>
                    <ul className="flex-grow">
                        <MenuItem url="/" text="Início" icon={IconHome} />
                        <MenuItem url="/CreateTask" text="Criar Tarefa" icon={IconCreate} />
                    </ul>
                    <ul>
                        <MenuItem click={ctx.logout} text="Sair" icon={IconLogout} />
                    </ul>
                </div>
            </aside>
        </div>
    )
}