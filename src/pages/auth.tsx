import { useState } from "react";
import InputAuth from "../components/auth/InputAuth";
import { IconWarning } from "../components/icons";
import UseAuth from "../data/hook/UseAuth";

export default function Auth() {
    const {user, login} = UseAuth()
    const [modo, setModo] = useState<'login' | 'register'>('login')
    const [erro, setErro] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    function renderErro(msg, timeMs=5000) {
        setErro(msg)
        setTimeout(() => {
            setErro(null)
        }, timeMs);
    }
    function submit() {
        if (modo === 'login') {
            console.log('login');
            renderErro('erro de login')
        }
        else {
            console.log('cadastrar');
            renderErro('erro de cadastro')
        }
    }
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="hidden md:block md:w-1/2">
                <img
                    src="https://source.unsplash.com/random"
                    alt="Imagem aleatória"
                    className="h-sreen w-full object-cover"
                />
            </div>
            <div className="m-10 w-full md:w-1/2">
                <h1 className="text-2xl font-bold mb-5">{modo === 'login' ? 'Entre Com a Sua Conta' : 'Cadastre-se na Plataforma'}</h1>
                {erro ? (
                <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
                    {IconWarning}
                        <span className="ml-3 text-sm">{erro}</span>
                </div>
                ): false}
                <InputAuth
                    label="Email"
                    type="email"
                    value={email}
                    valueChanged={setEmail}
                    required
                />
                <InputAuth
                    label="Senha"
                    type="password"
                    value={password}
                    valueChanged={setPassword}
                    required
                />
                {/* <InputAuth
                label="Confirma Senha"
                type="password"
                value={password}
                notRender={true}
                valueChanged={setPassword}
                required
            /> */}
                <button onClick={login} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3 mt-6">
                    {modo === 'login' ? 'Entrar' : 'Cadastrar'}
                </button>
                {/* <hr className="my-6 border-gray-300 w-full" /> */}
                {/* <button onClick={submit} className="w-full bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 mt-6">
                    Entra com o Google
                </button> */}
                {modo === 'login' ? (
                    <p className="mt-8">
                        Novo por aqui?
                        <a onClick={() => setModo('register')} className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"> Crie uma conta gratuitamente.
                        </a>
                    </p>
                ) : (
                    <p className="mt-8">
                        Já faz parte da nossa comunidade?
                        <a onClick={() => setModo('login')} className="text-blue-500 hover:text-blue-700 font-semibold cursor-pointer"> Entre com a sua conta
                        </a>

                    </p>
                )}
            </div>
        </div>
    )
}