import { useEffect, useState } from "react";
import Layout from "../components/template/Layout";
import { IconCheck, IconPen, IconTrash, IconWarning } from "../components/icons";
import useAppData from "../data/hook/useAppData";
// import Drag from "../components/drag";

export default function Home() {
  const ctx = useAppData()
  const [erro, setErro] = useState(null)
  const [success, setSuccess] = useState('')
  const [tasks, setTasks] = useState([])
  useEffect(() => { getTasks()
  }, [])
  async function getTasks() {
    const resp = await ctx.getTasks()
    console.log(resp)
    console.log(ctx.user)
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
  function renderSuccess(msg, timeMs = 5000) {
    setSuccess(msg)
    setTimeout(() => {
      setSuccess(null)
    }, timeMs);
  }
  function renderList() {
    if (tasks.length) {
      return tasks.map((task, i) => {
        return (
          <div key={task.id} className={`items - center py-3 px-5 my-2 border ${task.status === 0 ? 'border-yellow-500' : null} rounded-lg`} >
            {/* <div key={task.id} className="w-full items-center py-3 px-5 my-2 ml-1 border border-gray-500 rounded-lg"> */}
            <span className="ml-3 text-gray table-auto">#{i + 1} - <strong className="text-xl">{task.titleTask}</strong>
              <div className="flex flex-row my-.2">
                ID: {task.id} <br />
              </div>
              <div className="flex flex-row my-.2">
                Descrição: {task.description}  <br />
              </div>
              <div className="flex flex-row my-1">
                Data Conclusão: {(task.date_conclusion).substr(0, 10).split('-').reverse().join('/')} <br />
              </div>
              <div className="w-full flex flex-row my-.2">
                Prioridade:
                <span>
                  {task.priority === 1 ? (<button disabled className="bg-red-400 rounded-lg px-3 py-1 ml-2">ALTA</button>) : null}
                </span>
                <span>
                  {task.priority === 2 ? (<button disabled className="bg-yellow-400 rounded-lg px-3 py-1 ml-2">MÉDIA</button>) : null}
                </span>
                <span>
                  {task.priority === 3 ? (<button disabled className="bg-indigo-400 rounded-lg px-3 py-1">BAIXA</button>) : null}
                </span>
              </div>
              <hr className="my-3" />
              <div className="grid grid-rows-1 md:grid-cols-3 gap-4 mt-3">
              {task.status === 2 ? (<button disabled className="bg-green-400 rounded-lg px-3 py-1">{IconCheck}</button>) : null}
              {task.status === 1 ? (<button onClick={() => ctx.checkCloncluded(task.id, tasks)} className="bg-green-400 rounded-lg px-3 py-1">Finalizar Tarefa</button>):null}
                <button onClick={() => del(task.id)} className="bg-red-400 rounded-lg px-3 py-1 ml-2 items-center justify-center">{IconTrash}</button>
              {!task.concluded ? (<button onClick={() => ctx.edt(task.id)} className="bg-indigo-400 rounded-lg px-3 py-1">{IconPen}</button>) : null}
              </div>
            </span>
          </div>
        )
      })
    }
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
      {/* <div><Drag></Drag></div> */}
      <div className="grid grid-rows-1 md:grid-cols-3 gap-4 mt-3">
        {/* <div className="bg-white p-3 rounded-lg"> */}
          {/* <h5>Pendentes</h5> */}
          {renderList()}
        {/* </div> */}
        {/* <div className="bg-white p-3 rounded-lg">
          <h5>Em Andamento</h5>
        </div>
        <div className="bg-white p-3 rounded-lg">
          <h4>Concluidas</h4>
        </div> */}
      </div>
    </Layout>
  );
}
