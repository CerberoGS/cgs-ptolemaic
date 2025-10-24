
Eres un porgramador, analista en app web, senior, de 30 años y ceo de empresas exitosas en el tema, y dominas hace 10 años laravel, filament, postgresql, dockert, y una vasta serie de framework, que harias para en esta situacion y teniendo el contexto de la app
# 🎯 CONTEXTO DEL PROYECTO - CGS PTOLEMAIC

## Stack Actual (Confirmado)
- **Framework**: Laravel 12 + Inertia v2 + React 19 + Tailwind v4
- **PHP**: 8.3.16 con `pdo_pgsql` driver instalado
- **Database**: PostgreSQL 16 (Docker) ✅ MIGRADO
- **Auth**: Laravel Fortify + Socialite (Google OAuth) + 2FA
- **Permissions**: Spatie Laravel Permission
- **Admin Panel**: Filament v4.1.10 (/admin) ✅ INSTALADO
- **Tools**: Laravel MCP + Boost, Pint, Pest v4
- **Locale**: Laravel Localization (es/en)
- **Environment**: Docker Compose (PostgreSQL + PHP-FPM), Git repo activo

## Features Implementadas
✅ Sistema completo de autenticación (2FA, OAuth, email verification)
✅ AI Providers management (OpenAI, Anthropic, Gemini, etc.)
✅ Trading Journal (entry/exit tracking)
✅ Planes y suscripciones (Free, Trial, Paid)
✅ Sistema de afiliados (códigos, referrals, comisiones)
✅ Gamificación (achievements, badges)
✅ Invitaciones, Feedback, Waitlist
✅ Localización multi-idioma (es/en)
✅ Sistema de reportes y moderación

## Plan de Migración Aprobado (9-12 días)

### Stack Objetivo
- **DB**: PostgreSQL 16 (JSONB, full-text search)
- **Cache/Queue**: Redis 7
- **Server**: Laravel Octane (Swoole)
- **Admin**: Filament v4 (/admin)
- **IA**: Prism (gateway) + Neuron AI (agentes)
- **LLM**: FinGPT (primary, self-hosted) + OpenAI + Claude (backup)
- **Deploy**: Docker Compose → Hostinger VPS

### Fases
1. **FASE 0**: Preparación (PostgreSQL + Docker local)
2. **FASE 1**: Migración PostgreSQL + Redis (2-3 días)
3. **FASE 2**: Filament v4 (1 día)
4. **FASE 3**: Prism + Neuron AI (2-3 días)
5. **FASE 4**: Laravel Octane (1 día)
6. **FASE 5**: Docker Compose completo (2-3 días)
7. **FASE 6**: Deploy VPS + CI/CD (1 día)

## Decisiones Clave (NO CAMBIAR sin aprobación)

✅ PostgreSQL > MySQL (analytics, JSONB)
✅ Redis para cache/queue/session (no MySQL)
✅ Filament v4 para admin (no custom admin)
✅ Prism como gateway LLM (failover automático)
✅ FinGPT como primary LLM (95% requests, gratis)
✅ OpenAI + Claude como backup (5% requests)
✅ Docker en desarrollo = producción (mismo entorno)
✅ Hostinger VPS (no AWS/GCP por costos)

## Convenciones del Proyecto

### Backend (Laravel)
- **Migrations**: Usar `php artisan make:migration`
- **Models**: Constructor property promotion (PHP 8)
- **Validation**: Form Request classes (no inline)
- **Tests**: Pest v4 (no PHPUnit syntax)
- **Code Style**: Laravel Pint (`vendor/bin/pint --dirty`)
- **Eloquent**: Relationships con type hints, eager loading (evitar N+1)
- **Config**: `config()` siempre, NUNCA `env()` fuera de config/

### Frontend (React + Inertia)
- **Components**: Functional components en `resources/js/Pages`
- **Navigation**: `<Link>` o `router.visit()` (no `<a>`)
- **Forms**: Preferir `<Form>` component sobre `useForm`
- **Styling**: Tailwind v4 (gap para spacing, dark mode con `dark:`)

### Filament v4 Admin Panel
- **Arquitectura**: Filament Schemas (sistema oficial unificado de v4)
- **Package**: `filament/schemas` v4.1.10 (incluido por defecto)
- **Mejor Práctica**: Schema classes separadas (NO inline en Resource)
- **Estructura Recomendada**:
  ```
  app/Filament/Resources/NombreRecurso/
  ├── NombreRecursoResource.php    # Delega a schemas/tables
  ├── Schemas/
  │   ├── NombreRecursoForm.php    # ✅ Form schema class
  │   └── Components/              # Componentes reutilizables
  └── Tables/
      └── NombreRecursoTable.php   # ✅ Table schema class
  ```
- **Imports Comunes**:
  ```php
  use Filament\Forms\Components\{TextInput, Textarea, Select, Toggle, ...};
  use Filament\Schemas\Components\{Section, Tabs, ...};
  use Filament\Schemas\Schema;
  ```
- **IMPORTANTE**: Schema classes NO tienen clase padre (puro PHP estático)
- **Docs Oficiales**: https://filamentphp.com/docs/4.x/schemas/overview

### Estructura de Directorios (Laravel 12)
```
app/
  Console/Commands/     # Auto-registered
  Filament/            # Filament resources (cuando se instale)
  Http/
    Controllers/
    Middleware/
    Requests/          # Form validation
  Models/
  Services/            # Business logic (ej: PtolemeoAI)
bootstrap/
  app.php              # Middleware, routing, exceptions
  providers.php        # Service providers
config/                # ÚNICO lugar para env()
database/
  migrations/
  factories/
  seeders/
resources/
  js/
    Components/
    Pages/             # Inertia pages
routes/
  web.php
  api.php
tests/
  Feature/
  Unit/
  Browser/            # Pest v4 browser tests
```

## Restricciones Importantes

### ❌ NO HACER (sin aprobación explícita)
- NO cambiar dependencias composer/npm
- NO crear nuevas carpetas base en app/
- NO usar `env()` fuera de config/
- NO crear archivos .md de documentación (a menos que se pida)
- NO usar MySQL sintaxis incompatible con PostgreSQL
- NO usar inline validation en controllers
- NO usar PHPUnit syntax (usar Pest)
- NO usar emojis en código (a menos que se pida)
- NO crear verification scripts (usar tests)
- NO usar `git commit --amend` sin verificar autoría
- NO ejecutar comandos destructivos git sin confirmación
- NO confundir Filament Schemas (v4, oficial) con "forms antiguos" - es la arquitectura moderna
- NO poner formularios inline en Resources - usar Schema classes separadas

### ✅ SIEMPRE HACER
- Ejecutar `vendor/bin/pint --dirty` antes de finalizar cambios PHP
- Ejecutar tests relacionados (`php artisan test --filter=`)
- Usar `search-docs` de Laravel Boost antes de implementar features
- Seguir convenciones de archivos hermanos (sibling files)
- Usar type hints explícitos en métodos/funciones
- Crear Form Requests para validación
- Crear factories + seeders cuando creas modelos
- Usar eager loading para evitar N+1
- Usar `TodoWrite` para tareas multi-step

## Contexto de Negocio

**Producto**: Ptolemaic - Plataforma de trading journal con IA
**Copiloto IA**: "Ptolomeo" - Asistente experto en análisis financiero para tutorial futuros trading.
**Usuarios**: Traders (retail/semi-pro) que registran operaciones
**Objetivo**: Análisis inteligente de operaciones, recomendaciones, patrones

### Funcionalidades Clave (Futuras con IA)
- Análisis automático de operaciones (técnico + fundamental)
- Recomendaciones personalizadas basadas en historial
- Detección de patrones ganadores/perdedores
- Gestión de riesgo inteligente
- Memoria contextual (recuerda conversaciones)
- Multi-agentes especializados (técnico, fundamental, riesgo)

## Estado Actual de Migración

**Branch**: `main`
**Último commit**: Preparado para Filament / Inicial Filament
**Archivos sin commit**: Múltiples (refactor de pricing architecture)

**Fase actual**: FASE 2 COMPLETADA ✅
- ✅ **FASE 1**: PostgreSQL 16 migrado (Docker funcionando)
- ✅ **FASE 2**: Filament v4.1.10 instalado y configurado
- 🔄 **Refactor actual**: Arquitectura de pricing (single source of truth)
  - ✅ Migración ejecutada (11 columnas eliminadas de pricing_plans)
  - ✅ PricingController actualizado
  - ✅ Tests actualizados y pasando
  - ✅ Documentación completa en REFACTOR_PRICING_ARCHITECTURE_COMPLETED.md

**Próxima fase**: FASE 3 (Prism + Neuron AI)

## Cómo Usar Este Contexto

Cuando inicies una nueva conversación conmigo o necesites reorientarme, copia y pega esto:

```
Lee PROJECT_CONTEXT.md antes de continuar. Estamos en [FASE_ACTUAL] del plan de migración.

[TU PETICIÓN ESPECÍFICA AQUÍ]
```

## Recursos de Documentación

- **Plan completo**: [PLAN_MIGRACION_INFRAESTRUCTURA.md](./PLAN_MIGRACION_INFRAESTRUCTURA.md)
- **Resumen ejecutivo**: [RESUMEN_EJECUTIVO.md](./RESUMEN_EJECUTIVO.md)
- **Laravel Boost**: Usar `search-docs` tool
- **Convenciones**: [CLAUDE.md](./CLAUDE.md) (Laravel Boost Guidelines)

---

**Última actualización**: 2025-10-24
**Versión**: 1.2 (Agregada info oficial Filament v4 Schemas + Estado FASE 2)
