# BankSimoes
  
Neste repositório, conterá todo os softwares necessários para rodar o projeto "BankSimoes".  
  
## 1. Guia de pastas
  
Documentações sobre as rotas e teste: `apiDoc/`  
  
Código backend fica na pasta: `backend/`

## 2. Colocando a rodar
  
*Obs: todos comandos abaixos devem ser rodados nesta pasta raiz*
1. Rodar o comando: `npm run install` (instala as dependências do eslint).
2. Colocar o arquivo .env na pasta backend/.
3. Colocar as variaveis de ambiente no docker-compose. O arquivo .env, foi enviado por e-mail ao RH.
4. Com o Docker instalado, o projeto deve ser rodado com o seguinte comando: `docker-compose up --build`.


## 3. Implementando Code Pattern com ESLint
Para integrar o ESLint ao Visual Studio Code, você precisará instalar a extensão ESLint para o Visual Studio Code. Navegue de volta para o Visual Studio Code e pesquise ESLint na guia Extensões. Clique em Instalar depois de localizar a extensão:  
![Instalando extensão no VSCode](https://assets.digitalocean.com/articles/linting-and-formatting-with-eslint-in-vs-code/2.png)
  
Verifique o funcionamento forçando um erro de código: exemplo, declarar uma variável em `./backend/src/server.js` como var e verifique se o vscode acusa erro.  
Tente salvar, o comportamento esperado é que o VSCode corrija o erro para você.  
  
## 4. Tecnologias aplicadas
1. Express -> Para fazer o roteamento.
2. Sequelize -> Para criar migrations e conexão com BD.
3. Mysql -> Armazenamento de informações.
4. Eslint -> Padronizar o código.
5. Docker -> Para facilitar o processo de executar aplicação.
6. bcryptjs -> Aplicar hash na senha no BD usando bcrypt para garantir que a senha jamais seja vazada.

## 5. Rotas da API
1. GET /logout: Realiza o logout se o usuário estiver logado
2. POST /account/transfer: Transfere valor para a conta destino. Exemplo body:  
```
{
	"cpf": "45562104881",
	"transfer": "400"	
}
```
3. POST /: Realizar o login para conseguir acessar a aplicação. Exemplo body:
```
{
	"cpf": "45562104881",
	"senha": "123"
}
```
4. POST /signup: Criação de usuario. Exemplo body:
```
{
	"nome":"Guilherme Junio Silva Simoes",
	"cpf": "45562104881",
	"senha": "123",
	"confirmacaoSenha": "123"
}
```
5. POST /account/deposit: Realiza a transferência. Exemplo body:
```
{
	"cpf": "45562104881",
	"transfer": "400"	
}
```
6. POST /account/withdraw: Realiza o saque. Exemplo body:
```
{
	"withdraw": "5"
}
```
7. GET /account: Ve o saldo da sua conta.

## 6. Importando API para o Insomnia
1. Usar arquivo `./apiDoc/Insomnia_2022-02-07.json`
2. Importar via Insomnia seguindo o processo normal de importação de collections
