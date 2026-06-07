SET NAMES utf8mb4;
SET CHARACTER SET utf8mb4;
SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

DROP SCHEMA IF EXISTS `toptop`;
CREATE SCHEMA IF NOT EXISTS `toptop` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `toptop`;

-- -----------------------------------------------------
-- user (entidade raiz — sem auditoria de criador)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `user` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `name`         VARCHAR(255) NULL,
  `username`     VARCHAR(255) NOT NULL,
  `email`        VARCHAR(255) NULL,
  `password`     VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_user_username` (`username`),
  UNIQUE INDEX `uq_user_email`    (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- director
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `director` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`   INT          NOT NULL,
  `updated_time` TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`   INT          NOT NULL,
  `name`         VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_director_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_director_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- genre
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `genre` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`   INT          NOT NULL,
  `updated_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`   INT          NOT NULL,
  `name`         VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_genre_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_genre_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- production_studio
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `production_studio` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`   INT          NOT NULL,
  `updated_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`   INT          NOT NULL,
  `name`         VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_production_studio_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_production_studio_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- broadcaster
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `broadcaster` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`   INT          NOT NULL,
  `updated_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`   INT          NULL,
  `name`         VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_broadcaster_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_broadcaster_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- producer
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `producer` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`   INT          NOT NULL,
  `updated_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`   INT          NOT NULL,
  `name`         VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_producer_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_producer_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- animation_director
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `animation_director` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`   INT          NOT NULL,
  `updated_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`   INT          NOT NULL,
  `name`         VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_animation_director_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_animation_director_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- script
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `script` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`   INT          NOT NULL,
  `updated_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`   INT          NOT NULL,
  `name`         VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_script_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_script_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- storyboard
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `storyboard` (
  `id`           INT          NOT NULL AUTO_INCREMENT,
  `created_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`   INT          NOT NULL,
  `updated_time` TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`   INT          NOT NULL,
  `name`         VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_storyboard_created_by` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`),
  CONSTRAINT `fk_storyboard_updated_by` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- series (depende de: director, genre, production_studio, broadcaster, producer)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `series` (
  `id`                    INT          NOT NULL AUTO_INCREMENT,
  `created_time`          TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`            INT          NOT NULL,
  `updated_time`          TIMESTAMP    NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`            INT          NOT NULL,
  `name`                  VARCHAR(255) NOT NULL,
  `release_date`          DATETIME     NOT NULL,
  `release_start_date`    DATETIME     NULL,
  `release_end_date`      DATETIME     NULL,
  `type`                  ENUM('TV','OVA','ONA','MOVIE') NULL DEFAULT 'TV',
  `director_id`           INT          NOT NULL,
  `genre_id`              INT          NOT NULL,
  `production_studio_id`  INT          NOT NULL,
  `broadcaster_id`        INT          NOT NULL,
  `producer_id`           INT          NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `uq_series_name` (`name`),
  CONSTRAINT `fk_series_created_by`        FOREIGN KEY (`created_by`)           REFERENCES `user`             (`id`),
  CONSTRAINT `fk_series_updated_by`        FOREIGN KEY (`updated_by`)           REFERENCES `user`             (`id`),
  CONSTRAINT `fk_series_director`          FOREIGN KEY (`director_id`)          REFERENCES `director`         (`id`),
  CONSTRAINT `fk_series_genre`             FOREIGN KEY (`genre_id`)             REFERENCES `genre`            (`id`),
  CONSTRAINT `fk_series_production_studio` FOREIGN KEY (`production_studio_id`) REFERENCES `production_studio`(`id`),
  CONSTRAINT `fk_series_broadcaster`       FOREIGN KEY (`broadcaster_id`)       REFERENCES `broadcaster`      (`id`),
  CONSTRAINT `fk_series_producer`          FOREIGN KEY (`producer_id`)          REFERENCES `producer`         (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- -----------------------------------------------------
-- episode (depende de: series, animation_director, script, storyboard)
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `episode` (
  `id`                    INT          NOT NULL AUTO_INCREMENT,
  `created_time`          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `created_by`            INT          NOT NULL,
  `updated_time`          TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `updated_by`            INT          NOT NULL,
  `title`                 VARCHAR(255) NOT NULL,
  `broadcasted_date`      DATETIME     NULL,
  `series_id`             INT          NOT NULL,
  `animation_director_id` INT          NOT NULL,
  `script_id`             INT          NOT NULL,
  `storyboard_id`         INT          NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_episode_created_by`        FOREIGN KEY (`created_by`)           REFERENCES `user`              (`id`),
  CONSTRAINT `fk_episode_updated_by`        FOREIGN KEY (`updated_by`)           REFERENCES `user`              (`id`),
  CONSTRAINT `fk_episode_series`            FOREIGN KEY (`series_id`)            REFERENCES `series`            (`id`),
  CONSTRAINT `fk_episode_animation_director`FOREIGN KEY (`animation_director_id`)REFERENCES `animation_director`(`id`),
  CONSTRAINT `fk_episode_script`            FOREIGN KEY (`script_id`)            REFERENCES `script`            (`id`),
  CONSTRAINT `fk_episode_storyboard`        FOREIGN KEY (`storyboard_id`)        REFERENCES `storyboard`        (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
