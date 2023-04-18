import { useEffect, useState } from "react"
import Modal from "../components/Modal"
import Table from "../components/Table"
import { Plus } from "@phosphor-icons/react"
import baseApiUrl from "../utils/base-api-url"
import headers from "../utils/headers"
import Select from "../components/Select"

function Alunos() {
  const columns = [
    { name: 'Id', field: 'id' },
    { name: 'Nome', field: 'nome' },
    { name: 'Responsável', field: 'responsavel.nome' },
    { name: 'Turma', field: 'turma.serie' },
    { name: 'Número de faltas', field: 'numeroDeFaltas' },
  ]
  const [data, setData] = useState([])
  const [turmas, setTurmas] = useState([])
  const [responsaveis, setResponsaveis] = useState([])
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [aluno, setAluno] = useState({
    id: null,
    nome: "",
    idResponsavel: null,
    idTurma: null
  })

  async function getData() {
    const response = await fetch(`${baseApiUrl}/alunos`)
    const { data } = await response.json()
    return data
  }

  async function getResponsaveis() {
    const response = await fetch(`${baseApiUrl}/alunos/responsaveis`)
    const { data } = await response.json()
    return data
  }

  async function getTurmas() {
    const response = await fetch(`${baseApiUrl}/turmas`)
    const { data } = await response.json()
    return data
  }

  useEffect(() => {
    console.log(aluno)
  }, [aluno])

  useEffect(() => {
    Promise.all([
      getData(),
      getTurmas(),
      getResponsaveis()
    ])
    .then(([data, turmas, responsaveis]) => {
      setData(data)
      setTurmas(turmas.map(({ id, serie }) => ({ value: id, text: serie })))
      setResponsaveis(responsaveis.map(({ id, nome }) => ({ value: id, text: nome })))
    })
  }, [])

  async function onCreate() {
    setAluno({ id: null, nome: "", idResponsavel: null, idTurma: null })
    setIsEdit(false)
    setShowModal(true)
  }

  async function onEdit({ id, nome, idResponsavel, idTurma }) {
    setAluno({ id, nome, idResponsavel, idTurma })
    setIsEdit(true)
    setShowModal(true)
  }

  async function onDelete({ id }) {
    await fetch(`${baseApiUrl}/alunos/${id}`, {
      method: "DELETE",
      headers,
    })

    const data = await getData()
    setData(data)
  }

  async function onConfirm() {
    if (isEdit) {
      await fetch(`${baseApiUrl}/alunos/${aluno.id}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(aluno)
      })
    } else {
      await fetch(`${baseApiUrl}/alunos`, {
        method: "POST",
        headers,
        body: JSON.stringify(aluno)
      })
    }

    const data = await getData()
    setData(data)
  }

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Alunos</h2>
          <Modal
            show={showModal}
            setShow={setShowModal}
            title="Aluno"
            confirmText={isEdit ? 'Alterar aluno' : 'Adicionar aluno'}
            trigger={
              <button onClick={onCreate} type="button" className="flex items-center text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center">
                <Plus weight="bold" className="mr-2"></Plus>
                Adicionar aluno
              </button>
            }
            onConfirm={onConfirm}
          >
            <form className="mt-6 flex flex-col gap-4">
              <input type="text" value={aluno.nome} onChange={(e) => setAluno({ ...aluno, nome: e.target.value })} placeholder="Nome" className="w-full px-4 py-2 border border-gray-300 rounded-lg placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-white" />
              <Select value={aluno.idResponsavel} onValueChange={(value) => setAluno({ ...aluno, idResponsavel: Number(value) })} items={responsaveis} placeholder="Selecione o responsável"></Select>
              <Select value={aluno.idTurma} onValueChange={(value) => setAluno({ ...aluno, idTurma: Number(value) })} items={turmas} placeholder="Selecione a turma"></Select>
            </form>
          </Modal>
      </div>
      <Table columns={columns} data={data} onEdit={onEdit} onDelete={onDelete} />
    </>
  )
}

export default Alunos
