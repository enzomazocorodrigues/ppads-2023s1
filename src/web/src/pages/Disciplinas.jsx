import { useEffect, useState } from "react"
import Table from "../components/Table"
import { Plus } from "@phosphor-icons/react"
import Modal from "../components/Modal"
import headers from "../utils/headers"
import baseApiUrl from "../utils/base-api-url"

function Disciplinas() {
  const columns = [
    { name: 'Id', field: 'id' },
    { name: 'Nome', field: 'nome' },
    { name: 'Número de aulas', field: 'numeroDeAulas' },
  ]
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [disciplina, setDisciplina] = useState({
    id: null,
    nome: "",
    numeroDeAulas: null
  })

  async function getData() {
    const response = await fetch(`${baseApiUrl}/disciplinas`, { headers })
    const { data } = await response.json()
    return data
  }

  useEffect(() => {
    getData().then(setData)
  }, [])

  async function onCreate() {
    setDisciplina({ id: null, nome: "", numeroDeAulas: null })
    setIsEdit(false)
    setShowModal(true)
  }

  async function onEdit({ id, nome, numeroDeAulas }) {
    setDisciplina({ id, nome, numeroDeAulas })
    setIsEdit(true)
    setShowModal(true)
  }

  async function onDelete({ id }) {
    await fetch(`${baseApiUrl}/disciplinas/${id}`, {
      method: "DELETE",
      headers,
    })

    const data = await getData()
    setData(data)
  }

  async function onConfirm() {
    if (isEdit) {
      await fetch(`${baseApiUrl}/disciplinas/${disciplina.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(disciplina)
      })
    } else {
      await fetch(`${baseApiUrl}/disciplinas`, {
        method: "POST",
        headers,
        body: JSON.stringify(disciplina)
      })
    }

    const data = await getData()
    setData(data)
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Disciplinas</h2>
          <Modal
            show={showModal}
            setShow={setShowModal}
            title="Disciplina"
            confirmText={isEdit ? 'Alterar disciplina' : 'Adicionar disciplina'}
            trigger={
              <button onClick={onCreate} type="button" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center">
                <Plus weight="bold" className="mr-2"></Plus>
                Adicionar disciplina
              </button>
            }
            onConfirm={onConfirm}
          >
            <form className="mt-6 flex flex-col gap-4">
              <input type="text" value={disciplina.nome} onChange={(e) => setDisciplina({ ...disciplina, nome: e.target.value })} placeholder="Nome" className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" />
              <input type="number" value={disciplina.numeroDeAulas} onChange={(e) => setDisciplina({ ...disciplina, numeroDeAulas: e.target.value })} placeholder="Número de aulas" className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" />
            </form>
          </Modal>
      </div>
      <Table columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
    </>
  )
}

export default Disciplinas
