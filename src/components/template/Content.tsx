interface ContentProps {
    children?: any,
}
export default function Content(props: ContentProps) {
    return (
        <div className={`
        h-dvh flex flex-col mt-7
        `}>
           {props.children}
        </div>
    )
}