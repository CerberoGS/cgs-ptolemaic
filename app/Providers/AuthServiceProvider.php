<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->loadViewsFrom(base_path('vendor/laravel/passport/resources/views'), 'passport');

        Passport::tokensCan([
            'mcp:use' => 'Use MCP server integrations.',
        ]);

        Passport::setDefaultScope([]);
        Passport::viewNamespace('passport');
    }
}
