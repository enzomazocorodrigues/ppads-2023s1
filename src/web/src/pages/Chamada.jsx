import { useEffect, useState } from "react"
import { CalendarBlank, UsersThree } from "@phosphor-icons/react"
import { useNavigate } from "react-router-dom"
import baseApiUrl from "../utils/base-api-url"
import headers from "../utils/headers"
import formatDate from "../utils/fomat-date"
import Select from "../components/Select"
import MultipleSelect from "../components/SelectMultiple"
import SuccessModal from "../components/SuccessModal"

function Chamada() {
  const navigate = useNavigate()
  const [professoresOptions, setProfessoresOptions] = useState([])
  const [idProfessor, setIdProfessor] = useState(null)
  const [disciplinasOptions, setDisciplinasOptions] = useState([])
  const [idDisciplinas, setIdDisciplinas] = useState([])
  const [turmasOptions, setTurmasOptions] = useState([])
  const [idTurma, setIdTurma] = useState(null)
  const [alunosOptions, setAlunosOptions] = useState([])
  const [idAlunos, setIdAlunos] = useState([])
  const [showSuccess, setShowSuccess] = useState(false)
  const today = new Date()

  async function getProfessoresOptions() {
    const response = await fetch(`${baseApiUrl}/professores/options`, { headers })
    const { data } = await response.json()
    return data
  }

  async function getDisciplinasOptions() {
    const response = await fetch(`${baseApiUrl}/disciplinas/options`, { headers })
    const { data } = await response.json()
    return data
  }

  async function getTurmasOptions() {
    const response = await fetch(`${baseApiUrl}/turmas/options`, { headers })
    const { data } = await response.json()
    return data
  }

  async function getAlunosOptions(idTurma) {
    const response = await fetch(`${baseApiUrl}/alunos/options?idTurma=${idTurma}`, { headers })
    const { data } = await response.json()
    return data
  }

  function isAlunoAusente(idAluno) {
    return idAlunos.includes(idAluno)
  }

  function toggleAlunoAusente(idAluno) {
    if (!isAlunoAusente(idAluno)) {
      setIdAlunos(alunos => [...alunos, idAluno])
    } else {
      setIdAlunos(idAlunos.filter(idAlunoAusente => idAlunoAusente != idAluno))
    }
  }

  function isChamadaValid() {
    return idProfessor && idDisciplinas.length && idTurma && alunosOptions.length
  }

  async function registrarChamada() {
    if (!isChamadaValid()) return

    const chamada = {
      data: today,
      idProfessor,
      idDisciplinas,
      idTurma,
      idAlunos
    }

    await fetch(`${baseApiUrl}/chamadas`, {
      method: "POST",
      headers,
      body: JSON.stringify(chamada)
    })

    setShowSuccess(true)
  }

  useEffect(() => {
    Promise.all([
      getProfessoresOptions(),
      getDisciplinasOptions(),
      getTurmasOptions()
    ]).then(([professores, disciplinas, turmas]) => {
      setProfessoresOptions(professores)
      setDisciplinasOptions(disciplinas)
      setTurmasOptions(turmas)
    })
  }, [])

  useEffect(() => {
    setIdAlunos([])
    setAlunosOptions([])
    if (idTurma) {
      getAlunosOptions(idTurma).then(setAlunosOptions)
    }
  }, [idTurma])

  return (
    <div className="grid grid-cols-3 gap-4 h-screen divide-x">
      <div className="col-span-1 flex flex-col gap-8">
        <h1 className="text-3xl font-bold whitespace-nowrap text-slate-900">Fazer chamada</h1>
        <div className="flex px-4 py-2 border border-gray-300 rounded-lg bg-gray-50">
          <CalendarBlank className="text-slate-700 mr-2" size={24}></CalendarBlank>
          <span>{formatDate(today)}</span>
        </div>
        <div className="flex flex-col gap-4">
          <Select
            value={idProfessor}
            items={professoresOptions}
            placeholder={'Selecione o professor'}
            onValueChange={(value) => setIdProfessor(value)}
          ></Select>
          <MultipleSelect
            value={idDisciplinas}
            items={disciplinasOptions}
            placeholder={'Selecione as disciplinas'}
            onValueChange={(value) => setIdDisciplinas(value)}
          ></MultipleSelect>
          <Select
            value={idTurma}
            items={turmasOptions}
            placeholder={'Selecione a turma'}
            onValueChange={(value) => setIdTurma(value)}
          ></Select>
        </div>
        <div className="flex gap-6 items-center">
          <a href="/" className="font-medium rounded-lg text-gray-400 hover:text-gray-500 focus:text-gray-500 focus:underline ring-0 outline-none">Cancelar</a>
          <button onClick={registrarChamada} disabled={!isChamadaValid()} className={`flex items-center text-white focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center ${!isChamadaValid() ? 'bg-gray-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
            Registrar chamada
          </button>
        </div>
      </div>
      <div className="col-span-2 flex flex-col gap-8 pl-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold whitespace-nowrap text-slate-900">Lista de alunos</h1>
          {!!idAlunos.length && <span className="text-sm font-medium text-red-600">{idAlunos.length} aluno{idAlunos.length > 1 && 's'} ausente{idAlunos.length > 1 && 's'}</span>}
        </div>
        {!!alunosOptions.length
          ? (
            <ul className="divide-y divide-gray-300 border border-gray-300 rounded-lg">
              {alunosOptions.map((aluno, i, arr) => (
                <li onClick={() => toggleAlunoAusente(aluno.value)} className={`p-3 ${isAlunoAusente(aluno.value) && 'bg-red-500 text-white'} ${i === 0 && 'rounded-t-lg'} ${i === arr.length - 1 && 'rounded-b-lg'}`}>
                  <span className={isAlunoAusente(aluno.value) && 'font-semibold' }>
                    {aluno.text}
                  </span>
                  <span className="text-sm italic">
                    {isAlunoAusente(aluno.value) && ' (Ausente)'}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-center p-8 gap-4">
              <UsersThree width={96} height={96}></UsersThree>
              <span className="text-lg font-semibold">
                {idTurma ? 'Nenhum aluno foi encontrado': 'Selecione uma turma para obter a lista de alunos'}
              </span>
            </div>
          )}
      </div>
      <SuccessModal open={showSuccess} onOpenChange={setShowSuccess} />
    </div>
  )
}

export default Chamada
