import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router()

router.get('/', async (req, res) => {
  const alunos = await prisma.aluno.findMany({
    include: {
      turma: {
        select: {
          serie: true
        }
      },
      responsavel: {
        select: {
          id: true,
          nome: true
        }
      }
    },
    orderBy: [{ id: 'asc' }]
  })
  res.json({ data: alunos })
})

router.get('/options', async (req, res) => {
  const { idTurma } = req.query

  const alunos = await prisma.aluno.findMany({
    select: {
      id: true,
      nome: true
    },
    where: {
      idTurma: idTurma ? Number(idTurma) : undefined
    }
  })

  const alunosOptions = alunos.map(({ id, nome }) => ({ value: id, text: nome }))
  res.json({ data: alunosOptions })
})

router.get('/responsaveis/options', async (req, res) => {
  const responsaveis = await prisma.responsavel.findMany({
    select: {
      id: true,
      nome: true
    }
  })

  const responsaveisOptions = responsaveis.map(({ id, nome }) => ({ value: id, text: nome }))
  res.json({ data: responsaveisOptions })
})

router.post('/', async (req, res) => {
  const { nome, idTurma, idResponsavel } = req.body

  await prisma.aluno.create({
    data: { nome, idTurma, idResponsavel, numeroDeFaltas: 0 }
  })

  res.json({ data: null })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nome, idTurma, idResponsavel } = req.body

  await prisma.aluno.update({
    data: { nome, idTurma, idResponsavel },
    where: { id: Number(id) }
  })

  res.json({ data: null })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await prisma.aluno.delete({
    where: { id: Number(id) }
  })

  res.json({ data: null })
})

export default router
