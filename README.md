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
> CREATE TABLE users(id int(11) NOT NULL AUTO_INCREMENT, nome varchar(20) NOT NULL, sobrenome varchar(100) NOT NULL, email varchar(50) NOT NULL, senha varchar(20) NOT NULL, celular int(11) NOT NULL, PRIMARY KEY (id));


## Documentação
URLs, Rotas, Parâmetros e afins...