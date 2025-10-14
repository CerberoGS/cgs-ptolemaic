<?php

namespace App\Providers;

use App\Models\User;
use App\Observers\UserObserver;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registrar servicios de aplicación.
     */
    public function register(): void
    {
        $this->app->useLangPath(base_path('lang'));
    }

    /**
     * Configurar comportamientos globales de la aplicación.
     */
    public function boot(): void
    {
        // Register observers
        User::observe(UserObserver::class);

        if ($this->app->environment('production')) {
            URL::forceScheme('https');

            if ($appUrl = config('app.url')) {
                URL::forceRootUrl($appUrl);
            }
        }

        // Define un locale por defecto para la generación de rutas fuera del ciclo HTTP
        URL::defaults([
            'locale' => config('app.locale'),
        ]);
    }
}
