import { PencilSimple, Trash } from "@phosphor-icons/react"
import resolve from "../utils/resolve"

function Table({ columns, data, onEdit, onDelete }) {
    return (
        <div className="w-full overflow-x-auto border rounded-lg">
            <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 border-b">
                    <tr>
                    {columns.map(({ name }) => (
                        <th scope="col" className="px-6 py-3" key={name}>
                        {name}
                        </th>
                    ))}
                    <th scope="col" className="px-6 py-3">
                        Ações
                    </th>
                    </tr>
                </thead>
                <tbody>
                  {data.map((row, i, arr) => (
                    <tr className={`${i < arr.length - 1 ? 'border-b': ''} bg-white hover:bg-gray-50`} key={i}>
                      {columns.map(({ field }, i) => (
                        <td scope="row" className="px-6 py-4" key={i}>
                          {resolve(row, field)}
                        </td>
                      ))}
                      <td className="flex items-center px-6 py-4 space-x-3">
                        <button onClick={() => onEdit(row)} className="text-blue-600 hover:text-blue-800">
                          <PencilSimple width={18} height={18} />
                        </button>
                        <button onClick={() => onDelete(row)} className="text-red-600 hover:text-red-800">
                          <Trash width={18} height={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table
