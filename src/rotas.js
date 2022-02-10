const express = require('express');
const filtroLogin = require('./filtros/filtroLogin');
const loginUsuario = require('./controladores/login');
const usuario = require('./controladores/usuario');
const fornecedor = require('./controladores/fornecedores');
const rotas = express();

rotas.post('/usuarios', usuario.cadastraUsuario);
rotas.post('/login', loginUsuario.login);

rotas.use(filtroLogin);

rotas.get('/perfil', usuario.obterPerfil);
rotas.put('/perfil', usuario.atualizarPerfil);
rotas.get('/fornecedores/:id', fornecedor.obterFornecedor);
rotas.get('/fornecedores', fornecedor.listarForncedores);

module.exports = rotas;