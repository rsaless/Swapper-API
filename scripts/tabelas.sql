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
	email varchar(50) NOT NULL UNIQUE, 
	senha varchar(20) NOT NULL, 
	celular varchar(11) NOT NULL, 
	status varchar(20) NOT NULL, 
	PRIMARY KEY (id)
);


CREATE TABLE propostas(
	id int(11) NOT NULL AUTO_INCREMENT,
	data_criacao date NOT NULL,
	produto_ofertado int(11) NOT NULL,
	produto_desejado int(11) NOT NULL,
	dono_ofertado int(11) NOT NULL,
	dono_desejado int(11) NOT NULL,
	mensagem varchar(256) NOT NULL DEFAULT 'Vamos negociar!',
	PRIMARY KEY (id),
	CONSTRAINT fk_dono_ofertado FOREIGN KEY (dono_ofertado) REFERENCES users(id),
	CONSTRAINT fk_dono_desejado FOREIGN KEY (dono_desejado) REFERENCES users(id),
	CONSTRAINT fk_produto_desejado FOREIGN KEY (produto_desejado) REFERENCES produtos(id),
	CONSTRAINT fk_produto_ofertado FOREIGN KEY (produto_ofertado) REFERENCES produtos(id) 
);