import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router()

router.get('/', async (req, res) => {
  const turmas = await prisma.turma.findMany({
    include: { _count: true },
    orderBy: [{ id: 'asc' }]
  })

  res.json({ data: turmas })
})

router.get('/options', async (req, res) => {
  const turmas = await prisma.turma.findMany({
    select: {
      id: true,
      serie: true
    },
    orderBy: [{ id: 'asc' }]
  })

  const turmasOptions = turmas.map(({ id, serie }) => ({ value: id, text: serie }))
  res.json({ data: turmasOptions })
})

router.post('/', async (req, res) => {
  const { serie } = req.body

  await prisma.turma.create({
    data: { serie }
  })

  res.json({ data: null })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { serie } = req.body

  console.log({ id, serie })

  await prisma.turma.update({
    data: { serie },
    where: { id: Number(id) }
  })

  res.json({ data: null })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await prisma.turma.delete({
    where: { id: Number(id) }
  })

  res.json({ data: null })
})

export default router
