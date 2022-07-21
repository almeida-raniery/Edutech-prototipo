<h1 align="center">
  EDUtech
</h1>

<h1 align="center">
  Educational Technology Plataform
</h1>

<p align = "center">
Projeto de backend para a plataforma EDUtech - uma plataforma de educação à distância que oferece a criaçao de espaços de trabalho para as instituições de ensino. Cada espaço de trabalho criado pode receber o cadastro de usuários, com nível de permissão de administrador, professor e alunos. Dentro de cada espaço, podem ser cadastrados diferentes cursos. E dentro de cada curso podem ser cadastradas diferentes turmas de ensino. Os usuários são vinculados às turmas, cursos e espaços de trabalho.  
Este projeto faz a criação de um banco de dados, com todas as tabelas necessárias. E a criação de uma API para leitura, inclusão, atualização e deleção de dados no Banco. 
</p>

<blockquote align="center"></blockquote>

<h3 align= "center">
  Tecnologias&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</h3>

<p align="center" >
  As tecnologias utilizadas no projeto foram: Typescript | PostgreSQL | Express | Typeorm | Repository Pattern | Class Transformer | Error Global.
</p>
<br/>
<br/>

<h2 align="center">
  <a href ="#endpoints">API</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</h2>

<p align="left">
  Link para a API: <a href="https://kenzieu-api.herokuapp.com/" target="_blank">https://kenzieu-api.herokuapp.com/</a>
</p>


<p align="center">
  <a href="#endpoints">Endpoints</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

A API tem um total de 19 endpoints, sendo em volta principalmente do admin - podendo cadastrar novos cursos, classes, professores e alunos. <br/>
Para abrir no Insomnia clique abaixo <br/><a href="https://insomnia.rest/run/?label=UKenzie&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fdanielkleira%2Finsomnia.m4.projetofinal%2Fmain%2FprojetoM4Insomnia.json" target="_blank"><img src="https://insomnia.rest/images/run.svg" alt="Run in Insomnia"></a>

<br />
<br />
<br />
<br />

## **Endpoints**

## Rotas do Workspace

```json
[{ "baseurl": "https://" }]
```

<h2 align ='center'> Criando Workspace </h2>

Nessa aplicação o usuário sem fazer login ou se cadastrar pode criar um novo workspace, sendo adicionado como admin nesse workspace.

`POST /workspace `

<h2 align ='center'> Requisição </h2>

```json
{
  {
	"name": "Fullstack"
  }
}
```

<h2 align ='center'> Resposta de sucesso </h2>

`FORMATO DA RESPOSTA - STATUS 201`

```json
[
  {
    "message": "Successfully created",
    "workspace_name": "workspace_name",
    "workspace_id":"workspace_id",
    "user": {
      "id": "id_do_usuário",
      "name": "Admin",
      "email": "admin@example.com",
      "password": "password@example.com",
      "created_at": "creation_date",
      "last_login": "login_date"
    },
    "roleAdm": {
      "id": 21
    },
    "roleSTudent": {
      "id": 23
    },
    "roleTeacher": {
      "id": 22
    }
  }
]
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Preencher um objeto com o nome do workspace.

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Name already exists"
}
```

Preencher um objeto com o nome do workspace.

<h2 align ='center'> Listando Workspace </h2>
Para listar um workspace, o usuário deve passar o nome desse workspace.

`GET /workspace_name - FORMATO DA RESPOSTA - STATUS 200`

```json
[
  {
    "id": "132b0bd6-e09d-4ff4-9e4d-fbde21e076c2",
    "name": "Fullstack",
    "created_at": "2022-07-18T13:16:58.095Z"
  }
]
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Enviar o nome do workspace no fim da url.

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Workspace is not found"
}
```

Deve ser enviado um workspace que existe.

<br />
<br />
<br />
<br />

## Rotas de usuários

<h2 align ='center'> Criando um usuário </h2>

`POST /users`

<h2 align ='center'> Requisição </h2>

```json
{
  {
	"name": "user_name",
  "email": "user@example.com",
  "password": "user_password",
  "role_id":"role_example",
  "class_id":"class_example"
  }
}
```

`FORMATO DA RESPOSTA - STATUS 201`

```json
{
  {
	"name": "user_name",
  "email": "user@example.com",
  "id": "user_id",
  "created_at": "created_date",
  "last_login": "last_login"
  }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

É necessário passar nome, email, senha.

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Email already exists"
}
```

O email cadastrado deve ser único.

<h2 align ='center'> Fazendo Login </h2>

`POST /login`

<h2 align ='center'> Requisição </h2>

```json
{
  {
  "email": "user@example.com",
  "password": "user_password"
  }
}
```

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "token": "token"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será uma das duas a seguir:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

É necessário passar email e senha

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Unauthorized"
}
```

Email ou senha inválido

<h2 align ='center'> Listando todos os usuários de uma turma</h2>
Para listar todos os usuários de um curso, o usuário deve ser um admin ou professor.

`GET /courses/:id/users - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "users": []
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin ou professor

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "User not found"
}
```

Deve ser passado um usuário que existe

<h2 align ='center'> Listando todos os usuários de um curso</h2>
Para listar todos os usuários de uma turma, o usuário deve ser um admin ou professor.

`GET /classes/:id/users - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "users": []
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin ou professor



` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "User not found"
}
```

Deve ser passado um usuário que existe

<h2 align ='center'> Listando um usuário específico</h2>
Para listar um usuário o nivel de quem faz a requisição deve ser superior ao do listado. EX: Admin lista a si mesmo professores e alunos, professores listam a si mesmos e alunos, e alunos podem listar apenas o proprio perfil.

`GET /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  { 
    "name":"user_name",
    "id":"user_id",
    "email":"user_email",
    "created_at":"created_at",
    "last_login":"last_login"
   }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin ou professor


` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "User not found"
}
```

Deve ser passado um usuário que existe

<h2 align ='center'> Editando um usuário </h2>
Apenas o admin do workspace pode editar a classe de um usuário, porem o usuário normal pode editar seus dados pessoais.

`PATCH /users/:id`

<h2 align ='center'> Requisição </h2>

```json
{
  {
	"name": "user_name",
  "password": "user_password"
  }
}
```

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  { 
    "name":"user_name",
    "id":"user_id",
    "email":"user_email",
    "created_at":"created_at",
    "last_login":"last_login"
   }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado no corpo da requisição o nome, senha.

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin ou professor


` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "User not found"
}
```

Deve ser passado um usuário que existe

<h2 align ='center'> Deletando um usuário </h2>
Para listar um usuário o nivel de quem faz a requisição deve ser superior ao do listado. EX: Admin deleta professores e alunos, professores deletam alunos, e alunos não podem deletar.

`DELETE /users/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Deleted user successfully"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado no corpo da requisição o nome, senha.

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin ou professor


` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "User not found"
}
```

Deve ser passado um usuário que existe

<br />
<br />
<br />
<br />

## Rotas de cursos

<h2 align ='center'> Criando um curso </h2>
É necessário ser admin para criar um curso novo.

`POST /courses `

<h2 align ='center'> Requisição </h2>

```json
{
  {
	"title": "title_course",
  }
}
```

`FORMATO DA RESPOSTA - STATUS 201`

```json
{
  {
    "title": "title_course",
    "course_id":"course_id",
    "created_at":"created_date"
  }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado no corpo da requisição o titulo do curso

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Course already exists"
}
```

Não é possível criar dois cursos com o mesmo nome.

<h2 align ='center'> Listando todos os cursos </h2>
É necessário ser admin do workspace para listar todos os cursos.

`GET /courses - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "courses": []
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado no corpo da requisição o nome, senha.

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Course not found"
}
```

Deve ser passado um curso que existe

<h2 align ='center'> Listar um curso específico </h2>
É necessário ser admin ou professor do curso para listar o curso.

`GET /courses/:course_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  {
    "title": "title_course",
    "course_id":"course_id",
    "created_at":"created_date"
  }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado na url o id de um curso válido

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Course not found"
}
```

Deve ser passado um curso que existe

<h2 align ='center'> Atualizar um curso </h2>

`PATCH /courses/:course_id `

<h2 align ='center'> Requisição </h2>

```json
{
  {
	"title": "title_course",
  }
}
```

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  {
    "title": "title_course",
    "course_id":"course_id",
    "created_at":"created_date"
  }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado no corpo da requisição o título do curso

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Course not found"
}
```

Deve ser passado um curso que existe

<h2 align ='center'> Deletar um curso </h2>

`DELETE /courses/:course_id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Deleted course successfully"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado na url um id válido

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Course not found"
}
```

Deve ser passado um curso que existe

<br />
<br />
<br />
<br />

## Rotas de classes

<h2 align ='center'> Criar uma classe </h2>
Apenas admin e professores podem criar classes. Professores criam classes apenas nas turmas que estão.

`POST /courses/:course_id/classes`

<h2 align ='center'> Requisição </h2>

```json
{
  {
	"title": "title_class"
  }
}
```

`FORMATO DA RESPOSTA - STATUS 201`

```json
{
  {
    "title": "title_class",
    "class_id":"class_id",
    "created_at":"created_date"
  }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado no corpo da requisição um nome para a classe

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Class already exists"
}
```

Deve ser passado um curso que não existe

<h2 align ='center'> Listar todas as classes de um curso </h2>
Apenas admin e professores podem listar as classes de um curso. Professores listam classes apenas dos cursos em que estão cadastrados.

`GET /courses/:course_id/classes - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "classes": []
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado na url um id válido

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin ou ser professor nessa classe

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Classe is not found"
}
```

Deve ser passado uma classe que existe

<h2 align ='center'> Listar uma classe específica </h2>
Todos os usuários podem listar uma classe, no caso dos alunos, podem listar caso sejam alunos dessa classe.

`GET /courses/:course_id/classes/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  {
    "title": "title_class",
    "class_id":"class_id",
    "created_at":"created_date",
    "usersList":[]
  }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado na url um id válido

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin ou ser professor nessa classe

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Classe is not found"
}
```

Deve ser passado uma classe que existe

<h2 align ='center'> Editar classe </h2>
Apenas admin e professores podem listar uma classe.

`PATCH /courses/:course_id/classes/:id`

<h2 align ='center'> Requisição </h2>

```json
{
  {
	"title": "title_class",
  }
}
```

`FORMATO DA RESPOSTA - STATUS 200`

```json
{
  {
    "title": "title_class",
    "class_id":"class_id",
    "created_at":"created_date"
  }
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado no corpo da requisição um nome válido

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Classe is not found"
}
```

Deve ser passado uma classe que existe

<h2 align ='center'> Deletar uma classe </h2>
Apenas admin pode deletar uma classe.

`DELETE /courses/:course_id/classes/:id - FORMATO DA RESPOSTA - STATUS 200`

```json
{
  "message": "Deleted class successfully"
}
```

<h2 align ='center'> Possíveis erros </h2>

Caso você acabe errando e mandando algum campo errado, a resposta de erro será assim:

` FORMATO DA RESPOSTA - STATUS 400`

```json
{
  "Error": "Invalid parameters"
}
```

Deve ser enviado na url um id válido

` FORMATO DA RESPOSTA - STATUS 401`

```json
{
  "Error": "Invalid token"
}
```

Para fazer essa requisição é necessário ser admin

` FORMATO DA RESPOSTA - STATUS 404`

```json
{
  "Error": "Classe is not found"
}
```

Deve ser passado uma classe que existe

<br />
<br />
<br />
<br />
---
Desenvolvido por:

```json
{
  "Daniel Leira": "Product Owner",
  "Eliane Discacciati": "Developer",
  "Henrique Schardosim": "Developer",
  "Lucas Corrêa": "Developer",
  "Paulo Vitor": "Scrum Master",
  "Raniery Almeida": "Tech Lead"
}
```
