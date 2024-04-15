import { useEffect, useState } from "react"
import { IconCheck, IconWarning } from "../components/icons"
import Layout from "../components/template/Layout"
import InputAuth from "../components/auth/InputAuth";
import { useRouter } from "next/router";
import useAppData from "../data/hook/useAppData";

export default function CreateTask() {
    const ctx = useAppData()
    const route = useRouter()
    const [erro, setErro] = useState(null)
    const [success, setSuccess] = useState('')
    const [userId, setUserId] = useState(ctx.getSession()?.id)
    const [titleTask, setTitleTask] = useState('')
    const [description, setDescription] = useState('')
    const [concluded, setCconcluded] = useState(false)
    const [status, setStatus] = useState(0)
    const [date_conclusion, setDateConclusion] = useState('')
    const [priority, setPriority] = useState(1)
    const id = route.query.id

    async function createTask() {
        try {
            const res = await ctx.createTask(getForm())
            console.log(res)
            if (!res.message) {        
                renderSuccess('Tarefa criada com sucesso!')
                resetForm()
            }
        } catch (error) {
            renderErro(error.message)
        }
    }
    async function getTask() {
        if (id) {
            const data = await ctx.getTask(id)
            setTitleTask(data.titleTask)
            setDescription(data.description)
            setDateConclusion(data.date_conclusion.split('T')[0])
            setPriority(data.priority)
        }
    }
    async function edtTask() {
        await ctx.edtTask(id, getForm())
    }

    function getForm(){
        const obj = {
            userId,
            titleTask,
            description,
            concluded,
            status,
            date_conclusion,
            priority
        }
        return obj
    }

    function renderErro(msg, timeMs = 5000) {
        setErro(msg)
        setTimeout(() => {
            setErro(null)
        }, timeMs);
    }
    function renderSuccess(msg, timeMs = 5000) {
        setSuccess(msg)
        setTimeout(() => {
            setSuccess(null)
        }, timeMs);
    }
    function resetForm() {
        setTitleTask('')
        setDescription('')
        setDateConclusion('')
    }
    useEffect(() => {getTask()}, [])
    return (
        <Layout title="Criar Tarefa" subTitle="Aqui você vai criar suas tarefas.">
            <div>
                {erro ? (
                    <div className="flex items-center bg-red-400 text-white py-3 px-5 my-2 border border-red-700 rounded-lg">
                        {IconWarning}
                        <span className="ml-3 text-sm">{erro}</span>
                    </div>
                ) : false}
                {success ? (
                    <div className="flex items-center bg-green-500 py-3 px-5 my-2 border border-green-700 rounded-lg">
                        {IconCheck}
                        <span className="ml-3 text-sm">{success}</span>
                    </div>
                ) : false}
            </div>
            <div className="w-full flex flex-col md:flex-row">
                <div className="w-full md:w-1/4 mr-3">
                    <InputAuth
                        label="Titulo da Tarefa"
                        type="text"
                        value={titleTask}
                        valueChanged={setTitleTask}
                        required
                    />
                </div>
                <div className="w-full md:w-1/4 mr-3">
                    <InputAuth
                        label="Descrição da Tarefa"
                        type="text"
                        value={description}
                        valueChanged={setDescription}
                        required
                    />
                </div>
                <div className="w-full md:w-1/4 mr-3">
                    <InputAuth
                        label="Data Prevista de Conclusão"
                        type="date"
                        value={date_conclusion}
                        valueChanged={setDateConclusion}
                        required
                    />
                </div>
                <div className="w-full md:w-1/4 flex flex-col mt-4">
                    <label className="text-white">Nivel de Prioridade</label>
                    <select
                        value={priority}
                        onChange={(e) => {
                            setPriority(Number(e.target.value));
                        }}
                        className='px-4 py-3 rounded-lg bg-gray-200 text-black mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                    >
                        <option value={1}>ALTA</option>
                        <option value={2}>MÉDIA</option>
                        <option value={3}>BAIXA</option>
                    </select>
                </div>
            </div>
            <hr className="mt-3 border-gray-700" />
            {
                !id ? (
                    <button onClick={createTask} className="bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 mt-3">
                        Salvar Tarefa
                    </button>
                ) : (
                    <button onClick={edtTask} className="bg-red-500 hover:bg-red-400 text-white rounded-lg px-4 py-3 mt-3">
                        Editar Tarefa
                    </button>
                )
            }
        </Layout>
    )
}