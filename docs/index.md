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
    - [Regras de negócio](#regras-de-negócio)
  - [Gerar Relatório](#gerar-relatório)
    - [Objetivos](#objetivos-1)
    - [Atores](#atores-1)
    - [Prioridade](#prioridade-1)
    - [Pré-condições](#pré-condições-1)
    - [Fluxo principal](#fluxo-principal-1)
    - [Pós-condições](#pós-condições-1)
    - [Regras de negócio](#regras-de-negócio-1)
- [Protótipos de tela](#protótipos-de-tela)
- [Modelo de domínio](#modelo-de-domínio)
- [Decisões de arquitetura](#decisões-de-arquitetura)
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

### Atores

- Professor

### Prioridade

Alta

### Pré-condições

- As aulas, professores, disciplinas já devem estar cadastradas na base de dados.

### Fluxo principal

1. O caso de uso se inicia quando o professor selecionar qual turma ele irá registrar as faltas. Assim exibirá todos os alunos daquela turma. 
2. Logo em seguida o professor deverá se identificar selecionando seu nome, qual disciplina está atuando naquela falta e qual é o período (início do dia ou depois do intervalo).
3. Após se identificar selecionando as opções ele poderá registrar as faltas dos alunos de acordo com a chamada oral.
4. Ao finalizar o registro de chamada exibirá uma tela de concluído com uma opção de gerar relatório.

### Pós-condições

- As faltas dos alunos devem ser adicionadas na base de dados.

### Regras de negócio

## Gerar Relatório

### Objetivos

### Atores

- Professor

### Prioridade

Alta

### Pré-condições

- As aulas, professores, disciplinas já devem estar cadastradas na base de dados.

### Fluxo principal

1. Esse caso de uso começa após registrar as faltas e o professor clicar em relatório.
2. Após clicar para gerar relatório ele já receberá o relatório com a última atualização.

### Pós-condições

### Regras de negócio

# Protótipos de tela

## Tela de Inicio 
![Tela inicio](https://user-images.githubusercontent.com/101683741/219990510-205acf83-1c58-47b9-9a77-b4c1dd46d872.png)

## Tela de Controle de Presença 
![Tela controle de presença](https://user-images.githubusercontent.com/101683741/219990540-2d2019d9-6d87-493f-b406-38a47e93109e.png)

## Tela de Gerar o Relatório
![Tela relatório](https://user-images.githubusercontent.com/101683741/219990575-71a1979d-6cc1-4b51-9de9-14ae854fd6b3.png)

# Modelo de domínio

*&lt;Modelo de domínio&gt;*

# Decisões de arquitetura

*&lt;Decisões de arquitetura&gt;*

# Diagrama de implantação

*&lt;Diagrama de implantação&gt;*

# Referências

*&lt;Lista de referências&gt;*
