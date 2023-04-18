import Navbar from "./components/Navbar"
import Table from "./components/Table"

function App() {
  return (
    <>
      <Navbar />
      <main className="mx-12">
        <Table columns={columns} data={data} />
      </main>
    </>
  )
}

export default App
