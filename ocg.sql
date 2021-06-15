-- MySQL dump 10.13  Distrib 5.7.33, for Linux (x86_64)
--
-- Host: 15.165.179.33    Database: ocg
-- ------------------------------------------------------
-- Server version	5.7.33-0ubuntu0.18.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ALBUM`
--

DROP TABLE IF EXISTS `ALBUM`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ALBUM` (
  `album_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '앨범 ID',
  `production_id` int(11) DEFAULT NULL COMMENT '소속 ID',
  `album_name_kr` varchar(45) DEFAULT NULL COMMENT '앨범 이름(KR)',
  `album_name_en` varchar(45) DEFAULT NULL COMMENT '앨범 이름(EN)',
  `album_name_jp` varchar(45) DEFAULT NULL COMMENT '앨범 이름(JP)',
  `album_release_date` date DEFAULT NULL COMMENT '앨범 발매일',
  `album_short` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`album_id`),
  KEY `FK_ALBUM_production_id_PRODUCTION_production_id` (`production_id`),
  CONSTRAINT `FK_ALBUM_production_id_PRODUCTION_production_id` FOREIGN KEY (`production_id`) REFERENCES `PRODUCTION` (`production_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8 COMMENT='앨범';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ALBUM`
--

LOCK TABLES `ALBUM` WRITE;
/*!40000 ALTER TABLE `ALBUM` DISABLE KEYS */;
INSERT INTO `ALBUM` VALUES (1,3,NULL,NULL,'THE IDOLM@STER LIVE THE@TER PERFORMANCE 03','2013-06-26','LTP03'),(2,2,NULL,NULL,'THE IDOLM@STER CINDERELLA MASTER 057','2020-04-22','CM057'),(3,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS FR@GMENT WING 02','2019-05-08','FW02'),(4,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS BRILLI@NT WING 02','2018-07-04','BW02'),(5,3,NULL,NULL,'THE IDOLM@STER LIVE THE@TER DREAMERS 02','2015-10-28','LTD02'),(6,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS BRILLI@NT WING 04','2018-09-15','BW04'),(7,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS BRILLI@NT WING 01','2018-06-06','BW01'),(8,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS BRILLI@NT WING 03','2018-08-01','BW03'),(9,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS FR@GMENT WING 01','2019-04-10','FW01'),(10,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS FR@GMENT WING 03','2019-06-12','FW03'),(11,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS FR@GMENT WING 04','2019-07-10','FW04'),(12,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS FR@GMENT WING 05','2019-08-21','FW05'),(13,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS FR@GMENT WING 06','2019-09-11','FW06'),(14,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS BRILLI@NT WING 05','2018-10-03','BW05'),(15,5,NULL,NULL,'THE IDOLM@STER SHINY COLORS SWEET♡STEP','2020-02-12','SWEET♡STEP');
/*!40000 ALTER TABLE `ALBUM` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `CV`
--

DROP TABLE IF EXISTS `CV`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `CV` (
  `cv_id` int(11) NOT NULL COMMENT '성우 ID',
  `idol_id` int(11) DEFAULT NULL,
  `cv_name_kr` varchar(45) DEFAULT NULL COMMENT '성우 이름(KR)',
  `cv_name_en` varchar(45) DEFAULT NULL COMMENT '성우 이름(EN)',
  `cv_name_jp` varchar(45) DEFAULT NULL COMMENT '성우 이름(JP)',
  `cv_age` int(11) DEFAULT NULL COMMENT '성우 나이',
  `cv_birth` date DEFAULT NULL COMMENT '성우 생년월일',
  `cv_production` varchar(45) DEFAULT NULL COMMENT '성우 소속사',
  KEY `FK_CV_idol_id_IDOL_idol_id` (`idol_id`),
  CONSTRAINT `FK_CV_idol_id_IDOL_idol_id` FOREIGN KEY (`idol_id`) REFERENCES `IDOL` (`idol_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='성우';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `CV`
--

LOCK TABLES `CV` WRITE;
/*!40000 ALTER TABLE `CV` DISABLE KEYS */;
INSERT INTO `CV` VALUES (1,1,'나츠카와 시이나','Shiina Natsukawa','夏川椎菜',NULL,'1996-07-18','MusicRay\'n'),(2,2,'호시키 세에나','Seena Hoshiki','星希 成奏',NULL,'1999-10-11','A応P'),(3,3,'세키네 히토미','Hitomi Sekine','関根 瞳',NULL,'2000-05-09','teaЯLove'),(4,4,'콘도 레이나','Reina Kondo','近藤玲奈',NULL,'1999-01-28','HIRATA OFFICE'),(5,5,'미네다 마유','Mayu Mineda','峯田 茉優',NULL,'1999-11-28','VIMS'),(7,7,'아이미','Aimi','愛美',NULL,'1991-12-25','KING RECORD'),(6,6,'후지이 유키요','Yukiyo Fujii','藤井 ゆきよ',NULL,'1985-05-08','Aoni Production'),(8,8,'코노 히요리','Hiyori Kono','河野 ひより',NULL,'1998-06-21','teaЯLove'),(9,9,'시라이시 하루카','Haruka Shiraishi','白石 晴香',NULL,'1995-04-08','TOY\'S FACTORY'),(10,10,'나가이 마리코','Mariko Nagai','永井真里子',NULL,'0000-01-03','KEN PRODUCTION'),(11,11,'마루오나 와카나','Wakana Maruoka','丸岡 和佳奈',NULL,'1995-05-13','teaЯLove'),(12,12,'스즈모토 아키호','Akiho Suzumoto','涼本あきほ',NULL,'1998-10-16','VIMS'),(13,13,'나카무라 에리코','Eriko Nakamura','中村 繪里子',NULL,'1981-11-19','ARTSVISION'),(14,14,'이마이 아사미','Asami Imai','今井 麻美',NULL,'1977-05-16','EARLY WING'),(15,15,'하세가와 아키코','Akiko Hasegawa','長谷川 明子',NULL,'0000-04-14','ARTSVISION'),(16,16,'아사쿠라 아즈미','Azumi Asakura','浅倉杏美',NULL,'1987-02-15','ARTSVISION'),(17,17,'니고 마야코','Mayako Nigo','仁後 真耶子',NULL,'1979-12-02','I\'m enterprise'),(18,18,'히라타 히로미','Hiromi Hirata','平田宏美',NULL,'1978-02-19','I\'m enterprise'),(19,19,'쿠기미야 리에','Rie Kugimiya','釘宮 理恵',NULL,'1979-05-30','I\'m enterprise'),(20,20,'하라 유미','Yumi Hara','原 由実',NULL,'1985-01-21','ARTSVISION'),(21,21,'와카바야시 나오미','Naomi Wakabayashi','若林直美',NULL,'1975-11-02','ForestLink'),(22,22,'타카하시 치아키','Chiaki Takahashi','たかはし 智秋',NULL,'1977-05-08',NULL),(23,23,'시모다 아사미','Asami Shimoda','下田麻美',NULL,'1986-01-30','ARTSVISION'),(24,24,'시모다 아사미','Asami Shimoda','下田麻美',NULL,'1986-01-30','ARTSVISION'),(25,25,'누마쿠라 마나미','Manami Numakura','沼倉 愛美',NULL,'1988-04-15','ARTSVISION'),(26,26,'야마자키 하루카','Haruka Yamazaki','山崎 はるか',NULL,'1991-06-27','ARTSVISION'),(27,27,'타도코로 아즈사','Azusa Tadokoro','田所 あずさ',NULL,'1993-11-10','Horipro'),(28,28,NULL,'Machico',NULL,NULL,'1992-03-25','Horipro'),(29,29,'타네다 리사','Risa Taneda','種田 梨沙',NULL,'1988-07-12','Office Osawa'),(30,30,'카쿠모토 아스카','Asuka Kakumoto','角元明日香',NULL,'1992-04-08','Apollo Bay'),(31,31,'오오제키 에리','Eri Ozeki','大関英里',NULL,'1987-08-18',NULL),(32,32,'스와 아야카','Ayaka Suwa','諏訪 彩花',NULL,'1988-05-27','ARTSVISION'),(33,33,'아사쿠라 모모','Momo Asakura','麻倉 もも',NULL,'1994-06-25','Music Ray\'n'),(34,34,'오가사와라 사키','Saki Ogasawara','小笠原早紀',NULL,'0000-03-29','Kenproduction '),(35,35,'나카무라 아츠키','Atsuki Nakamura','中村温姫',NULL,'1991-06-15','EARLY WING'),(36,36,'이토 미쿠','Miku Itō','伊藤美来',NULL,'1996-10-12','Style Cube'),(37,37,'코마가타 유리','Yuri Komagata','駒形友梨',NULL,'1991-08-25','Apollo Bay'),(38,38,'무라카와 리에','Rie Murakawa','村川 梨衣',NULL,'1990-06-01','Stay Luck'),(39,39,'우에다 레이나','Reina Ueda','上田 麗奈',NULL,'1994-01-17','81Produce'),(40,40,'하라시마 아카리','Akari Harashima','原嶋あかり',NULL,'1990-03-09','Tokyo Actor\'s Consumer\'s Cooperative Society'),(41,41,'코이와이 코토리','Kotori Koiwai','小岩井 ことり',NULL,'1990-02-15','PEERLESS GERBERA'),(42,42,'카하라 유','Yū Kahara','郁原ゆう',NULL,'0000-02-19',NULL),(43,43,'아마미야 소라','Sora Amamiya','雨宮 天',NULL,'1993-08-28','Music Ray\'n'),(44,44,'토다 메구미','Megumi Toda','戸田めぐみ',NULL,'1990-12-08','Kenyu Office'),(45,45,'타무라 나오','Nao Tamura','田村奈央',NULL,'1999-10-10','Tokyo Actor\'s Consumer\'s Cooperative Society'),(46,46,'키도 이부키','Ibuki Kido','木戸衣吹',NULL,'1997-11-14','Horipro'),(47,47,'와타나베 유이','Yui Watanabe','渡部優衣',NULL,'1988-12-04',NULL),(48,48,'노무라 카나코','Kanako Nomura','野村香菜子',NULL,'1989-12-25','Rush Style'),(49,49,'타카하시 미나미','Minami Takahashi','髙橋 ミナミ',NULL,'1990-12-20','Tokyo Actor\'s Consumer\'s Cooperative Society'),(50,50,'이나가와 에리','Eri Inagawa','稲川英里',NULL,'1993-10-28','Kenproduction'),(51,51,'스에가라 리에','Rie Suegara','末柄里恵',NULL,'1990-01-08','Kenproduction'),(52,52,'키리타니 초초','Choucho Kiritani','桐谷蝶々',NULL,'0000-01-15',NULL),(53,53,'하마사키 나나','Nana Hamasaki','浜崎奈々',NULL,'0000-09-06','I\'m enterprise'),(54,54,'아베 리카','Rika Abe','阿部里果',NULL,'0000-09-20','VIMS'),(55,55,'콘도 유이','Yui Kondo','近藤唯',NULL,'1988-06-28','Kenyu Office'),(56,56,'야마구치 리카코','Rikako Yamaguchi','山口立花子',NULL,'1988-03-30','SUN MUSIC PRODUCTION'),(57,57,'사이토 유카','Yuka Saitō','斉藤 佑圭',NULL,'1986-11-13','Aoni Production'),(58,58,'히라야마 에미','Emi Hirayama','平山笑美',NULL,'0000-09-24',NULL),(59,59,'와타나베 케이코','Keiko Watanabe','渡部恵子',NULL,'1987-03-29',NULL),(60,60,'미나미 사키','Saki Minami','南 早紀',NULL,'1994-11-19','81Produce'),(61,61,'코리 아리사','Arisa Kori','香里 有佐',NULL,'1994-03-13','Aoni Production'),(62,62,'이소베 카린','Karin Isobe','礒部 花凜',NULL,'1994-05-26','AMUSE'),(63,63,'스가누마 치사','Chisa Suganuma','菅沼 千紗',NULL,'0000-07-29','Kenproduction'),(64,64,'야마키 안나','Anna Yamaki','八巻アンナ',NULL,'0000-10-15','REMAX'),(65,65,'나루미 루나','Runa Narumi','成海瑠奈',NULL,'1995-11-19','Stardust Promotion'),(66,66,'유이나 미즈키','Mizuki Yuina','結名 美月',NULL,'1995-12-19','VIMS'),(67,67,'쿠로키 호노카','Honoka Kuroki','黒木ほの香',NULL,'1995-10-21','Stardust Promotion'),(68,68,'시바사키 노리코','Noriko Shibasaki','芝崎典子',NULL,'1991-09-14','OGIPRO THE NEXT'),(69,69,'마에카와 료코','Ryoko Maekawa','前川涼子',NULL,'0000-08-06','Atomic Monkey'),(70,70,'유키무라 에리','Eri Yukimura','幸村 恵理',NULL,'1998-12-06','VIMS'),(71,71,'타나카 유키','Yuki Tanaka','田中有紀',NULL,'1998-06-26','オフィスPAC'),(72,72,'키타하라 사야카','Sayaka Kitahara','北原 沙弥香',NULL,'1993-11-29','Kenproduction'),(73,73,'오카사키 미호','Miho Okasaki','岡咲 美保',NULL,'1998-11-22','I\'m enterprise'),(74,74,'와쿠이 유우','Yuu Wakui','和久井 優',NULL,'1995-01-24','Sunaoka Office'),(75,75,'츠치야 리오','Rio Tsuchiya','土屋 李央',NULL,'1997-08-19','Office Osawa'),(76,76,'타지마 사란','Saran Tajima','田嶌紗蘭',NULL,'1996-08-25','REMAX'),(77,77,'시즈키 아즈사','Azusa Shizuki','紫月 杏朱彩',NULL,'0000-11-08','Tokyo Actor\'s Consumer\'s Cooperative Society'),(78,78,'야마네 아야','Aya Yamane','山根 綺',NULL,'1997-02-04','Aoni Production');
/*!40000 ALTER TABLE `CV` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `IDOL`
--

DROP TABLE IF EXISTS `IDOL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `IDOL` (
  `idol_id` int(11) NOT NULL COMMENT '아이돌 ID',
  `cv_id` int(11) NOT NULL,
  `production_id` int(11) DEFAULT NULL COMMENT '소속 ID',
  `idol_name_kr` varchar(45) DEFAULT NULL COMMENT '아이돌 이름(KR)',
  `idol_name_en` varchar(45) DEFAULT NULL COMMENT '아이돌 이름(EN)',
  `idol_name_jp` varchar(45) DEFAULT NULL COMMENT '아이돌 이름(JP)',
  `idol_age` int(11) DEFAULT NULL COMMENT '아이돌 나이',
  `idol_birth` date DEFAULT NULL COMMENT '아이돌 생년월일',
  `idol_color` varchar(45) DEFAULT NULL COMMENT '아이돌 색',
  `idol_shown_color` varchar(45) DEFAULT NULL COMMENT '아이돌 시각 색',
  PRIMARY KEY (`idol_id`,`cv_id`),
  KEY `FK_IDOL_production_id_PRODUCTION_production_id` (`production_id`),
  CONSTRAINT `FK_IDOL_production_id_PRODUCTION_production_id` FOREIGN KEY (`production_id`) REFERENCES `PRODUCTION` (`production_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='아이돌';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `IDOL`
--

LOCK TABLES `IDOL` WRITE;
/*!40000 ALTER TABLE `IDOL` DISABLE KEYS */;
INSERT INTO `IDOL` VALUES (1,1,3,'모치즈키 안나','Anna Mochizuki','望月 杏奈',14,'0000-05-31','#7E6CA8','#bd5df5'),(2,2,2,'유메미 리아무','Riamu Yumemi','夢見 りあむ',19,'0000-09-12','#E79BDC','#E79BDC'),(3,3,5,'사쿠라기 마노','Mano Sakuragi','櫻木真乃',16,'0000-04-25','#FFBAD6','#FFBAD6'),(4,4,5,'카자노 히오리','Hiori Kazano','風野灯織',15,'0000-03-04','#144384','#2679ed'),(5,5,5,'하치미야 메구루','Meguru Hachimiya','八宮 めぐる',16,'0000-07-22','#FFE012','#FFE012'),(6,6,3,'토코로 메구미','Megumi Tokoro','所恵美',16,'0000-04-15','#454341','#f5f5f5'),(7,7,3,'줄리아','Julia','ジュリア',16,'0000-09-26','#D7385F','#D7385F'),(8,8,5,'코미야 카호','Kaho Komiya','小宮果穂',12,'0000-07-29','#E5461C','#E5461C'),(9,9,5,'소노다 치요코','Sonoda Chiyoko','園田智代子',17,'0000-02-24','#F93A8F','#F93A8F'),(10,10,5,'사이죠 쥬리','Saijo Juri','西城樹里',17,'0000-11-26','#FEC706','#FEC706'),(11,11,5,'모리노 린제','Rinze Morino','杜野凛世',16,'0000-10-19','#87C2EB','#87C2EB'),(12,12,5,'아리스가와 나츠하','Arisugawa Natsuha','有栖川夏葉',20,'0000-08-16','#8FE667','#8FE667'),(13,13,1,'아마미 하루카','Haruka Amami','天海 春香',17,'0000-04-03','#E22B30','#E22B30'),(14,14,1,'키사라기 치하야','Chihaya Kisaragi','如月 千早',16,'0000-02-25','#2743D2','#2743D2'),(15,15,1,'호시이 미키','Miki Hoshii','星井 美希',15,'0000-11-23','#B4E04B','#B4E04B'),(16,16,1,'하기와라 유키호','Yukiho Hagiwara','萩原 雪歩',17,'0000-12-24','#D3DDE9','#D3DDE9'),(17,17,1,'타카츠키 야요이','Yayoi Takatsuki','高槻 やよい',14,'0000-03-25','#F39939','#F39939'),(18,18,1,'키쿠치 마코토','Makoto Kikuchi','菊地 真',17,'0000-08-29','#515558','#DDDDDD'),(19,19,1,'미나세 이오리','Iori Minase','水瀬 伊織',15,'0000-05-05','#FD99E1','#FD99E1'),(20,20,1,'시죠 타카네','Takane Shijou','四条 貴音',18,'0000-01-21','#A6126A','#A6126A'),(21,21,1,'아키즈키 리츠코','Ritsuko Akizuki','ARTSVISION',19,'0000-06-23','#01A860','#01A860'),(22,22,1,'미우라 아즈사','Azusa Miura','三浦 あずさ',21,'0000-07-19','#9238BE','#9238BE'),(23,23,1,'후타미 아미','Ami Futami','双海 亜美',13,'0000-05-22','#FFE43F','#FFE43F'),(24,24,1,'후타미 마미','Mami Futami','双海 真美',13,'0000-05-22','#FFE43F','#FFE43F'),(25,25,1,'가나하 히비키','Hibiki Ganaha','我那覇 響',16,'0000-10-10','#01ADB9','#01ADB9'),(26,26,3,'카스가 미라이','Mirai Kasuga','春日 未来',14,'0000-06-28','#EA5B76','#EA5B76'),(27,27,3,'모가미 시즈카','Shizuka Mogami','最上 静香',14,'0000-09-14','#6495CF','#6495CF'),(28,28,3,'이부키 츠바사','Tsubasa Ibuki','伊吹 翼',14,'0000-07-30','#FED552','#FED552'),(29,29,3,'타나카 코토하','Kotoha Tanaka','田中 琴葉',18,'0000-10-05','#92CFBB','#92CFBB'),(30,30,3,'시마바라 엘레나','Elena Shimabara','島原 エレナ',17,'0000-10-26','#9BCE92','#9BCE92'),(31,31,3,'사타케 미나코','Minako Satake','佐竹 美奈子',18,'0000-03-22','#58A6DC','#58A6DC'),(32,32,3,'토쿠가와 마츠리','Matsuri Tokugawa','徳川 まつり',19,'0000-02-04','#5ABFB7','#5ABFB7'),(33,33,3,'하코자키 세리카','Serika Hakojaki','箱崎 星梨花',13,'0000-02-20','#ED90BA','#ED90BA'),(34,34,3,'노노하라 아카네','Akane Nonohara','野々原 茜',16,'0000-12-03','#EB613F','#EB613F'),(35,35,3,'로코','Roco','ロコ',15,'0000-03-01','#FFF03C','#FFF03C'),(36,36,3,'나나오 유리코','Yuriko Nanao','七尾 百合子',15,'0000-03-18','#C7B93C','#C7B93C'),(37,37,3,'타카야마 사요코','Sayoko Takayama','高山 紗代子',17,'0000-12-29','#7F6575','#c297b1'),(38,38,3,'마츠다 아리사','Arisa Matsuda','松田 亜利沙',16,'0000-06-07','#B54461','#B54461'),(39,39,3,'코사카 우미','Umi Kousaka','高坂 海美',16,'0000-08-10','#E9739B','#E9739B'),(40,40,3,'나카타니 이쿠','Iku Nakatani','中谷 育',10,'0000-12-16','#F7E78E','#F7E78E'),(41,41,3,'텐쿠바시 토모카','Tomoka Tenkubashi','天空橋 朋花',15,'0000-11-11','#BEE3E3','#BEE3E3'),(42,42,3,'에밀리 스튜어트','Emily Stewart','エミリー スチュアート',13,'0000-01-08','#554171','#936dc9'),(43,43,3,'키타자와 시호','Shiho Kitazawa','北沢 志保',14,'0000-01-18','#AFA690','#ede1c2'),(44,44,3,'마이하마 아유무','Ayumu Maihama','舞浜 歩',19,'0000-07-23','#E25A9B','#E25A9B'),(45,45,3,'키노시타 히나타','Hinata Kinoshita','木下 ひなた',14,'0000-07-04','#D1342C','#D1342C'),(46,46,3,'야부키 카나','Kana Yabuki','矢吹 可奈',14,'0000-08-18','#F5AD3B','#F5AD3B'),(47,47,3,'요코야마 나오','Nao Yokoyama','横山 奈緒',17,'0000-02-12','#788BC5','#788BC5'),(48,48,3,'니카이도 치즈루','Chizuru Nikaido','二階堂 千鶴',21,'0000-10-21','#F19257','#F19257'),(49,49,3,'바바 코노미','Konomi Baba','馬場 このみ',24,'0000-06-12','#F1BECB','#F1BECB'),(50,50,3,'오오가미 타마키','Tamaki Ogami','大神 環',12,'0000-04-29','#EE762E','#EE762E'),(51,51,3,'토요카와 후카','Fuka Toyokawa','豊川 風花',22,'0000-09-02','#7278A8','#7278A8'),(52,52,3,'미야오 미야','Miya Miyao','宮尾 美也',17,'0000-04-24','#D7A96B','#D7A96B'),(53,53,3,'후쿠다 노리코','Noriko Fukuda','福田 のり子',18,'0000-03-30','#ECEB70','#ECEB70'),(54,54,3,'마카메 미즈키','Mizuki Makabe','真壁 瑞希',17,'0000-01-27','#99B7DC','#99B7DC'),(55,55,3,'시노미야 카렌','Karen Shinomiya','篠宮 可憐',16,'0000-08-27','#B63B40','#B63B40'),(56,56,3,'모모세 리오','Rio Momose','百瀬 莉緒',23,'0000-11-21','#F19591','#F19591'),(57,57,3,'나가요시 스바루','Subaru Nagayoshi','永吉 昴',15,'0000-09-20','#AEB49C','#c8d4a5'),(58,58,3,'키타카미 레이카','Reika Kitakami','北上 麗花',20,'0000-05-17','#6BB6B0','#6BB6B0'),(59,59,3,'스오 모모코','Momoko Suou','周防 桃子',11,'0000-11-06','#EFB864','#EFB864'),(60,60,3,'시라이시 츠무기','Tsumugi Shiraishi','白石 紬',17,'0000-05-29','#B5B1E1','#B5B1E1'),(61,61,3,'사쿠라모리 카오리','Kaori Sakuramori','桜守 歌織',23,'0000-03-27','#18206B','#cacffc'),(62,62,5,'츠키오카 코가네','Kogane Tsukioka','月岡 恋鐘',19,'0000-02-25','#F94CAD','#F94CAD'),(63,63,5,'타나카 마미미','Mamimi Tanaka','田中 摩美々',18,'0000-05-24','#A846FB','#A846FB'),(64,64,5,'시라세 사쿠야','Sakuya Shirase','白瀬 咲耶',18,'0000-06-27','#005F46','#04bf8e'),(65,65,5,'미츠미네 유이카','Yuika Mitsumine','三峰 結華',19,'0000-01-16','#3990C3','#3990C3'),(66,66,5,'유코쿠 키리코','Kiriko Yukoku','幽谷 霧子',17,'0000-09-23','#D9F2FF','#D9F2FF'),(67,67,5,'오사키 아마나','Amana Osaki','大崎 甘奈',17,'0000-12-25','#F53C71','#F53C71'),(68,68,5,'쿠와야마 치유키','Chiyuki Kuwayama','桑山 千雪',23,'0000-04-18','#FBFAFA','#FBFAFA'),(69,69,5,'오사키 텐카','Tenka Osaki','大崎 甜花',17,'0000-12-25','#D75BEC','#D75BEC'),(70,70,5,'마유즈미 후유코','Fuyuko Mayuzumi','黛 冬優子',19,'0000-12-04','#5CE626','#5CE626'),(71,71,5,'세리자와 아사히','Asahi Serizawa','芹沢 あさひ',14,'0000-01-04','#F30100','#F30100'),(72,72,5,'이즈미 메이','Mei Izumi','和泉 愛依',18,'0000-08-02','#FF00FF','#FF00FF'),(73,73,5,'이치카와 히나나','Hinana Ichikawa','市川 雛菜',15,'0000-03-17','#FFC639','#FFC639'),(74,74,5,'아사쿠라 토오루','Toru Asakura','浅倉 透',17,'0000-05-04','#50D0D0','#50D0D0'),(75,75,5,'히구치 마도카','Madoka Higuchi','樋口 円香',17,'0000-10-27','#BE1E3E','#BE1E3E'),(76,76,5,'후쿠마루 코이토','Koito Fukumaru','福丸 小糸',16,'0000-11-11','#7967C3','#7967C3'),(77,77,5,'나나쿠사 니치카','Nichika Nanakusa','七草 にちか',16,'0000-07-26','#A6CEB6','#A6CEB6'),(78,78,5,'아케타 미코토','Mikoto Aketa','緋田 美琴',24,'0000-09-08','#760F10','#760F10');
/*!40000 ALTER TABLE `IDOL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIVE`
--

DROP TABLE IF EXISTS `LIVE`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LIVE` (
  `live_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '라이브 ID',
  `live_name_kr` varchar(45) DEFAULT NULL COMMENT '라이브 제목(KR)',
  `live_name_en` varchar(45) DEFAULT NULL COMMENT '라이브 제목(EN)',
  `live_name_jp` varchar(45) DEFAULT NULL COMMENT '라이브 제목(JP)',
  `live_name_kr_short` varchar(45) DEFAULT NULL COMMENT '라이브 제목 축약(KR)',
  `live_name_en_short` varchar(45) DEFAULT NULL COMMENT '라이브 제목 축약(EN)',
  `live_place_kr` varchar(45) DEFAULT NULL COMMENT '라이브 장소(KR)',
  `live_place_en` varchar(45) DEFAULT NULL COMMENT '라이브 장소(EN)',
  `live_place_jp` varchar(45) DEFAULT NULL COMMENT '라이브 장소(JP)',
  `live_date` date DEFAULT NULL COMMENT '라이브 일시',
  `live_is_regular` bit(1) DEFAULT NULL COMMENT '정규라이브인가',
  PRIMARY KEY (`live_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='라이브';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIVE`
--

LOCK TABLES `LIVE` WRITE;
/*!40000 ALTER TABLE `LIVE` DISABLE KEYS */;
/*!40000 ALTER TABLE `LIVE` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIVE_IDOL`
--

DROP TABLE IF EXISTS `LIVE_IDOL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LIVE_IDOL` (
  `live_id` int(11) NOT NULL COMMENT '라이브 ID',
  `idol_id` int(11) NOT NULL COMMENT '아이돌 ID',
  PRIMARY KEY (`live_id`,`idol_id`),
  KEY `FK_LIVE_IDOL_idol_id_IDOL_idol_id` (`idol_id`),
  CONSTRAINT `FK_LIVE_IDOL_idol_id_IDOL_idol_id` FOREIGN KEY (`idol_id`) REFERENCES `IDOL` (`idol_id`),
  CONSTRAINT `FK_LIVE_IDOL_live_id_LIVE_live_id` FOREIGN KEY (`live_id`) REFERENCES `LIVE` (`live_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIVE_IDOL`
--

LOCK TABLES `LIVE_IDOL` WRITE;
/*!40000 ALTER TABLE `LIVE_IDOL` DISABLE KEYS */;
/*!40000 ALTER TABLE `LIVE_IDOL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIVE_PRODUCTION`
--

DROP TABLE IF EXISTS `LIVE_PRODUCTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LIVE_PRODUCTION` (
  `production_id` int(11) NOT NULL COMMENT '소속 ID',
  `live_id` int(11) NOT NULL COMMENT '라이브 ID',
  PRIMARY KEY (`production_id`,`live_id`),
  KEY `FK_LIVE_PRODUCTION_live_id_LIVE_live_id` (`live_id`),
  CONSTRAINT `FK_LIVE_PRODUCTION_live_id_LIVE_live_id` FOREIGN KEY (`live_id`) REFERENCES `LIVE` (`live_id`),
  CONSTRAINT `FK_LIVE_PRODUCTION_production_id_PRODUCTION_production_id` FOREIGN KEY (`production_id`) REFERENCES `PRODUCTION` (`production_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIVE_PRODUCTION`
--

LOCK TABLES `LIVE_PRODUCTION` WRITE;
/*!40000 ALTER TABLE `LIVE_PRODUCTION` DISABLE KEYS */;
/*!40000 ALTER TABLE `LIVE_PRODUCTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIVE_SONG_IDOL`
--

DROP TABLE IF EXISTS `LIVE_SONG_IDOL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LIVE_SONG_IDOL` (
  `song_id` int(11) NOT NULL COMMENT '곡 ID',
  `live_id` int(11) NOT NULL COMMENT '라이브 ID',
  `idol_id` int(11) NOT NULL COMMENT '아이돌 ID',
  PRIMARY KEY (`song_id`,`live_id`,`idol_id`),
  KEY `FK_LIVE_SONG_IDOL_live_id_LIVE_live_id` (`live_id`),
  KEY `FK_LIVE_SONG_IDOL_idol_id_IDOL_idol_id` (`idol_id`),
  CONSTRAINT `FK_LIVE_SONG_IDOL_idol_id_IDOL_idol_id` FOREIGN KEY (`idol_id`) REFERENCES `IDOL` (`idol_id`),
  CONSTRAINT `FK_LIVE_SONG_IDOL_live_id_LIVE_live_id` FOREIGN KEY (`live_id`) REFERENCES `LIVE` (`live_id`),
  CONSTRAINT `FK_LIVE_SONG_IDOL_song_id_SONG_song_id` FOREIGN KEY (`song_id`) REFERENCES `SONG` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIVE_SONG_IDOL`
--

LOCK TABLES `LIVE_SONG_IDOL` WRITE;
/*!40000 ALTER TABLE `LIVE_SONG_IDOL` DISABLE KEYS */;
/*!40000 ALTER TABLE `LIVE_SONG_IDOL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `LIVE_UNIT`
--

DROP TABLE IF EXISTS `LIVE_UNIT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `LIVE_UNIT` (
  `unit_id` int(11) NOT NULL COMMENT '유닛 ID',
  `live_id` int(11) NOT NULL COMMENT '라이브 ID',
  PRIMARY KEY (`unit_id`,`live_id`),
  KEY `FK_LIVE_UNIT_live_id_LIVE_live_id` (`live_id`),
  CONSTRAINT `FK_LIVE_UNIT_live_id_LIVE_live_id` FOREIGN KEY (`live_id`) REFERENCES `LIVE` (`live_id`),
  CONSTRAINT `FK_LIVE_UNIT_unit_id_UNIT_unit_id` FOREIGN KEY (`unit_id`) REFERENCES `UNIT` (`unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `LIVE_UNIT`
--

LOCK TABLES `LIVE_UNIT` WRITE;
/*!40000 ALTER TABLE `LIVE_UNIT` DISABLE KEYS */;
/*!40000 ALTER TABLE `LIVE_UNIT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `PLAYER_DATA_VIEW`
--

DROP TABLE IF EXISTS `PLAYER_DATA_VIEW`;
/*!50001 DROP VIEW IF EXISTS `PLAYER_DATA_VIEW`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `PLAYER_DATA_VIEW` AS SELECT 
 1 AS `song_id`,
 1 AS `song_title_kr`,
 1 AS `song_title_en`,
 1 AS `song_title_jp`,
 1 AS `album_id`,
 1 AS `production_id`,
 1 AS `song_type`,
 1 AS `song_color_type`,
 1 AS `song_fixed_color`,
 1 AS `song_bpm`,
 1 AS `song_delay`,
 1 AS `unit_id`,
 1 AS `unit_name_kr`,
 1 AS `unit_name_en`,
 1 AS `unit_name_jp`,
 1 AS `unit_color`,
 1 AS `unit_shown_color`,
 1 AS `idol_id`,
 1 AS `idol_name_kr`,
 1 AS `idol_name_en`,
 1 AS `idol_name_jp`,
 1 AS `idol_shown_color`,
 1 AS `idol_color`,
 1 AS `cv_id`,
 1 AS `cv_name_kr`,
 1 AS `cv_name_en`,
 1 AS `cv_name_jp`,
 1 AS `idol_order`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `PRODUCTION`
--

DROP TABLE IF EXISTS `PRODUCTION`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `PRODUCTION` (
  `production_id` int(11) NOT NULL COMMENT '소속 ID',
  `production_name_kr` varchar(45) DEFAULT NULL COMMENT '소속 이름(KR)',
  `production_name_en` varchar(45) DEFAULT NULL COMMENT '소속 이름(EN)',
  `production_name_jp` varchar(45) DEFAULT NULL COMMENT '소속 이름(JP)',
  `series_kr` varchar(45) DEFAULT NULL COMMENT '시리즈 제목(KR)',
  `series_en` varchar(45) DEFAULT NULL COMMENT '시리즈 제목(EN)',
  `series_jp` varchar(45) DEFAULT NULL COMMENT '시리즈 제목(JP)',
  `production_color` varchar(32) DEFAULT NULL,
  `production_number` int(11) DEFAULT NULL,
  `series_short_kr` varchar(32) DEFAULT NULL,
  `series_short_jp` varchar(32) DEFAULT NULL,
  `series_short_en` varchar(32) DEFAULT NULL,
  PRIMARY KEY (`production_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='소속';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `PRODUCTION`
--

LOCK TABLES `PRODUCTION` WRITE;
/*!40000 ALTER TABLE `PRODUCTION` DISABLE KEYS */;
INSERT INTO `PRODUCTION` VALUES (1,'765 프로덕션','765 Production',NULL,'아이돌마스터','THE IDOLM@STER','アイドルマスター','#f34e6e',765,'본가','本家','@'),(2,'346 프로덕션','346 pro','346','아이돌마스터 신데렐라 걸즈','THE IDOLM@STER CINDERELLA GIRLS','アイドルマスター シンデレラガールズ','#2582c8',346,'신데','シンデ','CG'),(3,'밀리','765 Production',NULL,'아이돌마스터 밀리언 라이브!','THE IDOLM@STER MILLION LIVE!','アイドルマスター ミリオンライブ！','#fec20a',765,'밀리','ミリ','ML'),(4,'315 프로덕션','315 Production',NULL,'아이돌마스터 SideM','THE IDOLM@STER SideM','アイドルマスター サイドエム','#11be93',315,'사엠','SM','SM'),(5,'샤니','283 pro',NULL,'아이돌마스터 샤이니 컬러즈','THE IDOLM@STER SHINY COLORS','アイドルマスター シャイニーカラーズ','#8dbafe',283,'샤니','シャニ','SC');
/*!40000 ALTER TABLE `PRODUCTION` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SONG`
--

DROP TABLE IF EXISTS `SONG`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SONG` (
  `song_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '곡 ID',
  `production_id` int(11) DEFAULT NULL COMMENT '소속 ID',
  `album_id` int(11) DEFAULT NULL COMMENT '앨범 ID',
  `song_title_kr` varchar(45) DEFAULT NULL COMMENT '곡 제목(KR)',
  `song_title_en` varchar(45) DEFAULT NULL COMMENT '곡 제목(EN)',
  `song_title_jp` varchar(45) DEFAULT NULL COMMENT '곡 제목(JP)',
  `song_duration` time DEFAULT NULL COMMENT '곡 재생시간',
  `song_is_unit` bit(1) DEFAULT NULL COMMENT '유닛곡인가',
  `song_color_type` int(11) DEFAULT NULL COMMENT '곡 색 타입',
  `song_fixed_color` varchar(45) DEFAULT NULL COMMENT '곡 고정색',
  `song_bpm` int(11) DEFAULT NULL,
  `song_type` int(11) DEFAULT NULL,
  `song_level` int(11) DEFAULT NULL,
  `song_delay` int(11) DEFAULT '0',
  PRIMARY KEY (`song_id`),
  KEY `FK_SONG_production_id_PRODUCTION_production_id` (`production_id`),
  KEY `FK_SONG_album_id_ALBUM_album_id` (`album_id`),
  CONSTRAINT `FK_SONG_album_id_ALBUM_album_id` FOREIGN KEY (`album_id`) REFERENCES `ALBUM` (`album_id`),
  CONSTRAINT `FK_SONG_production_id_PRODUCTION_production_id` FOREIGN KEY (`production_id`) REFERENCES `PRODUCTION` (`production_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COMMENT='곡';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SONG`
--

LOCK TABLES `SONG` WRITE;
/*!40000 ALTER TABLE `SONG` DISABLE KEYS */;
INSERT INTO `SONG` VALUES (1,3,1,'Happy Darling','Happy Darling',NULL,NULL,_binary '\0',0,NULL,374,0,2,NULL),(2,2,2,'OTAHEN 앤섬','OTAHEN Anthem','OTAHEN アンセム',NULL,_binary '\0',0,NULL,390,0,2,NULL),(3,5,3,'We can go now!','We can go now!',NULL,'00:00:00',_binary '',1,NULL,340,1,1,NULL),(4,5,4,'빛의 destination','Hikari no destination','ヒカリのdestination',NULL,_binary '',1,NULL,170,1,0,NULL),(5,3,5,'이스케이프','Escape','エスケープ',NULL,_binary '\0',0,NULL,NULL,2,1,NULL),(6,5,6,'꿈이 피는 After school','Yumesaki After school','夢咲きAfter school',NULL,_binary '',1,NULL,350,1,2,-100),(7,5,6,'태양 키스','Taiyou Kiss','太陽キッス',NULL,_binary '',1,NULL,354,1,2,NULL),(8,5,7,NULL,'Spread the Wings!!',NULL,NULL,NULL,1,NULL,340,3,0,NULL),(9,5,15,NULL,'SWEET♡STEP',NULL,NULL,NULL,2,'#ffc7c9',360,3,1,NULL),(10,5,11,'비치 브레이버','Beach Braver','太陽キッス',NULL,NULL,1,NULL,568,1,3,NULL);
/*!40000 ALTER TABLE `SONG` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `SONG_ALBUM_VIEW`
--

DROP TABLE IF EXISTS `SONG_ALBUM_VIEW`;
/*!50001 DROP VIEW IF EXISTS `SONG_ALBUM_VIEW`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `SONG_ALBUM_VIEW` AS SELECT 
 1 AS `song_id`,
 1 AS `production_id`,
 1 AS `album_id`,
 1 AS `song_title_kr`,
 1 AS `song_title_en`,
 1 AS `song_title_jp`,
 1 AS `song_duration`,
 1 AS `song_is_unit`,
 1 AS `song_color_type`,
 1 AS `song_fixed_color`,
 1 AS `song_bpm`,
 1 AS `song_type`,
 1 AS `song_level`,
 1 AS `album_release_date`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `SONG_DATA_VIEW`
--

DROP TABLE IF EXISTS `SONG_DATA_VIEW`;
/*!50001 DROP VIEW IF EXISTS `SONG_DATA_VIEW`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `SONG_DATA_VIEW` AS SELECT 
 1 AS `song_id`,
 1 AS `song_title_kr`,
 1 AS `song_title_en`,
 1 AS `song_title_jp`,
 1 AS `album_id`,
 1 AS `production_id`,
 1 AS `song_is_unit`,
 1 AS `song_color_type`,
 1 AS `song_fixed_color`,
 1 AS `song_bpm`,
 1 AS `unit_id`,
 1 AS `unit_name_kr`,
 1 AS `unit_name_en`,
 1 AS `unit_name_jp`,
 1 AS `unit_color`,
 1 AS `unit_shown_color`,
 1 AS `idol_id`,
 1 AS `idol_name_kr`,
 1 AS `idol_name_en`,
 1 AS `idol_name_jp`,
 1 AS `idol_shown_color`,
 1 AS `idol_color`,
 1 AS `cv_id`,
 1 AS `cv_name_kr`,
 1 AS `cv_name_en`,
 1 AS `cv_name_jp`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `SONG_IDOL`
--

DROP TABLE IF EXISTS `SONG_IDOL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SONG_IDOL` (
  `song_id` int(11) NOT NULL COMMENT '곡 ID',
  `idol_id` int(11) NOT NULL COMMENT '아이돌 ID',
  PRIMARY KEY (`song_id`,`idol_id`),
  KEY `FK_SONG_IDOL_idol_id_IDOL_idol_id` (`idol_id`),
  CONSTRAINT `FK_SONG_IDOL_idol_id_IDOL_idol_id` FOREIGN KEY (`idol_id`) REFERENCES `IDOL` (`idol_id`),
  CONSTRAINT `FK_SONG_IDOL_song_id_SONG_song_id` FOREIGN KEY (`song_id`) REFERENCES `SONG` (`song_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SONG_IDOL`
--

LOCK TABLES `SONG_IDOL` WRITE;
/*!40000 ALTER TABLE `SONG_IDOL` DISABLE KEYS */;
INSERT INTO `SONG_IDOL` VALUES (1,1),(2,2),(5,6),(5,7);
/*!40000 ALTER TABLE `SONG_IDOL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `SONG_UNIT`
--

DROP TABLE IF EXISTS `SONG_UNIT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `SONG_UNIT` (
  `song_id` int(11) NOT NULL COMMENT '곡 ID',
  `unit_id` int(11) NOT NULL COMMENT '유닛 ID',
  PRIMARY KEY (`song_id`,`unit_id`),
  KEY `FK_SONG_UNIT_unit_id_UNIT_unit_id` (`unit_id`),
  CONSTRAINT `FK_SONG_UNIT_song_id_SONG_song_id` FOREIGN KEY (`song_id`) REFERENCES `SONG` (`song_id`),
  CONSTRAINT `FK_SONG_UNIT_unit_id_UNIT_unit_id` FOREIGN KEY (`unit_id`) REFERENCES `UNIT` (`unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `SONG_UNIT`
--

LOCK TABLES `SONG_UNIT` WRITE;
/*!40000 ALTER TABLE `SONG_UNIT` DISABLE KEYS */;
INSERT INTO `SONG_UNIT` VALUES (3,1),(4,1),(6,2),(7,2),(10,2),(8,3),(9,3);
/*!40000 ALTER TABLE `SONG_UNIT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary table structure for view `SONG_UNIT_IDOL_CV_VIEW`
--

DROP TABLE IF EXISTS `SONG_UNIT_IDOL_CV_VIEW`;
/*!50001 DROP VIEW IF EXISTS `SONG_UNIT_IDOL_CV_VIEW`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `SONG_UNIT_IDOL_CV_VIEW` AS SELECT 
 1 AS `song_id`,
 1 AS `song_title_kr`,
 1 AS `song_title_en`,
 1 AS `song_title_jp`,
 1 AS `album_id`,
 1 AS `production_id`,
 1 AS `unit_id`,
 1 AS `unit_name_kr`,
 1 AS `unit_name_en`,
 1 AS `unit_name_jp`,
 1 AS `idol_id`,
 1 AS `idol_name_kr`,
 1 AS `idol_name_en`,
 1 AS `idol_name_jp`,
 1 AS `cv_id`,
 1 AS `cv_name_kr`,
 1 AS `cv_name_en`,
 1 AS `cv_name_jp`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary table structure for view `SONG_UNIT_VIEW`
--

DROP TABLE IF EXISTS `SONG_UNIT_VIEW`;
/*!50001 DROP VIEW IF EXISTS `SONG_UNIT_VIEW`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `SONG_UNIT_VIEW` AS SELECT 
 1 AS `unit_id`,
 1 AS `production_id`,
 1 AS `song_id`,
 1 AS `album_id`,
 1 AS `song_title_kr`,
 1 AS `song_title_en`,
 1 AS `song_title_jp`,
 1 AS `song_duration`,
 1 AS `song_is_unit`,
 1 AS `song_color_type`,
 1 AS `song_fixed_color`,
 1 AS `song_bpm`,
 1 AS `unit_name_kr`,
 1 AS `unit_name_en`,
 1 AS `unit_name_jp`,
 1 AS `unit_color`,
 1 AS `unit_shown_color`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `UNIT`
--

DROP TABLE IF EXISTS `UNIT`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UNIT` (
  `unit_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '유닛 ID',
  `production_id` int(11) DEFAULT NULL COMMENT '소속 ID',
  `unit_name_kr` varchar(45) DEFAULT NULL COMMENT '유닛 이름(KR)',
  `unit_name_en` varchar(45) DEFAULT NULL COMMENT '유닛 이름(EN)',
  `unit_name_jp` varchar(45) DEFAULT NULL COMMENT '유닛 이름(JP)',
  `unit_color` varchar(45) DEFAULT NULL COMMENT '유닛 색',
  `unit_shown_color` varchar(45) DEFAULT NULL COMMENT '유닛 시각 색',
  PRIMARY KEY (`unit_id`),
  KEY `FK_UNIT_production_id_PRODUCTION_production_id` (`production_id`),
  CONSTRAINT `FK_UNIT_production_id_PRODUCTION_production_id` FOREIGN KEY (`production_id`) REFERENCES `PRODUCTION` (`production_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='유닛';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UNIT`
--

LOCK TABLES `UNIT` WRITE;
/*!40000 ALTER TABLE `UNIT` DISABLE KEYS */;
INSERT INTO `UNIT` VALUES (1,5,'illumination STARS','illumination STARS',NULL,'#FFFF7B','#FFFF7B'),(2,5,'방과 후 클라이맥스 걸즈','Houkago Climax Girls','放課後クライマックスガールズ','#fc7b03','#fc7b03'),(3,5,'샤이니 컬러즈','Shiny Colors','シャイニーカラーズ','#8dbafe','#8dbafe');
/*!40000 ALTER TABLE `UNIT` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `UNIT_IDOL`
--

DROP TABLE IF EXISTS `UNIT_IDOL`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `UNIT_IDOL` (
  `unit_id` int(11) NOT NULL COMMENT '유닛 ID',
  `idol_id` int(11) NOT NULL COMMENT '아이돌 ID',
  `idol_order` int(11) DEFAULT NULL,
  PRIMARY KEY (`unit_id`,`idol_id`),
  KEY `FK_UNIT_IDOL_idol_id_IDOL_idol_id` (`idol_id`),
  CONSTRAINT `FK_UNIT_IDOL_idol_id_IDOL_idol_id` FOREIGN KEY (`idol_id`) REFERENCES `IDOL` (`idol_id`),
  CONSTRAINT `FK_UNIT_IDOL_unit_id_UNIT_unit_id` FOREIGN KEY (`unit_id`) REFERENCES `UNIT` (`unit_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `UNIT_IDOL`
--

LOCK TABLES `UNIT_IDOL` WRITE;
/*!40000 ALTER TABLE `UNIT_IDOL` DISABLE KEYS */;
INSERT INTO `UNIT_IDOL` VALUES (1,3,1),(1,4,0),(1,5,2),(2,8,2),(2,9,1),(2,10,3),(2,11,0),(2,12,4);
/*!40000 ALTER TABLE `UNIT_IDOL` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Final view structure for view `PLAYER_DATA_VIEW`
--

/*!50001 DROP VIEW IF EXISTS `PLAYER_DATA_VIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`forConnect`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `PLAYER_DATA_VIEW` AS select `s`.`song_id` AS `song_id`,`s`.`song_title_kr` AS `song_title_kr`,`s`.`song_title_en` AS `song_title_en`,`s`.`song_title_jp` AS `song_title_jp`,`s`.`album_id` AS `album_id`,`s`.`production_id` AS `production_id`,`s`.`song_type` AS `song_type`,`s`.`song_color_type` AS `song_color_type`,`s`.`song_fixed_color` AS `song_fixed_color`,`s`.`song_bpm` AS `song_bpm`,`s`.`song_delay` AS `song_delay`,`u`.`unit_id` AS `unit_id`,`u`.`unit_name_kr` AS `unit_name_kr`,`u`.`unit_name_en` AS `unit_name_en`,`u`.`unit_name_jp` AS `unit_name_jp`,`u`.`unit_color` AS `unit_color`,`u`.`unit_shown_color` AS `unit_shown_color`,`i`.`idol_id` AS `idol_id`,`i`.`idol_name_kr` AS `idol_name_kr`,`i`.`idol_name_en` AS `idol_name_en`,`i`.`idol_name_jp` AS `idol_name_jp`,`i`.`idol_shown_color` AS `idol_shown_color`,`i`.`idol_color` AS `idol_color`,`c`.`cv_id` AS `cv_id`,`c`.`cv_name_kr` AS `cv_name_kr`,`c`.`cv_name_en` AS `cv_name_en`,`c`.`cv_name_jp` AS `cv_name_jp`,`ui`.`idol_order` AS `idol_order` from ((((((`SONG` `s` left join `SONG_IDOL` `si` on((`s`.`song_id` = `si`.`song_id`))) left join `SONG_UNIT` `su` on((`s`.`song_id` = `su`.`song_id`))) left join `UNIT_IDOL` `ui` on((`su`.`unit_id` = `ui`.`unit_id`))) left join `UNIT` `u` on((`su`.`unit_id` = `u`.`unit_id`))) left join `IDOL` `i` on(((`si`.`idol_id` = `i`.`idol_id`) or (`ui`.`idol_id` = `i`.`idol_id`)))) left join `CV` `c` on((`i`.`idol_id` = `c`.`idol_id`))) order by `ui`.`idol_order` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SONG_ALBUM_VIEW`
--

/*!50001 DROP VIEW IF EXISTS `SONG_ALBUM_VIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`forConnect`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `SONG_ALBUM_VIEW` AS select `SONG`.`song_id` AS `song_id`,`SONG`.`production_id` AS `production_id`,`SONG`.`album_id` AS `album_id`,`SONG`.`song_title_kr` AS `song_title_kr`,`SONG`.`song_title_en` AS `song_title_en`,`SONG`.`song_title_jp` AS `song_title_jp`,`SONG`.`song_duration` AS `song_duration`,`SONG`.`song_is_unit` AS `song_is_unit`,`SONG`.`song_color_type` AS `song_color_type`,`SONG`.`song_fixed_color` AS `song_fixed_color`,`SONG`.`song_bpm` AS `song_bpm`,`SONG`.`song_type` AS `song_type`,`SONG`.`song_level` AS `song_level`,`ALBUM`.`album_release_date` AS `album_release_date` from (`SONG` join `ALBUM` on((`SONG`.`album_id` = `ALBUM`.`album_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SONG_DATA_VIEW`
--

/*!50001 DROP VIEW IF EXISTS `SONG_DATA_VIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`forConnect`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `SONG_DATA_VIEW` AS select `s`.`song_id` AS `song_id`,`s`.`song_title_kr` AS `song_title_kr`,`s`.`song_title_en` AS `song_title_en`,`s`.`song_title_jp` AS `song_title_jp`,`s`.`album_id` AS `album_id`,`s`.`production_id` AS `production_id`,`s`.`song_is_unit` AS `song_is_unit`,`s`.`song_color_type` AS `song_color_type`,`s`.`song_fixed_color` AS `song_fixed_color`,`s`.`song_bpm` AS `song_bpm`,`u`.`unit_id` AS `unit_id`,`u`.`unit_name_kr` AS `unit_name_kr`,`u`.`unit_name_en` AS `unit_name_en`,`u`.`unit_name_jp` AS `unit_name_jp`,`u`.`unit_color` AS `unit_color`,`u`.`unit_shown_color` AS `unit_shown_color`,`i`.`idol_id` AS `idol_id`,`i`.`idol_name_kr` AS `idol_name_kr`,`i`.`idol_name_en` AS `idol_name_en`,`i`.`idol_name_jp` AS `idol_name_jp`,`i`.`idol_shown_color` AS `idol_shown_color`,`i`.`idol_color` AS `idol_color`,`c`.`cv_id` AS `cv_id`,`c`.`cv_name_kr` AS `cv_name_kr`,`c`.`cv_name_en` AS `cv_name_en`,`c`.`cv_name_jp` AS `cv_name_jp` from (((((`SONG` `s` left join `SONG_IDOL` `si` on((`s`.`song_id` = `si`.`song_id`))) left join `SONG_UNIT` `su` on((`s`.`song_id` = `su`.`song_id`))) left join `UNIT` `u` on((`su`.`unit_id` = `u`.`unit_id`))) left join `IDOL` `i` on((`si`.`idol_id` = `i`.`idol_id`))) left join `CV` `c` on((`i`.`idol_id` = `c`.`idol_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SONG_UNIT_IDOL_CV_VIEW`
--

/*!50001 DROP VIEW IF EXISTS `SONG_UNIT_IDOL_CV_VIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`forConnect`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `SONG_UNIT_IDOL_CV_VIEW` AS select `s`.`song_id` AS `song_id`,`s`.`song_title_kr` AS `song_title_kr`,`s`.`song_title_en` AS `song_title_en`,`s`.`song_title_jp` AS `song_title_jp`,`s`.`album_id` AS `album_id`,`s`.`production_id` AS `production_id`,`u`.`unit_id` AS `unit_id`,`u`.`unit_name_kr` AS `unit_name_kr`,`u`.`unit_name_en` AS `unit_name_en`,`u`.`unit_name_jp` AS `unit_name_jp`,`i`.`idol_id` AS `idol_id`,`i`.`idol_name_kr` AS `idol_name_kr`,`i`.`idol_name_en` AS `idol_name_en`,`i`.`idol_name_jp` AS `idol_name_jp`,`c`.`cv_id` AS `cv_id`,`c`.`cv_name_kr` AS `cv_name_kr`,`c`.`cv_name_en` AS `cv_name_en`,`c`.`cv_name_jp` AS `cv_name_jp` from (((((`SONG_UNIT` `su` left join `SONG` `s` on((`s`.`song_id` = `su`.`song_id`))) left join `UNIT` `u` on((`u`.`unit_id` = `su`.`unit_id`))) left join `UNIT_IDOL` `ui` on((`ui`.`unit_id` = `su`.`unit_id`))) left join `IDOL` `i` on((`ui`.`idol_id` = `i`.`idol_id`))) left join `CV` `c` on((`i`.`idol_id` = `c`.`idol_id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `SONG_UNIT_VIEW`
--

/*!50001 DROP VIEW IF EXISTS `SONG_UNIT_VIEW`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`forConnect`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `SONG_UNIT_VIEW` AS select `SONG_UNIT`.`unit_id` AS `unit_id`,`SONG`.`production_id` AS `production_id`,`SONG_UNIT`.`song_id` AS `song_id`,`SONG`.`album_id` AS `album_id`,`SONG`.`song_title_kr` AS `song_title_kr`,`SONG`.`song_title_en` AS `song_title_en`,`SONG`.`song_title_jp` AS `song_title_jp`,`SONG`.`song_duration` AS `song_duration`,`SONG`.`song_is_unit` AS `song_is_unit`,`SONG`.`song_color_type` AS `song_color_type`,`SONG`.`song_fixed_color` AS `song_fixed_color`,`SONG`.`song_bpm` AS `song_bpm`,`UNIT`.`unit_name_kr` AS `unit_name_kr`,`UNIT`.`unit_name_en` AS `unit_name_en`,`UNIT`.`unit_name_jp` AS `unit_name_jp`,`UNIT`.`unit_color` AS `unit_color`,`UNIT`.`unit_shown_color` AS `unit_shown_color` from ((`SONG_UNIT` join `SONG` on((`SONG_UNIT`.`song_id` = `SONG`.`song_id`))) join `UNIT` on(((`SONG_UNIT`.`unit_id` = `UNIT`.`unit_id`) and (`SONG`.`production_id` = `UNIT`.`production_id`)))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-15 12:13:14
