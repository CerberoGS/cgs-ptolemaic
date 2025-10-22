# 🚀 PLAN DE MIGRACIÓN A INFRAESTRUCTURA DE ALTO RENDIMIENTO
## Proyecto: CGS Ptolemaic - Copiloto IA "Ptolomeo"

**Objetivo**: Preparar la aplicación para alto rendimiento y concurrencia masiva
**Fecha**: 2025-10-20
**Status**: ✅ VERIFICADO - Filament v4 está disponible (v4.1.9 stable)

---

## 📊 ESTADO ACTUAL CONFIRMADO

### Stack Actual
- ✅ Laravel 12
- ✅ PHP 8.3.16 con `pdo_pgsql` driver instalado
- ✅ MySQL (local: catai database)
- ✅ Inertia v2 + React 19
- ✅ Tailwind CSS v4
- ❌ PostgreSQL no instalado localmente
- ✅ Docker
- ❌ Sin Octane
- ❌ Sin Filament
- ❌ Sin Prism AI

### Hosting Target
- **VPS**: Hostinger
- **Server**: Laravel Octane
- **DB**: PostgreSQL
- **IA**: FinGPT (self-hosted en VPS) + Prism Gateway
- **Admin**: Filament v4

---

## 🎯 OBJETIVO FINAL (Stack de Producción)

```
┌─────────────────────────────────────────────────────────┐
│                    HOSTINGER VPS                         │
├─────────────────────────────────────────────────────────┤
│  🐳 Docker Container 1: Laravel App                     │
│    - Laravel 12 + Octane (Swoole/RoadRunner)           │
│    - Filament v4 Admin Panel (/admin)                   │
│    - Inertia + React Frontend                            │
│    - Prism AI Gateway                                    │
│    - Redis (cache, queue, session)                      │
│    - Reverb (WebSockets)                                 │
├─────────────────────────────────────────────────────────┤
│  🐳 Docker Container 2: PostgreSQL 16                   │
│    - Database principal                                  │
│    - Full-text search                                    │
│    - JSONB para AI responses                             │
├─────────────────────────────────────────────────────────┤
│  🐳 Docker Container 3: FinGPT                          │
│    - Modelo FinGPT fine-tuned                           │
│    - API REST local                                      │
│    - Análisis financiero                                 │
├─────────────────────────────────────────────────────────┤
│  🐳 Docker Container 4: Redis                           │
│    - Cache                                               │
│    - Queue Jobs                                          │
│    - Sessions                                            │
│    - Rate Limiting                                       │
├─────────────────────────────────────────────────────────┤
│  ☁️  Prism AI Gateway (Failover/Peaks)                  │
│    - OpenAI API (backup)                                 │
│    - Anthropic Claude (backup)                           │
│    - Queue management para picos                         │
└─────────────────────────────────────────────────────────┘
```

---

## 📋 FASES DE MIGRACIÓN

### FASE 0: Preparación Local (1 día)
**Objetivo**: Instalar herramientas locales necesarias

#### 0.1 Instalar PostgreSQL en Laragon
```bash
# Descargar PostgreSQL 16 para Windows
# https://www.postgresql.org/download/windows/

# Configurar en Laragon:
# 1. Copiar carpeta postgres-16 a C:\laragon\bin\postgres\
# 2. Iniciar PostgreSQL desde Laragon
# 3. Crear database: cgs_ptolemaic

# Verificar instalación
psql --version
```

#### 0.2 Instalar Docker Desktop
```bash
# Descargar Docker Desktop para Windows
# https://www.docker.com/products/docker-desktop/

# Habilitar WSL2 si es necesario
wsl --install

# Verificar instalación
docker --version
docker-compose --version
```

#### 0.3 Backup de MySQL Actual
```bash
# Exportar base de datos actual
php artisan db:backup

# O manualmente
mysqldump -u root -p catai > backup_mysql_$(date +%Y%m%d).sql
```

**Checklist FASE 0**:
- [ ] PostgreSQL instalado en Laragon
- [ ] Docker Desktop instalado y funcionando
- [ ] Backup de MySQL creado
- [ ] Archivo `.env.backup` creado

---

### FASE 1: Migración a PostgreSQL (2-3 días)

#### 1.1 Configurar PostgreSQL Local
```bash
# Crear database en PostgreSQL
psql -U postgres
CREATE DATABASE cgs_ptolemaic;
CREATE USER ptolemaic_user WITH PASSWORD 'tu_password_seguro';
GRANT ALL PRIVILEGES ON DATABASE cgs_ptolemaic TO ptolemaic_user;
\q
```

#### 1.2 Actualizar .env
```env
# Cambiar de MySQL a PostgreSQL
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=cgs_ptolemaic
DB_USERNAME=ptolemaic_user
DB_PASSWORD=tu_password_seguro

# Activar Redis (ya está en .env)
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
```

#### 1.3 Verificar Compatibilidad de Migraciones
```bash
# Revisar migraciones por sintaxis MySQL específica
php artisan migrate:status

# Buscar incompatibilidades comunes
# - UNSIGNED → sin UNSIGNED en PostgreSQL
# - TINYINT → SMALLINT en PostgreSQL
# - ENUM → usar SMALLINT o VARCHAR con check constraint
# - JSON → JSONB en PostgreSQL (mejor performance)
```

#### 1.4 Ajustar Migraciones para PostgreSQL

**Crear migración de ajustes**:
```bash
php artisan make:migration adjust_tables_for_postgresql
```

**Ejemplos de ajustes comunes**:
```php
// Antes (MySQL)
$table->enum('type', ['free', 'trial', 'paid']);

// Después (PostgreSQL)
$table->string('type', 20);
// Agregar check constraint si es necesario

// Antes (MySQL)
$table->json('metadata');

// Después (PostgreSQL)
$table->jsonb('metadata'); // Mejor performance
```

#### 1.5 Migrar Datos de MySQL a PostgreSQL

**Opción A: Manual (Recomendado para desarrollo)**
```bash
# 1. Ejecutar migraciones en PostgreSQL limpio
php artisan migrate:fresh

# 2. Exportar datos de MySQL (solo data, no structure)
mysqldump -u root -p --no-create-info --skip-triggers catai > data_mysql.sql

# 3. Convertir SQL de MySQL a PostgreSQL
# Usar herramienta: https://github.com/lanyrd/mysql-postgresql-converter
# O manualmente ajustar sintaxis

# 4. Importar a PostgreSQL
psql -U ptolemaic_user -d cgs_ptolemaic < data_postgresql.sql
```

**Opción B: Usando Laravel (Más seguro)**
```bash
# Crear comando artisan personalizado
php artisan make:command MigrateMySQLToPostgreSQL

# El comando:
# 1. Lee de MySQL (configuración temporal)
# 2. Escribe a PostgreSQL
# 3. Valida integridad de datos
```

#### 1.6 Verificar Migración
```bash
# Ejecutar tests
php artisan test

# Verificar counts de registros
php artisan tinker
>>> User::count()
>>> JournalEntry::count()
>>> AiProvider::count()

# Comparar con MySQL
```

**Checklist FASE 1**:
- [ ] PostgreSQL configurado localmente
- [ ] .env actualizado a pgsql
- [ ] Migraciones ajustadas para PostgreSQL
- [ ] Datos migrados correctamente
- [ ] Tests pasando con PostgreSQL
- [ ] Seeders funcionando

---

### FASE 2: Instalación de Filament v4 (1 día)

#### 2.1 Instalar Filament v4
```bash
# Instalar Filament v4 (STABLE - v4.1.9)
composer require filament/filament:"^4.0"

# Instalar panel de administración
php artisan filament:install --panels

# Opción recomendada: Admin Panel separado
# Path: /admin
# Auth: Spatie Permissions (role:admin)
```

#### 2.2 Configurar Filament Panel
```bash
# Crear panel provider
php artisan make:filament-panel admin

# Configurar en app/Providers/Filament/AdminPanelProvider.php
```

**Configuración básica**:
```php
<?php

namespace App\Providers\Filament;

use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->id('admin')
            ->path('admin')
            ->login()
            ->colors([
                'primary' => Color::Blue,
            ])
            ->discoverResources(in: app_path('Filament/Admin/Resources'), for: 'App\\Filament\\Admin\\Resources')
            ->discoverPages(in: app_path('Filament/Admin/Pages'), for: 'App\\Filament\\Admin\\Pages')
            ->discoverWidgets(in: app_path('Filament/Admin/Widgets'), for: 'App\\Filament\\Admin\\Widgets')
            ->middleware([
                'web',
                \App\Http\Middleware\SetLocale::class,
            ])
            ->authMiddleware([
                \Filament\Http\Middleware\Authenticate::class,
            ])
            ->authGuard('web')
            ->spa(); // SPA mode para mejor UX
    }
}
```

#### 2.3 Integrar con Spatie Permissions
```bash
# Instalar plugin de Spatie para Filament
composer require bezhansalleh/filament-shield

# Publicar configuración
php artisan vendor:publish --tag=filament-shield-config

# Generar permisos para recursos
php artisan shield:generate --all
```

#### 2.4 Crear Recursos Base de Filament

**Usuarios**:
```bash
php artisan make:filament-resource User --generate
```

**AI Providers** (importante para tu proyecto):
```bash
php artisan make:filament-resource AiProvider --generate
php artisan make:filament-resource AiProviderKey --generate
```

**Trading**:
```bash
php artisan make:filament-resource MarketDataProvider --generate
php artisan make:filament-resource TradingProvider --generate
php artisan make:filament-resource NewsProvider --generate
```

**Journal**:
```bash
php artisan make:filament-resource JournalEntry --generate
```

**Plans & Affiliates**:
```bash
php artisan make:filament-resource PricingPlan --generate
php artisan make:filament-resource AffiliateCode --generate
php artisan make:filament-resource Referral --generate
```

**Feedback & Moderation**:
```bash
php artisan make:filament-resource Feedback --generate
php artisan make:filament-resource Report --generate
```

#### 2.5 Crear Dashboard con Widgets
```bash
# Widget de métricas principales
php artisan make:filament-widget StatsOverview --resource=UserResource

# Widget de gráficos
php artisan make:filament-widget UsersChart
php artisan make:filament-widget JournalEntriesChart
php artisan make:filament-widget AiUsageChart
```

#### 2.6 Verificar Instalación
```bash
# Ejecutar servidor
php artisan serve

# Visitar: http://localhost:8000/admin
# Login con usuario admin existente
```

**Checklist FASE 2**:
- [ ] Filament v4 instalado
- [ ] Panel admin configurado en /admin
- [ ] Integración con Spatie Permissions
- [ ] Recursos principales creados
- [ ] Dashboard funcional
- [ ] Tests de acceso a admin pasando

---

### FASE 3: Instalación de Prism + Neuron AI (2-3 días) ⭐ ACTUALIZADO

#### DÍA 1: Prism (Gateway LLM con Failover)

**3.1 Instalar Prism**
```bash
# Instalar Prism PHP
composer require echolabsdev/prism

# Publicar configuración
php artisan vendor:publish --tag=prism-config
```

**3.2 Configurar Providers en .env**
```env
# FinGPT (VPS Local - Primary)
FINGPT_API_URL=http://fingpt:8001/v1
FINGPT_API_KEY=tu_fingpt_key

# Backups para picos de demanda y redundancia
OPENAI_API_KEY=sk-xxxxxx
ANTHROPIC_API_KEY=sk-ant-xxxxxx

# Prism default provider
PRISM_DEFAULT_PROVIDER=fingpt
```

**3.3 Configurar Providers con Failover en config/prism.php**
```php
<?php

return [
    'default' => env('PRISM_DEFAULT_PROVIDER', 'fingpt'),

    'providers' => [
        // 1️⃣ FinGPT (Local VPS) - PRIMARY
        'fingpt' => [
            'driver' => 'openai', // Compatible con OpenAI API
            'url' => env('FINGPT_API_URL'),
            'api_key' => env('FINGPT_API_KEY'),
            'model' => 'fingpt-forecaster',
            'timeout' => 60,
            'priority' => 1, // Más alta prioridad
        ],

        // 2️⃣ OpenAI (Backup para picos/fallos)
        'openai' => [
            'driver' => 'openai',
            'api_key' => env('OPENAI_API_KEY'),
            'organization' => env('OPENAI_ORGANIZATION'),
            'model' => 'gpt-4o',
            'timeout' => 30,
            'priority' => 2,
        ],

        // 3️⃣ Anthropic Claude (Backup crítico)
        'anthropic' => [
            'driver' => 'anthropic',
            'api_key' => env('ANTHROPIC_API_KEY'),
            'model' => 'claude-sonnet-4-20250514',
            'timeout' => 30,
            'priority' => 3,
        ],
    ],

    // Estrategia de failover automático
    'failover' => [
        'enabled' => true,
        'providers' => ['fingpt', 'openai', 'anthropic'],
        'max_retries' => 3,
        'retry_after' => 300, // 5 minutos
        'backoff' => [100, 500, 1000], // Exponential backoff en ms
    ],

    // Queue para gestionar picos de demanda
    'queue' => [
        'enabled' => true,
        'connection' => 'redis',
        'queue' => 'ai-requests',
        'retry_after' => 90, // 90 segundos
    ],
];
```

**3.4 Crear Servicio de Failover con Prism**
```bash
# Crear servicio principal
php artisan make:class Services/PtolemeoAI
```

**Implementación básica**:
```php
<?php

namespace App\Services;

use EchoLabs\Prism\Prism;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;

class PtolemeoAI
{
    protected string $provider;

    public function __construct(string $provider = null)
    {
        $this->provider = $provider ?? config('prism.default');
    }

    /**
     * Analizar operación de trading
     */
    public function analyzeJournalEntry(JournalEntry $entry): array
    {
        try {
            $response = Prism::text()
                ->using($this->provider)
                ->withPrompt($this->buildAnalysisPrompt($entry))
                ->withMaxTokens(1000)
                ->generate();

            return [
                'success' => true,
                'analysis' => $response->text,
                'provider' => $this->provider,
            ];
        } catch (\Exception $e) {
            return $this->handleFailover($entry, $e);
        }
    }

    /**
     * Sistema de recomendaciones
     */
    public function generateRecommendations(User $user): array
    {
        $cacheKey = "recommendations.{$user->id}";

        return Cache::remember($cacheKey, 3600, function () use ($user) {
            return Prism::text()
                ->using($this->provider)
                ->withPrompt($this->buildRecommendationsPrompt($user))
                ->generate();
        });
    }

    /**
     * Failover automático
     */
    protected function handleFailover(mixed $data, \Exception $error): array
    {
        Log::warning("Prism failover triggered", [
            'provider' => $this->provider,
            'error' => $error->getMessage(),
        ]);

        $providers = config('prism.failover.providers');

        foreach ($providers as $provider) {
            if ($provider === $this->provider) {
                continue;
            }

            try {
                $this->provider = $provider;
                return $this->analyzeJournalEntry($data);
            } catch (\Exception $e) {
                continue;
            }
        }

        throw new \Exception('All AI providers failed');
    }

    protected function buildAnalysisPrompt(JournalEntry $entry): string
    {
        return <<<PROMPT
        Eres Ptolomeo, un copiloto de trading experto.

        Analiza la siguiente operación:
        - Activo: {$entry->asset}
        - Entrada: {$entry->entry_price}
        - Salida: {$entry->exit_price}
        - P&L: {$entry->pnl}
        - Notas: {$entry->notes}

        Proporciona:
        1. Análisis técnico
        2. Gestión de riesgo
        3. Lecciones aprendidas
        4. Recomendaciones
        PROMPT;
    }
}
```

#### 3.5 Crear Jobs para Procesar IA en Background
```bash
php artisan make:job ProcessAIAnalysis
```

```php
<?php

namespace App\Jobs;

use App\Services\PtolemeoAI;
use App\Models\JournalEntry;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;

class ProcessAIAnalysis implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public function __construct(
        public JournalEntry $entry
    ) {}

    public function handle(PtolemeoAI $ptolomeo): void
    {
        $analysis = $ptolomeo->analyzeJournalEntry($this->entry);

        $this->entry->update([
            'ai_analysis' => $analysis['analysis'],
            'analyzed_at' => now(),
            'analyzed_by_provider' => $analysis['provider'],
        ]);
    }

    public function failed(\Throwable $exception): void
    {
        Log::error('AI Analysis failed', [
            'entry_id' => $this->entry->id,
            'error' => $exception->getMessage(),
        ]);
    }
}
```

#### 3.6 Integrar con Eventos de Laravel
```php
// En app/Models/JournalEntry.php

protected static function booted(): void
{
    static::created(function (JournalEntry $entry) {
        // Disparar análisis automático
        ProcessAIAnalysis::dispatch($entry);
    });
}
```

**Checklist FASE 3**:
- [ ] Prism instalado y configurado
- [ ] Providers configurados (FinGPT, OpenAI, Claude)
- [ ] Servicio PtolemeoAI creado
- [ ] Jobs para procesamiento background
- [ ] Sistema de failover funcionando
- [ ] Tests de integración IA

---

### FASE 4: Laravel Octane (1 día)

#### 4.1 Instalar Laravel Octane
```bash
# Instalar Octane
composer require laravel/octane

# Instalar Swoole (recomendado) o RoadRunner
php artisan octane:install --server=swoole

# O para RoadRunner
php artisan octane:install --server=roadrunner
```

#### 4.2 Configurar Octane
```bash
# Publicar configuración
php artisan vendor:publish --tag=octane-config
```

**Editar config/octane.php**:
```php
<?php

return [
    'server' => env('OCTANE_SERVER', 'swoole'),

    'swoole' => [
        'options' => [
            'log_level' => SWOOLE_LOG_INFO,
            'package_max_length' => 10 * 1024 * 1024, // 10 MB
            'max_request' => 1000,
            'worker_num' => swoole_cpu_num() * 2,
            'task_worker_num' => swoole_cpu_num() * 2,
        ],
    ],

    'warm' => [
        // Pre-cargar clases críticas
        \App\Services\PtolemeoAI::class,
        \App\Models\User::class,
        \App\Models\JournalEntry::class,
    ],

    'cache' => [
        'tables' => [
            'users',
            'ai_providers',
            'pricing_plans',
        ],
    ],
];
```

#### 4.3 Optimizar para Octane

**Evitar memory leaks**:
```php
// Evitar variables estáticas
// Evitar singletons mutables
// Usar flush en middleware

// Middleware de limpieza
php artisan make:middleware FlushStateMiddleware
```

#### 4.4 Probar Octane Localmente
```bash
# Iniciar Octane
php artisan octane:start

# Verificar performance
ab -n 1000 -c 10 http://127.0.0.1:8000/api/status

# Comparar con servidor normal
php artisan serve
ab -n 1000 -c 10 http://127.0.0.1:8000/api/status
```

**Checklist FASE 4**:
- [ ] Octane instalado (Swoole o RoadRunner)
- [ ] Configuración optimizada
- [ ] Memory leaks verificados
- [ ] Performance testing realizado
- [ ] Listo para producción

---

### FASE 5: Docker (2-3 días)

#### 5.1 Crear docker-compose.yml
```yaml
version: '3.8'

services:
  # Laravel App con Octane
  app:
    build:
      context: .
      dockerfile: Dockerfile
    container_name: ptolemaic-app
    restart: unless-stopped
    working_dir: /var/www
    volumes:
      - ./:/var/www
      - ./storage:/var/www/storage
    environment:
      - APP_ENV=production
      - APP_DEBUG=false
      - DB_CONNECTION=pgsql
      - DB_HOST=postgres
      - REDIS_HOST=redis
      - FINGPT_API_URL=http://fingpt:8001/v1
    ports:
      - "8000:8000"
    depends_on:
      - postgres
      - redis
    networks:
      - ptolemaic-network
    command: php artisan octane:start --server=swoole --host=0.0.0.0 --port=8000

  # PostgreSQL 16
  postgres:
    image: postgres:16-alpine
    container_name: ptolemaic-postgres
    restart: unless-stopped
    environment:
      POSTGRES_DB: cgs_ptolemaic
      POSTGRES_USER: ptolemaic_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres-data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    networks:
      - ptolemaic-network

  # Redis
  redis:
    image: redis:7-alpine
    container_name: ptolemaic-redis
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - ptolemaic-network

  # FinGPT (Placeholder - configurar después)
  fingpt:
    image: python:3.11-slim
    container_name: ptolemaic-fingpt
    restart: unless-stopped
    working_dir: /app
    volumes:
      - ./fingpt:/app
    ports:
      - "8001:8001"
    networks:
      - ptolemaic-network
    # comando placeholder
    command: python api_server.py

  # Nginx (opcional, para producción)
  nginx:
    image: nginx:alpine
    container_name: ptolemaic-nginx
    restart: unless-stopped
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./:/var/www
      - ./docker/nginx:/etc/nginx/conf.d
      - ./docker/ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - ptolemaic-network

volumes:
  postgres-data:
  redis-data:

networks:
  ptolemaic-network:
    driver: bridge
```

#### 5.2 Crear Dockerfile
```dockerfile
FROM php:8.3-cli

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpq-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    && docker-php-ext-install pdo_pgsql pgsql mbstring xml bcmath \
    && pecl install swoole \
    && docker-php-ext-enable swoole

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Configuración PHP
COPY docker/php/php.ini /usr/local/etc/php/

WORKDIR /var/www

COPY . .

RUN composer install --no-dev --optimize-autoloader

RUN php artisan config:cache && \
    php artisan route:cache && \
    php artisan view:cache

EXPOSE 8000

CMD ["php", "artisan", "octane:start", "--server=swoole", "--host=0.0.0.0", "--port=8000"]
```

#### 5.3 Configuración de Nginx para Octane
```nginx
# docker/nginx/default.conf

upstream octane {
    server app:8000;
}

server {
    listen 80;
    server_name cptolemaic.com www.cptolemaic.com;

    location / {
        proxy_pass http://octane;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

#### 5.4 Scripts de Deploy
```bash
# deploy.sh
#!/bin/bash

echo "🚀 Deploying Ptolemaic..."

# Pull latest code
git pull origin main

# Build containers
docker-compose build --no-cache

# Down old containers
docker-compose down

# Up new containers
docker-compose up -d

# Migrations
docker-compose exec app php artisan migrate --force

# Optimize
docker-compose exec app php artisan optimize

echo "✅ Deploy completed!"
```

#### 5.5 Pruebas Locales con Docker
```bash
# Build y levantar contenedores
docker-compose up -d --build

# Ver logs
docker-compose logs -f app

# Ejecutar migraciones
docker-compose exec app php artisan migrate

# Ejecutar tests
docker-compose exec app php artisan test

# Verificar performance
docker stats
```

**Checklist FASE 5**:
- [ ] docker-compose.yml creado
- [ ] Dockerfile optimizado
- [ ] Nginx configurado para Octane
- [ ] Scripts de deploy listos
- [ ] Tests en Docker pasando
- [ ] Performance validada

---

### FASE 6: Deploy a Hostinger VPS (1 día)

#### 6.1 Preparar VPS
```bash
# Conectar a VPS
ssh root@tu-vps-hostinger.com

# Actualizar sistema
apt update && apt upgrade -y

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Instalar Docker Compose
apt install docker-compose -y

# Crear usuario para deploy
adduser ptolemaic
usermod -aG docker ptolemaic
su - ptolemaic
```

#### 6.2 Configurar Git en VPS
```bash
# SSH keys para GitHub
ssh-keygen -t ed25519 -C "deploy@ptolemaic"
cat ~/.ssh/id_ed25519.pub
# Agregar a GitHub Deploy Keys

# Clonar repositorio
cd /home/ptolemaic
git clone git@github.com:tu-usuario/cgs-ptolemaic.git
cd cgs-ptolemaic
```

#### 6.3 Configurar .env de Producción
```bash
cp .env.example .env.production
nano .env.production
```

```env
APP_ENV=production
APP_DEBUG=false
APP_URL=https://cptolemaic.com

DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=cgs_ptolemaic
DB_USERNAME=ptolemaic_user
DB_PASSWORD=STRONG_PASSWORD_HERE

REDIS_HOST=redis
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis

FINGPT_API_URL=http://fingpt:8001/v1

# APIs de backup (opcional)
OPENAI_API_KEY=
ANTHROPIC_API_KEY=
```

#### 6.4 Deploy Inicial
```bash
# Build y levantar
docker-compose up -d --build

# Generar key
docker-compose exec app php artisan key:generate

# Migraciones
docker-compose exec app php artisan migrate --seed

# Crear usuario admin
docker-compose exec app php artisan make:filament-user

# SSL con Let's Encrypt
apt install certbot python3-certbot-nginx
certbot --nginx -d cptolemaic.com -d www.cptolemaic.com
```

#### 6.5 Configurar CI/CD (GitHub Actions)
```yaml
# .github/workflows/deploy.yml

name: Deploy to Hostinger VPS

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to VPS
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.VPS_HOST }}
          username: ptolemaic
          key: ${{ secrets.VPS_SSH_KEY }}
          script: |
            cd /home/ptolemaic/cgs-ptolemaic
            git pull origin main
            docker-compose down
            docker-compose up -d --build
            docker-compose exec -T app php artisan migrate --force
            docker-compose exec -T app php artisan optimize
```

**Checklist FASE 6**:
- [ ] VPS preparado con Docker
- [ ] Repositorio clonado
- [ ] .env.production configurado
- [ ] Deploy inicial exitoso
- [ ] SSL configurado
- [ ] CI/CD funcionando

---

## 🔧 CONFIGURACIÓN DE FINGPT (FASE FUTURA)

### Setup de FinGPT en VPS
```bash
# Crear directorio
mkdir -p /home/ptolemaic/fingpt
cd /home/ptolemaic/fingpt

# Clonar FinGPT
git clone https://github.com/AI4Finance-Foundation/FinGPT.git

# Instalar Python dependencies
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt

# Fine-tuning con tus datos
python train.py --data tu_data_financiera.csv

# Servidor API
python api_server.py --port 8001
```

**Dockerfile para FinGPT**:
```dockerfile
FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

EXPOSE 8001

CMD ["python", "api_server.py", "--host", "0.0.0.0", "--port", "8001"]
```

---

## 📊 CHECKLIST GENERAL DE MIGRACIÓN

### Preparación
- [ ] Backup completo de MySQL
- [ ] PostgreSQL instalado localmente
- [ ] Docker Desktop instalado
- [ ] Plan revisado y aprobado

### Migración de Datos
- [ ] Database migrada a PostgreSQL
- [ ] Tests pasando con PostgreSQL
- [ ] Redis activado para cache/queue/session

### Filament v4
- [ ] Filament v4 instalado
- [ ] Panel admin configurado
- [ ] Recursos principales creados
- [ ] Dashboard funcional

### Prism AI
- [ ] Prism instalado
- [ ] Providers configurados (FinGPT, backups)
- [ ] Servicio PtolemeoAI implementado
- [ ] Sistema de failover funcionando

### Performance
- [ ] Laravel Octane instalado
- [ ] Configuración optimizada
- [ ] Performance testing realizado

### Docker
- [ ] docker-compose.yml completo
- [ ] Dockerfile optimizado
- [ ] Tests en Docker pasando

### Deploy
- [ ] VPS configurado
- [ ] Deploy inicial exitoso
- [ ] SSL configurado
- [ ] Monitoring configurado

---

## 🎯 PRÓXIMOS PASOS INMEDIATOS

1. **AHORA**: Revisar y aprobar este plan
2. **HOY**: Instalar PostgreSQL y Docker localmente
3. **MAÑANA**: Comenzar migración a PostgreSQL
4. **ESTA SEMANA**: Completar Fases 1-3
5. **PRÓXIMA SEMANA**: Docker y Deploy

---

## 📞 SOPORTE Y RECURSOS

### Documentación Oficial
- **Filament v4**: https://filamentphp.com/docs/4.x
- **Prism**: https://prismphp.com/
- **FinGPT**: https://github.com/AI4Finance-Foundation/FinGPT
- **Laravel Octane**: https://laravel.com/docs/12.x/octane
- **PostgreSQL**: https://www.postgresql.org/docs/

### Comandos Útiles
```bash
# Ver logs de Docker
docker-compose logs -f

# Entrar a contenedor
docker-compose exec app bash

# Restart servicios
docker-compose restart

# Ver uso de recursos
docker stats

# Backup PostgreSQL
docker-compose exec postgres pg_dump -U ptolemaic_user cgs_ptolemaic > backup.sql

# Restore PostgreSQL
docker-compose exec -T postgres psql -U ptolemaic_user cgs_ptolemaic < backup.sql
```

---

**¿LISTO PARA EMPEZAR?** 🚀

Dame luz verde y comenzamos con FASE 0 (Preparación Local).
