import AvatarUsuario from "./AvatarUsuario"
import Title from "./Title"

interface TopBarProps {
    title: string,
    subTitle: string
}
export default function TopBar(props: TopBarProps) {
    return (
        <div className="flex justify-between">
            <div>
            <Title title={props.title} subTitle={props.subTitle} />
            </div>
            <div>
            <AvatarUsuario/>
            </div>
        </div>
    )
}