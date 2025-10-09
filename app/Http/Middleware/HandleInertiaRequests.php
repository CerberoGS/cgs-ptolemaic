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

        return [
            ...parent::share($request),
            'name' => config('app.name'),
            'quote' => ['message' => trim($message), 'author' => trim($author)],
            'auth' => [
                'user' => $request->user(),
            ],
            'sidebarOpen' => ! $request->hasCookie('sidebar_state') || $request->cookie('sidebar_state') === 'true',
            'locale' => app()->getLocale(),
            'fallbackLocale' => config('app.fallback_locale'),
            'availableLocales' => $this->getAvailableLocales(),
            'translations' => $this->getTranslations(),
        ];
    }

    /**
     * Obtiene las traducciones cargadas desde los archivos JSON.
     */
    protected function getTranslations(): array
    {
        $locale = app()->getLocale();
        $jsonPath = base_path("lang/{$locale}.json");

        if (file_exists($jsonPath)) {
            return json_decode(file_get_contents($jsonPath), true) ?? [];
        }

        return [];
    }

    /**
     * Construye la lista de locales disponibles con metadatos legibles.
     *
     * @return array<int, array<string, string>>
     */
    protected function getAvailableLocales(): array
    {
        $meta = [
            'es' => ['code' => 'es', 'name' => 'Spanish', 'native' => 'Español'],
            'en' => ['code' => 'en', 'name' => 'English', 'native' => 'English'],
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
                ];
            })
            ->values()
            ->all();
    }
}
