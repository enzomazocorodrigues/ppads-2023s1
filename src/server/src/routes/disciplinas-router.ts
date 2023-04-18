import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router()

router.get('/', async (req, res) => {
  const disciplinas = await prisma.disciplina.findMany({
    orderBy: [{ id: 'asc' }]
  })

  res.json({ data: disciplinas })
})

router.post('/', async (req, res) => {
  const { nome, numeroDeAulas } = req.body

  await prisma.disciplina.create({
    data: { nome, numeroDeAulas: Number(numeroDeAulas) }
  })

  res.json({ data: null })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const { nome, numeroDeAulas } = req.body

  await prisma.disciplina.update({
    data: { nome, numeroDeAulas: Number(numeroDeAulas) },
    where: { id: Number(id) }
  })

  res.json({ data: null })
})

router.delete('/:id', async (req, res) => {
  const { id } = req.params

  await prisma.disciplina.delete({
    where: { id: Number(id) }
  })

  res.json({ data: null })
})

export default router
