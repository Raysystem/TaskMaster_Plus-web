import { useEffect, useState } from "react";
import Layout from "../components/template/Layout";
import router from "next/router"
import { IconCheck, IconPen, IconTrash } from "../components/icons";

export default function Home() {
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    getTasks()
  }, [])
  function getTasks() {
    fetch('https://orthodox-pattie-saysystem.koyeb.app/task')
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setTasks(data)
      })
  }
  function renderList() {
    if (tasks.length) {
      return tasks.map((task, i) => {
        return (
          <div className="w-full md:w-1/3 items-center bg-gray-400 py-3 px-5 my-2 ml-1 border border-gray-500 rounded-lg">
            <span key={task.id} className="ml-3 text-gray table-auto">#{i + 1} - <strong className="text-xl">{task.titleTask}</strong>
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
              {task.concluded ? (<button disabled className="float-start bg-green-400 rounded-lg px-3 py-1">{IconCheck}</button>) : (<button onClick={()=>checkCloncluded(task.id)} className="float-start bg-green-400 rounded-lg px-3 py-1">Finalizar Tarefa</button>)}
              <button onClick={() => del(task.id)} className="float-right bg-red-400 rounded-lg px-3 py-1 ml-2">{IconTrash}</button>
              {!task.concluded ? (<button onClick={() => edt(task.id)} className="float-end bg-indigo-400 rounded-lg px-3 py-1">{IconPen}</button>): null}
            </span>
          </div>
        )
      })
    } else return <div>lista vazia</div>
  }
  function edt(id) {
    goTo(`/CreateTask/?id=${id}`)
  }
  function checkCloncluded(id) {
    const obj = tasks.find(t => t.id === id)
    obj.concluded = true
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)
    };
    fetch(`https://orthodox-pattie-saysystem.koyeb.app/task/${id}`, requestOptions)
      .then(response => response.json())
      .then(data => { getTasks() });
  }
  function del(id) {
    fetch(`https://orthodox-pattie-saysystem.koyeb.app/task/${id}`, { method: 'DELETE' }).then((res) => getTasks())
  }
  function goTo(route = '/CreateTask') {
    router.push(route)
  }
  return (
    <Layout title="Pagina Inicial" subTitle="Lista De Tarefas">
      <button onClick={() => goTo()} className="w-full bg-indigo-500 hover:bg-indigo-400 text-white rounded-lg px-4 py-3">
        Criar Tarefa
      </button>
      <div className="w-full flex flex-col md:flex-row">
        {renderList()}
      </div>
    </Layout>
  );
}
