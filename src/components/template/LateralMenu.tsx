import {IconCreate, IconHome, IconPen } from "../icons";
import MenuItem from "./Menuitem";

export default function LateralMenu() {
    return (
        <aside>
            <ul>
                <MenuItem url="/" text="Início" icon={IconHome} />
                <MenuItem url="/CreateTask" text="Criar Tarefa" icon={IconCreate} />
                <MenuItem url="/EdtTask" text="Editar Tarefa" icon={IconPen} />
            </ul>
        </aside>
    )
}