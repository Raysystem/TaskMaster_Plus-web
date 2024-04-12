import Title from "./Title"

interface TopBarProps {
    title: string,
    subTitle: string
}
export default function TopBar(props: TopBarProps) {
    return (
        <div>
            <Title title={props.title} subTitle={props.subTitle}/>
        </div>
    )
}