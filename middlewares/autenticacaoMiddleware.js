const jwt = require('jsonwebtoken');
// Chave secreta global usada para assinar e checar a autenticidade dos tokens
const CHAVE_SECRETA = 'MinhaSuperChaveSecretaUniversitaria123!';
module.exports = (req, res, next) => {
// Captura o cabeçalho HTTP de autorização enviado pelo cliente
const cabecalhoAutorizacao = req.headers['authorization'];
// ESTRUTURA DE GUARDA 1: Se o cabeçalho não foi enviado, barra imediatamente
if (!cabecalhoAutorizacao) {
return res.status(401).json({ erro: "Acesso negado. Cabeçalho de autorização (Authorization)ausente." });
}
// O cabeçalho deve vir no formato: "Bearer <TOKEN>". Vamos separá-lo por espaço.
const partesToken = cabecalhoAutorizacao.split(' ');
// ESTRUTURA DE GUARDA 2: Valida se o formato possui exatamente duas partes e o prefixo Bearer.
if (partesToken.length !== 2 || partesToken[0] !== 'Bearer') {
return res.status(401).json({ erro: "Erro de contrato. O formato do cabeçalho deve ser 'Bearer<TOKEN>'." });
}
// Isola estritamente a string criptográfica do JWT (descartando a palavra 'Bearer')
const tokenBruto = partesToken[1];
try {
// O método .verify tenta decodificar o token usando a assinatura da nossa chave secreta
const dadosDecodificados = jwt.verify(tokenBruto, CHAVE_SECRETA);
// Se a assinatura for válida, injetamos o payload decodificado no objeto da requisição.
// Isso permite que os controladores saibam exatamente QUEM fez a requisição
req.usuarioLogado = dadosDecodificados;
// Função gatilho que autoriza a requisição a prosseguir para o próximo bloco (o controlador)
next();
} catch (erro) {
// Se o token for falso, adulterado ou já tiver expirado, cai no catch
return res.status(403).json({ erro: "Token inválido, corrompido ou expirado. Acesso proibido."
});
}
}