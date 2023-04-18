-- CreateTable
CREATE TABLE "alunos" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(100) NOT NULL,
    "numerodefaltas" INTEGER NOT NULL DEFAULT 0,
    "idresponsavel" INTEGER NOT NULL,
    "idturma" INTEGER NOT NULL,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chamadas" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "idturma" INTEGER NOT NULL,
    "idprofessor" INTEGER NOT NULL,

    CONSTRAINT "chamadas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "chamadas_disciplinas" (
    "idchamada" INTEGER NOT NULL,
    "iddisciplina" INTEGER NOT NULL,

    CONSTRAINT "pk_chamdas_disciplinas" PRIMARY KEY ("idchamada","iddisciplina")
);

-- CreateTable
CREATE TABLE "disciplinas" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "numerodeaulas" INTEGER NOT NULL,

    CONSTRAINT "disciplinas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "faltas" (
    "idchamada" INTEGER NOT NULL,
    "idaluno" INTEGER NOT NULL,

    CONSTRAINT "pk_faltas" PRIMARY KEY ("idchamada","idaluno")
);

-- CreateTable
CREATE TABLE "notificacoes" (
    "id" SERIAL NOT NULL,
    "data" DATE NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "mensagem" TEXT,
    "idaluno" INTEGER NOT NULL,
    "iddisciplina" INTEGER NOT NULL,

    CONSTRAINT "notificacoes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "professores" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "telefone" VARCHAR(15),

    CONSTRAINT "professores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "responsaveis" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(255) NOT NULL,
    "email" VARCHAR(80) NOT NULL,
    "telefone" VARCHAR(15),

    CONSTRAINT "responsaveis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "turmas" (
    "id" SERIAL NOT NULL,
    "serie" VARCHAR(10) NOT NULL,

    CONSTRAINT "turmas_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_idresponsavel_fkey" FOREIGN KEY ("idresponsavel") REFERENCES "responsaveis"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "alunos" ADD CONSTRAINT "alunos_idturma_fkey" FOREIGN KEY ("idturma") REFERENCES "turmas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chamadas" ADD CONSTRAINT "chamadas_idprofessor_fkey" FOREIGN KEY ("idprofessor") REFERENCES "professores"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chamadas" ADD CONSTRAINT "chamadas_idturma_fkey" FOREIGN KEY ("idturma") REFERENCES "turmas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chamadas_disciplinas" ADD CONSTRAINT "chamadas_disciplinas_idchamada_fkey" FOREIGN KEY ("idchamada") REFERENCES "chamadas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "chamadas_disciplinas" ADD CONSTRAINT "chamadas_disciplinas_iddisciplina_fkey" FOREIGN KEY ("iddisciplina") REFERENCES "disciplinas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faltas" ADD CONSTRAINT "faltas_idaluno_fkey" FOREIGN KEY ("idaluno") REFERENCES "alunos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "faltas" ADD CONSTRAINT "faltas_idchamada_fkey" FOREIGN KEY ("idchamada") REFERENCES "chamadas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_idaluno_fkey" FOREIGN KEY ("idaluno") REFERENCES "alunos"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "notificacoes" ADD CONSTRAINT "notificacoes_iddisciplina_fkey" FOREIGN KEY ("iddisciplina") REFERENCES "disciplinas"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

