import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import Table from "../components/Table"
import { Plus } from "@phosphor-icons/react"
import baseApiUrl from "../utils/base-api-url"
import headers from "../utils/headers"

function Professores() {
  const columns = [
    { name: 'Id', field: 'id' },
    { name: 'Nome', field: 'nome' },
    { name: 'E-mail', field: 'email' },
    { name: 'Telefone', field: 'telefone' },
  ]
  const [data, setData] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [professor, setProfessor] = useState({
    id: null,
    nome: "",
    email: "",
    telefone: ""
  })

  async function getData() {
    const response = await fetch(`${baseApiUrl}/professores`, { headers })
    const { data } = await response.json()
    return data
  }

  useEffect(() => {
    getData().then(setData)
  }, [])

  async function onCreate() {
    setProfessor({ id: null, nome: "", email: "", telefone: "" })
    setIsEdit(false)
    setShowModal(true)
  }

  async function onEdit({ id, nome, email, telefone }) {
    setProfessor({ id, nome, email, telefone })
    setIsEdit(true)
    setShowModal(true)
  }

  async function onDelete({ id }) {
    await fetch(`${baseApiUrl}/professores/${id}`, {
      method: "DELETE",
      headers,
    })

    const data = await getData()
    setData(data)
  }

  async function onConfirm() {
    if (isEdit) {
      await fetch(`${baseApiUrl}/professores/${professor.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(professor)
      })
    } else {
      await fetch(`${baseApiUrl}/professores`, {
        method: "POST",
        headers,
        body: JSON.stringify(professor)
      })
    }

    const data = await getData()
    setData(data)
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Professores</h2>
        <Modal
          show={showModal}
          setShow={setShowModal}
          title="Professor"
          confirmText={isEdit ? 'Alterar professor' : 'Adicionar professor'}
          trigger={
            <button onClick={onCreate} type="button" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center">
              <Plus weight="bold" className="mr-2"></Plus>
              Adicionar professor
            </button>
          }
          onConfirm={onConfirm}
        >
          <form className="mt-6 flex flex-col gap-4">
            <input type="text" value={professor.nome} onChange={(e) => setProfessor({ ...professor, nome: e.target.value })} placeholder="Nome" className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" />
            <input type="email" value={professor.email} onChange={(e) => setProfessor({ ...professor, email: e.target.value })} placeholder="E-mail" className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" />
            <input type="text" value={professor.telefone} onChange={(e) => setProfessor({ ...professor, telefone: e.target.value })} placeholder="Telefone" className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" />
          </form>
        </Modal>
      </div>
      <Table columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
    </>
  )
}

export default Professores
