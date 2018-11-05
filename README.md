# Swapper API
este projeto é apenas parte de um projeto maior. Um Sistema Web desenvolvido utilizando Angular, Node JS, e MongoDB.

## A API  
Esta é uma API Node desenvolvida para o back-end do Sistema Swapper. Possui as responsabilidades de:
* acesso ao banco de dados  
* cadasto, manipulação e remoção de usuários  
* cadastro, manipulação e remoção de produtos  
* sistema de login  

Observação: Na primeira versão da API, o banco de dados utilizado será o MySQL. Posteriormente haverá a migração para o serviço MongoDB.

## Configuração do banco de dados  
> mysql -u root   
> create database swapper;  
> use swapper;  
> CREATE TABLE users(id int(11) NOT NULL AUTO_INCREMENT, nome varchar(20) NOT NULL, sobrenome varchar(100) NOT NULL, email varchar(50) NOT NULL, senha varchar(20) NOT NULL, celular varchar(11) NOT NULL, status varchar(20) NOT NULL, PRIMARY KEY (id));


## Documentação
URLs, Rotas, Parâmetros e afins...

### Rotas disponíveis  
URL base: http://localhost:3000

| Método    | Rota                                      | Status             | Descrição                                |
| :-------- | :---                                      | :---:              | :---                                     |
| POST      | `/login`                                  |:x:                 | Efetuar login na aplicação               |
| POST      | `/logout`                                 |:x:                 | Efetuar logout na aplicação              |
| GET       | `/user/(ID)/`                             |:heavy_check_mark:  | Listar dados de um usuário               |
| POST      | `/user/cadastro`                          |:heavy_check_mark:  | Cadastrar um novo usuário                |
| PUT       | `/user/(ID)/atualiza`                     |:heavy_check_mark:  | Atualizar dados de um usuário            |
| DELETE    | `/user/(ID)/remove`                       |:x:                 | Remover um usuário da aplicação          |
| GET       | `/user/(ID)/produtos`                     |:x:                 | Retornar os produtos de um usuário       |
| GET       | `/user/(ID)/produtos/produto`             |:x:                 | Retornar os dados de um produto          |
| PUT       | `/user/(ID)/produtos/produto/edita`       |:x:                 | Editar os dados de um produto            |
| DELETE    | `/user/(ID)/produtos/produto/remove`      |:x:                 | Remover um produto da aplicação          |
| POST      | `/user/(ID)/produtos/cadastra`            |:x:                 | Cadastrar um novo produto                |
| GET       | `/user/(ID)/propostas/feitas`             |:x:                 | Listar propostas feitas pelo usuário     |
| GET       | `/user/(ID)/propostas/recebidas`          |:x:                 | Listar propostas recebidas pelo usuário  |
| GET       | `/user/(ID)/propostas/proposta`           |:x:                 | Retornar os dados de uma proposta        |
| POST      | `/user/(ID)/propostas/proposta/aceitar`   |:x:                 | Aceitar uma proposta                     |
| POST      | `/user/(ID)/propostas/proposta/recusar`   |:x:                 | Recusar uma proposta                     |
| POST      | `/user/(ID)/produtos/produto/propor`      |:x:                 | Realizar uma proposta                    |    



