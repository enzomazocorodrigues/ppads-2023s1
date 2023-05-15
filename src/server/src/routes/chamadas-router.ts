import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router()

router.post('/', async (req, res) => {
  const { data, idProfessor, /* idDisciplinas, */ idDisciplina, idTurma, idAlunos } = req.body

  await prisma.chamada.create({
    data: {
      data,
      idProfessor,
      idTurma,
      // disciplinas: {
      //   createMany: {
      //     data: idDisciplinas.map((idDisciplina: number) => ({ idDisciplina }))
      //   }
      // },
      disciplinas: {
        create: { idDisciplina }
      },
      faltas: {
        createMany: {
          data: idAlunos.map((idAluno: number) => ({ idAluno }))
        }
      }
    }
  })

  await prisma.aluno.updateMany({
    data: {
      numeroDeFaltas: { increment: 1 }
    },
    where: {
      id: { in: idAlunos }
    }
  })

  res.json({ data: null })
})

export default router
