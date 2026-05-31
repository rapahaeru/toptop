SET NAMES utf8mb4;
USE `toptop`;

SET @admin = 1;

-- -----------------------------------------------------
-- Referências da série
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

-- -----------------------------------------------------
-- Diretores de animação (14 únicos — fonte: Wikipedia JP)
-- -----------------------------------------------------

INSERT INTO `animation_director` (`name`, `created_by`, `updated_by`) VALUES
  ('Hatada Tadao',      @admin, @admin),
  ('Takai Hisashi',     @admin, @admin),
  ('Sasamon Nobuyoshi', @admin, @admin),
  ('Nakajima Goro',     @admin, @admin),
  ('Kobayashi Tomoko',  @admin, @admin),
  ('Naoi Masahiro',     @admin, @admin),
  ('Ito Iwamitsu',      @admin, @admin),
  ('Hata Hidenobu',     @admin, @admin),
  ('Shindo Mitsuo',     @admin, @admin),
  ('Kawai Shizuo',      @admin, @admin),
  ('Tadano Kazuko',     @admin, @admin),
  ('Inoue Eisaku',      @admin, @admin),
  ('Shikano Yoshiyuki', @admin, @admin),
  ('Okawachi Hiro',     @admin, @admin);

-- -----------------------------------------------------
-- Roteiristas (22 únicos — fonte: Wikipedia JP / ANN)
-- Nota: eps 2-13 podem ter coluna 演出 (diretor ep.) ao invés de 脚本
-- -----------------------------------------------------

INSERT INTO `script` (`name`, `created_by`, `updated_by`) VALUES
  ('Koyama Takao',       @admin, @admin),
  ('Katsumata Tomoharu', @admin, @admin),
  ('Umezawa Atsutoshi',  @admin, @admin),
  ('Nishizawa Nobutaka', @admin, @admin),
  ('Masaki Shinichi',    @admin, @admin),
  ('Morishita Kozo',     @admin, @admin),
  ('Yamanouchi Shigeyasu', @admin, @admin),
  ('Kageyama Tsuruhisa', @admin, @admin),
  ('Ishizaki Susumu',    @admin, @admin),
  ('Yamazaki Tadaaki',   @admin, @admin),
  ('Akihi Masayuki',     @admin, @admin),
  ('Fukutome Masanori',  @admin, @admin),
  ('Kikuchi Kazuhito',   @admin, @admin),
  ('Suga Yoshiyuki',     @admin, @admin),
  ('Takagi Fuse',        @admin, @admin),
  ('Fukuda Jun',         @admin, @admin),
  ('Ohashi Katsumi',     @admin, @admin),
  ('Yokoyama Hiroyuki',  @admin, @admin),
  ('Matano Hiromichi',   @admin, @admin),
  ('Ito Masao',          @admin, @admin),
  ('Mibuichi Katsumi',   @admin, @admin),
  ('Hosoda Masahiro',    @admin, @admin);

-- -----------------------------------------------------
-- Storyboarders (25 únicos — fonte: Wikipedia JP)
-- -----------------------------------------------------

INSERT INTO `storyboard` (`name`, `created_by`, `updated_by`) VALUES
  ('Morishita Kozo',     @admin, @admin),
  ('Aoki Tetsuro',       @admin, @admin),
  ('Hasegawa Norio',     @admin, @admin),
  ('Kaneko Hirotoshi',   @admin, @admin),
  ('Takai Hisashi',      @admin, @admin),
  ('Oshima Joji',        @admin, @admin),
  ('Shindo Mitsuo',      @admin, @admin),
  ('Sasamon Nobuyoshi',  @admin, @admin),
  ('Makino Yukihiro',    @admin, @admin),
  ('Nakajima Goro',      @admin, @admin),
  ('Kobayashi Tomoko',   @admin, @admin),
  ('Naoi Masahiro',      @admin, @admin),
  ('Araki Shingo',       @admin, @admin),
  ('Inatsu Zenkichi',    @admin, @admin),
  ('Ishizaki Susumu',    @admin, @admin),
  ('Akihi Masayuki',     @admin, @admin),
  ('Kikuchi Kazuhito',   @admin, @admin),
  ('Yamanouchi Shigeyasu', @admin, @admin),
  ('Katsumata Tomoharu', @admin, @admin),
  ('Inoue Eisaku',       @admin, @admin),
  ('Kawai Shizuo',       @admin, @admin),
  ('Mibuichi Katsumi',   @admin, @admin),
  ('Tadano Kazuko',      @admin, @admin),
  ('Hosoda Masahiro',    @admin, @admin),
  ('Hoshikawa Nobuyoshi', @admin, @admin);

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
-- Episódios — 114 episódios do Saint Seiya clássico
-- Fonte: Wikipedia JP (聖闘士星矢) + ANN
-- Títulos em inglês — adaptar para PT conforme necessário
-- -----------------------------------------------------

INSERT INTO `episode` (`title`, `broadcasted_date`, `series_id`, `animation_director_id`, `script_id`, `storyboard_id`, `created_by`, `updated_by`)
SELECT 'Revive! Legendary Hero', '1986-10-11', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Morishita Kozo'), @admin, @admin UNION ALL
SELECT 'Burn! Pegasus Meteor Fist!', '1986-10-18', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Katsumata Tomoharu'), (SELECT id FROM storyboard WHERE name='Aoki Tetsuro'), @admin, @admin UNION ALL
SELECT 'Cygnus! Warrior of the Ice Fields', '1986-10-25', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Umezawa Atsutoshi'), (SELECT id FROM storyboard WHERE name='Hasegawa Norio'), @admin, @admin UNION ALL
SELECT 'Dragon! The Invincible Fist and Shield', '1986-11-01', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Nishizawa Nobutaka'), (SELECT id FROM storyboard WHERE name='Kaneko Hirotoshi'), @admin, @admin UNION ALL
SELECT 'Miraculous Revival! Cosmo of Friendship', '1986-11-15', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Masaki Shinichi'), (SELECT id FROM storyboard WHERE name='Takai Hisashi'), @admin, @admin UNION ALL
SELECT 'Phoenix! The Warrior who Saw Hell', '1986-11-22', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Morishita Kozo'), (SELECT id FROM storyboard WHERE name='Aoki Tetsuro'), @admin, @admin UNION ALL
SELECT 'Stolen! The Gold Cloth', '1986-11-29', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Katsumata Tomoharu'), (SELECT id FROM storyboard WHERE name='Hasegawa Norio'), @admin, @admin UNION ALL
SELECT 'Defeat Them! The Black Phoenix Army', '1986-12-06', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Oshima Joji'), @admin, @admin UNION ALL
SELECT 'Formidable Enemies! The Black Four Appear', '1986-12-13', @series_id, (SELECT id FROM animation_director WHERE name='Takai Hisashi'), (SELECT id FROM script WHERE name='Kageyama Tsuruhisa'), (SELECT id FROM storyboard WHERE name='Takai Hisashi'), @admin, @admin UNION ALL
SELECT 'Beware Shiryu! The Cemetery of Cloths', '1986-12-20', @series_id, (SELECT id FROM animation_director WHERE name='Takai Hisashi'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Life and Death Battle! Fear of the Black Death Fist', '1986-12-27', @series_id, (SELECT id FROM animation_director WHERE name='Sasamon Nobuyoshi'), (SELECT id FROM script WHERE name='Katsumata Tomoharu'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Catch It! The Nebula Chain of Friendship', '1987-01-10', @series_id, (SELECT id FROM animation_director WHERE name='Sasamon Nobuyoshi'), (SELECT id FROM script WHERE name='Morishita Kozo'), (SELECT id FROM storyboard WHERE name='Makino Yukihiro'), @admin, @admin UNION ALL
SELECT 'Burn Up! Punch of Flames', '1987-01-17', @series_id, (SELECT id FROM animation_director WHERE name='Nakajima Goro'), (SELECT id FROM script WHERE name='Yamazaki Tadaaki'), (SELECT id FROM storyboard WHERE name='Nakajima Goro'), @admin, @admin UNION ALL
SELECT 'It Was Defeated! The Illusion Demon Fist', '1987-01-24', @series_id, (SELECT id FROM animation_director WHERE name='Kobayashi Tomoko'), (SELECT id FROM script WHERE name='Katsumata Tomoharu'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Now It''s Revealed! Ikki''s Secret', '1987-01-31', @series_id, (SELECT id FROM animation_director WHERE name='Naoi Masahiro'), (SELECT id FROM script WHERE name='Akihi Masayuki'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'The Giant! Docrates'' Powerful Attack', '1987-02-07', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Morishita Kozo'), (SELECT id FROM storyboard WHERE name='Araki Shingo'), @admin, @admin UNION ALL
SELECT 'To the Rescue! Saori''s Crisis', '1987-02-14', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Fukutome Masanori'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Great Rage! The Ghost Saints of the Caribbean', '1987-02-21', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Life or Death! Bloody Battle at the Island of Spirits', '1987-02-28', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Katsumata Tomoharu'), (SELECT id FROM storyboard WHERE name='Makino Yukihiro'), @admin, @admin UNION ALL
SELECT 'Serious Battle! Shaina''s Counter Attack', '1987-03-07', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Ruthless! Aurora''s Duel', '1987-03-14', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Morishita Kozo'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Blazing Revival! The Immortal Ikki', '1987-03-21', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Silver Saints! The Proud Assassins', '1987-03-28', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Akihi Masayuki'), (SELECT id FROM storyboard WHERE name='Araki Shingo'), @admin, @admin UNION ALL
SELECT 'Fly Pegasus! Like a Comet', '1987-04-11', @series_id, (SELECT id FROM animation_director WHERE name='Ito Iwamitsu'), (SELECT id FROM script WHERE name='Morishita Kozo'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Even in Death! To Athena''s Side', '1987-04-18', @series_id, (SELECT id FROM animation_director WHERE name='Ito Iwamitsu'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Oshima Joji'), @admin, @admin UNION ALL
SELECT 'Enemy or Ally! Steel Saints', '1987-04-25', @series_id, (SELECT id FROM animation_director WHERE name='Ito Iwamitsu'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Inatsu Zenkichi'), @admin, @admin UNION ALL
SELECT 'Star Turned to Stone! Medusa''s Shield', '1987-05-02', @series_id, (SELECT id FROM animation_director WHERE name='Ito Iwamitsu'), (SELECT id FROM script WHERE name='Akihi Masayuki'), (SELECT id FROM storyboard WHERE name='Aoki Tetsuro'), @admin, @admin UNION ALL
SELECT 'Dragon! A Blow with All of One''s Might', '1987-05-09', @series_id, (SELECT id FROM animation_director WHERE name='Ito Iwamitsu'), (SELECT id FROM script WHERE name='Morishita Kozo'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Temptation! The Crow Legion Attacks Saori', '1987-05-16', @series_id, (SELECT id FROM animation_director WHERE name='Ito Iwamitsu'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Burn Up! The Cosmo of Love', '1987-05-23', @series_id, (SELECT id FROM animation_director WHERE name='Ito Iwamitsu'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Araki Shingo'), @admin, @admin UNION ALL
SELECT 'Phantom Demon! Deadline Between Life and Death', '1987-05-30', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Big Explosion! Death Queen Island', '1987-06-06', @series_id, (SELECT id FROM animation_director WHERE name='Hata Hidenobu'), (SELECT id FROM script WHERE name='Akihi Masayuki'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Dragon vs Tiger! Tears of the Dragon Without Helmet', '1987-06-13', @series_id, (SELECT id FROM animation_director WHERE name='Hata Hidenobu'), (SELECT id FROM script WHERE name='Morishita Kozo'), (SELECT id FROM storyboard WHERE name='Inatsu Zenkichi'), @admin, @admin UNION ALL
SELECT 'Farewell Friend! Rest in Peace', '1987-06-20', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Aoki Tetsuro'), @admin, @admin UNION ALL
SELECT 'Desperate Mission! Open the Eye of the Dragon', '1987-06-27', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Ishizaki Susumu'), @admin, @admin UNION ALL
SELECT 'Surprise! The Twelve Gold Cloths', '1987-07-04', @series_id, (SELECT id FROM animation_director WHERE name='Hata Hidenobu'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Akihi Masayuki'), @admin, @admin UNION ALL
SELECT 'The Mask Cries Out! Love or Death', '1987-07-11', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Kikuchi Kazuhito'), @admin, @admin UNION ALL
SELECT 'Clash! Gold Saints', '1987-07-18', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Yamanouchi Shigeyasu'), @admin, @admin UNION ALL
SELECT 'Speed of Light! A Powerful Fist Beyond Mach Speed', '1987-07-25', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Ishizaki Susumu'), @admin, @admin UNION ALL
SELECT 'Here We Go! Our Departure', '1987-08-01', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Katsumata Tomoharu'), @admin, @admin UNION ALL
SELECT 'Sanctuary Grand Battle! Athena''s Greatest Crisis', '1987-08-08', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Akihi Masayuki'), @admin, @admin UNION ALL
SELECT 'The Ultimate Cosmo! Seven Senses', '1987-08-15', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Yamanouchi Shigeyasu'), @admin, @admin UNION ALL
SELECT 'Big Bang! Battle at the Taurus Palace', '1987-08-29', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Gemini Palace! Labyrinth of Light and Darkness', '1987-09-05', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Takagi Fuse'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Horror! Drifting into Another Dimension', '1987-09-12', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Akihi Masayuki'), @admin, @admin UNION ALL
SELECT 'Invincible! The Nebula Chain, Both Offense and Defense', '1987-09-19', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Yamanouchi Shigeyasu'), @admin, @admin UNION ALL
SELECT 'Farewell Hyoga! Brave Warrior, Sleep Now', '1987-09-26', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Katsumata Tomoharu'), @admin, @admin UNION ALL
SELECT 'Dragon! Return from the Land of the Dead', '1987-10-03', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Morishita Kozo'), @admin, @admin UNION ALL
SELECT 'Love! Shunrei''s Prayer', '1987-10-10', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Takagi Fuse'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Rise Dragon! Shiryu''s Cosmo of Rage', '1987-10-17', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Why! The Gold Lion Shows Its Fangs', '1987-10-24', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Akihi Masayuki'), @admin, @admin UNION ALL
SELECT 'Ares! The Legendary Demon Emperor Fist', '1987-10-31', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Yamanouchi Shigeyasu'), @admin, @admin UNION ALL
SELECT 'A Man! Cassios Dies for Love', '1987-11-07', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Fukuda Jun'), (SELECT id FROM storyboard WHERE name='Inoue Eisaku'), @admin, @admin UNION ALL
SELECT 'Ikki! Phoenix with Clipped Wings', '1987-11-14', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Takagi Fuse'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Bonds of Friendship! Athena''s Cry', '1987-11-21', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Kawai Shizuo'), @admin, @admin UNION ALL
SELECT 'Shaka! The Man Closest to God', '1987-11-28', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Akihi Masayuki'), @admin, @admin UNION ALL
SELECT 'The Terror of Nothingness! Shaka Opens His Eyes', '1987-12-05', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Araki Shingo'), @admin, @admin UNION ALL
SELECT 'Heroic! Ikki Falls for Friendship', '1987-12-12', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Ohashi Katsumi'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Crimson Swan! Life, Death and Love', '1987-12-19', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Yokoyama Hiroyuki'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Hyoga Revives! Risking This Life', '1987-12-26', @series_id, (SELECT id FROM animation_director WHERE name='Hatada Tadao'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Araki Shingo'), @admin, @admin UNION ALL
SELECT 'Surrender or Death! As Long as These Wings Exist', '1988-01-09', @series_id, (SELECT id FROM animation_director WHERE name='Shindo Mitsuo'), (SELECT id FROM script WHERE name='Morishita Kozo'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Advance Hyoga! The Noble Brave Warrior', '1988-01-16', @series_id, (SELECT id FROM animation_director WHERE name='Kawai Shizuo'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Kawai Shizuo'), @admin, @admin UNION ALL
SELECT 'Ring Out, Gold Cloth of the Sanctuary', '1988-01-23', @series_id, (SELECT id FROM animation_director WHERE name='Sasamon Nobuyoshi'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Mibuichi Katsumi'), @admin, @admin UNION ALL
SELECT 'Young Men! We Entrust Athena to You', '1988-01-30', @series_id, (SELECT id FROM animation_director WHERE name='Shindo Mitsuo'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Roar Holy Sword! Shura vs Dragon', '1988-02-06', @series_id, (SELECT id FROM animation_director WHERE name='Tadano Kazuko'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Tadano Kazuko'), @admin, @admin UNION ALL
SELECT 'Oh Shiryu! Disappears Becoming a Star', '1988-02-13', @series_id, (SELECT id FROM animation_director WHERE name='Inoue Eisaku'), (SELECT id FROM script WHERE name='Ito Masao'), (SELECT id FROM storyboard WHERE name='Inoue Eisaku'), @admin, @admin UNION ALL
SELECT 'Farewell! My Teacher, My Friend', '1988-02-20', @series_id, (SELECT id FROM animation_director WHERE name='Naoi Masahiro'), (SELECT id FROM script WHERE name='Mibuichi Katsumi'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Warrior of Beauty! Aphrodite', '1988-02-27', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Demon Rose! Sweet Fragrance of Death', '1988-03-12', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Kawai Shizuo'), @admin, @admin UNION ALL
SELECT 'Rest in Peace! Shun''s Last Smile', '1988-03-19', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'The Fire Clock Disappears! The True Identity of the Pope', '1988-03-26', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Mibuichi Katsumi'), (SELECT id FROM storyboard WHERE name='Inoue Eisaku'), @admin, @admin UNION ALL
SELECT 'Go Seiya! Beyond the Death of Friends', '1988-04-09', @series_id, (SELECT id FROM animation_director WHERE name='Naoi Masahiro'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Gather Friends! To Athena''s Side', '1988-04-16', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Enemies of the North Pole! The Legendary Divine Warriors', '1988-04-23', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Morishita Kozo'), @admin, @admin UNION ALL
SELECT 'Hilda! The Goddess Bewitched by the Devil', '1988-04-30', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Ishizaki Susumu'), @admin, @admin UNION ALL
SELECT 'The Giant Thor! A Cosmos of Hatred', '1988-05-07', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Tears of the Giant Star! Death for Hilda', '1988-05-14', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Mibuichi Katsumi'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Show the Fangs! Fenrir, the Wolf of the North', '1988-05-21', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Pity! The Fate of the Northern Wolf Pack Fist', '1988-05-28', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Akihi Masayuki'), (SELECT id FROM storyboard WHERE name='Inoue Eisaku'), @admin, @admin UNION ALL
SELECT 'Disappears on the Ice Field! The Sad Toa', '1988-06-04', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Freya! Fight to the Death for Love', '1988-06-11', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Soar Swan! Blazing Hell in the Ice', '1988-06-18', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Mibuichi Katsumi'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Mysterious Harp! Prelude of Death Luring Shun', '1988-06-25', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Death Sentence! Stringer Requiem', '1988-07-02', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Hosoda Masahiro'), (SELECT id FROM storyboard WHERE name='Inoue Eisaku'), @admin, @admin UNION ALL
SELECT 'Sorrow''s Brave Warrior! Frozen Hatred', '1988-07-09', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Phoenix! Wings Burning Crimson', '1988-07-16', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Akihi Masayuki'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Evil Amethyst! The Cemetery of Saints', '1988-07-23', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'The Flaming Sword! A Fearsome Ambition', '1988-07-30', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Sacrifice of Evil! The Forest of Spirits', '1988-08-13', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Mibuichi Katsumi'), (SELECT id FROM storyboard WHERE name='Inoue Eisaku'), @admin, @admin UNION ALL
SELECT 'Don''t Look Back Seiya! The Cosmo of the Rising Dragon', '1988-08-20', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Burn Shun! The Mystery Hidden in the Black Fangs', '1988-08-27', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Hosoda Masahiro'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Swirl! Shun''s Ultimate Nebula Storm', '1988-09-03', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Bud! Twin Stars of Destiny', '1988-09-10', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Brothers'' Bond! Syd, Rest in Your Homeland', '1988-09-17', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Mibuichi Katsumi'), (SELECT id FROM storyboard WHERE name='Inoue Eisaku'), @admin, @admin UNION ALL
SELECT 'Noble Brave Warrior! The Fading Legendary Knight', '1988-10-15', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Dragon vs Dragon! A One-in-a-Hundred-Thousand Chance', '1988-10-22', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Akihi Masayuki'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Sea Witch Siren! Beautiful Melody of Death', '1988-10-29', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Miraculous Appearance! Odin Robe', '1988-11-05', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Athena! Eternal Prayer of Noble Spirits', '1988-11-12', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'The Ocean Emperor Poseidon! Holy War Once Again', '1988-11-19', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Kikuchi Kazuhito'), @admin, @admin UNION ALL
SELECT 'Smash Them! The Mammoth Pillars of the Seven Seas', '1988-11-26', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Mysterious Glow! Golden Bronze Cloth', '1988-12-03', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Matano Hiromichi'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Beware Shun! Fearsome Fangs of the Demon Beast', '1988-12-10', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Hosoda Masahiro'), @admin, @admin UNION ALL
SELECT 'The Demon Beast Must Die! The Indestructible Gold Chain', '1988-12-17', @series_id, (SELECT id FROM animation_director WHERE name='Shindo Mitsuo'), (SELECT id FROM script WHERE name='Ishizaki Susumu'), (SELECT id FROM storyboard WHERE name='Shindo Mitsuo'), @admin, @admin UNION ALL
SELECT 'Excalibur! Shura''s Soul Resides in the Right Arm', '1988-12-24', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Araki Shingo'), @admin, @admin UNION ALL
SELECT 'Dreams Shattered! Reunion with the Scent of Death', '1989-01-14', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Mibuichi Katsumi'), (SELECT id FROM storyboard WHERE name='Naoi Masahiro'), @admin, @admin UNION ALL
SELECT 'Hunter of Hearts! Heartless Lymnades', '1989-01-28', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Akihi Masayuki'), (SELECT id FROM storyboard WHERE name='Kobayashi Tomoko'), @admin, @admin UNION ALL
SELECT 'Isaac! A Man with a Heart of Ice', '1989-02-11', @series_id, (SELECT id FROM animation_director WHERE name='Kobayashi Tomoko'), (SELECT id FROM script WHERE name='Suga Yoshiyuki'), (SELECT id FROM storyboard WHERE name='Ishizaki Susumu'), @admin, @admin UNION ALL
SELECT 'Hang in There Kiki! A Sorrowful Death Battle', '1989-02-18', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Hosoda Masahiro'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Listen! The Beautiful Singing Voice of Athena', '1989-02-25', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Koyama Takao'), (SELECT id FROM storyboard WHERE name='Kikuchi Kazuhito'), @admin, @admin UNION ALL
SELECT 'Friends! Together at the Time of Death', '1989-03-11', @series_id, (SELECT id FROM animation_director WHERE name='Shikano Yoshiyuki'), (SELECT id FROM script WHERE name='Yamanouchi Shigeyasu'), (SELECT id FROM storyboard WHERE name='Araki Shingo'), @admin, @admin UNION ALL
SELECT 'Two Souls! Mystery of Poseidon''s Resurrection', '1989-03-18', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Mibuichi Katsumi'), (SELECT id FROM storyboard WHERE name='Hoshikawa Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Shoot Poseidon! The Golden Arrow', '1989-03-25', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Hosoda Masahiro'), (SELECT id FROM storyboard WHERE name='Sasamon Nobuyoshi'), @admin, @admin UNION ALL
SELECT 'Shine, Stars of Friendship! Legend of Youth', '1989-04-01', @series_id, (SELECT id FROM animation_director WHERE name='Okawachi Hiro'), (SELECT id FROM script WHERE name='Kikuchi Kazuhito'), (SELECT id FROM storyboard WHERE name='Araki Shingo'), @admin, @admin;
