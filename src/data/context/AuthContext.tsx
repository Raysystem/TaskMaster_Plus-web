import { createContext, useEffect, useState } from "react";
import User from "../../model/User.model";
import route from 'next/router';
import { deleteCookie, setCookie } from 'cookies-next'

const AppContext = createContext({
    cad: null,
    loading: false,
    user: null,
    logout: null,
    login: null
})
function cookie(logado: boolean) {
    if (logado) {
        var date = new Date();
        setCookie('user-task-master-auth', logado, {
            expires: new Date(date.setDate(date.getDate() + 7))
        })
    } else deleteCookie('user-task-master-auth')
}
export function AppProvider(props) {
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState<User>(null)
    async function configSession(user) {
        if (user?.email) {
            setUser(user)
            localStorage.setItem('userTaskMaster', JSON.stringify(user))
            cookie(true)
            setLoading(false)
            return user.email
        } else {
            setUser(null)
            cookie(false)
            setLoading(false)
            localStorage.removeItem('token')
            localStorage.removeItem('userTaskMaster')
            return false
        }
    }
    async function login(user): Promise<void> {
        setLoading(true)
        const res = await fetch(`https://orthodox-pattie-saysystem.koyeb.app/auth`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await res.json();
        localStorage.setItem('token', data.accessToken)
        configSession(data.user)
        route.push('/')
        setLoading(false)
        return data
    }
    async function cad(user): Promise<void> {
        setLoading(true)
        const resp = await fetch(`https://orthodox-pattie-saysystem.koyeb.app/user`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await resp.json()
        setLoading(false)
        return data
    }
    async function logout() {
        try {
            setLoading(true)
            // await configSession(null)
            console.log('tentando sair')
            // route.push('/auth')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('userTaskMaster'))
        if(token) configSession(user)
        setLoading(false)
    }, [])
    return (
        <AppContext.Provider value={{ cad, loading, user, logout, login }}>{props.children}</AppContext.Provider>
    )
}
export default AppContext
export const AppConsumer = AppContext.Consumer