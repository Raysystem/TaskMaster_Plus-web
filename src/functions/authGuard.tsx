import Image from "next/image";
import load from "../../public/loading.gif";
import router from "next/router";
import Head from "next/head";
import useAppData from "../data/hook/useAppData";
export default function AuthGuard(jsx) {
    const ctx = useAppData()
    function renderCont() {
        return (
            <>
                <Head>
                    <script dangerouslySetInnerHTML={{
                        __html: `
                        if(!document.cookie?.includes("user-task-master-auth")){
                            window.location.href = "/auth"
                        }
                        `
                    }}>

                    </script>
                </Head>
            {jsx}
            </>
        )
    }
    function renderLoading() {
        return (
            <div className="flex justify-center items-center h-screen bg-transparent">
                <Image src={load} alt="carregando"/>
            </div>
        )
    }
    if (!ctx.loading && ctx.user?.email) return renderCont()
    else if (ctx.loading) return renderLoading()
    else {
        router.push('/auth')
        return null
    }
}