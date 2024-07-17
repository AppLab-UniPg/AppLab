SET NAMES utf8;
SET time_zone = '+00:00';
SET foreign_key_checks = 0;
SET sql_mode = 'NO_AUTO_VALUE_ON_ZERO';

SET NAMES utf8mb4;

CREATE DATABASE `applab` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_uca1400_ai_ci */;
USE `applab`;

/*----------------------TOKEN TABLE----------------------*/
DROP TABLE IF EXISTS `secret-key`;
CREATE TABLE `secret-key` (
  `secret` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `secret-key` (`secret`) VALUES
('5f3933533b98a0fd31e677a9f5feb853e921690f8190159526043228d29e04f5');

/*----------------------TUTORIAL TABLE----------------------*/
DROP TABLE IF EXISTS `tutorial`;
CREATE TABLE `tutorial` (
  `Titolo` varchar(255) NOT NULL,
  `Descrizione` varchar(500) DEFAULT NULL,
  `Pathimg` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Titolo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `tutorial` (`Titolo`, `Descrizione`, `Pathimg`) VALUES
('Head First HTML5',	'Recentemente HTML con la versione 5 è passato da un semplice linguaggio di markup, a qualcosa di molto più complesso.\r\nOra tramite HTML5 puoi creare applicazioni Web con archiviazione online, disegno 2D, supporto offline, socket, thread e molto altro ancora.',	'/assets/tutorials/imgs/html5.webp'),
('Head First JavaScript',	'Il libro copre le basi della programmazione, il funzionamento del browser nell\'esecuzione del codice e l\'utilizzo del Document Object Model per modificare le pagine web senza richiedere l\'interazione dell\'utente.',	'/assets/tutorials/imgs/javascript.webp'),
('Head First Mobile Web',	'Questo libro illustra come ottimizzare le pagine web per la navigazione su dispositivi mobili, utilizzando gli strumenti familiari come HTML, CSS e JS, adattandole a dispositivi di varie dimensioni.',	'/assets/tutorials/imgs/mobileweb.webp'),
('Head First Web Design',	'Il libro spiega come creare pagine web accattivanti, comunicare in modo efficace e facilitare la navigazione del sito.\r\nCiò è essenziale sia per un blog personale che per un sito web aziendale, andando oltre div e css.',	'/assets/tutorials/imgs/webdesign.webp');

/*----------------------SUBTUTORIAL TABLE----------------------*/
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
('Form HTML5',	'HTML5 forms and comparison with older versions',	'/assets/tutorials/files/headfirsthtml5formhtml5.pdf',	'/assets/tutorials/files/headfirsthtml5formhtml5.zip',	'Head First HTML5'),
('Google Maps API',	'Using Google Maps\’ API to manage maps',	'/assets/tutorials/files/headfirstjavascriptgooglemapsapi.pdf',	'/assets/tutorials/files/headfirstjavascriptgooglemapsapi.zip',	'Head First JavaScript'),
('HTML5 Capitolo 1',	'Getting to know HTML5',	'/assets/tutorials/files/headfirsthtml5html5capitolo1.pdf',	'/assets/tutorials/files/headfirsthtml5html5capitolo1.zip',	'Head First HTML5'),
('HTML5 Capitolo 2',	'Introduction to JavaScript and DOM',	'/assets/tutorials/files/headfirsthtml5html5capitolo2.pdf',	'/assets/tutorials/files/headfirsthtml5html5capitolo2.zip',	'Head First HTML5'),
('HTML5 Capitolo 3',	'Events, handlers and all that jazz',	'/assets/tutorials/files/headfirsthtml5html5capitolo3.pdf',	'/assets/tutorials/files/headfirsthtml5html5capitolo3.zip',	'Head First HTML5'),
('HTML5 Capitolo 4',	'Geolocation API',	'/assets/tutorials/files/headfirsthtml5html5capitolo4.pdf',	'/assets/tutorials/files/headfirsthtml5html5capitolo4.zip',	'Head First HTML5'),
('JavaScript 1',	'The Interactive Web',	'/assets/tutorials/files/headfirstjavascriptjavascript1.pdf',	'/assets/tutorials/files/headfirstjavascriptjavascript1.zip',	'Head First JavaScript'),
('JavaScript 2',	'Storing data',	'/assets/tutorials/files/headfirstjavascriptjavascript2.pdf',	'/assets/tutorials/files/headfirstjavascriptjavascript2.zip',	'Head First JavaScript'),
('JavaScript 3',	'Exploring the client',	'/assets/tutorials/files/headfirstjavascriptjavascript3.pdf',	'/assets/tutorials/files/headfirstjavascriptjavascript3.zip',	'Head First JavaScript'),
('JavaScript 4',	'Decision making',	'/assets/tutorials/files/headfirstjavascriptjavascript4.pdf',	'/assets/tutorials/files/headfirstjavascriptjavascript4.zip',	'Head First JavaScript'),
('JavaScript 5',	'Events and handlers',	'/assets/tutorials/files/headfirstjavascriptjavascript5.pdf',	'/assets/tutorials/files/headfirstjavascriptjavascript5.zip',	'Head First JavaScript'),
('JavaScript 6',	'Functions and modularity',	'/assets/tutorials/files/headfirstjavascriptjavascript6.pdf',	'/assets/tutorials/files/headfirstjavascriptjavascript6.rar',	'Head First JavaScript'),
('Mobile Web 1',	'Responsive Web Design',	'/assets/tutorials/files/headfirstmobilewebmobileweb1.pdf',	'/assets/tutorials/files/headfirstmobilewebmobileweb1.zip',	'Head First Mobile Web'),
('Mobile Web 2',	'Responsible Responsiveness',	'/assets/tutorials/files/headfirstmobilewebmobileweb2.pdf',	'/assets/tutorials/files/headfirstmobilewebmobileweb2.zip',	'Head First Mobile Web'),
('Mobile Web 3',	'Mobile-First approach',	'/assets/tutorials/files/headfirstmobilewebmobileweb3.pdf',	'/assets/tutorials/files/headfirstmobilewebmobileweb3.zip',	'Head First Mobile Web'),
('Web Designer 1',	'Building Beautiful Web Pages',	'/assets/tutorials/files/headfirstwebdesignwebdesigner1.pdf',	'/assets/tutorials/files/headfirstwebdesignwebdesigner1.zip',	'Head First Web Design'),
('Web Designer 2',	'Paper Covers Rock',	'/assets/tutorials/files/headfirstwebdesignwebdesigner2.pdf',	'/assets/tutorials/files/headfirstwebdesignwebdesigner2.zip',	'Head First Web Design'),
('Web Designer 3',	'Organizing your site',	'/assets/tutorials/files/headfirstwebdesignwebdesigner3.pdf',	'/assets/tutorials/files/headfirstwebdesignwebdesigner3.zip',	'Head First Web Design'),
('Web Designer 4',	'Layout and Design',	'/assets/tutorials/files/headfirstwebdesignwebdesigner4.pdf',	'/assets/tutorials/files/headfirstwebdesignwebdesigner4.zip',	'Head First Web Design');

/*----------------------PORTFOLIO TABLE----------------------*/
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