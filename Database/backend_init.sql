/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.8.6-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: 185.176.94.192    Database: s17_Kai_music
-- ------------------------------------------------------
-- Server version	10.11.14-MariaDB-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `audio_file`
--

DROP TABLE IF EXISTS `audio_file`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `audio_file` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  `format` varchar(255) DEFAULT NULL,
  `album` varchar(255) DEFAULT NULL,
  `artist` varchar(255) DEFAULT NULL,
  `cover_url` varchar(255) DEFAULT NULL,
  `duration` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `chunks` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKjldibmrigkikpfpq3ysucnj7v` (`owner_id`),
  CONSTRAINT `FKjldibmrigkikpfpq3ysucnj7v` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1619 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `audio_file`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `audio_file` WRITE;
/*!40000 ALTER TABLE `audio_file` DISABLE KEYS */;
INSERT INTO `audio_file` VALUES
(769,'178998715786613514955950489438','/audio-bdf08192-ff5c-430c-a009-80787798c8a4',1,'mp3',NULL,NULL,NULL,260,'upload_3610770695398718364.tmp',52),
(770,'178998717144510908854081483275948','/audio-0e151175-839d-4216-a001-70c918ee0741',1,'mp3',NULL,NULL,NULL,148,'upload_7685640793117563406.tmp',30),
(771,'178998719950013207817117175586173','/audio-0ee2ed5c-4bc0-4cdb-b6e8-2ececdca21b6',1,'mp3',NULL,NULL,NULL,196,'upload_6828168279011021439.tmp',40),
(772,'178998726639112493881107065202335','/audio-14a67f58-7da1-45ad-ac76-22fb8c37e039',1,'mp3',NULL,NULL,NULL,188,'upload_3365710132654368038.tmp',38),
(773,'I Kissed A Girl (Sefon.me)','/audio-f4f3f1b7-3832-43f5-b359-d1f9b789a5e9',1,'mp3','','Katy Perry',NULL,180,'I Kissed A Girl (Sefon.me)',36),
(774,'Я Бью Женщин и Детей (Sefon.Pro)','/audio-5945b4cb-5d34-4a83-92e6-b87c472f593d',1,'mp3','','Валентин Стрыкало',NULL,163,'Я Бью Женщин и Детей (Sefon.Pro)',33),
(775,'The Less I Know The Better (Sefon.me)','/audio-32df263c-df91-455a-8a6b-7878d942de22',1,'mp3','Currents','Tame Impala',NULL,218,'The Less I Know The Better',44),
(776,'I Kissed A Girl (Sefon.me)','/audio-ae67634a-ec63-4c0b-bb50-a4c9d0b36305',1,'mp3','','Katy Perry',NULL,180,'I Kissed A Girl (Sefon.me)',36),
(777,'Я Бью Женщин и Детей (Sefon.Pro)','/audio-c8949b66-fd56-4e12-b434-5f94beb0b0aa',1,'mp3','','Валентин Стрыкало',NULL,163,'Я Бью Женщин и Детей (Sefon.Pro)',33),
(778,'The Less I Know The Better (Sefon.me)','/audio-e8f61f59-44fe-455b-a8cf-53485a5f58cf',1,'mp3','','Tame Impala',NULL,218,'The Less I Know The Better (Sefon.me)',44),
(779,'Дорадура (Sefon.Pro)','/audio-1e44d954-3c97-4fc1-ac10-e5479f4fa2de',1,'mp3','','Дора',NULL,134,'Дорадура (Sefon.Pro)',27),
(780,'ЁК (Sefon.Pro)','/audio-00f2296d-2a5a-4054-93a7-0cb830ef6a0b',1,'mp3','ЁК','Дора',NULL,159,'ЁК',32),
(781,'65a4ae32-ec6c-49d5-a98d-da3f11c02331','/audio-51f370a5-d94c-46ab-b4d0-7325a467918f',1,'mp3','Группа крови','Кино',NULL,364,'Спокойная ночь',73),
(782,'The Story Ain\'t Over (Sefon.Pro)','/audio-e2ea7bcb-9c8c-4da6-98a9-91325a93fed0',1,'mp3','The Story Ain\'t Over (live)','Avantasia',NULL,285,'The Story Ain\'t Over (live)',57),
(783,'667ea0c8-4420-4a30-8b8d-24a5b81e9751','/audio-942ee138-110a-49e8-b9f3-07ff28d10b69',1,'mp3',NULL,NULL,NULL,182,'upload_14218537903308077965.mp3',37),
(784,'18c6add4-3a9e-447b-b6f8-c85de98de95e','/audio-0d9fe068-cd0d-4f77-ad10-8c02223d1c20',1,'mp3','','',NULL,213,'upload_2153106006304560528.mp3',43),
(785,'eed00b97-7944-4933-b7cf-ff612aeb7457','/audio-06d8a15c-e8e7-471a-a1ec-dbaf585107d9',1,'mp3','','',NULL,302,'upload_2915735926892334597.mp3',61),
(786,'a51556fa-5cd8-41f9-ab82-74cd55a08121','/audio-04a94d38-8332-401d-81b9-3e22128d99e7',1,'mp3','','',NULL,158,'upload_8831720297145055718.mp3',32),
(787,'821c7b5f-8766-4998-8ecb-a7908c3c2b43','/audio-bb757f1d-f6e8-4041-9269-e0fc471332d5',1,'mp3','Алхимия','Мельница',NULL,245,'Dreadnought',49),
(788,'57cc410f-d59d-48e0-a825-7e8d4cd1888f','/audio-9b8390d5-8e65-4684-9265-57dd2461de3a',1,'mp3','The Journey of Life','Patrik Pietschmann',NULL,314,'The Journey of Life (Orchestral Version)',63),
(789,'7c7e4889-e1f8-4176-954e-d0f90a190f1f','/audio-28038f22-8d9f-498c-a135-994b816fac7a',1,'mp3','ORIGIN','Patrik Pietschmann',NULL,267,'ORIGIN',54),
(790,'260e407d-ca8c-4879-bdeb-7698dd07cf98','/audio-e6abc92f-af0a-4d3b-a611-f906053ca388',1,'mp3','Питер, чай, не Франция','pyrokinesis',NULL,214,'Чемпионы пепла',43),
(791,'eee7d487-9dc8-4811-ad1a-f9610118adf2','/audio-9f73adb1-b4a2-4bab-88d2-1b1738cce9af',1,'mp3','mea maxima culpa','Pyrokinesis',NULL,180,'яблоки в карамели',36),
(792,'8f4ed1ab-0111-47a3-bdb6-9d4072c24970','/audio-66be4156-a239-46d5-a1d6-9deb224f2140',1,'mp3','отказываю небу','pyrokinesis',NULL,214,'отказываю небу',43),
(793,'1912e387-1e86-4011-b5ae-0d3252189a7d','/audio-35d97ad4-a9c4-40c0-86c0-2132dd1dd1ca',1,'mp3','её влюбленные глаза','Pyrokinesis',NULL,135,'её влюбленные глаза',27),
(794,'4666de8a-0447-4479-8db8-ce7c7d0ca155','/audio-cf73549e-4687-41d6-89e2-55ce81b5072a',1,'mp3','геометрия тьмы','pyrokinesis',NULL,180,'я верю только в неизбежность зла',36),
(795,'116219ea-f333-41ed-a6d6-f5c8a544c6a2','/audio-44f41a31-056a-4599-be4c-57e75e6b055d',1,'mp3','геометрия тьмы','pyrokinesis',NULL,222,'претор был прав',45),
(796,'9723dc34-745f-47af-a42b-3da21cca7530','/audio-00d8ba0f-44d2-4981-a2d0-f090e7ec48ed',1,'mp3','в ад только перед тобой в рай только после тебя','pyrokinesis, BOOKER',NULL,167,'в ад только перед тобой в рай только после тебя',34),
(797,'70f2c69d-ea7c-4ce3-ac6a-e3a0076cf7ff','/audio-2d1a7fa8-5dbb-4b8e-ad0e-104a952741f2',1,'mp3','Ангелофрения','Мельница',NULL,187,'Дороги',38),
(798,'f985cefb-f781-4734-89e8-622937687dfe','/audio-249e2a67-1c9e-4110-a4f6-ed9e96ed21d6',1,'mp3','Проволока из одуванчиков','алёна швец.',NULL,136,'Дождь',28),
(799,'ef11b828-b8c9-4550-b6b9-8493af0ac41c','/audio-85f9a275-7389-4b02-948e-5685dbef1ac4',1,'mp3','Coco (Original Motion Picture Soundtrack)','Anthony Gonzalez',NULL,123,'Proud Corazón (From \"Coco\"/Soundtrack Version)',25),
(800,'fce7370f-46f5-4932-8742-9aca6d8b61cb','/audio-f94b5c89-9a6e-4421-a83a-abb665cf9c97',1,'mp3','Rio 2 Music From The Motion Picture','Carlinhos Brown;Jamie Foxx;Janelle Monáe;Anne Hathaway;Jessie Eisenberg',NULL,182,'What Is Love',37),
(801,'b5fc6134-f970-41b2-9a94-ef07aece2675','/audio-edeb426b-4d29-4786-b4fb-26c63db14b88',1,'mp3','Black Friday','Tom Odell',NULL,219,'Black Friday',44),
(802,'Вольный ветер','/audio-7e9e30cb-3f35-4b0c-9cbc-23c75f8fb9fc',1,'mp3','Изумрудные хиты','Chaif',NULL,220,'Вольный ветер',44),
(803,'Persian','/audio-2301a8d4-7e62-4fd8-8cca-947bf945756e',1,'mp3','Persian','Father Of Peace',NULL,134,'Persian',27),
(804,'The Greatest (feat. Kendrick Lamar)','/audio-12919deb-9a6c-4dc6-b4eb-b8ac45bf4d1e',1,'mp3','This Is Acting (Deluxe Version)','Sia, Kendrick Lamar',NULL,210,'The Greatest (feat. Kendrick Lamar)',42),
(805,'Enemy','/audio-672685ca-92ec-4b9a-9075-1939f178cc75',1,'mp3','The Year Of Madness','Father Of Peace',NULL,214,'Enemy',43),
(806,'Everlong','/audio-b201d1d6-cae6-4def-8e7e-6aa932ad4f08',1,'mp3','The Colour And The Shape','Foo Fighters',NULL,250,'Everlong',50),
(807,'Behind Blue Eyes','/audio-3e654acf-9a69-400c-97ce-5cf744deec46',1,'mp3','Results May Vary','Limp Bizkit',NULL,270,'Behind Blue Eyes',54),
(808,'Shape Of My Heart','/audio-d48d6b12-8ba7-4fa9-9a6e-e7ed399c701a',1,'mp3','Ten Summoner\'s Tales','Sting',NULL,278,'Shape Of My Heart',56),
(809,'Улыбайся','/audio-9166d003-760e-4bba-8769-5034a14d23b3',1,'mp3','Export','IOWA',NULL,218,'Улыбайся',44),
(810,'Батарейка','/audio-972a9664-a797-4c70-9fbd-f88bd863ea7d',1,'mp3','Батарейка','Zhuki',NULL,226,'Батарейка',46),
(811,'Простая песня','/audio-593018a2-011f-4385-b7c1-ddd52aa57a74',1,'mp3','Export','IOWA',NULL,204,'Простая песня',41),
(812,'Хали-гали, паратрупер','/audio-ec650d57-ce55-4dcd-a485-45f9197b6779',1,'mp3','Десятилетка','Leprikonsy',NULL,247,'Хали-гали, паратрупер',50),
(813,'Капитал','/audio-16f0b0d6-a0ef-4133-a973-3721be73742d',1,'mp3','Капитал','Lyapis Trubetskoy',NULL,195,'Капитал',40),
(814,'Экспонат','/audio-d8ed71ce-d527-4521-88c1-fb0347924a10',1,'mp3','Экспонат','Leningrad',NULL,230,'Экспонат',46),
(815,'Песенка весёлого беларуса','/audio-9a249ea2-31a7-4b75-98ee-04ad5aa281ca',1,'mp3','Песенка весёлого беларуса','AP$ENT',NULL,134,'Песенка весёлого беларуса',27),
(816,'Товарищ сержант','/audio-3fa2ea78-091c-4625-96c3-b517edf1f956',1,'mp3','Музыка крыш','Кафе',NULL,221,'Товарищ сержант',45),
(817,'Запишу свое сердце на секцию плавания','/audio-7c9a0827-afbb-49c5-835c-6f8e76537d0d',1,'mp3','Голая','Gradusy',NULL,200,'Запишу свое сердце на секцию плавания',40),
(818,'Владивосток 2000','/audio-5fe8071b-f50c-4a29-9341-9b6dfb4ca8d7',1,'mp3','Морская','Mumiy Troll',NULL,160,'Владивосток 2000',33),
(819,'Родина','/audio-0fe11657-06c3-4a4c-b225-d356cafe4673',1,'mp3','Продано не всЁ','Костя Кулясов',NULL,170,'Родина',35),
(820,'Хали-гали, паратрупер','/audio-a4729c96-265e-40dd-8c68-f40db0bd6b33',1,'mp3','Десятилетка','Leprikonsy',NULL,247,'Хали-гали, паратрупер',50),
(821,'Улыбайся','/audio-304f5f6b-a876-47ff-8298-e22a4af0ce59',1,'mp3','Export','IOWA',NULL,218,'Улыбайся',44),
(822,'Простая песня','/audio-91b2eb72-856a-44a7-9cf7-f04de49827d3',1,'mp3','Export','IOWA',NULL,204,'Простая песня',41),
(823,'c8e758c6-ed53-4e63-adf6-802d5e121030','/audio-98e7eed0-49b9-45ad-b403-532bf35dcab1',1,'mp3','','',NULL,304,'upload_12833109004807668613.mp3',61),
(824,'39695085-f59a-4771-8d1a-fbf98830a461','/audio-2d4f8940-fb40-4d49-b9e2-35ad6e5afa50',1,'mp3','Радио Пепел','Дайте танк (!), Иван Курочкин',NULL,205,'Арка',42),
(825,'543e8435-7c9e-43c4-8182-d938abbbbbe7','/audio-bca49df7-7656-45d4-b0b4-655fc0c41cd4',1,'mp3','Can We Hang Out Sometime?','Good Kid',NULL,167,'Cicada',34),
(826,'218242eb-f0ae-45a8-b7be-3c8ca1d2ff28','/audio-6747c957-e6a1-4d72-a138-c85717aa023b',1,'mp3','Ashes','Stellar',NULL,166,'Ashes',34),
(827,'f38070f5-8d4a-4726-b017-7987f648b972','/audio-180eaee3-6436-4ec8-b1cd-2f7cbb4fe742',1,'mp3','','',NULL,205,'upload_17809732638229670336.mp3',42),
(828,'97d45c1f-05d6-4b24-b288-bd72a7b605c0','/audio-33c2e305-c167-4759-8057-83445c51cb7f',1,'mp3','RUNRUNRUN','Dutch Melrose',NULL,140,'RUNRUNRUN',29),
(829,'3a5760c0-7ac5-438e-83c4-865bc57bf4fb','/audio-67253d93-c228-4f77-b11a-3293cea4b368',1,'mp3','Ricky Martin','Ricky Martin',NULL,244,'Livin\' la Vida Loca',49),
(830,'59c4e112-0136-4333-9f58-019d599bb6a1','/audio-757f5eb8-0704-4177-a142-9c12fb0e9e84',1,'mp3','I See You','MISSIO',NULL,228,'I See You',46),
(831,'1912e387-1e86-4011-b5ae-0d3252189a7d','/audio-2f280390-8391-4743-871f-555800b66bed',1,'mp3','её влюбленные глаза','Pyrokinesis',NULL,135,'её влюбленные глаза',27),
(832,'4666de8a-0447-4479-8db8-ce7c7d0ca155','/audio-1a8426e4-9762-4e55-8970-f0c60cc318d6',1,'mp3','геометрия тьмы','pyrokinesis',NULL,180,'я верю только в неизбежность зла',36),
(833,'116219ea-f333-41ed-a6d6-f5c8a544c6a2','/audio-5e5999fd-a562-41af-b19f-c6e5407d76fb',1,'mp3','геометрия тьмы','pyrokinesis',NULL,222,'претор был прав',45),
(834,'9723dc34-745f-47af-a42b-3da21cca7530','/audio-876a4265-9d42-4918-8b83-550bbc34aff1',1,'mp3','в ад только перед тобой в рай только после тебя','pyrokinesis, BOOKER',NULL,167,'в ад только перед тобой в рай только после тебя',34),
(835,'70f2c69d-ea7c-4ce3-ac6a-e3a0076cf7ff','/audio-9e6c31eb-6d18-4bf4-bee4-d946275a66b0',1,'mp3','Ангелофрения','Мельница',NULL,187,'Дороги',38),
(836,'f985cefb-f781-4734-89e8-622937687dfe','/audio-fb2d4f0b-5785-4f38-8633-3244b1e87131',1,'mp3','Проволока из одуванчиков','алёна швец.',NULL,136,'Дождь',28),
(837,'ef11b828-b8c9-4550-b6b9-8493af0ac41c','/audio-32cb4da9-0369-4f09-9190-faa0c2b287a4',1,'mp3','Coco (Original Motion Picture Soundtrack)','Anthony Gonzalez',NULL,123,'Proud Corazón (From \"Coco\"/Soundtrack Version)',25),
(838,'fce7370f-46f5-4932-8742-9aca6d8b61cb','/audio-1dd4ae12-3aa8-4bc5-b63f-e42aad482418',1,'mp3','Rio 2 Music From The Motion Picture','Carlinhos Brown;Jamie Foxx;Janelle Monáe;Anne Hathaway;Jessie Eisenberg',NULL,182,'What Is Love',37),
(839,'b5fc6134-f970-41b2-9a94-ef07aece2675','/audio-40bcad17-e7a1-443c-84e2-f4a0df1e4be0',1,'mp3','Black Friday','Tom Odell',NULL,219,'Black Friday',44),
(840,'Вольный ветер','/audio-c7fd3d53-9980-40d1-8f2a-9f3ac99329ce',1,'mp3','Изумрудные хиты','Chaif',NULL,220,'Вольный ветер',44),
(841,'Persian','/audio-18ecdae9-bade-432d-9afb-1ae8bfb590fb',1,'mp3','Persian','Father Of Peace',NULL,134,'Persian',27),
(842,'The Greatest (feat. Kendrick Lamar)','/audio-1a62c587-b919-4e3c-85f3-1d396896c0ff',1,'mp3','This Is Acting (Deluxe Version)','Sia, Kendrick Lamar',NULL,210,'The Greatest (feat. Kendrick Lamar)',42),
(843,'Enemy','/audio-10e0d84c-38ec-47dd-8001-b1abf0857897',1,'mp3','The Year Of Madness','Father Of Peace',NULL,214,'Enemy',43),
(844,'Everlong','/audio-7177cfd1-5de8-4dfe-a98c-267f7fb47511',1,'mp3','The Colour And The Shape','Foo Fighters',NULL,250,'Everlong',50),
(845,'Behind Blue Eyes','/audio-c626f1d2-6a0c-4cd6-9104-cad51905b669',1,'mp3','Results May Vary','Limp Bizkit',NULL,270,'Behind Blue Eyes',54),
(846,'Shape Of My Heart','/audio-fd9d8ab0-3262-4928-978f-8fa7b7793fd2',1,'mp3','Ten Summoner\'s Tales','Sting',NULL,278,'Shape Of My Heart',56),
(847,'Улыбайся','/audio-1885f3fa-6cb5-4a54-8aae-d33d0ed62d3e',1,'mp3','Export','IOWA',NULL,218,'Улыбайся',44),
(848,'Батарейка','/audio-65eaf67c-fdf8-4b9d-acf5-339a9cd9ba14',1,'mp3','Батарейка','Zhuki',NULL,226,'Батарейка',46),
(849,'Простая песня','/audio-4f3e324a-8182-426e-ae85-eef9b23a417f',1,'mp3','Export','IOWA',NULL,204,'Простая песня',41),
(850,'Хали-гали, паратрупер','/audio-4e056158-ec9e-475c-a6d3-8d0ea5dcb8ed',1,'mp3','Десятилетка','Leprikonsy',NULL,247,'Хали-гали, паратрупер',50),
(851,'Капитал','/audio-f8904bf2-38a7-46ab-8557-ba51e0f2be0c',1,'mp3','Капитал','Lyapis Trubetskoy',NULL,195,'Капитал',40),
(852,'Экспонат','/audio-1bafeecd-942e-49c4-b482-1f2afeb952d8',1,'mp3','Экспонат','Leningrad',NULL,230,'Экспонат',46),
(853,'Песенка весёлого беларуса','/audio-097842f0-abbe-4e15-882a-ef534f89512b',1,'mp3','Песенка весёлого беларуса','AP$ENT',NULL,134,'Песенка весёлого беларуса',27),
(854,'Товарищ сержант','/audio-26265451-f8f0-45d8-be65-5e3fc1311c6c',1,'mp3','Музыка крыш','Кафе',NULL,221,'Товарищ сержант',45),
(855,'Запишу свое сердце на секцию плавания','/audio-2b6ee98a-f00b-49b0-a878-e28add5bff44',1,'mp3','Голая','Gradusy',NULL,200,'Запишу свое сердце на секцию плавания',40),
(856,'Владивосток 2000','/audio-c2578223-1c65-4c0e-bf0d-80a0c19c7ee3',1,'mp3','Морская','Mumiy Troll',NULL,160,'Владивосток 2000',33),
(857,'Родина','/audio-b8e55129-b709-406e-b209-e2977ff2a2d7',1,'mp3','Продано не всЁ','Костя Кулясов',NULL,170,'Родина',35),
(858,'Хали-гали, паратрупер','/audio-53e5cd2d-983c-4295-ba8b-0d3212e6faa7',1,'mp3','Нам с тобою было супер','Леприконсы',NULL,247,'Хали-гаги, паратрупер',50),
(859,'Улыбайся','/audio-87253afe-58ee-472b-9205-e1426218a29d',1,'mp3','8 марта','Iowa',NULL,218,'Улыбайся',44),
(860,'Простая песня','/audio-afc21843-d83c-4036-ac6c-748dc1bc775c',1,'mp3','Сладкая жизнь (Музыка к сериалу)','Iowa',NULL,204,'Простая песня',41),
(861,'c8e758c6-ed53-4e63-adf6-802d5e121030','/audio-f26dbb0d-9ac8-467d-9c4f-e4d9327a3538',1,'mp3','','',NULL,304,'upload_2580139136068669012.mp3',61),
(862,'39695085-f59a-4771-8d1a-fbf98830a461','/audio-f8f5037d-0b87-44e5-b44f-f6d4d310af78',1,'mp3','Радио Пепел','Дайте танк (!), Иван Курочкин',NULL,205,'Арка',42),
(863,'543e8435-7c9e-43c4-8182-d938abbbbbe7','/audio-e0269b0e-ddca-4862-a421-0c7e541be760',1,'mp3','Can We Hang Out Sometime?','Good Kid',NULL,167,'Cicada',34),
(864,'218242eb-f0ae-45a8-b7be-3c8ca1d2ff28','/audio-ab80f7d3-6219-48de-b677-ff1876f03607',1,'mp3','Ashes','Stellar',NULL,166,'Ashes',34),
(865,'f38070f5-8d4a-4726-b017-7987f648b972','/audio-bc9d3ca3-cf61-472d-89ae-7c2d52eba272',1,'mp3','','',NULL,205,'upload_17445705930649821698.mp3',42),
(866,'97d45c1f-05d6-4b24-b288-bd72a7b605c0','/audio-84f92806-9aa0-4a3b-9c8a-fba12bc41e39',1,'mp3','RUNRUNRUN','Dutch Melrose',NULL,140,'RUNRUNRUN',29),
(867,'3a5760c0-7ac5-438e-83c4-865bc57bf4fb','/audio-3a238112-58cf-4f7f-99e6-4eb2f1bc7b33',1,'mp3','Ricky Martin','Ricky Martin',NULL,244,'Livin\' la Vida Loca',49),
(868,'59c4e112-0136-4333-9f58-019d599bb6a1','/audio-24a7cd2f-7953-401f-84d7-4bf1df78190a',1,'mp3','I See You','MISSIO',NULL,228,'I See You',46),
(869,'6b01c6d1-7e63-4171-be4a-fd87f658acc4','/audio-c79af58b-7544-43ab-afc7-af3438b711df',1,'mp3','','',NULL,126,'upload_15445510325704623850.mp3',26),
(870,'baee7dd1-9659-4bfd-bc84-8d63cebb0789','/audio-7d39da85-d5ea-4329-a270-3ac3c9ea476a',1,'mp3','Nothing Breaks Like a Heart','Mark Ronson, Miley Cyrus',NULL,218,'Nothing Breaks Like a Heart',44),
(871,'eb644040-7cbf-423a-9c3a-441895d97c31','/audio-e82fbc79-ee54-420d-ace6-b8ff84d44d19',1,'mp3','Peredais','Arthur Pirozhkov',NULL,217,'Peredais',44),
(872,'921e7ce8-1753-4e32-b6bd-e50f4a39dfad','/audio-1bf1c2a1-7d3e-466d-b94e-1d76921a3243',1,'mp3','TBA','Måneskin',NULL,144,'TBA',29),
(873,'7be27633-3289-4ade-beb1-97d89d45f5dc','/audio-0cf8b959-9b76-4386-8693-60d5ec4192df',1,'mp3','TBA','Måneskin',NULL,247,'TBA',50),
(874,'30e7f13e-9457-4a86-8c8d-d0e15f16f059','/audio-995f5d28-9bfd-44aa-99bc-48c6f6e84a09',1,'mp3','Love Love Love','ViVii',NULL,240,'Love Love Love',48),
(875,'34e34eb6-a5c2-45fa-be0a-d7ecfdaf159a','/audio-1a52b21b-eea4-4a91-a60c-0d394d3774eb',1,'mp3','Island in the Sun','Gamper & Dadoni',NULL,319,'Island in the Sun',64),
(876,'41d40429-f6b3-474b-ad78-fa9ee28b8c5b','/audio-f9558969-57b3-4643-b695-4bbb8ebfcd42',1,'mp3','Алхимия','Мельница',NULL,194,'Тристан',39),
(877,'4ac1b870-e42d-4b70-9c93-200bda2a81f6','/audio-70973a62-0300-48b2-9e31-eab18380c946',1,'mp3','Сияние','Fleur',NULL,322,'Будь моим смыслом',65),
(878,'912b5bc3-b685-4197-953d-320687078994','/audio-e4593b39-a0f0-4071-b61f-bd468cee032d',1,'mp3','mea maxima culpa','Pyrokinesis',NULL,215,'моя великая вина',43),
(879,'76cb533c-d47e-4be0-ada3-5889d23c52ac','/audio-6712fbc0-96a5-4310-a66a-20b276f13450',1,'mp3','mea maxima culpa','Pyrokinesis',NULL,150,'мы попадём с тобою в ад',31),
(880,'7b8df39d-b44a-4fb0-9259-51c4e818ca76','/audio-03a31d4c-7a37-4576-8f44-ea3ae3ad695e',1,'mp3','Радость моя','Мельница',NULL,193,'Радость моя',39),
(881,'dfd7c3d6-e54c-47b6-a9d6-4bb6f12a6b1e','/audio-cf435611-6b85-48ec-b81b-1e86feecf928',1,'mp3','Good Folk Days','Kansas',NULL,199,'Dust in the wind',40),
(882,'c3df5a9d-7519-40fa-8936-3bf8096c1b3a','/audio-6cf03a45-5296-4f74-8554-dbc3ecf44c2e',1,'mp3','','',NULL,126,'upload_8112702617959235955.mp3',26),
(883,'d1bc11a8-3868-48be-aabe-0f4cc7ff687a','/audio-c33685e1-dde5-4372-a7a0-e6fbdfbc71b2',1,'mp3','Radioactive','Kodac',NULL,229,'Radioactive',46),
(884,'0ce0ea63-bebd-40de-877b-1b34d6037931','/audio-2c1e80ca-a40a-4b71-a988-1e281bd3b618',1,'mp3','Singles','Maroon 5',NULL,189,'Maps',38),
(885,'cff7d3ab-77a5-438d-9025-069d14a382b8','/audio-dd24fec1-eafc-41c6-9ed4-62831c76cac3',1,'mp3','The Terror','Max Hobbs',NULL,163,'The Terror',33),
(886,'1afb450b-c7c3-4cd5-8753-de8d3c8c9aae','/audio-1717c371-6dc6-477c-9a88-e0e7437e2172',1,'mp3','Nod Krai Genshin','Gensh1n',NULL,260,'Nod Krai Genshin',52),
(887,'f1cb523f-1de2-4991-8215-0fb2649dd357','/audio-e6004694-e150-416c-b966-67e70f34c06b',1,'mp3','Дорога сна','Мельница',NULL,261,'Зима',53),
(888,'01079f78-4245-4b32-8ff1-830b9ccbc0f8','/audio-296bd47c-7696-4eaa-bcc0-e42ea13b26b5',1,'mp3','Animusic Box Collection, Vol. 9','Relaxu',NULL,64,'Tenshi ni Fureta yo!',13),
(889,'0eaa34e2-f9ec-4f55-a688-40632a981a58','/audio-f10980c5-86d6-43df-9634-9c993df9689d',1,'mp3','Радио Пепел','Дайте танк (!), ПАВЛОВА',NULL,132,'Завтрак',27),
(890,'9b6951fa-8d3a-4c0f-b681-135de23e4a71','/audio-eacfd223-c0ca-4cbe-962c-561b0483f085',1,'mp3','Радио Пепел','Дайте танк (!), Иван Курочкин',NULL,205,'Арка',42),
(891,'dba24503-2005-4e1e-936b-2d2cfcd88119','/audio-2ef67535-972e-4332-a97a-a2910199100e',1,'mp3','The Unknowing','Jfarrari',NULL,197,'The Unknowing',40),
(892,'730a4bcc-209c-45b7-8288-035c67120e01','/audio-5110fbfd-0c6f-47e7-86d8-8f7eb1e76a0c',1,'mp3','Хрупко','Дайте танк (!)',NULL,206,'Пунктир',42),
(893,'53ef3183-eb63-4b87-993c-55d4b9deb715','/audio-76bdc930-131d-4374-ae30-04aa55310fcc',1,'mp3','Can We Hang Out Sometime?','Good Kid',NULL,167,'Cicada',34),
(894,'9d9767ed-0ccf-47fe-a9e6-4482f12d2a78','/audio-9360f16c-56a9-4456-8808-e4dd526a52e7',1,'mp3','Ashes','Stellar',NULL,166,'Ashes',34),
(895,'fd25fb58-2e0a-42f6-b458-a23be0f816a3','/audio-9995218e-3bea-4727-867f-2b0cc2723559',1,'mp3','RUNRUNRUN','Dutch Melrose',NULL,140,'RUNRUNRUN',29),
(896,'a592d627-3b97-48af-b65c-8f46d4cf68b0','/audio-aeae1ddd-981f-48c5-b0a8-8f0b551677b3',1,'mp3','I See You','Missio',NULL,228,'I See You',46),
(897,'e63a72ca-2d0d-495d-9c62-821e5bff9750','/audio-89276579-6f27-4905-a31b-71107744893b',1,'mp3','Nothing Breaks Like a Heart','Mark Ronson, Miley Cyrus',NULL,218,'Nothing Breaks Like a Heart',44),
(898,'a9c36616-fd63-4562-9e45-b9a90b61753b','/audio-11dd822a-f2c3-48b9-95e4-e076a7c258b1',1,'mp3','MSI B-SIDES vol.1','Mindless Self Indulgence',NULL,134,'Seven Minutes in Heaven',27),
(899,'Никогда','/audio-cf1d2213-9e53-481a-b0c6-cae8105b9081',1,'mp3','Никогда','Руслан Утюг',NULL,174,'Никогда',35),
(900,'22bae1ad-d252-45bf-8128-ba8f48e63dc8','/audio-75d3af92-1c32-4ac9-86e5-4a4cacd77e42',1,'mp3','','',NULL,199,'upload_15691877503889090591.mp3',40),
(901,'d85253e0-3bfe-4639-a1f7-13f6c6500ac9','/audio-481db101-9714-4df8-bd18-3c2d6fe2c482',1,'mp3','Il ballo della vita','Måneskin',NULL,234,'Le parole lontane',47),
(902,'69431f68-30fc-449e-b373-38cbab66af7f','/audio-b4d722e2-ce4a-40c6-86fe-6d52ee6cd76c',1,'mp3','Chosen','Måneskin',NULL,161,'Somebody Told Me',33),
(903,'f3868827-192f-42ee-9835-3ab305ad01f5','/audio-1d2e0249-e965-4ae8-bdf2-709e91ad4bab',1,'mp3','Soothing White Noise Sounds','SleepTherapy',NULL,197,'Deep White Noise: Driving in Car',40),
(904,'675ba2cb-a86b-42cb-88c8-037e95da9f13','/audio-9675d3ff-05dc-42d7-af23-30c3a0b91b08',1,'mp3','우리아기 태교백과','Various Artists',NULL,185,'Windy Afternoon (바람 부는 오후)',38),
(905,'b6a232c4-1660-4806-9e08-40df044e0f87','/audio-db653460-54ed-41f0-b786-753c2ea68e75',1,'mp3','Torna a casa','Måneskin',NULL,231,'Torna a casa',47),
(906,'519efdbb-eb51-4b36-9c0e-51e9c0f60685','/audio-f1f6f20c-c82e-47f0-8c6f-5931763a9673',1,'mp3','Teatro d\'ira - Vol. I','Måneskin',NULL,230,'FOR YOU LOVE',46),
(907,'cf2319af-2e0e-4780-943a-5fe7eb6eaf14','/audio-ea050adb-06f4-409e-a677-b607e8d9c5d2',1,'mp3','RUSH!','Måneskin',NULL,164,'BABY SAID',33),
(908,'6c0926ad-4348-47ad-bbe5-ecd00685bdef','/audio-e8b75717-086b-421d-95ec-b9ceee97fc28',1,'mp3','Teatro d\'ira - Vol. I','Måneskin',NULL,230,'FOR YOU LOVE',46),
(909,'98759ed9-1130-4c96-adde-1e39974ba9d4','/audio-f3cab4df-ed20-4d00-a155-093f778f2e4e',1,'mp3','RUSH!','Måneskin',NULL,156,'DON\'T WANNA SLEEP',32),
(910,'1b45ffbc-b6cd-440b-a948-dfd06cdadb2b','/audio-45b32e6a-451d-4143-8eb3-dde3749d6bc8',1,'mp3','RUSH! (ARE U COMING?)','Måneskin',NULL,151,'OFF MY FACE',31),
(911,'dbe3325a-2c5a-4218-8142-ae635a3ba1ff','/audio-e32c2843-1ff9-4f37-85e7-8cb7091e1815',1,'mp3','RUSH!','Måneskin',NULL,166,'GOSSIP (feat. Tom Morello)',34),
(912,'b357ef44-154b-4a1a-af28-970b99327e80','/audio-e9f1416c-a543-43a0-b5eb-05129ba600b8',1,'mp3','RUSH!','Måneskin',NULL,192,'OWN MY MIND',39),
(913,'2145e938-0531-4307-88c3-86b9cf1b64d8','/audio-abbc2f47-f916-48da-ab3e-25952ee25a4d',1,'mp3','RUSH!','Måneskin',NULL,221,'GASOLINE',45),
(914,'12f40d4d-8692-4221-b206-ff3ca4486530','/audio-0302fe8c-b2a6-4b38-85e6-b4730c944f36',1,'mp3','RUSH! (ARE U COMING?)','Måneskin',NULL,189,'THE DRIVER',38),
(915,'f83f2243-4221-4c1a-aa7e-443facb69afc','/audio-98a45e6d-e86b-4fb6-a0df-b51265a2128e',1,'mp3','ZITTI E BUONI','Måneskin',NULL,194,'ZITTI E BUONI',39),
(916,'5596ccd6-d1ba-4b95-9a73-7fbb8043d0c8','/audio-4db8de3c-9c11-40d3-95f0-d6b62564a983',1,'mp3','Teatro d\'ira - Vol. I','Måneskin',NULL,173,'I WANNA BE YOUR SLAVE',35),
(917,'55f2448c-86c7-4387-b238-a810e7057dbd','/audio-23b7d3d0-c690-48f4-b09c-060ff470ffda',1,'mp3','Дикие травы','Мельница',NULL,253,'Далеко',51),
(918,'a0cf898f-1598-471f-93a5-86b2292741a6','/audio-830b716c-a5ff-429f-bb99-5d142d46a56b',1,'mp3','Montgomery Ricky','Ricky Montgomery',NULL,182,'This December',37),
(919,'26895e12-4200-4a38-835a-0e24e09dbef3','/audio-f6c38692-384f-4bee-a2d5-2687dd9bbe4b',1,'mp3','Color','Coyote Theory',NULL,242,'This Side of Paradise',49),
(920,'382faf5b-2e57-4346-be49-77533cd8b273','/audio-d78f720c-f8dc-4fb2-83f2-4746d613c1b3',1,'mp3','Color','Coyote Theory',NULL,188,'Vibe',38),
(921,'c02efac8-81c7-40d9-ae77-e30638014b46','/audio-81dafb95-e7b7-44e2-bc0c-6e67918eb928',1,'mp3','Светлая полоса','Noize MC',NULL,231,'Светлая полоса',47),
(922,'bbeb11bf-de41-4e05-bff4-c43a832a5e86','/audio-2ad58a04-6754-4317-a5e7-5e6f7d48fa3a',1,'mp3','геометрия тьмы','pyrokinesis',NULL,200,'нежное электричество',40),
(923,'3a7d5a24-1571-4c34-8411-384e86d38a3b','/audio-5fa84738-6f35-402f-8c1d-e9720469f818',1,'mp3','геометрия тьмы','pyrokinesis',NULL,160,'аморе аморе',32),
(924,'6c117a45-7db4-4d4f-88b6-85ef52eb368d','/audio-dbf7dca4-d79b-48f1-bcd4-8e313152a9df',1,'mp3','Зов крови','Мельница',NULL,185,'Лента в волосах',37),
(925,'c0992dbe-2e5a-42e9-a557-7ae663bde8b4','/audio-52db0c54-21a7-46ce-bf13-e5d57b3d3360',1,'mp3','Перевал','Мельница',NULL,319,'Королевна',64),
(926,'e5d6950f-3d76-4420-a7e0-86e7b0b7b35b','/audio-aeb81731-af03-410c-8a62-3870373b73db',1,'mp3','Дикие травы','Мельница',NULL,253,'Далеко',51),
(927,'98682c1f-db0e-4ad8-b86b-82f6f9648a1d','/audio-13f6d247-21ba-47c6-9cba-4a04ed814209',1,'mp3','Дикие травы','Мельница',NULL,254,'Шелкопряд',51),
(928,'73f34f43-1931-479f-b010-dff1c834df90','/audio-6a91c112-6850-43e1-b60d-a017bd2eff55',1,'mp3','Знак четырёх','Мельница',NULL,352,'Змей',71),
(929,'d6cc6b2b-4cf8-4ba0-b814-01630c046a0c','/audio-0924273d-60dd-46ec-8f83-ad05e3f324ea',1,'mp3','Дорога сна','Мельница',NULL,351,'Воин вереска',71),
(930,'a4acb0d6-ab16-4acc-a129-5a04d8a6bbed','/audio-e29290e2-6d48-4855-9c56-1f1805404218',1,'mp3','Зов крови','Мельница',NULL,209,'Двери Тамерлана',42),
(931,'c9e929fc-29f2-415e-ae80-fe493f3d945d','/audio-de1d7d95-a37a-4cd5-a489-dc0496ea4f50',1,'mp3','Символ Солнца','Мельница',NULL,250,'Царевич',51),
(932,'c9816222-e93f-44f1-859e-938f2e6f8921','/audio-17a11006-7c88-46c1-9384-644741355a94',1,'mp3','Сердце ястреба','Мельница',NULL,234,'Сердце ястреба',47),
(933,'d00bd073-2215-49a4-aefb-99cdd14f618c','/audio-0dcff704-f863-4e30-be25-327ad271b31c',1,'mp3','Музыка Кино. Чародеи','Евгений Крылатов',NULL,149,'Представь Себе',30),
(934,'3f34322b-4a87-4aaa-a428-fb6c2ae30529','/audio-467edd70-31bb-4d9c-bde8-ba85a0f009f8',1,'mp3','miss u forever','AA Records',NULL,189,'miss u forever',38),
(935,'b0f3e4a4-61a0-411b-947a-2ac98b5b1201','/audio-59b2ff03-35c9-447d-8b4a-67316845df2f',1,'mp3','Песня','Дайте танк (!)',NULL,238,'Песня',48),
(936,'46c4aba3-23f3-4038-a922-dd2a5c14924c','/audio-82771dbe-ed00-4ad6-ac9e-39e9c647c308',1,'mp3','','',NULL,203,'upload_620856413212323596.mp3',41),
(937,'c4f40c6b-6832-4460-a3eb-2e5cfa1e50f7','/audio-b6c3ac36-cd89-423f-bf86-a1cf55f1a806',1,'mp3','Зов крови','Мельница',NULL,272,'Невеста Полоза',55),
(938,'15596705-b55f-44c0-a3e5-cccb783ac022','/audio-20faf769-8e65-4fe2-93d0-410f37a4796f',1,'mp3','','',NULL,136,'upload_14139757415467304492.mp3',28),
(939,'c27d9a17-d50f-4166-a382-904bea789f3a','/audio-357ac852-23a2-4113-b992-9129b330ae02',1,'mp3','геометрия тьмы','pyrokinesis',NULL,196,'звёзды все принадлежат богам',40),
(940,'704c2918-bc60-4f37-a64f-89dded901470','/audio-cc263de8-57b7-4109-a5f3-46ba1be426d7',1,'mp3','Питер, чай, не Франция','pyrokinesis',NULL,208,'Веснушки',42),
(941,'3fbbccde-1a01-4144-9a62-959ec86c6538','/audio-09d09c3e-2b31-48b7-a895-05d821f6d7b1',1,'mp3','Цветами радуги','pyrokinesis',NULL,240,'Цветами радуги',48),
(942,'9e2a1089-51d8-4ee2-9c93-6dae9781adff','/audio-0b976eca-37ea-4a93-bdce-da4d03f1a2fb',1,'mp3','Greatest Hits','The Animals',NULL,137,'House of The Rising Sun',28),
(943,'953e160c-2e5b-445b-8496-1da89a410e26','/audio-bdf00db1-85ff-4b6c-82e9-8a061cf7e05b',1,'mp3','Ngeke (feat. Kya Lami)','MK-the-whisper',NULL,137,'Ngeke (feat. Kya Lami)',28),
(944,'119411ff-2675-4d20-be79-f83533e3e224','/audio-0f32b84a-5251-4df6-999e-aa6949625602',1,'mp3','Nod Krai Genshin','Gensh1n',NULL,260,'Nod Krai Genshin',52),
(945,'7864566f-2470-43a9-b9ed-a2190a6156b8','/audio-22d2e096-bd51-4f85-a490-9e54d340ce8b',1,'mp3','Ngeke (feat. Kya Lami)','MK-the-whisper',NULL,137,'Ngeke (feat. Kya Lami)',28),
(946,'3fec78fd-3f99-4aeb-b324-f21f4f181711','/audio-4e357d6a-4da5-44c0-a7c5-24100993a18a',1,'mp3','Chosen','Måneskin',NULL,161,'Somebody Told Me',33),
(947,'Maps','/audio-7310bcdf-58fa-430a-b811-81616a1695d1',1,'mp3','V','Maroon 5',NULL,189,'Maps',38),
(948,'44657e8b-bd9a-43f0-90fb-d95d9635e5bf','/audio-88817bae-838a-4b1c-ba70-a160082879d3',1,'mp3','Singles','Maroon 5',NULL,189,'Maps',38),
(949,'8201c0a1-6d1f-45c8-b6e6-4e8fc923cb95','/audio-bd0a03fe-9fba-4753-80f2-845457e9b3e4',1,'mp3','Radioactive','Kodac',NULL,229,'Radioactive',46),
(950,'419d7b5f-d51c-4052-812d-d97ed64d2f96','/audio-160ecaa4-4351-4fce-9136-2f084d8c6a15',1,'mp3','Radioactive','Kodac',NULL,229,'Radioactive',46),
(951,'a53e1c7b-1f81-4f06-9cac-575f64d63e4e','/audio-42f47e40-d0c8-4370-8c65-323c99c44f98',1,'mp3','','',NULL,37,'upload_11027867728709906350.mp3',8),
(952,'95c6e39a-bcbe-4838-a814-64e33a7ffc2b','/audio-7d668986-950a-40a6-942e-4b4b88c5ca87',1,'mp3','','',NULL,37,'upload_7536481007751304800.wav',8),
(953,'На Стиле','/audio-1e7a53b7-c664-4786-abfa-b995856dfa4c',1,'mp3','drivemusic.me','Время и Стекло [drivemusic.me]',NULL,225,'На Стиле',45),
(954,'64887f8c-dc5b-4920-892d-cf298b582b4a','/audio-2a5cc19f-a0b0-45c6-94fc-096b209cea79',1,'mp3','','',NULL,4,'upload_12931763260059689549.mp3',1),
(955,'d6a41f4f-40e3-4c61-a32f-0e3accab50ed','/audio-97feb868-a9f4-4e64-8f9a-51743e4ad2e6',1,'mp3','','',NULL,2,'upload_5878001219633645065.mp3',1),
(956,'f55be880-b76a-423c-a01a-b84d5286d790','/audio-4a4b8602-f258-46ed-a5e8-f6836682448e',1,'mp3','','',NULL,4,'upload_16647217022166800143.mp3',1),
(957,'6f9118f3-d33e-4397-8510-c79c58727bc3','/audio-190cfa0e-98be-409d-89e3-086418a0b11e',1,'mp3','Аудиосатсанг','Nick Rozz',NULL,35,'Аудиосатсанг',8),
(958,'acefa678-b5f2-4e30-91bc-95079a704ebe','/audio-8193c6a7-2899-4d67-b2a7-fafb10393d58',1,'mp3','','',NULL,3,'upload_4361594601693935796.mp3',1),
(959,'dbbf92c9-0935-425c-8754-f894a22e4356','/audio-3b285287-f822-49d1-9353-2c304e305b80',1,'mp3','','',NULL,4,'upload_13827985241927470720.mp3',1),
(960,'14c8200f-b4af-4f52-9360-7550787aa240','/audio-84df1b65-e1b1-40b7-b776-eece03f9d6a4',1,'mp3','Dead66end','forgotten person',NULL,7,'Mister Fish',2),
(961,'All people are people','/audio-dd3bcded-9828-4f5e-a47c-259dbc0d3eb4',1,'mp3','','',NULL,7,'All people are people',2),
(962,'How Pushkin died','/audio-15d27408-c813-435a-b0c2-56d22b5bce5d',1,'mp3','Кали-юга','ПРОСПЕКТ САВЕНКО',NULL,24,'Прогулка и прочее',5),
(963,'Camera I thought it was an owl','/audio-8b188f5f-f1f2-49f3-a223-c56ccfe9358d',1,'mp3','Песни любви и весёлой хтони','EleEleUkulele',NULL,5,'Ты станешь мемом',2),
(964,'It is sad','/audio-f2b5077b-e54a-4deb-bf82-9fb0d90b7522',1,'mp3','Swagapacka (feat. Psyatten, Botan2012)','Гошка Данков',NULL,7,'Swagapacka (feat. Psyatten, Botan2012)',2),
(965,'stabbing','/audio-b20b1392-2df0-4c35-bc7a-e4174465e5e9',1,'mp3','FANTOM','ШЕЛЯ',NULL,27,'Fantom',6),
(966,'6, 4, 2','/audio-25c6d0ee-cf8c-480f-a8f3-cd942df40f4f',1,'mp3','Почему?','Xann123',NULL,10,'Welcome to the Party',3),
(967,'Joke, laugh','/audio-d48afe7b-a58a-412b-9467-7463fd269b22',1,'mp3','','',NULL,2,'Joke, laugh',1),
(968,'Yes, all the fuck @ t','/audio-093f1d05-d267-4b57-ba5c-37d941084e87',1,'mp3','','',NULL,3,'Yes, all the fuck @ t',1),
(969,'I don&#39;t talk to you','/audio-84bcf388-37c3-4aa0-93ce-352365346e50',1,'mp3','','',NULL,8,'I don&#39;t talk to you',2),
(970,'Sanya is filming','/audio-e54804af-8d0b-45a7-9a2a-d945503c9109',1,'mp3','','',NULL,9,'Sanya is filming',2),
(971,'Music from Titanic for a meme (parody)','/audio-a4448e2a-0cab-476a-b7a8-b9a585445919',1,'mp3','','',NULL,11,'Music from Titanic for a meme (parody)',3),
(972,'meme canceled','/audio-c4a7b4ca-14df-40d6-91a1-57e4c6595392',1,'mp3','','',NULL,5,'meme canceled',2),
(973,'Oh yeah McQueen is ready (Cars)','/audio-3badbe42-7c15-4451-999e-61db5549820c',1,'mp3','','',NULL,16,'Oh yeah McQueen is ready (Cars)',4),
(974,'Wrong, try again!','/audio-0f2eda9f-bd4b-4715-80d3-1ec1dea61a02',1,'mp3','','',NULL,5,'Wrong, try again!',2),
(975,'A fly is also a helicopter full version of the song','/audio-618e8741-34fb-43a5-985f-58df3fb2e461',1,'mp3','','',NULL,20,'A fly is also a helicopter full version of the song',5),
(976,'Here our powers are all','/audio-af1faa52-7a5c-4d68-b7b7-a6e9d6e97260',1,'mp3','','',NULL,5,'Here our powers are all',2),
(977,'Oh my mom is here','/audio-f9590d4c-930c-4230-9c44-eb3af9de6cca',1,'mp3','','',NULL,20,'Oh my mom is here',5),
(978,'Who are you, I didn&#39;t call you','/audio-1aca614e-253a-481d-8703-fb43993af690',1,'mp3','','',NULL,3,'Who are you, I didn&#39;t call you',1),
(979,'Movie ending meme to be continued Directed by','/audio-fdcc7236-9019-4340-8b2b-70f310fef99b',1,'mp3','','',NULL,10,'Movie ending meme to be continued Directed by',3),
(980,'Scary, very scary','/audio-2b8e2439-f0e2-455f-9790-37f8b6d5b861',1,'mp3','','',NULL,6,'Scary, very scary',2),
(981,'Kazakhstan threatens us with bombing','/audio-0b68178e-e2e2-405c-aad8-5886702fdb3d',1,'mp3','','',NULL,2,'Kazakhstan threatens us with bombing',1),
(982,'415 - Я БАЗА ответьте. - Ringon.su','/audio-3bf7cabf-5f87-4553-9af3-5dc1f32a3902',1,'mp3','Ringon.su','(Рингтон) ',NULL,13,'415 - Я БАЗА ответьте. - Ringon.su',3),
(983,'Air siren, air raid alarm (air siren alarm)','/audio-51aa65ee-94a4-43ed-8988-5cfe6b6f32e3',1,'mp3','','',NULL,14,'Air siren, air raid alarm (air siren alarm)',3),
(984,'75cdac36-ee88-4174-9896-e7f82730d554','/audio-2ebfc461-4d45-434f-955f-51cc4b662b5f',1,'mp3','','',NULL,229,'upload_10284852051606082968.mp3',46),
(985,'Glitter & Gold','/audio-09bacc7c-5661-4b04-9ed9-a3b56bfb0abe',1,'mp3','','Barns Courtney',NULL,176,'Glitter & Gold',36),
(986,'56d43e6d-a3d4-4d93-98bd-743f2b2491f2','/audio-7ddd5efb-1ae0-4052-8e7f-207084a45411',1,'mp3','Irresistible','Fall Out Boy',NULL,206,'Irresistible',42),
(987,'Альтернатива','/audio-d9d8e5a1-bb7f-4d86-b55e-267e16e4e9eb',1,'mp3','','Дайте танк (!)',NULL,230,'Альтернатива',47),
(988,'Icarus','/audio-1d4ab8b5-8c6a-45e4-9701-212e76f1bed0',1,'mp3','','Bastille',NULL,198,'Icarus',40),
(989,'Brick By Brick','/audio-dfe7ad88-2336-437d-86fe-9d137c6f28bc',1,'mp3','','American Authors',NULL,205,'Brick By Brick',41),
(990,'Older','/audio-cdcae448-499d-49b7-a988-ac860520fb3d',1,'mp3','','Alec Benjamin',NULL,164,'Older',33),
(991,'На рассвете','/audio-9cf38f44-6f87-4cee-a219-ab96c074da99',1,'mp3','','Перемотка',NULL,253,'На рассвете',51),
(992,'285c0814-2cd7-40f8-9fdb-de55c66c1552','/audio-118504cf-44a6-43f8-97b1-f21bb2c55803',1,'mp3','Nod Krai Genshin','Gensh1n',NULL,260,'Nod Krai Genshin',52),
(993,'20215c48-ed2c-4d31-a590-4bf1684b418d','/audio-c2cd0a8d-ba4b-426a-acf8-c8ffa8dc67d1',1,'mp3','Ngeke (feat. Kya Lami)','MK-the-whisper',NULL,137,'Ngeke (feat. Kya Lami)',28),
(994,'a0319514-216b-47c4-a526-d5d2e67a04c9','/audio-8623f2fa-9b92-452d-a25c-aa05f92fa287',1,'mp3','Песня','Дайте танк (!)',NULL,238,'Песня',48),
(995,'ee0fdd83-9057-46a2-aaa3-14de1ac0fe9e','/audio-27d83f0e-a3d8-42aa-a855-c56233a9a2b4',1,'mp3','Песня','Дайте танк (!)',NULL,237,'Песня',48),
(996,'e0eea7e8-3f7d-4f60-a093-7c1c14a640f0','/audio-a61f71d4-76df-44f1-add2-157096e2f244',1,'mp3','','',NULL,60,'upload_13828803583089984671.mp3',13),
(997,'076ccc41-30ce-4eac-9dce-d60e3bd91d00','/audio-3b0bae4e-dcc2-4142-a202-3460a8958f03',1,'mp3','Genesis','Nokturn',NULL,62,'Follow',13),
(998,'ee04a0d0-541f-4445-9ded-cd8c41e840a4','/audio-2354cf2d-baee-4303-908d-7d3261ba2571',1,'mp3','Bobby','BM IV',NULL,71,'Eternal Struggle',15),
(999,'Нас Не Догонят','/audio-319fc821-0658-4777-b558-bb487c99fdd6',1,'mp3','200 KM/H In The Wrong Lane','t.A.T.u.',NULL,278,'Nas Ne Dagoniat',56),
(1000,'In The End','/audio-d9fba4df-aa8a-48cf-9747-3de167eab8e8',1,'mp3','In the End','Linkin Park',NULL,216,'In the End',44),
(1001,'Numb','/audio-739b4558-1530-41d4-9617-6b8c184a36b7',1,'mp3','Numb','Linkin Park',NULL,187,'Numb',38),
(1002,'What I&#039;ve Done','/audio-ef4ed4a1-a480-482b-bf93-80441217f730',1,'mp3','','Linkin Park',NULL,209,'What I&#039;ve Done',42),
(1003,'АУФ','/audio-44b6d92d-af67-4a5e-aef2-7d89b623b1c6',1,'mp3','АУФ','SQWOZ BAB, The First Station',NULL,192,'АУФ',39),
(1004,'1feb2ec8-e4cf-4759-b508-1672da3ce5e1','/audio-484ed221-4a82-4560-893c-42c5a84e4e3f',1,'mp3','50 CC','Feestteam',NULL,167,'50CC onopgevoerde uitvoering',34),
(1005,'Blue (Da Ba Dee)','/audio-2bbcf5cf-3a96-4935-abd7-438098ee6c91',1,'mp3','Foute CD van Q-Music 6','Eiffel 65',NULL,221,'Blue (Da Ba Dee)',34),
(1006,'СОЛНЦЕ МОНАКО','/audio-be27c11c-79c9-45f0-9b71-44af5129afde',1,'mp3','The End','Люся Чеботина',NULL,160,'СОЛНЦЕ МОНАКО',32),
(1007,'Имя 505','/audio-6a56f940-a2c3-45cb-b546-71fa5474ce4d',1,'mp3','Глубокий дом','Время и Стекло',NULL,198,'Имя 505',40),
(1008,'На Стиле','/audio-63f7e939-3ac6-4e86-9737-c9d27d21c4a8',1,'mp3','На Cтиле','Время и Стекло',NULL,225,'На Cтиле',45),
(1009,'Мокрые Кроссы','/audio-77a61abf-6d86-472d-85a1-e751cde73369',1,'mp3','Мокрые кроссы','Тима Белорусских',NULL,197,'Мокрые кроссы',40),
(1010,'Alone (Original Mix)','/audio-e91b4448-0461-418c-9e8b-717e7c3b19ec',1,'mp3','Alone','Marshmello',NULL,273,'Alone',55),
(1011,'Пчеловод','/audio-47c36c01-1731-421e-bee6-af400c5b9c55',1,'mp3','Пчеловод','Räsä',NULL,170,'Пчеловод',34),
(1012,'Молния','/audio-c1196bd2-edb6-4353-a265-3f789f47b4ef',1,'mp3','Молния','Дима Билан',NULL,181,'Молния',37),
(1013,'Shape Of You','/audio-866ff0ca-faf7-4113-8414-6fcc74bbf4cc',1,'mp3','Shape of You (NOTD Remix)','Ed Sheeran, NOTD',NULL,233,'Shape of You (NOTD Remix)',47),
(1014,'Юность','/audio-d6f92513-1576-4815-ad17-52d9ab95d325',1,'mp3','Юность','Dabro',NULL,219,'Юность',44),
(1015,'Мальчик На Девятке','/audio-5e3865ea-3bc7-4ce7-8e5d-747aa1e3ca64',1,'mp3','ПРОПАГАНДА','DEAD BLONDE',NULL,215,'Мальчик на девятке',43),
(1016,'Федерико Феллини','/audio-60a48ef8-4f10-4e17-b7f0-a456fdb80310',1,'mp3','Федерико Феллини','Galibri & Mavik',NULL,136,'Федерико Феллини',28),
(1017,'bcb9907c-372a-4cdb-8304-d5d7d6077249','/audio-35b5080b-9420-45ba-8912-67f975e330c6',1,'mp3','Songs I Held In My Head','Ellis Beale Hastings',NULL,111,'March Of Shame',23),
(1018,'47ae694c-e658-4123-8252-4433c4d7710f','/audio-deee7209-acba-4f03-8730-f6859ca6cfd5',1,'mp3','33 Max Verstappen','Carte Blanq, Nils van Zandt, Maxx Power',NULL,157,'33 Max Verstappen',32),
(1019,'Я один гуляю (Opera Experimental Version)','/audio-63a8ee4c-1aca-46c1-9e0e-888b4d58311b',1,'mp3','Я один гуляю (Opera Experimental Version)','Владимир Клявин',NULL,142,'Я один гуляю (Opera Experimental Version)',29),
(1020,'Фамилия','/audio-c5beb979-3da5-4a74-a997-d20ee8cac357',1,'mp3','Хрупко','Дайте танк (!)',NULL,262,'Фамилия',53),
(1021,'Устрой дестрой','/audio-945520b1-c15e-4034-828f-1945f4bd769e',1,'mp3','Последний альбом','Noize MC, Чача',NULL,239,'Устрой дестрой',48),
(1022,'Танцы','/audio-c92d711e-704c-4cef-aa5e-a6948426d5f1',1,'mp3','Последнее лето (Часть 2)','ssshhhiiittt!',NULL,175,'Танцы',35),
(1023,'Пожары','/audio-aa7f121d-1841-4de9-b380-6a4faf6698f2',1,'mp3','Пожары','Xolidayboy',NULL,197,'Пожары',40),
(1024,'Fireball','/audio-a626793e-b910-4d9d-bd97-be79f4190b9d',1,'mp3','Fireball (feat. John Ryan)','Pitbull, John Ryan',NULL,234,'Fireball (feat. John Ryan)',47),
(1025,'New Age','/audio-cf659f6b-63dd-4b97-b2e6-28d4150ec3e0',1,'mp3','','Marlon Roudette',NULL,211,'New Age',43),
(1026,'Обломки чувств','/audio-8769b9d2-83c4-4c3f-a523-608c501fb062',1,'mp3','Открой мне сердце','TERESHINA',NULL,168,'Обломки чувств',34),
(1027,'Ничего нового (feat. Noize MC)','/audio-503fd2ea-fb2c-423f-84f9-1da4c9210fb7',1,'mp3','Бездна','Atlantida Project, Noize MC',NULL,271,'Ничего нового (feat. Noize MC)',55),
(1028,'Уши (Sefon.Pro)','/audio-e6a90cc1-8ba7-4c22-b4e1-af7fe003f9b6',1,'mp3','','Лампабикт',NULL,150,'Уши (Sefon.Pro)',31),
(1029,'Надежда (Sefon.me)','/audio-427c65e4-00c2-478d-b50f-e8d47cdd0eb3',1,'mp3','','Кукрыниксы',NULL,239,'Надежда (Sefon.me)',48),
(1030,'Компьютерная мышь','/audio-0f1d0f49-7235-46c0-8e16-6cf1f9a69038',1,'mp3','','thepodarki',NULL,272,'Компьютерная мышь',55),
(1031,'Районы-кварталы (Sefon.me)','/audio-9d8a3068-c01e-4629-b5a1-251e53b243a7',1,'mp3','','Звери',NULL,204,'Районы-кварталы (Sefon.me)',41),
(1032,'Дубак','/audio-f3764a98-5f60-4f09-a733-f179d5883597',1,'mp3','Я тебя никогда','Anacondaz',NULL,174,'Дубак',35),
(1033,'Paint The Town Red ремикс (Muzuy.net)','/audio-3d987e8b-5a99-490a-885f-b2c4e59d51b0',1,'mp3','NOW That\'s What I Call Music! 116','Doja Cat',NULL,231,'Paint The Town Red',47),
(1034,'幸せ','/audio-31b0b1c2-ba8f-4051-b8db-19836dbd6961',1,'mp3','Happiness','Omoinotake',NULL,260,'Happiness',53),
(1035,'e41952c7-5966-475c-9a65-a49d58a7723d','/audio-e1e91ddd-f6e6-4e4d-b103-b97c90378ab5',1,'mp3',NULL,NULL,NULL,5,'upload_2251593013288470592.mp3',2),
(1036,'Гармонист играет','/audio-b5e38a99-cd49-4450-81ea-e7c74788fbc1',1,'mp3','','thepodarki',NULL,197,'Гармонист играет',40),
(1037,'10:35','/audio-ed76888c-407b-4c87-8f1a-b0b3fd8b77ba',1,'mp3','Zamona Music','Tiësto & Tate McRae',NULL,172,'10:35',35),
(1038,'Samba (feat. Louis III)','/audio-d7b7e677-71d7-4e85-b186-6a15c119439e',1,'mp3','Samba','YouNotUs',NULL,147,'Samba (feat. Louis III)',30),
(1039,'Run Boy Run  (mp3store.live)','/audio-e9cce31d-b1c3-4cde-b730-185a5ef9ddba',1,'mp3','','Woodkid',NULL,222,'Run Boy Run  (mp3store.live)',45),
(1040,'Wild Slide','/audio-1c8f5bfa-bcfe-4043-b6a8-e5d7d5321f7a',1,'mp3','Tuppence','Jules Gaia',NULL,171,'Wild Slide',35),
(1041,'0b3cfea8-1050-4026-bc52-de49b0b7c96d','/audio-198f5482-4438-4a75-b762-7121b0fbe308',1,'mp3','','',NULL,18,'upload_1492087561013849538.mp3',4),
(1042,'7cbf1fa3-2c60-4953-bd21-fb0a7dfe527b','/audio-2eaef6a4-e8ff-4aa4-a91b-7f68f77b7a13',1,'mp3','Shots & Squats','Vigiland, Tham Sway',NULL,232,'Shots & Squats',47),
(1043,'df8c1490-1141-475e-ae4f-8fd9ef1b9452','/audio-ce92ab38-9ec1-4fb1-9226-2611649e0e3b',1,'mp3','Pedro','Jaxomy, Agatino Romero, Raffaella Carrà',NULL,17,'Pedro (Extended Mix)',4),
(1044,'Friday Night','/audio-b092d994-43ce-476c-8004-a359fc2c7598',1,'mp3','Friday Night','Vigiland',NULL,173,'Friday Night',35),
(1045,'remember our summer remix','/audio-36dcc5f4-5c4a-4ee7-8155-8ed5f205a65a',1,'mp3','Swagger','精彩子林',NULL,166,'Remember Our Summer（DJ版）',34),
(1046,'We\'re Not Gonna Take It [muzonov.net]','/audio-3d9130cb-632f-412d-b0eb-32f04f66c218',1,'mp3','We\'re Not Gonna Take It','Twisted Sister',NULL,219,'We\'re Not Gonna Take It',44),
(1047,'Stressed Out','/audio-52998e69-2e2f-4129-8dda-4804d4a54a8a',1,'mp3','','Twenty One Pilots',NULL,202,'Stressed Out',41),
(1048,'08f69f0e-4caa-4476-b135-683f98245a82','/audio-b13a8041-b9ed-4d33-859c-9e9f793bb18d',1,'mp3','101 Party Starters','Train',NULL,218,'Hey, Soul Sister',44),
(1049,'92b3141e-d5a1-4980-b605-363fabba1047','/audio-29c2daab-b8b9-4794-9616-c1cd9d4e649e',1,'mp3','Leave a Light On','Tom Walker',NULL,185,'Leave a Light On (The Voice of Avakin)',38),
(1050,'Lay Low','/audio-34849234-e163-4e87-87fc-587ed3e7cfc2',1,'mp3','January 2023','Tiesto',NULL,153,'Lay Low',31),
(1051,'Out Of The Rain','/audio-36e6e31d-459f-4466-afcf-7a6c62d854c3',1,'mp3','April 2023','TheFatRat feat. Shiah Maisel',NULL,193,'Out Of The Rain',39),
(1052,'Xenogenesis (Muzqa.net)','/audio-640a2dfd-a145-4d49-848a-fd9a355fb416',1,'mp3','Muzqa.net','TheFatRat',NULL,233,'Xenogenesis (Muzqa.net)',47),
(1053,'Unity 000','/audio-3b069e09-76c7-47e2-8083-66d87cf6ac87',1,'mp3','MY FAVOURITE GAME','Pro Mentality',NULL,249,'BASKET CASE',50),
(1054,'The Calling (feat. Laura Brehm) (mp3store.cc)','/audio-2bf8fe22-f223-49ca-bf81-862127a4d350',1,'mp3','The Calling','TheFatRat',NULL,228,'The Calling (feat. Laura Brehm)',46),
(1055,'Rise Up (mp3store.live)','/audio-be114c76-91c3-440c-bead-9e39240c23b8',1,'mp3','Rise Up','TheFatRat',NULL,169,'Rise Up',34),
(1056,'Monody','/audio-f33d2719-c24a-477f-b0ce-3608e30b0c92',1,'mp3','Stay Young','TheFatRat, Laura Brehm',NULL,290,'Monody (feat. Laura Brehm)',58),
(1057,'Stand Up','/audio-58a2f836-5498-4dc7-ba72-cabcdcb49ef8',1,'mp3','In A Beautiful Place Out In The Country','TheCab',NULL,263,'StandUp',53),
(1058,'The Passenger','/audio-35e6772d-311d-47ef-99de-eb53070a1e39',1,'mp3','Lust For Life','Iggy Pop',NULL,282,'The Passenger',57),
(1059,'The Fine Print','/audio-e72320c9-ed8a-4406-ad8d-cfa05ecf6827',1,'mp3','The Fine Print (The Outer Worlds Song)','The Stupendium',NULL,274,'The Fine Print',55),
(1060,'Eye of the Tiger','/audio-33c1011e-4239-40a3-bcfd-65ddca5d437e',1,'mp3','Essential 80s - Classic Eighties Pop And Rock Hits','Survivor',NULL,227,'Eye of the Tiger',46),
(1061,'Cradles','/audio-1bb59281-50ae-4bd5-9e04-6d209278673d',1,'mp3','Cradles','Sub Urban',NULL,209,'Cradles',42),
(1062,'5c328587-6d1c-4a58-a5ec-67413cc8fad5','/audio-358872e2-87ea-4017-b92d-e73b1c786e71',1,'mp3','','',NULL,167,'upload_17807871221400009759.mp3',34),
(1063,'Stretch Your Face','/audio-99525ef7-9688-4285-81da-256c2da4e042',1,'mp3','Silicon Valley (Music From The HBO Original Series)','TOBACCO',NULL,165,'Stretch Your Face',33),
(1064,'Inferno','/audio-57299c7f-9edf-4227-b3c1-8a8855f0fbeb',1,'mp3','Inferno','Mrs. GREEN APPLE',NULL,212,'Inferno',43),
(1065,'Пиво-Пиво-Пиво','/audio-d4103afc-4665-4e55-ab15-28dded160061',1,'mp3','Домашний Альбом','КняZz',NULL,129,'Пиво-Пиво-Пиво',26),
(1066,'Nie Allein','/audio-e83d072b-c29e-43be-a91b-7ec6a9978fd1',1,'mp3','Nie Allein','KAFFKIEZ',NULL,205,'Nie Allein',41),
(1067,'For A Better Day','/audio-1e05db49-bfd5-4bfe-96f8-1c018d8de102',1,'mp3','Stories','Avicii',NULL,206,'For A Better Day',42),
(1068,'Uptown Girl','/audio-558c1bbb-38b0-4028-b361-5eb99393bc16',1,'mp3','An Innocent Man','Billy Joel',NULL,197,'Uptown Girl',40),
(1069,'We Didn\'t Start the Fire','/audio-66b99496-ae83-43cb-a5ec-a31367c6e7e0',1,'mp3','Storm Front','Billy Joel',NULL,287,'We Didn\'t Start the Fire',58),
(1070,'Psycho Killer','/audio-1af4fa9d-93e3-4c3a-96ae-962c48865ec7',1,'mp3','Rock Legends','Talking Heads',NULL,261,'Psycho Killer',53),
(1071,'Double audition (feat. Brav’)','/audio-0fd229d6-bbde-41ad-86c9-ef24b17b85d6',1,'mp3','Protest Song','Médine',NULL,232,'Double audition (feat. Brav’)',47),
(1072,'Wannabe','/audio-bb9150ec-aa67-44fe-b9b9-0668a6b94305',1,'mp3','Spice','Spice Girls',NULL,173,'Wannabe',35),
(1073,'Leave You Behind','/audio-e25f8b8f-312b-42a5-bbf9-452b86fe4b83',1,'mp3','Leave You Behind','Ryan Mack',NULL,161,'Leave You Behind',33),
(1074,'アイドル','/audio-0bb29bc8-bde0-4e12-b8c3-adad3f67a9d8',1,'mp3','THE BOOK 3','YOASOBI',NULL,213,'アイドル',43),
(1075,'Северный ветер','/audio-2f47aaf1-b4ba-460a-8daa-3d736c52a3a3',1,'mp3','На заре','Kira Winter',NULL,238,'Северный ветер',48),
(1076,'Zonnestraal','/audio-ad0a33e6-8539-4153-914c-18f095f54a18',1,'mp3','Zonnestraal','De Hofnar',NULL,257,'Zonnestraal',52),
(1077,'Wrong or Right (The Riddle)','/audio-d67ac3cf-6ee1-4dc5-a1a2-a77293075015',1,'mp3','Wrong or Right (The Riddle)','Bassjackers',NULL,154,'Wrong or Right (The Riddle)',31),
(1078,'World Gone Wild (feat. Sam Martin) - KOPPY Remix','/audio-86213fdf-1a1a-4469-a285-2f89da30f5b2',1,'mp3','World Gone Wild (feat. Sam Martin) [KOPPY Remix]','Robin Schulz/CYRIL/Sam Martin/KOPPY',NULL,149,'World Gone Wild (feat. Sam Martin) - KOPPY Remix',30),
(1079,'Where Is My Mind?','/audio-fc25475f-0fd0-4f44-be5d-12634c64534b',1,'mp3','Death to the Pixies','Pixies',NULL,229,'Where Is My Mind?',46),
(1080,'We Will Rock You','/audio-879cb064-d393-4383-b665-654569e27f20',1,'mp3','I Love Dad','Queen',NULL,122,'We Will Rock You',25),
(1081,'We Didn’t Start The Fire (Bonus Track)','/audio-d2b90310-d2f1-4377-8742-5458080553cb',1,'mp3','So Much (For) Stardust','Fall Out Boy',NULL,215,'We Didn’t Start The Fire (Bonus Track)',44),
(1082,'UP!','/audio-475deebf-7a38-4588-bd1b-110f9cbcde0b',1,'mp3','CHILD OF GOD','Forrest Frank/Connor Price',NULL,137,'UP!',28),
(1083,'Up & Down','/audio-ff0c1dec-1dd2-437f-a6ed-245e23c3420c',1,'mp3','Up & Down','Marnik',NULL,164,'Up & Down',33),
(1084,'Two Moons','/audio-5c3b8691-9f4b-4d39-954a-999f25c59fc3',1,'mp3','Fever Dreams','BoyWithUke',NULL,224,'Two Moons',45),
(1085,'Trampoline','/audio-af2c7cfb-77c0-4e8f-acf8-ae950e728b23',1,'mp3','Melt (Deluxe)','SHAED',NULL,184,'Trampoline',37),
(1086,'Ticking','/audio-d60197f5-41b8-4e2b-a21a-b0e5184bc305',1,'mp3','Ticking','TIN',NULL,272,'Ticking',55),
(1087,'The Woodchuck Song','/audio-2e267438-ef0a-49b5-add8-9180567f37dd',1,'mp3','The Woodchuck Song','AronChupa/Little Sis Nora',NULL,154,'The Woodchuck Song',31),
(1088,'The Seven Deadly Sins - Perfect Time - Remix','/audio-f2f99e5d-2e79-4964-b953-da6359d67fcf',1,'mp3','ANIME REMIXES','Rifti Beats/Trap Music Now',NULL,200,'The Seven Deadly Sins - Perfect Time - Remix',41),
(1089,'The Office - Main Theme','/audio-cc268333-5239-4fca-a7f5-226c57d6281a',1,'mp3','The Office - Main Theme','Geek Music',NULL,90,'The Office - Main Theme',18),
(1090,'The Moss','/audio-2e608b5e-97e5-40ff-b3ca-1e3f2b3e1b5d',1,'mp3','The Moss','Cosmo Sheldrake',NULL,242,'The Moss',49),
(1091,'The Hanging Tree','/audio-43a352db-4b2d-4c6b-962f-20775a54bb74',1,'mp3','The Hunger Games: Mockingjay Pt. 1 (Original Motion Picture Score)','James Newton Howard/Jennifer Lawrence',NULL,218,'The Hanging Tree',44),
(1092,'The Emptiness Machine','/audio-7bef55a2-ded9-485f-9b54-e33064514fbf',1,'mp3','From Zero','Linkin Park',NULL,190,'The Emptiness Machine',38),
(1093,'The Bidding','/audio-6c93309c-f623-4fe3-b2b3-bc4f9326301f',1,'mp3','Marvin\'s Marvelous Mechanical Museum','Tally Hall',NULL,160,'The Bidding',33),
(1094,'TETRIS PHONK','/audio-642c562a-3118-4b24-8f82-48ae851e8ebc',1,'mp3','TETRIS PHONK','sma$her',NULL,66,'TETRIS PHONK',14),
(1095,'Sweater Weather','/audio-b1646a78-ae67-406a-b9d8-a6129935bb73',1,'mp3','I Love You.','The Neighbourhood',NULL,240,'Sweater Weather',48),
(1096,'Supernatural - Acoustic','/audio-7e4204f0-5b06-41ea-af65-299854ec19f9',1,'mp3','Supernatural (Acoustic)','Barns Courtney',NULL,186,'Supernatural - Acoustic',38),
(1097,'Sunshine','/audio-7070c121-d7e9-4466-ade2-eec11391e512',1,'mp3','Sunshine','OneRepublic',NULL,163,'Sunshine',33),
(1098,'Suffer With Me','/audio-f0a29d89-d3a2-4267-b90e-016b3f747bb8',1,'mp3','Suffer With Me','líue',NULL,207,'Suffer With Me',42),
(1099,'Soldier, Poet, King','/audio-24cfd00a-1cf9-4ba6-b4e3-e4d3e115e450',1,'mp3','Dear Wormwood','The Oh Hellos',NULL,165,'Soldier, Poet, King',34),
(1100,'Sky Over Tokyo','/audio-487f87c0-9e1a-42c1-bed6-26ecc6e0364c',1,'mp3','Suzume (Motion Picture Soundtrack)','RADWIMPS',NULL,254,'Sky Over Tokyo',51),
(1101,'Sinners','/audio-5da8829d-286b-4544-95af-ba87ddeae529',1,'mp3','Sinners','Barns Courtney',NULL,173,'Sinners',35),
(1102,'Seavolution (From Hotel Transylvania 3)','/audio-146a08bb-9b24-40cf-937e-b1edc7f63b63',1,'mp3','Hotel Transylvania 3','Tiësto',NULL,121,'Seavolution (From Hotel Transylvania 3)',25),
(1103,'Savage','/audio-80923cda-7b93-40cc-882e-7196a9e9ec5c',1,'mp3','Savage','Bahari',NULL,164,'Savage',33),
(1104,'Russian','/audio-b2870601-17c9-40d2-b507-998683629227',1,'mp3','<I°_°I>','Caravan Palace',NULL,241,'Russian',49),
(1105,'Runaway (Sped Up) - And I Was Runnin’ Far Away Would I Run off the World Someday?','/audio-1e69bff9-71bc-49ea-ba02-c94b7ef608ed',1,'mp3','Runaway (Sped Up) - And I Was Runnin’ Far Away Would I Run off the World Someday?','Hiko',NULL,206,'Runaway (Sped Up) - And I Was Runnin’ Far Away Would I Run off the World Someday?',42),
(1106,'Run','/audio-dcc3a282-3f05-493f-a292-161811f273b3',1,'mp3','Run','OneRepublic',NULL,169,'Run',34),
(1107,'Run It','/audio-2501bc11-5d38-430b-ad12-e9cae68eeba4',1,'mp3','Run It','Jelly Roll',NULL,159,'Run It',32),
(1108,'Rob A Bank','/audio-0abf3331-4d97-4592-b8c3-6794df79f75b',1,'mp3','Rob A Bank','Confetti',NULL,173,'Rob A Bank',35),
(1109,'River','/audio-3cfdbc9c-1bc9-44b2-9d52-33f07828b379',1,'mp3','BRKN LOVE (Deluxe Edition)','BRKN LOVE',NULL,225,'River',45),
(1110,'Rim Tim Tagi Dim','/audio-23c8bf62-232d-4388-a3d2-b3265bf1ede0',1,'mp3','Rim Tim Tagi Dim','Baby Lasagna',NULL,179,'Rim Tim Tagi Dim',36),
(1111,'Renegades','/audio-6ba6b7c2-b707-46fc-bc8d-a9032a06ed64',1,'mp3','VHS','X Ambassadors',NULL,195,'Renegades',39),
(1112,'Red Flag','/audio-3a9d7b8b-65c5-474f-88c1-9834a25a72d2',1,'mp3','Billy Talent II','Billy Talent',NULL,198,'Red Flag',40),
(1113,'Red Dress','/audio-9a65796c-afbb-4755-a5ca-6a433cad9838',1,'mp3','Pluto Tapes: Volume 4','Unlike Pluto',NULL,157,'Red Dress',32),
(1114,'Reality','/audio-73ea4eb7-5b08-4a7a-aed5-3a6d3a34f77a',1,'mp3','Less Is More','Lost Frequencies/Janieck',NULL,159,'Reality',32),
(1115,'Queen of Kings','/audio-5ad2da63-c5fa-4fef-8b89-9151a20753b6',1,'mp3','Queen of Kings','Alessandra',NULL,148,'Queen of Kings',30),
(1116,'Pretty Low','/audio-9f57449d-18d3-4109-9933-69d9c7baa14c',1,'mp3','Pretty Low','Dillon Francis/Galantis/Arden Jones',NULL,172,'Pretty Low',35),
(1117,'Peter Pan','/audio-9e2c74cd-eec9-4335-b86e-be932e950d35',1,'mp3','Peter Pan','Julian Sommer/Mia Julia',NULL,210,'Peter Pan',42),
(1118,'Paralyzer','/audio-3b2cfc4b-2356-4bc7-8886-6ff90cda0045',1,'mp3','Them Vs. You Vs. Me (Deluxe Edition)','Finger Eleven',NULL,208,'Paralyzer',42),
(1119,'Na Na Na (Na Na Na Na Na Na Na Na Na)','/audio-471d1f1c-20cb-44f2-b32d-c56ec420e7af',1,'mp3','Danger Days: The True Lives of the Fabulous Killjoys','My Chemical Romance',NULL,205,'Na Na Na (Na Na Na Na Na Na Na Na Na)',42),
(1120,'My Universe','/audio-23f788a6-fd04-4e2c-b577-a1c5989b9856',1,'mp3','My Universe','Coldplay/BTS',NULL,228,'My Universe',46),
(1121,'My Ordinary Life','/audio-44aba5ba-e8df-41da-a1ce-b9fd72f16325',1,'mp3','My Ordinary Life','The Living Tombstone',NULL,230,'My Ordinary Life',47),
(1122,'My Alcoholic Friends','/audio-49acaddf-ec27-4abe-91c4-dfe9293816c1',1,'mp3','Yes, Virginia','The Dresden Dolls',NULL,167,'My Alcoholic Friends',34),
(1123,'Move It','/audio-bc093483-a2f0-4b82-8734-e2d61d3fc21c',1,'mp3','Move It','Valentino Khan/Dillon Francis',NULL,201,'Move It',41),
(1124,'Morgen kickt der Kater','/audio-87d6dab9-99e1-49c6-a310-08d68e37eae7',1,'mp3','Morgen kickt der Kater','Julian Sommer',NULL,196,'Morgen kickt der Kater',40),
(1125,'Middle Finger','/audio-f3f4af3c-df0b-4343-ba1f-1df90c4c6540',1,'mp3','Middle Finger','Bohnes',NULL,230,'Middle Finger',46),
(1126,'Lucky (I\'m So Lucky Lucky) - Remix','/audio-c10fb3ee-54dd-410c-94d2-7c82b0b93f2e',1,'mp3','Lucky (I\'m So Lucky Lucky) [Remix]','Lucky Twice/Tik Tok Trends/sped up + slowed',NULL,180,'Lucky (I\'m So Lucky Lucky) - Remix',37),
(1127,'Low','/audio-c3ac3cff-06b8-4a99-80b3-dfe8209ef9f7',1,'mp3','Low','71 Digits/Flo Rida',NULL,135,'Low',28),
(1128,'LOVELY BASTARDS','/audio-182d819e-35b7-40be-b4bf-008d5fb98d1b',1,'mp3','LOVELY BASTARDS','ZWE1HVNDXR/yatashigang',NULL,116,'LOVELY BASTARDS',24),
(1129,'Love Like Mine','/audio-d4bcf955-dadc-48b7-baa9-fdb4d65c8b89',1,'mp3','Woman of the Hour','Stela Cole',NULL,188,'Love Like Mine',38),
(1130,'Love Grows (Where My Rosemary Goes)','/audio-198eb175-8961-4354-960b-5b081013e04d',1,'mp3','Love Grows (Where My Rosemary Goes) & Other Gems','Edison Lighthouse',NULL,174,'Love Grows (Where My Rosemary Goes)',35),
(1131,'Lose Yourself','/audio-b661bb62-bb4e-4ec9-a32b-0e33357afdef',1,'mp3','Just Lose It','Eminem',NULL,320,'Lose Yourself',64),
(1132,'Looking for Freedom','/audio-ebd7e8c0-c6ff-483d-b757-890f7a7a5c92',1,'mp3','Looking for Freedom','Luca-Dante Spadafora/David Hasselhoff',NULL,159,'Looking for Freedom',32),
(1133,'Lone Digger','/audio-bf4fd118-5095-419a-ab93-40154fad9594',1,'mp3','<|º_º|>','Caravan Palace',NULL,229,'Lone Digger',46),
(1134,'Lobster','/audio-fb3f9c29-40a7-4ec8-84ba-cd903b70b925',1,'mp3','Lobster','RJ Pasin',NULL,116,'Lobster',24),
(1135,'Like a Prayer - Choir Version From “Deadpool & Wolverine”','/audio-5359b4a9-2aea-4800-888a-6d2a8e17eb8c',1,'mp3','Deadpool & Wolverine: Madonna\'s \"Like a Prayer\" EP','I\'ll Take You There Choir',NULL,152,'Like a Prayer - Choir Version From “Deadpool & Wolverine”',31),
(1136,'Left Hand Free','/audio-b44da4c1-ba92-45d2-b780-3d56c859bace',1,'mp3','This Is All Yours','alt-J',NULL,173,'Left Hand Free',35),
(1137,'Krusty Krab (Hip Hop Vine Remix)','/audio-45ce37fb-a5b9-4ede-a1e4-3c38a3a96c6b',1,'mp3','Krusty Krab (Hip Hop Vine Remix)','Vineotap',NULL,120,'Krusty Krab (Hip Hop Vine Remix)',24),
(1138,'Jolene','/audio-e741c8ca-c061-4d31-b239-43286f51358f',1,'mp3','Jolene','POLTERGST/Blasterjaxx/ILSE',NULL,121,'Jolene',25),
(1139,'It\'s Tricky','/audio-1ec8d026-ea66-4bd3-a1c5-8caaa835efef',1,'mp3','Raising Hell (Expanded Edition)','Run–D.M.C.',NULL,183,'It\'s Tricky',37),
(1140,'It\'s My Life','/audio-2c920ad6-a198-4a8b-964d-567343a849ed',1,'mp3','Crush','Bon Jovi',NULL,224,'It\'s My Life',45),
(1141,'Immigrant Song - Remaster','/audio-5bc51ba9-9c79-4ffb-8fcf-085f3ff02b45',1,'mp3','Led Zeppelin III (Remaster)','Led Zeppelin',NULL,146,'Immigrant Song - Remaster',30),
(1142,'I\'m Blue - Club Mix','/audio-956b5d82-9238-4b0f-bf2c-1309c3f1e936',1,'mp3','I\'m Blue (Club Mixes)','Kush Kush',NULL,150,'I\'m Blue - Club Mix',30),
(1143,'I Just Wanna Run','/audio-49a06cbe-a605-41b2-98da-7cbd691f7760',1,'mp3','Let\'s Be Animals','The Downtown Fiction',NULL,199,'I Just Wanna Run',40),
(1144,'Hellfire','/audio-27043c21-c243-470a-9260-2a96e1ad5e9a',1,'mp3','The Attractions Of Youth','Barns Courtney',NULL,168,'Hellfire',34),
(1145,'Hedgehog on a Roomba','/audio-8b930cbc-ff0d-4a91-b0f6-03b037d07ed5',1,'mp3','Hedgehog on a Roomba','Dusty Douglas',NULL,64,'Hedgehog on a Roomba',13),
(1146,'Hayloft','/audio-8e1d985c-7d75-4cec-bfaf-6d34346f4ca7',1,'mp3','O My Heart','Mother Mother',NULL,181,'Hayloft',37),
(1147,'Harder Better Faster Whopper','/audio-e422e820-3a9a-4e3d-b016-51784426f18c',1,'mp3','Harder Better Faster Whopper','ShadowStep',NULL,105,'Harder Better Faster Whopper',22),
(1148,'Half of forever','/audio-157945e5-cf86-4ebc-81d9-27d86a04dd04',1,'mp3','Half of forever','Henrik',NULL,153,'Half of forever',31),
(1149,'Haaland (Ha Ha Ha)','/audio-ad9412eb-4be3-45c1-b55a-4f65a1a3ad8f',1,'mp3','Haaland (Ha Ha Ha)','CTID',NULL,185,'Haaland (Ha Ha Ha)',38),
(1150,'Grace Kelly','/audio-d2037c34-a4c2-4e0b-bab1-324023495738',1,'mp3','Life In Cartoon Motion','MIKA',NULL,187,'Grace Kelly',38),
(1151,'GOSSIP (feat. Tom Morello)','/audio-1bd3f4d9-6342-440b-9f0c-edc6cfa37b85',1,'mp3','RUSH!','Måneskin/Tom Morello',NULL,168,'GOSSIP (feat. Tom Morello)',34),
(1152,'Good Morning [New] World!','/audio-053ed4d9-a39a-4622-9b7a-4849af1ee0e3',1,'mp3','The WORLD is Mine','BURNOUT SYNDROMES',NULL,258,'Good Morning [New] World!',52),
(1153,'Golden Years','/audio-6a3513a9-baeb-4098-8c63-80824fa55bac',1,'mp3','Golden Years','Stellar',NULL,124,'Golden Years',25),
(1154,'gnomes vs knights','/audio-8670fba0-a5e6-43f2-9bc0-4647aa2e0afd',1,'mp3','gnomes vs knights','SDM Nation',NULL,164,'gnomes vs knights',33),
(1155,'Get Loud','/audio-2489e074-0123-41a5-8f14-b001d3398f58',1,'mp3','Built for This','Valley Of Wolves',NULL,196,'Get Loud',40),
(1156,'Freaks','/audio-5a1c7ccd-2bc0-4b42-a843-aa7f877aa2a7',1,'mp3','Freaks','Surf Curse',NULL,147,'Freaks',30),
(1157,'Figure You Out','/audio-e9246fb0-ee1c-4316-b7e6-274798b5f059',1,'mp3','Long Story Short','VOILÀ',NULL,163,'Figure You Out',33),
(1158,'Eleanor Rigby','/audio-73cba180-af39-4b68-b653-5a1821a44529',1,'mp3','Yellow Submarine Songtrack','The Beatles',NULL,125,'Eleanor Rigby',25),
(1159,'Don\'t Need A Hero','/audio-a4aa5ebe-c128-4297-9f5c-6f4869ad1dbd',1,'mp3','Don\'t Need A Hero','The Score',NULL,152,'Don\'t Need A Hero',31),
(1160,'Discord (Trap Remix)','/audio-cf855d2e-b099-4c7e-9c80-bb2d81fdd1e7',1,'mp3','Discord (Trap Remix)','Leonz',NULL,93,'Discord (Trap Remix)',19),
(1161,'Dicht im Flieger','/audio-88c40301-b92c-46c6-b378-8f02b11ccefd',1,'mp3','Dicht im Flieger','Julian Sommer',NULL,225,'Dicht im Flieger',46),
(1162,'DEJA VU - Extended ver.','/audio-dc5a7b28-2306-447b-b1f0-ed1993850284',1,'mp3','SUPER EUROBEAT presents DAVE RODGERS Special COLLECTION (Vol.2)','dave rodgers',NULL,160,'DEJA VU - Extended ver.',32),
(1163,'Deep End','/audio-58b655b8-0dbe-4d90-9e7a-52a2ff0ffb58',1,'mp3','Deep End','Fousheé',NULL,141,'Deep End',29),
(1164,'Deadcrush','/audio-130d2512-73f0-434c-b11e-95e21848edd8',1,'mp3','RELAXER','alt-J',NULL,232,'Deadcrush',47),
(1165,'Daredevil','/audio-5bf35e3f-1a03-426d-839a-be43f9416eea',1,'mp3','Daredevil','Stellar',NULL,135,'Daredevil',28),
(1166,'Cupid\'s Chokehold / Breakfast in America','/audio-9553d7c9-0257-496c-95ab-90eb4d685cfb',1,'mp3','The Papercut Chronicles','Gym Class Heroes',NULL,243,'Cupid\'s Chokehold / Breakfast in America',49),
(1167,'Crucified - Radio Edit','/audio-b75090b2-00f5-441c-966f-215dd7d0868f',1,'mp3','Massive Luxury Overdose (Swedish Version)','Army Of Lovers',NULL,214,'Crucified - Radio Edit',43),
(1168,'Creator','/audio-674a10ac-4766-4159-83c5-039f38ae0928',1,'mp3','Minecraft: Tricky Trials (Original Game Soundtrack)','Lena Raine/Minecraft',NULL,177,'Creator',36),
(1169,'Colorblind','/audio-dbb97c4c-70cf-4f3e-b10d-2fff119c19bc',1,'mp3','KIKO','Panda Eyes',NULL,289,'Colorblind',58),
(1170,'Coffin Dance','/audio-a6318ad5-c9ee-4ff6-b20f-dd4919b5bb9a',1,'mp3','Coffin Dance','Music Falcon',NULL,135,'Coffin Dance',28),
(1171,'Chlorine','/audio-fb601feb-1309-4e3b-8d5f-d6f3d6fc4a47',1,'mp3','Trench','Twenty One Pilots',NULL,324,'Chlorine',65),
(1172,'Ching Cheng Hanji','/audio-7928f0bf-bde4-4552-b7a9-314299b9b338',1,'mp3','Social Cred','Gippeul',NULL,214,'Ching Cheng Hanji',43),
(1173,'Chasing Paradise','/audio-2eafcf6d-fd23-4257-afdc-62139d98fd15',1,'mp3','Chasing Paradise','Kygo/OneRepublic',NULL,180,'Chasing Paradise',36),
(1174,'Champion','/audio-43ece4a3-47e2-464a-ae4b-a00b5ef018bf',1,'mp3','The Attractions Of Youth','Barns Courtney',NULL,190,'Champion',38),
(1175,'Careful What You Wish For (the doctor said to)','/audio-6e5bd5f8-ede9-4675-814b-242457dfa9d7',1,'mp3','Careful What You Wish For (the doctor said to)','Jack Harris',NULL,193,'Careful What You Wish For (the doctor said to)',39),
(1176,'Campus','/audio-099dc70d-8e3f-4049-ae21-9c85020ba326',1,'mp3','Vampire Weekend','Vampire Weekend',NULL,176,'Campus',36),
(1177,'BUTTERFLY - HARDSTYLE','/audio-4bb8e443-02be-4670-955a-ccb57f8660fb',1,'mp3','BUTTERFLY (HARDSTYLE)','POSEIDON/ZYZZMODE',NULL,83,'BUTTERFLY - HARDSTYLE',17),
(1178,'Brittle Bones Nicky','/audio-0f496c2b-b45d-495d-b5bf-13b9275567a0',1,'mp3','Brittle Bones Nicky','Rare Americans',NULL,202,'Brittle Bones Nicky',41),
(1179,'Breezeblocks','/audio-beb89476-b899-4630-8d28-ed29acd61b87',1,'mp3','An Awesome Wave','alt-J',NULL,227,'Breezeblocks',46),
(1180,'Bread','/audio-068c2580-896c-433a-b729-d11a8ba84edd',1,'mp3','Bread','Anya Nami',NULL,102,'Bread',21),
(1181,'Bones','/audio-9017ea7e-874b-46b9-93b8-c658827555db',1,'mp3','Bones','Sail North',NULL,176,'Bones',36),
(1182,'Bling-Bang-Bang-Born (Mashle) - English Cover','/audio-51297f80-02e6-4e9a-a932-da99398a5fb4',1,'mp3','Bling-Bang-Bang-Born (Mashle) [English Cover]','GameboyJones',NULL,166,'Bling-Bang-Bang-Born (Mashle) - English Cover',34),
(1183,'Blah Blah Blah','/audio-840ce34c-aa34-4d2c-b7e4-30c4e7e17a6e',1,'mp3','Balance','Armin van Buuren',NULL,183,'Blah Blah Blah',37),
(1184,'Bitter Sweet Symphony - Remastered 2016','/audio-d3a071f4-2105-4a7a-8c4a-4d52b0f7ee4c',1,'mp3','Urban Hymns (Super Deluxe / Remastered 2016)','The Verve',NULL,357,'Bitter Sweet Symphony - Remastered 2016',72),
(1185,'Beautiful Things','/audio-48f64d33-e6bb-4da2-8702-7c24a43e7110',1,'mp3','Fireworks & Rollerblades','Benson Boone',NULL,180,'Beautiful Things',36),
(1186,'Basta Boi - Tiktok Remix','/audio-b231589c-82e6-4db2-a9f4-ddbe47b2bb74',1,'mp3','Basta Boi (Tiktok Remix)','Alfons',NULL,153,'Basta Boi - Tiktok Remix',31),
(1187,'Bad Karma','/audio-0a07e83c-94ff-46c8-822f-0056e9d47ad4',1,'mp3','Bad Karma','Axel Thesleff',NULL,415,'Bad Karma',83),
(1188,'AMOUR PLASTIQUE - TECHNO','/audio-f545e91f-6a09-4f5f-87c4-bf6f7ba59242',1,'mp3','AMOUR PLASTIQUE (TECHNO)','BASSTON/STRØBE',NULL,132,'AMOUR PLASTIQUE - TECHNO',27),
(1189,'Amend','/audio-f3d98338-d04a-4d49-8e36-7fbedf114597',1,'mp3','Spoils','j^p^n',NULL,104,'Amend',21),
(1190,'ALICE','/audio-653c8927-1d09-4f61-b6b6-3481acb438c9',1,'mp3','ALICE','PEGGY',NULL,153,'ALICE',31),
(1191,'Accidentally In Love - From \"Shrek 2\" Soundtrack','/audio-5dbb88dd-4f17-4d61-84d8-0ddc13091b3b',1,'mp3','Accidentally In Love (From Shrek 2 S/T)','Counting Crows',NULL,188,'Accidentally In Love - From \"Shrek 2\" Soundtrack',38),
(1192,'Трава у дома','/audio-9df99c62-b1bf-4d0f-af9f-cefdf8931fd0',1,'mp3','Земля в иллюминаторе','Priklyucheniya Elektronikov',NULL,223,'Трава у дома',45),
(1193,'Сам','/audio-582c24d3-9dca-4f62-ae47-c869a0ab6992',1,'mp3','Новый альбом','Noize MC/Raskar',NULL,229,'Сам',46),
(1194,'Полковнику никто не пишет','/audio-02077f33-68d9-4b1d-a05d-457c3c139df1',1,'mp3','Би-2','Би-2',NULL,292,'Полковнику никто не пишет',59),
(1195,'Наши юные смешные голоса','/audio-17276095-7087-4c13-a031-af3528f54ea5',1,'mp3','В темноте','Ногу Свело!',NULL,275,'Наши юные смешные голоса',55),
(1196,'Научиться бы не париться','/audio-127fce6d-0c68-41e9-ae12-6ce00f70511e',1,'mp3','Научиться бы не париться','Gradusy',NULL,208,'Научиться бы не париться',42),
(1197,'Искала','/audio-fe053d7c-1ddd-4190-b394-65c5babbfa68',1,'mp3','Прости меня моя любовь','Zemfira',NULL,214,'Искала',43),
(1198,'You\'re Mine','/audio-67999af6-d478-412a-bbc4-8890d956529a',1,'mp3','You\'re Mine','Mblue',NULL,164,'You\'re Mine',33),
(1199,'The Sweet Escape','/audio-af5c6915-a7c1-4896-8063-644f2d7b871b',1,'mp3','The Sweet Escape','Gwen Stefani/Akon',NULL,246,'The Sweet Escape',50),
(1200,'Test Drive - From How To Train Your Dragon Music From The Motion Picture','/audio-28463d22-30d6-4247-9166-37bc9db600e4',1,'mp3','How To Train Your Dragon (Music From The Motion Picture)','John Powell',NULL,156,'Test Drive - From How To Train Your Dragon Music From The Motion Picture',32),
(1201,'Spark','/audio-b894cb67-de5e-421c-99bc-e942fb80267c',1,'mp3','More Than Just a Dream','Fitz and The Tantrums',NULL,199,'Spark',40),
(1202,'Spaceman','/audio-96320023-7a60-47c9-9c17-ea6123b89e22',1,'mp3','Head Up High','FITZ/Fitz and The Tantrums',NULL,154,'Spaceman',31),
(1203,'Shinzo wo Sasageyo but is it okay if it\'s lofi?','/audio-ee6798e5-e6c6-48c3-a233-846eb42d1261',1,'mp3','Shinzo wo Sasageyo but is it okay if it\'s lofi?','Kijugo',NULL,152,'Shinzo wo Sasageyo but is it okay if it\'s lofi?',31),
(1204,'Shadows','/audio-1fda20d1-a75f-4de0-8ada-d77f16b569ba',1,'mp3','Shadows','Tiësto/Undercatt',NULL,255,'Shadows',51),
(1205,'Runaway','/audio-4af9481e-3d25-47d2-9fcc-9f6d9ae5250a',1,'mp3','x (Deluxe Edition)','Ed Sheeran',NULL,205,'Runaway',41),
(1206,'Rule The World','/audio-a6eac6f5-22eb-43ad-805f-530dc7e8e974',1,'mp3','Out For Blood','Valley Of Wolves',NULL,210,'Rule The World',42),
(1207,'Out Of My Mind','/audio-2a607304-cd5a-484e-874e-5723b20b4046',1,'mp3','Out Of My Mind','Gentrammel',NULL,173,'Out Of My Mind',35),
(1208,'No Comparisons (Intro)','/audio-e9223bf0-a47f-4087-aaca-27244a6f7779',1,'mp3','Deadshot Shawty, Vol. 1','MVNCH',NULL,128,'No Comparisons (Intro)',26),
(1209,'Never Better','/audio-dfc10f96-3ee3-4a9a-80a6-adcd03805866',1,'mp3','LOWLIFE','Fuller',NULL,172,'Never Better',35),
(1210,'Man on The Moon','/audio-b73d8008-f27c-45b8-b84d-bd56d86347ca',1,'mp3','Man on The Moon','Fitz and The Tantrums',NULL,150,'Man on The Moon',30),
(1211,'Love & Pain','/audio-66e090d8-6ddf-4d64-bfa8-1d8af6f2b661',1,'mp3','Love & Pain','Rare Americans',NULL,163,'Love & Pain',33),
(1212,'Lonely','/audio-b779ee6e-4c59-4987-a31e-3f827dbf6563',1,'mp3','The Bastards','Palaye Royale',NULL,186,'Lonely',38),
(1213,'Let\'s Get Loud','/audio-c33c67ea-1631-4601-b5d5-a9663544faa1',1,'mp3','Let\'s Get Loud','Techno Mike',NULL,131,'Let\'s Get Loud',27),
(1214,'In the Shadows','/audio-a34e075b-377d-440e-9b8b-0c589297c82a',1,'mp3','For the Light','Foreign Air',NULL,233,'In the Shadows',47),
(1215,'Im Doing Fine','/audio-b2eb117c-b27f-465d-a1cf-409fe31f7037',1,'mp3','Im Doing Fine','Marino/Promoting Sounds',NULL,99,'Im Doing Fine',20),
(1216,'I Don\'t Wanna Talk (I Just Wanna Dance)','/audio-86a5e2d6-156e-4338-8d54-0482c643661e',1,'mp3','Dreamland (+ Bonus Levels)','Glass Animals',NULL,195,'I Don\'t Wanna Talk (I Just Wanna Dance)',39),
(1217,'HandClap','/audio-7abb914a-49b6-46f8-8a1b-1ff0dab1b5c4',1,'mp3','Fitz and The Tantrums','Fitz and The Tantrums',NULL,193,'HandClap',39),
(1218,'Free Animal','/audio-39bda3a9-77b6-40a5-a317-a6565ab314fb',1,'mp3','For the Light','Foreign Air',NULL,180,'Free Animal',36),
(1219,'Fool','/audio-d276f422-c4de-47c3-a36c-8fa114569368',1,'mp3','Fitz and The Tantrums (Deluxe Edition)','Fitz and The Tantrums',NULL,189,'Fool',38),
(1220,'Dopamine','/audio-d0572f40-cbac-4145-9827-f5ea9cb69314',1,'mp3','HUMAN','Steve Angello/Barns Courtney',NULL,320,'Dopamine',64),
(1221,'Don\'t Matter','/audio-95c0824d-1646-4ff6-9047-e42582b073d1',1,'mp3','Vertigo','Derik Fein',NULL,200,'Don\'t Matter',40),
(1222,'Do I Wanna Know?','/audio-e1d9f58e-a60a-4499-a220-425513f9b3df',1,'mp3','AM','Arctic Monkeys',NULL,272,'Do I Wanna Know?',55),
(1223,'Days Go By','/audio-a797a6b1-9497-4cd2-8c0c-ca19bd023ed1',1,'mp3','Young Dumb','NOISY',NULL,170,'Days Go By',34),
(1224,'Clouds','/audio-d935568a-6a64-4e63-818d-3d3ace7e4857',1,'mp3','Book of the Broken','Autumn Kings',NULL,225,'Clouds',45),
(1225,'CARNIVORE','/audio-c0d1b8a8-c968-4017-b292-4c47722866c9',1,'mp3','CARNIVORE','Cinema for the Blind',NULL,185,'CARNIVORE',37),
(1226,'Bleeding Out','/audio-6a49bf9e-82cf-4c0f-bb22-de76ef832256',1,'mp3','Night Visions','Imagine Dragons',NULL,223,'Bleeding Out',45),
(1227,'Black Friday (pretty like the sun)','/audio-1d02594a-b5a3-4399-8d88-f1cde683a65f',1,'mp3','Black Friday (pretty like the sun)','Lost Frequencies/Tom Odell',NULL,145,'Black Friday (pretty like the sun)',30),
(1228,'Я останусь одна','/audio-441a1004-8ec8-48d0-bb7a-bd080ebf9765',1,'mp3','10 кошек','Екатерина Яшникова',NULL,190,'Я останусь одна',38),
(1229,'Танец злобного гения','/audio-07626cbf-a633-4307-befe-361f01a67be7',1,'mp3','Театръ демона','Korol i Shut',NULL,235,'Танец злобного гения',47),
(1230,'Подземелья и драконы','/audio-15b1ffe9-9213-4cca-9e78-e93f3b2639b1',1,'mp3','Последняя битва','Norma Tale',NULL,143,'Подземелья и драконы',29),
(1231,'Планы','/audio-9a6e8c34-638b-431d-ac09-379c5d433be6',1,'mp3','22:44','Владимир Клявин',NULL,204,'Планы',41),
(1232,'Пачка сигарет','/audio-54f9a6f1-c88e-4eb5-8170-92d56a2a8023',1,'mp3','Звезда по имени Солнце','Kino',NULL,265,'Пачка сигарет',53),
(1233,'Мама, я люблю','/audio-abffc7d2-12b4-4efd-bb17-4e0f6490e08a',1,'mp3','Байки инсайдера','Anacondaz',NULL,225,'Мама, я люблю',45),
(1234,'Кто ты','/audio-96540cf4-dda2-47a0-aa06-eac9254c6c80',1,'mp3','Голая','Gradusy',NULL,205,'Кто ты',41),
(1235,'ЗА ТОБОЙ ЦВЕТЫ','/audio-33b5e0d6-ffc6-497e-9f82-075b80381bf7',1,'mp3','ЗА ТОБОЙ ЦВЕТЫ','JF Voice',NULL,203,'ЗА ТОБОЙ ЦВЕТЫ',41),
(1236,'Where Are U','/audio-7194ae68-f22b-4877-b0a5-5bbcee8c2528',1,'mp3','LOWRIDER Vol. 4, KineMaster Music Collection','LowRider',NULL,72,'Where Are U',15),
(1237,'Ways','/audio-32f9b44a-2820-4c80-b53e-023e50053881',1,'mp3','Heartbreak (for now)','Roman Lewis',NULL,207,'Ways',42),
(1238,'Van Horn','/audio-66795a70-9dde-4b82-a2c1-8560cb76fdc3',1,'mp3','The Original Motion Picture Soundtrack','Saint Motel',NULL,161,'Van Horn',33),
(1239,'Unsinkable','/audio-30b86dca-efc4-4320-953c-436bffb64e2d',1,'mp3','Unsinkable','Sail North',NULL,190,'Unsinkable',38),
(1240,'Touch the Sky','/audio-750736d7-11e1-46ff-8d95-5e12b65a8745',1,'mp3','Crooked Finger','DAVIS',NULL,163,'Touch the Sky',33),
(1241,'Threw It Away','/audio-373dc76c-020b-4b83-8e37-056e9ac54eef',1,'mp3','The End of The F***ing World 2 (Original Songs and Score)','Graham Coxon',NULL,100,'Threw It Away',20),
(1242,'The Wolves','/audio-cf5eb38f-7823-4bfd-a2c8-d52f9c0c6c67',1,'mp3','Wolves','JJ and The Pillars',NULL,235,'The Wolves',48),
(1243,'The Watchers','/audio-0d2e1b62-e358-4a3b-8907-b0bd50bd976d',1,'mp3','The Watchers','Jagwar Twin',NULL,140,'The Watchers',28),
(1244,'The American Dream','/audio-96132920-d342-467d-bf9d-cf14c14fbdac',1,'mp3','Road Through Hell','The Federal Empire',NULL,185,'The American Dream',38),
(1245,'Stranger Things (feat. OneRepublic) - Alan Walker Remix','/audio-051b4d2c-bed6-4c79-8766-a0e7c2c5e707',1,'mp3','Kids in Love (Remixes)','Kygo',NULL,178,'Stranger Things (feat. OneRepublic) - Alan Walker Remix',36),
(1246,'Имя 505','/audio-e88b9fd3-3345-491a-83e1-389487a19151',1,'mp3','drivemusic.me','Время и Стекло [drivemusic.me]',NULL,198,'Имя 505',40),
(1247,'still feel.','/audio-be99c618-dd4d-4945-acb9-05dd88c08f10',1,'mp3','Now, Not Yet','half•alive',NULL,247,'still feel.',50),
(1248,'На Стиле','/audio-3f38a11d-b0ee-412f-a8fb-4ec5d7ddf6a3',1,'mp3','drivemusic.me','Время и Стекло [drivemusic.me]',NULL,225,'На Стиле',45),
(1249,'Мокрые Кроссы','/audio-5138f721-b83c-4de5-a12c-cbae68a418e4',1,'mp3','drivemusic.me','Тима Белорусских [drivemusic.me]',NULL,197,'Мокрые Кроссы',40),
(1250,'Space Ghost Coast To Coast','/audio-e479a292-3aea-4a99-bc85-60eb1484ef66',1,'mp3','Dreamland','Glass Animals',NULL,187,'Space Ghost Coast To Coast',38),
(1251,'Sidewalk','/audio-21079f25-a034-49bf-a2b6-5b8faaf3eaf2',1,'mp3','The Playground','Paper Idol',NULL,201,'Sidewalk',41),
(1252,'Sex, Drugs, Etc.','/audio-2ec96b50-65db-4815-8414-134042a0beb8',1,'mp3','Chit Chat','Beach Weather',NULL,195,'Sex, Drugs, Etc.',39),
(1253,'Scotland','/audio-41b36f21-2eff-49fd-a5a8-da012a154983',1,'mp3','C-Sides','The Lumineers',NULL,228,'Scotland',46),
(1254,'sail away','/audio-f0fd4ec6-01dc-44fe-9ec0-023d767d166d',1,'mp3','if we\'re being honest','lovelytheband',NULL,178,'sail away',36),
(1255,'Old Town Road','/audio-780de108-3cc6-4c71-b5d6-59cfebf1cd3d',1,'mp3','Medieval Style','Magentium',NULL,145,'Old Town Road',29),
(1256,'Now That We\'re Alone','/audio-e591a43a-9467-42c6-b8d8-bad2f4d9c726',1,'mp3','Tunnels','The People\'s Thieves',NULL,288,'Now That We\'re Alone',58),
(1257,'Novocaine','/audio-a555c1b2-9120-4ba6-a6dd-dc3f2cf14895',1,'mp3','Panther Island','The Unlikely Candidates',NULL,243,'Novocaine',49),
(1258,'Maps','/audio-92e57ba8-5c60-4306-b51c-41ebb99f3705',1,'mp3','V','Maroon 5',NULL,189,'Maps',38),
(1259,'lightning','/audio-b474d9ab-b782-4194-9d50-00a496a63e9a',1,'mp3','lightning','mehro',NULL,188,'lightning',38),
(1260,'Lemon Tree','/audio-7ef6422f-9735-4762-a0e3-1ef30453ef27',1,'mp3','Dish of the Day','Fools Garden',NULL,191,'Lemon Tree',39),
(1261,'Larger Than Life (feat. Benji Jackson)','/audio-0ad8629d-6ad6-44b1-9d94-b97865b077ef',1,'mp3','Larger Than Life (feat. Benji Jackson)','Pinkzebra',NULL,209,'Larger Than Life (feat. Benji Jackson)',42),
(1262,'It\'s Alright','/audio-092bc86e-1819-4c03-9557-2a19cc48d04a',1,'mp3','Dance And Cry','Mother Mother',NULL,175,'It\'s Alright',35),
(1263,'Human','/audio-a0976eaa-d43c-4087-ae75-97815940a40b',1,'mp3','Human (Deluxe)','Rag\'n\'Bone Man',NULL,200,'Human',40),
(1264,'Howlin’ At The Moon','/audio-741da9ae-2adc-421e-9e1b-d29adf6802b6',1,'mp3','Be Kind. Rewind.','The Royal Foundry',NULL,205,'Howlin’ At The Moon',41),
(1265,'hideaway','/audio-3012ec92-9cff-4d1e-8ae7-1088ded028eb',1,'mp3','hideaway','Marino',NULL,124,'hideaway',25),
(1266,'HEY CHILD','/audio-5c79259f-cc07-4be3-b1bd-c3f6d7f87263',1,'mp3','ORION','X Ambassadors',NULL,207,'HEY CHILD',42),
(1267,'Happy Pills','/audio-36b2fe0b-eed6-4005-9e92-a2fc848c9c2a',1,'mp3','Happy Pills','Weathers',NULL,203,'Happy Pills',41),
(1268,'good girls','/audio-9ad4135f-2db6-40c3-a3bb-e3106c694ce3',1,'mp3','good girls','Josie Edwards',NULL,149,'good girls',30),
(1269,'GO STUPID GO CRAZY','/audio-b3313df3-f39c-4c9c-93fd-875017d54e19',1,'mp3','GO STUPID GO CRAZY','Adam Oh',NULL,115,'GO STUPID GO CRAZY',24),
(1270,'Disaster Party','/audio-44d72eb6-99b4-423f-8d9d-9a61b7200c85',1,'mp3','Disaster Party','MAGIC GIANT',NULL,181,'Disaster Party',37),
(1271,'Clouds','/audio-ea04a30b-2b9e-4e27-a222-a902532364d0',1,'mp3','Clouds','Paper Idol',NULL,184,'Clouds',37),
(1272,'Cigarette','/audio-6283f7d0-7564-4708-ba64-3e10617a3514',1,'mp3','Eulogize','Shaya Zamora',NULL,217,'Cigarette',44),
(1273,'Bells','/audio-6054541f-0ad0-4b11-956a-9127127583e2',1,'mp3','Bells','The Unlikely Candidates',NULL,190,'Bells',38),
(1274,'Back In School','/audio-fe58c03d-5dc2-4a14-a1d8-3ea6499188e2',1,'mp3','No Culture (Deluxe)','Mother Mother',NULL,193,'Back In School',39),
(1275,'Angry Birds Theme','/audio-8350432c-a165-4318-8a43-b4b1d7271df5',1,'mp3','For the King (Medieval Jester\'s Collection)','Middle Ages',NULL,61,'Angry Birds Theme',13),
(1276,'Aladeen Madafaka - Original','/audio-7ec1363a-796f-4c19-8d6a-ad222e491727',1,'mp3','Aladeen Madafaka (Original)','Jesse Brown 89',NULL,166,'Aladeen Madafaka - Original',34),
(1277,'&Run','/audio-d15b2b50-c948-4215-aa9d-8f31f211dba4',1,'mp3','Don\'t You Worry, Honey','Sir Sly',NULL,226,'&Run',46),
(1278,'Spill My Words','/audio-a9f62877-4ca9-447e-97a2-84a15977af98',1,'mp3','Falling Rising','Crying Day Care Choir',NULL,160,'Spill My Words',32),
(1279,'b7d24cfb-27d4-4e6d-b538-6682e2ea318f','/audio-b57dfabc-6c7f-4190-8729-9ce4336e4493',1,'mp3','','',NULL,255,'upload_12557988809856407477.mp3',51),
(1280,'Something Good','/audio-a9737a24-4a25-4949-8a8f-c103917e6905',1,'mp3','An Awesome Wave','alt-J',NULL,217,'Something Good',44),
(1281,'Arrested Youth - Sob Story (Official Audio)','/audio-b8783f3e-bd4b-4efd-8daa-7ec4c3f306e4',1,'mp3','Arrested Youth - Sob Story (Official Audio)','Arrested Youth',NULL,194,'Arrested Youth - Sob Story (Official Audio)',39),
(1282,'Clash Royale (Trap Remix)','/audio-e8ae9d7e-af14-4400-b16a-027b4965b7af',1,'mp3','Clash Royale (Trap Remix)','SMUBeats',NULL,116,'Clash Royale (Trap Remix)',24),
(1283,'03490d90-633d-4ca8-b6f0-7cab16b2ebfd','/audio-be919308-e3ad-4776-aa14-a5798200e2c4',1,'mp3','','',NULL,165,'upload_13731662275046006182.mp3',34),
(1284,'All Star','/audio-558ee1fd-b4b2-4257-a776-58d7f5f7ecc6',1,'mp3','Shrek','Smash Mouth',NULL,200,'All Star',40),
(1285,'0b820d09-b52c-4414-97cc-d0a4ed21d303','/audio-666211f2-36fa-4e40-8050-b4c3ab003e66',1,'mp3','','',NULL,91,'upload_18138190627857450721.mp3',19),
(1286,'0d932e53-ab03-4542-9b49-ede8bbd96a42','/audio-2e10790d-c5d2-4462-815e-f46b41f3c48e',1,'mp3','','',NULL,303,'upload_9636516679868073518.mp3',61),
(1287,'SAD','/audio-bbb456ce-e02a-4129-a774-5c1e920646c8',1,'mp3','m','Young Rising Sons',NULL,152,'SAD',31),
(1288,'Run','/audio-f74e642f-07e4-4647-9342-a818a346ccff',1,'mp3','Run','Superior Motive',NULL,174,'Run',35),
(1289,'lost in sound','/audio-6579a051-0474-4f14-a550-44be9486791c',1,'mp3','m','roy knox',NULL,157,'lost in sound',32),
(1290,'9dd56286-9727-42d7-a319-98c22a5e50a5','/audio-939b61b0-f616-4574-960c-72699484cb39',1,'mp3','','',NULL,159,'upload_13449319090016341915.mp3',32),
(1291,'ok','/audio-359afa8b-71e6-435f-93dc-689abc52d25a',1,'mp3','m','robin shulz',NULL,189,'ok',38),
(1292,'a6600650-f0ab-4fb5-b00d-1d90ade16cef','/audio-d42f67d0-6265-4965-899d-449fd3c8afd0',1,'mp3','','',NULL,196,'upload_8297949406661259756.mp3',40),
(1293,'b0504e62-3c41-4166-a285-baa72c33f0a1','/audio-b36fceff-9336-456a-bd55-75a052de1fb8',1,'mp3','','',NULL,242,'upload_1969697784773584129.mp3',49),
(1294,'Self [mp3uk.net]','/audio-2ffd4e3e-7a02-4990-9256-91859418fa52',1,'mp3','mp3uk.net','Ринат Абушаев',NULL,93,'Self [mp3uk.net]',19),
(1295,'Le Monde [muzma.net]','/audio-b42fa01d-7996-4dc1-a0a3-ba8f4f52a2c4',1,'mp3','muzma.net','Richard Carter',NULL,134,'Le Monde [muzma.net]',27),
(1296,'d9c7d481-e47d-45a4-93b8-161c7b64a924','/audio-49a5deb3-01fe-47cc-aa0e-3abdee45167c',1,'mp3','','',NULL,60,'upload_8830015409593808432.mp3',12),
(1297,'Snow (Hey Oh)','/audio-951f3860-eebb-4683-96c0-84b0eafa2e78',1,'mp3','Stadium Arcadium (Cd 1)','Red Hot Chili Peppers',NULL,334,'Snow (Hey Oh)',67),
(1298,'38b09d8c-f109-4fa0-a978-a9b7737f03d3','/audio-717c7770-a5f5-4d69-9bd4-22d88ae628ff',1,'mp3','','',NULL,51,'upload_11005637312946442378.mp3',11),
(1299,'Sonne [mp3uk.net]','/audio-ed4fb095-c3ca-45af-9afd-a5bf684f757d',1,'mp3','mp3uk.net','Rammstein',NULL,252,'Sonne [mp3uk.net]',51),
(1300,'Raging on a Sunday','/audio-b0fd0949-2de0-439d-a6f9-45697f619ec6',1,'mp3','206: Act II','Bohnes',NULL,208,'Raging on a Sunday',42),
(1301,'Suzume [mp3uk.net]','/audio-6ddc81bc-d8df-4c3c-9ecf-7d9e0306e471',1,'mp3','mp3uk.net','RADWIMPS, toaka',NULL,236,'Suzume [mp3uk.net]',48),
(1302,'e4952874-407d-4ed3-815a-ae6f72555d45','/audio-6e742929-acb6-483d-af18-02b8e1e1a4bf',1,'mp3','','',NULL,129,'upload_1489750935405575049.mp3',26),
(1303,'Havana','/audio-157bd963-2e2b-4e84-a51c-a21b46c1d84a',1,'mp3','','Prezioso feat. Laurell',NULL,160,'Havana',33),
(1304,'Pressure','/audio-f0be1452-233b-4237-86dc-5d189ff11ee7',1,'mp3','The Nylon Curtain','Billy Joel',NULL,280,'Pressure',56),
(1305,'40f7c2d2-0243-42d1-bad7-b09179880234','/audio-4aeea5f3-c997-41e1-8a80-d3f7d1618898',1,'mp3','','',NULL,172,'upload_16774370128394188562.mp3',35),
(1306,'cd4db31f-3dad-439f-a0a3-598925e0933b','/audio-08f4323b-0de7-48b0-b75d-60fe9142aa74',1,'mp3','','',NULL,183,'upload_7387690067959200988.mp3',37),
(1307,'We Miss You','/audio-cdd77acc-2e58-4729-b213-e9c07498246f',1,'mp3','We Miss You','Ponder',NULL,93,'We Miss You',19),
(1308,'Science Boy','/audio-6feb546c-53e9-4748-be33-18053fb70ec8',1,'mp3','The Mark Collection','Ponder',NULL,125,'Science Boy',26),
(1309,'Del Valle e Suco, Deu Mole e Vapo Funk','/audio-8673be3a-f620-4cf3-85da-7cb218ae45bb',1,'mp3','Del Valle e Suco, Deu Mole e Vapo Funk','Pointhits',NULL,81,'Del Valle e Suco, Deu Mole e Vapo Funk',17),
(1310,'b2db4ae1-d106-4c39-a160-739b64b2b773','/audio-67f84d05-6d68-485a-9735-f62aada529d1',1,'mp3',NULL,NULL,NULL,233,'upload_17859385494752708681.mp3',47),
(1311,'Phantoms and Friends','/audio-ae7336c1-6472-4633-b181-c502f1f6b701',1,'mp3','Phantoms & Friends (10th Anniversary Edition)','Old Man Canyon',NULL,231,'Phantoms and Friends',47),
(1312,'Alright gentlemen i want you to repeat after me (TikTok remix) [muzking.net]','/audio-5f354f8f-0cb0-4d1e-bb4d-f5e41673fbd3',1,'mp3','','Песня',NULL,130,'Alright gentlemen i want you to repeat after me (TikTok remix) [muzking.net]',26),
(1313,'Discord','/audio-941bfe08-3619-46dc-a4de-d062010e7382',1,'mp3','m','the living tombstate',NULL,195,'Discord',40),
(1314,'3a5bb925-312f-4d99-867e-369a586ef5d7','/audio-2939acfc-c157-4dca-b653-e7e16ec0361b',1,'mp3','','',NULL,246,'upload_7381301975601195494.mp3',50),
(1315,'Highscore [muzonov.net]','/audio-39089b5a-e209-4863-bb57-badb133faeaa',1,'mp3','','Panda Eyes, Teminite',NULL,259,'Highscore [muzonov.net]',52),
(1316,'Crazy Train','/audio-4721c532-f2df-4e23-ae40-8bbd914222dc',1,'mp3','ВсеСаундтреки.рф','Ozzy Osbourne',NULL,298,'Crazy Train',60),
(1317,'OVERNIGHT X Le Monde','/audio-6d1f615f-2ae9-4ee1-8747-f18aa15301ed',1,'mp3','OVERNIGHT X Le Monde','void angel',NULL,132,'OVERNIGHT X Le Monde',27),
(1318,'Orange County (feat. Bizarrap, Kara Jackson and Anoushka Shankar) - BZRP Radio Mix','/audio-31f8ab01-8975-46b2-8d9e-60927b899ee6',1,'mp3','The Hardest Thing (feat. Tony Allen) / Orange County (feat. Bizarrap, Kara Jackson and Anoushka Shankar)','Gorillaz, Bizarrap, Kara Jackson, Anoushka Shankar',NULL,193,'Orange County (feat. Bizarrap, Kara Jackson and Anoushka Shankar) - BZRP Radio Mix',39),
(1319,'I Ain\'t Worried','/audio-07ba482a-3b70-41fc-869b-3b8c52bf615d',1,'mp3','mp3uk.net','OneRepublic',NULL,149,'I Ain\'t Worried',30),
(1320,'f2d0dcc3-a9c3-49ac-a864-38c5f25d83ca','/audio-147edf71-09d2-4a24-8424-678ca765e3ba',1,'mp3','','',NULL,214,'upload_10379480707482790430.mp3',43),
(1321,'0a4fec85-15d1-4d20-8145-491ff9d93a8b','/audio-80eae173-e707-4d56-ac72-254b25767fe2',1,'mp3','','',NULL,202,'upload_10459508680020326807.mp3',41),
(1322,'All Good Things (Come to an End) [mp3uk.net]','/audio-88e0629d-a7d3-4deb-93f5-dbe37269e665',1,'mp3','mp3uk.net','NRD1',NULL,207,'All Good Things (Come to an End) [mp3uk.net]',42),
(1323,'7fd0558c-e3f2-4603-b389-e1aac71bfdc6','/audio-1b57ddb3-0ea3-402e-97f9-5710c6ecb2da',1,'mp3',NULL,NULL,NULL,200,'upload_7458100113072444801.mp3',40),
(1324,'80742f30-9ad1-4e57-9600-efd7b3902be5','/audio-7b364993-d1b0-4c8c-9572-4e65dc0ad9f4',1,'mp3','','',NULL,26,'upload_12203154602117671231.mp3',6),
(1325,'f150f807-0470-42d2-b157-9e4762ad0e38','/audio-d55fa8dd-7100-46a4-bd0e-931d0ca2a9f0',1,'mp3',NULL,NULL,NULL,2,'upload_6119088287313170074.mp3',1),
(1326,'The Code (Switzerland Eurovision 2024) [mp3uk.net]','/audio-33eae3e6-60d2-46e5-92c7-09ea4c461277',1,'mp3','mp3uk.net','Nemo',NULL,206,'The Code (Switzerland Eurovision 2024) [mp3uk.net]',42),
(1327,'f5f99699-3915-43a2-9e9a-ed32e7ce20ed','/audio-3fa93efa-dfcb-44ec-9f45-dd47172302e5',1,'mp3','','',NULL,240,'upload_9310045563775780970.mp3',48),
(1328,'NEFFEX - Statement 🚨[Copyright Free] [muzos.net]','/audio-51ebf279-b51e-4781-8570-f8db1bf6fc34',1,'mp3','','NEFFEX',NULL,187,'NEFFEX - Statement 🚨[Copyright Free] [muzos.net]',38),
(1329,'Some Say','/audio-71b22593-848c-4258-b14b-4dd5a1123eec',1,'mp3','','Nea',NULL,175,'Some Say',36),
(1330,'16ac7ba8-3c1c-47b8-b4c2-91b6e46160b4','/audio-b8e21783-4736-4369-bd11-d99302df9d1b',1,'mp3','','',NULL,150,'upload_12067986703517947076.mp3',30),
(1331,'Astronomi (Coffin Dance)','/audio-f4e12c20-349f-423e-a4d2-ca48393464ca',1,'mp3','','Tony Igy',NULL,155,'Astronomi (Coffin Dance)',31),
(1332,'Stolen Dance (Fear of Dawn Edit)','/audio-50b5f69b-7f97-451a-945f-1cf158095e87',1,'mp3','mp3pulse.ru','Milky Chance',NULL,273,'Stolen Dance (Fear of Dawn Edit)',55),
(1333,'Wait Another Day','/audio-49fd845d-a15e-4136-82e4-d7ce002e4af6',1,'mp3','z1.fm','Mike Williams x Mesto',NULL,179,'Wait Another Day',36),
(1334,'This Is The Life [mp3uk.net]','/audio-d657d18b-ae61-41f5-8f1a-2bbcd4f30e36',1,'mp3','mp3uk.net','Micky',NULL,190,'This Is The Life [mp3uk.net]',39),
(1335,'Beat It','/audio-5bbb670f-073e-46e0-ab14-999df7030b92',1,'mp3','Michael Jacksons This Is It (The Music That Inspired the Movie)','Michael Jackson',NULL,258,'Beat It',52),
(1336,'They Don\'t Care About Us','/audio-c285700b-88c7-4b6e-94a3-ea8430c170ce',1,'mp3','Michael Jacksons This Is It (The Music That Inspired the Movie)','Michael Jackson',NULL,286,'They Don\'t Care About Us',58),
(1337,'f2a440ba-e4a9-4993-b38c-dc020f3aff08','/audio-a0cb6237-1c54-455e-a528-f7c5c77f4afb',1,'mp3','','',NULL,333,'upload_5909635565655265739.mp3',67),
(1338,'Trebles','/audio-0bab317b-4903-465e-ab09-f0ad28c40b6e',1,'mp3','Muzlike.net','Mbrother',NULL,206,'Trebles',42),
(1339,'Mazie - Dumb Dumb','/audio-8f287ae1-7a50-421a-8445-7ed4580c0ba5',1,'mp3','muzrecord.com','Mazie  ',NULL,131,'Mazie - Dumb Dumb',27),
(1340,'c38de733-bcb1-437c-8f79-d58927af1b12','/audio-30964348-9ac6-42e1-978f-e6d276a5334b',1,'mp3','It Feels So Good','Matt Sassari, HUGEL',NULL,339,'It Feels So Good',68),
(1341,'ac243d4f-94b9-42b9-a0af-b8f606a0dd89','/audio-515453aa-a369-4ee7-a1f6-b707325724b0',1,'mp3','Panama','Matteo',NULL,200,'Panama',41),
(1342,'Astronaut In The Ocean','/audio-a714006a-0d63-46e5-af0d-e31b15ee1940',1,'mp3','z1.fm','Masked Wolf',NULL,132,'Astronaut In The Ocean',27),
(1343,'Hero','/audio-c74ada92-39fd-4b36-b429-b62f015bb5d2',1,'mp3','December 2022','Martin Garrix feat. JVKE',NULL,160,'Hero',33),
(1344,'girls-like-you','/audio-3eaebcaf-3b55-4278-b5fa-6e74fc03f1a5',1,'mp3','g','b',NULL,237,'girls-like-you',48),
(1345,'30028cfc-12bb-4e3f-84a6-bb6f385519d7','/audio-64000908-7307-4570-bce0-92e822ab00f4',1,'mp3','Hard Work','Marnik, HIMATE, Captain Jack',NULL,134,'Hard Work',27),
(1346,'Музыка из ничего)','/audio-1dfa6858-74e3-46cc-9e1b-dfb9156ad7e8',1,'mp3','','МАРМОК',NULL,154,'Музыка из ничего)',31),
(1347,'The House of the Rising Sun','/audio-c4f8b74c-23ca-4fa3-8c1c-d094abe88436',1,'mp3','Mafia III - Radio Stations','The Animals',NULL,267,'The House of the Rising Sun',54),
(1348,'09b8a48e-f848-4215-927b-0e99ea40b984','/audio-453e9868-f67b-4248-a7f9-20591560435d',1,'mp3','Hung Up (Radio Version)','Madonna',NULL,336,'Hung Up (Radio Version)',68),
(1349,'Can\'t Hold Us ','/audio-a6889d69-70f5-41db-acd8-b0681184813f',1,'mp3','mp3type.net','Macklemore & Ryan Lewis Ft. Ray Dalton',NULL,264,'Can\'t Hold Us ',53),
(1350,'Thrift Shop','/audio-567af4db-9054-46ea-9994-189b77ce5378',1,'mp3','The Heist','Macklemore',NULL,235,'Thrift Shop',47),
(1351,'ce84e5d3-fc51-4d96-bf36-9e12eb0c1ceb','/audio-48e6ff33-779f-4913-bb8c-cc42937886cf',1,'mp3','70\'s Retro Party','Lynyrd Skynyrd',NULL,246,'Free Bird',50),
(1352,'Lumière','/audio-1326cfd1-cd7d-4b72-9056-065d0f20425e',1,'mp3','Clair Obscur: Expedition 33 (Original Soundtrack)','Lorien Testard, Alice Duport-Percier',NULL,222,'Lumière',45),
(1353,'Beautiful Life (Original Mix)','/audio-c11c6de3-8fa5-4dd9-9dc4-f78c518d8b68',1,'mp3','Speeeedy EDM Blog - главный источник электронной музыки вконтакте!\r\nvk.com/speeeedy','Lost Frequencies feat. Sandro Cavazza',NULL,161,'Beautiful Life (Original Mix)',33),
(1354,'The Feeling','/audio-6ff6d471-f2ea-4c40-823f-9439284d0635',1,'mp3','June 2023','Lost Frequencies',NULL,153,'The Feeling',31),
(1355,'Money','/audio-19f0845d-56e8-4102-9328-9a72fb7b2881',1,'mp3','j','LISA (BLACKPINK)',NULL,168,'Money',34),
(1356,'What ive done','/audio-9dd4b021-362e-4a1d-9595-5bfc31523d3e',1,'mp3','Euro Express 717U','Linkin Park',NULL,210,'What ive done',42),
(1357,'1424ef4b-d56c-4ff8-bfc5-d0876c048ebe','/audio-339d9526-6ce5-4278-ae53-b16f3422f0ba',1,'mp3','Jiyuu E No Shingeki','Linked Horizon',NULL,317,'Guren No Yumiya',64),
(1358,'4765ddd1-af89-4593-bc47-60377193e257','/audio-7abc2443-774a-4a32-b458-9f85e252ae38',1,'mp3','Gone In 60 Seconds','Lil Lucky',NULL,110,'Oh No I Hope I Don\'t Fall',23),
(1359,'Sucker For Pain','/audio-82eb788c-cbdb-4c8d-a0c9-79de3817778c',1,'mp3','Sucker For Pain','Lil Wayne',NULL,244,'Sucker For Pain',49),
(1360,'Old Town Road','/audio-f1aae2e3-bc38-4ebb-bf2b-aba877b8db85',1,'mp3','Old Town Road','Lil Nas X',NULL,113,'Old Town Road',23),
(1361,'MONTERO (Call Me By Your Name)','/audio-fa706dc1-fa14-4337-8ffc-079acfd12efd',1,'mp3','MONTERO (Call Me By Your Name)','Lil Nas X',NULL,137,'MONTERO (Call Me By Your Name)',28),
(1362,'Walk','/audio-712a7ace-27f4-499d-b062-fd29f91d3f35',1,'mp3','Walk EP','Kwabs',NULL,214,'Walk',43),
(1363,'Kings','/audio-ea317229-edf5-4088-b8d1-c419e1ac9fbe',1,'mp3','Delirium Sonata','Tribe Society',NULL,217,'Kings',44),
(1364,'e06ad3af-4793-4dfe-941e-aa6a4ff26b8c','/audio-10a00c51-2bfb-4c53-930e-50034f44fe08',1,'mp3','Booom - Summer 2011','Katy Perry',NULL,207,'E.T.',42),
(1365,'All Mine (braev & ghosty Cover) [www.Bisyor.me]','/audio-abfcd38a-44ca-46dc-bbbd-396e8d120f6b',1,'mp3','www.Bisyor.me','Kanye West',NULL,130,'All Mine (braev & ghosty Cover) [www.Bisyor.me]',27),
(1366,'Way Down We Go [mp3uk.net]','/audio-d64353db-3561-4db5-a896-8f3c5e3ac0c2',1,'mp3','mp3uk.net','Kaleo',NULL,219,'Way Down We Go [mp3uk.net]',44),
(1367,'Everyday Normal Guy 2 [mp3uk.net]','/audio-97b050aa-e920-47b9-a45e-2364e1d579c7',1,'mp3','mp3uk.net','Jon Lajoie',NULL,195,'Everyday Normal Guy 2 [mp3uk.net]',40),
(1368,'Love Me Again','/audio-28449105-6d1b-4147-b447-1dd97a4d69e5',1,'mp3','g','John Newman',NULL,215,'Love Me Again',43),
(1369,'Missing Piece','/audio-3459c556-fda9-41ef-9c1f-7fd521e81fbd',1,'mp3','Missing Piece','John Michael Howell',NULL,130,'Missing Piece',27),
(1370,'3eb4d9a2-c6a4-4908-be09-62e9e0e31761','/audio-ae1aa271-c30f-41c6-b920-697f78d682f8',1,'mp3','Devil\'s Lullaby','Jim Yosef/Scarlett',NULL,176,'Devil\'s Lullaby',36),
(1371,'e497071c-2a1a-4e30-9aaa-8e7094b6b6a6','/audio-6b01c246-2b6e-4ca5-bc63-db3ba6d42a2f',1,'mp3','Battlecry (Heart of Courage)','Jim Yosef, Scarlett',NULL,148,'Battlecry (Heart of Courage)',30),
(1372,'1bf34c3e-d736-4433-b0ab-b1b5bff657af','/audio-8591b9c0-6d38-4656-8646-180dd306ef48',1,'mp3','Born Sinner','J. Cole, Amber Coffman, Cults',NULL,296,'She Knows',60),
(1373,'infinity','/audio-9b70a1e7-8397-4a02-a6f1-99ec71ad5953',1,'mp3','','james young',NULL,237,'infinity',48),
(1374,'СОЛНЦЕ МОНАКО','/audio-154e895a-8482-4a1b-a258-2de0f4786be9',1,'mp3','','Люся Чеботина',NULL,160,'СОЛНЦЕ МОНАКО',32),
(1375,'a25e1d20-318d-4ca3-9566-a0d33474489e','/audio-58408432-6ec9-4e0d-8c16-1f359cdbc657',1,'mp3','Minecraft: Game Drop 2 - 2025 (Original Game Soundtrack)','Minecraft/Amos Roddy',NULL,175,'Tears',35),
(1376,'Down For The Ride','/audio-6bb2a28e-1fd7-4480-8b04-614cfedb7574',1,'mp3','Down For The Ride','ItaloBrothers',NULL,160,'Down For The Ride',33),
(1377,'Una Mattina','/audio-7f833371-0d7f-422f-954b-764163b68be4',1,'mp3','Intouchables','Ludovico Einaudi',NULL,402,'Una Mattina',81),
(1378,'233097e6-7ad8-42e7-9c01-600f8369a702','/audio-0cbcb34f-9d53-47a3-b1fa-8751348fc61a',1,'mp3','August','Intelligency',NULL,179,'August',36),
(1379,'Lost Umbrella (Muzor.net)','/audio-b40c3402-1654-4aa1-865d-31d4200c26ac',1,'mp3','Muzor.net','Inabakumori',NULL,202,'Lost Umbrella (Muzor.net)',41),
(1380,'Night dancer [mp3uk.net]','/audio-2b7a6103-02de-4540-8699-4f59f496a476',1,'mp3','mp3uk.net','Imase',NULL,210,'Night dancer [mp3uk.net]',43),
(1381,'7116a971-d7e4-4ffd-b9eb-757fd59ed7bf','/audio-24cd060c-5196-4744-9fec-f31c4e75ffb7',1,'mp3','Natural','Imagine Dragons',NULL,187,'Natural',38),
(1382,'It\'s Ok','/audio-2c62f678-bdcc-499e-aba7-876ff7d980a9',1,'mp3','b','Imagine Dragons',NULL,202,'It\'s Ok',41),
(1383,'My Life','/audio-822133f2-4275-4bc4-b664-bed568c2e17f',1,'mp3','m','Imagine Dragons',NULL,224,'My Life',45),
(1384,'Radioactive','/audio-70c032cb-a7d8-42b0-b95f-4b71ac616a9e',1,'mp3','Continued Silence [EP]','Imagine Dragons',NULL,188,'Radioactive',38),
(1385,'Lonely','/audio-306dee37-d422-4fd1-abff-09376c60a073',1,'mp3','September 2021','Imagine Dragons',NULL,159,'Lonely',32),
(1386,'Enemy (Feat. JID)','/audio-6d8cfc1c-7ba5-4497-9ffe-f144ade1146d',1,'mp3','','Imagine Dragons',NULL,173,'Enemy (Feat. JID)',35),
(1387,'Demons','/audio-e3d42f63-a031-4b56-83f7-9ed3e11b8b4a',1,'mp3','zvukoff.ru','Imagine Dragons',NULL,175,'Demons',36),
(1388,'Bones','/audio-dfadba4b-5c6f-45c7-9121-b4e4530a23d7',1,'mp3','March 2022','Imagine Dragons',NULL,165,'Bones',33),
(1389,'Who We Are','/audio-a4a31a30-a12d-47f1-8b19-944fe2c5cf1b',1,'mp3','хз','Imagine Dragons',NULL,245,'Who We Are',49),
(1390,'Round and Round (mp3store.live)','/audio-5bb54624-a77c-43b2-8f8e-31fbb2caf883',1,'mp3','','Imagine Dragons',NULL,198,'Round and Round (mp3store.live)',40),
(1391,'Roots','/audio-cb809a57-3178-47f9-a0a5-dd3987cfc012',1,'mp3','','Imagine Dragons',NULL,173,'Roots',35),
(1392,'Machine (mp3store.cc)','/audio-4b4b88e5-c72f-4fda-8e8c-b4fb58f8e429',1,'mp3','','Imagine Dragons',NULL,181,'Machine (mp3store.cc)',37),
(1393,'Dream','/audio-db36bca1-8cdd-4f5a-9eab-66c73b5b9d85',1,'mp3','','Imagine Dragons',NULL,258,'Dream',52),
(1394,'Home - TWINSICK Remix','/audio-a42af8c3-bf12-4a68-a122-1f16e8cd8ce7',1,'mp3','Home (TWINSICK Remix)','TWINSICK, Edward Sharpe & The Magnetic Zeros',NULL,158,'Home - TWINSICK Remix',32),
(1395,'Hole In My Pocket','/audio-091aebd9-eb7b-4d58-9e31-3b3275f20c35',1,'mp3','Hole In My Pocket','St. Julien',NULL,180,'Hole In My Pocket',37),
(1396,'e84a02f8-083c-4be9-851c-fd026057405f','/audio-98ed409f-5cc3-4240-bfcc-86b39dd9ddc5',1,'mp3','HIMOTHY','Tmoney',NULL,215,'HIMOTHY Pt. 2',44),
(1397,'Sweet Melancholy','/audio-19d88bd8-6d50-46c1-b59e-dd63be8542db',1,'mp3','Sweet Melancholy','Henry And The Waiter',NULL,178,'Sweet Melancholy',36),
(1398,'Settle Down','/audio-5558cc26-7198-44b6-8188-2b23e00cdbd0',1,'mp3','One Eyed King','Henry And The Waiter',NULL,177,'Settle Down',36),
(1399,'Little Paradise','/audio-ff7ffa3b-eabc-4c27-a291-f05ecaee54f2',1,'mp3','Hidden Spirit','Henry And The Waiter',NULL,175,'Little Paradise',36),
(1400,'Getchy Go','/audio-c9eeb282-4f5e-4fac-b7f1-e60234fe9560',1,'mp3','One Eyed King','Henry And The Waiter',NULL,196,'Getchy Go',40),
(1401,'Heart-Shaped Box','/audio-6ab19eac-ee30-44ea-b2d1-69fe31c3d88a',1,'mp3','In Utero (Deluxe Edition)','Nirvana',NULL,280,'Heart-Shaped Box',56),
(1402,'Hausparty','/audio-c73ff675-9d3e-48c5-8b1e-bd956fbb6212',1,'mp3','Hausparty','RIAN',NULL,150,'Hausparty',31),
(1403,'966d31de-eccf-4ccc-9967-cf681a68747a','/audio-7c6716bf-a072-4669-99a0-048a73658902',1,'mp3','Boulevard of Broken Dreams','Green Day',NULL,262,'Boulevard of Broken Dreams',28),
(1404,'0f4033aa-1568-40c0-b095-a035dc10205c','/audio-5cb55aa2-d297-4eee-ab83-2b4c74f11053',1,'mp3','Голая','Градусы',NULL,219,'Режиссер',44),
(1405,'Gotta Good Feelin\'','/audio-012a13cf-a04b-4d8e-9150-66b7467adbd7',1,'mp3','Gotta Good Feelin\'','Pigeon John',NULL,203,'Gotta Good Feelin\'',41),
(1406,'Gold','/audio-c5995d56-a1d1-45c3-9c18-938d5f712d4e',1,'mp3','Smoke + Mirrors (Deluxe)','Imagine Dragons',NULL,217,'Gold',44),
(1407,'Heat Waves [mp3uk.net]','/audio-f8f6180e-669b-4134-a71b-694e42455f7e',1,'mp3','mp3uk.net','Glass Animals',NULL,238,'Heat Waves [mp3uk.net]',48),
(1408,'Lamour Toujours','/audio-6e41c086-9bbe-4768-be8c-f31f9314ae51',1,'mp3','а','Gigi DAgostino',NULL,422,'Lamour Toujours',85),
(1409,'Get Mine','/audio-929da8ad-98ca-4bd4-be6f-7df97ce5cd1a',1,'mp3','Get Mine','Davis - Topic',NULL,212,'Get Mine',43),
(1410,'Abcdefu (Angrier) [mp3uk.net]','/audio-aca75684-935e-4624-94eb-7399c09bc275',1,'mp3','mp3uk.net','Gayle',NULL,159,'Abcdefu (Angrier) [mp3uk.net]',32),
(1411,'No Money','/audio-b9549c7f-9083-4a45-be4e-c922ac33f2f9',1,'mp3','','Galantis',NULL,189,'No Money',38),
(1412,'Whistle','/audio-1a845959-4ad6-46b8-8a8d-596d194f8b6e',1,'mp3','Wild Ones','Flo Rida',NULL,225,'Whistle',45),
(1413,'Right Round (zvukoff.ru)','/audio-d571e53a-1e18-45d7-bca9-b8882d584be7',1,'mp3','','Flo Rida',NULL,202,'Right Round (zvukoff.ru)',41),
(1414,'GDFR','/audio-3705de06-09b6-4126-892c-7287b6067220',1,'mp3','','Flo Rida',NULL,190,'GDFR',38),
(1415,'Feels Right (I Love It)','/audio-36c21b01-53dc-4a28-946b-c6ff84a4e16a',1,'mp3','February 2024','Flo Rida feat. Brian Kelley',NULL,147,'Feels Right (I Love It)',30),
(1416,'Livin\' for the Weekend','/audio-5ee0a6b0-e3b3-4cea-8859-2ce462ef2a23',1,'mp3','','Fitz and The Tantrums',NULL,175,'Livin\' for the Weekend',36),
(1417,'I Just Wanna Shine','/audio-d1909450-42ef-4a29-bfe3-fe669c07542c',1,'mp3','','Fitz and The Tantrums',NULL,196,'I Just Wanna Shine',40),
(1418,'HandClap','/audio-eb9b4153-59cf-43b9-b11f-d1e44e8f6ccb',1,'mp3','Autumn Music 2016','Fitz and The Tantrums',NULL,193,'HandClap',39),
(1419,'05cb1e70-0b1f-4286-9997-a4b2174e191c','/audio-d0b470fa-61e6-4696-b7a9-3c3fffbcd753',1,'mp3','All the Feels','Fitz and The Tantrums',NULL,175,'Livin\' for the Weekend',36),
(1420,' I Just Wanna Shine','/audio-1337dc6f-a486-4f93-a4e2-15aa16339bd5',1,'mp3','g','v',NULL,181,' I Just Wanna Shine',37),
(1421,'First Person on Earth','/audio-6adebd88-eda5-4d80-9bef-673294223ebc',1,'mp3','See You In The Future','Robert DeLong',NULL,181,'First Person on Earth',37),
(1422,'First Floor','/audio-c8ae3102-4d8c-4369-83c7-ccbe32f2d194',1,'mp3','First Floor','Mathis Akengin',NULL,220,'First Floor',44),
(1423,'Blue (Da Ba Dee)','/audio-69e0323d-b7aa-41a2-892a-b5b8098dbb4c',1,'mp3','','Eiffel 65',NULL,221,'Blue (Da Ba Dee)',34),
(1424,'My Songs Know What You Did In The Dark (Light Em Up)','/audio-8b1df862-f3e4-48aa-a62b-9443f080e377',1,'mp3','','Fall Out Boy',NULL,188,'My Songs Know What You Did In The Dark (Light Em Up)',38),
(1425,'Centuries','/audio-004d2ef2-41cc-4484-a500-7e4b663b3632',1,'mp3','American Beauty/American Psycho','Fall Out Boy',NULL,229,'Centuries',46),
(1426,'f4877ede-cb05-4ba6-9e18-bc2f9568a032','/audio-b13b40e4-f86e-4848-9f02-bfbe332b5a48',1,'mp3','Believers Never Die','Fall Out Boy',NULL,189,'Immortals',38),
(1427,'8d6b52ed-84be-47f8-8195-4803d7bf30ac','/audio-ca2cfa7b-7079-4236-b932-ec6aa791dad9',1,'mp3','Шайлушай','Ernest Merkel',NULL,127,'Шайлушай',26),
(1428,'Эй, кто нибудь дома','/audio-62179348-1a6c-44dc-80b4-b9bede26e80a',1,'mp3','','',NULL,15,'Эй, кто нибудь дома',4),
(1429,'ef46e597-0b13-4fa8-ac2b-e3911c77c5f7','/audio-8882f6e6-f200-4d5e-892c-db280b07bde3',1,'mp3','Without Me','Eminem',NULL,262,'Without Me',53),
(1430,'019ef1b1-35de-4a09-be4e-bb77ac6bd99a','/audio-fff9e96d-2ce8-4390-8534-cc5ad6da31d3',1,'mp3','I Got Summer On My Mind','Elli Eli',NULL,149,'I Got Summer on My Mind',30),
(1431,'Lights (Single Version)','/audio-3cadd0f3-5b2f-44c3-93d4-c4e0cd64757b',1,'mp3','Halcyon','Ellie Goulding',NULL,212,'Lights (Single Version)',43),
(1432,'Burn','/audio-8e2b02e4-345e-491e-a79c-b18ef24e0f65',1,'mp3','Halcyon Days','Ellie Goulding',NULL,231,'Burn',47),
(1433,'Фейерверк [mp3uk.net]','/audio-3bde4d53-31c3-4bc3-b67e-43cec5afbc8c',1,'mp3','mp3uk.net','Электрофорез',NULL,202,'Фейерверк [mp3uk.net]',41),
(1434,'blue-da-ba-dee','/audio-dabec318-cdd3-4221-b781-6fa918566c13',1,'mp3','f','ff',NULL,219,'blue-da-ba-dee',44),
(1435,'Shivers','/audio-344026cb-39f2-4179-9a08-a35b720ab6ae',1,'mp3','e','z',NULL,207,'Shivers',42),
(1436,'Shape of You (lyrics) (Muzlike.net)','/audio-6212aee5-05a4-4592-943c-5038eb5e7f39',1,'mp3','Muzlike.net','Ed Sheeran',NULL,294,'Shape of You (lyrics) (Muzlike.net)',59),
(1437,'Easy Come Easy Go','/audio-d6ea0d4f-ea01-4871-8ece-e161445b086b',1,'mp3','Mercury - Acts 1 & 2','Imagine Dragons',NULL,179,'Easy Come Easy Go',36),
(1438,'Tsunami','/audio-15e45e7f-504b-4a3a-ab96-4256fce31952',1,'mp3','Танцевальный рай 34','DVBBS',NULL,237,'Tsunami',48),
(1439,'689eb869-7ec9-4d5a-b1ac-6d9c8cae218f','/audio-123f298c-8e3d-46b4-9241-b5018723918b',1,'mp3','Dumb Ways To Die (Originally Performed by Emily Lubitz)','Blob',NULL,176,'Dumb Ways To Die (Instrumental)',36),
(1440,'62fadb82-cda7-48f9-9920-a5154fd27424','/audio-6c5e5c8d-6c73-4655-8244-0cbd13b3a4d0',1,'mp3','Barbra Streisand','Duck Sauce',NULL,194,'Barbra Streisand',39),
(1441,'Numb','/audio-93859ac1-b669-4813-9f12-09e6b50a1d2b',1,'mp3','m','DOTAN',NULL,218,'Numb',44),
(1442,'6e962254-8e49-439a-9556-73789b47d59e','/audio-a404f0d9-1506-4ecd-9a92-ae4f0accaec2',1,'mp3','3 Nights','Dominic Fike',NULL,177,'3 Nights',36),
(1443,'97add6d7-1eac-40e5-af0f-9c6da50258b4','/audio-d4eca30b-54b5-41e8-8fad-e7a3968fa2a1',1,'mp3','Se Va a Beber','Lirow, grupo extra',NULL,214,'Se Va a Beber',43),
(1444,'73061b1f-9c4b-40c4-b49e-06aa27320809','/audio-c356b36d-7ba4-4ec6-a9ef-cb0dbf278977',1,'mp3','Infinity','Selairium',NULL,191,'Legendary',39),
(1445,'baa4c993-5d1b-4bd0-8a8f-e6bf83d02a0d','/audio-4d520a77-00ed-4e3e-992f-4f79ab152718',1,'mp3','BACK ON TRACK','Ney',NULL,180,'BACK ON TRACK',37),
(1446,'Six Days','/audio-7e0d5601-5b02-46f6-a1a9-cdfc4499ee9f',1,'mp3','u','dj Shadow',NULL,301,'Six Days',61),
(1447,'be24a4f1-864a-4a06-9aac-1f5a35f43815','/audio-2d49fadd-4692-4086-9953-c77c8cb439fa',1,'mp3','Discord Halloween 2024 Remix...remix','Stennish',NULL,33,'Discord Halloween 2024 Remix...remix',7),
(1448,'c47e9065-5e92-40d0-bd86-b87d4f91e3a6','/audio-6023ec97-dd36-4585-82ea-40f23155c448',1,'mp3','Vacation','Dirty Heads',NULL,149,'Vacation',30),
(1449,'Dennis Lloyd - Nevermind','/audio-0d2b421f-b196-4256-a964-f4ccb4a07c29',1,'mp3','muzrecord.com','Dennis Lloyd  ',NULL,156,'Dennis Lloyd - Nevermind',32),
(1450,'e7798a41-afe0-436a-a245-52e118f1f0f3','/audio-f1f0654a-3825-4c2b-bd12-2dad60c8e2a7',1,'mp3','Confident','Demi Lovato',NULL,205,'Confident',42),
(1451,'X Gon\' Give It to Ya (Radio Edit)','/audio-b449320f-b1f0-43ab-9486-71fe1dddecf0',1,'mp3','Deadpool (Original Motion Picture Soundtrack)','DMX',NULL,217,'X Gon\' Give It to Ya (Radio Edit)',44),
(1452,'cddcfa2c-97e2-49ac-aaf2-cf8f0e9b999a','/audio-1694ad2a-98f8-49cd-a015-830f39374c2f',1,'mp3','MNM Party 2014.2','David Guetta, Sam Martin',NULL,203,'Lovers On The Sun',41),
(1453,'Bad (Original Mix)','/audio-30317f6e-bca3-4a15-9c25-f9f437d6f335',1,'mp3','g','h',NULL,270,'Bad (Original Mix)',54),
(1454,'e99c3d7e-66ca-4bd0-bd5f-78ecbc5f1fbd','/audio-77e8ccff-1a75-453e-90ac-40a4273baf7d',1,'mp3','50 CC','Feestteam',NULL,167,'50CC onopgevoerde uitvoering',34),
(1455,'Pump It Up','/audio-3a41e789-6870-4a57-8576-82ab66a505e6',1,'mp3','b','Danko, Dastic',NULL,161,'Pump It Up',33),
(1456,'83f39527-4a7a-4fa6-a3f2-d87f347fd44e','/audio-1f4eae58-02ea-44de-8f61-f3993f5b6a4e',1,'mp3','Life','N3ctar',NULL,84,'Dancing Ling',17),
(1457,'Record Player','/audio-c5bb0fab-6e51-45c5-b9d8-7276da584a59',1,'mp3','September 2021','Daisy The Great feat. AJR',NULL,149,'Record Player',30),
(1458,'Come 2gether','/audio-a08a702d-ebac-49a8-9832-6afbc0a227cf',1,'mp3','Come 2gether','Ooyy',NULL,206,'Come 2gether',42),
(1459,'Cold Cold Cold','/audio-d92981ac-db5c-41b2-b1d5-1bf338d376b5',1,'mp3','Tell Me I\'m Pretty','Cage The Elephant',NULL,213,'Cold Cold Cold',43),
(1460,'e4e5fbdc-0bf2-4ab3-8fb4-89578229575f','/audio-9f95444a-9e1d-4fe1-8b12-1bad1e35ae1a',1,'mp3',NULL,NULL,NULL,30,'upload_17589336725232567690.mp3',7),
(1461,'7b46818d-785b-4743-a397-e1249240ac7c','/audio-94ff68a8-609d-4181-9601-48944366f474',1,'mp3','I Walk Alone','Nika;Clubhunterz;Bensi',NULL,179,'I Walk Alone',36),
(1462,'Что они там, заснули чтоли','/audio-69bb4949-59bb-4444-821e-15aed0705106',1,'mp3','','',NULL,1,'Что они там, заснули чтоли',1),
(1463,'Hold on','/audio-807596eb-8c4f-461f-8494-b4b1d735b65c',1,'mp3','m','Chord Overstreet',NULL,198,'Hold on',40),
(1464,'3aed982f-3897-4a14-8d60-0ff3c4fd5e5d','/audio-8336a926-83fc-472e-a8f7-1ba574f4eda2',1,'mp3','If You Feel My Love','Blaxy Girls',NULL,20,'If You Feel My Love (Chaow Mix)',4),
(1465,'Cherry Bomb','/audio-3bc23b78-2073-4de1-8ad3-56ff5cbe0882',1,'mp3','The Runaways','The Runaways',NULL,138,'Cherry Bomb',28),
(1466,'Can\'t Pretend','/audio-5f013b68-59dc-4f5e-aea6-19c702e4b6d6',1,'mp3','Long Way Down','Tom Odell',NULL,217,'Can\'t Pretend',44),
(1467,'Can\'t Go to Hell','/audio-74506c35-2970-4c8a-858c-51e06de83dca',1,'mp3','Lunatics and Slaves','Sin Shake Sin',NULL,211,'Can\'t Go to Hell',43),
(1468,'8c12ac37-eebf-4e92-8907-27fa301882a3','/audio-34be05b0-15ec-4bd8-9398-a3aef527235a',1,'mp3','Havana','Camila Cabello, Daddy Yankee',NULL,216,'Havana (Remix)',44),
(1469,'My Way','/audio-53dab5c0-2352-4b8a-b370-cdb291b6e621',1,'mp3','I Love Skiing','Calvin Harris',NULL,219,'My Way',44),
(1470,'I, Giorno Giovanna (JoJo\'s Bizarre Adventure)','/audio-593b56e7-9490-452f-8da4-5c56b7c2ce20',1,'mp3','I, Giorno Giovanna (JoJo\'s Bizarre Adventure)','Calmadò',NULL,129,'I, Giorno Giovanna (JoJo\'s Bizarre Adventure)',26),
(1471,'77c90476-d80f-4ae7-ac37-437fc5d0fba6','/audio-d0325a8b-0874-4b60-bad8-269a4d684b53',1,'mp3','Suzume - Theme Song (Marimba Ringtone)','Anime Ringtones/Anytunz',NULL,7,'Suzume - Theme Song (Marimba Ringtone) (Ringtone)',2),
(1472,'fa424221-9c61-49c5-a3d8-fd290d2385fc','/audio-891fda77-05d8-4129-a17f-2d96a086b770',1,'mp3','Can You Feel My Heart','Bring Me The Horizon',NULL,228,'Can You Feel My Heart',46),
(1473,'Break My Baby','/audio-f336a474-8561-471f-b40b-9f1ffeee8f44',1,'mp3','Surface Sounds','KALEO',NULL,266,'Break My Baby',54),
(1474,'Toxic','/audio-9ba5fd77-4418-4642-b66b-e482371e0840',1,'mp3','k','BoyWithUke',NULL,168,'Toxic',34),
(1475,'f15b0378-7c58-4dee-9d0a-4a9e135acda9','/audio-843dd2f2-2269-4aca-89cc-149da24c3367',1,'mp3','Inside (The Songs)','Bo Burnham',NULL,276,'Welcome to the Internet',56),
(1476,'Song 2 (Sefon.me)','/audio-738b1aaf-6648-4908-b2cc-9f2d9ea5c019',1,'mp3','','Blur',NULL,121,'Song 2 (Sefon.me)',25),
(1477,'64f583c1-fae1-4767-af25-3c13c1f7f60a','/audio-b294cb06-efd9-41ec-9b95-e7ab466d0922',1,'mp3','Tribute','yyzii',NULL,162,'A Scanner Darkly',33),
(1478,'LET\'S GET IT STARTED','/audio-7f7ebe81-909c-4e0c-8dcb-0cfe02d991c8',1,'mp3','','BLACK EYED PEAS',NULL,212,'LET\'S GET IT STARTED',43),
(1479,'Just The Two Of Us (Sefon.me)','/audio-1f4122e6-3d7a-425d-a7b5-16b498be34c2',1,'mp3','','Bill Withers ft. Grover Washington Jr.',NULL,235,'Just The Two Of Us (Sefon.me)',48),
(1480,'Vois sur ton chemin (Techno Mix) [mp3uk.net]','/audio-d7285c9b-d639-47b9-ac02-f1e9e6368a15',1,'mp3','mp3uk.net','BENNETT',NULL,178,'Vois sur ton chemin (Techno Mix) [mp3uk.net]',36),
(1481,'46176298-deb0-46d8-a6d9-c733daffe803','/audio-505556fe-0099-48fb-a0eb-7c80db44a602',1,'mp3','Somebody To Love (LIZOT Remix)','Basstrologe',NULL,124,'Somebody To Love (LIZOT Remix)',25),
(1482,'384d6344-3746-46a5-8eef-2316cc6775a9','/audio-2a434196-3062-47b6-b824-143320c1fb18',1,'mp3','Swagger, Steel & Spurs','Barns Courtney',NULL,195,'Kicks',39),
(1483,'0f0b8ded-11ca-439e-9e72-7df91219f159','/audio-6d7df32c-c7fb-4f8c-84f4-82b72b2d6123',1,'mp3','Fire','Barns Courtney',NULL,197,'Fire',40),
(1484,'6406ae77-443c-40c1-a0ae-63baa52c1fa2','/audio-5bf9d3c0-1aa0-4158-a84a-4bb1162d53b7',1,'mp3','Baianá','Bakermat',NULL,106,'Baianá',22),
(1485,'cf510b59-fd12-420d-8c95-d34078616ef9','/audio-ccf94817-861a-4f54-9ba6-9e4441bc9efc',1,'mp3','Bad Piggies','Luke Pickman',NULL,160,'Bad Piggies',33),
(1486,'More Than You Know','/audio-38209d95-590e-41a7-8f10-709e525123b3',1,'mp3','More Than You Know','Axwell /\\ Ingrosso',NULL,201,'More Than You Know',41),
(1487,'Wake me up (Muzdo.net)','/audio-b3b61aaa-a117-4570-81db-58c3ced8dfb7',1,'mp3','Muzdo.net','Avicii',NULL,244,'Wake me up (Muzdo.net)',49),
(1488,'The Nights','/audio-e623c653-faec-4e81-92bc-dadde8289085',1,'mp3','','Avicii',NULL,176,'The Nights',36),
(1489,'d8ce8731-cbc1-4155-8671-1581059697b7','/audio-a71d7f7d-ca89-4d27-ae7b-9e92899ca4f0',1,'mp3','First Steps','Two Feet',NULL,129,'Go Fuck Yourself',26),
(1490,'e2e30789-ed34-422d-bb53-29b4496aa29c','/audio-5e5227fb-907f-4d33-b11e-c66561255897',1,'mp3','PLAYDEAD -DELUXE EDiTiON-','SiM',NULL,220,'The Rumbling',44),
(1491,'585b3987-3ca6-4401-942f-f856a2c527fa','/audio-57517423-ea16-4aa6-bb43-6ee36495052c',1,'mp3','UNDER THE TREE','SiM',NULL,122,'UNDER THE TREE',25),
(1492,'Rave In The Grave [YAGONA.NET]','/audio-733af504-298e-40ec-bd4c-121acee6119b',1,'mp3','Ягона','AronChupa & Little Sis Nora',NULL,162,'Rave In The Grave [YAGONA.NET]',33),
(1493,'ea4dd888-e6ad-4319-ac7a-55bc9eee1058','/audio-b74555d8-a954-4c3b-a511-3c03c9d5022e',1,'mp3','','',NULL,177,'upload_13104861124675571030.mp3',36),
(1494,'tom_s_diner','/audio-91e9ffa3-16ff-4bf5-9ed2-7a5310944afa',1,'mp3','english','lom',NULL,269,'tom_s_diner',54),
(1495,'Amogus','/audio-9d84df80-6073-46ed-8043-9f8c28a448d9',1,'mp3','Muzv.net','AMONG US',NULL,129,'Amogus',26),
(1496,'6593dbc5-695d-4a8e-973f-d9bad9c147c4','/audio-4fd8a719-b156-4256-9e0e-6fda28be4b72',1,'mp3','Fitzpleasure','alt-J',NULL,218,'Fitzpleasure',44),
(1497,'Bad Ideas','/audio-b32b4aea-cd90-423e-87b2-8fa0fe65bbba',1,'mp3','Bad Ideas','Alle Farben',NULL,282,'Bad Ideas',57),
(1498,'Destination Calabria','/audio-7f22e6f6-e792-4189-b5af-98297fe5ab53',1,'mp3','Destination Calabria 2012 Remixes','Alex Gaudino',NULL,180,'Destination Calabria 2012 Remixes (Josh Feedblack Remix)',37),
(1499,'c36689a5-0b71-4a3e-8ca4-f5a55f0648c6','/audio-67cb6863-c44f-46a4-8c6e-065770bb5ddd',1,'mp3','Cozy Coffee Shop - Piano BGM','Sonny Boy',NULL,145,'The Pianist on a Cup',30),
(1500,'9854ab86-5ad1-4faf-b93d-22c53a8349db','/audio-b85b7b68-8ae7-4436-a1cc-50406f9c3622',1,'mp3','Пушной.ru','Александр Пушной',NULL,87,'Надо радоваться!',18),
(1501,'86302576-0f79-48ff-887d-42c2b44df7f3','/audio-1a9694de-baee-4a3b-9067-1d302299def1',1,'mp3','The Spectre','Alan Walker',NULL,193,'The Spectre',39),
(1502,'024a06c5-86ec-438a-814b-d73b393fab1e','/audio-1695a48b-a73b-4284-8b88-ab93e5fb9e09',1,'mp3','Dance Hits 2017','Alan Walker, David Whistle',NULL,166,'Routine',34),
(1503,'The Spectre (www.muzofan.net)','/audio-7d57cc99-8a4f-461b-bcd9-02386c136895',1,'mp3','Sped up','Alan Walker',NULL,176,'The Spectre (Sped up Remix)',36),
(1504,'7dbf0b57-28de-438e-877b-587ce145f6fa','/audio-4a2708aa-2ffe-4abe-9598-f7f99a3937e6',1,'mp3','Rapunzel- L\'intreccio della torre','Alan Menken',NULL,140,'Kingdom Dance (From \"Tangled\"/Score)',29),
(1505,'67050047-8d25-4794-a612-143df54d01f6','/audio-b1e4f69e-7d8e-4bc7-8a29-de391234ac8e',1,'mp3','Yes I\'m A Mess','AJR',NULL,165,'Yes I\'m A Mess',33),
(1506,'424d05c1-4b92-4782-b7dc-a4631ce39bbf','/audio-75b0aeef-b1b3-42ea-bdf6-40f6c1e7c539',1,'mp3','The Maybe Man','AJR',NULL,215,'Touchy Feely Fool',43),
(1507,'edc0850a-a14a-4224-be1d-4c569806c689','/audio-73a554ac-15b0-43eb-9d66-b053ebded6ad',1,'mp3','The Click','AJR',NULL,227,'The Good Part',46),
(1508,'cc45a003-1977-4a1f-988a-ffb9c2ffa885','/audio-aaac05a5-0af3-4c30-993d-d53daa2432e9',1,'mp3','Bang!','AJR',NULL,170,'Bang!',35),
(1509,'f939e523-ad91-434c-8dbf-742245665f25','/audio-f01612fc-81ab-4912-9204-e76d23e2e90d',1,'mp3','3 O\'Clock Things','AJR',NULL,228,'3 O\'Clock Things',46),
(1510,'Weak','/audio-b5c9882f-429d-4fc1-9328-2a7f34ada228',1,'mp3','Weak','AJR',NULL,194,'Weak',39),
(1511,'Maybe Man','/audio-03353304-8fc6-411e-b926-fb8e9a41900a',1,'mp3','November 2023','AJR',NULL,220,'Maybe Man',44),
(1512,'1f03caab-41a1-4e61-bdc3-514ad57212d8','/audio-b98346c2-2934-4707-a3d3-dbf308b3a92f',1,'mp3','2012 Grammy Nominees','Adele',NULL,228,'Rolling in the Deep',46),
(1513,'780afc92-5fe8-4075-99ff-7786e765fa92','/audio-9bb4f35f-7274-400a-88cb-8290ef1e0457',1,'mp3','The Razors Edge','AC/DC',NULL,292,'Thunderstruck',59),
(1514,'8fe7e6d7-f6c8-4af2-8e44-edd9205ffc58','/audio-fbb2fe2b-8e3f-4a5e-9709-e53d7fb42545',1,'mp3','Paranoid (Remastered)','Black Sabbath',NULL,352,'Iron Man',71),
(1515,'fb5299d2-8b99-480a-8478-403b6aca910d','/audio-17c8d080-31c8-4733-9ddc-ad7661e8a8ac',1,'mp3','Highway to Hell','AC/DC',NULL,208,'Highway to Hell',42),
(1516,'Back in Black','/audio-643caaff-58b1-4c2c-88bb-955099757ae7',1,'mp3','Back In Black','Ac \\ Dc',NULL,258,'Back in Black',52),
(1517,' Whatever It Takes','/audio-cf35ecb1-216b-47a1-ba01-32ed1c3189b5',1,'mp3','Whatever It Takes','Imagine Dragons',NULL,201,'Whatever It Takes',41),
(1518,'Feel It Still','/audio-170d0462-c895-4dbd-b1da-702ab34c2a19',1,'mp3','Feel It Still','Portugal. The Man',NULL,163,'Feel It Still',33),
(1519,'Freaks (Radio Edit) (www.muzonov.net)','/audio-b6cf1348-21c6-4ef6-bfe7-e48e38571d84',1,'mp3','Collide (Original Motion Picture Soundtrack)','Timmy Trumpet, Savage',NULL,168,'Freaks (Radio Edit)',34),
(1520,'Worlds Smallest Violin','/audio-82f25117-1e15-480f-b570-cbaca03e7403',1,'mp3','World\'s Smallest Violin','AJR',NULL,180,'World\'s Smallest Violin',37),
(1521,'4000 Grad','/audio-26875356-5543-4f60-a128-264300530497',1,'mp3','4000 Grad','KAFFKIEZ',NULL,143,'4000 Grad',29),
(1522,'Lonely boy','/audio-31345510-e703-43d2-9fc6-2d8a3a98624f',1,'mp3','Pukkelpop - 30 Years','The Black Keys',NULL,193,'Lonely Boy',39),
(1523,'90','/audio-a5d31e75-c99e-4a41-852a-5bdd3123be9c',1,'mp3','Tropical','POMPEYA',NULL,270,'90',54),
(1524,'http://noisefx.ru','/audio-7bf12169-e4ef-4eb2-bba3-778caf3dc19c',1,'mp3','Аферист','nonnensee',NULL,11,'Конец',3),
(1525,'d9f33681-a202-4439-9819-827e2fafddef','/audio-962dc346-8669-4825-b177-b4ef9ea13fe8',1,'mp3',NULL,NULL,NULL,4,'upload_2965910187669261963.mp3',1),
(1526,'2bd9e955-f5bd-4736-9b24-810abf0d6970','/audio-f0f19e3a-2797-4b89-98cb-79b3421ae595',1,'mp3','Chill Out Moods','Bobby Cole',NULL,192,'Super Chilled Afterparty House Music',39),
(1527,'Take Me To Church','/audio-ca060d97-b01d-48ab-8201-3a1d9862b4c6',1,'mp3','','Hozier',NULL,241,'Take Me To Church',49),
(1528,'Teeth ','/audio-0784069a-d49e-41a2-b569-f4ebdb49caae',1,'mp3','mp3uk.net','5 Seconds Of Summer',NULL,204,'Teeth ',41),
(1529,'235a9a52-0578-4b27-9ed5-d72079a97e95','/audio-482050ab-fa4b-4448-a153-4cda419fc719',1,'mp3','NIGHT PHONK MVP','Martin\'s Muzic MVP, Yung Soul',NULL,142,'DreamSunset',29),
(1530,'Freestyler','/audio-21f1ee9d-cee3-4971-9bd5-ebdde8518038',1,'mp3','','Bomfunk MC',NULL,277,'Freestyler',56),
(1531,'Despacito','/audio-9b190679-aee5-42b0-b06f-3b32a830f0cd',1,'mp3','','Luis Fonsi Daddy Yankee',NULL,228,'Despacito',46),
(1532,'788b52f9-e86e-42f4-b340-d4e9395035c0','/audio-975ac5f0-9446-40bc-9722-20f7de76013a',1,'mp3','Jiyuu E No Shingeki','Linked Horizon',NULL,108,'Guren No Yumiya',22),
(1533,'Shooting Stars (Original)','/audio-963b5dcb-b1bc-4fd6-b604-041c89eee6bd',1,'mp3','Bag Raiders','Bag Raiders',NULL,235,'Shooting Stars',48),
(1534,'05f992d5-d31e-4e26-a528-0f5bfd6a9504','/audio-bc5e7798-9f82-4750-b46d-bdc54c9f3efb',1,'mp3','Flashmob Øm','Range Roger',NULL,192,'Flashmob Øm',39),
(1535,'72d46e05-6c7c-458e-90a2-297f6c59052f','/audio-fdfc20b3-74fe-4a0a-8b94-e8fd7bd882f3',1,'mp3','Гуляй Душа (Gulyai Dusha)','Mikhail Shufutinsky',NULL,43,'September 3rd (3-е сентября)',9),
(1536,'All Star','/audio-cf9d217a-a719-488b-905f-5de08eab7e02',1,'mp3','Shrek','Smash Mouth',NULL,200,'All Star',40),
(1537,'been there before','/audio-4a1325a4-f71e-429e-aaf9-29edac3df275',1,'mp3','been there before','BEN The Real',NULL,161,'been there before',33),
(1538,'Dear God','/audio-6408cf44-96d1-40a4-b81f-7faa13a5ad42',1,'mp3','Dear God','Confetti',NULL,202,'Dear God',41),
(1539,'Can\'t Pretend','/audio-b4735eae-c2b2-438a-b74e-57335afd7438',1,'mp3','Long Way Down','Tom Odell',NULL,222,'Can\'t Pretend',45),
(1540,'e4051911-6ab0-4172-a480-6727efd0aeaf','/audio-2fb5903a-13e8-41b7-ac4b-590d80b7a4ca',1,'mp3','Radioactive','Kodac',NULL,229,'Radioactive',46),
(1541,'ff438a18-871d-4cc8-969d-e493a9ae1e4b','/audio-298cdf0f-44f2-42bc-99af-e9f15dfb2637',1,'mp3','','',NULL,121,'upload_15809500673434368825.mp3',25),
(1542,'Tsundere','/audio-134ee771-e933-4551-a43a-b5cc0f87d1bf',13,'mp3','PINK GUN (feat. Knifess)','FxxFxxLs, Knifess',NULL,315,'PINK GUN (feat. Knifess)',63),
(1543,'8V58D0umuIHyajHzvwhj+gOmr69Xy8Os','/audio-ae3a982f-2563-4059-bc20-7d8033363803',1,'mp3','Nocturne','Wasia Project',NULL,250,'Moon Goddess',50),
(1544,'Because I Got High','/audio-ccf59fdf-7525-4355-92dc-4e9610df6bde',1,'mp3','The Good Times','Afroman',NULL,197,'Because I Got High',40),
(1545,'Louna_Моя оборона (Гражданская Оборона cover) - А. (youtube)','/audio-b85bf408-414e-4319-aaad-155990669a57',1,'mp3','Без меня. Трибьют Егора Летова','Louna',NULL,216,'Моя оборона',44),
(1546,'Intelligency - August  Russian Version - WOW TV (youtube)','/audio-23942334-51df-4ea7-bcfe-f7600f93ef27',1,'mp3','August','Intelligency',NULL,205,'August',41),
(1547,'Promiseland - Bonus Track','/audio-5c7870a3-0778-4cdf-a776-e919852a064f',1,'mp3','No Place In Heaven','MIKA',NULL,179,'Promiseland',36),
(1548,'suffering','/audio-eeeeb3aa-09c8-47a6-9cc7-e1c5a8939f3a',1,'mp3','suffering','Amélie Farren',NULL,167,'suffering',34),
(1549,'Fear & Delight','/audio-a1eea28a-e8ce-4c48-b308-b912bd1af68d',1,'mp3','Puppet Loosely Strung','The Correspondents',NULL,193,'Fear & Delight',39),
(1550,'We\'re Going Up','/audio-d9a18866-e31d-4cdc-800f-86ccfbf0473c',1,'mp3','Alive','Tim McMorris',NULL,188,'We\'re Going Up',38),
(1551,'Worst Enemy','/audio-aa869641-1480-46b1-998f-28309e2191f4',1,'mp3','Worst Enemy','Marino',NULL,109,'Worst Enemy',22),
(1552,'horror story','/audio-8c10f08b-2667-48ba-8b06-6f4e15a8c3fe',1,'mp3','age tape 0','Arden Jones',NULL,123,'horror story',25),
(1553,'White Flower','/audio-36205482-de66-43e5-bb78-c19aad07d30e',1,'mp3','White Flower - EP','Rafferty',NULL,224,'White Flower',45),
(1554,'Freeze Me','/audio-e4d9ed72-56e8-41be-bc3a-723a7e7582ad',1,'mp3','Outrage! Is Now','Death From Above 1979',NULL,198,'Freeze Me',40),
(1555,'Champagne Coast (Intense) - Piano Version','/audio-bc832cc3-0790-4509-b407-59fc41895ba5',1,'mp3','Champagne Coast (Intense) [Piano Version]','Egemen Piano',NULL,133,'Champagne Coast (Intense) - Piano Version',27),
(1556,'Обиды','/audio-5193c0d5-8c27-4717-b4ee-e720084cf71f',1,'mp3','Интим','Дайте танк (!)',NULL,174,'Обиды',35),
(1557,'Впереди','/audio-9491f285-f8a4-44f2-9c6b-9d6cdb98932c',1,'mp3','Интим','Дайте танк (!)',NULL,165,'Впереди',33),
(1558,'Get Up (Rattle) [feat. Far East Movement] - Vocal Edit','/audio-9aed2465-47d8-4e29-ab6d-20480ee93041',1,'mp3','Get Up (Rattle) [feat. Far East Movement]','Bingo Players',NULL,166,'Get Up (Rattle) [feat. Far East Movement] - Vocal Edit',34),
(1559,'We Are Young (feat. Janelle Monáe)','/audio-8f4a334e-29fe-4ee6-93d6-48c07928a8d7',1,'mp3','Some Nights','fun.',NULL,250,'We Are Young (feat. Janelle Monáe)',50),
(1560,'Rain (from The Suicide Squad)','/audio-54d96c6d-b4e3-4b59-b824-0fb1d2dac6f8',1,'mp3','Rain (from The Suicide Squad)','grandson, Jessie Reyez',NULL,236,'Rain (from The Suicide Squad)',48),
(1561,'Dirty','/audio-b671e2eb-ea34-4f67-a8e5-9ed582a60514',1,'mp3','Death Of An Optimist','grandson',NULL,208,'Dirty',42),
(1562,'In Cold Blood','/audio-c56b8032-b5a7-4060-89cf-75b17e8eee71',1,'mp3','RELAXER','alt-J',NULL,206,'In Cold Blood',42),
(1563,'In One Ear','/audio-8712b645-5bf8-4e14-bf96-6cbaa723a4b8',1,'mp3','Cage The Elephant','Cage The Elephant',NULL,241,'In One Ear',49),
(1564,'Dansez','/audio-19ac9291-09cb-47d3-99c0-3fdc70094950',1,'mp3','Outbreak','Fasion',NULL,189,'Dansez',38),
(1565,'Another Run Around the Sun','/audio-557f8e05-c99c-432f-97c4-7e0288f54ade',1,'mp3','Here I Find You','Slumbernaut',NULL,216,'Another Run Around the Sun',44),
(1566,'The Vapor','/audio-f07e647e-3cca-4f2b-b4e6-0d1685680850',1,'mp3','Supernatural','Barns Courtney',NULL,148,'The Vapor',30),
(1567,'Breezeblocks','/audio-77546a22-e906-4e37-9d31-48113a74bb08',1,'mp3','Breezeblocks','Xkaii',NULL,210,'Breezeblocks',43),
(1568,'Hush','/audio-93b4e1e5-ffbc-4973-befe-63027c7fd0e8',1,'mp3','Marrow of the Woods','Samtar, Lyv',NULL,157,'Hush',32),
(1569,'Every Other Freckle','/audio-9c0263bd-ee9c-49e4-a40c-ef522782ea80',1,'mp3','This Is All Yours','alt-J',NULL,216,'Every Other Freckle',44),
(1570,'Дыхание','/audio-f15267dd-9c5d-4498-9a0a-8e87b82b2b84',1,'mp3','Крылья','Nautilus Pompilius',NULL,218,'Дыхание',44),
(1571,'Good Life','/audio-a0f8220f-a757-4406-829c-ec7736da2d3e',1,'mp3','Detonate','Bohnes',NULL,182,'Good Life',37),
(1572,'Every Breath You Take','/audio-bedaa15a-a6e6-445e-821f-e4eaa2140fa3',1,'mp3','Synchronicity (Remastered 2003)','The Police',NULL,253,'Every Breath You Take',51),
(1573,'The Fool','/audio-7ed7c211-0b86-4af1-a162-211fb764a26e',1,'mp3','The Fool','Alexandria',NULL,175,'The Fool',35),
(1574,'Bitterman','/audio-a0960f53-b639-4066-8dbb-01cde227132b',1,'mp3','Bitterman','Tanner Wareham',NULL,250,'Bitterman',50),
(1575,'Creep Back','/audio-9b22156f-77cb-4c12-b170-0705ca987e4e',1,'mp3','Shelby Ave','Max Frost',NULL,182,'Creep Back',37),
(1576,'Tides','/audio-f3abb556-be79-4b17-9e18-1ed2917455ea',1,'mp3','Tides','G Voz',NULL,228,'Tides',46),
(1577,'Halo','/audio-d4ceca45-1283-40da-89ab-3a7392b25eb2',1,'mp3','Halo','Leroy Jönsson',NULL,166,'Halo',34),
(1578,'I’m Hateful, I’m Horrible, I Love You','/audio-dcbc636e-1970-4375-bb62-92e6f809ab51',1,'mp3','I’m Hateful, I’m Horrible, I Love You','Seb Lowe',NULL,194,'I’m Hateful, I’m Horrible, I Love You',39),
(1579,'A Good Song Never Dies','/audio-cf66f787-0142-4534-bf8b-221bf15bc2e1',1,'mp3','The Original Motion Picture Soundtrack','Saint Motel',NULL,201,'A Good Song Never Dies',41),
(1580,'Amerika','/audio-07da5695-a276-4edb-bff8-26d6c4a53270',1,'mp3','Reise, Reise','Rammstein',NULL,226,'Amerika',46),
(1581,'Motion Blur','/audio-5420f3a4-06a6-4008-a288-0950ea58a957',1,'mp3','What You Breathe','Outta Key',NULL,209,'Motion Blur',42),
(1582,'Dream Song','/audio-8a7a4f58-f926-4ef7-87db-30ffda0e11dc',1,'mp3','Dream Song','Finish Ticket',NULL,218,'Dream Song',44),
(1583,'Smells Like Teen Spirit','/audio-2e324d66-050d-43b0-9510-da008baefc18',1,'mp3','Smells Like Teen Spirit','Malia J',NULL,239,'Smells Like Teen Spirit',48),
(1584,'Sonne','/audio-174a7ea3-5112-42a0-9eda-be12307de8e8',1,'mp3','Mutter','Rammstein',NULL,272,'Sonne',55),
(1585,'Spaghetti Western','/audio-458fdcd1-4af3-47f3-b2ae-d5c89f5aa60b',1,'mp3','Spaghetti Western','Maudlin Strangers',NULL,224,'Spaghetti Western',45),
(1586,'Trouble','/audio-4cc9b814-1cce-44f2-a7df-c818b80a9857',1,'mp3','Wasted Words & Bad Decisions','Welshly Arms',NULL,185,'Trouble',37),
(1587,'Beaches In Tennessee','/audio-0f1911e0-a056-40f6-a905-c8e1f205541c',1,'mp3','Beaches In Tennessee','Cage The Elephant',NULL,196,'Beaches In Tennessee',40),
(1588,'Marmok_-_pro_malchishku_(SkySound.cc)','/audio-ee6c1973-1ddd-47bc-9acd-9fb2ff5b2ae8',1,'mp3','','',NULL,67,'upload_10260478440811080635.mp3',14),
(1589,'FRIENDS','/audio-329e1080-810f-44e2-ab3b-18599a0fc8e8',1,'mp3','FRIENDS','Marshmello, Anne-Marie',NULL,202,'FRIENDS',41),
(1590,'Clint Eastwood','/audio-c721d818-74ac-4823-b6d6-7aacef67efa6',1,'mp3','Gorillaz','Gorillaz, Del The Funky Homosapien',NULL,341,'Clint Eastwood',69),
(1591,'Feel Good Inc.','/audio-d54cd7c1-85ae-449c-abd3-6f74c1c4532c',1,'mp3','Demon Days','Gorillaz, De La Soul',NULL,222,'Feel Good Inc.',45),
(1592,'In My Mind','/audio-35cc1c14-87b1-46d3-9ebb-f5aea81f0504',1,'mp3','In My Mind','Dynoro, Gigi D\'Agostino',NULL,186,'In My Mind',38),
(1593,'Sail','/audio-b16c158a-0bb1-4d7c-83dd-541837447787',1,'mp3','Megalithic Symphony','AWOLNATION',NULL,259,'Sail',52),
(1594,'River','/audio-3e30c2eb-b09e-4ba2-b27c-f5c07abfeb30',1,'mp3','Church Of Scars','Bishop Briggs',NULL,214,'River',43),
(1595,'Say You Believe','/audio-0ba71ed9-17a5-49b4-9ee2-dfbe5c724809',1,'mp3','Say You Believe','Midnight Divide',NULL,235,'Say You Believe',47),
(1596,'Getting Along','/audio-96d6b98a-4303-4ee0-8b42-8d894c350777',1,'mp3','Weekend Man','Royal Republic',NULL,137,'Getting Along',28),
(1597,'Скованные одной цепью','/audio-c8ec39d0-e941-4a53-9ebd-a410bb511cc7',1,'mp3','Эта музыка будет вечной. Nautilus Pompilius - 30 лет.','Nautilus Pompilius',NULL,257,'Скованные одной цепью',52),
(1598,'stone cold classic','/audio-b0d81e1a-5d9e-42bc-90fe-174e6ebe4a46',1,'mp3','bad for you','George Barnett',NULL,195,'stone cold classic',40),
(1599,'Lotus','/audio-59a3b9c3-9e42-491c-8050-1f2603bff48f',1,'mp3','Cage The Elephant','Cage The Elephant',NULL,196,'Lotus',40),
(1600,'Trouble','/audio-8d4f103f-d8fa-4d80-a659-40650866a372',1,'mp3','Tell Me I\'m Pretty','Cage The Elephant',NULL,233,'Trouble',47),
(1601,'Come A Little Closer','/audio-1d38eafe-e954-443a-9b86-fe5ab137ac3f',1,'mp3','Melophobia','Cage The Elephant',NULL,229,'Come A Little Closer',46),
(1602,'Ain\'t No Rest For The Wicked - Original Version','/audio-24ce5591-55c0-4fcc-9961-4b4e0a6e1330',1,'mp3','Cage The Elephant','Cage The Elephant',NULL,175,'Ain\'t No Rest For The Wicked - Original Version',36),
(1603,'Call Me','/audio-074dd941-7d82-4101-ae2c-e1692a5b69e7',1,'mp3','Atomic/Atomix','Blondie',NULL,427,'Call Me',86),
(1604,'Summer Sun','/audio-e11c811f-479b-4101-aafa-a7d80569ff1d',1,'mp3','Anaana','Cari Cari',NULL,204,'Summer Sun',41),
(1605,'Hunters','/audio-de55ebac-866f-4388-b2dc-bbdee9f3f69b',1,'mp3','Our Walls','Helmut',NULL,327,'Hunters',66),
(1606,'We Bad, We Know','/audio-c4db4be9-ddbd-4415-ad29-6ed9c3894cb2',1,'mp3','We Bad, We Know','ZOI, Byfox',NULL,150,'We Bad, We Know',30),
(1607,'dream.wav','/audio-c682add7-934e-4221-be05-6c98780a684a',1,'mp3','dream.wav','Ethan Gander',NULL,169,'dream.wav',34),
(1608,'Дорадура (Sefon.Pro)','/audio-c07b8129-83c4-4cb1-a262-a4fb28c431c7',11,'mp3','','Дора',NULL,134,'Дорадура (Sefon.Pro)',27),
(1609,'Я Русский (Sefon.Pro)','/audio-278c0f34-48ac-49e2-bf79-f9de693b2a09',11,'mp3','','Shaman',NULL,210,'Я Русский (Sefon.Pro)',42),
(1610,'I Kissed A Girl (Sefon.me)','/audio-a605b62f-fd69-4e7e-8ecf-f1487a61ead6',11,'mp3','','Katy Perry',NULL,180,'I Kissed A Girl (Sefon.me)',36),
(1611,'Виктор Цой (группа Кино) - Спокойная ночь','/audio-5d85b19b-84a3-435a-9d57-bc9a1951dd24',11,'mp3','','',NULL,364,'upload_693415962931718478.mp3',73),
(1612,'AiRushV - И солнце взойдет - AiRushV (populars-music.ru)','/audio-0791819c-4905-45c5-8f57-93f29057c486',11,'mp3',NULL,NULL,NULL,182,'upload_13003678781222895644.mp3',37),
(1613,'The Story Ain\'t Over (Sefon.Pro)','/audio-5af51c58-5f0a-4a10-8088-e854a61b2280',11,'mp3','','Avantasia',NULL,285,'The Story Ain\'t Over (Sefon.Pro)',57),
(1614,'The Less I Know The Better (Sefon.me)','/audio-ecbd4864-64d0-4f4f-91b3-97b965867eb0',11,'mp3','','Tame Impala',NULL,218,'The Less I Know The Better (Sefon.me)',44),
(1615,'Я Бью Женщин и Детей (Sefon.Pro)','/audio-67b7a5b7-2fa5-4b60-99b0-33463df3578a',11,'mp3','','Валентин Стрыкало',NULL,163,'Я Бью Женщин и Детей (Sefon.Pro)',33),
(1616,'ЁК (Sefon.Pro)','/audio-fe7ead1c-8bb8-4f26-a0c6-ec1af6820a62',11,'mp3','','Дора',NULL,159,'ЁК (Sefon.Pro)',32),
(1617,'Because I Got High','/audio-9cee45b9-4f3b-4796-8cc3-e6bcbbeefd16',1,'mp3','The Good Times','Afroman',NULL,197,'Because I Got High',40),
(1618,'Malcolm_Todd_-_Earrings_(mp3.pm)','/audio-cfde021a-bd48-4450-9f51-43b9aa67a13c',1,'mp3','Sweet Boy','Malcolm Todd',NULL,151,'Earrings',31);
/*!40000 ALTER TABLE `audio_file` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `chat`
--

DROP TABLE IF EXISTS `chat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chat_type` enum('GROUP','PRIVATE_CHAT') DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `open_id` varchar(20) NOT NULL,
  `status` enum('ACTIVE','ARCHIVED','TEMPORARY') DEFAULT NULL,
  `target_id` bigint(20) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK406pe2u71aql6g6k0g2hnhjnq` (`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `chat` WRITE;
/*!40000 ALTER TABLE `chat` DISABLE KEYS */;
INSERT INTO `chat` VALUES
(1,'PRIVATE_CHAT',NULL,'101010jj102222222222','ACTIVE',NULL,NULL);
/*!40000 ALTER TABLE `chat` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `chat_participants`
--

DROP TABLE IF EXISTS `chat_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `chat_participants` (
  `chat_terms_accepted` bit(1) NOT NULL,
  `chat_id` bigint(20) NOT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`chat_id`,`user_id`),
  KEY `FKbhdyxo0ndtbs1t49l28y21rkw` (`user_id`),
  CONSTRAINT `FK44t5cpu2fejyqk36kb8pico4u` FOREIGN KEY (`chat_id`) REFERENCES `chat` (`id`),
  CONSTRAINT `FKbhdyxo0ndtbs1t49l28y21rkw` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chat_participants`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `chat_participants` WRITE;
/*!40000 ALTER TABLE `chat_participants` DISABLE KEYS */;
INSERT INTO `chat_participants` VALUES
(0x01,1,1),
(0x01,1,5);
/*!40000 ALTER TABLE `chat_participants` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `listening_room`
--

DROP TABLE IF EXISTS `listening_room`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `listening_room` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  `playback_mode` enum('NORMAL','REPEAT_ALL','REPEAT_ONE','SHUFFLE') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `code` varchar(6) DEFAULT NULL,
  `playlist_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK1oblgxkfy6ytmbew5c7mb671p` (`code`),
  KEY `FKg0qgnkrl82gcaymwuuvf6ygbp` (`owner_id`),
  KEY `FKo3926lt0pe9w1a7gu73vqyrfp` (`playlist_id`),
  CONSTRAINT `FKg0qgnkrl82gcaymwuuvf6ygbp` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKo3926lt0pe9w1a7gu73vqyrfp` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `listening_room`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `listening_room` WRITE;
/*!40000 ALTER TABLE `listening_room` DISABLE KEYS */;
INSERT INTO `listening_room` VALUES
(16,'2026-10-14 20:57:43.040561',1,NULL,'kirya\'s room','38I4PB',10);
/*!40000 ALTER TABLE `listening_room` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `message`
--

DROP TABLE IF EXISTS `message`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `message` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `chat_open_id` varchar(255) DEFAULT NULL,
  `content` text DEFAULT NULL,
  `open_id` varchar(20) NOT NULL,
  `is_read` bit(1) DEFAULT NULL,
  `sender_open_id` varchar(255) DEFAULT NULL,
  `timestamp` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8h7efx27ppruywine146ncpgp` (`open_id`)
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `message` WRITE;
/*!40000 ALTER TABLE `message` DISABLE KEYS */;
INSERT INTO `message` VALUES
(1,'101010jj102222222222','нууу','LoSWnk6G2NOgrMJrKvec',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 12:43:41.545998'),
(2,'101010jj102222222222','с компа нормик','f7jhzwyYHZSXuvsJd7yW',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 12:43:45.031559'),
(3,'101010jj102222222222','а с телефона совершенно не юзабельно','rj8CwDDtAojUeTwplk74',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 12:43:59.245831'),
(4,'101010jj102222222222','Привет','z11PEdrXm2AhQOUPIVP9',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:08:08.165579'),
(5,'101010jj102222222222','Киряяяя','fWIUGmnF1vTpiim4Axc7',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:08:11.973424'),
(6,'101010jj102222222222','Ку','3aKAMNvlG2uJfbjwWpan',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:08:32.221092'),
(7,'101010jj102222222222','Кууу','riKFKRd73W0lOUHTZBxz',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:08:34.557222'),
(8,'101010jj102222222222','reee','B6ETkkxpxzPSP9LXbhN9',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:24:53.620310'),
(9,'101010jj102222222222','ку','VCNy9h4I1BGb6gUVzskk',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:24:54.939951'),
(10,'101010jj102222222222','ку','Nk45E4RKOo9WHxmmdp10',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:24:57.262502'),
(11,'101010jj102222222222','ку','vaPEgtRtt4Qt9GX64WWp',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:24:58.329261'),
(12,'101010jj102222222222','ку','HiWFoOXwVYIq69zTyoO9',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:24:59.418508'),
(13,'101010jj102222222222','хихихих','YCvg6UJPByppJZY9n4rB',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:25:00.266343'),
(14,'101010jj102222222222','ку','fRMtRf5lmfGWiWV5fdvU',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:01.293870'),
(15,'101010jj102222222222','хихиххи','HKRBFN5WI5fftM4FTYIO',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:03.278228'),
(16,'101010jj102222222222','аыав','yBmekVRxhKfQuri1XNkb',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:09.170079'),
(17,'101010jj102222222222','аывавы','M0FBK68WUwXxoUtl9vW2',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:10.051971'),
(18,'101010jj102222222222','ыв','Kj8LNK9Dp4XCWY96JYvp',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:10.342398'),
(19,'101010jj102222222222','авы','EZ9obzuyjc9gTOqvkiwk',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:10.522081'),
(20,'101010jj102222222222','авы','oBCoOt4OV0mZL54pUk1Z',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:10.918106'),
(21,'101010jj102222222222','аыв','9px5z2Q14e63mxOCnSCm',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:11.690306'),
(22,'101010jj102222222222',':)','GratyKPmeYBgMEobchKB',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:25:16.436043'),
(23,'101010jj102222222222','еееееееее','IovClmNR4coxLsZxMJit',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:25:18.667255'),
(24,'101010jj102222222222','ав','JGI1QadjKQ4WdvFKwB0g',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:25:21.971301'),
(25,'101010jj102222222222','ав','u6luOrUyTNpfKjPABDPv',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:25:22.418007'),
(26,'101010jj102222222222','а','bMupN4r6jMfAclrrORkj',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:25:22.629037'),
(27,'101010jj102222222222','ва','m6mJx2pB60qyFyZbGfun',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 14:25:22.842820'),
(28,'101010jj102222222222','аывавы','oceDSNoQXjh9zsWPhQjv',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:36.042610'),
(29,'101010jj102222222222','аывввваыв','4EfnArFFEjsLz0VAYogT',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:38.290665'),
(30,'101010jj102222222222','выавыаваыв','jsWwj8W2qTfNUEiJfIEY',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:39.612632'),
(31,'101010jj102222222222','выаыва','qkRSWHwfKBQplEWOkCox',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 14:25:40.444669'),
(32,'101010jj102222222222','Ку','2A0FtkCJEnkzf0ON0WnF',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 16:02:13.426279'),
(33,'101010jj102222222222','Урааа','SOHoHHxm6gRJLreN1C4a',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 16:02:19.422119'),
(34,'101010jj102222222222','Ададла','vaCR3yWL4vdMyAJR4eGG',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 16:02:21.555151'),
(35,'101010jj102222222222','Алалал','X46x18EnOB6MQ4MI3ASe',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 16:02:24.960849'),
(36,'101010jj102222222222','Урааа','Nr9N8gIHU78jJWKFjUkU',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 16:02:26.639439'),
(37,'101010jj102222222222','Ороо','KwR7ViJmZaKJpkfmmA6Z',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 16:02:31.359221'),
(38,'101010jj102222222222','Кирилл hot awesome man','7vzKDK07qXBgbzArgBDy',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-03 16:02:49.671439'),
(39,'101010jj102222222222','Fåäff','HsrT7nhKwTKwWjSTnUe2',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 20:34:55.207451'),
(40,'101010jj102222222222','Работает','9DP2BxpyfvV1bw6xE0ES',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 20:34:58.586386'),
(41,'101010jj102222222222','Урааааа','emVboRdYINyayakG3aXM',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 22:13:04.709081'),
(42,'101010jj102222222222','Приложение','mvORcziFvEN4Y7f3ecg3',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-03 22:13:13.837604'),
(43,'101010jj102222222222','Rere','V37rSDLPb0qLCNFvApLi',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-04 00:36:58.118981'),
(44,'101010jj102222222222','ну что ж ты ешки кошки опять до часа ночи сидел ну Кирилл','xRUngaLsOTjUnWf0DQxt',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-04 00:37:29.299226'),
(45,'101010jj102222222222','Оп оп с телефона работает','9790okYeDKGLOmiJjgob',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-04 00:39:54.318137'),
(46,'101010jj102222222222','Или не особо','1rBxBrmOcoHLqokYm1Bm',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-04 00:54:36.432019'),
(47,'101010jj102222222222','Ну так','Sw9YuEYm9FCSDYbmPCnt',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-04 00:54:39.759728'),
(48,'101010jj102222222222','Попеременно','1GpmPow7wuLmu5xNzb8P',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-04 00:54:44.239374'),
(49,'101010jj102222222222','А я забыл чекать','Jma53GWiM90pE0h844nY',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:42:55.975542'),
(50,'101010jj102222222222','Блин, хахахаха','RFU0ZN6pBJIhDx5k6mZc',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:42:59.889062'),
(51,'101010jj102222222222','До часу ночи?','Wy833PdVZ4IjwCgwZ2UM',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:43:22.785139'),
(52,'101010jj102222222222','Не, я тока в 3 уснул наверн','eupOqn6bcg4YCwUGGyvk',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:43:31.375599'),
(53,'101010jj102222222222','Пхаххахпхахах, у меня музыке прекратилась моя, а потом заиграла','xsZGpoKLh1eO7FS9KiET',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:44:34.078161'),
(54,'101010jj102222222222','И вдруг заиграла Living for the weekend','nVvh3kWBcwmkQzAYoUiE',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:44:57.582302'),
(55,'101010jj102222222222','Слушалка работает 😆','vm2d1djPTTKuXpAJY5WD',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:45:29.686210'),
(56,'101010jj102222222222','А ты часто заходишь её глянуть?','gHoDCFgadb3H1yYTtqwR',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:46:02.933582'),
(57,'101010jj102222222222','А вообще кстати вполне стабильно работает','95ZC2JaJefbP8YfDfu3b',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:47:11.216862'),
(58,'101010jj102222222222','У меня, по крайней мере','hLjfB1pe3zYhk00Hxamv',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:47:18.484203'),
(59,'101010jj102222222222','Но у меня тоже трафик через рашу идёт, приложуха на ру сервера настроена','AmtNZqNIg4jYfnYy4Bs2',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:47:57.190009'),
(60,'101010jj102222222222','Надо уведомления, и будет счастье','xTod1V2nyRhtGN2g6x0X',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:48:28.332111'),
(61,'101010jj102222222222','Пхпххпхпх','9fl6jzgsodGILjX4CCSO',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:48:30.551819'),
(62,'101010jj102222222222','И гсок сюда же','xgP5RpoNc2qorqwFdOZH',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:49:35.829900'),
(63,'101010jj102222222222','И непрочитанные сообщения чтоб было можно глянуть','EiblB47hs6S8Bgk5KX14',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:49:53.329079'),
(64,'101010jj102222222222','(вообще с непрочитанными сообщениями у меня всё уже готово давно)','JnQrrRpbAAUqB1jpZfCY',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:50:22.728590'),
(65,'101010jj102222222222','Надо просто кое что дописать, буквально пару строк в компонент кнопочки','RYkQIwOqB5JoCd5kX9ZL',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-05 04:51:50.055776'),
(66,'101010jj102222222222','Ой','Wdny49s9Z1RtpBEg1gga',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 02:17:37.532344'),
(67,'101010jj102222222222','Ну','528IIhw56BEzYOQ5o8LQ',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 02:17:39.719697'),
(68,'101010jj102222222222','Я сюда переодически поглядываю','AHlCq33cXpFoedtctlEH',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 02:17:48.975642'),
(69,'101010jj102222222222','Рил надо уведомления','WQj8I4la7ZT6HkENk72u',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 02:17:54.566788'),
(70,'101010jj102222222222','И гскиии','QauSuSCAhzauq4DkxErv',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 02:18:02.499405'),
(71,'101010jj102222222222','Самое важновое','xOwOn2V5mU8Wf5kFHCMk',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 02:18:06.779313'),
(72,'101010jj102222222222','Ещё дату к сообщениям','PsyYJRZNs36rcAiyKn8E',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 02:18:30.139537'),
(73,'101010jj102222222222','Хочу поныыыть меее','XuTzZLEQaJkqXvWBoyCL',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 03:43:13.260744'),
(74,'101010jj102222222222','Кошк хочт домой, кушать (без чувства вины) и спааать и валяцааа и ни о чём не думать','PHxcUDfj7I2URbFAkQqn',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-06 03:43:56.506004'),
(75,'101010jj102222222222','Угу','fsWdHyCqF3lWtLtYugX5',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-06 07:31:43.182066'),
(76,'101010jj102222222222','Точно','tkb9Lmq79JbdLX8EAjNy',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-06 07:31:46.140906'),
(77,'101010jj102222222222','Хэй, ну это просто тестовые сообщения','TIOXF3iGaJ3pVzRCN8Fs',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-06 21:40:52.066129'),
(78,'101010jj102222222222','Даже лучше стало работать\nИ переносы на новые строчки работают','deTbD1yA8qO7gOc7voXu',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-06 21:41:12.577608'),
(79,'101010jj102222222222','Видны уведы','GNLMmDt7g4diWOABKK7m',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-06 21:41:17.032814'),
(80,'101010jj102222222222','По крайней мере хотя бы в приложении','TH6qE8Zw4pBTdxyzHmFe',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-06 21:41:40.868682'),
(81,'101010jj102222222222','Пипип','T9tawYrPEBjE3aub0k7E',0x01,'U5HGpd70LesZe8A4XBPu','2026-05-08 04:48:25.717145'),
(82,'101010jj102222222222','Пипип','dvjbwbZ5rKh1jEI7NCmz',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-08 14:44:32.477307'),
(83,'101010jj102222222222','Лю тя','HvVFUslP5rGgjMrmsbPO',0x01,'cdlxHFuAuIvsud5xhyMl','2026-05-08 14:44:36.254156'),
(84,'101010jj102222222222','играет?','a8jnQLMKakapU9g0HTnH',0x00,'U5HGpd70LesZe8A4XBPu','2026-06-09 09:51:58.791951');
/*!40000 ALTER TABLE `message` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `permission`
--

DROP TABLE IF EXISTS `permission`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `permission` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `comment` varchar(512) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2ojme20jpga3r4r79tdso17gi` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `permission` WRITE;
/*!40000 ALTER TABLE `permission` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `playlist`
--

DROP TABLE IF EXISTS `playlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `playlist` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `code` varchar(6) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `playback_mode` enum('NORMAL','REPEAT_ALL','REPEAT_ONE','SHUFFLE') DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKdby0nwoh1swqel2iuhmmb13kp` (`code`),
  KEY `FKhyighiwteqdtjkoa5h9k9jfud` (`owner_id`),
  CONSTRAINT `FKhyighiwteqdtjkoa5h9k9jfud` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `playlist`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `playlist` WRITE;
/*!40000 ALTER TABLE `playlist` DISABLE KEYS */;
INSERT INTO `playlist` VALUES
(3,'65CZPF','2026-10-03 10:42:13.773931','NORMAL','Imagine Dragons',1),
(4,'HIQPBL','2026-10-03 10:42:19.924986','NORMAL','Ajr',1),
(5,'ALLC4P','2026-10-03 10:42:32.470165','NORMAL','Favorites',1),
(6,'VMQNDH','2026-10-03 10:42:44.889118','NORMAL','Мемы',1),
(7,'2SJSZX','2026-10-03 11:03:58.871470','NORMAL','Unsorted',1),
(8,'9PLAV4','2026-10-03 11:12:15.631662','NORMAL','Alt-j',1),
(10,'RLL0VE','2026-10-14 20:57:43.031056','NORMAL','kirya\'s room playlist',1);
/*!40000 ALTER TABLE `playlist` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `queue_items`
--

DROP TABLE IF EXISTS `queue_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `queue_items` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `position` bigint(20) NOT NULL,
  `added_by_id` bigint(20) DEFAULT NULL,
  `audio_id` bigint(20) NOT NULL,
  `playlist_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_playlist_position` (`playlist_id`,`position`),
  KEY `FK6alw20o3nfikmqwk1snfcea38` (`added_by_id`),
  KEY `FKnjfyyfwxbckwfefpvd17rf72u` (`audio_id`),
  CONSTRAINT `FK6alw20o3nfikmqwk1snfcea38` FOREIGN KEY (`added_by_id`) REFERENCES `users` (`id`),
  CONSTRAINT `FKdgonb5frjklxv4cbqna81bby` FOREIGN KEY (`playlist_id`) REFERENCES `playlist` (`id`),
  CONSTRAINT `FKnjfyyfwxbckwfefpvd17rf72u` FOREIGN KEY (`audio_id`) REFERENCES `audio_file` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=339 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `queue_items`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `queue_items` WRITE;
/*!40000 ALTER TABLE `queue_items` DISABLE KEYS */;
INSERT INTO `queue_items` VALUES
(120,'2026-10-03 13:47:34.000000',0,1,1226,3),
(121,'2026-10-03 13:47:35.000000',1,1,1382,3),
(122,'2026-10-03 13:47:35.000000',2,1,1383,3),
(123,'2026-10-03 13:47:36.000000',3,1,1384,3),
(124,'2026-10-03 13:47:36.000000',4,1,1385,3),
(125,'2026-10-03 13:47:37.000000',5,1,1386,3),
(126,'2026-10-03 13:47:37.000000',6,1,1387,3),
(127,'2026-10-03 13:47:39.000000',7,1,1388,3),
(128,'2026-10-03 13:47:40.000000',8,1,1390,3),
(129,'2026-10-03 13:47:41.000000',9,1,1391,3),
(130,'2026-10-03 13:47:41.000000',10,1,1392,3),
(131,'2026-10-03 13:47:43.000000',11,1,1393,3),
(132,'2026-10-03 13:47:44.000000',12,1,1406,3),
(133,'2026-10-03 13:47:44.000000',13,1,1437,3),
(134,'2026-10-03 13:47:45.000000',14,1,1517,3),
(150,'2026-10-03 14:01:43.000000',0,1,1457,4),
(151,'2026-10-03 14:01:44.000000',1,1,1505,4),
(152,'2026-10-03 14:01:44.000000',2,1,1506,4),
(153,'2026-10-03 14:01:45.000000',3,1,1507,4),
(154,'2026-10-03 14:01:46.000000',4,1,1508,4),
(155,'2026-10-03 14:01:47.000000',5,1,1509,4),
(156,'2026-10-03 14:02:02.000000',6,1,1510,4),
(157,'2026-10-03 14:02:48.000000',7,1,1511,4),
(158,'2026-10-03 14:02:49.000000',8,1,1520,4),
(159,'2026-10-03 14:04:17.000000',0,1,769,7),
(160,'2026-10-03 14:04:17.000000',1,1,770,7),
(161,'2026-10-03 14:04:18.000000',2,1,771,7),
(162,'2026-10-03 14:04:28.000000',3,1,772,7),
(163,'2026-10-03 14:04:28.000000',4,1,783,7),
(164,'2026-10-03 14:04:29.000000',5,1,784,7),
(165,'2026-10-03 14:04:29.000000',6,1,785,7),
(166,'2026-10-03 14:04:30.000000',7,1,786,7),
(167,'2026-10-03 14:05:34.000000',8,1,823,7),
(168,'2026-10-03 14:05:34.000000',9,1,861,7),
(169,'2026-10-03 14:05:35.000000',10,1,865,7),
(170,'2026-10-03 14:05:36.000000',11,1,869,7),
(171,'2026-10-03 14:05:37.000000',12,1,882,7),
(172,'2026-10-03 14:05:37.000000',13,1,900,7),
(173,'2026-10-03 14:05:40.000000',14,1,936,7),
(174,'2026-10-03 14:05:41.000000',15,1,938,7),
(175,'2026-10-03 14:05:41.000000',16,1,951,7),
(176,'2026-10-03 14:06:23.000000',17,1,952,7),
(177,'2026-10-03 14:06:23.000000',18,1,954,7),
(178,'2026-10-03 14:06:24.000000',19,1,955,7),
(179,'2026-10-03 14:06:24.000000',20,1,956,7),
(180,'2026-10-03 14:06:25.000000',21,1,958,7),
(181,'2026-10-03 14:06:28.000000',22,1,959,7),
(182,'2026-10-03 14:06:28.000000',23,1,984,7),
(183,'2026-10-03 14:06:29.000000',24,1,996,7),
(184,'2026-10-03 14:06:29.000000',25,1,1035,7),
(185,'2026-10-03 14:06:30.000000',26,1,1041,7),
(186,'2026-10-03 14:06:30.000000',27,1,1062,7),
(187,'2026-10-03 14:06:31.000000',28,1,1279,7),
(188,'2026-10-03 14:06:31.000000',29,1,1283,7),
(189,'2026-10-03 14:06:50.000000',30,1,1285,7),
(190,'2026-10-03 14:06:50.000000',31,1,1286,7),
(191,'2026-10-03 14:06:51.000000',32,1,1290,7),
(192,'2026-10-03 14:06:52.000000',33,1,1292,7),
(193,'2026-10-03 14:06:52.000000',34,1,1293,7),
(194,'2026-10-03 14:06:53.000000',35,1,1296,7),
(195,'2026-10-03 14:06:56.000000',36,1,1298,7),
(196,'2026-10-03 14:06:56.000000',37,1,1302,7),
(197,'2026-10-03 14:06:57.000000',38,1,1305,7),
(198,'2026-10-03 14:06:57.000000',39,1,1306,7),
(199,'2026-10-03 14:06:58.000000',40,1,1310,7),
(200,'2026-10-03 14:06:58.000000',41,1,1314,7),
(201,'2026-10-03 14:06:59.000000',42,1,1320,7),
(202,'2026-10-03 14:06:59.000000',43,1,1321,7),
(203,'2026-10-03 14:07:02.000000',44,1,1323,7),
(204,'2026-10-03 14:07:02.000000',45,1,1324,7),
(205,'2026-10-03 14:07:02.000000',46,1,1325,7),
(206,'2026-10-03 14:07:03.000000',47,1,1327,7),
(207,'2026-10-03 14:07:03.000000',48,1,1330,7),
(208,'2026-10-03 14:07:04.000000',49,1,1337,7),
(209,'2026-10-03 14:07:04.000000',50,1,1340,7),
(210,'2026-10-03 14:07:05.000000',51,1,1341,7),
(211,'2026-10-03 14:07:06.000000',52,1,1345,7),
(212,'2026-10-03 14:07:07.000000',53,1,1348,7),
(213,'2026-10-03 14:07:07.000000',54,1,1351,7),
(214,'2026-10-03 14:07:08.000000',55,1,1357,7),
(215,'2026-10-03 14:07:08.000000',56,1,1358,7),
(216,'2026-10-03 14:07:09.000000',57,1,1364,7),
(217,'2026-10-03 14:07:09.000000',58,1,1370,7),
(218,'2026-10-03 14:07:11.000000',59,1,1371,7),
(219,'2026-10-03 14:07:12.000000',60,1,1372,7),
(220,'2026-10-03 14:07:12.000000',61,1,1375,7),
(221,'2026-10-03 14:07:13.000000',62,1,1378,7),
(222,'2026-10-03 14:07:13.000000',63,1,1381,7),
(223,'2026-10-03 14:07:13.000000',64,1,1396,7),
(224,'2026-10-03 14:07:14.000000',65,1,1403,7),
(225,'2026-10-03 14:07:16.000000',66,1,1404,7),
(226,'2026-10-03 14:07:16.000000',67,1,1419,7),
(227,'2026-10-03 14:07:17.000000',68,1,1426,7),
(228,'2026-10-03 14:07:17.000000',69,1,1427,7),
(229,'2026-10-03 14:07:18.000000',70,1,1429,7),
(230,'2026-10-03 14:07:18.000000',71,1,1430,7),
(231,'2026-10-03 14:07:20.000000',72,1,1439,7),
(232,'2026-10-03 14:07:20.000000',73,1,1440,7),
(233,'2026-10-03 14:07:21.000000',74,1,1442,7),
(234,'2026-10-03 14:07:21.000000',75,1,1443,7),
(235,'2026-10-03 14:07:22.000000',76,1,1444,7),
(236,'2026-10-03 14:07:22.000000',77,1,1445,7),
(237,'2026-10-03 14:07:24.000000',78,1,1447,7),
(238,'2026-10-03 14:07:24.000000',79,1,1448,7),
(239,'2026-10-03 14:07:25.000000',80,1,1450,7),
(240,'2026-10-03 14:07:25.000000',81,1,1452,7),
(241,'2026-10-03 14:07:25.000000',82,1,1454,7),
(242,'2026-10-03 14:07:26.000000',83,1,1456,7),
(243,'2026-10-03 14:07:28.000000',84,1,1460,7),
(244,'2026-10-03 14:07:28.000000',85,1,1461,7),
(245,'2026-10-03 14:07:29.000000',86,1,1464,7),
(246,'2026-10-03 14:07:29.000000',87,1,1468,7),
(247,'2026-10-03 14:07:30.000000',88,1,1471,7),
(248,'2026-10-03 14:07:30.000000',89,1,1472,7),
(249,'2026-10-03 14:07:32.000000',90,1,1475,7),
(250,'2026-10-03 14:07:32.000000',91,1,1477,7),
(251,'2026-10-03 14:07:33.000000',92,1,1481,7),
(252,'2026-10-03 14:07:33.000000',93,1,1482,7),
(253,'2026-10-03 14:07:34.000000',94,1,1483,7),
(254,'2026-10-03 14:07:34.000000',95,1,1484,7),
(255,'2026-10-03 14:07:35.000000',96,1,1485,7),
(256,'2026-10-03 14:07:36.000000',97,1,1489,7),
(257,'2026-10-03 14:07:37.000000',98,1,1490,7),
(258,'2026-10-03 14:07:37.000000',99,1,1491,7),
(259,'2026-10-03 14:07:38.000000',100,1,1493,7),
(260,'2026-10-03 14:07:38.000000',101,1,1496,7),
(261,'2026-10-03 14:07:39.000000',102,1,1525,7),
(262,'2026-10-03 14:07:41.000000',103,1,1541,7),
(263,'2026-10-03 14:07:41.000000',104,1,1588,7),
(264,'2026-10-03 14:12:29.000000',0,1,1136,8),
(265,'2026-10-03 14:12:30.000000',1,1,1164,8),
(266,'2026-10-03 14:12:31.000000',2,1,1179,8),
(267,'2026-10-03 14:12:31.000000',3,1,1280,8),
(268,'2026-10-03 14:12:32.000000',4,1,1349,8),
(269,'2026-10-03 14:12:36.000000',5,1,1496,8),
(270,'2026-10-03 14:12:37.000000',6,1,1562,8),
(271,'2026-10-03 14:12:39.000000',7,1,1569,8),
(289,'2026-10-03 14:36:01.000000',0,1,1618,5),
(290,'2026-10-03 14:36:01.000000',1,1,1617,5),
(291,'2026-10-03 14:36:27.000000',2,1,1433,5),
(325,'2026-10-04 15:54:32.000000',3,1,1591,5),
(326,'2026-10-14 23:58:53.000000',0,1,1617,10),
(327,'2026-10-14 23:58:53.000000',1,1,1607,10),
(328,'2026-10-14 23:58:53.000000',2,1,1606,10),
(329,'2026-10-14 23:58:53.000000',3,1,1605,10),
(330,'2026-10-14 23:58:54.000000',4,1,1604,10),
(331,'2026-10-14 23:58:54.000000',5,1,1603,10),
(332,'2026-10-14 23:58:55.000000',6,1,1602,10),
(333,'2026-10-14 23:58:56.000000',7,1,1600,10),
(334,'2026-10-14 23:58:56.000000',8,1,1601,10),
(335,'2026-10-14 23:58:57.000000',9,1,1599,10),
(336,'2026-10-14 23:58:57.000000',10,1,1598,10),
(337,'2026-10-14 23:58:57.000000',11,1,1597,10),
(338,'2026-10-14 23:58:58.000000',12,1,1596,10);
/*!40000 ALTER TABLE `queue_items` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `level` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK8sewwnpamngi6b1dwaa88askk` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES
(1,0,'USER'),
(2,0,'ADMIN');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `role_permissions`
--

DROP TABLE IF EXISTS `role_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `role_permissions` (
  `role_id` bigint(20) NOT NULL,
  `permissions_id` bigint(20) NOT NULL,
  PRIMARY KEY (`role_id`,`permissions_id`),
  KEY `FKclluu29apreb6osx6ogt4qe16` (`permissions_id`),
  CONSTRAINT `FKclluu29apreb6osx6ogt4qe16` FOREIGN KEY (`permissions_id`) REFERENCES `permission` (`id`),
  CONSTRAINT `FKlodb7xh4a2xjv39gc3lsop95n` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_permissions`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `role_permissions` WRITE;
/*!40000 ALTER TABLE `role_permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `role_permissions` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `room_playback_state`
--

DROP TABLE IF EXISTS `room_playback_state`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `room_playback_state` (
  `current_track_id` bigint(20) DEFAULT NULL,
  `last_update` datetime(6) DEFAULT NULL,
  `paused` bit(1) NOT NULL,
  `position` double NOT NULL,
  `room_id` bigint(20) NOT NULL,
  `user` varchar(255) DEFAULT NULL,
  `current_queue_entry_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`room_id`),
  CONSTRAINT `FKjotx2jkipqtr20un0p1lh055c` FOREIGN KEY (`room_id`) REFERENCES `listening_room` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `room_playback_state`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `room_playback_state` WRITE;
/*!40000 ALTER TABLE `room_playback_state` DISABLE KEYS */;
INSERT INTO `room_playback_state` VALUES
(NULL,'2026-10-14 20:57:43.070926',0x01,0,16,NULL,NULL);
/*!40000 ALTER TABLE `room_playback_state` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `user_auth_providers`
--

DROP TABLE IF EXISTS `user_auth_providers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_auth_providers` (
  `user_id` bigint(20) NOT NULL,
  `provider` enum('DISCORD','LOCAL','TELEGRAM') DEFAULT NULL,
  KEY `FK36nn9pmlugyb6c34h3vakuai` (`user_id`),
  CONSTRAINT `FK36nn9pmlugyb6c34h3vakuai` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_auth_providers`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `user_auth_providers` WRITE;
/*!40000 ALTER TABLE `user_auth_providers` DISABLE KEYS */;
INSERT INTO `user_auth_providers` VALUES
(1,'LOCAL'),
(2,'LOCAL'),
(3,'LOCAL'),
(4,'LOCAL'),
(5,'LOCAL'),
(8,'LOCAL'),
(10,'LOCAL'),
(11,'LOCAL'),
(12,'LOCAL'),
(13,'LOCAL'),
(14,'LOCAL');
/*!40000 ALTER TABLE `user_auth_providers` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `user_settings`
--

DROP TABLE IF EXISTS `user_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_settings` (
  `discord_connected` bit(1) NOT NULL,
  `discord_id` bigint(20) DEFAULT NULL,
  `telegram_connected` bit(1) NOT NULL,
  `telegram_id` bigint(20) DEFAULT NULL,
  `user_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UKp2p063acywd4rd069plpc3x8x` (`discord_id`),
  UNIQUE KEY `UKkkt0k9m4gf38ydvd4pc7jr4hj` (`telegram_id`),
  CONSTRAINT `FK8v82nj88rmai0nyck19f873dw` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_settings`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `user_settings` WRITE;
/*!40000 ALTER TABLE `user_settings` DISABLE KEYS */;
INSERT INTO `user_settings` VALUES
(0x00,NULL,0x00,NULL,1),
(0x00,NULL,0x00,NULL,2),
(0x00,NULL,0x00,NULL,3),
(0x00,NULL,0x00,NULL,4),
(0x00,NULL,0x00,NULL,5),
(0x00,NULL,0x00,NULL,8),
(0x00,NULL,0x00,NULL,10),
(0x00,NULL,0x00,NULL,11),
(0x00,NULL,0x00,NULL,12);
/*!40000 ALTER TABLE `user_settings` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `avatar_url` varchar(255) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `open_id` varchar(20) NOT NULL,
  `password_hash` varchar(255) DEFAULT NULL,
  `status` enum('ACTIVE','ARCHIVED','BLOCKED','DEACTIVATED','PENDING','SUSPENDED','TEMP') NOT NULL,
  `listening_room_id` bigint(20) DEFAULT NULL,
  `api_key` varchar(40) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK4q41dbud42509bjgnmvd7n2ro` (`open_id`),
  UNIQUE KEY `UK6dotkott2kjsp8vw4d0m25fb7` (`email`),
  UNIQUE KEY `UK3g1j96g94xpk3lpxl2qbl985x` (`name`),
  KEY `FK48jg2eek8sv16cl0hhm0itgnv` (`listening_room_id`),
  CONSTRAINT `FK48jg2eek8sv16cl0hhm0itgnv` FOREIGN KEY (`listening_room_id`) REFERENCES `listening_room` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,NULL,'2026-03-14 13:35:45.091718','kirya@gmail.com','kirya','U5HGpd70LesZe8A4XBPu','$argon2id$v=19$m=65536,t=3,p=1$bfoVi09TEgg2Qt09XHAGwg$qd9hphXQFoRwywckbtabf6+XCZqLUONHA5fiXh4vbss','ACTIVE',16,'sdhg37eh0e021yr27'),
(2,NULL,'2026-03-14 18:54:01.549498','lipapipaminecraft@gmail.com','Lipa','QlHz8tx1PxJ5VrdOtE6r','$argon2id$v=19$m=65536,t=3,p=1$LwTa4mGmFPSdUhbROSiSlw$fOxwRl2Esclz0TmyrUgLfutxdRKyMSpfACxRx2FtOiA','ACTIVE',NULL,''),
(3,NULL,'2026-03-14 20:02:39.875027','yarikbuba08@gmail.com','Nutellka','7UP8Qg2b1U79HsiqAQZ5','$argon2id$v=19$m=65536,t=3,p=1$E8cE0lvKVVYKjUdhw7UiQw$X41dScTNt83besQP4L3ckXTeqbesoXgzYC1/VeIl1LI','ACTIVE',NULL,''),
(4,NULL,'2026-03-14 21:04:39.251028','niki-mail@mail.ru','moleslipper','7J4CXriGZq71uCv3T86C','$argon2id$v=19$m=65536,t=3,p=1$E2ebxkV8/rs0amOxB2U2og$TH8jLj6gQjQbiGbABkscQSfcMBmVtn7bhwxJKxIwaBo','ACTIVE',NULL,''),
(5,NULL,'2026-03-15 02:49:24.359211','hyacinthy8916@gmail.com','hyacinthy','cdlxHFuAuIvsud5xhyMl','$argon2id$v=19$m=65536,t=3,p=1$25dCOg5rBWGsDR56PNEZNg$nCRD1bQ9AknJirX2x2hCAddLNIG12fLFGW9UKV+b9E8','ACTIVE',NULL,'dh8de273tge61tgs210'),
(8,NULL,'2026-03-20 16:27:27.556637','wallopik@fabricvanilla.tech','wallopik','yNiVCDMeMJOTf9rgOfIo','$argon2id$v=19$m=65536,t=3,p=1$tkX6ywSbaNGL5PE4rBdpFQ$bIBqDqJP003ltF/62HkHWwU8dUBxiB+l8tDtz7T1ZQw','ACTIVE',NULL,''),
(10,NULL,'2026-04-11 12:00:59.689315','test@gmail.com','kkkk','UdwMhPMQhkRrXtxnNGdf','$argon2id$v=19$m=65536,t=3,p=1$kOKLcyhoMgMUxJQvswU1Tw$TSflJc4BPL4J7XWn4i2VYVNjZKzC4zkKA/aftrDpr64','ACTIVE',NULL,''),
(11,NULL,'2026-05-15 20:45:10.372818','mosfrancescom@gmail.com','mafra','nCB4YyVNuMnK9pIq0pc8','$argon2id$v=19$m=65536,t=3,p=1$7R5Vn+UnuEdXrC++melR7Q$f/FIIZoYONQ8fEQwr0//oZFOu47m9ex0+i1cI6HNBKk','ACTIVE',NULL,'mFQxpK0newyzFj8dwLBM6vGc25AeYM1OZCAmUp9H'),
(12,NULL,'2026-09-02 07:17:11.595531','tuhansiajarvia@gmail.com','Vadim','HMzJ9oPMys7zEE4CvR2T','$argon2id$v=19$m=65536,t=3,p=1$jlZSDAaVtvwtcP4HDyOAsw$M3Yy20wsDBGf06Je+oT2exMdzVQo4PAQAol50iwVlI4','ACTIVE',NULL,'AbImuRW1ZQcBfUCnp29wJBIXOKl7pMLSXOHc8Omh'),
(13,NULL,'2026-09-24 12:12:22.226298','kononov.vova2016@gmail.com','Autist','5T4KGZBC0VI09YMTSKL0','$argon2id$v=19$m=65536,t=3,p=1$8Si9sL7dq7z5+ORCuUnMOg$xXNZ3wOQ3Cax3hhIgdApwvSQFBMw/n2fvq43iRb1bL8','ACTIVE',NULL,'GCM0G97QFDOG6XNPD3975M0GO34NMWDLNGSMCNCY'),
(14,NULL,'2026-09-24 12:21:41.444265','testi@gmail.com','Test','62JIN7SFR0ZGDLOS4SWE','$argon2id$v=19$m=65536,t=3,p=1$Tg1W3xH2gW4Z9sQptIZb/Q$mQ6fkdvKZQVYRSdTCDuQR6aH8uNyENzTIw2IGbKCTU8','ACTIVE',NULL,'P6FHGY9QDQG2E6J8FUCBBXHRX9OT6Q8QQNJ75CLP');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Table structure for table `users_roles`
--

DROP TABLE IF EXISTS `users_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users_roles` (
  `user_id` bigint(20) NOT NULL,
  `roles_id` bigint(20) NOT NULL,
  PRIMARY KEY (`user_id`,`roles_id`),
  KEY `FK15d410tj6juko0sq9k4km60xq` (`roles_id`),
  CONSTRAINT `FK15d410tj6juko0sq9k4km60xq` FOREIGN KEY (`roles_id`) REFERENCES `role` (`id`),
  CONSTRAINT `FK2o0jvgh89lemvvo17cbqvdxaa` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_roles`
--

SET @OLD_AUTOCOMMIT=@@AUTOCOMMIT, @@AUTOCOMMIT=0;
LOCK TABLES `users_roles` WRITE;
/*!40000 ALTER TABLE `users_roles` DISABLE KEYS */;
INSERT INTO `users_roles` VALUES
(2,1),
(3,1),
(4,1),
(5,1),
(8,1),
(10,1),
(11,1),
(12,1),
(13,1),
(14,1);
/*!40000 ALTER TABLE `users_roles` ENABLE KEYS */;
UNLOCK TABLES;
COMMIT;
SET AUTOCOMMIT=@OLD_AUTOCOMMIT;

--
-- Dumping routines for database 's17_Kai_music'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-10-19 18:39:02
