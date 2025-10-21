-- --------------------------------------------------------
-- Host:                         82.197.82.184
-- Versión del servidor:         11.8.3-MariaDB-log - MariaDB Server
-- SO del servidor:              Linux
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

-- Volcando estructura para tabla u522228883_ptolemaic.achievements
CREATE TABLE IF NOT EXISTS `achievements` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `tier` varchar(255) NOT NULL DEFAULT 'bronze',
  `points` int(11) NOT NULL DEFAULT 10,
  `criteria` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`criteria`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `achievements_key_unique` (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.achievements: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.affiliate_codes
CREATE TABLE IF NOT EXISTS `affiliate_codes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `code` varchar(20) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `total_referrals` int(11) NOT NULL DEFAULT 0,
  `active_referrals` int(11) NOT NULL DEFAULT 0,
  `total_earnings` decimal(10,2) NOT NULL DEFAULT 0.00,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `affiliate_codes_code_unique` (`code`),
  KEY `affiliate_codes_user_id_foreign` (`user_id`),
  KEY `affiliate_codes_code_is_active_index` (`code`,`is_active`),
  CONSTRAINT `affiliate_codes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.affiliate_codes: ~2 rows (aproximadamente)
INSERT IGNORE INTO `affiliate_codes` (`id`, `user_id`, `code`, `is_active`, `total_referrals`, `active_referrals`, `total_earnings`, `created_at`, `updated_at`) VALUES
	(1, 3, 'CER3', 1, 0, 0, 0.00, '2025-10-17 12:01:36', '2025-10-17 12:01:36'),
	(2, 1, 'ALE1', 1, 0, 0, 0.00, '2025-10-18 02:01:07', '2025-10-18 02:01:07');

-- Volcando estructura para tabla u522228883_ptolemaic.affiliate_rewards
CREATE TABLE IF NOT EXISTS `affiliate_rewards` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `reward_type` enum('analysis_bonus','discount_percentage') NOT NULL,
  `analysis_bonus` int(11) DEFAULT NULL,
  `discount_percentage` decimal(5,2) DEFAULT NULL,
  `referrals_count` int(11) NOT NULL DEFAULT 0,
  `status` enum('active','redeemed','expired') NOT NULL DEFAULT 'active',
  `expires_at` timestamp NULL DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `affiliate_rewards_user_id_status_index` (`user_id`,`status`),
  KEY `affiliate_rewards_reward_type_status_index` (`reward_type`,`status`),
  CONSTRAINT `affiliate_rewards_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.affiliate_rewards: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.ai_providers
CREATE TABLE IF NOT EXISTS `ai_providers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provider_category_id` bigint(20) unsigned NOT NULL,
  `slug` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `base_url` varchar(255) DEFAULT NULL,
  `docs_url` varchar(255) DEFAULT NULL,
  `verification_endpoint` varchar(255) DEFAULT NULL,
  `test_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`test_json`)),
  `ops_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ops_json`)),
  `requires_organization` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive','deprecated') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ai_providers_slug_unique` (`slug`),
  KEY `ai_providers_provider_category_id_foreign` (`provider_category_id`),
  CONSTRAINT `ai_providers_provider_category_id_foreign` FOREIGN KEY (`provider_category_id`) REFERENCES `provider_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.ai_providers: ~2 rows (aproximadamente)
INSERT IGNORE INTO `ai_providers` (`id`, `provider_category_id`, `slug`, `display_name`, `description`, `base_url`, `docs_url`, `verification_endpoint`, `test_json`, `ops_json`, `requires_organization`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 'openai', 'Open AI', NULL, NULL, 'https://platform.openai.com/docs', 'https://api.openai.com/v1/models', '[{"test": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "ok_json_path": "object", "url_override": "https://api.openai.com/v1/models", "expected_status": 200, "ok_json_expected": "list"}}]', '{"multi": {"chat": {"body": "{\\"model\\":\\"gpt-4o-mini\\",\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"{{PROMPT}}\\"}]}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}], "ok_json_path": "choices", "url_override": "https://api.openai.com/v1/chat/completions", "expected_status": 200, "ok_json_expected": "array"}, "vs.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "url_override": "https://api.openai.com/v1/files/{{FILE_ID}}", "expected_status": 200, "required_fields": ["FILE_ID"]}, "analyze": {"defaults": {"CHAT_MODEL": "gpt-4o-mini"}, "pipeline": [{"use": "vs.query", "save_as": "ctx"}, {"use": "chat", "override": {"body": "{\\"model\\":\\"gpt-4o-mini\\",\\"messages\\":[{\\"role\\":\\"system\\",\\"content\\":\\"Eres un analista. Objetivo: {{objective}}\\"},{\\"role\\":\\"user\\",\\"content\\":\\"Pregunta: {{q}}\\\\n\\\\nContexto:\\\\n{{ctx_text}}\\"}]}"}}]}, "run.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs/{{RUN_ID}}", "expected_status": 200, "required_fields": ["THREAD_ID", "RUN_ID"]}, "vs.list": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "defaults": {"limit": 1000, "order": "desc", "after_qs": null}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/files?limit={{limit}}&order={{order}}{{after_qs}}", "expected_status": 200, "ok_json_expected": "array"}, "vs.files": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50, "after_qs": null}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/files?limit={{limit}}{{after_qs}}", "expected_status": 200, "required_fields": ["VS_ID"], "ok_json_expected": "array"}, "vs.attach": {"body": "{\\"file_id\\":\\"{{FILE_ID}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}, {"name": "Content-Type", "value": "application/json"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/files", "expected_status": 200, "required_fields": ["VS_ID", "FILE_ID"]}, "vs.delete": {"method": "DELETE", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "url_override": "https://api.openai.com/v1/files/{{FILE_ID}}", "expected_status": 200, "required_fields": ["FILE_ID"]}, "vs.upload": {"method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "body_type": "multipart", "multipart": [{"name": "file", "type": "file", "value": "{{FILE_PATH}}"}, {"name": "purpose", "type": "text", "value": "assistants"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/files", "expected_status": 200, "ok_json_expected": "exists"}, "run.create": {"body": "{\\"assistant_id\\":\\"{{ASSISTANT_ID}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs", "expected_status": 200, "required_fields": ["THREAD_ID", "ASSISTANT_ID"], "ok_json_expected": "exists"}, "vs.summary": {"body": "{\\"model\\":\\"gpt-4o-mini\\",\\"messages\\":[{\\"role\\":\\"system\\",\\"content\\":\\"Resume el archivo adjunto en 5 bullets.\\"},{\\"role\\":\\"user\\",\\"content\\":\\"FILE_ID={{FILE_ID}}\\"}]}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}], "ok_json_path": "choices", "url_override": "https://api.openai.com/v1/chat/completions", "expected_status": 200, "required_fields": ["FILE_ID"], "ok_json_expected": "array"}, "vs.download": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "url_override": "https://api.openai.com/v1/files/{{FILE_ID}}/content", "expected_status": 200, "required_fields": ["FILE_ID"]}, "vs.store.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}", "expected_status": 200, "required_fields": ["VS_ID"]}, "assistant.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/assistants/{{ASSISTANT_ID}}", "expected_status": 200, "required_fields": ["ASSISTANT_ID"], "ok_json_expected": "exists"}, "messages.list": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/messages?limit={{limit}}", "expected_status": 200, "required_fields": ["THREAD_ID"], "ok_json_expected": "array"}, "thread.create": {"body": "{\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"{{USER_PROMPT}}\\"}],\\"tool_resources\\":{\\"file_search\\":{\\"vector_store_ids\\":[\\"{{VS_ID}}\\"]}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads", "expected_status": 200, "required_fields": ["USER_PROMPT", "VS_ID"], "ok_json_expected": "exists"}, "vs.store.list": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50, "after_qs": null}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/vector_stores?limit={{limit}}{{after_qs}}", "expected_status": 200, "ok_json_expected": "array"}, "run.steps.list": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "data", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs/{{RUN_ID}}/steps", "expected_status": 200, "required_fields": ["THREAD_ID", "RUN_ID"], "ok_json_expected": "array"}, "vs.attach_batch": {"body": "{\\"file_ids\\":{{FILE_IDS_JSON}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}, {"name": "Content-Type", "value": "application/json"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/file_batches", "expected_status": 200, "required_fields": ["VS_ID", "FILE_IDS_JSON"]}, "vs.store.create": {"body": "{\\"name\\":\\"{{VS_NAME}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/vector_stores", "expected_status": 200, "required_fields": ["VS_NAME"], "ok_json_expected": "exists"}, "vs.store.delete": {"method": "DELETE", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}", "expected_status": 200, "required_fields": ["VS_ID"]}, "assistant.create": {"body": "{\\"model\\":\\"gpt-4o-mini\\",\\"name\\":\\"{{ASSISTANT_NAME}}\\",\\"description\\":\\"Extractor de conocimiento para el VS del usuario {{USER_ID}}\\",\\"instructions\\":\\"{{ASSISTANT_INSTRUCTIONS}}\\",\\"tools\\":[{\\"type\\":\\"file_search\\"}],\\"tool_resources\\":{\\"file_search\\":{\\"vector_store_ids\\":[\\"{{VS_ID}}\\"]}},\\"response_format\\":{\\"type\\":\\"json_schema\\",\\"json_schema\\":{\\"name\\":\\"ResumenEstructurado\\",\\"schema\\":{\\"type\\":\\"object\\",\\"properties\\":{\\"resumen\\":{\\"type\\":\\"string\\"},\\"puntos_clave\\":{\\"type\\":\\"array\\",\\"items\\":{\\"type\\":\\"string\\"}},\\"estrategias\\":{\\"type\\":\\"array\\",\\"items\\":{\\"type\\":\\"string\\"}},\\"gestion_riesgo\\":{\\"type\\":\\"array\\",\\"items\\":{\\"type\\":\\"string\\"}},\\"recomendaciones\\":{\\"type\\":\\"array\\",\\"items\\":{\\"type\\":\\"string\\"}}},\\"required\\":[\\"resumen\\",\\"puntos_clave\\",\\"estrategias\\",\\"gestion_riesgo\\",\\"recomendaciones\\"],\\"additionalProperties\\":false}}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/assistants", "expected_status": 200, "required_fields": ["VS_ID", "USER_ID", "ASSISTANT_NAME", "ASSISTANT_INSTRUCTIONS"], "ok_json_expected": "exists"}, "run.create.loose": {"body": "{\\"assistant_id\\":\\"{{ASSISTANT_ID}}\\",\\"response_format\\":{\\"type\\":\\"json_object\\"},\\"metadata\\":{\\"purpose\\":\\"diagnostic_loose\\"}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs", "expected_status": 200, "required_fields": ["THREAD_ID", "ASSISTANT_ID"], "ok_json_expected": "exists"}, "vs.delete_from_vs": {"method": "DELETE", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/files/{{FILE_ID}}", "expected_status": 200, "required_fields": ["VS_ID", "FILE_ID"]}, "vs.store.file.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/files/{{FILE_ID}}", "expected_status": 200, "required_fields": ["VS_ID", "FILE_ID"]}, "assistant.update_vs": {"body": "{\\"tool_resources\\":{\\"file_search\\":{\\"vector_store_ids\\":[\\"{{VS_ID}}\\"]}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/assistants/{{ASSISTANT_ID}}", "expected_status": 200, "required_fields": ["ASSISTANT_ID", "VS_ID"]}, "messages.list.by_run": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50, "order": "asc"}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/messages?limit={{limit}}&order={{order}}&run_id={{RUN_ID}}", "expected_status": 200, "required_fields": ["THREAD_ID", "RUN_ID"], "ok_json_expected": "array"}, "vs.summarize_from_vs": {"defaults": {"VS_ID": null, "PROMPT": "Genera un resumen estructurado del contenido del Vector Store del usuario siguiendo el esquema configurado.", "ASSISTANT_ID": null}, "pipeline": [{"use": "thread.create", "vars": {"VS_ID": "{{VS_ID}}", "USER_PROMPT": "{{PROMPT}}"}, "save_as": "thread"}, {"use": "run.create", "vars": {"THREAD_ID": "{{thread.id}}", "ASSISTANT_ID": "{{ASSISTANT_ID}}"}, "save_as": "run"}, {"use": "messages.list", "vars": {"limit": 50, "THREAD_ID": "{{thread.id}}"}, "save_as": "msgs"}]}, "assistant.update_name": {"body": "{\\"name\\":\\"{{NEW_NAME}}\\",\\"description\\":\\"{{NEW_DESC}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/assistants/{{ASSISTANT_ID}}", "expected_status": 200, "required_fields": ["ASSISTANT_ID", "NEW_NAME"]}, "messages.list.ordered": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50, "order": "desc"}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/messages?limit={{limit}}&order={{order}}", "expected_status": 200, "required_fields": ["THREAD_ID"], "ok_json_expected": "array"}, "thread.create.extract": {"body": "{\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"{{EXTRACT_PROMPT}}\\"}],\\"tool_resources\\":{\\"file_search\\":{\\"vector_store_ids\\":[\\"{{VS_ID}}\\"]}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads", "expected_status": 200, "required_fields": ["EXTRACT_PROMPT", "VS_ID"], "ok_json_expected": "exists"}, "extract.knowledge_from_vs": {"defaults": {"VS_ID": null, "ASSISTANT_ID": null, "EXTRACT_PROMPT": "Extrae un JSON con los campos {\\"title\\": string, \\"summary\\": string, \\"entities\\": [{\\"name\\": string, \\"type\\": string}], \\"tickers\\": [string], \\"dates\\": [string]} usando SOLO evidencia del Vector Store. Devuelve SOLO el JSON."}, "pipeline": [{"use": "thread.create.extract", "vars": {"VS_ID": "{{VS_ID}}", "EXTRACT_PROMPT": "{{EXTRACT_PROMPT}}"}, "save_as": "thread"}, {"use": "run.create", "vars": {"THREAD_ID": "{{thread.id}}", "ASSISTANT_ID": "{{ASSISTANT_ID}}"}, "save_as": "run"}, {"use": "messages.list", "vars": {"limit": 50, "THREAD_ID": "{{thread.id}}"}, "save_as": "msgs"}]}, "run.create.with_instructions": {"body": "{\\"assistant_id\\":\\"{{ASSISTANT_ID}}\\",\\"instructions\\":\\"{{USER_PROMPT}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs", "expected_status": 200, "required_fields": ["THREAD_ID", "ASSISTANT_ID", "USER_PROMPT"], "ok_json_expected": "exists"}}, "provider_profile": {"vs": "provider"}}', 0, 'active', '2025-10-12 00:12:13', '2025-10-13 00:19:50'),
	(2, 1, 'google', 'Google Gemini', NULL, NULL, NULL, NULL, '[]', '[]', 0, 'active', '2025-10-12 20:45:07', '2025-10-12 20:45:07');

-- Volcando estructura para tabla u522228883_ptolemaic.ai_provider_keys
CREATE TABLE IF NOT EXISTS `ai_provider_keys` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `ai_provider_id` bigint(20) unsigned NOT NULL,
  `ai_provider_model_id` bigint(20) unsigned DEFAULT NULL,
  `label` varchar(255) NOT NULL,
  `secret_encrypted` text NOT NULL,
  `scopes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`scopes`)),
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `sandbox` tinyint(1) NOT NULL DEFAULT 0,
  `verification_status` enum('pending','passed','failed') NOT NULL DEFAULT 'pending',
  `last_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ai_keys_user_provider_unique` (`user_id`,`ai_provider_id`),
  KEY `ai_provider_keys_ai_provider_id_foreign` (`ai_provider_id`),
  KEY `ai_provider_keys_ai_provider_model_id_foreign` (`ai_provider_model_id`),
  CONSTRAINT `ai_provider_keys_ai_provider_id_foreign` FOREIGN KEY (`ai_provider_id`) REFERENCES `ai_providers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ai_provider_keys_ai_provider_model_id_foreign` FOREIGN KEY (`ai_provider_model_id`) REFERENCES `ai_provider_models` (`id`) ON DELETE SET NULL,
  CONSTRAINT `ai_provider_keys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.ai_provider_keys: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.ai_provider_key_verifications
CREATE TABLE IF NOT EXISTS `ai_provider_key_verifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ai_provider_key_id` bigint(20) unsigned NOT NULL,
  `status` enum('pending','passed','failed') NOT NULL DEFAULT 'pending',
  `response_code` smallint(5) unsigned DEFAULT NULL,
  `message` text DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload`)),
  `verified_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `ai_provider_key_verifications_ai_provider_key_id_foreign` (`ai_provider_key_id`),
  KEY `ai_provider_key_verifications_verified_by_foreign` (`verified_by`),
  CONSTRAINT `ai_provider_key_verifications_ai_provider_key_id_foreign` FOREIGN KEY (`ai_provider_key_id`) REFERENCES `ai_provider_keys` (`id`) ON DELETE CASCADE,
  CONSTRAINT `ai_provider_key_verifications_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.ai_provider_key_verifications: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.ai_provider_models
CREATE TABLE IF NOT EXISTS `ai_provider_models` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `ai_provider_id` bigint(20) unsigned NOT NULL,
  `slug` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `context_window` int(10) unsigned DEFAULT NULL,
  `capabilities` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`capabilities`)),
  `pricing` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`pricing`)),
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `availability` enum('general','limited','deprecated') NOT NULL DEFAULT 'general',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `ai_provider_models_ai_provider_id_slug_unique` (`ai_provider_id`,`slug`),
  CONSTRAINT `ai_provider_models_ai_provider_id_foreign` FOREIGN KEY (`ai_provider_id`) REFERENCES `ai_providers` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.ai_provider_models: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.cache
CREATE TABLE IF NOT EXISTS `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.cache: ~23 rows (aproximadamente)
INSERT IGNORE INTO `cache` (`key`, `value`, `expiration`) VALUES
	('cgs_ptolemaic_cache_0ade7c2cf97f75d009975f4d720d1fa6c19f4897', 'i:2;', 1760723512),
	('cgs_ptolemaic_cache_0ade7c2cf97f75d009975f4d720d1fa6c19f4897:timer', 'i:1760723512;', 1760723512),
	('cgs_ptolemaic_cache_356a192b7913b04c54574d18c28d46e6395428ab', 'i:1;', 1760702516),
	('cgs_ptolemaic_cache_356a192b7913b04c54574d18c28d46e6395428ab:timer', 'i:1760702516;', 1760702516),
	('cgs_ptolemaic_cache_3cc35f579037a525df692da9191993e6ef94a1fd', 'i:1;', 1760379994),
	('cgs_ptolemaic_cache_3cc35f579037a525df692da9191993e6ef94a1fd:timer', 'i:1760379994;', 1760379994),
	('cgs_ptolemaic_cache_5eaaf6e791c42e4179c7463942ca4c043b622bc6', 'i:1;', 1760929435),
	('cgs_ptolemaic_cache_5eaaf6e791c42e4179c7463942ca4c043b622bc6:timer', 'i:1760929435;', 1760929435),
	('cgs_ptolemaic_cache_77de68daecd823babbb58edb1c8e14d7106e83bb', 'i:2;', 1760702496),
	('cgs_ptolemaic_cache_77de68daecd823babbb58edb1c8e14d7106e83bb:timer', 'i:1760702496;', 1760702496),
	('cgs_ptolemaic_cache_7dac80c35af9dddd2f3e5b65a66e7a077d2f83c2', 'i:1;', 1760344763),
	('cgs_ptolemaic_cache_7dac80c35af9dddd2f3e5b65a66e7a077d2f83c2:timer', 'i:1760344763;', 1760344763),
	('cgs_ptolemaic_cache_cerbero@cerberogrowthsolutions.com|72.182.12.119', 'i:2;', 1760738294),
	('cgs_ptolemaic_cache_cerbero@cerberogrowthsolutions.com|72.182.12.119:timer', 'i:1760738294;', 1760738294),
	('cgs_ptolemaic_cache_cristofecarocorderocc@gmail.co|104.28.48.168', 'i:1;', 1760554314),
	('cgs_ptolemaic_cache_cristofecarocorderocc@gmail.co|104.28.48.168:timer', 'i:1760554314;', 1760554314),
	('cgs_ptolemaic_cache_disruptz.centennial@gmail.com|174.230.77.231', 'i:1;', 1760539324),
	('cgs_ptolemaic_cache_disruptz.centennial@gmail.com|174.230.77.231:timer', 'i:1760539324;', 1760539324),
	('cgs_ptolemaic_cache_fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f', 'i:2;', 1760716024),
	('cgs_ptolemaic_cache_fe5dbbcea5ce7e2988b8c69bcfdfde8904aabc1f:timer', 'i:1760716024;', 1760716024),
	('cgs_ptolemaic_cache_session_log_1', 'i:1760987700;', 1760988000),
	('cgs_ptolemaic_cache_session_log_3', 'i:1760927404;', 1760927704),
	('cgs_ptolemaic_cache_spatie.permission.cache', 'a:3:{s:5:"alias";a:4:{s:1:"a";s:2:"id";s:1:"b";s:4:"name";s:1:"c";s:10:"guard_name";s:1:"r";s:5:"roles";}s:11:"permissions";a:9:{i:0;a:4:{s:1:"a";i:1;s:1:"b";s:14:"dashboard.view";s:1:"c";s:3:"web";s:1:"r";a:3:{i:0;i:1;i:1;i:2;i:2;i:3;}}i:1;a:4:{s:1:"a";i:2;s:1:"b";s:15:"admin.dashboard";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:1;i:1;i:3;}}i:2;a:4:{s:1:"a";i:3;s:1:"b";s:14:"providers.view";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:1;i:1;i:3;}}i:3;a:4:{s:1:"a";i:4;s:1:"b";s:16:"providers.manage";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:1;i:1;i:3;}}i:4;a:4:{s:1:"a";i:5;s:1:"b";s:10:"users.view";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:1;i:1;i:3;}}i:5;a:4:{s:1:"a";i:6;s:1:"b";s:12:"users.manage";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:6;a:4:{s:1:"a";i:7;s:1:"b";s:10:"roles.view";s:1:"c";s:3:"web";s:1:"r";a:2:{i:0;i:1;i:1;i:3;}}i:7;a:4:{s:1:"a";i:8;s:1:"b";s:12:"roles.manage";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}i:8;a:4:{s:1:"a";i:9;s:1:"b";s:16:"affiliate.manage";s:1:"c";s:3:"web";s:1:"r";a:1:{i:0;i:1;}}}s:5:"roles";a:3:{i:0;a:3:{s:1:"a";i:1;s:1:"b";s:5:"Admin";s:1:"c";s:3:"web";}i:1;a:3:{s:1:"a";i:2;s:1:"b";s:4:"User";s:1:"c";s:3:"web";}i:2;a:3:{s:1:"a";i:3;s:1:"b";s:7:"Manager";s:1:"c";s:3:"web";}}}', 1761012237);

-- Volcando estructura para tabla u522228883_ptolemaic.cache_locks
CREATE TABLE IF NOT EXISTS `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.cache_locks: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.failed_jobs
CREATE TABLE IF NOT EXISTS `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.failed_jobs: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.feedback
CREATE TABLE IF NOT EXISTS `feedback` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `type` enum('bug','suggestion','question','praise','data_issue') NOT NULL,
  `subject` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `screenshot` varchar(255) DEFAULT NULL,
  `url` varchar(500) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `status` enum('new','in_review','resolved','closed') NOT NULL DEFAULT 'new',
  `admin_notes` text DEFAULT NULL,
  `priority` enum('low','medium','high','critical') NOT NULL DEFAULT 'medium',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `feedback_status_created_at_index` (`status`,`created_at`),
  KEY `feedback_type_created_at_index` (`type`,`created_at`),
  KEY `feedback_user_id_index` (`user_id`),
  CONSTRAINT `feedback_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.feedback: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.invitations
CREATE TABLE IF NOT EXISTS `invitations` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `target_plan` varchar(255) NOT NULL,
  `price_monthly` decimal(10,2) DEFAULT NULL,
  `discount_percent` int(11) NOT NULL DEFAULT 0,
  `trial_duration_days` int(11) DEFAULT NULL,
  `usage_limit` int(11) DEFAULT NULL,
  `usage_count` int(11) NOT NULL DEFAULT 0,
  `expires_at` timestamp NULL DEFAULT NULL,
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `created_by` bigint(20) unsigned DEFAULT NULL,
  `referred_by` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `invitations_code_unique` (`code`),
  KEY `invitations_status_expires_at_index` (`status`,`expires_at`),
  KEY `invitations_created_by_index` (`created_by`),
  CONSTRAINT `invitations_created_by_foreign` FOREIGN KEY (`created_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.invitations: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.invitation_redemptions
CREATE TABLE IF NOT EXISTS `invitation_redemptions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `invitation_id` bigint(20) unsigned NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `user_email` varchar(255) NOT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `invitation_redemptions_user_id_foreign` (`user_id`),
  KEY `invitation_redemptions_invitation_id_user_id_index` (`invitation_id`,`user_id`),
  KEY `invitation_redemptions_user_email_index` (`user_email`),
  CONSTRAINT `invitation_redemptions_invitation_id_foreign` FOREIGN KEY (`invitation_id`) REFERENCES `invitations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `invitation_redemptions_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.invitation_redemptions: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.jobs
CREATE TABLE IF NOT EXISTS `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.jobs: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.job_batches
CREATE TABLE IF NOT EXISTS `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.job_batches: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.journal_entries
CREATE TABLE IF NOT EXISTS `journal_entries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `symbol` varchar(20) NOT NULL,
  `direction` enum('long','short') NOT NULL,
  `asset_type` enum('stock','forex','crypto','option','future') NOT NULL DEFAULT 'stock',
  `entry_price` decimal(15,8) NOT NULL,
  `exit_price` decimal(15,8) DEFAULT NULL,
  `stop_loss` decimal(10,4) DEFAULT NULL,
  `take_profit` decimal(10,4) DEFAULT NULL,
  `risk_reward_ratio` decimal(10,2) DEFAULT NULL,
  `account_risk_percent` decimal(5,2) DEFAULT NULL,
  `actual_risk_reward` decimal(10,2) DEFAULT NULL,
  `quantity` decimal(15,4) NOT NULL,
  `pnl` decimal(15,2) DEFAULT NULL,
  `pnl_percentage` decimal(8,4) DEFAULT NULL,
  `setup_type` varchar(50) DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `images` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`images`)),
  `emotion` tinyint(4) DEFAULT NULL,
  `trade_date` timestamp NOT NULL,
  `entry_time` timestamp NULL DEFAULT NULL,
  `exit_time` timestamp NULL DEFAULT NULL,
  `hold_time_minutes` int(11) DEFAULT NULL,
  `followed_plan` tinyint(1) NOT NULL DEFAULT 1,
  `mistakes` text DEFAULT NULL,
  `lessons_learned` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `journal_entries_user_id_trade_date_index` (`user_id`,`trade_date`),
  KEY `journal_entries_user_id_asset_type_index` (`user_id`,`asset_type`),
  KEY `journal_entries_user_id_setup_type_index` (`user_id`,`setup_type`),
  CONSTRAINT `journal_entries_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.journal_entries: ~2 rows (aproximadamente)
INSERT IGNORE INTO `journal_entries` (`id`, `user_id`, `symbol`, `direction`, `asset_type`, `entry_price`, `exit_price`, `stop_loss`, `take_profit`, `risk_reward_ratio`, `account_risk_percent`, `actual_risk_reward`, `quantity`, `pnl`, `pnl_percentage`, `setup_type`, `notes`, `tags`, `images`, `emotion`, `trade_date`, `entry_time`, `exit_time`, `hold_time_minutes`, `followed_plan`, `mistakes`, `lessons_learned`, `created_at`, `updated_at`) VALUES
	(1, 6, 'TSLA', 'long', 'option', 120.00000000, 155.00000000, NULL, NULL, NULL, NULL, NULL, 5.0000, 175.00, 29.1667, 'calls', NULL, '[]', NULL, NULL, '2025-10-16 00:00:00', NULL, NULL, NULL, 1, NULL, NULL, '2025-10-16 16:14:39', '2025-10-16 16:14:39'),
	(2, 8, 'TSLA', 'long', 'option', 2.49000000, 1.60000000, NULL, NULL, NULL, NULL, NULL, 400.0000, -356.00, -35.7430, '.TSLA251017P430', '<p>me pareció buena oportunidad </p>', '["confiado"]', NULL, 2, '2025-10-17 00:00:00', '2025-10-17 11:37:00', '2025-10-17 11:57:00', 20, 1, NULL, NULL, '2025-10-17 16:00:31', '2025-10-17 16:02:15');

-- Volcando estructura para tabla u522228883_ptolemaic.languages
CREATE TABLE IF NOT EXISTS `languages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(2) NOT NULL,
  `name` varchar(255) NOT NULL,
  `native_name` varchar(255) NOT NULL,
  `flag` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_default` tinyint(1) NOT NULL DEFAULT 0,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `languages_code_unique` (`code`),
  KEY `languages_is_active_sort_order_index` (`is_active`,`sort_order`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.languages: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.market_data_providers
CREATE TABLE IF NOT EXISTS `market_data_providers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provider_category_id` bigint(20) unsigned NOT NULL,
  `slug` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `base_url` varchar(255) DEFAULT NULL,
  `docs_url` varchar(255) DEFAULT NULL,
  `verification_endpoint` varchar(255) DEFAULT NULL,
  `test_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`test_json`)),
  `ops_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ops_json`)),
  `data_frequency` varchar(255) DEFAULT NULL,
  `rate_limit_per_minute` smallint(5) unsigned DEFAULT NULL,
  `supports_historical` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive','deprecated') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `market_data_providers_slug_unique` (`slug`),
  KEY `market_data_providers_provider_category_id_foreign` (`provider_category_id`),
  CONSTRAINT `market_data_providers_provider_category_id_foreign` FOREIGN KEY (`provider_category_id`) REFERENCES `provider_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.market_data_providers: ~1 rows (aproximadamente)
INSERT IGNORE INTO `market_data_providers` (`id`, `provider_category_id`, `slug`, `display_name`, `description`, `base_url`, `docs_url`, `verification_endpoint`, `test_json`, `ops_json`, `data_frequency`, `rate_limit_per_minute`, `supports_historical`, `status`, `created_at`, `updated_at`) VALUES
	(1, 2, 'polygon', 'Polygon', NULL, NULL, NULL, NULL, '[]', '[]', NULL, NULL, 0, 'active', '2025-10-12 00:12:35', '2025-10-12 00:12:35');

-- Volcando estructura para tabla u522228883_ptolemaic.market_data_provider_keys
CREATE TABLE IF NOT EXISTS `market_data_provider_keys` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `market_data_provider_id` bigint(20) unsigned NOT NULL,
  `label` varchar(255) NOT NULL,
  `secret_encrypted` text NOT NULL,
  `scopes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`scopes`)),
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `default_symbol` varchar(255) DEFAULT NULL,
  `region` varchar(255) DEFAULT NULL,
  `sandbox` tinyint(1) NOT NULL DEFAULT 0,
  `verification_status` enum('pending','passed','failed') NOT NULL DEFAULT 'pending',
  `last_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `md_keys_user_provider_unique` (`user_id`,`market_data_provider_id`),
  KEY `market_data_provider_keys_market_data_provider_id_foreign` (`market_data_provider_id`),
  CONSTRAINT `market_data_provider_keys_market_data_provider_id_foreign` FOREIGN KEY (`market_data_provider_id`) REFERENCES `market_data_providers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `market_data_provider_keys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.market_data_provider_keys: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.market_data_provider_key_verifications
CREATE TABLE IF NOT EXISTS `market_data_provider_key_verifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `market_data_provider_key_id` bigint(20) unsigned NOT NULL,
  `status` enum('pending','passed','failed') NOT NULL DEFAULT 'pending',
  `response_code` smallint(5) unsigned DEFAULT NULL,
  `message` text DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload`)),
  `verified_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `market_data_provider_key_verifications_verified_by_foreign` (`verified_by`),
  KEY `md_provider_key_verifications_key_fk` (`market_data_provider_key_id`),
  CONSTRAINT `market_data_provider_key_verifications_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  CONSTRAINT `md_provider_key_verifications_key_fk` FOREIGN KEY (`market_data_provider_key_id`) REFERENCES `market_data_provider_keys` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.market_data_provider_key_verifications: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.migrations
CREATE TABLE IF NOT EXISTS `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.migrations: ~49 rows (aproximadamente)
INSERT IGNORE INTO `migrations` (`id`, `migration`, `batch`) VALUES
	(1, '0001_01_01_000000_create_users_table', 1),
	(2, '0001_01_01_000001_create_cache_table', 1),
	(3, '0001_01_01_000002_create_jobs_table', 1),
	(4, '2025_08_26_100418_add_two_factor_columns_to_users_table', 1),
	(5, '2025_10_03_105002_add_google_id_to_users_table', 2),
	(6, '2025_10_03_105203_make_password_nullable_in_users_table', 3),
	(7, '2025_10_10_011552_create_provider_categories_table', 4),
	(8, '2025_10_10_011557_create_ai_providers_table', 4),
	(9, '2025_10_10_011558_create_ai_provider_models_table', 5),
	(10, '2025_10_10_011601_create_ai_provider_keys_table', 6),
	(11, '2025_10_10_011606_create_ai_provider_key_verifications_table', 6),
	(12, '2025_10_10_012145_create_market_data_providers_table', 6),
	(13, '2025_10_10_012151_create_market_data_provider_keys_table', 6),
	(14, '2025_10_10_012155_create_market_data_provider_key_verifications_table', 7),
	(15, '2025_10_10_012205_create_news_providers_table', 7),
	(16, '2025_10_10_012212_create_news_provider_keys_table', 7),
	(17, '2025_10_10_012217_create_news_provider_key_verifications_table', 7),
	(18, '2025_10_10_012231_create_trading_providers_table', 7),
	(19, '2025_10_10_012235_create_trading_provider_keys_table', 8),
	(20, '2025_10_10_012239_create_trading_provider_key_verifications_table', 8),
	(21, '2025_10_10_014051_create_user_default_provider_settings_table', 9),
	(22, '2025_10_10_021551_add_endpoint_schemas_to_provider_tables', 2),
	(23, '2025_10_10_021551_add_endpoint_schemas_to_provider_tables', 10),
	(24, '2025_10_10_024358_create_permission_tables', 11),
	(25, '2025_10_12_195158_create_oauth_auth_codes_table', 12),
	(26, '2025_10_12_195159_create_oauth_access_tokens_table', 12),
	(27, '2025_10_12_195200_create_oauth_refresh_tokens_table', 12),
	(28, '2025_10_12_195201_create_oauth_clients_table', 12),
	(29, '2025_10_12_195202_create_oauth_device_codes_table', 12),
	(30, '2025_10_13_194035_add_plan_fields_to_users_table', 13),
	(31, '2025_10_14_155900_create_plan_changes_table', 13),
	(32, '2025_10_14_161824_create_journal_entries_table', 13),
	(33, '2025_10_14_194442_add_risk_fields_to_journal_entries_table', 13),
	(34, '2025_10_14_194504_create_achievements_tables', 13),
	(35, '2025_10_14_211846_create_feedback_table', 13),
	(36, '2025_10_15_010544_add_card_added_at_to_users_table', 13),
	(37, '2025_10_15_011213_create_invitations_table', 13),
	(38, '2025_10_15_020707_migrate_trial_users_to_managed', 13),
	(39, '2025_10_16_032404_create_pricing_plans_table', 14),
	(40, '2025_10_16_040303_add_phone_to_users_table', 14),
	(41, '2025_10_16_222955_create_languages_table', 14),
	(42, '2025_10_17_010203_create_affiliate_codes_table', 14),
	(43, '2025_10_17_010207_create_referrals_table', 14),
	(44, '2025_10_17_010210_create_affiliate_rewards_table', 14),
	(45, '2025_10_17_010254_add_affiliate_fields_to_users_table', 14),
	(46, '2025_10_17_013307_create_waitlist_entries_table', 14),
	(47, '2025_10_18_011519_add_2fa_fields_to_users_table', 15),
	(48, '2025_10_18_011528_create_telegram_config_table', 15),
	(49, '2025_10_18_044032_ensure_affiliate_manage_permission', 15);

-- Volcando estructura para tabla u522228883_ptolemaic.model_has_permissions
CREATE TABLE IF NOT EXISTS `model_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`model_id`,`model_type`),
  KEY `model_has_permissions_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.model_has_permissions: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.model_has_roles
CREATE TABLE IF NOT EXISTS `model_has_roles` (
  `role_id` bigint(20) unsigned NOT NULL,
  `model_type` varchar(255) NOT NULL,
  `model_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`role_id`,`model_id`,`model_type`),
  KEY `model_has_roles_model_id_model_type_index` (`model_id`,`model_type`),
  CONSTRAINT `model_has_roles_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.model_has_roles: ~10 rows (aproximadamente)
INSERT IGNORE INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
	(1, 'App\\Models\\User', 1),
	(1, 'App\\Models\\User', 2),
	(2, 'App\\Models\\User', 2),
	(2, 'App\\Models\\User', 3),
	(2, 'App\\Models\\User', 4),
	(2, 'App\\Models\\User', 5),
	(2, 'App\\Models\\User', 6),
	(2, 'App\\Models\\User', 7),
	(2, 'App\\Models\\User', 8),
	(2, 'App\\Models\\User', 9);

-- Volcando estructura para tabla u522228883_ptolemaic.news_providers
CREATE TABLE IF NOT EXISTS `news_providers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provider_category_id` bigint(20) unsigned NOT NULL,
  `slug` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `base_url` varchar(255) DEFAULT NULL,
  `docs_url` varchar(255) DEFAULT NULL,
  `verification_endpoint` varchar(255) DEFAULT NULL,
  `test_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`test_json`)),
  `ops_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ops_json`)),
  `category_filters` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`category_filters`)),
  `language_support` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`language_support`)),
  `webhook_support` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive','deprecated') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_providers_slug_unique` (`slug`),
  KEY `news_providers_provider_category_id_foreign` (`provider_category_id`),
  CONSTRAINT `news_providers_provider_category_id_foreign` FOREIGN KEY (`provider_category_id`) REFERENCES `provider_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.news_providers: ~1 rows (aproximadamente)
INSERT IGNORE INTO `news_providers` (`id`, `provider_category_id`, `slug`, `display_name`, `description`, `base_url`, `docs_url`, `verification_endpoint`, `test_json`, `ops_json`, `category_filters`, `language_support`, `webhook_support`, `status`, `created_at`, `updated_at`) VALUES
	(1, 3, 'finviz', 'Finviz.com', NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', 0, 'active', '2025-10-12 20:45:44', '2025-10-12 20:45:44');

-- Volcando estructura para tabla u522228883_ptolemaic.news_provider_keys
CREATE TABLE IF NOT EXISTS `news_provider_keys` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `news_provider_id` bigint(20) unsigned NOT NULL,
  `label` varchar(255) NOT NULL,
  `secret_encrypted` text NOT NULL,
  `scopes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`scopes`)),
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `preferred_language` varchar(255) DEFAULT NULL,
  `sandbox` tinyint(1) NOT NULL DEFAULT 0,
  `verification_status` enum('pending','passed','failed') NOT NULL DEFAULT 'pending',
  `last_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `news_keys_user_provider_unique` (`user_id`,`news_provider_id`),
  KEY `news_provider_keys_news_provider_id_foreign` (`news_provider_id`),
  CONSTRAINT `news_provider_keys_news_provider_id_foreign` FOREIGN KEY (`news_provider_id`) REFERENCES `news_providers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `news_provider_keys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.news_provider_keys: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.news_provider_key_verifications
CREATE TABLE IF NOT EXISTS `news_provider_key_verifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `news_provider_key_id` bigint(20) unsigned NOT NULL,
  `status` enum('pending','passed','failed') NOT NULL DEFAULT 'pending',
  `response_code` smallint(5) unsigned DEFAULT NULL,
  `message` text DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload`)),
  `verified_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `news_provider_key_verifications_verified_by_foreign` (`verified_by`),
  KEY `news_provider_key_ver_key_fk` (`news_provider_key_id`),
  CONSTRAINT `news_provider_key_ver_key_fk` FOREIGN KEY (`news_provider_key_id`) REFERENCES `news_provider_keys` (`id`) ON DELETE CASCADE,
  CONSTRAINT `news_provider_key_verifications_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.news_provider_key_verifications: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.oauth_access_tokens
CREATE TABLE IF NOT EXISTS `oauth_access_tokens` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_access_tokens_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.oauth_access_tokens: ~3 rows (aproximadamente)
INSERT IGNORE INTO `oauth_access_tokens` (`id`, `user_id`, `client_id`, `name`, `scopes`, `revoked`, `created_at`, `updated_at`, `expires_at`) VALUES
	('009801a88cb406c1dd870e9bd80c31a163a8fe1b5270a7385beb69a5e97c5868e19534af55feff7a', 1, '0199d9fb-fcc6-7066-9480-979cbe69c286', 'MCP manual test', '["mcp:use"]', 0, '2025-10-13 03:59:08', '2025-10-13 03:59:08', '2026-10-13 03:59:08'),
	('833d3d194ef0fda08631f1493cf7ca2f40929e0e24eaae2ebd8fd2b4559bf6f5d636b17227a87584', 1, '0199dcb8-5da2-7329-ba4f-79305d849d9b', NULL, '["mcp:use"]', 0, '2025-10-13 08:38:23', '2025-10-13 08:38:23', '2026-10-13 08:38:23'),
	('f54c2a80110d6bb150815924459da213baf9e07408949909bb42975f51ebb4a9db8926cf58b1d65e', 1, '0199ded0-b8b4-7062-ba08-2aaf86dad918', NULL, '["mcp:use"]', 0, '2025-10-13 18:25:34', '2025-10-13 18:25:34', '2026-10-13 18:25:34');

-- Volcando estructura para tabla u522228883_ptolemaic.oauth_auth_codes
CREATE TABLE IF NOT EXISTS `oauth_auth_codes` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) unsigned NOT NULL,
  `client_id` char(36) NOT NULL,
  `scopes` text DEFAULT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_auth_codes_user_id_index` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.oauth_auth_codes: ~22 rows (aproximadamente)
INSERT IGNORE INTO `oauth_auth_codes` (`id`, `user_id`, `client_id`, `scopes`, `revoked`, `expires_at`) VALUES
	('0f1751425c15c0a562d0375da3ac28a542fc681bb9c997de668e5454069e5e650772d241e8e51687', 1, '0199db77-a372-7339-8eb6-26cc915951ef', '["mcp:use"]', 0, '2025-10-13 03:01:22'),
	('19561b07dd58f8b976614909c67a210aa81e94fdaded23ac93d860b99bb01b9ea3727e19a9ed657f', 1, '0199db82-5ce1-7379-9b40-329af97a6bee', '["mcp:use"]', 0, '2025-10-13 03:09:43'),
	('2c1c342fe2b33cfec4498723324f17f698ee731db0c4e807e99e919e18b57115a541ae8af2157ae9', 1, '0199da7f-23eb-7113-a3d1-978172eb8c78', '["mcp:use"]', 0, '2025-10-13 02:03:30'),
	('2f9e9ada764f94aac5e8ca80e9caf1edffc723d4b6f3fe1cccfd335c97a8ce7f89fc8b80e9edfed0', 1, '0199ded0-b8b4-7062-ba08-2aaf86dad918', '["mcp:use"]', 0, '2025-10-13 18:34:15'),
	('35346dfbb1487db5e008a08fbce3a168f1e875b11994707a703ca6178ffbb80b899a0bf1cb011ad6', 1, '0199dbde-79ad-723f-b5f4-4d64ad775214', '["mcp:use"]', 0, '2025-10-13 04:50:19'),
	('47b6785dbfb06dcec2e37981bd54ccbba2986e51f8f65ec791a4b561dae2c3306e820e95069e9a55', 1, '0199da7f-23eb-7113-a3d1-978172eb8c78', '["mcp:use"]', 0, '2025-10-13 02:41:46'),
	('4c485ace5b24282e28fe46e45cfffbd031707d0bd607070f200f23c1abd5595c06b9511cdc857f21', 1, '0199db6d-c4b7-703c-a48b-9829fb73a932', '["mcp:use"]', 0, '2025-10-13 02:47:57'),
	('53436dc924f57497c5f4afbb1a3146411b44b0769aa9945b4db44879ac669d4c03485313cc48423a', 1, '0199dbc1-8f7e-7312-a95e-13ad1872dc99', '["mcp:use"]', 0, '2025-10-13 04:18:45'),
	('58a5bdbcdd74381d3dbfbb50977da89c252f1cd6fb7da0a15e7a8af2f22f7a589f6c4c8a9b5d6746', 1, '0199da7f-23eb-7113-a3d1-978172eb8c78', '["mcp:use"]', 0, '2025-10-13 02:05:07'),
	('619a7f6e6f9236236fd7a0e7ff27445702713a7dbf104e7eef05c235a3c39f7f500dde2f4edf5e46', 1, '0199dbc6-3fd1-713a-8992-21d79229246b', '["mcp:use"]', 0, '2025-10-13 04:23:52'),
	('6274fcdb484f9ff28be064678c0e61661645bfac99a8e5dd67af20c96617297d7130bdd95ce73ee7', 1, '0199da7f-23eb-7113-a3d1-978172eb8c78', '["mcp:use"]', 0, '2025-10-13 02:33:38'),
	('6c1e543ea08fdee66426780e68421c71bfbdf8027b4dc7954a4751f0bad842de9143b1841887cb48', 1, '0199ded0-b8b4-7062-ba08-2aaf86dad918', '["mcp:use"]', 1, '2025-10-13 18:35:32'),
	('6d9aae7bb43380e632052b9f06e179b2cb86857607b625bed90a2b2a046cf56ef502af9276083327', 1, '0199db77-a372-7339-8eb6-26cc915951ef', '["mcp:use"]', 0, '2025-10-13 02:58:39'),
	('86d8e73c80116efd4328e1649485b2396939f49aaba22901f73504faaa02b4ce3f228cca7c9415a9', 1, '0199da7f-23eb-7113-a3d1-978172eb8c78', '["mcp:use"]', 0, '2025-10-13 02:03:08'),
	('88c6298892b28be12f48de265d54bf80dbaddc185d7c70288228f39bd1f6da5a8bb934ed5b1dd3be', 1, '0199dcb8-5da2-7329-ba4f-79305d849d9b', '["mcp:use"]', 1, '2025-10-13 08:48:20'),
	('b2debfd52b3ad80b227f85acd217851ffcfd49c0fa3093107ba64aff092c5bbbfa99d92f7d0f0c7f', 1, '0199dbea-b2e5-70f9-b696-c598b23c9a38', '["mcp:use"]', 0, '2025-10-13 05:03:44'),
	('b77864cc623bc6860607d1068dcc33b778789ed95a32bdd92946dd4640905bf0675973fb20c5092c', 1, '0199db6d-c4b7-703c-a48b-9829fb73a932', '["mcp:use"]', 0, '2025-10-13 02:50:30'),
	('d9346468a368a9b6760da2d8f18720141683b352061c8aefbecb75305f57c3ad489eafabcd5b6993', 1, '0199da7f-23eb-7113-a3d1-978172eb8c78', '["mcp:use"]', 0, '2025-10-13 02:01:22'),
	('ddf7b5b1b7fa46c0c32fbe6c73ddacbd402ecbb7856d160ab8c7c9449fbf55bcc7f1cdb45feac601', 1, '0199dbe5-aa98-725b-8789-eaf9de8e54d7', '["mcp:use"]', 0, '2025-10-13 05:02:12'),
	('ea2536e0f769dda78cc7c783bb5db601909cf1b8b674494e649266b109411e9b85939c9e7c87eced', 1, '0199ded0-b8b4-7062-ba08-2aaf86dad918', '["mcp:use"]', 0, '2025-10-13 18:36:37'),
	('ef4c728235afca77921004a5e5b98b6f01254b36e5cdacf49970f55de4ebdb356ab0e7e7e65ac133', 1, '0199da7f-23eb-7113-a3d1-978172eb8c78', '["mcp:use"]', 0, '2025-10-13 02:43:21'),
	('f4b6e96cf13253904e4b20f6f9734039ebe6b8311bea6e44fad8d515b7fc42ecad08e6d5df1f7842', 1, '0199dbe5-aa98-725b-8789-eaf9de8e54d7', '["mcp:use"]', 0, '2025-10-13 05:02:35');

-- Volcando estructura para tabla u522228883_ptolemaic.oauth_clients
CREATE TABLE IF NOT EXISTS `oauth_clients` (
  `id` char(36) NOT NULL,
  `owner_type` varchar(255) DEFAULT NULL,
  `owner_id` bigint(20) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `secret` varchar(255) DEFAULT NULL,
  `provider` varchar(255) DEFAULT NULL,
  `redirect_uris` text NOT NULL,
  `grant_types` text NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_clients_owner_type_owner_id_index` (`owner_type`,`owner_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.oauth_clients: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.oauth_device_codes
CREATE TABLE IF NOT EXISTS `oauth_device_codes` (
  `id` char(80) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `client_id` char(36) NOT NULL,
  `user_code` char(8) NOT NULL,
  `scopes` text NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `user_approved_at` datetime DEFAULT NULL,
  `last_polled_at` datetime DEFAULT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `oauth_device_codes_user_code_unique` (`user_code`),
  KEY `oauth_device_codes_user_id_index` (`user_id`),
  KEY `oauth_device_codes_client_id_index` (`client_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.oauth_device_codes: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.oauth_refresh_tokens
CREATE TABLE IF NOT EXISTS `oauth_refresh_tokens` (
  `id` char(80) NOT NULL,
  `access_token_id` char(80) NOT NULL,
  `revoked` tinyint(1) NOT NULL,
  `expires_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `oauth_refresh_tokens_access_token_id_index` (`access_token_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.oauth_refresh_tokens: ~2 rows (aproximadamente)
INSERT IGNORE INTO `oauth_refresh_tokens` (`id`, `access_token_id`, `revoked`, `expires_at`) VALUES
	('027685b5ff39b2c18f3233fafbc50e6e9b8a97c3f5ef3b609c2f9e9c7f0fa8347c6b9d8dabc25f3f', 'f54c2a80110d6bb150815924459da213baf9e07408949909bb42975f51ebb4a9db8926cf58b1d65e', 0, '2026-10-13 18:25:34'),
	('ee69f5b6f802513fb1ababfe4e0b66274c70b492c2191b20de75c3514a71e81db18124aaefa91d2b', '833d3d194ef0fda08631f1493cf7ca2f40929e0e24eaae2ebd8fd2b4559bf6f5d636b17227a87584', 0, '2026-10-13 08:38:23');

-- Volcando estructura para tabla u522228883_ptolemaic.password_reset_tokens
CREATE TABLE IF NOT EXISTS `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.password_reset_tokens: ~1 rows (aproximadamente)
INSERT IGNORE INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
	('alexisrb76@gmail.com', '$2y$12$RtE5uLFJB3LcR7rdpGhEPuZpWCJelVtHjuUhckwcVyKLL37FzgAz6', '2025-10-12 22:48:00');

-- Volcando estructura para tabla u522228883_ptolemaic.permissions
CREATE TABLE IF NOT EXISTS `permissions` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.permissions: ~9 rows (aproximadamente)
INSERT IGNORE INTO `permissions` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
	(1, 'dashboard.view', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(2, 'admin.dashboard', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(3, 'providers.view', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(4, 'providers.manage', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(5, 'users.view', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(6, 'users.manage', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19'),
	(7, 'roles.view', 'web', '2025-10-12 00:42:23', '2025-10-12 00:42:23'),
	(8, 'roles.manage', 'web', '2025-10-12 00:42:23', '2025-10-12 00:42:23'),
	(9, 'affiliate.manage', 'web', '2025-10-20 02:00:37', '2025-10-20 02:00:37');

-- Volcando estructura para tabla u522228883_ptolemaic.plan_changes
CREATE TABLE IF NOT EXISTS `plan_changes` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `changed_by_user_id` bigint(20) unsigned NOT NULL,
  `old_plan` varchar(255) NOT NULL,
  `new_plan` varchar(255) NOT NULL,
  `old_trial_ends_at` timestamp NULL DEFAULT NULL,
  `new_trial_ends_at` timestamp NULL DEFAULT NULL,
  `reason` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plan_changes_user_id_created_at_index` (`user_id`,`created_at`),
  KEY `plan_changes_changed_by_user_id_index` (`changed_by_user_id`),
  CONSTRAINT `plan_changes_changed_by_user_id_foreign` FOREIGN KEY (`changed_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `plan_changes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.plan_changes: ~1 rows (aproximadamente)
INSERT IGNORE INTO `plan_changes` (`id`, `user_id`, `changed_by_user_id`, `old_plan`, `new_plan`, `old_trial_ends_at`, `new_trial_ends_at`, `reason`, `created_at`, `updated_at`) VALUES
	(1, 3, 1, 'managed', 'free', '2025-11-16 12:03:40', '2025-11-16 00:00:00', NULL, '2025-10-17 14:47:48', '2025-10-17 14:47:48');

-- Volcando estructura para tabla u522228883_ptolemaic.pricing_plans
CREATE TABLE IF NOT EXISTS `pricing_plans` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `plan_type` varchar(255) NOT NULL,
  `price_monthly` decimal(10,2) NOT NULL,
  `price_yearly` decimal(10,2) NOT NULL,
  `offer_price_monthly` decimal(10,2) DEFAULT NULL,
  `offer_price_yearly` decimal(10,2) DEFAULT NULL,
  `offer_active` tinyint(1) NOT NULL DEFAULT 0,
  `offer_name` varchar(255) DEFAULT NULL,
  `offer_description` text DEFAULT NULL,
  `offer_starts_at` timestamp NULL DEFAULT NULL,
  `offer_ends_at` timestamp NULL DEFAULT NULL,
  `scarcity_active` tinyint(1) NOT NULL DEFAULT 0,
  `scarcity_message` varchar(255) DEFAULT NULL,
  `scarcity_limit` int(11) DEFAULT NULL,
  `scarcity_sold` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pricing_plans_plan_type_unique` (`plan_type`),
  KEY `pricing_plans_plan_type_is_active_index` (`plan_type`,`is_active`),
  KEY `pricing_plans_offer_active_offer_ends_at_index` (`offer_active`,`offer_ends_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.pricing_plans: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.provider_categories
CREATE TABLE IF NOT EXISTS `provider_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `provider_categories_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.provider_categories: ~4 rows (aproximadamente)
INSERT IGNORE INTO `provider_categories` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'ai', 'Inteligencia Artificial', 'Modelos y servicios de IA generativa.', '2025-10-10 07:07:33', '2025-10-12 00:05:45'),
	(2, 'market_data', 'Datos de Mercado', 'Fuentes de datos financieros y bursatiles.', '2025-10-10 07:07:33', '2025-10-12 00:05:45'),
	(3, 'news', 'Noticias', 'Agregadores y proveedores de noticias.', '2025-10-10 07:07:33', '2025-10-12 00:05:45'),
	(4, 'trading', 'Trading', 'Plataformas y brokers con APIs de trading.', '2025-10-10 07:07:33', '2025-10-12 00:05:45');

-- Volcando estructura para tabla u522228883_ptolemaic.referrals
CREATE TABLE IF NOT EXISTS `referrals` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `affiliate_user_id` bigint(20) unsigned NOT NULL,
  `referred_user_id` bigint(20) unsigned NOT NULL,
  `affiliate_code` varchar(20) NOT NULL,
  `referred_plan` enum('free','managed','pro','enterprise') NOT NULL DEFAULT 'free',
  `status` enum('active','inactive','cancelled') NOT NULL DEFAULT 'active',
  `monthly_analysis_bonus` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `last_reward_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `referrals_affiliate_user_id_referred_user_id_unique` (`affiliate_user_id`,`referred_user_id`),
  KEY `referrals_referred_user_id_foreign` (`referred_user_id`),
  KEY `referrals_affiliate_code_status_index` (`affiliate_code`,`status`),
  KEY `referrals_referred_plan_status_index` (`referred_plan`,`status`),
  CONSTRAINT `referrals_affiliate_user_id_foreign` FOREIGN KEY (`affiliate_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `referrals_referred_user_id_foreign` FOREIGN KEY (`referred_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.referrals: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.roles
CREATE TABLE IF NOT EXISTS `roles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `guard_name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_guard_name_unique` (`name`,`guard_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.roles: ~3 rows (aproximadamente)
INSERT IGNORE INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'web', '2025-10-10 08:31:34', '2025-10-10 08:31:34'),
	(2, 'User', 'web', '2025-10-10 08:56:41', '2025-10-10 08:56:41'),
	(3, 'Manager', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19');

-- Volcando estructura para tabla u522228883_ptolemaic.role_has_permissions
CREATE TABLE IF NOT EXISTS `role_has_permissions` (
  `permission_id` bigint(20) unsigned NOT NULL,
  `role_id` bigint(20) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `role_has_permissions_role_id_foreign` (`role_id`),
  CONSTRAINT `role_has_permissions_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `role_has_permissions_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.role_has_permissions: ~16 rows (aproximadamente)
INSERT IGNORE INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
	(1, 1),
	(1, 2),
	(1, 3),
	(2, 1),
	(2, 3),
	(3, 1),
	(3, 3),
	(4, 1),
	(4, 3),
	(5, 1),
	(5, 3),
	(6, 1),
	(7, 1),
	(7, 3),
	(8, 1),
	(9, 1);

-- Volcando estructura para tabla u522228883_ptolemaic.sessions
CREATE TABLE IF NOT EXISTS `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.sessions: ~4 rows (aproximadamente)
INSERT IGNORE INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('iNOpM4am1rNFWSmt3tei5PXgCqe16nlZPX6sFrQD', 1, '72.182.12.119', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo2OntzOjY6ImxvY2FsZSI7czoyOiJlcyI7czo2OiJfdG9rZW4iO3M6NDA6Im81dnpUVGRWQ08zaU5DbGF1Z0c2dDNXU0JKVEFldzV5RnhtTWhuYTUiO3M6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjU3OiJodHRwczovL3B0b2xlbWFpYy5jZXJiZXJvZ3Jvd3Roc29sdXRpb25zLmNvbS9lcy9kYXNoYm9hcmQiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjU6InN0YXRlIjtzOjQwOiJzUE91dUo3N0syZ3A5TThzV3YzbjZUTWRyS01nNDJDdjBBTXk4ZEhsIjtzOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1760987716),
	('MZNTKRmpfFXZ9Gf2QaAj7li8w7p6ix5KmVkkycJk', NULL, '82.197.81.97', 'Go-http-client/2.0', 'YTozOntzOjY6ImxvY2FsZSI7czoyOiJlcyI7czo2OiJfdG9rZW4iO3M6NDA6IkY4Q3RrczRwZlJHb1R2YTNFak8xaG0xeTFrOVE0Vlk4aG1paTlOVGkiO3M6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1761008549),
	('QXuNTNUisNgqobWHpJtalLwgRn4ObKDOOZJPHFlv', 3, '174.226.115.33', 'Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36', 'YTo1OntzOjY6ImxvY2FsZSI7czoyOiJlcyI7czo2OiJfdG9rZW4iO3M6NDA6IkpIRkUxSFVuc3d0S3RSS2w3NkVaZ2FCc1E5V21hSWtaeUo0SFNjSnUiO3M6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjM7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6NDc6Imh0dHBzOi8vcHRvbGVtYWljLmNlcmJlcm9ncm93dGhzb2x1dGlvbnMuY29tL2VzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1760991185),
	('tjctblKSqtVsnJXw6sl3Uz2cce1URxPliIPed07G', NULL, '82.197.81.97', 'Go-http-client/2.0', 'YToyOntzOjY6Il90b2tlbiI7czo0MDoiYVRuRVp2WDFiRXRCQUdPQmZHVnc0eUxUTXcyMjJVd1dxa1RWS2JLWSI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1761008548);

-- Volcando estructura para tabla u522228883_ptolemaic.telegram_config
CREATE TABLE IF NOT EXISTS `telegram_config` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `bot_token` varchar(255) DEFAULT NULL,
  `bot_username` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `webhook_url` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.telegram_config: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.trading_providers
CREATE TABLE IF NOT EXISTS `trading_providers` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `provider_category_id` bigint(20) unsigned NOT NULL,
  `slug` varchar(255) NOT NULL,
  `display_name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `base_url` varchar(255) DEFAULT NULL,
  `docs_url` varchar(255) DEFAULT NULL,
  `verification_endpoint` varchar(255) DEFAULT NULL,
  `test_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`test_json`)),
  `ops_json` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ops_json`)),
  `supports_paper_trading` tinyint(1) NOT NULL DEFAULT 0,
  `market_types` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`market_types`)),
  `requires_two_factor` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('active','inactive','deprecated') NOT NULL DEFAULT 'active',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `trading_providers_slug_unique` (`slug`),
  KEY `trading_providers_provider_category_id_foreign` (`provider_category_id`),
  CONSTRAINT `trading_providers_provider_category_id_foreign` FOREIGN KEY (`provider_category_id`) REFERENCES `provider_categories` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.trading_providers: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.trading_provider_keys
CREATE TABLE IF NOT EXISTS `trading_provider_keys` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `trading_provider_id` bigint(20) unsigned NOT NULL,
  `label` varchar(255) NOT NULL,
  `api_key_encrypted` text NOT NULL,
  `api_secret_encrypted` text NOT NULL,
  `passphrase_encrypted` text DEFAULT NULL,
  `metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`metadata`)),
  `account_type` enum('live','paper') NOT NULL DEFAULT 'live',
  `sandbox` tinyint(1) NOT NULL DEFAULT 0,
  `verification_status` enum('pending','passed','failed') NOT NULL DEFAULT 'pending',
  `last_verified_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `tp_keys_user_provider_account_unique` (`user_id`,`trading_provider_id`,`account_type`),
  KEY `trading_provider_keys_trading_provider_id_foreign` (`trading_provider_id`),
  CONSTRAINT `trading_provider_keys_trading_provider_id_foreign` FOREIGN KEY (`trading_provider_id`) REFERENCES `trading_providers` (`id`) ON DELETE CASCADE,
  CONSTRAINT `trading_provider_keys_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.trading_provider_keys: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.trading_provider_key_verifications
CREATE TABLE IF NOT EXISTS `trading_provider_key_verifications` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `trading_provider_key_id` bigint(20) unsigned NOT NULL,
  `status` enum('pending','passed','failed') NOT NULL DEFAULT 'pending',
  `response_code` smallint(5) unsigned DEFAULT NULL,
  `message` text DEFAULT NULL,
  `payload` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`payload`)),
  `verified_by` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `trading_provider_key_verifications_verified_by_foreign` (`verified_by`),
  KEY `trading_key_verifications_key_fk` (`trading_provider_key_id`),
  CONSTRAINT `trading_key_verifications_key_fk` FOREIGN KEY (`trading_provider_key_id`) REFERENCES `trading_provider_keys` (`id`) ON DELETE CASCADE,
  CONSTRAINT `trading_provider_key_verifications_verified_by_foreign` FOREIGN KEY (`verified_by`) REFERENCES `users` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.trading_provider_key_verifications: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.users
CREATE TABLE IF NOT EXISTS `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `phone_verified_at` timestamp NULL DEFAULT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `two_factor_secret` text DEFAULT NULL,
  `two_factor_recovery_codes` text DEFAULT NULL,
  `google2fa_secret` text DEFAULT NULL,
  `google2fa_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `telegram_chat_id` varchar(255) DEFAULT NULL,
  `telegram_enabled` tinyint(1) NOT NULL DEFAULT 0,
  `two_factor_confirmed_at` timestamp NULL DEFAULT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `plan` varchar(255) NOT NULL DEFAULT 'free',
  `plan_started_at` timestamp NULL DEFAULT NULL,
  `plan_expires_at` timestamp NULL DEFAULT NULL,
  `trial_ends_at` timestamp NULL DEFAULT NULL,
  `card_added_at` timestamp NULL DEFAULT NULL,
  `plan_metadata` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`plan_metadata`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `google_id` varchar(255) DEFAULT NULL,
  `affiliate_code` varchar(20) DEFAULT NULL,
  `referred_by_code` varchar(20) DEFAULT NULL,
  `monthly_analysis_bonus` int(11) NOT NULL DEFAULT 0,
  `affiliate_discount_percentage` decimal(5,2) NOT NULL DEFAULT 0.00,
  `affiliate_discount_expires_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_google_id_unique` (`google_id`),
  UNIQUE KEY `users_affiliate_code_unique` (`affiliate_code`),
  KEY `users_affiliate_code_index` (`affiliate_code`),
  KEY `users_referred_by_code_index` (`referred_by_code`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.users: ~9 rows (aproximadamente)
INSERT IGNORE INTO `users` (`id`, `name`, `email`, `phone`, `phone_verified_at`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `google2fa_secret`, `google2fa_enabled`, `telegram_chat_id`, `telegram_enabled`, `two_factor_confirmed_at`, `remember_token`, `plan`, `plan_started_at`, `plan_expires_at`, `trial_ends_at`, `card_added_at`, `plan_metadata`, `created_at`, `updated_at`, `google_id`, `affiliate_code`, `referred_by_code`, `monthly_analysis_bonus`, `affiliate_discount_percentage`, `affiliate_discount_expires_at`) VALUES
	(1, 'Alexis Rodríguez Bandera', 'alexisrb76@gmail.com', NULL, NULL, '2025-10-17 11:33:50', '$2y$12$J44oKXOmts8B5izKE5SWB.HNYM0/0PzvAdYdtQCB3IfF5IC9W.e3.', NULL, NULL, NULL, 0, NULL, 0, NULL, 'AF42YJZvXdxWYgORvJtt4AiUdzAAwuNlTJr3NurxxdOxOv7faPcLx6gTwoIU', 'internal', NULL, NULL, NULL, NULL, NULL, '2025-10-03 15:52:55', '2025-10-18 02:01:07', '102939162050858743728', 'ALE1', NULL, 0, 0.00, NULL),
	(2, 'alexis rodriguez', 'admin@cerberomart.com', NULL, NULL, NULL, '$2y$12$zFq/n2p6Up1xN1oPkg3PauZRxbkigIfCt3.W1WjmBExz0.DW6xOHu', 'eyJpdiI6InVKaVVQUUZGVnZnaVkrbGZKYkNmbEE9PSIsInZhbHVlIjoiL1BNZWk0NzI1UnNlM3ljZ1hkZ1YyU0ZrK1U2Z3lJUWRXVjBockFVQk9xdz0iLCJtYWMiOiJjMWVjYWEyZjcwYzU1ZjkzMjBhNTdmY2JlOWVjMzIyNmMxNDA1ZDI2YTBjMzZhM2M4MmIxZjZlZWE4NGI1NzI0IiwidGFnIjoiIn0=', 'eyJpdiI6IldxS1JwVkF2Q0dsMWVhd3pEcTdCSWc9PSIsInZhbHVlIjoiKzEyWFFEL0d0ZHZ5M0tNTzRnQVp1RlhXd3hEbWpyMGJVaVY5ZUJydndCQ0tCckRkTkFrTHZhQW9vU1NLaHVkSjJjaHFXTy81VEUxZXVVaWdES1ZjanVwOFFmWm5URVcxZjNhZ2ZZLzY3VGRJM2RlMWwvK0dYcXN5RW9mT2tVMzBRU1JpeCtuL2g3ek94L1B3enRSaDkwU0ZyU0tjRFlmTzRrWnkzT3QvR3BRRU9kN0trcmRpelowN0krUzNjaTlIaW14Rjh3NXBqRUdGV3duZjlXRCs2N2g0VjliSkl0THpGZGxwV3Q1WVdyVzRTckFJZUJMWXZuUEQ0TGtNSEZuM2hsRWVnUDJ6Z3UxcHlsMm1KZTdDNHc9PSIsIm1hYyI6ImMyOGE3N2QwZjMyMjE0ZmY0YzViZGU0YTY5YWE0NWZiZTkyZTkwZjBiMjM2NGRiZDcwZGE0N2E4MWYyYjdlZGQiLCJ0YWciOiIifQ==', NULL, 0, NULL, 0, NULL, NULL, 'free', NULL, NULL, NULL, NULL, NULL, '2025-10-04 10:58:03', '2025-10-04 10:58:22', NULL, NULL, NULL, 0, 0.00, NULL),
	(3, 'Cerbero Growth Solutions LLC', 'cerbero@cerberogrowthsolutions.com', NULL, NULL, '2025-10-17 12:01:22', NULL, NULL, NULL, NULL, 0, NULL, 0, NULL, 'CS5LVzKcC6yXtukYrdrbVaJ636vRUsG8vKtSAb7zQfTQrAI7azAK0yZqb1N7', 'free', '2025-10-17 14:47:48', NULL, '2025-11-16 00:00:00', NULL, NULL, '2025-10-15 00:52:32', '2025-10-17 14:47:48', '114690693398768403490', 'CER3', NULL, 0, 0.00, NULL),
	(4, 'DisruptZ Centennial Investments, Inc', 'disruptz.centennial@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL, 'TBYO0huwCVPVR3KrmJ5bITmyi52xMNrMcsZKEcBClqa2X9OyAzMhcTIb3ss2', 'free', NULL, NULL, NULL, NULL, NULL, '2025-10-15 14:41:15', '2025-10-15 14:41:15', '113587963126565762428', NULL, NULL, 0, 0.00, NULL),
	(5, 'Cristofe Caro', 'cristofecarocorderocc@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL, 'IAZl2N11WipfHcEP0AxFobLQFmhvaXg8sTUeQtpNF49JkuCsTX4z409BkvSH', 'free', NULL, NULL, NULL, NULL, NULL, '2025-10-15 18:51:10', '2025-10-15 18:51:10', '113925189197107100885', NULL, NULL, 0, 0.00, NULL),
	(6, 'Arlet Sotolongo Barroso', 'sotolongobarrosoarlet@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL, 'ME0TA975uLr41rRacporLytI6qbaXjlHaZYGzOOgHnM9iVZ4cO979C7Dv4EQ', 'free', NULL, NULL, NULL, NULL, NULL, '2025-10-16 15:10:40', '2025-10-16 15:10:40', '107592085022119689082', NULL, NULL, 0, 0.00, NULL),
	(7, 'Jeidys Véliz Amador', 'jeidys0488@gmail.com', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, 0, NULL, '3SN6oN51Z4cmZ7Easf8g3Og0lKD759XXPE1r9rPI5UGE4X6e22C3u5juHeSe', 'free', NULL, NULL, NULL, NULL, NULL, '2025-10-17 15:23:33', '2025-10-17 15:23:33', '113321755478639541077', NULL, NULL, 0, 0.00, NULL),
	(8, 'Bill Gates Rodriguez Ledesma', 'billgatesrodriguezledesma@gmail.com', NULL, NULL, '2025-10-17 15:46:26', NULL, NULL, NULL, NULL, 0, NULL, 0, NULL, 'H5vASaTf7ikCS5vaQb4IlHqh2CxNTXYPP9Vn7d3NkrDgHvBCngpCUGdrAzCp', 'free', NULL, NULL, NULL, NULL, NULL, '2025-10-17 15:38:57', '2025-10-17 15:46:26', '113217899225816039620', NULL, NULL, 0, 0.00, NULL),
	(9, 'Yurislei Carballoz Carballoza', 'yurisleicarballozmatos@gmail.com', NULL, NULL, '2025-10-17 17:51:19', '$2y$12$CHq.8QBXvXcJExRlqagDBekICP33hgRK/0ZaS5aMsc4puo6rZv45y', NULL, NULL, NULL, 0, NULL, 0, NULL, 'APYgMYmwvXVsslfCQkbYWNr9CL1jJkXKstBLxLiyDr6ULY5gsa2ONoY6mpWt', 'free', NULL, NULL, NULL, NULL, NULL, '2025-10-17 17:47:46', '2025-10-17 17:51:19', NULL, NULL, NULL, 0, 0.00, NULL);

-- Volcando estructura para tabla u522228883_ptolemaic.user_achievements
CREATE TABLE IF NOT EXISTS `user_achievements` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `achievement_id` bigint(20) unsigned NOT NULL,
  `unlocked_at` timestamp NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_achievements_user_id_achievement_id_unique` (`user_id`,`achievement_id`),
  KEY `user_achievements_achievement_id_foreign` (`achievement_id`),
  KEY `user_achievements_user_id_unlocked_at_index` (`user_id`,`unlocked_at`),
  CONSTRAINT `user_achievements_achievement_id_foreign` FOREIGN KEY (`achievement_id`) REFERENCES `achievements` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_achievements_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.user_achievements: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.user_default_provider_settings
CREATE TABLE IF NOT EXISTS `user_default_provider_settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `ai_provider_key_id` bigint(20) unsigned DEFAULT NULL,
  `ai_provider_model_id` bigint(20) unsigned DEFAULT NULL,
  `market_data_provider_key_id` bigint(20) unsigned DEFAULT NULL,
  `news_provider_key_id` bigint(20) unsigned DEFAULT NULL,
  `trading_provider_key_id` bigint(20) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_defaults_user_unique` (`user_id`),
  KEY `user_defaults_ai_key_fk` (`ai_provider_key_id`),
  KEY `user_defaults_ai_model_fk` (`ai_provider_model_id`),
  KEY `user_defaults_md_key_fk` (`market_data_provider_key_id`),
  KEY `user_defaults_news_key_fk` (`news_provider_key_id`),
  KEY `user_defaults_trading_key_fk` (`trading_provider_key_id`),
  CONSTRAINT `user_default_provider_settings_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `user_defaults_ai_key_fk` FOREIGN KEY (`ai_provider_key_id`) REFERENCES `ai_provider_keys` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_defaults_ai_model_fk` FOREIGN KEY (`ai_provider_model_id`) REFERENCES `ai_provider_models` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_defaults_md_key_fk` FOREIGN KEY (`market_data_provider_key_id`) REFERENCES `market_data_provider_keys` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_defaults_news_key_fk` FOREIGN KEY (`news_provider_key_id`) REFERENCES `news_provider_keys` (`id`) ON DELETE SET NULL,
  CONSTRAINT `user_defaults_trading_key_fk` FOREIGN KEY (`trading_provider_key_id`) REFERENCES `trading_provider_keys` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.user_default_provider_settings: ~0 rows (aproximadamente)

-- Volcando estructura para tabla u522228883_ptolemaic.user_trading_stats
CREATE TABLE IF NOT EXISTS `user_trading_stats` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `total_trades` int(11) NOT NULL DEFAULT 0,
  `winning_trades` int(11) NOT NULL DEFAULT 0,
  `losing_trades` int(11) NOT NULL DEFAULT 0,
  `current_streak` int(11) NOT NULL DEFAULT 0,
  `best_streak` int(11) NOT NULL DEFAULT 0,
  `current_losing_streak` int(11) NOT NULL DEFAULT 0,
  `worst_losing_streak` int(11) NOT NULL DEFAULT 0,
  `total_pnl` decimal(15,2) NOT NULL DEFAULT 0.00,
  `best_trade_pnl` decimal(15,2) DEFAULT NULL,
  `worst_trade_pnl` decimal(15,2) DEFAULT NULL,
  `total_points` int(11) NOT NULL DEFAULT 0,
  `level` varchar(255) NOT NULL DEFAULT 'Novice',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_trading_stats_user_id_unique` (`user_id`),
  CONSTRAINT `user_trading_stats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.user_trading_stats: ~4 rows (aproximadamente)
INSERT IGNORE INTO `user_trading_stats` (`id`, `user_id`, `total_trades`, `winning_trades`, `losing_trades`, `current_streak`, `best_streak`, `current_losing_streak`, `worst_losing_streak`, `total_pnl`, `best_trade_pnl`, `worst_trade_pnl`, `total_points`, `level`, `created_at`, `updated_at`) VALUES
	(1, 1, 0, 0, 0, 0, 0, 0, 0, 0.00, NULL, NULL, 0, 'Novice', '2025-10-15 03:05:13', '2025-10-15 03:05:13'),
	(3, 4, 0, 0, 0, 0, 0, 0, 0, 0.00, NULL, NULL, 0, 'Novice', '2025-10-15 14:57:11', '2025-10-15 14:57:11'),
	(5, 6, 1, 1, 0, 1, 1, 0, 0, 175.00, 175.00, 175.00, 0, 'Novice', '2025-10-16 15:11:20', '2025-10-16 16:14:39'),
	(7, 8, 2, 0, 2, 0, 0, 2, 2, -359.56, -3.56, -356.00, 0, 'Novice', '2025-10-17 16:00:31', '2025-10-17 16:02:15');

-- Volcando estructura para tabla u522228883_ptolemaic.waitlist_entries
CREATE TABLE IF NOT EXISTS `waitlist_entries` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` bigint(20) unsigned NOT NULL,
  `plan_type` enum('managed','pro','enterprise') NOT NULL,
  `status` enum('active','contacted','converted','cancelled') NOT NULL DEFAULT 'active',
  `notes` text DEFAULT NULL,
  `contacted_at` timestamp NULL DEFAULT NULL,
  `converted_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `waitlist_entries_user_id_foreign` (`user_id`),
  KEY `waitlist_entries_plan_type_status_index` (`plan_type`,`status`),
  KEY `waitlist_entries_status_created_at_index` (`status`,`created_at`),
  CONSTRAINT `waitlist_entries_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Volcando datos para la tabla u522228883_ptolemaic.waitlist_entries: ~2 rows (aproximadamente)
INSERT IGNORE INTO `waitlist_entries` (`id`, `user_id`, `plan_type`, `status`, `notes`, `contacted_at`, `converted_at`, `created_at`, `updated_at`) VALUES
	(1, 1, 'managed', 'active', NULL, NULL, NULL, '2025-10-17 11:34:02', '2025-10-17 11:34:02'),
	(2, 3, 'pro', 'active', NULL, NULL, NULL, '2025-10-17 12:03:27', '2025-10-17 12:03:27');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
