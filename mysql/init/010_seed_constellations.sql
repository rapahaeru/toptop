-- 010_seed_constellations.sql
SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;

-- Zodíaco (GOLD)
INSERT IGNORE INTO constellations (name, type) VALUES
 ('Áries', 'ZODIAC'),
 ('Touro', 'ZODIAC'),
 ('Gêmeos', 'ZODIAC'),
 ('Câncer', 'ZODIAC'),
 ('Leão', 'ZODIAC'),
 ('Virgem', 'ZODIAC'),
 ('Libra', 'ZODIAC'),
 ('Escorpião', 'ZODIAC'),
 ('Sagitário', 'ZODIAC'),
 ('Capricórnio', 'ZODIAC'),
 ('Aquário', 'ZODIAC'),
 ('Peixes', 'ZODIAC');

-- Bronzes clássicos
INSERT IGNORE INTO constellations (name, type) VALUES
 ('Pégaso', 'BRONZE'),
 ('Dragão', 'BRONZE'),
 ('Cisne', 'BRONZE'),
 ('Andrômeda', 'BRONZE'),
 ('Fênix', 'BRONZE');
