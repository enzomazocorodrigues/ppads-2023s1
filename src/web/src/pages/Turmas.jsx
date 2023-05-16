import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import Table from "../components/Table"
import { Plus } from "@phosphor-icons/react"
import baseApiUrl from "../utils/base-api-url"
import headers from "../utils/headers"

function Turmas() {
  const columns = [
    { name: 'Id', field: 'id' },
    { name: 'Série', field: 'serie' },
    { name: 'Número de alunos', field: '_count.alunos' },
  ]
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [turma, setTurma] = useState({
    id: null,
    serie: ""
  })

  async function getData() {
    const response = await fetch(`${baseApiUrl}/turmas`, { headers })
    const { data } = await response.json()
    return data
  }

  useEffect(() => {
    getData().then(setData)
  }, [])

  async function onCreate() {
    setTurma({ id: null, serie: "" })
    setIsEdit(false)
    setShowModal(true)
  }

  async function onEdit({ id, serie }) {
    setTurma({ id, serie })
    setIsEdit(true)
    setShowModal(true)
  }

  async function onDelete({ id }) {
    await fetch(`${baseApiUrl}/turmas/${id}`, {
      method: "DELETE",
      headers,
    })

    const data = await getData()
    setData(data)
  }

  async function onConfirm() {
    if (isEdit) {
      await fetch(`${baseApiUrl}/turmas/${turma.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(turma)
      })
    } else {
      await fetch(`${baseApiUrl}/turmas`, {
        method: "POST",
        headers,
        body: JSON.stringify(turma)
      })
    }

    const data = await getData()
    setData(data)
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Turmas</h2>
          <Modal
            show={showModal}
            setShow={setShowModal}
            title="Turma"
            confirmText={isEdit ? 'Alterar turma' : 'Adicionar turma'}
            trigger={
              <button onClick={onCreate} type="button" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center">
                <Plus weight="bold" className="mr-2"></Plus>
                Adicionar turma
              </button>
            }
            onConfirm={onConfirm}
          >
            <form className="mt-6">
              <input type="text" value={turma.serie} onChange={(e) => setTurma({ ...turma, serie: e.target.value })} placeholder="Série" className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" />
            </form>
          </Modal>
      </div>
      <Table columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
    </>
  )
}

export default Turmas
