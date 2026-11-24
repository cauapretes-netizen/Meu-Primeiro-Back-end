const fs = require('fs');
const jwt = require('jsonwebtoken');
const CAMINHO_ARQUIVO = './dados.json';
const CHAVE_SECRETA = 'MinhaSuperChaveSecretaUniversitaria123!';
// Encapsula a leitura em try/catch para evitar crash silencioso do servidor
const lerDados = () => {
try {
const dadosBrutos = fs.readFileSync(CAMINHO_ARQUIVO, 'utf-8');
return JSON.parse(dadosBrutos);
} catch (erro) {
// Se o arquivo não existir ou estiver corrompido, retorna array vazio com segurança
console.erro("Erro ao ler dados.json:", erro.message);
return [];
}
};
// Função auxiliar interna para realizar a serialização do estado de volta ao disco
const salvarDados = (dados) => {
fs.writeFileSync(CAMINHO_ARQUIVO, JSON.stringify(dados, null, 2));
};
// LÓGICA DE NEGÓCIO 1: Login Simulado (PÚBLICO)
exports.loginSimulado = (req, res) => {
// Simulando um payload de usuário que acabou de digitar e-mail e senha corretos
const payloadUsuario = {
id: 99,
nome: "Aluno Laboratório",
cargo: "Desenvolvedor Backend"
};
// Assina digitalmente o payload, gerando um JWT que expira de forma autônoma em 1 hora
const tokenGerado = jwt.sign(payloadUsuario, CHAVE_SECRETA, { expiresIn: '1h' });
// Retorna o token com o status 200 OK
res.status(200).json({
mensagem: "Autenticação simulada com sucesso! Use o token abaixo nas rotas privadas.",
token: tokenGerado
});
};
// LÓGICA DE NEGÓCIO 2: Listagem Geral (PRIVADA)
exports.listarUsuarios = (req, res) => {
// Demonstração didática no console de quem está logado fazendo a chamada
console.log("Usuário que disparou este endpoint:", req.usuarioLogado);
const usuarios = lerDados();
// Retorna a representação da coleção com o status 200 OK
res.status(200).json(usuarios);
};
// LÓGICA DE NEGÓCIO 3: Remoção de Usuário por ID (PRIVADA)
exports.deletarUsuario = (req, res) => {
let usuarios = lerDados();
const idParametro = parseInt(req.params.id);
// Verifica pré-existência do recurso antes de executar mutações
const usuarioExiste = usuarios.some(u => u.id === idParametro);
if (!usuarioExiste) {
return res.status(404).json({ erro: "Usuário não localizado no servidor para exclusão." });
}
// Filtra o array expurgando fisicamente o recurso correspondente
usuarios = usuarios.filter(u => u.id !== idParametro);
salvarDados(usuarios);
res.status(200).json({ mensagem: `Recurso sob o ID ${idParametro} foi removido com sucesso
pela entidade autenticada.` });
};