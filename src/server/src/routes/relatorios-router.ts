import { Router } from "express";
import prisma from "../lib/prisma";

const router = Router()


router.get('/', async (req, res) => {
  const { group } = req.query

  let relatorio;
  if (group == "data") {
    relatorio = await prisma.$queryRaw`
      SELECT C.data, CAST(COUNT(F.idChamada) AS INT) AS numeroDeFaltas
      FROM faltas F
      INNER JOIN chamadas C on F.idChamada = C.id
      GROUP BY C.data
      ORDER BY C.data;
    `
  } else if (group == "aluno") {
    relatorio = await prisma.$queryRaw`
      SELECT A.id, A.nome, CAST(COUNT(F.idChamada) AS INT) AS numeroDeFaltas
      FROM faltas F
      INNER JOIN chamadas C on F.idChamada = C.id
      INNER JOIN alunos A on F.idAluno = A.id
      GROUP BY A.id, A.nome
      ORDER BY A.id;
    `
  } else if (group == "turma") {
    relatorio = await prisma.$queryRaw`
      SELECT T.id, T.serie, CAST(COUNT(F.idChamada) AS INT) AS numeroDeFaltas
      FROM faltas F
      INNER JOIN chamadas C on F.idChamada = C.id
      INNER JOIN turmas T on C.idTurma = T.id
      GROUP BY T.id, T.serie
      ORDER BY T.id;
    `
  } else if (group == "professor") {
    relatorio = await prisma.$queryRaw`
      SELECT P.id, P.nome, CAST(COUNT(F.idChamada) AS INT) AS numeroDeFaltas
      FROM faltas F
      INNER JOIN chamadas C on F.idChamada = C.id
      INNER JOIN professores P on C.idprofessor = P.id
      GROUP BY P.id, P.nome
      ORDER BY P.id;
    `
  } else if (group == "disciplina") {
    relatorio = await prisma.$queryRaw`
      SELECT D.id, D.nome, CAST(COUNT(F.idChamada) AS INT) AS numeroDeFaltas
      FROM faltas F
      INNER JOIN chamadas C ON F.idChamada = C.id
      INNER JOIN chamadas_disciplinas CD ON C.id = CD.idChamada
      INNER JOIN disciplinas D ON CD.idDisciplina = D.id
      GROUP BY D.id, D.nome
      ORDER BY D.id;
    `
  }

  res.json({ data: relatorio })
})


export default router
