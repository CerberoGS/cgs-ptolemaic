<?php

namespace App\Providers;

use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Registrar servicios de aplicación.
     */
    public function register(): void
    {
        //
    }

    /**
     * Configurar comportamientos globales de la aplicación.
     */
    public function boot(): void
    {
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
