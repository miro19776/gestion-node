-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 06 juin 2024 à 11:23
-- Version du serveur : 10.4.32-MariaDB
-- Version de PHP : 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `gestions1`
--

-- --------------------------------------------------------

--
-- Structure de la table `action`
--

CREATE TABLE `action` (
  `idu` int(11) NOT NULL,
  `date_entree` datetime NOT NULL,
  `date_sortie` datetime NOT NULL,
  `idc` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `action`
--

INSERT INTO `action` (`idu`, `date_entree`, `date_sortie`, `idc`) VALUES
(7, '2024-06-05 00:00:00', '2024-06-05 00:00:00', 2),
(7, '2024-06-05 00:00:00', '2024-06-05 00:00:00', 3),
(7, '2024-06-05 00:00:00', '2024-06-05 21:59:34', 4),
(7, '2024-06-05 00:00:00', '2024-06-05 00:00:00', 5);

-- --------------------------------------------------------

--
-- Structure de la table `categ`
--

CREATE TABLE `categ` (
  `idcat` int(11) NOT NULL,
  `nom` varchar(30) NOT NULL,
  `date_creation` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categ`
--

INSERT INTO `categ` (`idcat`, `nom`, `date_creation`) VALUES
(4, 'carte', '2024-06-04 21:59:04'),
(5, 'cable', '2024-06-04 22:00:51');

-- --------------------------------------------------------

--
-- Structure de la table `materiel`
--

CREATE TABLE `materiel` (
  `nom` varchar(30) NOT NULL,
  `idm` int(11) NOT NULL,
  `idcat` int(11) NOT NULL,
  `stock` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `materiel`
--

INSERT INTO `materiel` (`nom`, `idm`, `idcat`, `stock`) VALUES
('arduino', 1, 5, 2),
('arduino', 10, 4, 2),
('arduino', 11, 4, 2),
('arduino', 12, 4, 2),
('arduino', 19, 4, 2),
('arduino', 20, 4, 2),
('arduino', 22, 4, 2),
('mmmmmmmm', 24, 5, 6),
('mmmmmmmm', 25, 5, 6),
('lskls', 27, 5, 122);

-- --------------------------------------------------------

--
-- Structure de la table `transaction`
--

CREATE TABLE `transaction` (
  `idu` int(11) NOT NULL,
  `idm` int(11) NOT NULL,
  `date` datetime NOT NULL,
  `qant` int(11) NOT NULL,
  `type` enum('R','E','N') NOT NULL,
  `id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `transaction`
--

INSERT INTO `transaction` (`idu`, `idm`, `date`, `qant`, `type`, `id`) VALUES
(7, 27, '2024-06-05 21:32:04', 4, 'N', 1);

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `nom` varchar(30) NOT NULL,
  `idu` int(11) NOT NULL,
  `date_creation` date NOT NULL,
  `role` enum('A','O') NOT NULL,
  `num_carte` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`nom`, `idu`, `date_creation`, `role`, `num_carte`) VALUES
('miro', 7, '2024-06-04', 'O', 12312312);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `action`
--
ALTER TABLE `action`
  ADD PRIMARY KEY (`idc`),
  ADD KEY `idu` (`idu`);

--
-- Index pour la table `categ`
--
ALTER TABLE `categ`
  ADD PRIMARY KEY (`idcat`);

--
-- Index pour la table `materiel`
--
ALTER TABLE `materiel`
  ADD PRIMARY KEY (`idm`),
  ADD KEY `idcat` (`idcat`);

--
-- Index pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD PRIMARY KEY (`id`),
  ADD KEY `idu` (`idu`),
  ADD KEY `idm` (`idm`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`idu`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `action`
--
ALTER TABLE `action`
  MODIFY `idc` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `categ`
--
ALTER TABLE `categ`
  MODIFY `idcat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `materiel`
--
ALTER TABLE `materiel`
  MODIFY `idm` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT pour la table `transaction`
--
ALTER TABLE `transaction`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `idu` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `action`
--
ALTER TABLE `action`
  ADD CONSTRAINT `action_ibfk_1` FOREIGN KEY (`idu`) REFERENCES `user` (`idu`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `materiel`
--
ALTER TABLE `materiel`
  ADD CONSTRAINT `materiel_ibfk_1` FOREIGN KEY (`idcat`) REFERENCES `categ` (`idcat`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `transaction`
--
ALTER TABLE `transaction`
  ADD CONSTRAINT `transaction_ibfk_1` FOREIGN KEY (`idm`) REFERENCES `materiel` (`idm`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `transaction_ibfk_2` FOREIGN KEY (`idu`) REFERENCES `user` (`idu`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
