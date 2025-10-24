# 📊 INFORME: Lógica del Sistema de Planes y Roles

**Fecha**: 2025-10-24
**Solicitud**: Explicación de la arquitectura de planes y roles
**Solicitante**: Administrador del Sistema

---

## 🎯 RESUMEN EJECUTIVO

El sistema actual implementa una **arquitectura dual** de roles que combina:
1. **Roles Funcionales** (User, Manager, Admin) - Para permisos de aplicación
2. **Roles de Plan** (plan:free, plan:pro, etc.) - Para features según pricing

Esta arquitectura permite **separación de concerns** pero genera **complejidad** y actualmente está **desconectada** (los roles de plan no tienen usuarios asignados).

---

## 🏗️ ARQUITECTURA ACTUAL

### 1. Sistema de Pricing Plans

```
┌─────────────────────────────────────────────────────────┐
│                 PRICING PLANS (7 planes)                │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  PÚBLICOS (Para clientes pagos)                        │
│  ├─ 1. free         (Observador)     - 4 features      │
│  ├─ 2. managed      (Cosmógrafo)     - 8 features ⭐    │
│  ├─ 3. pro          (Astrónomo)      - 11 features     │
│  └─ 4. enterprise   (Heliópolis)     - 12 features     │
│                                                         │
│  INTERNOS (Para equipo/testing)                        │
│  ├─ 5. staff        (Staff)          - 11 features     │
│  ├─ 6. beta_testing (Beta Tester)    - 12 features     │
│  └─ 7. internal     (Administrador)  - 12 features     │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

### 2. Sistema de Roles (Spatie Permissions)

```
┌─────────────────────────────────────────────────────────┐
│                   ROLES (10 roles)                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  FUNCIONALES (Permisos de aplicación)                  │
│  ├─ User     → 1 permiso   (dashboard.view)            │
│  ├─ Manager  → 2 permisos  (dashboard, feedback)       │
│  └─ Admin    → 14 permisos (TODOS)                     │
│                                                         │
│  DE PLAN (Features por plan de pricing)                │
│  ├─ plan:free                                           │
│  ├─ plan:managed                                        │
│  ├─ plan:pro                                            │
│  ├─ plan:enterprise                                     │
│  ├─ plan:staff                                          │
│  ├─ plan:beta_testing                                   │
│  └─ plan:internal                                       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## 🤔 LÓGICA Y PROPÓSITO DE CADA TIPO DE PLAN

### Planes PÚBLICOS (1-4)

#### 1️⃣ FREE (Observador)
- **Propósito**: Plan gratuito de entrada
- **Features**: 4 básicas
- **Límites**: Funcionalidad mínima para probar
- **Usuario tipo**: Nuevo usuario, explorador
- **Monetización**: Freemium (conversión a paid)

#### 2️⃣ MANAGED (Cosmógrafo) ⭐
- **Propósito**: Plan principal de pago
- **Features**: 8 features
- **Destacado**: ✅ SÍ (es el plan recomendado)
- **Usuario tipo**: Trader intermedio
- **Características**: Claves API gestionadas por la plataforma
- **Monetización**: Ingreso recurrente principal

#### 3️⃣ PRO (Astrónomo)
- **Propósito**: Plan avanzado para traders serios
- **Features**: 11 features
- **Usuario tipo**: Trader profesional
- **Características**: Gestión propia de API keys
- **Monetización**: Tier premium

#### 4️⃣ ENTERPRISE (Heliópolis)
- **Propósito**: Plan corporativo/institucional
- **Features**: 12 features (máximo)
- **Usuario tipo**: Empresas, fondos de inversión
- **Características**: Customización, soporte prioritario
- **Monetización**: Pricing personalizado

---

### Planes INTERNOS (5-7)

#### 5️⃣ STAFF (Staff)
- **Propósito**: Empleados/colaboradores de la empresa
- **Features**: 11 features
- **NO Público**: ❌ No aparece en página de pricing
- **Acceso**:
  - Pueden gestionar feedback
  - Ver estadísticas
  - Moderar contenido
- **Diferencia con Admin**: Sin permisos críticos (no puede modificar usuarios, roles, pricing)

**Caso de uso**:
```
Contratas a un asistente virtual para:
- Responder feedback de usuarios
- Revisar reportes
- Gestionar waitlist
→ Le das plan "staff" sin acceso admin completo
```

#### 6️⃣ BETA_TESTING (Beta Tester)
- **Propósito**: Usuarios que prueban features nuevas
- **Features**: 12 features (acceso completo)
- **NO Público**: ❌ Asignación manual
- **Acceso**:
  - Todas las features antes de release
  - Testing de nuevas funcionalidades
  - Feedback privilegiado
- **Diferencia**: No tienen permisos admin, solo features de producto

**Caso de uso**:
```
Tienes 10 traders experimentados que quieres que prueben:
- Nueva integración AI
- Nuevo provider de datos
- Features experimentales
→ Les das plan "beta_testing" temporalmente
```

#### 7️⃣ INTERNAL (Administrador)
- **Propósito**: Equipo interno de desarrollo/administración
- **Features**: 12 features (acceso completo)
- **NO Público**: ❌ Solo para equipo interno
- **Acceso**:
  - Todas las features
  - Sin restricciones de límites
  - Testing ilimitado
- **Diferencia con Admin**: Este es el PLAN, no el ROL

**Caso de uso**:
```
Tú (dueño del proyecto) y tu equipo técnico necesitan:
- Acceso completo a todas las features
- Sin límites de uso (análisis ilimitados)
- Testing de producción
→ Plan "internal" + Rol "Admin"
```

---

## 🔍 DIFERENCIA: Rol Admin vs Plan Internal

### Comparación

| Aspecto | ROL: Admin | PLAN: Internal |
|---------|-----------|----------------|
| **Tipo** | Rol funcional | Plan de pricing |
| **Controla** | Permisos de aplicación | Features del producto |
| **Permisos** | 14 permisos (gestión sistema) | 0 permisos directos |
| **Features** | Determinadas por plan | 12 features completas |
| **Límites** | Determinados por plan | Sin límites |
| **Acceso Filament** | ✅ Gestión admin | ❌ Solo si tiene rol Admin |

### Escenarios de Uso

#### Escenario 1: Administrador Completo
```php
User: cerbero@cerberogrowthsolutions.com
Plan: internal           ← Features completas
Rol: Admin               ← Permisos de gestión
Resultado: ✅ Acceso total (gestión + features)
```

#### Escenario 2: Beta Tester Sin Gestión
```php
User: tester@example.com
Plan: beta_testing       ← Features completas
Rol: User                ← Solo dashboard.view
Resultado: ✅ Puede usar todas las features
          ❌ NO puede gestionar usuarios/sistema
```

#### Escenario 3: Staff Moderador
```php
User: moderator@example.com
Plan: staff              ← 11 features
Rol: Manager             ← dashboard.view + feedback.manage
Resultado: ✅ Puede moderar feedback
          ✅ Acceso a mayoría de features
          ❌ NO puede gestionar pricing/usuarios
```

---

## 🧩 COMBINACIONES POSIBLES

### Usuario Normal (Default al Registrarse)
```
Plan: free
Rol: User
Acceso: Mínimo (4 features, solo dashboard)
```

### Cliente Pagado
```
Plan: pro / managed / enterprise
Rol: User
Acceso: Features según plan, sin gestión admin
```

### Empleado/Moderador
```
Plan: staff
Rol: Manager
Acceso: Moderación + 11 features
```

### Beta Tester
```
Plan: beta_testing
Rol: User
Acceso: Todas las features, sin gestión
```

### Administrador del Sistema
```
Plan: internal
Rol: Admin
Acceso: TODO (features + gestión)
```

---

## 🔴 PROBLEMAS ACTUALES IDENTIFICADOS

### 1. Columna `users.plan` (Legacy)

**Estado actual**:
```sql
Column: plan
Type: VARCHAR
Nullable: NO
Default: 'free'
```

**Problema**:
- Almacena plan como STRING ('free', 'pro', etc.)
- NO hay Foreign Key a `pricing_plans`
- NO usa la nueva arquitectura

**Usuarios actuales**:
```
test@example.com → plan = "free"
cerbero@... → plan = "free"
```

### 2. Falta Columna `users.pricing_plan_id`

**Estado actual**: ❌ NO EXISTE

**Debería existir**:
```sql
Column: pricing_plan_id
Type: INTEGER
Nullable: YES
Foreign Key: pricing_plans(id)
```

### 3. Roles de Plan Sin Usuarios Asignados

**Estado actual**:
```
plan:free → 0 usuarios
plan:managed → 0 usuarios
plan:pro → 0 usuarios
plan:enterprise → 0 usuarios
plan:staff → 0 usuarios
plan:beta_testing → 0 usuarios
plan:internal → 0 usuarios
```

**Problema**: Los roles de plan existen pero nadie los usa.

### 4. Roles de Plan Sin Permisos

**Estado actual**:
```
plan:free → 0 permisos
plan:managed → 0 permisos
...
plan:internal → 0 permisos
```

**Problema**: Los roles no otorgan permisos, solo sirven para identificación.

---

## 💡 PROPÓSITO ORIGINAL DEL DISEÑO

### Arquitectura Esperada (No Implementada)

```
Usuario se registra
    ↓
users.pricing_plan_id = 1 (free)
    ↓
Asignar rol: plan:free
    ↓
Trait: HasPlanFeatures
    ↓
Verificar features:
  - hasFeature('access_integrations')
  - hasFeature('manage_own_api_keys')
  - getFeatureLimit('daily_analysis_limit')
    ↓
Controlar acceso según plan
```

### Flujo de Upgrade

```
Usuario compra plan Pro
    ↓
users.pricing_plan_id = 3 (pro)
    ↓
Remover rol: plan:free
Asignar rol: plan:pro
    ↓
Ahora tiene acceso a:
  - 11 features (en vez de 4)
  - Límites más altos
  - Funcionalidades premium
```

---

## 📋 LÓGICA DETRÁS DEL SISTEMA DUAL

### ¿Por qué 2 tipos de roles?

#### Roles Funcionales (User, Manager, Admin)
- **Propósito**: Controlar QUÉ puede HACER en la aplicación
- **Permisos**:
  - Gestionar usuarios
  - Modificar configuración
  - Ver reportes administrativos
- **Permanente**: No cambian con el plan de pago
- **Ejemplo**: Un admin siempre es admin, sin importar si paga o no

#### Roles de Plan (plan:free, plan:pro, etc.)
- **Propósito**: Controlar QUÉ FEATURES puede USAR del producto
- **Features**:
  - Límite de análisis diarios
  - Acceso a integraciones
  - Cantidad de providers
- **Dinámico**: Cambia cuando el usuario upgrade/downgrade
- **Ejemplo**: Usuario upgrade de free → pro, cambia su rol de plan

### Ventajas de Esta Arquitectura

1. **Separación de concerns**:
   ```
   Gestión del sistema ≠ Features del producto
   ```

2. **Flexibilidad**:
   ```php
   // Empleado con acceso moderador + plan staff
   $user->roles = ['Manager', 'plan:staff'];

   // Cliente premium sin acceso admin
   $user->roles = ['User', 'plan:enterprise'];

   // Admin con plan completo
   $user->roles = ['Admin', 'plan:internal'];
   ```

3. **Granularidad**:
   ```php
   // Verificar permisos de gestión
   if ($user->can('users.manage')) { ... }

   // Verificar features de producto
   if ($user->hasFeature('access_integrations')) { ... }
   ```

---

## 🎯 RESPUESTAS A TUS PREGUNTAS

### 1. ¿Es necesaria la columna `users.plan`?

**Respuesta**: ❌ NO, si implementas completamente la nueva arquitectura.

**Actualmente**:
- ✅ ES NECESARIA porque es el ÚNICO sistema funcionando
- La columna `pricing_plan_id` NO EXISTE
- Los métodos del modelo usan `$user->plan`

**Cuando migres**:
- ❌ YA NO SERÁ NECESARIA
- Se reemplaza por `pricing_plan_id` (FK)
- Se depreca y elimina eventualmente

---

### 2. ¿Al registrarse debe asignarse plan free?

**Respuesta**: ✅ SÍ, absolutamente.

**Implementación recomendada**:
```php
// En User model booted():
protected static function booted(): void
{
    static::created(function (User $user) {
        // Asignar plan free al crear cuenta
        $freePlan = PricingPlan::where('slug', 'free')->first();
        $user->pricing_plan_id = $freePlan->id;
        $user->save();

        // Asignar rol de plan
        $user->assignRole('plan:free');

        // Asignar rol funcional básico
        $user->assignRole('User');
    });
}
```

---

### 3. ¿Usuario Cerbero debe ser Admin?

**Respuesta**: ✅ SÍ, porque es el dueño del sistema.

**Configuración recomendada**:
```php
Plan: internal          // Acceso a todas las features sin límites
Rol: Admin              // Acceso a gestión del sistema
```

**Actualmente**:
```
❌ Plan: free
❌ Rol: User
```

**Debe ser**:
```
✅ Plan: internal
✅ Rol: Admin
```

---

### 4. ¿Cuál es el sentido de "internal"?

**Respuesta**: Es el plan de EQUIPO INTERNO.

**Características**:
- 🎁 **Gratis** (no paga)
- 🚀 **Sin límites** (análisis ilimitados)
- 🔓 **Todas las features** (12/12)
- 🧪 **Testing** (puede probar todo)
- 👥 **Para**: Founders, developers, equipo técnico

**Diferencia con otros planes internos**:

| Plan | Propósito | Features | Límites | Usuarios Tipo |
|------|-----------|----------|---------|---------------|
| **staff** | Empleados soporte | 11 | Medios | Moderadores, CS |
| **beta_testing** | Testing de features | 12 | Altos | Testers externos |
| **internal** | Equipo fundador | 12 | **SIN LÍMITES** | Founders, devs |

---

## 🛠️ ACCIONES RECOMENDADAS

### Prioridad 1: CRÍTICA (Hoy)

1. ✅ **Asignar plan y rol correcto a usuario Cerbero**
   ```php
   $user = User::where('email', 'cerbero@...')->first();
   $plan = PricingPlan::where('slug', 'internal')->first();
   $user->pricing_plan_id = $plan->id; // Cuando exista la columna
   $user->plan = 'internal'; // Mientras tanto, usar legacy
   $user->syncRoles(['Admin', 'plan:internal']);
   ```

2. ✅ **Proteger Filament Admin**
   - Implementar middleware de verificación de rol Admin

### Prioridad 2: ALTA (Esta semana)

3. ✅ **Migrar a arquitectura completa**
   - Añadir columna `pricing_plan_id` a users
   - Migrar datos de `plan` → `pricing_plan_id`
   - Implementar relación `User->pricingPlan()`
   - Asignar roles de plan automáticamente

4. ✅ **Implementar asignación automática en registro**
   - Event listener en User::created
   - Plan free por defecto
   - Rol User + plan:free

### Prioridad 3: MEDIA (Próxima semana)

5. ✅ **Añadir permisos a roles de plan**
   - plan:free → Ver features básicas
   - plan:pro → Acceder a integraciones
   - plan:internal → Sin restricciones

6. ✅ **Deprecar columna legacy `plan`**
   - Mantener temporalmente
   - Eliminar en 2-3 sprints

---

## 📈 DIAGRAMA DE FLUJO COMPLETO

```
┌─────────────────────────────────────────────────────────────┐
│                    NUEVO USUARIO                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  Event: User::created                                       │
│  ├─ Asignar pricing_plan_id = 1 (free)                     │
│  ├─ Asignar rol: plan:free                                 │
│  └─ Asignar rol: User                                      │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  USUARIO USA LA APP                                         │
│  ├─ hasFeature('access_integrations') → false              │
│  ├─ getFeatureLimit('daily_analysis_limit') → 5/día        │
│  └─ can('users.manage') → false                            │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
          Usuario compra plan PRO
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  UPGRADE PLAN                                               │
│  ├─ Actualizar pricing_plan_id = 3 (pro)                   │
│  ├─ Remover rol: plan:free                                 │
│  ├─ Asignar rol: plan:pro                                  │
│  └─ Mantener rol: User                                     │
└────────────────────┬────────────────────────────────────────┘
                     │
                     ▼
┌─────────────────────────────────────────────────────────────┐
│  USUARIO CON PLAN PRO                                       │
│  ├─ hasFeature('access_integrations') → true               │
│  ├─ hasFeature('manage_own_api_keys') → true               │
│  ├─ getFeatureLimit('daily_analysis_limit') → 100/día      │
│  └─ can('users.manage') → false (sigue siendo User)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎓 CONCLUSIÓN

El sistema implementa una **arquitectura inteligente** que separa:
- **Permisos de gestión** (Roles funcionales)
- **Features de producto** (Roles de plan)

**Planes internos** (staff, beta_testing, internal) son para:
- ✅ Equipo interno sin pagar
- ✅ Testing de features
- ✅ Soporte y moderación
- ✅ Founders con acceso completo

**Plan "internal"** específicamente es para:
- 👑 Founders/dueños
- 💻 Equipo técnico
- 🚀 Acceso ilimitado sin restricciones

---

**Elaborado por**: Claude (Anthropic)
**Fecha**: 2025-10-24
**Versión**: 1.0
