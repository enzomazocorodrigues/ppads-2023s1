import { useEffect, useState } from "react"
import Table from "../components/Table"
import baseApiUrl from "../utils/base-api-url"
import Select from "../components/Select"
import formatDate from "../utils/fomat-date"
import { ChartBar } from "@phosphor-icons/react"

function Index() {
  const groups = [
    {
      value: "data",
      text: "Data",
      columns: [
        { name: 'Data', field: 'data', computed: (value) => value ? formatDate(new Date(value), false) : value },
        { name: 'Número de faltas', field: 'numerodefaltas' }
      ]
    },
    {
      value: "aluno",
      text: "Aluno",
      columns: [
        { name: 'Id', field: 'id' },
        { name: 'Nome', field: 'nome' },
        { name: 'Número de faltas', field: 'numerodefaltas' }
      ]
    },
    {
      value: "turma",
      text: "Turma",
      columns: [
        { name: 'Id', field: 'id' },
        { name: 'Série', field: 'serie' },
        { name: 'Número de faltas', field: 'numerodefaltas' }
      ]
    },
    {
      value: "professor",
      text: "Professor",
      columns: [
        { name: 'Id', field: 'id' },
        { name: 'Nome', field: 'nome' },
        { name: 'Número de faltas', field: 'numerodefaltas' }
      ]
    },
    {
      value: "disciplina",
      text: "Disciplina",
      columns: [
        { name: 'Id', field: 'id' },
        { name: 'Nome', field: 'nome' },
        { name: 'Número de faltas', field: 'numerodefaltas' }
      ]
    },
  ]

  const [group, setGroup] = useState(null)
  const [data, setData] = useState([])


  async function getData() {
    const response = await fetch(`${baseApiUrl}/relatorios?group=${group}`)
    const { data } = await response.json()
    console.log(group, data)
    return data
  }

  function columns(aGroup) {
    return groups.find(group => group.value == aGroup).columns
  }

  useEffect(() => {
    if (group) {
      getData().then(setData)
    }
  }, [group])

  return (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Relatórios</h2>
        <Select items={groups} value={group} onValueChange={setGroup} placeholder='Selecione o agrupador...' />
      </div>
      {group && data.length
        ? <Table columns={columns(group)} data={data} />
        : <div className="flex h-full flex-col items-center justify-center p-8 gap-4">
            <ChartBar width={96} height={96}></ChartBar>
            <span className="text-lg font-semibold">
              Selecione uma agrupador para obter o relatório
            </span>
          </div>
      }

    </>
  )
}

export default Index
