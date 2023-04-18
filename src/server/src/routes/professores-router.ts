import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router()

router.get('/', async (req, res) => {
  const professores = await prisma.professor.findMany({
    orderBy: [{ id: 'asc' }]
  })

  res.json({ data: professores })
})

router.post('/', async (req, res) => {
  const { nome, email, telefone } = req.body

  await prisma.professor.create({
    data: { nome, email, telefone }
  })

  res.json({ data: null })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nome, email, telefone } = req.body

  await prisma.professor.update({
    data: { nome, email, telefone },
    where: { id: Number(id) }
  })

  res.json({ data: null })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await prisma.professor.delete({
    where: { id: Number(id) }
  })

  res.json({ data: null })
})

export default router
