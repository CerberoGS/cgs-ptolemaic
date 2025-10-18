# RequiresFeature Middleware - Guía de Uso

## Descripción
El middleware `feature` permite proteger rutas basándose en las características (features) del plan del usuario. Utiliza Laravel Gates para verificar el acceso.

## Sintaxis Básica

```php
Route::middleware(['auth', 'feature:gate-name'])->group(function () {
    // Rutas protegidas
});
```

## Gates Disponibles

### Plan-Based Features (Características del Plan)

| Gate | Descripción | Planes con Acceso |
|------|-------------|-------------------|
| `access-integrations` | Acceso a integraciones de proveedores | Managed, Pro, Enterprise, Staff, Internal |
| `manage-own-api-keys` | Gestionar sus propias API keys | Pro, Enterprise, Staff, Internal |
| `use-managed-keys` | Usar keys gestionadas (con trial activo) | Managed (con trial activo) |
| `use-ai-analysis` | Usar análisis con IA | Managed, Pro, Enterprise, Staff, Internal |
| `use-advanced-automation` | Automatización avanzada | Pro, Enterprise, Staff, Internal |
| `use-advanced-analytics` | Analíticas avanzadas | Pro, Enterprise, Staff, Internal |
| `is-paid-plan` | Usuario tiene plan pagado | Managed, Pro, Enterprise, Staff, Internal |
| `has-active-trial` | Usuario tiene trial activo | Cualquiera con trial_ends_at futuro |
| `within-daily-limit` | Dentro del límite diario de uso | Managed, Staff (TODO: implementar tracking) |

### Combined Features (Plan + Permission)

| Gate | Descripción | Requisitos |
|------|-------------|-----------|
| `access-admin-features` | Acceso a funciones admin | Permiso `admin.dashboard` + trial no expirado |
| `manage-feedback` | Gestionar feedback | Permiso `feedback.manage` + plan pagado, O plan Staff/Internal |

## Ejemplos de Uso

### 1. Proteger un Grupo de Rutas

```php
// Analytics avanzadas solo para planes Pro+
Route::middleware(['auth', 'feature:use-advanced-analytics'])->group(function () {
    Route::get('/analytics/advanced', [AdvancedAnalyticsController::class, 'index'])->name('analytics.advanced');
    Route::get('/analytics/reports', [AdvancedAnalyticsController::class, 'reports'])->name('analytics.reports');
});
```

### 2. Múltiples Middleware en una Ruta

```php
// Requiere autenticación, verificación de email Y plan con integraciones
Route::middleware(['auth', 'verified', 'feature:access-integrations'])->group(function () {
    Route::get('/integrations', [IntegrationsController::class, 'index'])->name('integrations.index');
});
```

### 3. Diferentes Features para Diferentes Rutas

```php
Route::middleware(['auth', 'verified'])->group(function () {
    // Ver integraciones - Managed+
    Route::get('/integrations', [IntegrationsController::class, 'index'])
        ->middleware('feature:access-integrations')
        ->name('integrations.index');

    // Gestionar propias keys - Pro+
    Route::resource('/integrations/keys', KeysController::class)
        ->middleware('feature:manage-own-api-keys');
});
```

### 4. Rutas API

```php
Route::prefix('api')->middleware(['auth:sanctum', 'feature:access-integrations'])->group(function () {
    Route::get('/providers', [ApiProviderController::class, 'index']);
    Route::get('/providers/{provider}', [ApiProviderController::class, 'show']);
});
```

## Comportamiento del Middleware

### Para Usuarios No Autenticados
- **Con ruta de login**: Redirige a login con mensaje de error
- **Sin ruta de login**: Retorna 401 con mensaje

### Para Usuarios Sin Acceso (Plan Insuficiente)

#### Peticiones Web (HTML)
Redirige a la página de planes (`settings.plan.show`) con un **banner promocional atractivo** que incluye:
- 🎨 Diseño visual con gradiente amber/naranja
- ✨ Icono y nombre de la funcionalidad
- 📋 Mensaje de marketing personalizado por feature
- 🎯 Badge mostrando el plan requerido
- 🔘 Botón para ir directo al plan sugerido con efecto de highlight
- 📊 Botón para comparar planes

**Datos pasados al frontend:**
```php
'upgrade_prompt' => [
    'message' => 'Exporta tus datos en PDF y CSV para análisis profundos.',
    'feature' => 'Automatización Avanzada',
    'required_gate' => 'use-advanced-automation',
    'current_plan' => 'free',
    'suggested_plan' => 'pro'
]
```

**Ventajas para SEO y Marketing:**
- ❌ NO muestra error 403 (malo para UX y conversión)
- ✅ Experiencia positiva que invita a hacer upgrade
- ✅ Mensajes personalizados por funcionalidad
- ✅ Call-to-action claros
- ✅ Smooth scroll con highlight al plan correcto

#### Peticiones API (JSON)
Retorna 403 con respuesta JSON:
```json
{
    "message": "Tu plan actual no incluye esta funcionalidad.",
    "upgrade_required": true,
    "current_plan": "free",
    "gate_required": "use-advanced-automation",
    "suggested_plan": "pro"
}
```

## Rutas Recomendadas para Proteger

### Analytics Avanzadas (Pro+)
```php
Route::middleware(['auth', 'verified', 'feature:use-advanced-analytics'])->group(function () {
    Route::get('/analytics', [AnalyticsDashboardController::class, 'index'])->name('analytics.index');
});
```

### Exportaciones (Pro+)
```php
Route::middleware(['auth', 'verified', 'feature:use-advanced-automation'])->group(function () {
    Route::get('/journal/export/csv', [JournalEntryController::class, 'exportCsv'])->name('journal.export.csv');
    Route::get('/journal/export/pdf', [JournalEntryController::class, 'exportPdf'])->name('journal.export.pdf');
});
```

### Achievements/Gamificación (Managed+)
```php
Route::middleware(['auth', 'verified', 'feature:is-paid-plan'])->group(function () {
    Route::get('/achievements', [AchievementController::class, 'index'])->name('achievements.index');
});
```

## Manejo en Frontend

### React/Inertia
Puedes compartir el estado de los gates desde el backend:

```php
// En HandleInertiaRequests.php
public function share(Request $request): array
{
    return array_merge(parent::share($request), [
        'auth' => [
            'user' => $request->user(),
            'can' => $request->user() ? [
                'access_integrations' => Gate::allows('access-integrations'),
                'manage_keys' => Gate::allows('manage-own-api-keys'),
                'advanced_analytics' => Gate::allows('use-advanced-analytics'),
                'advanced_automation' => Gate::allows('use-advanced-automation'),
            ] : [],
        ],
    ]);
}
```

### En Componentes React
```typescript
import { usePage } from '@inertiajs/react'

export function AnalyticsButton() {
  const { auth } = usePage().props

  if (!auth.can?.advanced_analytics) {
    return (
      <Link href="/settings/plan" className="btn-upgrade">
        Actualiza para acceder a Analytics Avanzadas
      </Link>
    )
  }

  return (
    <Link href="/analytics" className="btn-primary">
      Ver Analytics
    </Link>
  )
}
```

## Testing

### Test de Middleware
```php
use App\Enums\PlanType;
use App\Models\User;

test('free plan users cannot access analytics', function () {
    $user = User::factory()->create(['plan' => PlanType::Free]);

    $response = $this->actingAs($user)->get('/analytics');

    $response->assertRedirect(route('settings.plan', ['locale' => 'es']));
    $response->assertSessionHas('error');
});

test('pro plan users can access analytics', function () {
    $user = User::factory()->create(['plan' => PlanType::Pro]);

    $response = $this->actingAs($user)->get('/analytics');

    $response->assertOk();
});
```

## Mensajes de Error Personalizados

Si necesitas mensajes personalizados, puedes usar Gates directamente en el controlador:

```php
public function index()
{
    if (!Gate::allows('use-advanced-analytics')) {
        return redirect()
            ->route('settings.plan', ['locale' => app()->getLocale()])
            ->with('error', __('Las analíticas avanzadas están disponibles en el plan Pro.'))
            ->with('suggested_plan', 'pro');
    }

    // Lógica del controlador...
}
```

## Próximos Pasos (FASE 3)

- Crear helpers globales: `@canFeature('gate-name')`
- Directivas Blade: `@feature('gate-name')...@endfeature`
- Componente React: `<RequiresFeature gate="manage-own-api-keys">`
