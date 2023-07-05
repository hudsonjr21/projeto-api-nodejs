const express = require('express');

const server = express();

// Query params = ?nome=Hello World
// Route params = /curso/2

// O que vai acessar: localhost:3000/curso
server.get('/curso', (req, res) => {
    return res.json({teste: 'Hello World'});
})

server.listen(3000);
