# ROADMAP: Implementación Completa del Sistema de Planes

**Fecha**: 2025-10-24
**Estado**: En ejecución

---

## FASE 1: Conectar Sistema de Pricing Plans con Users
**Objetivo**: Migrar del sistema legacy (`users.plan` string) al nuevo sistema (`users.pricing_plan_id` FK)

### Tareas:
1. ✅ **Crear migración `add_pricing_plan_id_to_users_table`**
   - Agregar columna `pricing_plan_id` (FK nullable a `pricing_plans.id`)
   - Incluir lógica de migración automática de datos: convertir `users.plan` (string) → `users.pricing_plan_id` (FK)
   - Ejemplo: usuario con `plan='free'` → `pricing_plan_id=1` (ID del plan free en pricing_plans)

2. ⏳ **Actualizar modelo User.php**
   - Agregar relación `pricingPlan(): BelongsTo`
   - Agregar `pricing_plan_id` a `$fillable`
   - Mantener métodos legacy (`hasPlan()`, `planOrDefault()`) TEMPORALMENTE para compatibilidad

3. ⏳ **Implementar auto-asignación de plan free en registro**
   - Agregar evento `creating` en `User::boot()`
   - Asignar `pricing_plan_id = 1` (free) si es null al crear usuario
   - Esto cubre registro manual, OAuth, y cualquier otro método de creación

---

## FASE 2: Actualizar Usuario Cerbero
**Objetivo**: Configurar correctamente el usuario solicitado

4. ⏳ **Actualizar usuario `cerbero@cerberogrowthsolutions.com`**
   - Asignar rol: **Admin** (en lugar de User actual)
   - Asignar plan: **internal** (ID 7 según PricingPlanSeeder)
   - Verificar acceso post-actualización

---

## FASE 3: Proteger Panel Admin de Filament
**Objetivo**: Prevenir acceso no autorizado al panel administrativo

5. ⏳ **Modificar `app/Providers/Filament/AdminPanelProvider.php`**
   - Agregar middleware personalizado que verifique rol Admin o Manager
   - Alternativa: usar `->authMiddleware()` con verificación de roles
   - Redirigir usuarios sin rol admin a dashboard normal

---

## FASE 4: Limpieza del Sistema Legacy (POSPUESTO)
**Objetivo**: Eliminar columna legacy si ya no es necesaria
**Estado**: ⏸️ POSPUESTO - Se hará después de confirmar que todo funciona correctamente

6. **Evaluar si eliminar `users.plan` y columnas relacionadas**
   - **PROS**: Base de datos más limpia, un solo sistema
   - **CONTRAS**: Breaking change si hay código que aún use `$user->plan`

   Si se decide proceder:
   - Crear migración `remove_legacy_plan_columns_from_users`
   - Eliminar: `plan`, `plan_started_at`, `plan_expires_at`, `plan_metadata`
   - Actualizar modelo User (quitar de `$fillable`, eliminar métodos legacy)
   - **RIESGO**: Verificar que no haya código en frontend/backend usando estas columnas

---

## FASE 5: Testing y Verificación

7. ⏳ **Crear/actualizar tests**
   - Test: Usuario se crea con plan free por defecto
   - Test: Solo Admin/Manager pueden acceder a Filament
   - Test: Relación `user->pricingPlan` funciona correctamente
   - Test: Migración de datos legacy funciona

8. ⏳ **Ejecutar migraciones y verificar**
   - `php artisan migrate`
   - Verificar usuarios existentes migraron correctamente
   - Verificar usuario cerbero tiene Admin + internal
   - Probar acceso a Filament con diferentes roles

9. ⏳ **Formatear código con Pint**
   - `vendor/bin/pint --dirty`

---

## RECOMENDACIÓN FINAL

**HACER AHORA** (Fases 1-3, 5):
- ✅ Conectar sistema de pricing plans (FASE 1)
- ✅ Actualizar usuario cerbero (FASE 2)
- ✅ Proteger Filament admin (FASE 3)
- ✅ Testing y verificación (FASE 5)

**POSTERGAR** (Fase 4):
- ⏸️ Eliminar columnas legacy - mejor hacerlo DESPUÉS de confirmar que todo funciona bien por varios días

**Razón**: Mantener columnas legacy como "backup" temporal da seguridad. Si algo falla, aún se tienen los datos originales. Se pueden eliminar en una segunda fase cuando se confirme que el nuevo sistema funciona perfectamente.

---

## Notas de Implementación

### Arquitectura Dual Confirmada:
- **Nivel de Permiso** (Rol funcional): Admin, Manager, User
- **Nivel de Plan** (Acceso a features): free, managed, pro, enterprise, staff, beta_testing, internal

### Ejemplo:
Usuario con **Rol "User" + Plan "internal"**:
- ✅ Consultas ilimitadas (por el plan internal)
- ✅ Acceso completo a todas las features
- ❌ NO puede acceder al panel admin de Filament (porque su rol es "User", no "Admin")
