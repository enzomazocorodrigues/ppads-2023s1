import { Atom } from "@phosphor-icons/react"

function Navbar() {
    const pages = [
      { name: 'Alunos', route: '/alunos' },
      { name: 'Turmas', route: '/turmas' },
      { name: 'Disciplinas', route: '/disciplinas' },
      { name: 'Professores', route: '/professores' },
    ]

    return (
      <nav className="bg-blue-700 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-12">
          <a href="/" className="flex items-center">
            <Atom color="white" width={26} height={26} className="mr-2"/>
            <span className="self-center text-2xl font-bold whitespace-nowrap text-white">Escola do Infinito</span>
          </a>
          <div className="flex items-center">
            <ul className="font-medium text-white flex gap-4">
              {pages.map(page => (
                <li key={page.name}>
                  <a href={page.route} className="hover:underline">{page.name}</a>
                </li>
              ))}
            </ul>
            <button type="button" className="ml-6 text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3">Fazer chamada</button>
          </div>
        </div>
      </nav>
    )
}

export default Navbar
