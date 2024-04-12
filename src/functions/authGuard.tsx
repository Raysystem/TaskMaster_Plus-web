import UseAuth from "../data/hook/UseAuth";
import Image from "next/image";
import load from "../../public/loading.gif";
import router from "next/router";
import Head from "next/head";
export default function authGuard(jsx) {
    const { user, loading } = UseAuth()
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
            <div className="flex justify-center items-center h-screen">
                <Image src={load} alt="carregando"/>
            </div>
        )
    }
    if (!loading && user?.email) return renderCont()
    else if (loading) return renderLoading()
    else {
        router.push('/auth')
        return null
    }
}