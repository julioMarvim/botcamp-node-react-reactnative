const express = require('express');

const server = express();

server.use(express.json());

/**Projetos cadastrados */
const projects = []

/**Conta quantas requisições foram realizadas */
var contador = 0
server.use((req, res, next) =>{
contador += 1
console.log(`quantidade de requisições: ${contador}`)
next();
})

/**Verifica se o projeto já existe no array. */
function checkProjectExists(req, res, next) {
  const { id } = req.params
  const project = projects.find(p => p.id == id)

  if(!project)
    return res.status(400).json({error: 'Project does not exists.'})

  return next()
}

/**Cadastrar projetos */
server.post('/projects', (req, res) => {
  const { id } = req.body
  const { title } = req.body

  const project = {
    id,
    title,
    task: []
  }

  projects.push(project)

  return res.json(projects)
})

/**Listar Projetos */
server.get('/projects', (req, res) => {
  return res.json(projects)
})

/**Editar Projetos */
server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { title } = req.body

  const project = projects.find(p => p.id == id)

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects[i].title = title
    }
  }

  return res.json(projects)
})

/**Deletar projeto */
server.delete('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects.splice(i, 1)
    }
  }

  return res.json(projects)
})

/**Cadastrar tarefa */
server.post('/projects/:id/task', checkProjectExists, (req, res) => {
  const { id } = req.params
  const { task } = req.body

  for (let i = 0; i < projects.length; i++) {
    if (projects[i].id === id) {
      projects[i].tasks.push(task)
    }
  }

  return res.json(projects)
})

server.listen(3000)