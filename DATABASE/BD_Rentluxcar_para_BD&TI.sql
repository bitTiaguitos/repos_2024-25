create database Rentluxcar;
use Rentluxcar;

#-----------------------------------------------------------criar a tabela para os clientes-------------------------------------------------------------------------------------
CREATE TABLE cliente (
id_cliente INT PRIMARY KEY AUTO_INCREMENT,
nome_cliente VARCHAR(255) NOT NULL,
genero CHAR(1) NOT NULL,
telemovel VARCHAR(255),
idade INT NOT NULL,
data_de_criacao TIMESTAMP NOT NULL DEFAULT NOW(),
FOREIGN KEY (id_aluguer) REFERENCES aluguer(id_aluguer)
);

#---------------------------------------------------------criar tabela para credenciais de cada cliente------------------------------------------------------------------------
CREATE TABLE credencias_cliente (
    id_credenciais INT PRIMARY KEY AUTO_INCREMENT,
    id_cliente INT,
    nome_utilizador VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL DEFAULT 'Cliente',
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente)
);

#-----------------------------------------------------------criar a tabela para os carros diponíveis para alugar----------------------------------------------------------------
CREATE TABLE viaturas (
id_viatura INT PRIMARY KEY AUTO_INCREMENT,
marca_viatura_alugada VARCHAR(30) NOT NULL,
modelo_viatura_alugada VARCHAR(30) NOT NULL,
tipo_viatura VARCHAR(20) NOT NULL,
ano_viatura INT NOT NULL,
preco DECIMAL(10,2) NOT NULL,
tipo_aluguer VARCHAR(30) NOT NULL
);

#---------------------------------------------------------criar a tabela para os alugueres realizados--------------------------------------------------------------------------
CREATE TABLE aluguer (
id_aluguer INT PRIMARY KEY AUTO_INCREMENT,
carro_alugado VARCHAR(255) NOT NULL UNIQUE,
genero CHAR(1) NOT NULL,
telemovel VARCHAR(255),
idade INT NOT NULL,
data_de_aluguer TIMESTAMP NOT NULL DEFAULT NOW(),
inicio_aluguer DATETIME NOT NULL DEFAULT NOW(), ####como colocar display como DD-MM-YYYY
fim_aluguer DATETIME NOT NULL DEFAULT NOW() ####como colocar display como DD-MM-YYYY
);

#------------------------------------------------------------------criar tabela para pagamentos--------------------------------------------------------------------------------
CREATE TABLE payments (
    id_pagameto INT PRIMARY KEY AUTO_INCREMENT,
    id_aluguer INT,
    valor DECIMAL(10, 2) NOT NULL,
    data_pagamento TIMESTAMP DEFAULT NOW(),
    estado_pagamento VARCHAR(50) NOT NULL,
    forma_pagamento VARCHAR(50),
    FOREIGN KEY (id_aluguer) REFERENCES aluguer(id_aluguer)
);