import Link from "next/link";
interface MenuItemProps {
    url?: string;
    text: string;
    icon: any;
    className?: string;
    click?: (event: any) => void;
}
export default function MenuItem(props: MenuItemProps) {
    function renderLink() {
        return (
            <div className="flex flex-col justify-center items-center h-20 w-20 text-slate-800 ${props.className}">
                {props.icon}
                <span className="text-xs font-light text-slate-800">{props.text}</span>
            </div>
        )
    }
    return (
        <li className="hover:bg-gray-100 cursor-pointer" onClick={props.click}>
            {props.url ? (
                <Link href={props.url}>
                    {renderLink()}
                </Link>
            ) : (
                renderLink()
            )}
        </li>
    )
}