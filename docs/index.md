<h2><a href= "https://www.mackenzie.br">Universidade Presbiteriana Mackenzie</a></h2>
<h3><a href= "https://www.mackenzie.br/graduacao/sao-paulo-higienopolis/sistemas-de-informacao">Sistemas de Informação</a></h3>


<font size="+12"><center>
Sistema de presença para Escola do Infinito
</center></font>

>*Observação 1: A estrutura inicial deste documento é só um exemplo. O seu grupo deverá alterar esta estrutura de acordo com o que está sendo solicitado na disciplina.*

>*Observação 2: O índice abaixo não precisa ser editado se você utilizar o Visual Studio Code com a extensão **Markdown All in One**. Essa extensão atualiza o índice automaticamente quando o arquivo é salvo.*

**Conteúdo**

- [Autores](#autores)
- [Descrição do projeto](#descrição-do-projeto)
- [Diagrama de casos de uso](#diagrama-de-casos-de-uso)
- [Descrição dos casos de uso](#descrição-dos-casos-de-uso)
  - [Registrar Falta](#registrar-falta)
    - [Objetivos](#objetivos)
    - [Atores](#atores)
    - [Prioridade](#prioridade)
    - [Pré-condições](#pré-condições)
    - [Fluxo principal](#fluxo-principal)
    - [Pós-condições](#pós-condições)
  - [Gerar Relatório](#gerar-relatório)
    - [Objetivos](#objetivos-1)
    - [Atores](#atores-1)
    - [Prioridade](#prioridade-1)
    - [Pré-condições](#pré-condições-1)
    - [Fluxo principal](#fluxo-principal-1)
    - [Pós-condições](#pós-condições-1)
- [Protótipos de tela](#protótipos-de-tela)
  - [Tela de Inicio](#tela-de-inicio)
  - [Tela de Controle de Presença](#tela-de-controle-de-presença)
  - [Tela de Gerar o Relatório](#tela-de-gerar-o-relatório)
- [Modelo de domínio](#modelo-de-domínio)
- [Decisões de arquitetura](#decisões-de-arquitetura)
  - [Diagramas de Sequência](#diagramas-de-sequência)
    - [Caso de Uso: Registrar faltas](#caso-de-uso-registrar-faltas)
    - [Caso de Uso: Gerar relatório](#caso-de-uso-gerar-relatório)
- [Diagrama de implantação](#diagrama-de-implantação)
- [Referências](#referências)

# Autores

* Enzo Mazoco Rodrigues
* David Nunes Vieira
* Moises Santana
* Victor Andrade

# Descrição do projeto

*O Sistema de Presença da DEMV Systems auxilia os professores do Fundamental I da Escola do Infinito no registro de falta e controle de frequência dos alunos, mantendo também os responsáveis inteirados na situação dos seus filhos via e-mail.*

# Diagrama de casos de uso

![Diagrama de casos de uso](Diagrama%20de%20casos%20de%20uso.png)

# Descrição dos casos de uso

## Registrar Falta

### Objetivos

Registrar as faltas dos alunos para se realizar o controle de frequência em cada disciplina.

### Atores

- Professor

### Prioridade

Alta

### Pré-condições

- As aulas, professores, disciplinas já devem estar cadastradas na base de dados.

### Fluxo principal

1. Professor acessa a página de `Registrar falta`,
2. Professor selecionar qual turma ele irá registrar as faltas,
3. Sistema exibe todos os alunos daquela turma,
4. Professor deverá se identificar selecionando seu nome, qual disciplina está atuando naquela falta e qual é o período (início do dia ou depois do intervalo),
5. Professor seleciona os alunos que não estão presentes, de acordo com a chamada oral,
6. Professor clica em `Registar faltas` para salva-las na base de dados,
7. Ao finalizar, sistema exibirá uma tela de concluído com uma opção de gerar relatório.

### Pós-condições

- As faltas dos alunos devem ser adicionadas a base de dados.

## Gerar Relatório

### Objetivos

Gerar relatório de faltas a partir de datas, disciplinas, turmas ou professores para avaliar a situação de frequência dos alunos.

### Atores

- Professor

### Prioridade

Alta

### Pré-condições

- As aulas, professores, disciplinas já devem estar cadastradas na base de dados.
- Registro de faltas realizados preveamente.

### Fluxo principal

1. Professor acessa a página para `Gerar relatório`,
2. Escolhe o tipo de agrupamento das faltas (*datas, disciplinas, turmas ou professores*),
3. Clica em `Gerar relatório`,
4. Sistema retorna relatório de faltas agrupado pelo tipo escolhido.

### Pós-condições

# Protótipos de tela

## Tela de Inicio 
![Tela inicio](https://user-images.githubusercontent.com/101683741/219990510-205acf83-1c58-47b9-9a77-b4c1dd46d872.png)

## Tela de Controle de Presença 
![Tela controle de presença](https://user-images.githubusercontent.com/101683741/219990540-2d2019d9-6d87-493f-b406-38a47e93109e.png)

## Tela de Gerar o Relatório
![Tela relatório](https://user-images.githubusercontent.com/101683741/219990575-71a1979d-6cc1-4b51-9de9-14ae854fd6b3.png)

# Modelo de domínio

![Modelo de domínio](https://raw.githubusercontent.com/enzomazocorodrigues/ppads-2023s1/master/docs/Modelo%20de%20dom%C3%ADnio.png)

# Decisões de arquitetura

## Definição da arquitetura
  A camada visual do nosso projeto será desenvolvida em React.js, é um
framework muito usual com diversas bibliotecas que pode nos ajudar a
desenvolver de maneira rápida e eficaz.
A camada de controle será desenvolvida com node.js, ele é capaz de
interpretar códigos em Java Script para realizar o envio de instruções.
O banco de dados será o PostgreSQL. E a aplicação será hospedada na
AWS.
E como serviço de mensagens, usaremos Twilio.

## Diagrama de Componentes
![Diagrama de Componentes](https://raw.githubusercontent.com/enzomazocorodrigues/ppads-2023s1/master/docs/Diagrama%20de%20Componentes.png)

## Diagramas de Sequência

### Caso de Uso: Registrar faltas

![Diagrama de Sequência(Registrar faltas)](https://raw.githubusercontent.com/enzomazocorodrigues/ppads-2023s1/master/docs/Diagrama%20sequencia(Registrar%20Falta).png)

### Caso de Uso: Gerar relatório

![Diagrama de Sequência(Gerar Relatório)](https://raw.githubusercontent.com/enzomazocorodrigues/ppads-2023s1/master/docs/Diagrama%20sequencia(Gerar%20Relat%C3%B3rio).png)

# Diagrama de implantação
![Diagrama de implantação](https://raw.githubusercontent.com/enzomazocorodrigues/ppads-2023s1/master/docs/Diagrama%20de%20Implantacao.png)

# Referências

*&lt;Lista de referências&gt;*
