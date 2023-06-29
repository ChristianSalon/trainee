-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: trainee
-- ------------------------------------------------------
-- Server version	8.0.21

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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'HZVm04WIs4aVriRAQBbeKDhnYGI2','2NV5eAI2Ozf1PF7WZmLm',1,'2022-02-24 13:47:38',NULL),(2,'HZVm04WIs4aVriRAQBbeKDhnYGI2','4Wc9Qi9qJkz5z9kURGZk',1,'2022-02-04 13:49:17',NULL),(3,'HZVm04WIs4aVriRAQBbeKDhnYGI2','CSYIITKHBZ8KXJJROUvm',0,'2022-04-28 14:54:24','Why not'),(4,'HZVm04WIs4aVriRAQBbeKDhnYGI2','j4nRb9cVygl30dYlScsG',0,'2022-04-03 15:20:36','School work.'),(5,'HZVm04WIs4aVriRAQBbeKDhnYGI2','uD7hh4sK5AfZefRSwKYD',1,'2022-04-21 16:02:15',NULL);
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
INSERT INTO `clubs` VALUES ('1NXdi1KhgMhHrrSu7m3g','Arizona Coyotes','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2F1NXdi1KhgMhHrrSu7m3g?alt=media&token=f65c9bf9-d032-4871-8368-f9b09e3db291','acct_1KsOtLBBr1an5pQz',1),('GsNAtaoCDboBZh2VQTf4','Indianapolis Colts','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FR8ioquIKepp7lVMOs8jM.png?alt=media&token=0bdabc5f-ec05-4a92-abe5-4b3b864ebc4f',NULL,0),('tBzkJLT7XE9E9mvZ4zQA','FBC Mikulas Presov','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FaQtYSI4Xr16ypOGBzeYH.png?alt=media&token=5e715e04-50d7-49bb-ab9f-176effda98f4',NULL,0),('urI3ZiiUl3yCoFnEBtZJ','Redbull Racing Honda F1 Team','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FurI3ZiiUl3yCoFnEBtZJ?alt=media&token=2154338e-7c7d-4035-a6b6-c6d19bfcf560',NULL,0);
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
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clubs_users`
--

LOCK TABLES `clubs_users` WRITE;
/*!40000 ALTER TABLE `clubs_users` DISABLE KEYS */;
INSERT INTO `clubs_users` VALUES (1,'tBzkJLT7XE9E9mvZ4zQA','HZVm04WIs4aVriRAQBbeKDhnYGI2','MEMBER'),(2,'GsNAtaoCDboBZh2VQTf4','HZVm04WIs4aVriRAQBbeKDhnYGI2','COACH'),(3,'GsNAtaoCDboBZh2VQTf4','HZVm04WIs4aVriRAQBbeKDhnYGI2','MEMBER'),(4,'urI3ZiiUl3yCoFnEBtZJ','HZVm04WIs4aVriRAQBbeKDhnYGI2','MEMBER'),(5,'urI3ZiiUl3yCoFnEBtZJ','HZVm04WIs4aVriRAQBbeKDhnYGI2','COACH'),(6,'urI3ZiiUl3yCoFnEBtZJ','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(9,'1NXdi1KhgMhHrrSu7m3g','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER');
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
INSERT INTO `events` VALUES ('2NV5eAI2Ozf1PF7WZmLm','Predzapasovy trening v novej modernej hale...','Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',1,'Mestska hala PO','11:00','12:30','2021-12-15 11:00:00','2021-12-15 12:30:00'),('4Wc9Qi9qJkz5z9kURGZk','Trening po korone s MAXOM!',NULL,0,'ZŠ Sibírska','18:00','19:30','2022-01-07 18:00:00','2022-01-07 19:30:00'),('CSYIITKHBZ8KXJJROUvm','Trening na Ľudmily 2','Nezabudnite zobrať niečo',0,'Ľudmila Podjavorinska','18:00','19:30','2022-02-22 17:00:00','2022-02-23 18:30:00'),('j4nRb9cVygl30dYlScsG','Trening na Ľudmily 3',NULL,0,'Ľudmila Podjavorinska','12:00','13:30','2022-02-22 11:00:00','2022-02-22 12:30:00'),('u1poLS5CJDwZ2xNxp87C','Bahrain',NULL,0,'Shakir','15:00','17:00','2022-03-27 13:00:00','2022-03-27 15:00:00'),('uD7hh4sK5AfZefRSwKYD','Trening na Ľudmily',NULL,1,'Ľudmila Podjavorinska','19:30','21:00','2022-02-22 19:30:00','2022-02-22 21:00:00'),('uS4Mjj1t0PGWAquooHGw','Aussie GP',NULL,0,'Austrália','15:00','17:00','2022-04-07 13:00:00','2022-04-07 15:00:00'),('Z7FrJBn2xtjl5UkfKWIW','Imola Training',NULL,0,'Imola, Italy','20:00','23:00','2022-04-23 18:00:00','2022-04-23 21:00:00');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events_teams`
--

LOCK TABLES `events_teams` WRITE;
/*!40000 ALTER TABLE `events_teams` DISABLE KEYS */;
INSERT INTO `events_teams` VALUES (1,'aQtYSI4Xr16ypOGBzeYH','2NV5eAI2Ozf1PF7WZmLm'),(2,'aQtYSI4Xr16ypOGBzeYH','4Wc9Qi9qJkz5z9kURGZk'),(3,'TWsAkjtqo9GqGtudyL5M','4Wc9Qi9qJkz5z9kURGZk'),(4,'aQtYSI4Xr16ypOGBzeYH','uD7hh4sK5AfZefRSwKYD'),(5,'aQtYSI4Xr16ypOGBzeYH','CSYIITKHBZ8KXJJROUvm'),(6,'aQtYSI4Xr16ypOGBzeYH','j4nRb9cVygl30dYlScsG'),(7,'TWsAkjtqo9GqGtudyL5M','u1poLS5CJDwZ2xNxp87C'),(8,'iRm3uMD2W5ebOQPwlck9','uS4Mjj1t0PGWAquooHGw'),(9,'iRm3uMD2W5ebOQPwlck9','Z7FrJBn2xtjl5UkfKWIW'),(10,'TWsAkjtqo9GqGtudyL5M','Z7FrJBn2xtjl5UkfKWIW');
/*!40000 ALTER TABLE `events_teams` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (1,'Australia poplatky','Zaplatit!!!',2000.00,'2022-04-09','2022-04-21'),(2,'Shakir poplatky','Zaplatit!!!',1000.99,'2022-02-01','2022-02-21'),(3,'Mladez Februar','Zaplatit!!!',25.00,'2022-02-01','2022-02-16'),(4,'Mladez Marec','Zaplatit!!!',25.00,'2022-03-01','2022-03-16'),(5,'Mladez April',NULL,25.00,'2022-04-01','2022-04-16'),(6,'Mladez Maj','Zaplatit!!!',25.00,'2022-04-01','2022-05-16'),(7,'Relagation fees','Babababababab',0.50,'2022-04-25','2022-04-29'),(18,'Fees',NULL,0.51,'2022-04-28','2022-04-30');
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
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments_teams`
--

LOCK TABLES `payments_teams` WRITE;
/*!40000 ALTER TABLE `payments_teams` DISABLE KEYS */;
INSERT INTO `payments_teams` VALUES (1,1,'TWsAkjtqo9GqGtudyL5M'),(2,2,'TWsAkjtqo9GqGtudyL5M'),(3,3,'aQtYSI4Xr16ypOGBzeYH'),(4,4,'aQtYSI4Xr16ypOGBzeYH'),(5,5,'aQtYSI4Xr16ypOGBzeYH'),(6,6,'aQtYSI4Xr16ypOGBzeYH'),(7,7,'KTGXyDq7bn5MiLtYKBEA'),(8,7,'2EWG2hJBCXjywPYCbzlE'),(17,18,'2EWG2hJBCXjywPYCbzlE'),(18,18,'KTGXyDq7bn5MiLtYKBEA');
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
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments_users`
--

LOCK TABLES `payments_users` WRITE;
/*!40000 ALTER TABLE `payments_users` DISABLE KEYS */;
INSERT INTO `payments_users` VALUES (1,'HZVm04WIs4aVriRAQBbeKDhnYGI2',3,'2022-02-10'),(2,'HZVm04WIs4aVriRAQBbeKDhnYGI2',4,NULL),(3,'HZVm04WIs4aVriRAQBbeKDhnYGI2',5,'2022-04-10'),(4,'HZVm04WIs4aVriRAQBbeKDhnYGI2',6,NULL),(5,'tvbGeddB3AOrwkDKy98KuFqrJF23',7,'2022-04-10'),(15,'tvbGeddB3AOrwkDKy98KuFqrJF23',18,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `requests`
--

LOCK TABLES `requests` WRITE;
/*!40000 ALTER TABLE `requests` DISABLE KEYS */;
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
INSERT INTO `teams` VALUES ('2EWG2hJBCXjywPYCbzlE','Junior Team','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/teamPhotos%2F2EWG2hJBCXjywPYCbzlE?alt=media&token=dd49a1a2-be08-4ed1-be74-d4b5bde85b6c','1NXdi1KhgMhHrrSu7m3g'),('aQtYSI4Xr16ypOGBzeYH','Juniori U19','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FaQtYSI4Xr16ypOGBzeYH.png?alt=media&token=5e715e04-50d7-49bb-ab9f-176effda98f4','tBzkJLT7XE9E9mvZ4zQA'),('iRm3uMD2W5ebOQPwlck9','Team Perez','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FurI3ZiiUl3yCoFnEBtZJ?alt=media&token=e4b76103-e463-4528-86bb-d30170ce0e86','urI3ZiiUl3yCoFnEBtZJ'),('KTGXyDq7bn5MiLtYKBEA','Men\'s Hockey Team','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/teamPhotos%2FKTGXyDq7bn5MiLtYKBEA?alt=media&token=6965a10b-b97e-4a93-ba68-938ba2b45fdb','1NXdi1KhgMhHrrSu7m3g'),('R8ioquIKepp7lVMOs8jM','Men\'s Team','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/clubPhotos%2FR8ioquIKepp7lVMOs8jM.png?alt=media&token=0bdabc5f-ec05-4a92-abe5-4b3b864ebc4f','GsNAtaoCDboBZh2VQTf4'),('TWsAkjtqo9GqGtudyL5M','Team Max','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/teamPhotos%2FTWsAkjtqo9GqGtudyL5M?alt=media&token=af6687d8-50d4-4ea2-a792-5fa52dafc053','urI3ZiiUl3yCoFnEBtZJ');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teams_users`
--

LOCK TABLES `teams_users` WRITE;
/*!40000 ALTER TABLE `teams_users` DISABLE KEYS */;
INSERT INTO `teams_users` VALUES (1,'aQtYSI4Xr16ypOGBzeYH','HZVm04WIs4aVriRAQBbeKDhnYGI2','MEMBER'),(2,'R8ioquIKepp7lVMOs8jM','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(3,'TWsAkjtqo9GqGtudyL5M','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(4,'iRm3uMD2W5ebOQPwlck9','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(12,'KTGXyDq7bn5MiLtYKBEA','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(13,'TWsAkjtqo9GqGtudyL5M','tvbGeddB3AOrwkDKy98KuFqrJF23','MEMBER'),(15,'2EWG2hJBCXjywPYCbzlE','HZVm04WIs4aVriRAQBbeKDhnYGI2','MANAGER'),(16,'2EWG2hJBCXjywPYCbzlE','tvbGeddB3AOrwkDKy98KuFqrJF23','MEMBER'),(17,'KTGXyDq7bn5MiLtYKBEA','tvbGeddB3AOrwkDKy98KuFqrJF23','MEMBER');
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
INSERT INTO `users` VALUES ('HZVm04WIs4aVriRAQBbeKDhnYGI2','Christian Saloň','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2FHZVm04WIs4aVriRAQBbeKDhnYGI2?alt=media&token=225fb258-b933-43ad-9fc5-da41605ce921','chsalon02@gmail.com','cus_LXmRRNezmbLZw1'),('tvbGeddB3AOrwkDKy98KuFqrJF23','Janko Hraško','https://firebasestorage.googleapis.com/v0/b/trainee-app-1b59f.appspot.com/o/profilePhotos%2Fdefault_photo.png?alt=media&token=d2b3d2b6-8bda-4717-abbf-0796af602229','chsalon03@gmail.com','cus_LXmSwz1blH1MOK');
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

-- Dump completed on 2022-05-01 15:30:50
