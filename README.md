# BankSimoes
  
Neste repositório, conterá todo os softwares necessários para rodar o projeto "BankSimoes".  
  
## 1. Guia de pastas
  
Documentações gerais ficam na pasta: `docs/`  
  
Código backend fica na pasta: `backend/`

## 2. Colocando a rodar
  
*Obs: todos comandos abaixos devem ser rodados nesta pasta raiz*
1. Rodar o comando: `npm run install` (instala as dependências do eslint)
2. Com o Docker instalado, o projeto deve ser rodado com o seguinte comando: `docker-compose up --build`


## 3. Implementando Code Pattern com ESLint && Prettier
Para integrar o ESLint ao Visual Studio Code, você precisará instalar a extensão ESLint para o Visual Studio Code. Navegue de volta para o Visual Studio Code e pesquise ESLint na guia Extensões. Clique em Instalar depois de localizar a extensão:  
![Instalando extensão no VSCode](https://assets.digitalocean.com/articles/linting-and-formatting-with-eslint-in-vs-code/2.png)
  
Verifique o funcionamento forçando um erro de código: exemplo, declarar uma variável em `./backend/src/server.js` como var e verifique se o vscode acusa erro.  
Tente salvar, o comportamento esperado é que o VSCode corrija o erro para você.  
  
## 4. Tecnologias aplicadas
Express -> 

## 5. Rotas da API
1. GET /logout: Realiza o logout se o usuário estiver logado
2. POST /account/transfer: Transfere valor para a conta destino. Exemplo body:  
```
{
	"cpf": "355.487.910-01",
	"transfer": "400"	
}
```

## 6. Importando API para o Insomnia
1. Usar arquivo `./apiDoc/Insomnia_2022-02-07.json`
2. Importar via Insomnia seguindo o processo normal de importação de collections