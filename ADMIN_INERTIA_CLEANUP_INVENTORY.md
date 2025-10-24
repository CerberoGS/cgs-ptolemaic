# 🗑️ INVENTARIO DE ARCHIVOS ADMIN INERTIA A ELIMINAR

**Fecha de análisis**: 2025-10-23
**Razón**: Migración completa a Filament - Admin Inertia/React obsoleto

---

## 📊 RESUMEN

| Categoría | Cantidad | Ubicación |
|-----------|----------|-----------|
| Controllers | 12 | `app/Http/Controllers/Admin/` |
| Páginas React | 21 | `resources/js/pages/admin/` |
| Actions TypeScript | 13 | `resources/js/actions/App/Http/Controllers/Admin/` |
| Routes Frontend | 17 | `resources/js/routes/admin/` |
| Rutas Backend | ~89 líneas | `routes/web.php` (líneas 109-198) |
| **TOTAL** | **63 archivos** + 1 sección rutas |

---

## 1️⃣ CONTROLLERS (12 archivos)

Ubicación: `app/Http/Controllers/Admin/`

```
✓ AdminDashboardController.php
✓ AdminProviderController.php
✓ AdminRoleController.php
✓ AdminUserController.php
✓ AffiliateController.php
✓ FeedbackController.php
✓ InvitationController.php
✓ LanguageController.php
✓ PricingController.php
✓ TelegramConfigController.php
✓ UserPlanController.php
✓ WaitlistController.php
```

**Equivalente en Filament:**
- ✅ Todos tienen Resource equivalente en `app/Filament/Resources/`

---

## 2️⃣ PÁGINAS REACT (21 archivos)

Ubicación: `resources/js/pages/admin/`

```
✓ admin/affiliate/codes.tsx
✓ admin/affiliate/index.tsx
✓ admin/affiliate/referrals.tsx
✓ admin/affiliate/rewards.tsx
✓ admin/dashboard.tsx
✓ admin/feedback/index.tsx
✓ admin/feedback/show.tsx
✓ admin/invitations/create.tsx
✓ admin/invitations/index.tsx
✓ admin/invitations/show.tsx
✓ admin/languages/create.tsx
✓ admin/languages/edit.tsx
✓ admin/languages/index.tsx
✓ admin/pricing/edit.tsx
✓ admin/pricing/index.tsx
✓ admin/providers/index.tsx
✓ admin/roles/index.tsx
✓ admin/TelegramConfig/Index.tsx
✓ admin/users/index.tsx
✓ admin/users/plan-edit.tsx
✓ admin/waitlist/index.tsx
```

**Equivalente en Filament:**
- ✅ Todos tienen interfaz equivalente en Filament

---

## 3️⃣ ACTIONS TYPESCRIPT (13 archivos)

Ubicación: `resources/js/actions/App/Http/Controllers/Admin/`

```
✓ AdminDashboardController.ts
✓ AdminProviderController.ts
✓ AdminRoleController.ts
✓ AdminUserController.ts
✓ AffiliateController.ts
✓ FeedbackController.ts
✓ InvitationController.ts
✓ LanguageController.ts
✓ PricingController.ts
✓ TelegramConfigController.ts
✓ UserPlanController.ts
✓ WaitlistController.ts
✓ index.ts (barrel export)
```

---

## 4️⃣ ROUTES FRONTEND (17 archivos)

Ubicación: `resources/js/routes/admin/`

```
✓ admin/affiliate/codes/index.ts
✓ admin/affiliate/index.ts
✓ admin/affiliate/referrals/index.ts
✓ admin/affiliate/rewards/index.ts
✓ admin/feedback/index.ts
✓ admin/index.ts
✓ admin/invitations/index.ts
✓ admin/languages/index.ts
✓ admin/pricing/index.ts
✓ admin/providers/index.ts
✓ admin/roles/index.ts
✓ admin/telegram-config/index.ts
✓ admin/users/defaults/index.ts
✓ admin/users/index.ts
✓ admin/users/plan/index.ts
✓ admin/users/roles/index.ts
✓ admin/waitlist/index.ts
```

---

## 5️⃣ RUTAS BACKEND (routes/web.php)

**Sección a eliminar**: Líneas 109-198

```php
// Línea 109-198: Todo el bloque admin
Route::prefix('admin')->as('admin.')->group(function () {
    // Dashboard
    // Providers (view, store, update, destroy)
    // Users (index, roles, defaults, plan)
    // Roles (CRUD)
    // Feedback (index, show, update)
    // Invitations (CRUD completo)
    // Pricing (index, edit, update, toggle-offer, toggle-scarcity, etc.)
    // Languages (resource completo + toggle-active, set-default)
    // Affiliate (index, codes, referrals, rewards, toggle, status)
    // Waitlist (index, status, destroy)
});
```

**Total rutas a eliminar**: ~89 líneas de código

---

## ⚠️ VERIFICACIONES CRÍTICAS

### ✅ Confirmado por el usuario:
1. ❌ NO hay usuarios no-admin que accedan a `/es/admin/*`
2. ✅ Todos los admins YA usan Filament `/admin`
3. ✅ Backup solicitado antes de eliminar

### ⚠️ Verificaciones pendientes:
- [ ] Confirmar que NO hay tests que usen rutas `admin.*`
- [ ] Confirmar que NO hay imports React que referencien archivos de admin
- [ ] Verificar que no hay enlaces `href="/es/admin/*"` en el código

---

## 📦 PLAN DE BACKUP

Se creará carpeta de backup en:
```
backup/admin-inertia-removal-2025-10-23/
├── controllers/
├── pages/
├── actions/
├── routes/
└── web.php.backup (sección admin)
```

---

## 🎯 PRÓXIMOS PASOS

1. ✅ **Fase 1 COMPLETADA**: Inventario creado
2. ⏭️ **Fase 2**: Crear backup de archivos
3. ⏭️ **Fase 3-6**: Eliminación controlada
4. ⏭️ **Fase 7-8**: Verificación y tests
5. ⏭️ **Fase 9**: Actualizar documentación

---

**Generado**: 2025-10-23
**Estado**: ✅ Análisis completo - Listo para backup
