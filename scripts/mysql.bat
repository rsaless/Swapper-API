mysql -u root
create database swapper;
use swapper;
CREATE TABLE users(
    id int(11) NOT NULL AUTO_INCREMENT,
    nome varchar(20) NOT NULL,
    sobrenome varchar(100) NOT NULL,
    email varchar(50) NOT NULL,
    senha varchar(20) NOT NULL,
    celular int(11) NOT NULL,
    PRIMARY KEY (id)
);