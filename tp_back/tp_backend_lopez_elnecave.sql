CREATE DATABASE `tp_backend_lopez_elnecave` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
CREATE TABLE `books` (
  `id_book` int NOT NULL AUTO_INCREMENT,
  `title` varchar(200) NOT NULL,
  `autor` varchar(150) NOT NULL,
  `release_date` datetime DEFAULT NULL,
  `banner` varchar(225) DEFAULT NULL,
  PRIMARY KEY (`id_book`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
