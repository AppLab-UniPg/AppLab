-- Adminer 4.8.1 MySQL 11.4.2-MariaDB-ubu2404 dump

SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `applab` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `applab`;

DROP TABLE IF EXISTS `secret-key`;
CREATE TABLE `secret-key` (
  `secret` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `secret-key` (`secret`) VALUES
('5f3933533b98a0fd31e677a9f5feb853e921690f8190159526043228d29e04f5');

DROP TABLE IF EXISTS `subtutorial`;
CREATE TABLE `subtutorial` (
  `Titolo` varchar(255) NOT NULL,
  `Descrizione` varchar(255) DEFAULT NULL,
  `PathPresentazione` varchar(255) DEFAULT NULL,
  `PathEsercizi` varchar(255) DEFAULT NULL,
  `tutorial` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Titolo`),
  KEY `subtutorial` (`tutorial`),
  CONSTRAINT `subtutorial_ibfk_1` FOREIGN KEY (`tutorial`) REFERENCES `tutorial` (`Titolo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `subtutorial` (`Titolo`, `Descrizione`, `PathPresentazione`, `PathEsercizi`, `tutorial`) VALUES
('Form HTML5',	'Le form in HTML5 e cenni nelle precedenti versioni',	'/assets/tutorials/files/headfirsthtml5formhtml5.pdf',	'/assets/tutorials/files/headfirsthtml5formhtml5.zip',	'Head First HTML5');

DROP TABLE IF EXISTS `tutorial`;
CREATE TABLE `tutorial` (
  `Titolo` varchar(255) NOT NULL,
  `Descrizione` varchar(500) DEFAULT NULL,
  `Pathimg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Titolo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

DROP TABLE IF EXISTS `portfolio`;
CREATE TABLE `portfolio` (
  `Titolo` varchar(255) NOT NULL,
  `Descrizione` varchar(500) DEFAULT NULL,
  `Url` varchar(255) DEFAULT NULL,
  `Pathimg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Titolo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_uca1400_ai_ci;

INSERT INTO `portfolio` (`Titolo`, `Descrizione`, `Url`, `Pathimg`) VALUES
('CONARG',	'Conarg is a tool based on Constraint Programming, that is able to solve various problems related to the (Weighted) Abstract Argumentation Frameworks (AFs). \r\ndi Dan Rusnac e Gianmarco Silieri',	'https://conarg.dmi.unipg.it/',	'/assets/imgs/portfolio/conarg.webp'),
('FRANTOIO MONTICELLI',	'',	'https://frantoiomonticelli.dmi.unipg.it/',	'/assets/imgs/portfolio/frantoio.webp'),
('KRABS',	'Il sito ha l obiettivo di raccogliere tutorial fatti dagli studenti riguardanti il design di pagine web. È inoltre presente un calendario per tenere traccia degli incontri tra gli studenti, e un form per contattare il gruppo. \r\ndi Ivan Mercanti, Francesco Moca e Francesco Paolucci',	'https://krabs.dmi.unipg.it/',	'/assets/imgs/portfolio/krabs.webp');


INSERT INTO `tutorial` (`Titolo`, `Descrizione`, `Pathimg`) VALUES
('Head First HTML5',	'Recentemente HTML con la versione 5 è passato da un semplice linguaggio di markup, a qualcosa di molto più complesso.\r\nOra tramite HTML5 puoi creare applicazioni Web con archiviazione online, disegno 2D, supporto offline, socket, thread e molto altro ancora.',	'/assets/tutorials/imgs/html5.webp');
INSERT INTO `tutorial` (`Titolo`, `Descrizione`, `Pathimg`) VALUES
('Head First Web Design',	'Il libro spiega come creare pagine web accattivanti, comunicare in modo efficace e facilitare la navigazione del sito.\r\nCiò è essenziale sia per un blog personale che per un sito web aziendale, andando oltre div e css.',	'/assets/tutorials/imgs/webdesign.webp');
INSERT INTO `tutorial` (`Titolo`, `Descrizione`, `Pathimg`) VALUES
('Head First Mobile Web',	'Questo libro illustra come ottimizzare le pagine web per la navigazione su dispositivi mobili, utilizzando gli strumenti familiari come HTML, CSS e JS, adattandole a dispositivi di varie dimensioni.',	'/assets/tutorials/imgs/mobileweb.webp');
INSERT INTO `tutorial` (`Titolo`, `Descrizione`, `Pathimg`) VALUES
('Head First JavaScript',	'Il libro copre le basi della programmazione, il funzionamento del browser nell\'esecuzione del codice e l\'utilizzo del Document Object Model per modificare le pagine web senza richiedere l\'interazione dell\'utente.',	'/assets/tutorials/imgs/javascript.webp');


-- 2024-07-02 13:05:23
