import { createContext, useEffect, useState } from "react";
import User from "../../model/User.model";
import route from 'next/router';
interface AuthContextInterface {
    user?: User;
    logout?: () => Promise<void>;
    cadUser?: (user:any) => Promise<void>;
    loading?: boolean;
}
const AuthContext = createContext<AuthContextInterface>({})
// function cookie(logado: boolean) {
//     if (logado) {
//         Cookies.set('user-task-master-auth', logado, {
//             expires: 7
//         })
//     } else Cookies.remove('user-task-master-auth')
// }
export function AuthProvider(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)
    async function configSession(usuario) {
        console.log(usuario)
        if (usuario) {
            // user = usuario
            // cookie(true)
            // setLoading(false)
            return usuario.email
        } else {
            // setUser(null)
            // cookie(false)
            // setLoading(false)
            return false
        }
    }
    async function cadUser(user: any) {
        const res = await fetch(`https://orthodox-pattie-saysystem.koyeb.app/user`, {
            // const res = await fetch(`http://localhost:8080/user`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (res.ok) {
            const data = await res.json();
            console.log(data)
            return data
        }
    }
    // async function logout() {
    //     try {
    //         setLoading(true)
    //         // await configSession(null)
    //         console.log('tentando sair')
    //         route.push('/auth')
    //     } finally {
    //         setLoading(false)
    //     }
    // }
    // useEffect(() => { setLoading(false) }, [])
    return (
        <AuthContext.Provider value={{ user, cadUser }}>{props.children}</AuthContext.Provider>
    )
}
export default AuthContext