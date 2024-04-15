import AuthGuard from "../../functions/AuthGuard"
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
             p-7
             bg-gray-100
             `}>
            <TopBar title={props.title} subTitle={props.subTitle} />
                <Content>
                {props.children}
            </Content>
            </div>
        </div>
    )
}