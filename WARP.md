# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project type: Laravel 12 + Inertia.js (React, TypeScript, Vite) with SSR. Auth via Laravel Fortify and Google OAuth (Socialite). Frontend route helpers are generated via Wayfinder.

Common commands

- Install dependencies
  ```bash path=null start=null
  composer install
  npm ci
  ```
- Environment setup (if not already present)
  ```bash path=null start=null
  copy .env.example .env   # On Windows (PowerShell: Copy-Item .env.example .env)
  php artisan key:generate
  php artisan migrate
  ```
- Start development (client-side rendering)
  ```bash path=null start=null
  composer run dev
  # Runs: php artisan serve + queue:listen + npm run dev (Vite)
  ```
- Start development with SSR enabled
  ```bash path=null start=null
  composer run dev:ssr
  # Builds SSR bundle, then runs: php artisan serve + queue:listen + pail + php artisan inertia:start-ssr
  ```
- Build assets (CSR)
  ```bash path=null start=null
  npm run build
  ```
- Build assets for SSR (client + server bundles)
  ```bash path=null start=null
  npm run build:ssr
  ```
- Run tests (Pest over PHPUnit)
  ```bash path=null start=null
  composer test          # clears config then runs php artisan test (Pest)
  # or
  php artisan test
  # or
  vendor/bin/pest
  ```
- Run a single test file or filtered test
  ```bash path=null start=null
  # By file
  vendor/bin/pest tests/Feature/DashboardTest.php

  # By test name (regex/pattern)
  vendor/bin/pest -t "authenticated users can visit the dashboard"

  # Using PHPUnit-style filter via Artisan
  php artisan test --filter="authenticated users can visit the dashboard"
  ```
- Lint/format
  ```bash path=null start=null
  # PHP (Laravel Pint)
  vendor/bin/pint                 # fix
  vendor/bin/pint --test          # check only

  # JS/TS
  npm run lint                    # ESLint with --fix
  npm run format                  # Prettier write
  npm run format:check            # Prettier check
  npm run types                   # TypeScript type-check only
  ```

High-level architecture

- Backend (Laravel)
  - Routes
    - routes/web.php defines the home route (Inertia::render('welcome')), a protected dashboard route, and Google OAuth routes (/login-google, /google-callback). It also includes routes/auth.php and routes/settings.php.
    - routes/auth.php wires Fortify-style controllers for register, login, password reset, email verification, and logout.
    - routes/settings.php provides authenticated settings pages (profile, password, appearance, two-factor) with controllers under App\Http\Controllers\Settings and one Inertia-rendered page for appearance.
  - Controllers
    - Auth controllers under app/Http/Controllers/Auth handle session, registration, password reset, and verification flows (backed by Fortify).
    - Settings controllers under app/Http/Controllers/Settings manage profile, password, and 2FA.
  - Middleware
    - app/Http/Middleware/HandleInertiaRequests sets the root view to resources/views/app.blade.php and shares common props: app name, a random “Inspiring” quote, current user, and sidebar state.
  - Providers
    - AppServiceProvider: standard app bootstrapping.
    - FortifyServiceProvider: maps Fortify views to Inertia pages and rate-limits 2FA challenges.
  - Auth & OAuth
    - Laravel Fortify provides auth scaffolding; Laravel Socialite powers Google OAuth login and callback to create/login users (web.php).
  - Queue
    - Composer dev scripts run php artisan queue:listen (tries=1). Configure QUEUE_CONNECTION in .env as needed for local dev.

- Frontend (React + TypeScript via Inertia)
  - Entrypoints
    - resources/js/app.tsx is the client boot (createInertiaApp + Vite page resolver).
    - resources/js/ssr.tsx is the SSR entry; SSR is enabled in config/inertia.php with server at http://127.0.0.1:13714.
  - Pages & Components
    - resources/js/pages contains Inertia pages (welcome.tsx, dashboard.tsx, settings/*, auth/*).
    - UI components live under resources/js/components and components/ui (Tailwind CSS v4 + Radix primitives).
  - Routing helpers (Wayfinder)
    - resources/js/routes/index.ts contains generated, typed route helpers that mirror Laravel routes and controllers. These are produced via @laravel/vite-plugin-wayfinder (see package.json) and laravel/wayfinder (composer). Prefer using these helpers in Links/forms to avoid hardcoding paths.
  - Styling & Tooling
    - Tailwind CSS v4 with @tailwindcss/vite plugin. Vite handles dev/build; types are checked via npm run types.

- Testing (Pest + PHPUnit)
  - tests/Pest.php extends the base TestCase and applies RefreshDatabase to Feature tests.
  - phpunit.xml configures an in-memory SQLite database, array mailer, sync queue, and array session for fast, isolated tests.
  - Example: tests/Feature/DashboardTest.php verifies guest redirect and authenticated access to the dashboard.

Notes specific to SSR

- SSR is enabled by default (config/inertia.php: ssr.enabled=true) and expects a server at http://127.0.0.1:13714.
- composer run dev:ssr will build the SSR bundle and start the SSR server (php artisan inertia:start-ssr) alongside the app server and queue listener.

References to important config/scripts

- composer.json scripts
  - dev: concurrently runs php artisan serve, queue:listen, and npm run dev.
  - dev:ssr: builds SSR bundles, then concurrently runs serve, queue:listen, pail logs, and inertia:start-ssr.
  - test: clears config and runs php artisan test.
- package.json scripts
  - dev/build/build:ssr, lint, format, format:check, types.
- Inertia config: config/inertia.php (SSR enabled; test paths ensure pages exist during assertions).
