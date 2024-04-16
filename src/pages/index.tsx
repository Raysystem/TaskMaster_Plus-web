import { useEffect, useState } from "react";
import Layout from "../components/template/Layout";
import { IconCheck, IconEnd, IconPen, IconPlay, IconTrash, IconWarning } from "../components/icons";
import useAppData from "../data/hook/useAppData";

export default function Home() {
  const ctx = useAppData()
  const [erro, setErro] = useState(null)
  const [success, setSuccess] = useState('')
  const [tasks, setTasks] = useState([])
  useEffect(() => { getTasks()}, [])
  async function getTasks() {
    const resp = await ctx.getTasks()
    if (resp.error) renderErro('Lista vazia Clique em "Criar Tarefa"!', 7000)
    else setTasks(resp)
  }
  async function del(id) {
    const resp = await ctx.del(id)
    getTasks()
  }
  function renderErro(msg, timeMs = 5000) {
    setErro(msg)
    setTimeout(() => {
      setErro(null)
    }, timeMs);
  }
  async function resetList() {
    
  }
  function renderSuccess(msg, timeMs = 5000) {
    setSuccess(msg)
    setTimeout(() => {
      setSuccess(null)
    }, timeMs);
  }
  function card(array) {
    return array.map((task, i) => {
      return (
        <div key={task.id} className={`items-center bg-white p-2 border mb-2 ${task.status === 0 ? 'border-yellow-500' : null} ${task.status === 1 ? 'border-indigo-400' : null} ${task.status === 2 ? 'border-lime-600' : null} rounded-lg`} >
          <div className="text-slate-800">
            <span className="grid grid-cols-2">
              <div>
                #{i + 1} - <strong className="text-xl">{task.titleTask}</strong>
              </div>
              {task.status === 0 ? (<button disabled className="bg-yellow-500 p-1 rounded-lg h-8">
                PENDENTE
              </button>) : null}
              {task.status === 1 ? (<button disabled className="bg-indigo-400 p-1 rounded-lg h-8">
                EM ANDAMENTO
              </button>) : null}
              {task.status === 2 ? (<button disabled className="bg-lime-600 p-1 rounded-lg h-8">
                CONCLUÍDA
              </button>) : null}
            </span>
            <div className="my-.2">
              ID: {task.id} <br />
            </div>
            <div className="flex flex-row my-.2">
              Descrição: {task.description}  <br />
            </div>
            <div className="flex flex-row my-1">
              Data Conclusão: {(task.date_conclusion).substr(0, 10).split('-').reverse().join('/')} <br />
            </div>
            <div className="grid grid-cols-2">
              <div>
                Prioridade:
              </div>
              <div>
                <span className="float-end">
                  {task.priority === 1 ? (<button disabled className="bg-red-400 rounded-lg px-3 py-1 ml-2">ALTA</button>) : null}
                </span>
                <span className="float-end">
                  {task.priority === 2 ? (<button disabled className="bg-yellow-400 rounded-lg px-3 py-1 ml-2">MÉDIA</button>) : null}
                </span>
                <span className="float-end">
                  {task.priority === 3 ? (<button disabled className="bg-indigo-400 rounded-lg px-3 py-1">BAIXA</button>) : null}
                </span>
              </div>
            </div>
            <hr className="my-3" />
            <div className="grid grid-rows-1 md:grid-cols-3 gap-4 mt-3">
              {task.status === 0 ? (<button onClick={() => { ctx.checkCloncluded(task.id, tasks, false, 1)}} className="bg-indigo-400 rounded-lg py-1 px-1">{IconPlay}</button>) : null}
              {task.status === 1 ? (<button onClick={() => ctx.checkCloncluded(task.id, tasks, true)} className="bg-lime-600 rounded-lg py-1 px-1">{IconEnd}</button>) : null}
              {task.status === 2 ? (<button disabled className="bg-lime-600  rounded-lg py-1 px-1">{IconCheck}</button>) : null}
              {!task.concluded ? (<button onClick={() => ctx.edt(task.id)} className="bg-cyan-500 rounded-lg py-1 px-1">{IconPen}</button>) : null}
              <button onClick={() => del(task.id)} className="items-center justify-center bg-red-400 rounded-lg py-1 px-1">{IconTrash}</button>
            </div>
          </div>
        </div>
      )
    })
  }
  function renderList(list: string) {
    let listResult = []
    if (tasks.length) {
      if (list === 'pendente') {
        listResult = tasks.map(t=> {
          if(t.status === 0) return t
        })
        listResult = returnFiltered(listResult)
        return <>{card(listResult)}</>
      }
      if (list === 'emandamento') {
        listResult = tasks.map(t => {
          if (t.status === 1) return t
        })
        listResult = returnFiltered(listResult)
        return <>{card(listResult)}</>
      }
      if (list === 'concluded') {
        listResult = tasks.map(t => {
          if (t.status === 2) return t
        })
        listResult = returnFiltered(listResult)
        return <>{card(listResult)}</>
      }
    }
  }

  function returnFiltered(array) {
    return array.filter(function (element) {
      return element !== undefined;
    })
  }

  return (
    <Layout title="Pagina Inicial" subTitle="Lista De Tarefas">
      <button onClick={() => ctx.goTo()} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3">
        Criar Tarefa
      </button>
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
      <div className="grid grid-rows-1 md:grid-cols-3 gap-4 mt-3">
        <div className="bg-white p-3 rounded-lg">
          {renderList('pendente')}
        </div>
        <div className="bg-white p-3 rounded-lg">
          {renderList('emandamento')}
        </div>
        <div className="bg-white p-3 rounded-lg">
          {renderList('concluded')}
        </div>
      </div>
    </Layout>
  );
}
