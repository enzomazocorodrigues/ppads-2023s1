import Express, { json } from "express"
import cors from "cors"
import alunosRouter from "./routes/alunos-router"
import disciplinasRouter from "./routes/disciplinas-router"
import professoresRouter from "./routes/professores-router"
import turmasRouter from "./routes/turmas-router"

const server = Express()

server.use(json())
server.use(cors())
server.use('/alunos', alunosRouter)
server.use('/disciplinas', disciplinasRouter)
server.use('/professores', professoresRouter)
server.use('/turmas', turmasRouter)

server.listen(3000, () => {
  console.log("Server listening on port 3000...")
})

