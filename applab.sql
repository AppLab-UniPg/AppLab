-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: db
-- Generation Time: Apr 23, 2024 at 01:56 PM
-- Server version: 8.0.30
-- PHP Version: 8.0.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `applab`
--

-- --------------------------------------------------------

--
-- Table structure for table `subtutorial`
--

CREATE TABLE `subtutorial` (
  `Titolo` varchar(255) NOT NULL,
  `Descrizione` varchar(255) DEFAULT NULL,
  `PathPresentazione` varchar(255) DEFAULT NULL,
  `PathEsercizi` varchar(255) DEFAULT NULL,
  `tutorial` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `subtutorial`
--

INSERT INTO `subtutorial` (`Titolo`, `Descrizione`, `PathPresentazione`, `PathEsercizi`, `tutorial`) VALUES
('Form HTML5', 'Le form in HTML5 e cenni nelle precedenti versioni', '/tutorial/presentazioni/form.pptx', '/tutorial/esercizi/form.zip', 'HTML5');

-- --------------------------------------------------------

--
-- Table structure for table `tutorial`
--

CREATE TABLE `tutorial` (
  `Titolo` varchar(255) NOT NULL,
  `Descrizione` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `Pathimg` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tutorial`
--

INSERT INTO `tutorial` (`Titolo`, `Descrizione`, `Pathimg`) VALUES
('HTML5', 'Recentemente HTML con la versione 5 è passato da un semplice linguaggio di markup, a qualcosa di molto più complesso.\r\nOra tramite HTML5 puoi creare applicazioni Web con archiviazione online, disegno 2D, supporto offline, socket, thread e molto altro ancora.', '/tutorial/tutorial-imgs/html5.webp');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `subtutorial`
--
ALTER TABLE `subtutorial`
  ADD PRIMARY KEY (`Titolo`),
  ADD KEY `subtutorial` (`tutorial`);

--
-- Indexes for table `tutorial`
--
ALTER TABLE `tutorial`
  ADD PRIMARY KEY (`Titolo`);

--
-- Constraints for dumped tables
--

--
-- Constraints for table `subtutorial`
--
ALTER TABLE `subtutorial`
  ADD CONSTRAINT `subtutorial_ibfk_1` FOREIGN KEY (`tutorial`) REFERENCES `tutorial` (`Titolo`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
