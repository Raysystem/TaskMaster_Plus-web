import { createContext, useEffect, useState } from "react";
import User from "../../model/User.model";
import router from 'next/router';
import { deleteCookie, setCookie } from 'cookies-next'

const AppContext = createContext({
    cad: null,
    loading: false,
    user: null,
    logout: null,
    login: null,
    getTasks: null,
    goTo: null,
    edt: null,
    getSession: null,
    checkCloncluded: null,
    del: null,
    createTask: null,
    edtTask: null,
    getTask: null
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
    // funções de sessao e login
    async function configSession(use) {
        if (use?.email) {
            setUser(use)
            localStorage.setItem('userTaskMaster', JSON.stringify(use))
            cookie(true)
            setLoading(false)
            return use.email
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
        return fetch(`https://orthodox-pattie-saysystem.koyeb.app/auth`, {
            method: 'POST',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json()).then(data => {
            localStorage.setItem('token', data.accessToken)
            configSession(data.user)
            return data
        })
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
            await configSession(null)
            router.push('/auth')
            setLoading(true)
        } finally {
            setLoading(false)
        }
    }
    function getSession() {
        return user
    }
    //fim das funçoes de sessao e login
    function getTasks(): Promise<void> {
        setLoading(true)
            return fetch('https://orthodox-pattie-saysystem.koyeb.app/task',{
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
                .then((data) => {
                setLoading(false)
                return data;
                }).catch(err => { setLoading(false); return err });
    }
    async function getTask(id): Promise<void> {
        setLoading(true)
        return fetch(`https://orthodox-pattie-saysystem.koyeb.app/task/${id}`, {
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            }
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                return data
            })
    }
    async function createTask(form): Promise<void> {
        setLoading(true)
            return fetch(`https://orthodox-pattie-saysystem.koyeb.app/task`, {
            method: 'POST',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        })
            .then((response) => response.json())
                .then((data) => { setLoading(false); return data });
    }
    function edtTask(id, form): Promise<void> {
        setLoading(true)
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        };
        return fetch(`https://orthodox-pattie-saysystem.koyeb.app/task/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => { setLoading(false); router.push('/') });
    }
    function checkCloncluded(id, tasks) {
        setLoading(true)
        const obj = tasks.find(t => t.id === id)
        obj.concluded = true
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: `${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        };
            fetch(`https://orthodox-pattie-saysystem.koyeb.app/task/${id}`, requestOptions)
            .then(response => response.json())
            .then(data => { setLoading(false); return data });
    }
    function del(id): Promise<void> {
        setLoading(true)
            return fetch(`https://orthodox-pattie-saysystem.koyeb.app/task/${id}`,
            {
                method: 'DELETE',
                headers: {
                    Authorization: `${localStorage.getItem('token')}`,
                    'Content-Type': 'application/json',
                },
            }).then((res) => { res.json() }).then(data => { setLoading(false); return data})
    }
    function edt(id) {
        goTo(`/CreateTask/?id=${id}`)
    }
    function goTo(route = '/CreateTask') {
        router.push(route)
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const user = JSON.parse(localStorage.getItem('userTaskMaster'))
        if (token) configSession(user)
        setLoading(false)
    }, [])
    return (
        <AppContext.Provider value={{
            cad,
            loading,
            user,
            logout,
            login,
            getTasks,
            goTo,
            edt,
            getSession,
            checkCloncluded,
            del,
            createTask,
            edtTask,
            getTask
        }}>{props.children}</AppContext.Provider>
    )
}
export default AppContext
export const AppConsumer = AppContext.Consumer