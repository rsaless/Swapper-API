# Swapper API
Este projeto é apenas parte de um projeto maior. Um Sistema Web desenvolvido utilizando Angular, Node JS, e MongoDB.

## A API  
Esta é uma API Node desenvolvida para o back-end do Sistema Swapper. Possui as responsabilidades de:
* acesso ao banco de dados  
* cadasto, manipulação e remoção de usuários  
* cadastro, manipulação e remoção de produtos  
* sistema de login  

Observação: Na primeira versão da API, o banco de dados utilizado será o MySQL. Posteriormente haverá a migração para o serviço MongoDB.

## Usando node.js

```
node index.js
```

## Configuração do banco de dados  
> mysql -u root   
> create database swapper;  
> use swapper;  

``` sql
CREATE TABLE users(
    id int(11) NOT NULL AUTO_INCREMENT,
    nome varchar(20) NOT NULL,
    sobrenome varchar(100) NOT NULL,
    email varchar(50) NOT NULL UNIQUE,
    usuario varchar(20) NOT NULL UNIQUE,
    senha varchar(20) NOT NULL,
    celular varchar(11) NOT NULL,
    endereco varchar(100) NOT NULL,
    numero int(5) NOT NULL,
    cidade varchar(30) NOT NULL,
    status varchar(20) NOT NULL,
    PRIMARY KEY (id)
);   

CREATE TABLE produtos(
    id int(11) NOT NULL AUTO_INCREMENT,
    nome varchar(80) NOT NULL,
    quantidade int(2) NOT NULL DEFAULT '1',
    descricao varchar(256) NOT NULL DEFAULT 'Não há descrição',
	categoria varchar(20) NOT NULL,
    status varchar(20) NOT NULL,
    user_id int(11) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);   

CREATE TABLE propostas(
    id int(11) NOT NULL AUTO_INCREMENT,
    data_criacao date NOT NULL,
    produto_ofertado int(11) NOT NULL,
    produto_desejado int(11) NOT NULL,
    dono_ofertado int(11) NOT NULL,
    dono_desejado int(11) NOT NULL,
    mensagem varchar(256) NOT NULL DEFAULT 'Vamos negociar!',
    status varchar(20) NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT fk_dono_ofertado FOREIGN KEY (dono_ofertado) REFERENCES users(id),
    CONSTRAINT fk_dono_desejado FOREIGN KEY (dono_desejado) REFERENCES users(id),
    CONSTRAINT fk_produto_desejado FOREIGN KEY (produto_desejado) REFERENCES produtos(id),
    CONSTRAINT fk_produto_ofertado FOREIGN KEY (produto_ofertado) REFERENCES produtos(id)
);  
```

## Rotas disponíveis  
URL base: http://localhost:3000

| Método    | Rota                                                          | Implementação      | Integração | Descrição                                                |
|:----------|:--------------------------------------------------------------|:------------------:|:----------:|:---------------------------------------------------------|
| POST      | `user/login`                                                  |:heavy_check_mark:  |:heavy_check_mark:         | Efetuar login na aplicação                               |
| GET       | `/user/(username)/`                                           |:heavy_check_mark:  |:heavy_check_mark:         | Listar dados de um usuário                               |
| POST      | `/user/cadastro`                                              |:heavy_check_mark:  |:heavy_check_mark:         | Cadastrar um novo usuário                                |
| PUT       | `/user/(ID)/atualiza`                                         |:heavy_check_mark:  |:x:         | Atualizar dados de um usuário                            |
| DELETE    | `/user/(ID)/remove`                                           |:heavy_check_mark:  |:x:         | Remover um usuário da aplicação                          |
| GET       | `/user/(ID)/produtos`                                         |:heavy_check_mark:  |:heavy_check_mark:         | Retornar os produtos de um usuário                       |
| GET       | `/user/(ID)/produtos/(produto)`                               |:heavy_check_mark:  |:x:         | Retornar os dados de um produto                          |
| PUT       | `/user/(ID)/produtos/(produto)/edita`                         |:heavy_check_mark:  |:x:         | Editar os dados de um produto                            |
| DELETE    | `/user/(ID)/produtos/(produto)/remove`                        |:heavy_check_mark:  |:x:         | Remover um produto da aplicação                          |
| POST      | `/user/(ID)/produtos/cadastra`                                |:heavy_check_mark:  |:heavy_check_mark:         | Cadastrar um novo produto                                |
| GET       | `/user/(ID)/propostas/feitas`                                 |:heavy_check_mark:  |:x:         | Listar propostas feitas pelo usuário                     |
| GET       | `/user/(ID)/propostas/recebidas`                              |:heavy_check_mark:  |:x:         | Listar propostas recebidas pelo usuário                  |
| GET       | `/user/(ID)/produtos/(produto)/propostas`                     |:heavy_check_mark:  |:x:         | Retornar os dados de uma proposta                        |
| GET       | `/user/(ID)/produtos/(produto)/propostas/(proposta)`          |:heavy_check_mark:  |:x:         | Retornar os dados de uma proposta                        |
| POST      | `/user/(ID)/produtos/(produto)/propostas/(proposta)/aceitar`  |:heavy_check_mark:  |:x:         | Aceitar uma proposta                                     |
| POST      | `/user/(ID)/produtos/(produto)/propostas/(proposta)/recusar`  |:heavy_check_mark:  |:x:         | Recusar uma proposta                                     |
| POST      | `/user/(ID)/produtos/(produto)/propostas/nova/(ID2)/(oferta)` |:heavy_check_mark:  |:x:         | 'ID2' oferece 'oferta' para 'ID' em troca de 'produto'   |    
