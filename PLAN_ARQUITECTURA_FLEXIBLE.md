# Plan de Arquitectura Flexible de Planes, Features y Permisos

## 📋 Contexto

Sistema 100% flexible y data-driven para gestionar planes de suscripción, características (features) y permisos en CGS Ptolemaic.

**Principio fundamental:** Todo es data, nada es código hardcodeado.

---

## 🏗️ Arquitectura

```
┌────────────────────────────────────────────────────┐
│                 PRICING_PLANS                      │
│  (Lo que el usuario compra/suscribe)               │
│  - id, slug, name_key, emoji, price, is_active     │
└─────────────┬──────────────────────────────────────┘
              │
              ├─────────────────┬─────────────────────┐
              ▼                 ▼                     ▼
     ┌────────────────┐  ┌─────────────┐    ┌────────────────┐
     │   FEATURES     │  │ Spatie ROLES│    │   Metadata     │
     │  (Catálogo)    │  │ (Permisos)  │    │ (Presentación) │
     └────────┬───────┘  └──────┬──────┘    └────────────────┘
              ▼                 ▼
       ┌──────────────┐   ┌──────────────┐
       │ plan_features│   │ model_has_   │
       │   (Pivot)    │   │    roles     │
       └──────────────┘   └──────────────┘
                               (Spatie)
```

---

## 📊 Estructura de Tablas

### 1. pricing_plans (Maestro de Planes)

```sql
- id: BIGSERIAL PRIMARY KEY
- slug: VARCHAR(100) UNIQUE NOT NULL -- 'free', 'managed', 'pro'

-- Presentación (keys para i18n)
- name_key: VARCHAR(255) -- 'plans.labels.free'
- tagline_key: VARCHAR(255) -- 'plans.taglines.free'
- description_key: VARCHAR(255)
- emoji: VARCHAR(10) -- '👁️'
- accent_color: VARCHAR(50) -- 'cyan'
- icon_url: VARCHAR(255)

-- Precios
- price_monthly: DECIMAL(10,2) DEFAULT 0
- price_yearly: DECIMAL(10,2) DEFAULT 0
- currency: VARCHAR(3) DEFAULT 'USD'

-- Ofertas
- offer_active: BOOLEAN DEFAULT false
- offer_name: VARCHAR(255)
- offer_description_key: VARCHAR(255)
- offer_price_monthly: DECIMAL(10,2)
- offer_price_yearly: DECIMAL(10,2)
- offer_starts_at: TIMESTAMP
- offer_ends_at: TIMESTAMP

-- Escasez
- scarcity_active: BOOLEAN DEFAULT false
- scarcity_message_key: VARCHAR(255)
- scarcity_limit: INTEGER
- scarcity_sold: INTEGER DEFAULT 0

-- Visibilidad
- is_active: BOOLEAN DEFAULT true
- is_public: BOOLEAN DEFAULT true
- is_featured: BOOLEAN DEFAULT false
- display_order: INTEGER DEFAULT 0

-- Spatie Role
- role_id: BIGINT REFERENCES roles(id) ON DELETE SET NULL

-- Timestamps
- created_at, updated_at
```

**Índices:**
- `idx_pricing_plans_slug` ON (slug)
- `idx_pricing_plans_active_public` ON (is_active, is_public)

---

### 2. features (Catálogo de Características)

```sql
- id: BIGSERIAL PRIMARY KEY
- key: VARCHAR(100) UNIQUE NOT NULL -- 'ai_analytics', 'daily_limit'

-- Presentación
- name_key: VARCHAR(255) -- 'features.labels.ai_analytics'
- description_key: VARCHAR(255)
- category: VARCHAR(50) -- 'analytics', 'limits', 'integrations'

-- Tipo de valor
- value_type: VARCHAR(20) NOT NULL -- 'boolean', 'integer', 'string', 'json'
- default_value: TEXT

-- Metadata
- is_visible: BOOLEAN DEFAULT true
- display_order: INTEGER DEFAULT 0
- icon: VARCHAR(255)

-- Timestamps
- created_at, updated_at
```

**Índices:**
- `idx_features_key` ON (key)
- `idx_features_category` ON (category)

---

### 3. plan_features (Pivot: Features por Plan)

```sql
- id: BIGSERIAL PRIMARY KEY
- plan_id: BIGINT NOT NULL REFERENCES pricing_plans(id) ON DELETE CASCADE
- feature_id: BIGINT NOT NULL REFERENCES features(id) ON DELETE CASCADE

- is_enabled: BOOLEAN DEFAULT true

-- Valores específicos por tipo
- limit_value: INTEGER -- Para value_type = 'integer'
- string_value: TEXT -- Para value_type = 'string'
- json_value: JSONB -- Para value_type = 'json'

-- Configuración específica
- config: JSONB -- Ej: {"soft_limit": true, "warning_threshold": 0.8}

-- Timestamps
- created_at, updated_at

UNIQUE(plan_id, feature_id)
```

**Índices:**
- `idx_plan_features_plan` ON (plan_id)
- `idx_plan_features_feature` ON (feature_id)
- `idx_plan_features_enabled` ON (is_enabled)

---

### 4. Spatie (Ya existe, NO modificar)

Tablas existentes:
- `roles`
- `permissions`
- `role_has_permissions`
- `model_has_roles`
- `model_has_permissions`

---

## 🔧 Modelos Eloquent

### PricingPlan Model

**Relaciones:**
- `belongsTo(Role::class)` - Spatie role
- `belongsToMany(Feature::class, 'plan_features')` con pivot

**Métodos principales:**
- `name()`: string - Traduce name_key
- `tagline()`: string - Traduce tagline_key
- `description()`: string - Traduce description_key
- `hasFeature(string $key)`: bool - Con caché 6h
- `getFeatureLimit(string $key)`: ?int - Con caché 6h
- `getFeatureValue(string $key, string $type)`: mixed - Con caché 6h
- `permissions()`: array - Delegado a Spatie, con caché 6h
- `currentMonthlyPrice()`: float - Considera ofertas activas
- `currentYearlyPrice()`: float - Considera ofertas activas
- `isOfferValid()`: bool - Valida fechas de oferta

**Scopes:**
- `active()` - WHERE is_active = true
- `public()` - WHERE is_public = true
- `ordered()` - ORDER BY display_order, id

**Casts:**
- Todos los precios: decimal:2
- Fechas de oferta: datetime
- Booleanos: boolean

---

### Feature Model

**Relaciones:**
- `belongsToMany(PricingPlan::class, 'plan_features')` con pivot

**Métodos:**
- `name()`: string - Traduce name_key
- `description()`: string - Traduce description_key

**Scopes:**
- `visible()` - WHERE is_visible = true
- `byCategory(string $cat)` - WHERE category = $cat

---

### User Model - Trait HasPlanFeatures

**Métodos:**
- `currentPlan()`: ?PricingPlan - Con caché 30min
- `hasFeature(string $key)`: bool
- `getFeatureLimit(string $key)`: ?int
- `canUseFeature(string $key, ?int $required)`: bool
- `syncPlanRole()`: void - Sincroniza role Spatie cuando cambia plan

---

## 🎨 Gates y Middleware

### Gates (AuthServiceProvider)

```php
// Verificar si user tiene feature
Gate::define('feature', function (User $user, string $featureKey) {
    return $user->hasFeature($featureKey);
});

// Verificar límite de feature
Gate::define('feature.limit', function (User $user, string $featureKey, int $currentUsage) {
    $limit = $user->getFeatureLimit($featureKey);
    return $limit === null || $currentUsage < $limit;
});
```

### Middleware RequiresFeature

Protege rutas que requieren features específicas:

```php
Route::get('/analytics', AnalyticsController::class)
    ->middleware(['auth', 'feature:ai_analytics']);
```

---

## 📦 Seeders

### FeatureSeeder

Características base:
- `ai_analytics` (boolean) - Análisis con IA
- `daily_analysis_limit` (integer) - Límite diario
- `monthly_analysis_limit` (integer) - Límite mensual
- `own_api_keys` (boolean) - BYOK
- `managed_api_keys` (boolean) - Keys administradas
- `priority_support` (boolean) - Soporte prioritario
- `custom_integrations` (boolean) - Integraciones personalizadas
- `team_members` (integer) - Límite de miembros
- `export_journal` (boolean) - Exportar journal

### PricingPlanSeeder

7 Planes base:

**1. Free (Observador) 👁️**
- Role: plan:free
- Price: $0
- Features: export_journal (enabled), otros disabled

**2. Managed (Cosmógrafo) 🧭**
- Role: plan:managed
- Price: $49/mes
- Features: ai_analytics, managed_api_keys, daily_limit=50, monthly_limit=1000

**3. Pro (Astrónomo) 🔭**
- Role: plan:pro
- Price: $99/mes
- Features: ai_analytics, own_api_keys, unlimited limits, priority_support

**4. Enterprise (Heliópolis) ☀️**
- Role: plan:enterprise
- Price: custom
- Features: Todas + custom_integrations

**5. Staff 🛡️**
- Role: plan:staff (con permisos admin)
- Price: $0
- Features: Pro + manage feedback

**6. Beta Testing 🧪**
- Role: plan:beta_testing
- Price: $0
- Features: Todas

**7. Internal (Administrador) 👑**
- Role: plan:internal (super admin)
- Price: $0
- Features: Todas unlimited

---

## 🎨 Filament Resources

### PricingPlanResource

**Tabs:**
1. **Información del Plan**
   - Section: Tipo de Plan (slug, name_key, emoji, color)
   - Section: Precios (monthly, yearly, currency)
   - Section: Visibilidad (is_active, is_public, is_featured, display_order)

2. **Features**
   - Repeater con todas las features disponibles
   - Toggle is_enabled
   - Inputs condicionales según value_type

3. **Permisos**
   - Select de Spatie Role
   - Vista de permisos del role seleccionado

4. **Ofertas**
   - Toggle offer_active (reactive)
   - Campos de oferta (condicionales)
   - Validación de fechas

5. **Escasez**
   - Toggle scarcity_active (reactive)
   - Campos de escasez (condicionales)

**Table:**
- Badge con emoji + nombre
- Precio actual (considera ofertas)
- Status activo/público
- Filtros por estado

---

### FeatureResource

**Form:**
- Section: Información (key, name_key, description_key, category)
- Section: Tipo de Valor (value_type, default_value)
- Section: Presentación (is_visible, display_order, icon)

**Table:**
- Badge por categoría
- Badge por value_type
- Planes que tienen esta feature

---

## 🚀 Controladores Públicos

### PricingController

```php
public function index()
{
    $plans = PricingPlan::query()
        ->active()
        ->public()
        ->ordered()
        ->with(['features' => fn($q) => $q->where('is_visible', true)])
        ->get()
        ->map(function ($plan) {
            return [
                'slug' => $plan->slug,
                'name' => $plan->name(),
                'tagline' => $plan->tagline(),
                'emoji' => $plan->emoji,
                'color' => $plan->accent_color,
                'price_monthly' => $plan->currentMonthlyPrice(),
                'price_yearly' => $plan->currentYearlyPrice(),
                'is_featured' => $plan->is_featured,
                'features' => $plan->features->map(fn($f) => [
                    'name' => $f->name(),
                    'included' => $f->pivot->is_enabled,
                    'limit' => $f->pivot->limit_value,
                ]),
                'cta' => __('plans.cta.change_plan'),
            ];
        });

    return Inertia::render('Pricing/Index', compact('plans'));
}
```

---

## ✅ Orden de Implementación

1. ✅ **Crear archivo de documentación** (este archivo)
2. ✅ **Crear migraciones** (features, plan_features, modificar pricing_plans)
3. ✅ **Crear/actualizar modelos** (PricingPlan, Feature, User trait)
4. ✅ **Crear seeders** (FeatureSeeder, PricingPlanSeeder actualizado)
5. ✅ **Implementar caché** (en métodos de modelos)
6. ✅ **Actualizar controladores** (PricingController, Admin/PricingController)
7. ✅ **Actualizar Filament Tables** (PricingPlansTable, UsersTable)
8. ✅ **Actualizar Filament Forms** (PricingPlanForm base, UserForm)
9. ⏳ **Crear FeatureResource** (nuevo)
10. ⏳ **Añadir gestión de Features en PricingPlanResource** (pestaña Features)
11. ⏳ **Crear Gates** (AuthServiceProvider)
12. ⏳ **Crear Middleware** (RequiresFeature)
13. ⏳ **Tests** (feature access, limits, permissions)
14. ⏳ **Actualizar frontend de Pricing** (React/Inertia)

---

## 🔍 Uso en el Código

### Verificar Feature

```php
// En controlador
if (!auth()->user()->hasFeature('ai_analytics')) {
    abort(403, 'Upgrade required');
}

// En Blade
@can('feature', 'ai_analytics')
    <button>Analyze</button>
@endcan

// En rutas
Route::get('/analytics')->middleware('feature:ai_analytics');
```

### Verificar Límites

```php
$user = auth()->user();
$limit = $user->getFeatureLimit('daily_analysis_limit');

if ($limit !== null && $user->today_usage >= $limit) {
    return response()->json(['error' => 'Daily limit reached'], 429);
}

// Con Gate
if (Gate::denies('feature.limit', ['daily_analysis_limit', $user->today_usage])) {
    abort(429, 'Daily limit reached');
}
```

### Sincronizar Role al Cambiar Plan

```php
// Cuando usuario cambia de plan
$user->plan = 'pro';
$user->save();
$user->syncPlanRole(); // Asigna role 'plan:pro' de Spatie
```

---

## 🎯 Ventajas de Esta Arquitectura

1. ✅ **100% Flexible** - Crear/modificar planes sin deploy
2. ✅ **Spatie Integrado** - Usa roles tradicionales (Plan → Rol → Permisos)
3. ✅ **Separación Clara** - Features ≠ Permisos
4. ✅ **Caché Estratégico** - 6h para features, 30min para plan actual
5. ✅ **Multiidioma Nativo** - Keys apuntan a lang/
6. ✅ **Escalable** - Agregar add-ons, créditos, teams
7. ✅ **A/B Testing** - Duplicar planes con features diferentes
8. ✅ **Gates Limpios** - `@can('feature', 'x')`
9. ✅ **Auditable** - Histórico en pivot tables

---

## 📝 Notas Importantes

- **Caché**: Limpiar caché al modificar planes: `Cache::tags(['plans'])->flush()`
- **Spatie**: Roles de planes tienen prefijo `plan:` (ej: `plan:pro`)
- **value_type**: `null` en limit_value = ilimitado
- **config JSONB**: Solo para configuraciones específicas, no cajón de sastre
- **Traducciones**: NUNCA en BD, siempre en `lang/{locale}/`
- **Enum eliminado**: Ya no existe `PlanType` rígido

---

## 🔄 Migración desde Sistema Anterior

Si existe data previa:

1. Crear features desde constantes hardcodeadas
2. Crear pricing_plans desde enum PlanType
3. Migrar lógica de permisos a Spatie roles
4. Popular plan_features desde lógica existente
5. Actualizar columna users.plan si es necesario
6. Tests de regresión

---

---

## 📝 Cambios Realizados en Implementación

### ✅ Fase 1: Migraciones y Modelos (Completada)

**Migraciones creadas:**
- `2025_10_23_063346_create_features_table.php` - Tabla de features
- `2025_10_23_063347_create_plan_features_table.php` - Pivot plan-features
- `2025_10_23_063348_update_pricing_plans_table_add_flexible_fields.php` - Actualización de pricing_plans

**Cambios en pricing_plans:**
- `plan_type` → `slug` (renombrado)
- Añadidos: `name_key`, `tagline_key`, `description_key`, `emoji`, `accent_color`, `icon_url`
- Añadidos: `is_public`, `is_featured`, `display_order`
- Añadido: `role_id` (FK a Spatie roles)

**Modelos actualizados:**
- `PricingPlan` - Completamente reescrito con métodos de caché y traducción
- `Feature` - Nuevo modelo con relaciones
- `User` - Añadido trait `HasPlanFeatures` con métodos de features

**Seeders ejecutados:**
- `FeatureSeeder` - 15 features en 8 categorías
- `PricingPlanSeeder` - 7 planes con roles Spatie y features asignadas

---

### ✅ Fase 2: Controladores y Filament (Completada)

**Controladores actualizados:**

1. **App\Http\Controllers\PricingController** (API pública)
   - Usa `slug` en lugar de `plan_type`
   - Retorna solo planes públicos con `->public()`
   - Ordena por `display_order`
   - Incluye: `name()`, `tagline()`, `description()`, `emoji`, `accent_color`
   - Métodos corregidos: `isOfferValid()`, `scarcityMessage()`

2. **App\Http\Controllers\Admin\PricingController** (Inertia admin)
   - Actualizado para usar nueva estructura
   - Incluye campos de visibilidad (`is_public`, `is_featured`)

**Filament Resources actualizadas:**

1. **PricingPlansTable.php**
   - Columna `slug` con formato emoji + nombre traducido
   - Filtros dinámicos desde base de datos
   - Columnas: `is_public`, `is_featured`, `display_order`, `features_count`
   - Sort por defecto: `display_order`

2. **PricingPlanForm.php**
   - Section "Información Básica" con campos flexibles
   - Campos: `slug` (disabled después de crear), `name_key`, `tagline_key`, `description_key`
   - Select de `accent_color` con opciones predefinidas
   - Toggles de visibilidad: `is_active`, `is_public`, `is_featured`
   - `display_order` para ordenamiento

3. **UsersTable.php**
   - Filtro de planes usa base de datos dinámicamente
   - Muestra emoji + nombre traducido

4. **UserForm.php**
   - Select de planes usa base de datos
   - Muestra emoji + nombre traducido
   - Ordenado por `display_order`

**Archivos de traducción:**
- `lang/es/features.php` - Nombres y descripciones de features
- `lang/es/plans.php` - Nombres, taglines y descripciones de planes (ya existente)

---

### ⏳ Fase 3: FeatureResource y Gestión (En progreso)

**Pendiente:**
- Crear `FeatureResource` completo en Filament
- Añadir pestaña "Features" en PricingPlanResource
- Permitir asignar/desasignar features desde admin
- Configurar límites y valores por feature

---

### ✅ Fase 4: Seguridad y Testing (Completada)

**Gates implementados en AuthServiceProvider:**
- `feature` - Gate genérico para verificar cualquier feature
- `feature.limit` - Gate para verificar límites con uso actual
- `feature.can-use` - Gate para verificar feature con requerimiento opcional
- 12+ Gates específicos de conveniencia (use-ai-analytics, export-journal, etc.)
- Gates de verificación de plan (is-paid-plan, is-free-plan, has-active-trial)
- Gate combinado (manage-feedback con feature + permission)

**Middleware RequiresFeature:**
- Protección de rutas por feature key
- Soporte para verificación de límites opcionales
- Respuestas diferenciadas para API (JSON) y Web (redirect)
- Mensajes personalizados por feature
- Sugerencias de plan recomendado por feature

**Tests Completados (18 tests, 30 assertions):**
- Tests de Gates genéricos (feature, feature.limit, feature.can-use)
- Tests de Gates específicos (use-ai-analytics, export-journal, etc.)
- Tests de Gates de plan (is-paid-plan, is-free-plan)
- Tests de Middleware (bloqueo, JSON responses, límites, autenticación)

**Actualizaciones adicionales:**
- Eliminado enum `PlanType` del modelo User y UserObserver
- Campo `plan` ahora es string en lugar de Enum
- Actualizado UserObserver para lógica basada en strings
- Compatibilidad total con sistema flexible

---

**Fecha de creación:** 2025-01-23
**Última actualización:** 2025-01-23
**Versión:** 1.2
**Estado:** ✅ ARQUITECTURA FLEXIBLE 100% COMPLETADA Y FUNCIONAL
