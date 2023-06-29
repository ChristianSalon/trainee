-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: trainee
-- ------------------------------------------------------
-- Server version	8.0.29-0ubuntu0.22.04.2

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `eventId` varchar(50) NOT NULL,
  `isComing` tinyint(1) NOT NULL DEFAULT '0',
  `date` datetime NOT NULL,
  `excuseNote` text,
  PRIMARY KEY (`id`),
  KEY `eventId` (`eventId`),
  KEY `userId` (`userId`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`),
  CONSTRAINT `attendance_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'HZVm04WIs4aVriRAQBbeKDhnYGI2','2NV5eAI2Ozf1PF7WZmLm',1,'2022-02-24 13:47:38',NULL),(2,'HZVm04WIs4aVriRAQBbeKDhnYGI2','4Wc9Qi9qJkz5z9kURGZk',1,'2022-02-04 13:49:17',NULL),(3,'HZVm04WIs4aVriRAQBbeKDhnYGI2','CSYIITKHBZ8KXJJROUvm',0,'2022-05-07 13:49:05','Lebo'),(4,'HZVm04WIs4aVriRAQBbeKDhnYGI2','j4nRb9cVygl30dYlScsG',1,'2022-05-09 19:08:54',NULL),(5,'HZVm04WIs4aVriRAQBbeKDhnYGI2','uD7hh4sK5AfZefRSwKYD',0,'2022-05-07 15:20:00','efgw'),(11,'tvbGeddB3AOrwkDKy98KuFqrJF23','Vk7YtpamnesegvmmJnzG',0,'2022-05-10 19:08:38','Because Chuck!'),(12,'HZVm04WIs4aVriRAQBbeKDhnYGI2','T0aZLcWbuxcfwHpBYzvA',1,'2022-05-14 15:28:14',NULL),(13,'2xa7pVtzUNUfgOizc6supYef5CW2','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 15:28:14',NULL),(14,'Pfwqan634HSoODTZG3XPqrBB9ig2','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 16:28:14',NULL),(15,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 17:28:14',NULL),(16,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 18:28:14',NULL),(17,'amxC49g9mbbBD87hvZ1rfHjADSg2','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 19:28:14',NULL),(18,'w1CuyisrsZNzUOBzAXWO5U1rb6f2','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 10:28:14',NULL),(19,'FXvbnl8Ph4XUMavKUcBiqDJ83P53','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 11:28:14',NULL),(20,'vB1ctMWoNYayUNl8iFig00vJosr2','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 12:28:14',NULL),(21,'a2tjiNLXjTbBarlCpozRmvD9bUD3','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 13:28:14',NULL),(22,'qZgjRBE5dZMKY7ds8df7EYJh7l92','FxtB1nVs8YWnH7pquwLT',1,'2022-05-14 14:28:14',NULL),(24,'tvbGeddB3AOrwkDKy98KuFqrJF23','FxtB1nVs8YWnH7pquwLT',1,'2022-05-17 06:30:27',NULL),(25,'HZVm04WIs4aVriRAQBbeKDhnYGI2','FxtB1nVs8YWnH7pquwLT',1,'2022-05-16 16:40:05',NULL),(26,'2xa7pVtzUNUfgOizc6supYef5CW2','NxuqcmPXFT5uLRbWl0Nw',1,'2022-05-14 15:28:14',NULL),(27,'Pfwqan634HSoODTZG3XPqrBB9ig2','NxuqcmPXFT5uLRbWl0Nw',1,'2022-05-14 16:28:14',NULL),(28,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2','NxuqcmPXFT5uLRbWl0Nw',1,'2022-05-14 17:28:14',NULL),(29,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2','NxuqcmPXFT5uLRbWl0Nw',1,'2022-05-14 18:28:14',NULL),(30,'amxC49g9mbbBD87hvZ1rfHjADSg2','NxuqcmPXFT5uLRbWl0Nw',1,'2022-05-14 19:28:14',NULL),(31,'w1CuyisrsZNzUOBzAXWO5U1rb6f2','NxuqcmPXFT5uLRbWl0Nw',1,'2022-05-14 10:28:14',NULL),(32,'FXvbnl8Ph4XUMavKUcBiqDJ83P53','NxuqcmPXFT5uLRbWl0Nw',0,'2022-05-14 11:28:14','Choroba'),(33,'vB1ctMWoNYayUNl8iFig00vJosr2','NxuqcmPXFT5uLRbWl0Nw',0,'2022-05-14 12:28:14','Choroba'),(34,'a2tjiNLXjTbBarlCpozRmvD9bUD3','NxuqcmPXFT5uLRbWl0Nw',0,'2022-05-14 13:28:14','Škola'),(35,'qZgjRBE5dZMKY7ds8df7EYJh7l92','NxuqcmPXFT5uLRbWl0Nw',0,'2022-05-14 14:28:14','Škola'),(36,'2xa7pVtzUNUfgOizc6supYef5CW2','l1XuSDwmFIMGwWES9kxE',1,'2022-05-14 15:28:14',NULL),(37,'Pfwqan634HSoODTZG3XPqrBB9ig2','l1XuSDwmFIMGwWES9kxE',1,'2022-05-14 16:28:14',NULL),(38,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2','l1XuSDwmFIMGwWES9kxE',1,'2022-05-14 17:28:14',NULL),(39,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2','l1XuSDwmFIMGwWES9kxE',1,'2022-05-14 18:28:14',NULL),(40,'amxC49g9mbbBD87hvZ1rfHjADSg2','l1XuSDwmFIMGwWES9kxE',1,'2022-05-14 19:28:14',NULL),(41,'w1CuyisrsZNzUOBzAXWO5U1rb6f2','l1XuSDwmFIMGwWES9kxE',1,'2022-05-14 10:28:14',NULL),(42,'FXvbnl8Ph4XUMavKUcBiqDJ83P53','l1XuSDwmFIMGwWES9kxE',0,'2022-05-14 11:28:14','Choroba'),(43,'vB1ctMWoNYayUNl8iFig00vJosr2','l1XuSDwmFIMGwWES9kxE',0,'2022-05-14 12:28:14','Choroba'),(44,'a2tjiNLXjTbBarlCpozRmvD9bUD3','l1XuSDwmFIMGwWES9kxE',0,'2022-05-14 13:28:14','Škola'),(45,'qZgjRBE5dZMKY7ds8df7EYJh7l92','l1XuSDwmFIMGwWES9kxE',0,'2022-05-14 14:28:14','Škola'),(46,'2xa7pVtzUNUfgOizc6supYef5CW2','K01vQKlCqNdN7MRpNAWC',1,'2022-05-14 15:28:14',NULL),(47,'Pfwqan634HSoODTZG3XPqrBB9ig2','K01vQKlCqNdN7MRpNAWC',1,'2022-05-14 16:28:14',NULL),(48,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2','K01vQKlCqNdN7MRpNAWC',1,'2022-05-14 17:28:14',NULL),(49,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2','K01vQKlCqNdN7MRpNAWC',1,'2022-05-14 18:28:14',NULL),(50,'amxC49g9mbbBD87hvZ1rfHjADSg2','K01vQKlCqNdN7MRpNAWC',1,'2022-05-14 19:28:14',NULL),(51,'w1CuyisrsZNzUOBzAXWO5U1rb6f2','K01vQKlCqNdN7MRpNAWC',1,'2022-05-14 10:28:14',NULL),(52,'FXvbnl8Ph4XUMavKUcBiqDJ83P53','K01vQKlCqNdN7MRpNAWC',0,'2022-05-14 11:28:14','Choroba'),(53,'vB1ctMWoNYayUNl8iFig00vJosr2','K01vQKlCqNdN7MRpNAWC',0,'2022-05-14 12:28:14','Choroba'),(54,'a2tjiNLXjTbBarlCpozRmvD9bUD3','K01vQKlCqNdN7MRpNAWC',0,'2022-05-14 13:28:14','Škola'),(55,'qZgjRBE5dZMKY7ds8df7EYJh7l92','K01vQKlCqNdN7MRpNAWC',0,'2022-05-14 14:28:14','Škola'),(56,'HZVm04WIs4aVriRAQBbeKDhnYGI2','NxuqcmPXFT5uLRbWl0Nw',1,'2022-05-16 08:44:34',NULL),(57,'HZVm04WIs4aVriRAQBbeKDhnYGI2','WABaJ72v2mltY3aY8i3V',1,'2022-05-21 07:55:00',NULL),(58,'HZVm04WIs4aVriRAQBbeKDhnYGI2','qbT855UQZEerjYMlXZ4L',1,'2022-06-18 08:53:03',NULL);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`chris`@`localhost`*/ /*!50003 TRIGGER `attendanceInserted` AFTER INSERT ON `attendance` FOR EACH ROW BEGIN
	DECLARE _attendanceNumber SMALLINT;
	SELECT attendanceNumber INTO _attendanceNumber FROM events WHERE eventId = NEW.eventId;
	IF (NEW.isComing) THEN
		SET _attendanceNumber = _attendanceNumber + 1;
	END IF;
	UPDATE events SET attendanceNumber = _attendanceNumber WHERE eventId = NEW.eventId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`chris`@`localhost`*/ /*!50003 TRIGGER `attendanceUpdated` AFTER UPDATE ON `attendance` FOR EACH ROW BEGIN
	DECLARE _attendanceNumber SMALLINT;
	IF NEW.isComing != OLD.isComing THEN
		SELECT attendanceNumber INTO _attendanceNumber FROM events WHERE eventId = NEW.eventId;
		IF NEW.isComing = true THEN
			SET _attendanceNumber = _attendanceNumber + 1;
		ELSE
			SET _attendanceNumber = _attendanceNumber - 1;
	   END IF;
		UPDATE events SET attendanceNumber = _attendanceNumber WHERE eventId = NEW.eventId;
	END IF;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clubs` (
  `clubId` varchar(50) NOT NULL,
  `name` text NOT NULL,
  `photoURL` text NOT NULL,
  `accountId` varchar(100) DEFAULT NULL,
  `isAccountSetUp` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`clubId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs`
--

LOCK TABLES `clubs` WRITE;
/*!40000 ALTER TABLE `clubs` DISABLE KEYS */;
INSERT INTO `clubs` VALUES ('1NXdi1KhgMhHrrSu7m3g','Arizona Coyotes','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2F1NXdi1KhgMhHrrSu7m3g?alt=media&token=f65c9bf9-d032-4871-8368-f9b09e3db291','acct_1KsOtLBBr1an5pQz',1),('GsNAtaoCDboBZh2VQTf4','Indianapolis Colts','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FR8ioquIKepp7lVMOs8jM.png?alt=media&token=0bdabc5f-ec05-4a92-abe5-4b3b864ebc4f',NULL,0),('tBzkJLT7XE9E9mvZ4zQA','FBC Mikuláš Prešov','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FaQtYSI4Xr16ypOGBzeYH.png?alt=media&token=5e715e04-50d7-49bb-ab9f-176effda98f4','acct_1Kzk3cPU21FvbSbv',1),('urI3ZiiUl3yCoFnEBtZJ','Redbull Racing Honda F1 Team','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FurI3ZiiUl3yCoFnEBtZJ?alt=media&token=2154338e-7c7d-4035-a6b6-c6d19bfcf560','acct_1KwliQB1ijeEOadj',1);
/*!40000 ALTER TABLE `clubs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clubs_users`
--

DROP TABLE IF EXISTS `clubs_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clubs_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clubId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `role` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clubId` (`clubId`),
  KEY `userId` (`userId`),
  CONSTRAINT `clubs_users_ibfk_1` FOREIGN KEY (`clubId`) REFERENCES `clubs` (`clubId`),
  CONSTRAINT `clubs_users_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs_users`
--

LOCK TABLES `clubs_users` WRITE;
/*!40000 ALTER TABLE `clubs_users` DISABLE KEYS */;
INSERT INTO `clubs_users` VALUES (6,'urI3ZiiUl3yCoFnEBtZJ','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(9,'1NXdi1KhgMhHrrSu7m3g','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(15,'tBzkJLT7XE9E9mvZ4zQA','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER');
/*!40000 ALTER TABLE `clubs_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `eventId` varchar(50) NOT NULL,
  `name` text NOT NULL,
  `details` text,
  `attendanceNumber` smallint NOT NULL,
  `location` text NOT NULL,
  `startTime` text NOT NULL,
  `endTime` text NOT NULL,
  `startDate` datetime NOT NULL,
  `endDate` datetime NOT NULL,
  PRIMARY KEY (`eventId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES ('2NV5eAI2Ozf1PF7WZmLm','Predzapasovy trening v novej modernej hale...','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',1,'Mestska hala PO','11:00','12:30','2021-12-15 11:00:00','2021-12-15 12:30:00'),('4Wc9Qi9qJkz5z9kURGZk','Trening po korone s MAXOM!',NULL,0,'ZŠ Sibírska','18:00','19:30','2022-01-07 18:00:00','2022-01-07 19:30:00'),('CSYIITKHBZ8KXJJROUvm','Trening na Ľudmily 2','Nezabudnite zobrať niečo',0,'Ľudmila Podjavorinska','18:00','19:30','2022-02-22 17:00:00','2022-02-23 18:30:00'),('FxtB1nVs8YWnH7pquwLT','Trening Sibírska',NULL,12,'ZŠ Sibírska','18:00','20:00','2022-05-16 16:00:00','2022-05-16 18:00:00'),('iQAUUdbbb3aWZztVYObM','Posilka',NULL,0,'ZŠ Sibírska','17:15','18:30','2022-05-27 15:15:00','2022-05-27 16:30:00'),('j4nRb9cVygl30dYlScsG','Trening na Ľudmily 3',NULL,1,'Ľudmila Podjavorinska','12:00','13:30','2022-02-22 11:00:00','2022-02-22 12:30:00'),('K01vQKlCqNdN7MRpNAWC','Tréning Sibírska','Zmena času.',6,'ZŠ Sibírska','19:00','21:30','2022-05-30 17:00:00','2022-05-30 19:30:00'),('l1XuSDwmFIMGwWES9kxE','Posilka',NULL,6,'ZŠ Sibírska','17:15','18:30','2022-05-20 15:15:00','2022-05-20 16:30:00'),('NxuqcmPXFT5uLRbWl0Nw','Trening Sibírska','Nezabudnite doniesť niečo.',7,'ZŠ Sibírska','18:30','20:30','2022-05-18 16:30:00','2022-05-18 18:30:00'),('qbT855UQZEerjYMlXZ4L','Tréning Sibírska',NULL,1,'ZŠ Sibírska','18:30','20:30','2022-05-25 16:30:00','2022-05-25 18:30:00'),('T0aZLcWbuxcfwHpBYzvA','Relagation game 1',NULL,1,'Phoenix, Arizona','20:30','23:00','2022-05-14 18:30:00','2022-05-14 21:00:00'),('u1poLS5CJDwZ2xNxp87C','Bahrain',NULL,0,'Shakir','15:00','17:00','2022-03-27 13:00:00','2022-03-27 15:00:00'),('uD7hh4sK5AfZefRSwKYD','Trening na Ľudmily',NULL,0,'Ľudmila Podjavorinska','19:30','21:00','2022-02-22 19:30:00','2022-02-22 21:00:00'),('uS4Mjj1t0PGWAquooHGw','Aussie GP',NULL,0,'Austrália','15:00','17:00','2022-04-07 13:00:00','2022-04-07 15:00:00'),('Vk7YtpamnesegvmmJnzG','Miami GP',NULL,0,'Hard Rock','19:00','23:00','2022-05-07 17:00:00','2022-05-08 21:00:00'),('WABaJ72v2mltY3aY8i3V','Tréning Sibírska',NULL,1,'ZŠ Sibírska','18:00','20:00','2022-05-23 16:00:00','2022-05-23 18:00:00'),('Z7FrJBn2xtjl5UkfKWIW','Imola Training',NULL,0,'Imola, Italy','20:00','23:00','2022-04-23 18:00:00','2022-04-23 21:00:00');
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events_teams`
--

DROP TABLE IF EXISTS `events_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events_teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamId` varchar(50) NOT NULL,
  `eventId` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teamId` (`teamId`),
  KEY `eventId` (`eventId`),
  CONSTRAINT `events_teams_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`),
  CONSTRAINT `events_teams_ibfk_2` FOREIGN KEY (`eventId`) REFERENCES `events` (`eventId`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_teams`
--

LOCK TABLES `events_teams` WRITE;
/*!40000 ALTER TABLE `events_teams` DISABLE KEYS */;
INSERT INTO `events_teams` VALUES (1,'aQtYSI4Xr16ypOGBzeYH','2NV5eAI2Ozf1PF7WZmLm'),(2,'aQtYSI4Xr16ypOGBzeYH','4Wc9Qi9qJkz5z9kURGZk'),(3,'TWsAkjtqo9GqGtudyL5M','4Wc9Qi9qJkz5z9kURGZk'),(4,'aQtYSI4Xr16ypOGBzeYH','uD7hh4sK5AfZefRSwKYD'),(5,'aQtYSI4Xr16ypOGBzeYH','CSYIITKHBZ8KXJJROUvm'),(6,'aQtYSI4Xr16ypOGBzeYH','j4nRb9cVygl30dYlScsG'),(7,'TWsAkjtqo9GqGtudyL5M','u1poLS5CJDwZ2xNxp87C'),(8,'iRm3uMD2W5ebOQPwlck9','uS4Mjj1t0PGWAquooHGw'),(9,'iRm3uMD2W5ebOQPwlck9','Z7FrJBn2xtjl5UkfKWIW'),(10,'TWsAkjtqo9GqGtudyL5M','Z7FrJBn2xtjl5UkfKWIW'),(11,'iRm3uMD2W5ebOQPwlck9','Vk7YtpamnesegvmmJnzG'),(12,'TWsAkjtqo9GqGtudyL5M','Vk7YtpamnesegvmmJnzG'),(13,'2EWG2hJBCXjywPYCbzlE','T0aZLcWbuxcfwHpBYzvA'),(14,'KTGXyDq7bn5MiLtYKBEA','T0aZLcWbuxcfwHpBYzvA'),(15,'aQtYSI4Xr16ypOGBzeYH','FxtB1nVs8YWnH7pquwLT'),(16,'aQtYSI4Xr16ypOGBzeYH','NxuqcmPXFT5uLRbWl0Nw'),(17,'htBX1cjotWDtTc3QZ1CC','NxuqcmPXFT5uLRbWl0Nw'),(18,'aQtYSI4Xr16ypOGBzeYH','WABaJ72v2mltY3aY8i3V'),(19,'aQtYSI4Xr16ypOGBzeYH','qbT855UQZEerjYMlXZ4L'),(20,'htBX1cjotWDtTc3QZ1CC','qbT855UQZEerjYMlXZ4L'),(21,'aQtYSI4Xr16ypOGBzeYH','K01vQKlCqNdN7MRpNAWC'),(22,'aQtYSI4Xr16ypOGBzeYH','l1XuSDwmFIMGwWES9kxE'),(23,'aQtYSI4Xr16ypOGBzeYH','iQAUUdbbb3aWZztVYObM');
/*!40000 ALTER TABLE `events_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notification_tokens`
--

DROP TABLE IF EXISTS `notification_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notification_tokens` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `token` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `notification_tokens_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notification_tokens`
--

LOCK TABLES `notification_tokens` WRITE;
/*!40000 ALTER TABLE `notification_tokens` DISABLE KEYS */;
INSERT INTO `notification_tokens` VALUES (6,'HZVm04WIs4aVriRAQBbeKDhnYGI2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(7,'tvbGeddB3AOrwkDKy98KuFqrJF23','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(8,'vB1ctMWoNYayUNl8iFig00vJosr2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(9,'FXvbnl8Ph4XUMavKUcBiqDJ83P53','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(10,'w1CuyisrsZNzUOBzAXWO5U1rb6f2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(11,'amxC49g9mbbBD87hvZ1rfHjADSg2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(12,'PqsjaZslkbgIKOkBxcpWZHc0WGg1','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(13,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(14,'2xa7pVtzUNUfgOizc6supYef5CW2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(15,'Pfwqan634HSoODTZG3XPqrBB9ig2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(16,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(17,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(18,'I9Htda9sxZhb37hsxDSCPw7vbWg2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(19,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(20,'a2tjiNLXjTbBarlCpozRmvD9bUD3','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]'),(21,'qZgjRBE5dZMKY7ds8df7EYJh7l92','ExponentPushToken[R_tYbfN7oVrLs146RN2znT]');
/*!40000 ALTER TABLE `notification_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `paymentId` int NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `details` text,
  `amount` decimal(7,2) NOT NULL,
  `createdAt` date NOT NULL,
  `dueDate` date NOT NULL,
  PRIMARY KEY (`paymentId`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (7,'Relagation fees','Babababababab',0.50,'2022-04-25','2022-04-29'),(18,'Feesss',NULL,0.52,'2022-04-28','2022-04-30'),(23,'Jeddah poplatky',NULL,1.00,'2022-05-15','2022-03-25'),(24,'Taliansko poplatky',NULL,1.00,'2022-05-15','2022-04-22'),(25,'Miami poplatky',NULL,1.00,'2022-05-15','2022-05-06'),(26,'Barcelona poplatky',NULL,1.00,'2022-05-15','2022-05-20'),(27,'Monaco poplatky',NULL,1.00,'2022-05-15','2022-05-27'),(28,'Bahrain poplatky',NULL,1.00,'2022-05-15','2022-03-18'),(29,'Austrália poplatky',NULL,2.00,'2022-05-15','2022-04-08'),(30,'Azerbaijan poplatky',NULL,1.99,'2022-05-15','2022-06-10'),(31,'Mládež Jún',NULL,25.00,'2022-05-15','2022-06-15'),(32,'Mládež Máj',NULL,25.00,'2022-05-15','2022-05-15'),(33,'Mládež Apríl',NULL,25.00,'2022-05-15','2022-04-15'),(34,'Mládež Marec',NULL,25.00,'2022-05-15','2022-03-15');
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments_teams`
--

DROP TABLE IF EXISTS `payments_teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments_teams` (
  `id` int NOT NULL AUTO_INCREMENT,
  `paymentId` int NOT NULL,
  `teamId` varchar(50) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `paymentId` (`paymentId`),
  KEY `teamId` (`teamId`),
  CONSTRAINT `payments_teams_ibfk_1` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`paymentId`),
  CONSTRAINT `payments_teams_ibfk_2` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`)
) ENGINE=InnoDB AUTO_INCREMENT=59 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments_teams`
--

LOCK TABLES `payments_teams` WRITE;
/*!40000 ALTER TABLE `payments_teams` DISABLE KEYS */;
INSERT INTO `payments_teams` VALUES (7,7,'KTGXyDq7bn5MiLtYKBEA'),(8,7,'2EWG2hJBCXjywPYCbzlE'),(17,18,'2EWG2hJBCXjywPYCbzlE'),(18,18,'KTGXyDq7bn5MiLtYKBEA'),(28,23,'iRm3uMD2W5ebOQPwlck9'),(29,23,'TWsAkjtqo9GqGtudyL5M'),(31,24,'iRm3uMD2W5ebOQPwlck9'),(32,24,'TWsAkjtqo9GqGtudyL5M'),(34,25,'iRm3uMD2W5ebOQPwlck9'),(35,25,'TWsAkjtqo9GqGtudyL5M'),(37,26,'iRm3uMD2W5ebOQPwlck9'),(38,26,'TWsAkjtqo9GqGtudyL5M'),(40,27,'iRm3uMD2W5ebOQPwlck9'),(41,27,'TWsAkjtqo9GqGtudyL5M'),(43,28,'iRm3uMD2W5ebOQPwlck9'),(44,28,'TWsAkjtqo9GqGtudyL5M'),(46,29,'iRm3uMD2W5ebOQPwlck9'),(47,29,'TWsAkjtqo9GqGtudyL5M'),(49,30,'iRm3uMD2W5ebOQPwlck9'),(50,30,'TWsAkjtqo9GqGtudyL5M'),(52,31,'aQtYSI4Xr16ypOGBzeYH'),(53,32,'aQtYSI4Xr16ypOGBzeYH'),(54,33,'aQtYSI4Xr16ypOGBzeYH'),(55,34,'aQtYSI4Xr16ypOGBzeYH');
/*!40000 ALTER TABLE `payments_teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments_users`
--

DROP TABLE IF EXISTS `payments_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `userId` varchar(50) NOT NULL,
  `paymentId` int NOT NULL,
  `settledAt` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  KEY `paymentId` (`paymentId`),
  CONSTRAINT `payments_users_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`),
  CONSTRAINT `payments_users_ibfk_2` FOREIGN KEY (`paymentId`) REFERENCES `payments` (`paymentId`)
) ENGINE=InnoDB AUTO_INCREMENT=219 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments_users`
--

LOCK TABLES `payments_users` WRITE;
/*!40000 ALTER TABLE `payments_users` DISABLE KEYS */;
INSERT INTO `payments_users` VALUES (5,'tvbGeddB3AOrwkDKy98KuFqrJF23',7,NULL),(15,'tvbGeddB3AOrwkDKy98KuFqrJF23',18,'2022-05-07'),(20,'tvbGeddB3AOrwkDKy98KuFqrJF23',23,NULL),(21,'2xa7pVtzUNUfgOizc6supYef5CW2',23,NULL),(22,'Pfwqan634HSoODTZG3XPqrBB9ig2',23,NULL),(23,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',23,NULL),(24,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',23,NULL),(25,'amxC49g9mbbBD87hvZ1rfHjADSg2',23,NULL),(26,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',23,NULL),(27,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',23,NULL),(28,'vB1ctMWoNYayUNl8iFig00vJosr2',23,NULL),(29,'I9Htda9sxZhb37hsxDSCPw7vbWg2',23,NULL),(30,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2',23,NULL),(31,'PqsjaZslkbgIKOkBxcpWZHc0WGg1',23,NULL),(32,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2',23,NULL),(33,'a2tjiNLXjTbBarlCpozRmvD9bUD3',23,NULL),(34,'qZgjRBE5dZMKY7ds8df7EYJh7l92',23,NULL),(35,'tvbGeddB3AOrwkDKy98KuFqrJF23',24,NULL),(36,'2xa7pVtzUNUfgOizc6supYef5CW2',24,NULL),(37,'Pfwqan634HSoODTZG3XPqrBB9ig2',24,NULL),(38,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',24,NULL),(39,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',24,NULL),(40,'amxC49g9mbbBD87hvZ1rfHjADSg2',24,NULL),(41,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',24,NULL),(42,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',24,NULL),(43,'vB1ctMWoNYayUNl8iFig00vJosr2',24,NULL),(44,'I9Htda9sxZhb37hsxDSCPw7vbWg2',24,NULL),(45,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2',24,NULL),(46,'PqsjaZslkbgIKOkBxcpWZHc0WGg1',24,NULL),(47,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2',24,NULL),(48,'a2tjiNLXjTbBarlCpozRmvD9bUD3',24,NULL),(49,'qZgjRBE5dZMKY7ds8df7EYJh7l92',24,NULL),(50,'tvbGeddB3AOrwkDKy98KuFqrJF23',25,NULL),(51,'2xa7pVtzUNUfgOizc6supYef5CW2',25,NULL),(52,'Pfwqan634HSoODTZG3XPqrBB9ig2',25,NULL),(53,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',25,NULL),(54,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',25,NULL),(55,'amxC49g9mbbBD87hvZ1rfHjADSg2',25,NULL),(56,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',25,NULL),(57,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',25,NULL),(58,'vB1ctMWoNYayUNl8iFig00vJosr2',25,NULL),(59,'I9Htda9sxZhb37hsxDSCPw7vbWg2',25,NULL),(60,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2',25,NULL),(61,'PqsjaZslkbgIKOkBxcpWZHc0WGg1',25,NULL),(62,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2',25,NULL),(63,'a2tjiNLXjTbBarlCpozRmvD9bUD3',25,NULL),(64,'qZgjRBE5dZMKY7ds8df7EYJh7l92',25,NULL),(65,'tvbGeddB3AOrwkDKy98KuFqrJF23',26,NULL),(66,'2xa7pVtzUNUfgOizc6supYef5CW2',26,NULL),(67,'Pfwqan634HSoODTZG3XPqrBB9ig2',26,NULL),(68,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',26,NULL),(69,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',26,NULL),(70,'amxC49g9mbbBD87hvZ1rfHjADSg2',26,NULL),(71,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',26,NULL),(72,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',26,NULL),(73,'vB1ctMWoNYayUNl8iFig00vJosr2',26,NULL),(74,'I9Htda9sxZhb37hsxDSCPw7vbWg2',26,NULL),(75,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2',26,NULL),(76,'PqsjaZslkbgIKOkBxcpWZHc0WGg1',26,NULL),(77,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2',26,NULL),(78,'a2tjiNLXjTbBarlCpozRmvD9bUD3',26,NULL),(79,'qZgjRBE5dZMKY7ds8df7EYJh7l92',26,NULL),(80,'tvbGeddB3AOrwkDKy98KuFqrJF23',27,NULL),(81,'2xa7pVtzUNUfgOizc6supYef5CW2',27,NULL),(82,'Pfwqan634HSoODTZG3XPqrBB9ig2',27,NULL),(83,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',27,NULL),(84,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',27,NULL),(85,'amxC49g9mbbBD87hvZ1rfHjADSg2',27,NULL),(86,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',27,NULL),(87,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',27,NULL),(88,'vB1ctMWoNYayUNl8iFig00vJosr2',27,NULL),(89,'I9Htda9sxZhb37hsxDSCPw7vbWg2',27,NULL),(90,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2',27,NULL),(91,'PqsjaZslkbgIKOkBxcpWZHc0WGg1',27,NULL),(92,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2',27,NULL),(93,'a2tjiNLXjTbBarlCpozRmvD9bUD3',27,NULL),(94,'qZgjRBE5dZMKY7ds8df7EYJh7l92',27,NULL),(95,'tvbGeddB3AOrwkDKy98KuFqrJF23',28,NULL),(96,'2xa7pVtzUNUfgOizc6supYef5CW2',28,NULL),(97,'Pfwqan634HSoODTZG3XPqrBB9ig2',28,NULL),(98,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',28,NULL),(99,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',28,NULL),(100,'amxC49g9mbbBD87hvZ1rfHjADSg2',28,NULL),(101,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',28,NULL),(102,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',28,NULL),(103,'vB1ctMWoNYayUNl8iFig00vJosr2',28,NULL),(104,'I9Htda9sxZhb37hsxDSCPw7vbWg2',28,NULL),(105,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2',28,NULL),(106,'PqsjaZslkbgIKOkBxcpWZHc0WGg1',28,NULL),(107,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2',28,NULL),(108,'a2tjiNLXjTbBarlCpozRmvD9bUD3',28,NULL),(109,'qZgjRBE5dZMKY7ds8df7EYJh7l92',28,NULL),(110,'tvbGeddB3AOrwkDKy98KuFqrJF23',29,NULL),(111,'2xa7pVtzUNUfgOizc6supYef5CW2',29,NULL),(112,'Pfwqan634HSoODTZG3XPqrBB9ig2',29,NULL),(113,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',29,NULL),(114,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',29,NULL),(115,'amxC49g9mbbBD87hvZ1rfHjADSg2',29,NULL),(116,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',29,NULL),(117,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',29,NULL),(118,'vB1ctMWoNYayUNl8iFig00vJosr2',29,NULL),(119,'I9Htda9sxZhb37hsxDSCPw7vbWg2',29,NULL),(120,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2',29,NULL),(121,'PqsjaZslkbgIKOkBxcpWZHc0WGg1',29,NULL),(122,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2',29,NULL),(123,'a2tjiNLXjTbBarlCpozRmvD9bUD3',29,NULL),(124,'qZgjRBE5dZMKY7ds8df7EYJh7l92',29,NULL),(125,'tvbGeddB3AOrwkDKy98KuFqrJF23',30,NULL),(126,'2xa7pVtzUNUfgOizc6supYef5CW2',30,NULL),(127,'Pfwqan634HSoODTZG3XPqrBB9ig2',30,NULL),(128,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',30,NULL),(129,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',30,NULL),(130,'amxC49g9mbbBD87hvZ1rfHjADSg2',30,NULL),(131,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',30,NULL),(132,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',30,NULL),(133,'vB1ctMWoNYayUNl8iFig00vJosr2',30,NULL),(134,'I9Htda9sxZhb37hsxDSCPw7vbWg2',30,NULL),(135,'vysZdoBRQ0RF7z2Oz4axr1kZPnY2',30,NULL),(136,'PqsjaZslkbgIKOkBxcpWZHc0WGg1',30,NULL),(137,'v2mmDJ12Nhg9cwam67Qe9VY1RkD2',30,NULL),(138,'a2tjiNLXjTbBarlCpozRmvD9bUD3',30,NULL),(139,'qZgjRBE5dZMKY7ds8df7EYJh7l92',30,NULL),(140,'2xa7pVtzUNUfgOizc6supYef5CW2',31,NULL),(141,'Pfwqan634HSoODTZG3XPqrBB9ig2',31,NULL),(142,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',31,NULL),(143,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',31,NULL),(144,'amxC49g9mbbBD87hvZ1rfHjADSg2',31,NULL),(145,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',31,NULL),(146,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',31,NULL),(147,'vB1ctMWoNYayUNl8iFig00vJosr2',31,NULL),(148,'a2tjiNLXjTbBarlCpozRmvD9bUD3',31,NULL),(149,'qZgjRBE5dZMKY7ds8df7EYJh7l92',31,NULL),(155,'2xa7pVtzUNUfgOizc6supYef5CW2',32,NULL),(156,'Pfwqan634HSoODTZG3XPqrBB9ig2',32,NULL),(157,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',32,NULL),(158,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',32,NULL),(159,'amxC49g9mbbBD87hvZ1rfHjADSg2',32,NULL),(160,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',32,NULL),(161,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',32,NULL),(162,'vB1ctMWoNYayUNl8iFig00vJosr2',32,NULL),(163,'a2tjiNLXjTbBarlCpozRmvD9bUD3',32,NULL),(164,'qZgjRBE5dZMKY7ds8df7EYJh7l92',32,NULL),(170,'2xa7pVtzUNUfgOizc6supYef5CW2',33,NULL),(171,'Pfwqan634HSoODTZG3XPqrBB9ig2',33,NULL),(172,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',33,NULL),(173,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',33,NULL),(174,'amxC49g9mbbBD87hvZ1rfHjADSg2',33,NULL),(175,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',33,NULL),(176,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',33,NULL),(177,'vB1ctMWoNYayUNl8iFig00vJosr2',33,NULL),(178,'a2tjiNLXjTbBarlCpozRmvD9bUD3',33,NULL),(179,'qZgjRBE5dZMKY7ds8df7EYJh7l92',33,NULL),(185,'2xa7pVtzUNUfgOizc6supYef5CW2',34,NULL),(186,'Pfwqan634HSoODTZG3XPqrBB9ig2',34,NULL),(187,'AgjZuUgw2Ac3aNkNB5TbrwQxfgc2',34,NULL),(188,'XwsSN5oDl5Wtgm8juh6DkzjiLFo2',34,NULL),(189,'amxC49g9mbbBD87hvZ1rfHjADSg2',34,NULL),(190,'w1CuyisrsZNzUOBzAXWO5U1rb6f2',34,NULL),(191,'FXvbnl8Ph4XUMavKUcBiqDJ83P53',34,NULL),(192,'vB1ctMWoNYayUNl8iFig00vJosr2',34,NULL),(193,'a2tjiNLXjTbBarlCpozRmvD9bUD3',34,NULL),(194,'qZgjRBE5dZMKY7ds8df7EYJh7l92',34,NULL),(200,'tvbGeddB3AOrwkDKy98KuFqrJF23',31,NULL),(201,'tvbGeddB3AOrwkDKy98KuFqrJF23',32,'2022-05-17'),(202,'tvbGeddB3AOrwkDKy98KuFqrJF23',33,'2022-05-16'),(203,'tvbGeddB3AOrwkDKy98KuFqrJF23',34,'2022-05-15');
/*!40000 ALTER TABLE `payments_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `requests`
--

DROP TABLE IF EXISTS `requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `requests` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `date` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teamId` (`teamId`),
  KEY `userId` (`userId`),
  CONSTRAINT `requests_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`),
  CONSTRAINT `requests_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
INSERT INTO `requests` VALUES (3,'KTGXyDq7bn5MiLtYKBEA','tvbGeddB3AOrwkDKy98KuFqrJF23','2022-05-14 17:05:00');
/*!40000 ALTER TABLE `requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams`
--

DROP TABLE IF EXISTS `teams`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams` (
  `teamId` varchar(50) NOT NULL,
  `name` text NOT NULL,
  `photoURL` text NOT NULL,
  `clubId` varchar(50) NOT NULL,
  PRIMARY KEY (`teamId`),
  KEY `clubId` (`clubId`),
  CONSTRAINT `teams_ibfk_1` FOREIGN KEY (`clubId`) REFERENCES `clubs` (`clubId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams`
--

LOCK TABLES `teams` WRITE;
/*!40000 ALTER TABLE `teams` DISABLE KEYS */;
INSERT INTO `teams` VALUES ('2EWG2hJBCXjywPYCbzlE','Junior Team','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/teamPhotos%2F2EWG2hJBCXjywPYCbzlE?alt=media&token=dd49a1a2-be08-4ed1-be74-d4b5bde85b6c','1NXdi1KhgMhHrrSu7m3g'),('aQtYSI4Xr16ypOGBzeYH','Juniori U19','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FaQtYSI4Xr16ypOGBzeYH.png?alt=media&token=5e715e04-50d7-49bb-ab9f-176effda98f4','tBzkJLT7XE9E9mvZ4zQA'),('htBX1cjotWDtTc3QZ1CC','Muži A','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/teamPhotos%2FhtBX1cjotWDtTc3QZ1CC?alt=media&token=1b420c28-0797-4dcc-8f36-891b2835ea32','tBzkJLT7XE9E9mvZ4zQA'),('iRm3uMD2W5ebOQPwlck9','Team Perez','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/teamPhotos%2FiRm3uMD2W5ebOQPwlck9?alt=media&token=389612af-9b1f-4090-b809-c8338677c87c','urI3ZiiUl3yCoFnEBtZJ'),('KTGXyDq7bn5MiLtYKBEA','Men\'s Hockey Team','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/teamPhotos%2FKTGXyDq7bn5MiLtYKBEA?alt=media&token=6965a10b-b97e-4a93-ba68-938ba2b45fdb','1NXdi1KhgMhHrrSu7m3g'),('R8ioquIKepp7lVMOs8jM','Men\'s Team','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FR8ioquIKepp7lVMOs8jM.png?alt=media&token=0bdabc5f-ec05-4a92-abe5-4b3b864ebc4f','GsNAtaoCDboBZh2VQTf4'),('TWsAkjtqo9GqGtudyL5M','Team Max','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/teamPhotos%2FTWsAkjtqo9GqGtudyL5M?alt=media&token=af6687d8-50d4-4ea2-a792-5fa52dafc053','urI3ZiiUl3yCoFnEBtZJ');
/*!40000 ALTER TABLE `teams` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teams_users`
--

DROP TABLE IF EXISTS `teams_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teams_users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `teamId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  `role` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `teamId` (`teamId`),
  KEY `userId` (`userId`),
  CONSTRAINT `teams_users_ibfk_1` FOREIGN KEY (`teamId`) REFERENCES `teams` (`teamId`),
  CONSTRAINT `teams_users_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams_users`
--

LOCK TABLES `teams_users` WRITE;
/*!40000 ALTER TABLE `teams_users` DISABLE KEYS */;
INSERT INTO `teams_users` VALUES (1,'aQtYSI4Xr16ypOGBzeYH','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(2,'R8ioquIKepp7lVMOs8jM','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(3,'TWsAkjtqo9GqGtudyL5M','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(4,'iRm3uMD2W5ebOQPwlck9','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(12,'KTGXyDq7bn5MiLtYKBEA','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(13,'TWsAkjtqo9GqGtudyL5M','tvbGeddB3AOrwkDKy98KuFqrJF23','MEMBER'),(15,'2EWG2hJBCXjywPYCbzlE','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(16,'2EWG2hJBCXjywPYCbzlE','tvbGeddB3AOrwkDKy98KuFqrJF23','MEMBER'),(21,'aQtYSI4Xr16ypOGBzeYH','2xa7pVtzUNUfgOizc6supYef5CW2','MEMBER'),(22,'aQtYSI4Xr16ypOGBzeYH','Pfwqan634HSoODTZG3XPqrBB9ig2','MEMBER'),(23,'aQtYSI4Xr16ypOGBzeYH','AgjZuUgw2Ac3aNkNB5TbrwQxfgc2','MEMBER'),(24,'aQtYSI4Xr16ypOGBzeYH','XwsSN5oDl5Wtgm8juh6DkzjiLFo2','MEMBER'),(25,'aQtYSI4Xr16ypOGBzeYH','amxC49g9mbbBD87hvZ1rfHjADSg2','MEMBER'),(26,'aQtYSI4Xr16ypOGBzeYH','w1CuyisrsZNzUOBzAXWO5U1rb6f2','MEMBER'),(27,'aQtYSI4Xr16ypOGBzeYH','FXvbnl8Ph4XUMavKUcBiqDJ83P53','MEMBER'),(28,'aQtYSI4Xr16ypOGBzeYH','vB1ctMWoNYayUNl8iFig00vJosr2','MEMBER'),(29,'iRm3uMD2W5ebOQPwlck9','I9Htda9sxZhb37hsxDSCPw7vbWg2','MEMBER'),(30,'iRm3uMD2W5ebOQPwlck9','vysZdoBRQ0RF7z2Oz4axr1kZPnY2','MEMBER'),(31,'iRm3uMD2W5ebOQPwlck9','PqsjaZslkbgIKOkBxcpWZHc0WGg1','MEMBER'),(32,'iRm3uMD2W5ebOQPwlck9','v2mmDJ12Nhg9cwam67Qe9VY1RkD2','MEMBER'),(33,'iRm3uMD2W5ebOQPwlck9','2xa7pVtzUNUfgOizc6supYef5CW2','MEMBER'),(34,'iRm3uMD2W5ebOQPwlck9','Pfwqan634HSoODTZG3XPqrBB9ig2','MEMBER'),(35,'aQtYSI4Xr16ypOGBzeYH','a2tjiNLXjTbBarlCpozRmvD9bUD3','MEMBER'),(36,'aQtYSI4Xr16ypOGBzeYH','qZgjRBE5dZMKY7ds8df7EYJh7l92','MEMBER'),(38,'htBX1cjotWDtTc3QZ1CC','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(39,'aQtYSI4Xr16ypOGBzeYH','tvbGeddB3AOrwkDKy98KuFqrJF23','MEMBER');
/*!40000 ALTER TABLE `teams_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` varchar(50) NOT NULL,
  `name` text NOT NULL,
  `photoURL` text NOT NULL,
  `email` text NOT NULL,
  `customerId` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('2xa7pVtzUNUfgOizc6supYef5CW2','Hanka Cierna','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','cierna@gmail.com','cus_Lh5ruMnTcha5mg'),('a2tjiNLXjTbBarlCpozRmvD9bUD3','Niko Zlty','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','zlty@gmail.com','cus_Lh66hyl0sMT8hf'),('AgjZuUgw2Ac3aNkNB5TbrwQxfgc2','Kristína Dlha','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','dlha@gmail.com','cus_Lh5ttX6w1MYzxC'),('amxC49g9mbbBD87hvZ1rfHjADSg2','Emilia Velka','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','velka@gmail.com','cus_Lh5pOEn0v3BXND'),('b0AFOZXq2RRltpN5tOTSAcssBc82','Christian Salon','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','salon@spse-po.sk','cus_LhjKDvDF1gvlig'),('FXvbnl8Ph4XUMavKUcBiqDJ83P53','Boris Maly','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','maly@gmail.com','cus_Lh5oTJ8MjUoi6J'),('HZVm04WIs4aVriRAQBbeKDhnYGI2','Christian Saloň','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2FHZVm04WIs4aVriRAQBbeKDhnYGI2?alt=media&token=7df61ebf-5f3f-4932-9148-8fed868e092c','chsalon02@gmail.com','cus_LXmRRNezmbLZw1'),('I9Htda9sxZhb37hsxDSCPw7vbWg2','Ladislav Kratky','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','kratky@gmail.com','cus_Lh5td6uGQSMfK6'),('Pfwqan634HSoODTZG3XPqrBB9ig2','Ivan Cierny','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','cierny@gmail.com','cus_Lh5sJXXrfwl9vT'),('PqsjaZslkbgIKOkBxcpWZHc0WGg1','František Biely','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','biely@gmail.com','cus_Lh5qE3RoXsn6Rw'),('qZgjRBE5dZMKY7ds8df7EYJh7l92','Patrícia Zlta','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','zlta@gmail.com','cus_Lh685D5FZq6JVM'),('tvbGeddB3AOrwkDKy98KuFqrJF23','Janko Hraško','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2FtvbGeddB3AOrwkDKy98KuFqrJF23?alt=media&token=01afaff3-db7d-4b52-872b-9ce853a14a01','chsalon03@gmail.com','cus_LXmSwz1blH1MOK'),('v2mmDJ12Nhg9cwam67Qe9VY1RkD2','Gabriela Biela','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','biela@gmail.com','cus_Lh5qUqBt9mh4K3'),('vB1ctMWoNYayUNl8iFig00vJosr2','Anna Mala','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','mala@gmail.com','cus_Lh5oRLGQFwR0qT'),('vysZdoBRQ0RF7z2Oz4axr1kZPnY2','Mária Krátka','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','kratka@gmail.com','cus_Lh5uBrOqt0emG3'),('w1CuyisrsZNzUOBzAXWO5U1rb6f2','Daniel Velky','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','velky@gmail.com','cus_Lh5pb8fF6JEiLa'),('XwsSN5oDl5Wtgm8juh6DkzjiLFo2','Jakub Dlhy','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','dlhy@gmail.com','cus_Lh5s9vSdfZ9Oss');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'trainee'
--
/*!50003 DROP PROCEDURE IF EXISTS `acceptRequest` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `acceptRequest`(IN requestId VARCHAR(50), IN teamId VARCHAR(50), IN userId VARCHAR(50))
BEGIN
    DELETE FROM requests WHERE id = requestId;
    INSERT INTO teams_users (`teamId`, `userId`, `role`) VALUES (teamId, userId, "MEMBER");
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createClub` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `createClub`(IN clubId VARCHAR(50), IN name TEXT, IN photoURL TEXT, IN userId VARCHAR(50), IN role TEXT)
BEGIN
	INSERT INTO clubs (clubId, name, photoURL) VALUES (clubId, name, photoURL);
    INSERT INTO clubs_users (clubId, userId, role) VALUES (clubId, userId, role);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `createEvent`(IN eventId VARCHAR(50), IN name TEXT, IN details TEXT, IN attendanceNumber SMALLINT, IN location TEXT, IN startTime TEXT, IN endTime TEXT, IN startDate DATETIME, IN endDate DATETIME)
BEGIN
    INSERT INTO events (`eventId`, `name`, `details`, `attendanceNumber`, `location`, `startTime`, `endTime`, `startDate`, `endDate`) VALUES
		(eventId, name, details, attendanceNumber, location, startTime, endTime, startDate, endDate);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createPayment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `createPayment`(IN name text, IN details text, IN amount decimal(7, 2), IN createdAt date, IN dueDate date, IN teamIds text)
BEGIN

	DECLARE _insertedId INT DEFAULT 0;

    INSERT INTO payments (name, details, amount, createdAt, dueDate) VALUES (name, details, amount, createdAt, dueDate);
    SET _insertedId = LAST_INSERT_ID();
    
	INSERT INTO payments_teams (paymentId, teamId) 
		SELECT _insertedId, teamId FROM teams WHERE FIND_IN_SET(teamId, teamIds);
	INSERT INTO payments_users (paymentId, userId) 
		SELECT _insertedId, u.userId FROM teams_users AS tu 
			INNER JOIN users AS u ON tu.userId = u.userId
			WHERE FIND_IN_SET(tu.teamId, teamIds) AND tu.role = "MEMBER"
            GROUP BY u.userId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `createTeam` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `createTeam`(IN teamId VARCHAR(50), IN clubId VARCHAR(50), IN name TEXT, IN photoURL TEXT, IN userId VARCHAR(50), IN role TEXT)
BEGIN
	INSERT INTO teams (teamId, clubId, name, photoURL) VALUES (teamId, clubId, name, photoURL);
    INSERT INTO teams_users (teamId, userId, role) VALUES (teamId, userId, role);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteClub` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `deleteClub`(IN _clubId VARCHAR(50))
BEGIN
    DELETE FROM clubs_users WHERE clubId = _clubId;
    DELETE FROM clubs WHERE clubId = _clubId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteEvent` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `deleteEvent`(IN eventId VARCHAR(50))
BEGIN
    DELETE FROM events_teams WHERE eventId = eventId;
    DELETE FROM attendance WHERE eventId = eventId;
	DELETE FROM events WHERE eventId = eventId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deletePayment` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `deletePayment`(IN _paymentId int)
BEGIN
	DELETE FROM payments_teams WHERE paymentId = _paymentId;
    DELETE FROM payments_users WHERE paymentId = _paymentId;
    DELETE FROM payments WHERE paymentId = _paymentId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteTeam` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`chris`@`localhost` PROCEDURE `deleteTeam`(IN _teamId VARCHAR(50))
BEGIN
    DELETE FROM teams_users WHERE teamId = _teamId;
    DELETE FROM events_teams WHERE teamId = _teamId;
    DELETE FROM teams WHERE teamId = _teamId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-27 21:31:49
