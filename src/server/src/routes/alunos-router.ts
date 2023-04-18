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

router.get('/responsaveis', async (req, res) => {
  const responsaveis = await prisma.responsavel.findMany({
    select: {
      id: true,
      nome: true
    }
  })

  res.json({ data: responsaveis })
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
