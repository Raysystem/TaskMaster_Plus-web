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
    return AuthGuard (
        <div className={`flex h-screen w-screen`}>
            <LateralMenu />
            <div className={`
            flex
            flex-col
             w-full
             h-auto
             p-7
             bg-gray-300
             `}>
            <TopBar title={props.title} subTitle={props.subTitle} />
            <Content>
                {props.children}
            </Content>
            </div>
        </div>
    )
}