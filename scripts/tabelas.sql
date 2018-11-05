CREATE TABLE produtos(
	id int(11) NOT NULL AUTO_INCREMENT,
	nome varchar(80) NOT NULL,
	quantidade int(2) NOT NULL DEFAULT '1',
	min_price decimal(4,2) NOT NULL DEFAULT '1.00',
	max_price decimal(8,2) NOT NULL,
	descricao varchar(256) NOT NULL DEFAULT 'Não há descrição',
	status varchar(20),
	user_id int(11) NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE users(
	id int(11) NOT NULL AUTO_INCREMENT, 
	nome varchar(20) NOT NULL, 
	sobrenome varchar(100) NOT NULL, 
	email varchar(50) NOT NULL, 
	senha varchar(20) NOT NULL, 
	celular varchar(11) NOT NULL, 
	status varchar(20) NOT NULL, 
	PRIMARY KEY (id)
);