Documentação geral — Meu Primeiro Back-end
O projeto Meu Primeiro Back-end consiste no desenvolvimento de uma API REST utilizando Node.js e Express, com o objetivo de realizar o gerenciamento de usuários. A aplicação permite cadastrar, consultar, atualizar e excluir usuários, armazenando as informações em um arquivo JSON (dados.json).

Instalações necessarias{
1. Inicialize o manifesto do Node.js:
npm init -y
2. Instale o Express (nosso framework HTTP):
npm install express
3. Instale a biblioteca JsonWebToken (indispensável para esta aula):
npm install jsonwebtoken
}

Antes de iniciar o servidor, configure a variável de ambiente `JWT_SECRET` com um segredo forte e aleatório. O middleware de autenticação interrompe a inicialização se essa variável não estiver definida. Não coloque o segredo no código nem o envie para o repositório.

Exemplo no Linux/macOS:
```sh
export JWT_SECRET="seu-segredo-forte-e-aleatorio"
```

1. Estrutura e responsabilidade dos arquivos
O projeto é dividido em arquivos que organizam as funcionalidades da aplicação, facilitando a manutenção e a compreensão do código.
Arquivo	Responsabilidade
index.js	Implementa uma versão inicial da API, com rotas de consulta e leitura direta do JSON.
app.js	Configura a aplicação Express e conecta as rotas de usuários.
server.js	Inicializa o servidor na porta 3000.
usuarioscontrolles.js	Contém a lógica das operações CRUD e manipulação dos dados.
routes.js	Define os endpoints e direciona as requisições para o Controller.
dados.json	Armazena os dados dos usuários.

2. Funcionamento geral da aplicação
A aplicação utiliza uma estrutura modularizada, na qual cada arquivo possui uma responsabilidade específica.

O funcionamento acontece da seguinte maneira:
1. O server.js inicia o servidor na porta 3000.
2. O app.js configura o Express e conecta as rotas.
3. O routes.js recebe e direciona as requisições HTTP.
4. O usuarioscontrolles.js executa as operações solicitadas.
5. O dados.json armazena as informações dos usuários.
FLUXO DE FUNCIONAMENTO
Cliente

Envia requisições HTTP

server.js / app.js

Inicia e configura a aplicação

routes.js

Direciona as requisições

usuarioscontrolles.js

Executa as operações CRUD

dados.json

Armazena os usuários


3. Operações CRUD
O projeto implementa as quatro operações fundamentais de gerenciamento de dados, conhecidas como CRUD:
- Create (Criar): cadastra novos usuários.
- Read (Ler): consulta todos os usuários ou busca um específico pelo ID.
- Update (Atualizar): modifica as informações de um usuário existente.
- Delete (Excluir): remove um usuário cadastrado.
4. Rotas disponíveis na API
As rotas utilizam os métodos HTTP para executar as operações de gerenciamento de usuários.
Método	Endpoint	Funcionalidade
GET	/usuarios	Lista todos os usuários.
GET	/usuarios/:id	Busca um usuário pelo ID.
POST	/usuarios	Cadastra um novo usuário.
PUT	/usuarios/:id	Atualiza um usuário.
DELETE	/usuarios/:id	Exclui um usuário.

5. Principais tecnologias e conceitos utilizados
- Node.js: ambiente de execução JavaScript utilizado no back-end.
- Express: framework utilizado para criar o servidor e gerenciar as rotas.
- File System (FS): módulo utilizado para ler e escrever arquivos.
- JSON: formato utilizado para armazenar os dados dos usuários.
- Middleware: recurso utilizado para interpretar os dados recebidos nas requisições.
- API REST: estrutura de comunicação que utiliza requisições HTTP.
- Controller: responsável por executar a lógica das operações.
- Router: responsável por organizar e direcionar as requisições.
6. Códigos de resposta HTTP
A API utiliza códigos de status HTTP para informar o resultado das requisições:
Código	Significado
200	Requisição realizada com sucesso.
201	Usuário cadastrado com sucesso.
400	Dados enviados inválidos ou incompletos.
404	Usuário não encontrado.
500	Erro interno do servidor.

7. Conclusão
O projeto Meu Primeiro Back-end tem como finalidade desenvolver uma API REST para gerenciamento de usuários, aplicando conceitos fundamentais de programação back-end com Node.js e Express.

Durante o desenvolvimento, são utilizados conceitos como criação de rotas, manipulação de arquivos JSON, requisições HTTP, operações CRUD e organização modular do código.

O projeto proporciona uma base prática para compreender como funciona a comunicação entre cliente e servidor e como uma API pode realizar operações de cadastro, consulta, atualização e exclusão de informações.

Observação importante: no código apresentado do usuarioscontrolles.js, existe um erro na função deletarUsuario(): a variável usuarios foi declarada com const, mas recebe uma nova atribuição. É necessário corrigir esse trecho para que a exclusão funcione corretamente.