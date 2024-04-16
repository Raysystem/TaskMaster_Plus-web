import AuthGuard from "../../functions/authGuard"
import Content from "./Content"
import LateralMenu from "./LateralMenu"
import TopBar from "./TopBar"

interface LayoutProps {
    title: string,
    subTitle: string,
    children?: any
}
export default function Layout(props: LayoutProps) {
    return AuthGuard(
        <div className="flex w-screen bg-stone-100">
            <LateralMenu />
            <div className="flex flex-col w-screen p-4 pr-8 h-full">
                <TopBar title={props.title} subTitle={props.subTitle} />
                <Content>
                    {props.children}
                </Content>
            </div>
        </div>
    )
}