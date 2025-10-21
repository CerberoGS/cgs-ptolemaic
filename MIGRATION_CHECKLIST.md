# 📋 CHECKLIST DE DECISIONES Y MIGRACIÓN
## Proyecto: CGS Ptolemaic - Plataforma de Trading con IA + Comunidad

---

## ✅ ESTADO ACTUAL DEL PROYECTO (Confirmado)

### Stack Técnico Confirmado
- [x] **Laravel 12** - Framework principal
- [x] **PHP 8.3.16** - Versión de PHP
- [x] **MySQL** - Base de datos actual (DB_CONNECTION=mysql, DB_DATABASE=catai)
- [x] **Inertia v2** - Bridge Laravel-React
- [x] **React 19** - Frontend framework
- [x] **Tailwind CSS v4** - Estilos
- [x] **Vite** - Bundler
- [x] **Pest v4** - Testing framework
- [x] **Laravel Fortify** - Autenticación
- [x] **Laravel Passport** - OAuth2
- [x] **Spatie Permissions** - Roles y permisos
- [x] **Laravel MCP v0.2.1** - Model Context Protocol
- [x] **Laravel Boost v1.3** - MCP Development tools

### Características Existentes
- [x] **Sistema de Autenticación Completo**
  - Login/Register
  - 2FA (Google2FA)
  - OAuth (Google)
  - Email verification
  - Password reset

- [x] **Sistema de Providers de IA**
  - AI Providers (OpenAI, Claude, etc.)
  - AI Provider Keys
  - AI Provider Models
  - Key Verification

- [x] **Market Data & Trading**
  - Market Data Providers
  - News Providers
  - Trading Providers
  - Provider Keys & Verification

- [x] **Sistema de Journal de Trading**
  - Journal Entries
  - Risk Management Fields
  - Export functionality

- [x] **Sistema de Planes y Suscripciones**
  - Pricing Plans
  - Plan Changes
  - Trial Management
  - Card Management

- [x] **Sistema de Afiliados Completo**
  - Affiliate Codes
  - Referrals
  - Affiliate Rewards
  - Admin Management

- [x] **Sistema de Gamificación**
  - Achievements
  - User Progress

- [x] **Sistema de Invitaciones**
  - Invitations
  - Redemptions

- [x] **Otros Features**
  - Feedback System
  - Waitlist
  - Multi-language (español por defecto)
  - Telegram Config (2FA via SMS)

### Configuración Actual
- [x] **Cache**: Database driver (MySQL)
- [x] **Queue**: Database driver (MySQL)
- [x] **Session**: Database driver (MySQL)
- [x] **Redis**: Configurado pero no en uso activo
- [x] **Locale**: Español (es) por defecto
- [x] **Domain**: cptolemaic.com / cgsatai.com

---

## 🎯 OBJETIVO DEL PROYECTO

> **Transformar CGS Ptolemaic en:**
> Una plataforma de trading con IA + comunidad estilo foro moderno que combina:
> - TikTok: Feed de contenido, algoritmo de recomendación
> - Twitter: Threads, discusiones, trending topics
> - Discord: Canales, comunidades, mensajería en tiempo real
> - IA: Moderación automática, análisis, recomendaciones

---

## 🔄 DECISIONES PENDIENTES DE APROBACIÓN

### 1️⃣ Base de Datos

**ESTADO ACTUAL**: MySQL
**OPCIONES**:

[ ] **Opción A**: Mantener MySQL
  - ✅ Ya configurado y funcionando
  - ✅ Sin migración necesaria
  - ✅ Compatible con todo Laravel
  - ⚠️ Menos performante para JSON/búsquedas complejas
  - ⚠️ No tiene JSONB como PostgreSQL

[ ] **Opción B**: Migrar a PostgreSQL ⭐ RECOMENDADO
  - ✅ Mejor para JSONB (AI responses, metadata)
  - ✅ Full-text search nativo
  - ✅ Mejor para analytics
  - ✅ Más robusto para foro/comunidad
  - ❌ Requiere migración de datos
  - ❌ Cambio en local (Laragon) y producción

**¿QUÉ DECIDES?**: _____________

---

### 2️⃣ Cache & Performance

**ESTADO ACTUAL**: Cache/Queue/Session en MySQL
**OPCIONES**:

[ ] **Opción A**: Mantener todo en MySQL
  - ✅ Simple, sin cambios
  - ❌ Menos performante

[ ] **Opción B**: Activar Redis para Cache/Queue/Session ⭐ RECOMENDADO
  - ✅ 10-100x más rápido
  - ✅ Esencial para feed en tiempo real
  - ✅ Necesario para WebSockets (Reverb)
  - ✅ Ya está configurado en .env
  - ⚠️ Requiere instalar Redis en Laragon

**¿QUÉ DECIDES?**: _____________

---

### 3️⃣ Filament Admin Panel

**ESTADO ACTUAL**: No hay panel de admin (solo rutas /admin manuales)
**OPCIONES**:

[ ] **Opción A**: Instalar Filament v3 AHORA
  - ✅ Empezar inmediatamente
  - ✅ Panel admin profesional en días
  - ❌ Conflictos con Tailwind v4
  - ❌ Migración a v4 después (Jun 2025)

[ ] **Opción B**: Esperar Filament v4 Beta (Junio 2025) ⭐ RECOMENDADO
  - ✅ Tailwind v4 nativo (100% compatible)
  - ✅ Laravel 12 optimizado
  - ✅ Sin migraciones futuras
  - ❌ Esperar ~6 meses
  - ⚠️ Mientras tanto: admin básico con Inertia

[ ] **Opción C**: Admin Temporal con Inertia + Migrar a Filament v4
  - ✅ Velocidad inmediata
  - ✅ Stack consistente (React)
  - ✅ Migración limpia después
  - ⚠️ Trabajo doble (pero mínimo)

**¿QUÉ DECIDES?**: _____________

---

### 4️⃣ Real-Time & WebSockets

**ESTADO ACTUAL**: No configurado
**NECESARIO PARA**: Chat, notificaciones en tiempo real, feed live

**OPCIONES**:

[ ] **Opción A**: Laravel Reverb (Oficial, Nuevo en Laravel 11+)
  - ✅ Nativo de Laravel
  - ✅ Gratis, sin límites
  - ✅ Fácil setup
  - ✅ Recomendado por Laravel

[ ] **Opción B**: Pusher (SaaS)
  - ✅ Plug & play
  - ❌ Costo mensual
  - ❌ Límites de conexiones

[ ] **Opción C**: Soketi (Self-hosted, compatible con Pusher)
  - ✅ Gratis
  - ⚠️ Más complejo de mantener

**¿QUÉ DECIDES?**: _____________

---

### 5️⃣ Storage de Media (Videos, Imágenes)

**ESTADO ACTUAL**: FILESYSTEM_DISK=local
**NECESARIO PARA**: Posts con imágenes/videos estilo TikTok

**OPCIONES**:

[ ] **Opción A**: AWS S3
  - ✅ Standard de industria
  - ✅ CDN con CloudFront
  - ❌ Costo por GB

[ ] **Opción B**: Cloudflare R2 ⭐ RECOMENDADO
  - ✅ Compatible con S3
  - ✅ Más barato (sin costo egress)
  - ✅ CDN gratis incluido
  - ✅ Perfecto para videos

[ ] **Opción C**: Local + CDN después
  - ✅ Gratis en desarrollo
  - ⚠️ Migración futura obligatoria

**¿QUÉ DECIDES?**: _____________

---

### 6️⃣ Servicio de IA Principal

**NECESARIO PARA**: Moderación, recomendaciones, resúmenes

**OPCIONES**:

[ ] **Opción A**: OpenAI (GPT-4, GPT-4o)
  - ✅ API madura
  - ✅ Moderación endpoint
  - ❌ Más caro

[ ] **Opción B**: Anthropic Claude (Sonnet 4) ⭐ RECOMENDADO
  - ✅ Mejor contexto (200K tokens)
  - ✅ Mejor para moderación compleja
  - ✅ Más económico
  - ✅ Ya usas Claude Code

[ ] **Opción C**: Ambos (OpenAI + Claude)
  - ✅ Redundancia
  - ✅ Usar el mejor para cada caso
  - ❌ Doble costo

**¿QUÉ DECIDES?**: _____________

---

### 7️⃣ Search Engine

**NECESARIO PARA**: Búsqueda de posts, usuarios, trending topics

**OPCIONES**:

[ ] **Opción A**: Laravel Scout + Database (MySQL/PostgreSQL)
  - ✅ Simple, sin servicios extra
  - ❌ Lento con muchos posts

[ ] **Opción B**: Laravel Scout + Meilisearch ⭐ RECOMENDADO
  - ✅ Rápido, open-source
  - ✅ Self-hosted o cloud
  - ✅ Typo-tolerant
  - ✅ Faceted search

[ ] **Opción C**: Algolia
  - ✅ Plug & play
  - ❌ Caro en producción

**¿QUÉ DECIDES?**: _____________

---

### 8️⃣ Testing Strategy

**ESTADO ACTUAL**: Pest v4 instalado, algunos tests

**OPCIONES**:

[ ] **Opción A**: Unit + Feature Tests (suficiente para MVP)
[ ] **Opción B**: Unit + Feature + Browser Tests ⭐ RECOMENDADO
  - Pest v4 Browser Testing
  - Test de UX completa
  - Visual regression
[ ] **Opción C**: Cobertura completa + CI/CD
  - GitHub Actions
  - Tests automáticos en PR
  - Cobertura > 80%

**¿QUÉ DECIDES?**: _____________

---

## 📦 NUEVAS FEATURES A IMPLEMENTAR (Comunidad/Foro)

### Posts & Content
- [ ] **Posts System** (estilo Twitter/TikTok)
  - Posts tabla (id, user_id, content, media, visibility)
  - Post Media (videos, imágenes)
  - Post Likes
  - Post Shares/Retweets
  - Post Views/Impressions

### Threads & Discussions
- [ ] **Threads System** (estilo Twitter)
  - Threads tabla
  - Thread Replies (anidados)
  - Mentions (@usuario)
  - Hashtags (#topic)

### Channels & Communities
- [ ] **Channels System** (estilo Discord)
  - Channels tabla
  - Channel Members
  - Channel Messages
  - Channel Roles/Permissions

### Social Features
- [ ] **Following System**
  - User Follows
  - Followers/Following count
  - Feed personalizado

- [ ] **Notifications**
  - Database notifications
  - Real-time notifications (WebSockets)
  - Email notifications (opcional)

### Moderation & Reports
- [ ] **Reports System**
  - Reports tabla
  - Report Types (spam, abuso, etc.)
  - Admin moderation tools

- [ ] **AI Moderation**
  - Auto-moderation con IA
  - Toxicity detection
  - Spam detection
  - AI Moderation Logs

### Recommendations & Feed
- [ ] **Algorithm/Recommendations**
  - Personalized feed
  - Trending topics
  - Suggested users
  - Content scoring

---

## 🗄️ SCHEMA DE BASE DE DATOS NUEVA

```sql
-- Posts (estilo Twitter/TikTok)
posts
├── id
├── user_id
├── content (text)
├── type (text, video, image, poll)
├── visibility (public, followers, private)
├── is_pinned
├── reply_to_post_id (para threads)
├── repost_of_post_id
├── views_count
├── likes_count
├── shares_count
├── replies_count
├── moderated_at
├── moderated_by_ai (boolean)
├── ai_moderation_score
└── timestamps

-- Post Media
post_media
├── id
├── post_id
├── type (image, video, gif)
├── url
├── thumbnail_url
├── size
├── duration (videos)
└── timestamps

-- Post Interactions
post_likes
├── id
├── post_id
├── user_id
└── timestamps

post_shares
├── id
├── post_id
├── user_id
└── timestamps

post_bookmarks
├── id
├── post_id
├── user_id
└── timestamps

-- Threads (respuestas anidadas)
post_replies
├── id
├── post_id (padre)
├── reply_id (hijo)
└── depth (nivel de anidación)

-- Social Graph
user_follows
├── id
├── follower_id
├── following_id
└── timestamps

-- Channels (estilo Discord)
channels
├── id
├── name
├── slug
├── description
├── owner_id
├── is_private
├── member_count
└── timestamps

channel_members
├── id
├── channel_id
├── user_id
├── role (admin, moderator, member)
└── timestamps

channel_messages
├── id
├── channel_id
├── user_id
├── content
├── reply_to_id
└── timestamps

-- Hashtags & Mentions
hashtags
├── id
├── tag
├── usage_count
└── timestamps

post_hashtags
├── post_id
├── hashtag_id

mentions
├── id
├── post_id
├── user_id (mencionado)
└── timestamps

-- Reports & Moderation
reports
├── id
├── reporter_id
├── reportable_type (Post, User, Channel)
├── reportable_id
├── reason
├── status (pending, reviewed, resolved)
├── reviewed_by
├── reviewed_at
└── timestamps

ai_moderation_logs
├── id
├── moderatable_type
├── moderatable_id
├── ai_provider (openai, claude)
├── toxicity_score
├── spam_score
├── action_taken (flag, hide, delete)
├── raw_response (json)
└── timestamps

-- Trending & Algorithm
trending_topics
├── id
├── topic (hashtag o keyword)
├── score
├── posts_count
├── period (hourly, daily, weekly)
└── timestamps

user_feed_items (caché del feed personalizado)
├── id
├── user_id
├── post_id
├── score (relevancia)
├── reason (following, trending, recommended)
└── timestamps
```

---

## 🚀 PLAN DE IMPLEMENTACIÓN (Después de Aprobar Decisiones)

### FASE 0: Infraestructura (1 semana)
- [ ] Decisión de DB (MySQL vs PostgreSQL)
- [ ] Activar Redis para cache/queue/session
- [ ] Configurar Laravel Reverb (WebSockets)
- [ ] Configurar storage (S3/R2)
- [ ] Instalar MCPs adicionales (OpenAI, PostgreSQL, Redis)

### FASE 1: Modelos Base del Foro (1 semana)
- [ ] Crear migraciones (posts, channels, follows, etc.)
- [ ] Crear modelos Eloquent con relaciones
- [ ] Crear factories & seeders
- [ ] Tests de modelos

### FASE 2: API REST + Repository Pattern (2 semanas)
- [ ] API de Posts (CRUD, like, share, bookmark)
- [ ] API de Threads (crear, responder, anidar)
- [ ] API de Channels (CRUD, join/leave, mensajes)
- [ ] API de Social (follow, unfollow, feed)
- [ ] Tests de API

### FASE 3: Frontend - Feed Principal (2 semanas)
- [ ] Componente InfiniteFeed (estilo TikTok)
- [ ] Componente Post Card
- [ ] Like/Share/Bookmark interactions
- [ ] Navegación a post individual
- [ ] Lazy loading de imágenes/videos

### FASE 4: Frontend - Threads (1 semana)
- [ ] Vista de thread completo
- [ ] Respuestas anidadas
- [ ] Crear nuevo post/thread
- [ ] Mentions autocomplete
- [ ] Hashtags clickables

### FASE 5: Frontend - Channels (1 semana)
- [ ] Lista de channels
- [ ] Vista de channel individual
- [ ] Chat en tiempo real (Reverb)
- [ ] Crear/editar channel

### FASE 6: Integración de IA (2 semanas)
- [ ] OpenAI/Claude API setup
- [ ] Auto-moderación de posts
- [ ] Toxicity detection
- [ ] Spam detection
- [ ] Trending topics con IA
- [ ] Recomendaciones personalizadas

### FASE 7: Admin Panel (1-2 semanas)
**Si eliges Filament v3**:
- [ ] Instalar Filament v3
- [ ] Recursos de moderación (Posts, Users, Reports)
- [ ] Dashboard con analytics
- [ ] AI moderation logs

**Si eliges esperar v4**:
- [ ] Admin básico con Inertia/React
- [ ] Vistas de moderación simples
- [ ] Migrar a Filament v4 en junio

### FASE 8: Testing & Optimización (1 semana)
- [ ] Browser tests (Pest v4)
- [ ] Performance optimization
- [ ] N+1 query fixes
- [ ] Caching strategy
- [ ] Rate limiting

### FASE 9: Deploy & Monitoring (continuo)
- [ ] Deploy a staging
- [ ] Sentry para error tracking
- [ ] Analytics (Fathom/Plausible)
- [ ] CDN para assets
- [ ] Backup strategy

---

## 📊 ESTIMACIÓN TOTAL

**Con todas las decisiones aprobadas:**
- Desarrollo: 12-14 semanas (~3 meses)
- Testing: incluido en cada fase
- Deploy: 1 semana adicional

**MVP (Mínimo Viable):**
- Posts + Feed + Likes: 4 semanas
- Threads: +1 semana
- IA básica: +1 semana
- **Total MVP: 6 semanas**

---

## ✋ PRÓXIMO PASO

**NECESITO QUE APRUEBES LAS 8 DECISIONES DE ARRIBA**

Completa este formulario:

1. Base de Datos: [ ] MySQL  [ ] PostgreSQL
2. Cache/Redis: [ ] MySQL  [ ] Redis
3. Admin Panel: [ ] Filament v3 ahora  [ ] Esperar v4  [ ] Admin Inertia temporal
4. WebSockets: [ ] Reverb  [ ] Pusher  [ ] Soketi
5. Storage: [ ] S3  [ ] R2  [ ] Local
6. IA: [ ] OpenAI  [ ] Claude  [ ] Ambos
7. Search: [ ] Database  [ ] Meilisearch  [ ] Algolia
8. Testing: [ ] Unit+Feature  [ ] +Browser  [ ] +CI/CD

Una vez apruebes esto, generaré el **PLAN DE MIGRACIÓN EJECUTABLE** con comandos específicos y PRs.

---

**Fecha de creación**: 2025-10-20
**Última actualización**: 2025-10-20
