DROP DATABASE IF EXISTS rpgame;
CREATE DATABASE rpgame;

use rpgame;

CREATE TABLE game(
    id INT auto_increment NOT NULL,
    game_name VARCHAR(140) NOT NULL,
    password VARCHAR(24) NOT NULL,
    area INT DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE characters (
    id INT auto_increment  NOT NULL,
    character_name VARCHAR(100) NOT NULL,
    gold INT DEFAULT 2000,
    assets INT DEFAULT 0,
    potion INT DEFAULT 0,
    food INT DEFAULT 0,
    PRIMARY KEY(id)
)
