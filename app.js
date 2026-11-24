const express = require('express');
const usuarioRoutes = require('./Routes/usuarioroutes');
// Instancia a engrenagem central do Express
const app = express();
// Ativa o middleware nativo para interceptar e decodificar payloads textuais em req.body
app.use(express.json());
// Endpoint de Health Check (Teste de integridade operacional) na raiz absoluta
app.get('/', (req, res) => {
res.status(200).send("API Protegida Operacional. Acesse os endpoints através do sufixo /usuarios");
});
// Acoplamento hierárquico com o prefixo semântico obrigatório do recurso
app.use('/usuarios', usuarioRoutes);
// Exporta a instância configurada isolando a lógica da infraestrutura de rede
module.exports = app;