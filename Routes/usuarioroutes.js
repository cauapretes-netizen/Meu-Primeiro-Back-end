const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariocontroller');
// Importa o nosso middleware de proteção cibernética
const verificarAutenticacao = require('../middlewares/autenticacaoMiddleware');
// ==========================================
// ROTA PÚBLICA (Qualquer cliente acessa)
// ==========================================
// Endpoint temporário de desenvolvimento para simular um login bem-sucedido e gerar um token válido.
router.post('/login-simulado', usuarioController.loginSimulado);
// ==========================================
// ROTAS PRIVADAS (EXIGEM TOKEN BEARER JWT)
// ==========================================
// Injetamos o middleware 'verificarAutenticacao' ANTES do método do controlador
router.get('/', verificarAutenticacao, usuarioController.listarUsuarios);
router.delete('/:id', verificarAutenticacao, usuarioController.deletarUsuario);
module.exports = router;