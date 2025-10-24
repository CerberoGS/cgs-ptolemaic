# 📋 PLAN DE MIGRACIÓN ADMIN A FILAMENT

## 🎯 Objetivo
Migrar TODO el panel admin de Inertia/React (`/es/admin`) a Filament (`/admin`)

## 📊 Funcionalidades Admin Actuales Identificadas

### 1. **Dashboard** ✅
- **Ruta**: `{locale}/admin`
- **Controller**: `AdminDashboardController`
- **Funcionalidad**: Métricas generales del sistema
- **→ Filament**: Dashboard con Widgets

### 2. **Affiliate System** 🎁
- **Rutas**:
  - `admin.affiliate.index` - Vista general
  - `admin.affiliate.codes` - Gestión de códigos
  - `admin.affiliate.referrals` - Gestión de referidos
  - `admin.affiliate.rewards` - Gestión de recompensas
- **Controller**: `AffiliateController`
- **Modelos**: `AffiliateCode`, `Referral`, `AffiliateReward`
- **→ Filament**: 3 Resources (AffiliateCodes, Referrals, AffiliateRewards)

### 3. **Feedback Management** 💬
- **Rutas**: `admin.feedback.*`
- **Controller**: `FeedbackController`
- **Modelo**: `Feedback`
- **→ Filament**: 1 Resource (Feedback)

### 4. **Invitations** ✉️
- **Rutas**: `admin.invitations.*` (CRUD completo)
- **Controller**: `InvitationController`
- **Modelo**: `Invitation`
- **→ Filament**: 1 Resource (Invitations)

### 5. **Languages** 🌍
- **Rutas**: `admin.languages.*` (CRUD completo)
- **Controller**: `LanguageController`
- **Modelo**: `Language`
- **Acciones**: set-default, toggle-active
- **→ Filament**: 1 Resource (Languages) con Actions

### 6. **Pricing Plans** 💰
- **Rutas**: `admin.pricing.*`
- **Controller**: `PricingController`
- **Modelo**: `PricingPlan`
- **Acciones**: toggle-offer, toggle-scarcity, increment/reset scarcity
- **→ Filament**: 1 Resource (PricingPlans) con Actions

### 7. **Providers** (AI, Trading, News, Market Data) 🔌
- **Rutas**: `admin.providers.*`
- **Controller**: `AdminProviderController`
- **Modelos**: `AiProvider`, `TradingProvider`, `NewsProvider`, `MarketDataProvider`
- **→ Filament**: 4 Resources separados o 1 con Tabs

### 8. **Roles & Permissions** 🔐
- **Rutas**: `admin.roles.*`
- **Controller**: `AdminRoleController`
- **Modelo**: `Role` (Spatie)
- **→ Filament**: Filament Shield (maneja automáticamente)

### 9. **Telegram Config** 📱
- **Rutas**: `admin.telegram-config.*`
- **Controller**: `TelegramConfigController`
- **Modelo**: `TelegramConfig`
- **→ Filament**: Custom Page o Settings plugin

### 10. **Users** 👥
- **Rutas**: `admin.users.*`
- **Controller**: `AdminUserController`, `UserPlanController`
- **Modelo**: `User`
- **Acciones**: Update plan, Update defaults, Update roles
- **→ Filament**: 1 Resource (Users) con Relations

### 11. **Waitlist** 📝
- **Rutas**: `admin.waitlist.*` (inferido)
- **Modelo**: `WaitlistEntry`
- **→ Filament**: 1 Resource (WaitlistEntries)

---

## 🗂️ Recursos Filament a Crear (Total: ~15)

### Core Resources
1. **UserResource** - Gestión de usuarios
2. **RoleResource** - Roles (via Filament Shield)

### Providers
3. **AiProviderResource**
4. **TradingProviderResource**
5. **NewsProviderResource**
6. **MarketDataProviderResource**

### Affiliate System
7. **AffiliateCodeResource**
8. **ReferralResource**
9. **AffiliateRewardResource**

### Content & Engagement
10. **FeedbackResource**
11. **InvitationResource**
12. **WaitlistEntryResource**

### Configuration
13. **LanguageResource**
14. **PricingPlanResource**
15. **TelegramConfigPage** (Custom Page)

### Dashboard
16. **AdminDashboard** - Con widgets de métricas

---

## ✅ Orden de Implementación

### **Fase 1: Core (Usuarios y Roles)**
1. UserResource
2. Filament Shield (Roles/Permissions)

### **Fase 2: Providers (AI, Trading, etc.)**
3. AiProviderResource
4. TradingProviderResource
5. NewsProviderResource
6. MarketDataProviderResource

### **Fase 3: Affiliate System**
7. AffiliateCodeResource
8. ReferralResource
9. AffiliateRewardResource

### **Fase 4: Engagement**
10. FeedbackResource
11. InvitationResource
12. WaitlistEntryResource

### **Fase 5: Configuration**
13. LanguageResource
14. PricingPlanResource
15. TelegramConfigPage

### **Fase 6: Dashboard & Widgets**
16. Dashboard con widgets

---

## 🧹 Limpieza Final

**Eliminar:**
- Controllers: `app/Http/Controllers/Admin/*`
- Páginas React: `resources/js/Pages/Admin/*`
- Rutas: `routes/web.php` → sección `{locale}/admin`

**Mantener:**
- Modelos (todos se reutilizan)
- Migraciones
- Tests (adaptar a Filament)

---

## 🎯 Estado Actual
- ✅ Filament v4.1.10 instalado
- ✅ Panel admin configurado en `/admin`
- ✅ Middleware de localización integrado
- ⏳ Pendiente: Crear recursos

**Próximo paso**: Comenzar con FASE 1 (UserResource + Filament Shield)
