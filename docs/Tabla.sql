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

-- Volcando datos para la tabla catai.ai_providers: ~2 rows (aproximadamente)
REPLACE INTO `ai_providers` (`id`, `provider_category_id`, `slug`, `display_name`, `description`, `base_url`, `docs_url`, `verification_endpoint`, `test_json`, `ops_json`, `requires_organization`, `status`, `created_at`, `updated_at`) VALUES
	(1, 1, 'openai', 'Open AI', NULL, NULL, 'https://platform.openai.com/docs', 'https://api.openai.com/v1/models', '[{"test": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "ok_json_path": "object", "url_override": "https://api.openai.com/v1/models", "expected_status": 200, "ok_json_expected": "list"}}]', '{"multi": {"chat": {"body": "{\\"model\\":\\"gpt-4o-mini\\",\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"{{PROMPT}}\\"}]}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}], "ok_json_path": "choices", "url_override": "https://api.openai.com/v1/chat/completions", "expected_status": 200, "ok_json_expected": "array"}, "vs.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "url_override": "https://api.openai.com/v1/files/{{FILE_ID}}", "expected_status": 200, "required_fields": ["FILE_ID"]}, "analyze": {"defaults": {"CHAT_MODEL": "gpt-4o-mini"}, "pipeline": [{"use": "vs.query", "save_as": "ctx"}, {"use": "chat", "override": {"body": "{\\"model\\":\\"gpt-4o-mini\\",\\"messages\\":[{\\"role\\":\\"system\\",\\"content\\":\\"Eres un analista. Objetivo: {{objective}}\\"},{\\"role\\":\\"user\\",\\"content\\":\\"Pregunta: {{q}}\\\\n\\\\nContexto:\\\\n{{ctx_text}}\\"}]}"}}]}, "run.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs/{{RUN_ID}}", "expected_status": 200, "required_fields": ["THREAD_ID", "RUN_ID"]}, "vs.list": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "defaults": {"limit": 1000, "order": "desc", "after_qs": null}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/files?limit={{limit}}&order={{order}}{{after_qs}}", "expected_status": 200, "ok_json_expected": "array"}, "vs.files": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50, "after_qs": null}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/files?limit={{limit}}{{after_qs}}", "expected_status": 200, "required_fields": ["VS_ID"], "ok_json_expected": "array"}, "vs.attach": {"body": "{\\"file_id\\":\\"{{FILE_ID}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}, {"name": "Content-Type", "value": "application/json"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/files", "expected_status": 200, "required_fields": ["VS_ID", "FILE_ID"]}, "vs.delete": {"method": "DELETE", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "url_override": "https://api.openai.com/v1/files/{{FILE_ID}}", "expected_status": 200, "required_fields": ["FILE_ID"]}, "vs.upload": {"method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "body_type": "multipart", "multipart": [{"name": "file", "type": "file", "value": "{{FILE_PATH}}"}, {"name": "purpose", "type": "text", "value": "assistants"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/files", "expected_status": 200, "ok_json_expected": "exists"}, "run.create": {"body": "{\\"assistant_id\\":\\"{{ASSISTANT_ID}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs", "expected_status": 200, "required_fields": ["THREAD_ID", "ASSISTANT_ID"], "ok_json_expected": "exists"}, "vs.summary": {"body": "{\\"model\\":\\"gpt-4o-mini\\",\\"messages\\":[{\\"role\\":\\"system\\",\\"content\\":\\"Resume el archivo adjunto en 5 bullets.\\"},{\\"role\\":\\"user\\",\\"content\\":\\"FILE_ID={{FILE_ID}}\\"}]}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}], "ok_json_path": "choices", "url_override": "https://api.openai.com/v1/chat/completions", "expected_status": 200, "required_fields": ["FILE_ID"], "ok_json_expected": "array"}, "vs.download": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}], "url_override": "https://api.openai.com/v1/files/{{FILE_ID}}/content", "expected_status": 200, "required_fields": ["FILE_ID"]}, "vs.store.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}", "expected_status": 200, "required_fields": ["VS_ID"]}, "assistant.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/assistants/{{ASSISTANT_ID}}", "expected_status": 200, "required_fields": ["ASSISTANT_ID"], "ok_json_expected": "exists"}, "messages.list": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/messages?limit={{limit}}", "expected_status": 200, "required_fields": ["THREAD_ID"], "ok_json_expected": "array"}, "thread.create": {"body": "{\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"{{USER_PROMPT}}\\"}],\\"tool_resources\\":{\\"file_search\\":{\\"vector_store_ids\\":[\\"{{VS_ID}}\\"]}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads", "expected_status": 200, "required_fields": ["USER_PROMPT", "VS_ID"], "ok_json_expected": "exists"}, "vs.store.list": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50, "after_qs": null}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/vector_stores?limit={{limit}}{{after_qs}}", "expected_status": 200, "ok_json_expected": "array"}, "run.steps.list": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "data", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs/{{RUN_ID}}/steps", "expected_status": 200, "required_fields": ["THREAD_ID", "RUN_ID"], "ok_json_expected": "array"}, "vs.attach_batch": {"body": "{\\"file_ids\\":{{FILE_IDS_JSON}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}, {"name": "Content-Type", "value": "application/json"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/file_batches", "expected_status": 200, "required_fields": ["VS_ID", "FILE_IDS_JSON"]}, "vs.store.create": {"body": "{\\"name\\":\\"{{VS_NAME}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/vector_stores", "expected_status": 200, "required_fields": ["VS_NAME"], "ok_json_expected": "exists"}, "vs.store.delete": {"method": "DELETE", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}", "expected_status": 200, "required_fields": ["VS_ID"]}, "assistant.create": {"body": "{\\"model\\":\\"gpt-4o-mini\\",\\"name\\":\\"{{ASSISTANT_NAME}}\\",\\"description\\":\\"Extractor de conocimiento para el VS del usuario {{USER_ID}}\\",\\"instructions\\":\\"{{ASSISTANT_INSTRUCTIONS}}\\",\\"tools\\":[{\\"type\\":\\"file_search\\"}],\\"tool_resources\\":{\\"file_search\\":{\\"vector_store_ids\\":[\\"{{VS_ID}}\\"]}},\\"response_format\\":{\\"type\\":\\"json_schema\\",\\"json_schema\\":{\\"name\\":\\"ResumenEstructurado\\",\\"schema\\":{\\"type\\":\\"object\\",\\"properties\\":{\\"resumen\\":{\\"type\\":\\"string\\"},\\"puntos_clave\\":{\\"type\\":\\"array\\",\\"items\\":{\\"type\\":\\"string\\"}},\\"estrategias\\":{\\"type\\":\\"array\\",\\"items\\":{\\"type\\":\\"string\\"}},\\"gestion_riesgo\\":{\\"type\\":\\"array\\",\\"items\\":{\\"type\\":\\"string\\"}},\\"recomendaciones\\":{\\"type\\":\\"array\\",\\"items\\":{\\"type\\":\\"string\\"}}},\\"required\\":[\\"resumen\\",\\"puntos_clave\\",\\"estrategias\\",\\"gestion_riesgo\\",\\"recomendaciones\\"],\\"additionalProperties\\":false}}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/assistants", "expected_status": 200, "required_fields": ["VS_ID", "USER_ID", "ASSISTANT_NAME", "ASSISTANT_INSTRUCTIONS"], "ok_json_expected": "exists"}, "run.create.loose": {"body": "{\\"assistant_id\\":\\"{{ASSISTANT_ID}}\\",\\"response_format\\":{\\"type\\":\\"json_object\\"},\\"metadata\\":{\\"purpose\\":\\"diagnostic_loose\\"}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs", "expected_status": 200, "required_fields": ["THREAD_ID", "ASSISTANT_ID"], "ok_json_expected": "exists"}, "vs.delete_from_vs": {"method": "DELETE", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/files/{{FILE_ID}}", "expected_status": 200, "required_fields": ["VS_ID", "FILE_ID"]}, "vs.store.file.get": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/vector_stores/{{VS_ID}}/files/{{FILE_ID}}", "expected_status": 200, "required_fields": ["VS_ID", "FILE_ID"]}, "assistant.update_vs": {"body": "{\\"tool_resources\\":{\\"file_search\\":{\\"vector_store_ids\\":[\\"{{VS_ID}}\\"]}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/assistants/{{ASSISTANT_ID}}", "expected_status": 200, "required_fields": ["ASSISTANT_ID", "VS_ID"]}, "messages.list.by_run": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50, "order": "asc"}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/messages?limit={{limit}}&order={{order}}&run_id={{RUN_ID}}", "expected_status": 200, "required_fields": ["THREAD_ID", "RUN_ID"], "ok_json_expected": "array"}, "vs.summarize_from_vs": {"defaults": {"VS_ID": null, "PROMPT": "Genera un resumen estructurado del contenido del Vector Store del usuario siguiendo el esquema configurado.", "ASSISTANT_ID": null}, "pipeline": [{"use": "thread.create", "vars": {"VS_ID": "{{VS_ID}}", "USER_PROMPT": "{{PROMPT}}"}, "save_as": "thread"}, {"use": "run.create", "vars": {"THREAD_ID": "{{thread.id}}", "ASSISTANT_ID": "{{ASSISTANT_ID}}"}, "save_as": "run"}, {"use": "messages.list", "vars": {"limit": 50, "THREAD_ID": "{{thread.id}}"}, "save_as": "msgs"}]}, "assistant.update_name": {"body": "{\\"name\\":\\"{{NEW_NAME}}\\",\\"description\\":\\"{{NEW_DESC}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "url_override": "https://api.openai.com/v1/assistants/{{ASSISTANT_ID}}", "expected_status": 200, "required_fields": ["ASSISTANT_ID", "NEW_NAME"]}, "messages.list.ordered": {"method": "GET", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "defaults": {"limit": 50, "order": "desc"}, "ok_json_path": "data", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/messages?limit={{limit}}&order={{order}}", "expected_status": 200, "required_fields": ["THREAD_ID"], "ok_json_expected": "array"}, "thread.create.extract": {"body": "{\\"messages\\":[{\\"role\\":\\"user\\",\\"content\\":\\"{{EXTRACT_PROMPT}}\\"}],\\"tool_resources\\":{\\"file_search\\":{\\"vector_store_ids\\":[\\"{{VS_ID}}\\"]}}}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads", "expected_status": 200, "required_fields": ["EXTRACT_PROMPT", "VS_ID"], "ok_json_expected": "exists"}, "extract.knowledge_from_vs": {"defaults": {"VS_ID": null, "ASSISTANT_ID": null, "EXTRACT_PROMPT": "Extrae un JSON con los campos {\\"title\\": string, \\"summary\\": string, \\"entities\\": [{\\"name\\": string, \\"type\\": string}], \\"tickers\\": [string], \\"dates\\": [string]} usando SOLO evidencia del Vector Store. Devuelve SOLO el JSON."}, "pipeline": [{"use": "thread.create.extract", "vars": {"VS_ID": "{{VS_ID}}", "EXTRACT_PROMPT": "{{EXTRACT_PROMPT}}"}, "save_as": "thread"}, {"use": "run.create", "vars": {"THREAD_ID": "{{thread.id}}", "ASSISTANT_ID": "{{ASSISTANT_ID}}"}, "save_as": "run"}, {"use": "messages.list", "vars": {"limit": 50, "THREAD_ID": "{{thread.id}}"}, "save_as": "msgs"}]}, "run.create.with_instructions": {"body": "{\\"assistant_id\\":\\"{{ASSISTANT_ID}}\\",\\"instructions\\":\\"{{USER_PROMPT}}\\"}", "method": "POST", "headers": [{"name": "Authorization", "value": "Bearer {{API_KEY}}"}, {"name": "Content-Type", "value": "application/json"}, {"name": "OpenAI-Beta", "value": "assistants=v2"}], "ok_json_path": "id", "url_override": "https://api.openai.com/v1/threads/{{THREAD_ID}}/runs", "expected_status": 200, "required_fields": ["THREAD_ID", "ASSISTANT_ID", "USER_PROMPT"], "ok_json_expected": "exists"}}, "provider_profile": {"vs": "provider"}}', 0, 'active', '2025-10-12 00:12:13', '2025-10-13 00:19:50'),
	(2, 1, 'google', 'Google Gemini', NULL, NULL, NULL, NULL, '[]', '[]', 0, 'active', '2025-10-12 20:45:07', '2025-10-12 20:45:07');

-- Volcando datos para la tabla catai.ai_provider_keys: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.ai_provider_key_verifications: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.ai_provider_models: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.cache: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.cache_locks: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.failed_jobs: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.jobs: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.job_batches: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.market_data_providers: ~1 rows (aproximadamente)
REPLACE INTO `market_data_providers` (`id`, `provider_category_id`, `slug`, `display_name`, `description`, `base_url`, `docs_url`, `verification_endpoint`, `test_json`, `ops_json`, `data_frequency`, `rate_limit_per_minute`, `supports_historical`, `status`, `created_at`, `updated_at`) VALUES
	(1, 2, 'polygon', 'Polygon', NULL, NULL, NULL, NULL, '[]', '[]', NULL, NULL, 0, 'active', '2025-10-12 00:12:35', '2025-10-12 00:12:35');

-- Volcando datos para la tabla catai.market_data_provider_keys: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.market_data_provider_key_verifications: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.migrations: ~28 rows (aproximadamente)
REPLACE INTO `migrations` (`id`, `migration`, `batch`) VALUES
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
	(23, '2025_10_10_021551_add_endpoint_schemas_to_provider_tables', 10),
	(24, '2025_10_10_024358_create_permission_tables', 11),
	(25, '2025_10_12_195158_create_oauth_auth_codes_table', 12),
	(26, '2025_10_12_195159_create_oauth_access_tokens_table', 12),
	(27, '2025_10_12_195200_create_oauth_refresh_tokens_table', 12),
	(28, '2025_10_12_195201_create_oauth_clients_table', 12),
	(29, '2025_10_12_195202_create_oauth_device_codes_table', 12);

-- Volcando datos para la tabla catai.model_has_permissions: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.model_has_roles: ~2 rows (aproximadamente)
REPLACE INTO `model_has_roles` (`role_id`, `model_type`, `model_id`) VALUES
	(1, 'App\\Models\\User', 1),
	(2, 'App\\Models\\User', 2);

-- Volcando datos para la tabla catai.news_providers: ~1 rows (aproximadamente)
REPLACE INTO `news_providers` (`id`, `provider_category_id`, `slug`, `display_name`, `description`, `base_url`, `docs_url`, `verification_endpoint`, `test_json`, `ops_json`, `category_filters`, `language_support`, `webhook_support`, `status`, `created_at`, `updated_at`) VALUES
	(1, 3, 'finviz', 'Finviz.com', NULL, NULL, NULL, NULL, '[]', '[]', '[]', '[]', 0, 'active', '2025-10-12 20:45:44', '2025-10-12 20:45:44');

-- Volcando datos para la tabla catai.news_provider_keys: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.news_provider_key_verifications: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.oauth_access_tokens: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.oauth_auth_codes: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.oauth_clients: ~1 rows (aproximadamente)
REPLACE INTO `oauth_clients` (`id`, `owner_type`, `owner_id`, `name`, `secret`, `provider`, `redirect_uris`, `grant_types`, `revoked`, `created_at`, `updated_at`) VALUES
	('0199d9fb-fcc6-7066-9480-979cbe69c286', NULL, NULL, 'Ptolemaic', '$2y$12$nXyWqN.LImbfh.baNywo2e532UtEKAYIHBJ77MhZ5pILOSyKAs0m.', 'users', '[]', '["personal_access"]', 0, '2025-10-13 00:53:14', '2025-10-13 00:53:14');

-- Volcando datos para la tabla catai.oauth_device_codes: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.oauth_refresh_tokens: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.password_reset_tokens: ~1 rows (aproximadamente)
REPLACE INTO `password_reset_tokens` (`email`, `token`, `created_at`) VALUES
	('alexisrb76@gmail.com', '$2y$12$RtE5uLFJB3LcR7rdpGhEPuZpWCJelVtHjuUhckwcVyKLL37FzgAz6', '2025-10-12 22:48:00');

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

-- Volcando datos para la tabla catai.provider_categories: ~4 rows (aproximadamente)
REPLACE INTO `provider_categories` (`id`, `name`, `display_name`, `description`, `created_at`, `updated_at`) VALUES
	(1, 'ai', 'Inteligencia Artificial', 'Modelos y servicios de IA generativa.', '2025-10-10 07:07:33', '2025-10-12 00:05:45'),
	(2, 'market_data', 'Datos de Mercado', 'Fuentes de datos financieros y bursatiles.', '2025-10-10 07:07:33', '2025-10-12 00:05:45'),
	(3, 'news', 'Noticias', 'Agregadores y proveedores de noticias.', '2025-10-10 07:07:33', '2025-10-12 00:05:45'),
	(4, 'trading', 'Trading', 'Plataformas y brokers con APIs de trading.', '2025-10-10 07:07:33', '2025-10-12 00:05:45');

-- Volcando datos para la tabla catai.roles: ~3 rows (aproximadamente)
REPLACE INTO `roles` (`id`, `name`, `guard_name`, `created_at`, `updated_at`) VALUES
	(1, 'Admin', 'web', '2025-10-10 08:31:34', '2025-10-10 08:31:34'),
	(2, 'User', 'web', '2025-10-10 08:56:41', '2025-10-10 08:56:41'),
	(3, 'Manager', 'web', '2025-10-11 23:22:19', '2025-10-11 23:22:19');

-- Volcando datos para la tabla catai.role_has_permissions: ~15 rows (aproximadamente)
REPLACE INTO `role_has_permissions` (`permission_id`, `role_id`) VALUES
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
	(8, 1);

-- Volcando datos para la tabla catai.sessions: ~4 rows (aproximadamente)
REPLACE INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
	('aIuN27EfDwPJlc8aw0M3d0cri7zFWfFmXyNjA3cY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoicXhuZUZTa0tZY2JCMWc3WnNDVThSek1JS1VZUGwwTEpkallyNE5sSCI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czo4MToiaHR0cDovL2Nncy1wdG9sZW1haWMuY29tL2VzL2FkbWluP190b2tlbj1zUndQc2UyNjc0TG5IRVg5R0N1RURndGFpSVNiUk9MU0lLNGdQbFNQIjt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6ODE6Imh0dHA6Ly9jZ3MtcHRvbGVtYWljLmNvbS9lcy9hZG1pbj9fdG9rZW49c1J3UHNlMjY3NExuSEVYOUdDdUVEZ3RhaUlTYlJPTFNJSzRnUGxTUCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760295901),
	('be3JNUXBDxXHKx8PXX0DynaDEiZqEvfAa6MJHmbM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiZ2U3R3A4N1lQUWZ6MkdWb3hIeElyV25aNVJ6U1cwaXFUeFE1T09ORCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MzM6Imh0dHA6Ly9jZ3MtcHRvbGVtYWljLmNvbS9lcy9sb2dpbiI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1760295902),
	('bgbAspX7YoyWaw4c5RmHo6j4PUKxDKZSqWivAGhd', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:143.0) Gecko/20100101 Firefox/143.0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoic1J3UHNlMjY3NExuSEVYOUdDdUVEZ3RhaUlTYlJPTFNJSzRnUGxTUCI7czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6OTE6Imh0dHA6Ly9jZ3MtcHRvbGVtYWljLmNvbS9lcy9hZG1pbi9wcm92aWRlcnM/X3Rva2VuPXNSd1BzZTI2NzRMbkhFWDlHQ3VFRGd0YWlJU2JST0xTSUs0Z1BsU1AiO31zOjU6InN0YXRlIjtzOjQwOiJ2UUJsS1FTbU9yQlNBSnJtekY5azNTV1c5R1JqSnZQcGhBR1ZpdmpEIjtzOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=', 1760299395),
	('S91HVrraXPZSaPO5XLXOeu5gnonqTMud2CkeyeKG', 1, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQmJRWk9qOEFGNUJFeGxjMUxieGYzRlZ2TGc0MEt6RlJXWlNIVngwaCI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjc6Imh0dHA6Ly9jZ3MtcHRvbGVtYWljLmNvbS9lcyI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6NTA6ImxvZ2luX3dlYl81OWJhMzZhZGRjMmIyZjk0MDE1ODBmMDE0YzdmNThlYTRlMzA5ODlkIjtpOjE7fQ==', 1760292467);

-- Volcando datos para la tabla catai.trading_providers: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.trading_provider_keys: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.trading_provider_key_verifications: ~0 rows (aproximadamente)

-- Volcando datos para la tabla catai.users: ~2 rows (aproximadamente)
REPLACE INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `two_factor_secret`, `two_factor_recovery_codes`, `two_factor_confirmed_at`, `remember_token`, `created_at`, `updated_at`, `google_id`) VALUES
	(1, 'Alexis Rodríguez Bandera', 'alexisrb76@gmail.com', NULL, '$2y$12$J44oKXOmts8B5izKE5SWB.HNYM0/0PzvAdYdtQCB3IfF5IC9W.e3.', NULL, NULL, NULL, 'i6mDGVs1XT9d3BPmU0zimumyNXlnz95iiQhleaJXxnb2enyF9UN9jfnBLqvn', '2025-10-03 15:52:55', '2025-10-12 21:26:33', '102939162050858743728'),
	(2, 'alexis rodriguez', 'admin@cerberomart.com', NULL, '$2y$12$zFq/n2p6Up1xN1oPkg3PauZRxbkigIfCt3.W1WjmBExz0.DW6xOHu', 'eyJpdiI6InVKaVVQUUZGVnZnaVkrbGZKYkNmbEE9PSIsInZhbHVlIjoiL1BNZWk0NzI1UnNlM3ljZ1hkZ1YyU0ZrK1U2Z3lJUWRXVjBockFVQk9xdz0iLCJtYWMiOiJjMWVjYWEyZjcwYzU1ZjkzMjBhNTdmY2JlOWVjMzIyNmMxNDA1ZDI2YTBjMzZhM2M4MmIxZjZlZWE4NGI1NzI0IiwidGFnIjoiIn0=', 'eyJpdiI6IldxS1JwVkF2Q0dsMWVhd3pEcTdCSWc9PSIsInZhbHVlIjoiKzEyWFFEL0d0ZHZ5M0tNTzRnQVp1RlhXd3hEbWpyMGJVaVY5ZUJydndCQ0tCckRkTkFrTHZhQW9vU1NLaHVkSjJjaHFXTy81VEUxZXVVaWdES1ZjanVwOFFmWm5URVcxZjNhZ2ZZLzY3VGRJM2RlMWwvK0dYcXN5RW9mT2tVMzBRU1JpeCtuL2g3ek94L1B3enRSaDkwU0ZyU0tjRFlmTzRrWnkzT3QvR3BRRU9kN0trcmRpelowN0krUzNjaTlIaW14Rjh3NXBqRUdGV3duZjlXRCs2N2g0VjliSkl0THpGZGxwV3Q1WVdyVzRTckFJZUJMWXZuUEQ0TGtNSEZuM2hsRWVnUDJ6Z3UxcHlsMm1KZTdDNHc9PSIsIm1hYyI6ImMyOGE3N2QwZjMyMjE0ZmY0YzViZGU0YTY5YWE0NWZiZTkyZTkwZjBiMjM2NGRiZDcwZGE0N2E4MWYyYjdlZGQiLCJ0YWciOiIifQ==', NULL, NULL, '2025-10-04 10:58:03', '2025-10-04 10:58:22', NULL);

-- Volcando datos para la tabla catai.user_default_provider_settings: ~0 rows (aproximadamente)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
