SET NAMES utf8mb4;
USE `toptop`;

SET @admin = 1; -- usuário admin inserido em 002_seed_user.sql

-- -----------------------------------------------------
-- Dados de referência
-- -----------------------------------------------------

INSERT INTO `genre` (`name`, `created_by`, `updated_by`)
VALUES ('Ação / Aventura / Fantasia', @admin, @admin);
SET @genre_id = LAST_INSERT_ID();

INSERT INTO `production_studio` (`name`, `created_by`, `updated_by`)
VALUES ('Toei Animation', @admin, @admin);
SET @studio_id = LAST_INSERT_ID();

INSERT INTO `broadcaster` (`name`, `created_by`, `updated_by`)
VALUES ('TV Asahi', @admin, @admin);
SET @broadcaster_id = LAST_INSERT_ID();

INSERT INTO `producer` (`name`, `created_by`, `updated_by`)
VALUES ('Toei', @admin, @admin);
SET @producer_id = LAST_INSERT_ID();

INSERT INTO `director` (`name`, `created_by`, `updated_by`)
VALUES ('Kōzō Morishita', @admin, @admin);
SET @director_id = LAST_INSERT_ID();

-- Staff genérico — placeholder até os dados reais serem cadastrados
INSERT INTO `animation_director` (`name`, `created_by`, `updated_by`)
VALUES ('Shingo Araki', @admin, @admin);
SET @anim_dir_id = LAST_INSERT_ID();

INSERT INTO `script` (`name`, `created_by`, `updated_by`)
VALUES ('Takao Kogure', @admin, @admin);
SET @script_id = LAST_INSERT_ID();

INSERT INTO `storyboard` (`name`, `created_by`, `updated_by`)
VALUES ('Kōzō Morishita', @admin, @admin);
SET @storyboard_id = LAST_INSERT_ID();

-- -----------------------------------------------------
-- Série
-- -----------------------------------------------------

INSERT INTO `series` (
  `name`, `release_date`, `release_start_date`, `release_end_date`, `type`,
  `director_id`, `genre_id`, `production_studio_id`, `broadcaster_id`, `producer_id`,
  `created_by`, `updated_by`
) VALUES (
  'Saint Seiya', '1986-10-11', '1986-10-11', '1989-04-01', 'TV',
  @director_id, @genre_id, @studio_id, @broadcaster_id, @producer_id,
  @admin, @admin
);
SET @series_id = LAST_INSERT_ID();

-- -----------------------------------------------------
-- Episódios — primeiros 5 como amostra
-- -----------------------------------------------------

INSERT INTO `episode` (`title`, `broadcasted_date`, `series_id`, `animation_director_id`, `script_id`, `storyboard_id`, `created_by`, `updated_by`)
VALUES
  ('Pegasus! A Armadura do Herói Lendário', '1986-10-11', @series_id, @anim_dir_id, @script_id, @storyboard_id, @admin, @admin),
  ('Duelo! O Combate dos Deuses',           '1986-10-18', @series_id, @anim_dir_id, @script_id, @storyboard_id, @admin, @admin),
  ('A Ressurreição do Cavaleiro de Bronze', '1986-10-25', @series_id, @anim_dir_id, @script_id, @storyboard_id, @admin, @admin),
  ('O Segredo da Armadura de Ouro',         '1986-11-01', @series_id, @anim_dir_id, @script_id, @storyboard_id, @admin, @admin),
  ('Marin, a Cavaleira de Prata',           '1986-11-08', @series_id, @anim_dir_id, @script_id, @storyboard_id, @admin, @admin);
