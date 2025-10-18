# useAuth Hook - Guía de Uso

El hook `useAuth()` proporciona acceso sencillo a toda la información de autenticación y autorización del usuario actual.

## Importación

```tsx
import { useAuth } from '@/hooks/useAuth'
```

## Ejemplos de Uso

### 1. Verificar acceso a una funcionalidad

```tsx
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'

export function AnalyticsButton() {
    const { can } = useAuth()

    if (!can('canUseAdvancedAnalytics')) {
        return (
            <Button variant="outline" disabled>
                Analíticas Pro
                <Lock className="ml-2 h-4 w-4" />
            </Button>
        )
    }

    return (
        <Button onClick={handleOpenAnalytics}>
            Analíticas Avanzadas
        </Button>
    )
}
```

### 2. Renderizado condicional complejo

```tsx
export function DashboardPage() {
    const { can, canAny, plan, isOnTrial } = useAuth()

    return (
        <div>
            {/* Mostrar si tiene analytics O automation */}
            {canAny(['canUseAdvancedAnalytics', 'canUseAdvancedAutomation']) && (
                <PremiumSection />
            )}

            {/* Mostrar solo para usuarios en trial */}
            {isOnTrial() && (
                <TrialBanner daysLeft={calculateDays(plan?.trialEndsAt)} />
            )}

            {/* Mostrar para usuarios con plan pagado */}
            {can('isPaidPlan') && (
                <PremiumBadge />
            )}
        </div>
    )
}
```

### 3. Verificar múltiples gates

```tsx
export function IntegrationsPage() {
    const { can, canAll } = useAuth()

    // Usuario necesita ambos permisos
    if (!canAll(['canAccessIntegrations', 'canManageOwnApiKeys'])) {
        return <UpgradePrompt plan="pro" />
    }

    return <IntegrationsManager />
}
```

### 4. Acceso a datos del usuario

```tsx
export function UserProfile() {
    const { user, roles, plan, hasRole } = useAuth()

    return (
        <div>
            <h1>Hola, {user?.name}</h1>
            <p>Plan: {plan?.label}</p>
            <p>Email: {user?.email}</p>

            {hasRole('Admin') && (
                <AdminPanel />
            )}

            {plan?.emoji} {plan?.tagline}
        </div>
    )
}
```

### 5. Verificar roles y permisos

```tsx
export function AdminTools() {
    const { hasRole, hasPermission, hasAnyRole } = useAuth()

    return (
        <div>
            {hasRole('Admin') && (
                <Button>Panel de Admin</Button>
            )}

            {hasPermission('users.manage') && (
                <Button>Gestionar Usuarios</Button>
            )}

            {hasAnyRole(['Admin', 'Manager']) && (
                <Button>Reportes</Button>
            )}
        </div>
    )
}
```

### 6. Estado de autenticación

```tsx
export function Header() {
    const { isAuthenticated, isGuest, user } = useAuth()

    if (isGuest()) {
        return (
            <nav>
                <Link href="/login">Iniciar Sesión</Link>
                <Link href="/register">Registrarse</Link>
            </nav>
        )
    }

    return (
        <nav>
            <span>Hola, {user?.name}</span>
            <UserMenu />
        </nav>
    )
}
```

### 7. Verificación de plan específico

```tsx
export function ExportSection() {
    const { can, hasPlan, plan } = useAuth()

    if (hasPlan('free')) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Exportación Premium</CardTitle>
                    <CardDescription>
                        Actualiza a Pro para exportar en PDF y CSV
                    </CardDescription>
                </CardHeader>
                <CardFooter>
                    <Button asChild>
                        <Link href="/settings/plan">Ver Planes</Link>
                    </Button>
                </CardFooter>
            </Card>
        )
    }

    return (
        <div className="space-y-4">
            {can('canUseAdvancedAutomation') && (
                <>
                    <Button onClick={exportPDF}>Exportar PDF</Button>
                    <Button onClick={exportCSV}>Exportar CSV</Button>
                </>
            )}
        </div>
    )
}
```

### 8. Combinación con otros hooks

```tsx
import { useAuth } from '@/hooks/useAuth'
import { useTrans } from '@/hooks/useTrans'
import { router } from '@inertiajs/react'

export function FeatureLockedButton() {
    const { can, plan } = useAuth()
    const t = useTrans()

    const handleClick = () => {
        if (!can('canUseAdvancedAnalytics')) {
            router.visit('/settings/plan')
            return
        }

        // Usuario tiene acceso
        openAnalytics()
    }

    return (
        <Button onClick={handleClick}>
            {t('View Analytics')}
            {!can('canUseAdvancedAnalytics') && (
                <Lock className="ml-2 h-4 w-4" />
            )}
        </Button>
    )
}
```

### 9. Admin y Super Admin

```tsx
export function AdminDashboard() {
    const { isAdmin, isSuperAdmin, can } = useAuth()

    if (!isAdmin()) {
        return <AccessDenied />
    }

    return (
        <div>
            <h1>Panel de Administración</h1>

            {/* Solo Super Admin puede ver esto */}
            {isSuperAdmin() && (
                <SystemSettings />
            )}

            {/* Admin con acceso a features admin */}
            {can('canAccessAdminFeatures') && (
                <AdminTools />
            )}
        </div>
    )
}
```

### 10. Feedback y debugging

```tsx
export function DebugPanel() {
    const auth = useAuth()

    // En desarrollo, puedes inspeccionar todo
    console.log('Auth:', {
        user: auth.user,
        plan: auth.plan,
        roles: auth.roles,
        permissions: auth.permissions,
        gates: auth.gates,
    })

    return (
        <div className="rounded border bg-muted p-4">
            <h3>Debug Info</h3>
            <pre>{JSON.stringify(auth.gates, null, 2)}</pre>
        </div>
    )
}
```

## API Completa

### Datos del usuario
- `user` - Objeto User actual o null
- `roles` - Array de nombres de roles
- `permissions` - Array de nombres de permisos
- `plan` - Objeto PlanSummary o null
- `gates` - Objeto AuthGates o null
- `hasPassword` - Boolean

### Verificación de Gates (features)
- `can(gate)` - Verifica un gate específico
- `cannot(gate)` - Negación de can()
- `canAny([gates])` - Al menos uno debe ser true
- `canAll([gates])` - Todos deben ser true

### Verificación de Roles
- `hasRole(role)` - Tiene el rol específico
- `hasAnyRole([roles])` - Tiene al menos uno
- `hasAllRoles([roles])` - Tiene todos
- `isAdmin()` - Es Admin
- `isSuperAdmin()` - Es Super Admin

### Verificación de Permisos
- `hasPermission(permission)` - Tiene el permiso
- `hasAnyPermission([permissions])` - Tiene al menos uno
- `hasAllPermissions([permissions])` - Tiene todos

### Estado de Autenticación
- `isAuthenticated()` - Usuario autenticado
- `isGuest()` - Usuario no autenticado
- `isPaidUser()` - Tiene plan pagado
- `isOnTrial()` - Está en período de prueba
- `hasPlan(planType)` - Tiene plan específico

## Gates Disponibles

### Plan-based features
- `canAccessIntegrations` - Acceso a integraciones (Managed+)
- `canManageOwnApiKeys` - Gestionar propias API keys (Pro+)
- `canUseManagedKeys` - Usar keys gestionadas (Managed con trial activo)

### AI Features
- `canUseAiAnalysis` - Análisis con IA (Managed+)
- `canUseAdvancedAutomation` - Automatización avanzada (Pro+)
- `canUseAdvancedAnalytics` - Analíticas avanzadas (Pro+)

### Plan checks
- `isPaidPlan` - Usuario tiene plan pagado
- `hasActiveTrial` - Trial activo
- `withinDailyLimit` - Dentro del límite diario

### Combined checks
- `canAccessAdminFeatures` - Acceso a admin (permiso + trial no expirado)
- `canManageFeedback` - Gestionar feedback (permiso + plan pagado, o Staff/Internal)

## TypeScript

El hook está completamente tipado. Tu IDE te dará autocompletado:

```tsx
const { can } = useAuth()

// ✅ TypeScript conoce estos gates
can('canUseAdvancedAnalytics')
can('isPaidPlan')

// ❌ TypeScript te advertirá si escribes mal
can('canUseAnalitic') // Error: Argument of type '"canUseAnalitic"' is not assignable...
```

## Mejores Prácticas

1. **Usa `can()` en el frontend para UX**, pero SIEMPRE verifica en el backend
2. **No confíes solo en el frontend** - Los gates se calculan en el servidor pero el usuario puede manipular JavaScript
3. **Backend siempre es la fuente de verdad** - Usa middleware `feature:` en rutas y `$this->authorize()` en controladores
4. **Muestra UI apropiada** - Si no tienen acceso, muestra un botón de upgrade en lugar de ocultar todo
5. **Combina con permisos y roles** cuando sea necesario para lógica compleja

## Performance

Los gates se calculan UNA VEZ en el servidor cuando se carga la página y se comparten vía Inertia. No hay llamadas adicionales al servidor para cada verificación `can()`.

## Debugging

Si un gate no funciona como esperas:

1. Verifica que el Gate esté definido en `AuthServiceProvider.php`
2. Verifica que esté incluido en `HandleInertiaRequests::getComputedGates()`
3. Verifica que esté en el tipo `AuthGates` en `types/index.d.ts`
4. Inspecciona `auth.gates` en React DevTools
5. Ejecuta los tests: `php artisan test --filter=GateAuthorizationTest`
