<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Inspiring;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * Plantilla base cargada en la primera visita.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determina la version actual de los recursos.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define las propiedades compartidas con todas las vistas Inertia.
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        [$message, $author] = str(Inspiring::quotes()->random())->explode('-');

        $user = $request->user();
        $planSummary = null;

        if ($user !== null) {
            $plan = $user->planOrDefault();
            $planSummary = [
                'type' => $plan->value,
                'label' => $plan->label(),
                'isTrial' => $user->isOnTrial(),
                'isPaid' => $plan->isPaid(),
                'trialEndsAt' => $user->trial_ends_at?->toIso8601String(),
                'canAccessIntegrations' => $user->canAccessProviderIntegrations(),
                'canManageProviderKeys' => $user->canManageProviderKeys(),
                'usesManagedKeys' => $user->usesManagedProviderKeys(),
                'isInternal' => $plan->isInternal(),
                'managedLimits' => [
                    'daily' => $user->managedDailyLimit(),
                    'monthly' => $user->managedMonthlyLimit(),
                ],
                'features' => $plan->availableFeatures(),
                'emoji' => $plan->emoji(),
                'accentColor' => $plan->accentColor(),
                'tagline' => $plan->tagline(),
            ];
        }

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $user,
                'roles' => $user?->getRoleNames()?->toArray() ?? [],
                'permissions' => $user?->getAllPermissions()?->pluck('name')->toArray() ?? [],
                'hasPassword' => ! empty($user?->password),
                'plan' => $planSummary,
            ],
            'csrfToken' => csrf_token(),
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'locale' => app()->getLocale(),
            'fallbackLocale' => config('app.fallback_locale'),
            'availableLocales' => $this->getAvailableLocales(),
            'translations' => $this->getTranslations(),
        ];
    }

    /**
     * Obtiene las traducciones cargadas desde archivos JSON y PHP.
     */
    protected function getTranslations(): array
    {
        $locale = app()->getLocale();
        $translations = [];
        
        // Cargar archivos JSON (mantener compatibilidad)
        $jsonPath = base_path("lang/{$locale}.json");
        if (file_exists($jsonPath)) {
            $jsonTranslations = json_decode(file_get_contents($jsonPath), true) ?? [];
            $translations = array_merge($translations, $jsonTranslations);
        }
        
        // Cargar archivos PHP organizados por namespace
        $phpPath = base_path("lang/{$locale}");
        if (is_dir($phpPath)) {
            foreach (glob($phpPath . '/*.php') as $file) {
                $namespace = basename($file, '.php');
                $fileTranslations = require $file;
                
                // Aplanar las traducciones con namespace
                foreach ($fileTranslations as $key => $value) {
                    if (is_array($value)) {
                        // Para arrays anidados, crear claves con punto
                        foreach ($value as $subKey => $subValue) {
                            if (is_array($subValue)) {
                                // Si hay un tercer nivel, también aplanarlo
                                foreach ($subValue as $subSubKey => $subSubValue) {
                                    $translations["{$namespace}.{$subKey}.{$subSubKey}"] = $subSubValue;
                                }
                            } else {
                                // Segundo nivel: namespace.key.subKey
                                $translations["{$namespace}.{$key}.{$subKey}"] = $subValue;
                            }
                        }
                    } else {
                        // Para valores directos, usar namespace.key
                        $translations["{$namespace}.{$key}"] = $value;
                    }
                }
            }
        }
        
        return $translations;
    }

    /**
     * Obtiene los idiomas disponibles desde la base de datos.
     *
     * @return array<int, array<string, string>>
     */
    protected function getAvailableLocales(): array
    {
        try {
            // Intentar obtener idiomas desde la base de datos
            $languages = \App\Models\Language::getActiveLanguages();
            
            return $languages->map(function ($language) {
                return [
                    'code' => $language->code,
                    'name' => $language->name,
                    'native' => $language->native_name,
                    'flag' => $language->flag,
                ];
            })->toArray();
        } catch (\Exception $e) {
            // Fallback a configuración estática si hay error de BD
            $meta = [
                'es' => ['code' => 'es', 'name' => 'Spanish', 'native' => 'Español', 'flag' => '🇪🇸'],
                'en' => ['code' => 'en', 'name' => 'English', 'native' => 'English', 'flag' => '🇺🇸'],
            ];

            return collect(config('app.supported_locales', ['es', 'en']))
                ->map(function ($locale) use ($meta) {
                    if (isset($meta[$locale])) {
                        return $meta[$locale];
                    }

                    return [
                        'code' => $locale,
                        'name' => Str::upper($locale),
                        'native' => Str::upper($locale),
                        'flag' => '🌐',
                    ];
                })
                ->values()
                ->all();
        }
    }

    public function rootView(Request $request): string
    {
        if (app()->runningUnitTests()) {
            return 'testing';
        }

        return parent::rootView($request);
    }
}
