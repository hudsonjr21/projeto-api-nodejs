const express = require('express');

const server = express();

server.use(express.json());

// Query params = ?nome=Hello World
// Route params = /curso/2
// Request Body = { nome: 'NodeJs', tipo: 'Backend' }

//CRUD= Create, Read, Update, Delete

const cursos = ['Node JS', 'Java', 'React'];

//Middleware Global
server.use((req, res, next)=>{
    console.log(`URL CHAMADA: ${req.url}`);
  
    return next();
  });

function checkCurso(req, res, next){
  if(!req.body.name){
    return res.status(400).json({ error: "Nome do curso é obrigatório"});
  }

  return next();
}

function checkIndexCurso(req, res, next){
    const curso = cursos[req.params.index];
  
    if(!curso){
      return res.status(400).json({ error: "O curso não existe"});
    }
  
    req.curso = curso;
  
    return next();
  }

server.get('/cursos', checkIndexCurso, (req, res) => {
    return res.json(cursos);
})

// O que vai acessar: localhost:3010/curso
server.get('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;

    return res.json({cursos: `Cursos: ${cursos[index]}`});
})

//Criando um novo curso
server.post('/cursos', checkCurso, (req, res) => {
    const { name } = req.body;
    cursos.push(name);

    return res.json(cursos);
})

// Atualizando curso
server.put('/cursos/:index', checkCurso, checkIndexCurso, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    cursos[index] = name;

    return res.json(cursos);
});

// deletar curso
server.delete('/cursos/:index', checkIndexCurso, (req, res) => {
    const { index } = req.params;

    cursos.splice(index, 1);
    return res.send();

});

server.listen(3010);