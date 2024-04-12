import { createContext, useEffect, useState } from "react";
import User from "../../model/User.model";
import route from 'next/router';
import * as Cookies from 'js-cookie';
interface AuthContextInterface {
    user?: User
    login?: () => Promise<void>
    logout?: () => Promise<void>
    loading?: boolean
}
const AuthContext = createContext<AuthContextInterface>({})
async function userDb(user:any):Promise<User> {
    // aqui entra o fecht para buscar na api
    return {
        id: 1,
        name: '',
        email: '',
        typeUser: 1,
        token: ''
    }
}
function cookie(logado: boolean) {
    if (logado) {Cookies.set('user-task-master-auth', logado, {
        expires: 7
    })} else Cookies.remove('user-task-master-auth')
}
export function AuthProvider(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)
    async function configSession(usuario) {
        if (usuario) {
            const user = await userDb(usuario)
            setUser(user)
            cookie(true)
            setLoading(false)
            return usuario.email
        } else {
            setUser(null)
            cookie(false)
            setLoading(false)
            return false
        }
    }
    async function login() {
        console.log('tentando logar')
        route.push('/')
        //usar a função configsessao aqui
    }
    async function logout() {
        try {
            setLoading(true)
            // await configSession(null)
            console.log('tentando sair')
            route.push('/auth')
        } finally {
            setLoading(false)
        }
    }
    useEffect(()=> {},[])
    return (
        <AuthContext.Provider value={{user, login, logout, loading}}>{ props.children}</AuthContext.Provider>
    )
}
export default AuthContext