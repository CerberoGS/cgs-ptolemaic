-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         8.4.3 - MySQL Community Server - GPL
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.12.0.7122
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Volcando datos para la tabla catai.permissions: ~8 rows (aproximadamente)
REPLACE INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
	(1, 'dashboard.view', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(2, 'admin.dashboard', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(3, 'providers.view', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(4, 'providers.manage', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(5, 'users.view', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(6, 'users.manage', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(7, 'roles.view', 'web', '2025-10-12 00:42:23', '2025-10-12 00:42:23'),
	(8, 'roles.manage', 'web', '2025-10-12 00:42:23', '2025-10-12 00:42:23');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
