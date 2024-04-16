interface ContentProps {
    children?: any,
}
export default function Content(props: ContentProps) {
    return (
        <div className="grid grid-rows-1 grid-cols-1 gap-4 w-sreen mt-7">
           {props.children}
        </div>
    )
}