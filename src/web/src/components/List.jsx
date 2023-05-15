function List({ items }) {
  return !!items.length
    ? (
        <ul className="divide-y divide-gray-300 border border-gray-300 rounded-lg">
          {items.map((aluno, i, arr) => (
            <li onClick={() => toggleAlunoAusente(aluno.value)} className={`p-3 ${isAlunoAusente(aluno.value) && 'bg-red-500 text-white'} ${i === 0 && 'rounded-t-lg'} ${i === arr.length - 1 && 'rounded-b-lg'}`}>
              <span className={isAlunoAusente(aluno.value) && 'font-semibold' }>
                {aluno.text}
              </span>
              <span>
                {isAlunoAusente(aluno.value) && ' (Ausente)'}
              </span>
            </li>
          ))}
        </ul>
    ) : (
      <div></div>
    )
}

export default List
