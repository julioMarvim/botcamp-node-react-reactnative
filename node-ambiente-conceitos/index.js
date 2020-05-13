const express = require("express");

const server = express();
server.use(express.json())

const users = ['Julio', 'Daniel', 'Sillas', 'Marvim']

/**Middleware global tem prioridade sobre todos os outros middlewares, 
 * é sempre chamado primeiro.
*/
server.use((req, res, next) =>{
  console.log(`Método: ${req.method} URL: ${req.url}`)

  console.time('Require')

  /**Segue para a próxima rota que satisfaça a minha requisição*/
  //return next()

  /**Não necessariamente eu preciso sair do Meddleware atual para ir para o
   * proximo apos chamar a função next(). Se eu não retornar a next() o que
   * vier depois dele no meddleware atual só será executada depois que a
   * rota chamada no next finalizar.
   */

   next()
  
   console.timeEnd('Require')

})


/**Middleware local */
function checkUserExists(req, res, next){
  if(!req.body.name){
    //Retorna status 400 (Bad Request) e a mensagem descrita.
    return res.status(400).json({error: 'User name is required.'});
  }

  return next()
}

function checkUserInArray(req, res, next){
  const user = users[req.params.index]

  if(!user){
    return res.status(400).json({error: 'User does not exists.'});
  }

  res.user = user

  return next()
}

/**Lista todos os usuários */
server.get('/users', (req, res) =>{
  return res.json(users)
})


/**Criar usuario */
server.post('/users', checkUserExists, (req, res) =>{
  const {name } = req.body

  users.push(name)

  return res.json(users)
})

/**Atualizar Usuário */
server.put('/users/:index', checkUserExists, checkUserInArray, (req, res) =>{
  const {index} = req.params
  const { name } = req.body

  users[index] = name

  return res.json(users)
})

/**Deletar usuário */
server.delete('/users/:index', checkUserInArray, (req, res) =>{
  const { index } = req.params
  
  users.splice(index, 1)

  return res.send()
})

//Exemplo de route params

/**
 * Esta requisição espera uma url parecida com:
 * http://localhost/3000/users/123123
 */
server.get('/users/:index', checkUserInArray, (req, res) =>{
  /**res.user é preenchido dentro da função chekUsersInArray
   * a variavel res foi alterada dentro do middleware
   * */
  return res.json(res.user)
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