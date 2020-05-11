const express = require("express");

const server = express();
server.use(express.json())

const users = ['Julio', 'Daniel', 'Sillas', 'Marvim']

/**Lista todos os usuários */
server.get('/users', (req, res) =>{
  return res.json(users)
})


/**Criar usuario */
server.post('/users', (req, res) =>{
  const {name } = req.body

  users.push(name)

  return res.json(users)
})

/**Atualizar Usuário */
server.put('/users/:index', (req, res) =>{
  const {index} = req.params
  const { name } = req.body

  users[index] = name

  return res.json(users)
})

/**Deletar usuário */
server.delete('/users/:index', (req, res) =>{
  const { index } = req.params
  
  users.splice(index, 1)

  return res.send()
})

//Exemplo de route params

/**
 * Esta requisição espera uma url parecida com:
 * http://localhost/3000/users/123123
 */
server.get('/users/:index', (req, res) =>{
  const { index } = req.params

  return res.json(users[index])
})

server.listen(3000);




















// //http://localhost/3000/teste

// /** TIPOS DE PARAMETROS
//  * Query params = ?/teste=1
//  * Route params = /users/1
//  * Request body = { "nome": "julio marvim", "email": "julio@marvim.com.br"}
//  */

//  //Exemplo de query params
// server.get('/teste', (req, res) =>{
//   const nome = req.query.nome

//   return res.json({'message':` Hello ${nome}!`})  
// })